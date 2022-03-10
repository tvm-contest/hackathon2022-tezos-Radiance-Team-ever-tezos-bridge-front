import {channel} from "redux-saga";
import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";

import {getConnection} from "../../lib/tezosWSClient";
import {VAULT_ADDRESS} from "../../misc/constants";
import {CallReturnType, RootState} from "../../types";
import {debug} from "../../utils/console";
import {setTezosId, subscribe} from "../reducers/tezosEverTransactions";

const operationsChannel = channel();

function* subscribeTezos() {
  const connection: CallReturnType<typeof getConnection> = yield call(
    getConnection,
  );

  connection.invoke("SubscribeToOperations", {
    address: VAULT_ADDRESS,
    types: "transaction",
  });

  connection.on("operations", (msg) => {
    debug("operation_msg", msg);
    operationsChannel.put(msg);
  });

  yield takeEvery(operationsChannel, function* (msg: any) {
    yield handleTezosEverConfirmation(msg);
  });
}

export default function* subscribeTezosSaga() {
  yield takeLatest(subscribe, subscribeTezos);
}

function* handleTezosEverConfirmation(msg: any) {
  if (msg.type !== 1) return;

  const opHash: string = yield select(
    (state: RootState) => state.tezosEverTransactions.currentTransaction.opHash,
  );

  if (opHash === msg.data[0].hash) yield put(setTezosId(msg.data[0].id));
}

function* handleEverTezosConfirmation() {}
