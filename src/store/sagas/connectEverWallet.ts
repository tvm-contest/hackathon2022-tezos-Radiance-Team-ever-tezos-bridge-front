import BigNumber from "bignumber.js";
import {call, put, takeLatest} from "redux-saga/effects";

import {getBalance} from "../../lib/everApiClient";
import everRpcClient from "../../lib/everRpcClient";
import {DECIMAL_PLACES, EVER_DECIMALS} from "../../misc/constants";
import {NO_EXTENSION} from "../../misc/error-messages";
import {CallReturnType} from "../../types";
import {
  connect,
  setConnected,
  setConnecting,
  setError,
} from "../reducers/everWallet";

function* connectWalletEver() {
  yield put(setConnecting());

  const has: CallReturnType<typeof everRpcClient.hasProvider> = yield call(
    everRpcClient.hasProvider.bind(everRpcClient),
  );
  if (!has) {
    yield put(setError(NO_EXTENSION));
    return;
  }

  yield call(everRpcClient.ensureInitialized.bind(everRpcClient));

  const {
    accountInteraction,
  }: CallReturnType<typeof everRpcClient.requestPermissions> = yield call(
    everRpcClient.requestPermissions.bind(everRpcClient),
    {
      permissions: ["basic", "accountInteraction"],
    },
  );
  if (accountInteraction == null) {
    yield put(setError("Insufficient permissions"));
    return;
  }
  const {
    data: {
      data: {
        accounts: [{balance}],
      },
    },
  }: CallReturnType<typeof getBalance> = yield call(
    getBalance,
    accountInteraction.address.toString(),
  );

  yield put(
    setConnected({
      address: accountInteraction.address.toString(),
      balance: new BigNumber(balance, 16)
        .div(10 ** EVER_DECIMALS)
        .dp(DECIMAL_PLACES)
        .toNumber(),
    }),
  );
}

export default function* connectEverWalletSaga() {
  yield takeLatest(connect, connectWalletEver);
}
