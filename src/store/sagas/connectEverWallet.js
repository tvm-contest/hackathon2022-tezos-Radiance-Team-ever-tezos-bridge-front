import BigNumber from "bignumber.js";
import {call, put, takeLatest} from "redux-saga/effects";

import {getBalance} from "../../lib/everApiClient";
import everRpcClient from "../../lib/everRpcClient";
import {EVER_DECIMALS, VIEW_DECIMAL_PLACES} from "../../misc/constants";
import {NO_EVER_EXTENSION} from "../../misc/error-messages";
import {
  connect,
  setConnected,
  setConnecting,
  setError,
} from "../reducers/everWallet";

function* connectWalletEver() {
  yield put(setConnecting());

  const has = yield call(everRpcClient.hasProvider.bind(everRpcClient));

  if (!has) {
    yield put(setError(NO_EVER_EXTENSION));
    return;
  }

  yield call(everRpcClient.ensureInitialized.bind(everRpcClient));

  const {accountInteraction} = yield call(
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
  } = yield call(getBalance, accountInteraction.address.toString());

  yield put(
    setConnected({
      address: accountInteraction.address.toString(),
      balance: new BigNumber(balance, 16)
        .div(10 ** EVER_DECIMALS)
        .dp(VIEW_DECIMAL_PLACES)
        .toNumber(),
    }),
  );
}

export default function* connectEverWalletSaga() {
  yield takeLatest(connect, connectWalletEver);
}
