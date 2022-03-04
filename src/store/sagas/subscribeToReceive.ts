import {abiContract, AbiModule} from "@eversdk/core";
import {channel} from "redux-saga";
import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";

import client from "../../lib/everWSClient";
import {TOKEN_PROXY_ADDRESS} from "../../misc/constants";
import {TokenProxy} from "../../misc/ever-abi";
import {CallReturnType, RootState} from "../../types";
import {debug} from "../../utils/console";
import {fetch as fetchEverTokens} from "../reducers/everTokens";
import {setEverId, subscribeReceive} from "../reducers/tezosEverTransactions";
import {fetch as fetchTezosTokens} from "../reducers/tezosTokens";

const callbackChannel = channel();

function* subscribeToReceive() {
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

  yield takeEvery(callbackChannel, function* (r: any) {
    debug("ever_decoded_callback", r);
    const everAddr: string = yield select(
      (state: RootState) => state.everWallet.data?.address,
    );
    const enteredAmount: number = yield select(
      (state: RootState) => state.enteredValues.data?.amount,
    );

    if (
      r.value.addrRecipient === everAddr &&
      +r.value.amount === enteredAmount
    ) {
      yield put(setEverId(r.value.gasTo));

      // Refetch tokens
      yield put(fetchTezosTokens());
      yield put(fetchEverTokens());
    }
  });
}

export default function* subscribeToReceiveSaga() {
  yield takeLatest(subscribeReceive, subscribeToReceive);
}
