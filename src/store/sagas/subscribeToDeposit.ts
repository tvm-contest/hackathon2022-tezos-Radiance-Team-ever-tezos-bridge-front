import {channel} from "redux-saga";
import {call, put, select, takeEvery, takeLatest} from "redux-saga/effects";

import {getConnection} from "../../lib/tezosWSClient";
import {VAULT_ADDRESS} from "../../misc/constants";
import {CallReturnType, RootState} from "../../types";
import {debug} from "../../utils/console";
import {setId, subscribeDeposit} from "../reducers/transactions";

const operationsChannel = channel();

function* subscribeToDeposit() {
  const connection: CallReturnType<typeof getConnection> = yield call(
    getConnection,
  );

  connection.invoke("SubscribeToOperations", {
    address: VAULT_ADDRESS,
    types: "transaction",
  });

  connection.on("operations", (msg) => {
    debug("operation_msg_1", msg);
    operationsChannel.put(msg);
  });

  yield takeEvery(operationsChannel, function* (msg: any) {
    if (msg.type !== 1) return;

    const opHash: RootState["transactions"]["currentTransaction"]["opHash"] =
      yield select(
        (state: RootState) => state.transactions.currentTransaction.opHash,
      );

    if (opHash === msg.data[0].hash) yield put(setId(msg.data[0].id));
  });
}

export default function* subscribeToDepositSaga() {
  yield takeLatest(subscribeDeposit, subscribeToDeposit);
}
