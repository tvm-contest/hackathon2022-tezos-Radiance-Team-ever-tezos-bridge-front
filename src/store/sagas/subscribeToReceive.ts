import {AbiModule} from "@eversdk/core";
import {channel} from "redux-saga";
import {call, takeEvery, takeLatest} from "redux-saga/effects";

import client from "../../lib/everWSClient";
import {PROXY_ADDRESS} from "../../misc/constants";
import {TokenProxy} from "../../misc/ever-abi";
import {CallReturnType} from "../../types";
import {debug} from "../../utils/console";
import {subscribeReceive} from "../reducers/transactions";

const callbackChannel = channel();

function* subscribeToReceive() {
  const abiModule = new AbiModule(client);

  const id: CallReturnType<typeof client.net.subscribe_collection> = yield call(
    client.net.subscribe_collection.bind(client.net),
    {
      collection: "messages",
      filter: {
        dst: {eq: PROXY_ADDRESS},
      },
      result: "id boc",
    },
    (d, responseType) => {
      debug("ever_callback", {d, responseType});
      abiModule
        .decode_message({
          abi: TokenProxy as any,
          message: d.result.boc,
        })
        .then((r) => callbackChannel.put(r));
    },
  );

  debug("ever_subscribe_id", id);

  yield takeEvery(callbackChannel, function* (r) {
    console.log(r);
  });
}

export default function* subscribeToReceiveSaga() {
  yield takeLatest(subscribeReceive, subscribeToReceive);
}
