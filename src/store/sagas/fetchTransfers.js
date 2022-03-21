import {abiContract} from "@eversdk/core";
import {Address, Contract} from "everscale-inpage-provider";
import gql from "graphql-tag";
import _ from "lodash";
import {all, call, put, select, takeLeading} from "redux-saga/effects";

import everRpcClient from "../../lib/everRpcClient";
import client from "../../lib/everWSClient";
import {TOKEN_DECIMALS, TOKEN_PROXY_ADDRESS} from "../../misc/constants";
import {NO_WALLET} from "../../misc/error-messages";
import {TokenProxy} from "../../misc/ever-abi";
import {Direction} from "../../types";
import getGqlString from "../../utils/getGqlString";
import {fetch, setError, setFetched, setLoading} from "../reducers/transfers";

const getEventsQuery = gql`
  query TokenProxyMessages($dst: String!) {
    messages(
      filter: {dst: {eq: $dst}}
      orderBy: {path: "created_at", direction: DESC}
    ) {
      id
      boc
      created_at
    }
  }
`;

function* fetchTransfers() {
  yield put(setLoading());

  const everWallet = yield select((state) => state.everWallet.data);
  if (!everWallet) {
    yield put(setError(NO_WALLET));
    return;
  }

  const tezosWallet = yield select((state) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError(NO_WALLET));
    return;
  }

  const res = yield call([client.net, "query"], {
    query: getGqlString(getEventsQuery),
    variables: {
      dst: TOKEN_PROXY_ADDRESS,
    },
  });

  const decodeCalls = yield all(
    res.result.data.messages.map(function* (m) {
      try {
        const r = yield call([client.abi, "decode_message"], {
          abi: abiContract(TokenProxy),
          message: m.boc,
        });
        return {
          ...r,
          created_at: m.created_at,
          id: m.id,
        };
      } catch {
        return null;
      }
    }),
  );

  const callbacks = decodeCalls.filter(
    (v) =>
      v &&
      (v.name === "transferTokenCallback" || v.name === "onAcceptTokensBurn"),
  );

  const callbacksDecoded = yield all(
    callbacks.map(function* (c) {
      const proxyContract = new Contract(
        everRpcClient,
        TokenProxy,
        new Address(TOKEN_PROXY_ADDRESS),
      );

      if (c.name === "transferTokenCallback") {
        const decoded = yield call([
          proxyContract.methods.decodeTezosEventData({
            data: c.value.data,
          }),
          "call",
        ]);

        const receiver = "0:" + BigInt(decoded.recipient).toString(16);

        if (receiver === everWallet.address)
          return {
            amount: decoded.amount / 10 ** TOKEN_DECIMALS,
            createdAt: c.created_at * 1e3,
            direction: Direction.TezosEver,
            id: c.id,
            receiver: "0:" + BigInt(decoded.recipient).toString(16),
            sender: "",
          };

        return null;
      }

      const decoded = yield call([
        proxyContract.methods.decodeTezosAddrPayload({
          data: c.value.payload,
        }),
        "call",
      ]);

      if (
        decoded.recipient === tezosWallet.address ||
        c.value.walletOwner === everWallet.address
      )
        return {
          amount: c.value.amount / 10 ** TOKEN_DECIMALS,
          createdAt: c.created_at * 1e3,
          direction: Direction.EverTezos,
          id: c.id,
          receiver: decoded.recipient,
          sender: c.value.walletOwner,
        };

      return null;
    }),
  );

  yield put(setFetched(_.compact(callbacksDecoded)));
}

export default function* fetchTransfersSaga() {
  yield takeLeading(fetch, fetchTransfers);
}
