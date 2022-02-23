import {TempleWallet} from "@temple-wallet/dapp";
import BigNumber from "bignumber.js";
import {call, put, takeLatest} from "redux-saga/effects";

import {getAccount} from "../../lib/tezosApiClient";
import {getWallet} from "../../lib/tezosRpcClient";
import {DECIMAL_PLACES, TEZOS_DECIMALS} from "../../misc/constants";
import {CallReturnType} from "../../types";
import {setError} from "../reducers/everWallet";
import {setConnected, setConnecting} from "../reducers/tezosWallet";
import {connect} from "../reducers/tezosWallet";

function* connectTezosWallet() {
  yield put(setConnecting());

  const available: CallReturnType<typeof TempleWallet.isAvailable> = yield call(
    TempleWallet.isAvailable.bind(TempleWallet),
  );
  if (!available) {
    yield put(
      setError(
        "Temple wallet isn't available. Make sure it is installed and unlocked",
      ),
    );
    return;
  }

  const wallet: CallReturnType<typeof getWallet> = yield call(getWallet);

  if (!wallet.connected) {
    yield put(setError("Wallet wasn't connected"));
    return;
  }

  const pkh: CallReturnType<typeof wallet.getPKH> = yield call(
    wallet.getPKH.bind(wallet),
  );
  if (!pkh) {
    yield put(setError("Wallet wasn't connected"));
    return;
  }

  const {
    data: {balance},
  }: CallReturnType<typeof getAccount> = yield call(getAccount, pkh);

  yield put(
    setConnected({
      address: pkh,
      balance: new BigNumber(balance)
        .div(10 ** TEZOS_DECIMALS)
        .dp(DECIMAL_PLACES)
        .toNumber(),
    }),
  );
}

export default function* connectTezosWalletSaga() {
  yield takeLatest(connect, connectTezosWallet);
}
