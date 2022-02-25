import {abiContract, AbiModule} from "@eversdk/core";
import {channel} from "redux-saga";
import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";

import client from "../../lib/everWSClient";
import {TOKEN_ROOT_PROXY} from "../../misc/constants";
import {TokenRootProxy} from "../../misc/ever-abi";
import {CallReturnType, RootState} from "../../types";
import {debug} from "../../utils/console";
import {setEverId, subscribeReceive} from "../reducers/transactions";

const callbackChannel = channel();

function* subscribeToReceive() {
  const abiModule = new AbiModule(client);

  const id: CallReturnType<typeof client.net.subscribe_collection> = yield call(
    client.net.subscribe_collection.bind(client.net),
    {
      collection: "messages",
      filter: {
        dst: {eq: TOKEN_ROOT_PROXY},
      },
      result: "id boc",
    },
    (d, responseType) => {
      debug("ever_callback", {d, responseType});
      abiModule
        .decode_message({
          abi: abiContract(TokenRootProxy),
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

    if (r.value.addrRecipient === everAddr && +r.value.amount === enteredAmount)
      yield put(setEverId(r.value.gasTo));
  });
}

export default function* subscribeToReceiveSaga() {
  yield takeLatest(subscribeReceive, subscribeToReceive);
}
