import {TempleWallet} from "@temple-wallet/dapp";
import {all, call, put, takeLatest} from "redux-saga/effects";

import everRpcClient from "../../lib/everRpcClient";
import {NO_EVER_EXTENSION, NO_TEZOS_EXTENSION} from "../../misc/error-messages";
import {
  check as checkEver,
  reset as resetEver,
  setConnecting as setConnectingEver,
  setError as setErrorEver,
} from "../reducers/everWallet";
import {
  check as checkTezos,
  reset as resetTezos,
  setConnecting as setConnectingTezos,
  setError as setErrorTezos,
} from "../reducers/tezosWallet";

function* checkWalletTezos() {
  yield put(setConnectingTezos());

  const available = yield call(TempleWallet.isAvailable.bind(TempleWallet));
  if (!available) yield put(setErrorTezos(NO_TEZOS_EXTENSION));

  yield put(resetTezos());
}

function* checkWalletEver() {
  yield put(setConnectingEver());

  const has = yield call(everRpcClient.hasProvider.bind(everRpcClient));
  if (!has) {
    yield put(setErrorEver(NO_EVER_EXTENSION));
    return;
  }

  yield put(resetEver());
}

export default function* checkWalletsAvailabilitySaga() {
  const tezosSaga = takeLatest(checkTezos, checkWalletTezos);
  const everSaga = takeLatest(checkEver, checkWalletEver);
  yield all([tezosSaga, everSaga]);
}
