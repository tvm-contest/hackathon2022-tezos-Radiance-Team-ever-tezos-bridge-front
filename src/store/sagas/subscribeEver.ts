import {abiContract, AbiModule, DecodedMessageBody} from "@eversdk/core";
import {Address, Contract} from "everscale-inpage-provider";
import {channel} from "redux-saga";
import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";

import everRpcClient from "../../lib/everRpcClient";
import client from "../../lib/everWSClient";
import {
  EVER_DECIMALS,
  TOKEN_DECIMALS,
  TOKEN_PROXY_ADDRESS,
} from "../../misc/constants";
import {TokenProxy} from "../../misc/ever-abi";
import {CallReturnType, RootState} from "../../types";
import {debug} from "../../utils/console";
import {
  setEverId as setEverIdEver,
  subscribe,
} from "../reducers/everTezosTransactions";
import {fetch as fetchEverTokens} from "../reducers/everTokens";
import {setEverId as setEverIdTezos} from "../reducers/tezosEverTransactions";
import {fetch as fetchTezosTokens} from "../reducers/tezosTokens";

const callbackChannel = channel();

function* subscribeEver() {
  const abiModule = new AbiModule(client);

  const id: CallReturnType<typeof client.net.subscribe_collection> = yield call(
    client.net.subscribe_collection.bind(client.net),
    {
      collection: "messages",
      filter: {
        dst: {eq: TOKEN_PROXY_ADDRESS},
      },
      result: "id boc",
    },
    (d, responseType) => {
      debug("ever_callback", {d, responseType});
      abiModule
        .decode_message({
          abi: abiContract(TokenProxy as any),
          message: d.result.boc,
        })
        .then((r) => callbackChannel.put(r));
    },
  );

  debug("ever_subscribe_id", id);

  yield takeEvery(callbackChannel, function* (r: DecodedMessageBody) {
    if (r.name === "transferTokenCallback")
      yield handleTezosEverConfirmation(r);
    else if (r.name === "onAcceptTokensBurn")
      yield handleEverTezosConfirmation(r);
  });
}

export default function* subscribeEverSaga() {
  yield takeLatest(subscribe, subscribeEver);
}

function* handleTezosEverConfirmation(r: DecodedMessageBody) {
  // Decode callback
  const proxyContract = new Contract(
    everRpcClient,
    TokenProxy,
    new Address(TOKEN_PROXY_ADDRESS),
  );
  const proxyCall = proxyContract.methods.decodeTezosEventData({
    data: r.value.data,
  });
  const proxyRes: CallReturnType<typeof proxyCall.call> = yield call(
    proxyCall.call.bind(proxyCall),
    {},
  );

  const resRecipient = "0:" + BigInt(proxyRes.recipient).toString(16);
  const resAmount = +proxyRes.amount / 10 ** EVER_DECIMALS;
  debug("ever_decoded_callback", {resAmount, resRecipient});

  const everAddr: string = yield select(
    (state: RootState) => state.everWallet.data?.address,
  );
  const enteredAmount: number = yield select(
    (state: RootState) => state.enteredValues.data?.amount,
  );
  debug("local_data_for_receiver", {enteredAmount, everAddr});

  if (resRecipient === everAddr && resAmount === enteredAmount) {
    yield put(setEverIdTezos(Math.random()));

    // Refetch tokens
    yield put(fetchTezosTokens());
    yield put(fetchEverTokens());
  }
}

function* handleEverTezosConfirmation(r: DecodedMessageBody) {
  debug("ever_encode_handler", r);

  const amount = r.value.amount / 10 ** TOKEN_DECIMALS;
  const sender = r.value.walletOwner;

  const everAddr: string = yield select(
    (state: RootState) => state.everWallet.data?.address,
  );
  const enteredAmount: number = yield select(
    (state: RootState) => state.enteredValues.data?.amount,
  );

  if (sender === everAddr && amount === enteredAmount)
    yield put(setEverIdEver(Math.random()));
}
