import {TempleWallet} from "@temple-wallet/dapp";
import BigNumber from "bignumber.js";
import {call, put, takeLatest} from "redux-saga/effects";

import {getAccount} from "../../lib/tezosApiClient";
import {getWallet} from "../../lib/tezosRpcClient";
import {TEZOS_DECIMALS, VIEW_DECIMAL_PLACES} from "../../misc/constants";
import {NO_TEZOS_EXTENSION} from "../../misc/error-messages";
import {setError} from "../reducers/everWallet";
import {setConnected, setConnecting} from "../reducers/tezosWallet";
import {connect} from "../reducers/tezosWallet";

function* connectTezosWallet() {
  yield put(setConnecting());

  const available = yield call(TempleWallet.isAvailable.bind(TempleWallet));
  if (!available) {
    yield put(setError(NO_TEZOS_EXTENSION));
    return;
  }

  const wallet = yield call(getWallet);

  if (!wallet.connected) {
    yield put(setError("Wallet wasn't connected"));
    return;
  }

  const pkh = yield call(wallet.getPKH.bind(wallet));
  if (!pkh) {
    yield put(setError("Wallet wasn't connected"));
    return;
  }

  const {
    data: {balance},
  } = yield call(getAccount, pkh);

  yield put(
    setConnected({
      address: pkh,
      balance: new BigNumber(balance)
        .div(10 ** TEZOS_DECIMALS)
        .dp(VIEW_DECIMAL_PLACES)
        .toNumber(),
    }),
  );
}

export default function* connectTezosWalletSaga() {
  yield takeLatest(connect, connectTezosWallet);
}
