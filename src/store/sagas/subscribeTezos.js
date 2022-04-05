import {channel} from "redux-saga";
import {
  all,
  call,
  put,
  select,
  takeEvery,
  takeLatest,
} from "redux-saga/effects";

import connection from "../../lib/tezosWSClient";
import {FA2_ADDRESS, TOKEN_DECIMALS, VAULT_ADDRESS} from "../../misc/constants";
import {debug} from "../../utils/console";
import {setTezosId as setTezosIdTezos} from "../reducers/everTezosTransactions";
import {fetch as fetchEverTokens} from "../reducers/everTokens";
import {
  setTezosId as setTezosIdEver,
  subscribe,
} from "../reducers/tezosEverTransactions";
import {fetch as fetchTezosTokens} from "../reducers/tezosTokens";

const operationsChannel = channel();
const transfersChannel = channel();
const errorsChannel = channel();

function* subscribeTezos() {
  connection.on("operations", (msg) => {
    debug("operation_msg", msg);
    operationsChannel.put(msg);
    transfersChannel.put(msg);
  });

  connection.onclose((e) => {
    debug("error", e);
    errorsChannel.put(e);
  });

  yield call(init);

  const tezosEverSaga = takeEvery(
    operationsChannel,
    handleTezosEverConfirmation,
  );
  const everTezosSaga = takeEvery(
    transfersChannel,
    handleEverTezosConfirmation,
  );
  const errorsSaga = takeEvery(errorsChannel, init);

  yield all([tezosEverSaga, everTezosSaga, errorsSaga]);
}

function* init() {
  // open connection
  yield call(connection.start.bind(connection));
  // subscribe to transfers
  yield call(connection.invoke.bind(connection), "SubscribeToOperations", {
    address: FA2_ADDRESS,
  });
  // subscribe to deposits
  yield call(connection.invoke.bind(connection), "SubscribeToOperations", {
    address: VAULT_ADDRESS,
  });
}

function* handleTezosEverConfirmation(msg) {
  if (msg.type !== 1) return;

  const opHash = yield select(
    (state) => state.tezosEverTransactions.currentTransaction.opHash,
  );

  if (opHash === msg.data[0].hash) yield put(setTezosIdEver(msg.data[0].id));
}

function* handleEverTezosConfirmation(msg) {
  if (
    !(
      msg.data &&
      msg.data[0] &&
      msg.data[0].parameter &&
      msg.data[0].parameter.value &&
      msg.data[0].parameter.value[0] &&
      msg.data[0].parameter.value[0].txs &&
      msg.data[0].parameter.value[0].txs[0]
    )
  )
    return;

  const {amount, to_} = msg.data[0].parameter.value[0].txs[0];

  const tezosAddr = yield select((state) => state.tezosWallet.data?.address);
  const enteredAmount = yield select(
    (state) => state.enteredValues.data?.amount,
  );

  if (enteredAmount === amount / 10 ** TOKEN_DECIMALS && tezosAddr === to_) {
    yield put(setTezosIdTezos(Math.random()));

    // Refetch tokens
    yield put(fetchTezosTokens());
    yield put(fetchEverTokens());
  }
}

export default function* subscribeTezosSaga() {
  yield takeLatest(subscribe, subscribeTezos);
}
