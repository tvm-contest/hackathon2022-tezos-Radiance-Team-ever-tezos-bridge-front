import {TempleWallet} from "@temple-wallet/dapp";
import {all, call, put, takeLatest} from "redux-saga/effects";

import everRpcClient from "../../lib/everRpcClient";
import {NO_EXTENSION} from "../../misc/error-messages";
import {CallReturnType} from "../../types";
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

  const available: CallReturnType<typeof TempleWallet.isAvailable> = yield call(
    TempleWallet.isAvailable.bind(TempleWallet),
  );
  if (!available) yield put(setErrorTezos(NO_EXTENSION));

  yield put(resetTezos());
}

function* checkWalletEver() {
  yield put(setConnectingEver());

  const has: CallReturnType<typeof everRpcClient.hasProvider> = yield call(
    everRpcClient.hasProvider.bind(everRpcClient),
  );
  if (!has) {
    yield put(setErrorEver(NO_EXTENSION));
    return;
  }

  yield put(resetEver());
}

export default function* checkWalletsAvailabilitySaga() {
  const tezosSaga = takeLatest(checkTezos, checkWalletTezos);
  const everSaga = takeLatest(checkEver, checkWalletEver);
  yield all([tezosSaga, everSaga]);
}
