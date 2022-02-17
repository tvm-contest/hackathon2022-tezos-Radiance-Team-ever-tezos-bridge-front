import {Address} from "everscale-inpage-provider";
import {all, call, put, select, takeLatest} from "redux-saga/effects";

import EverApi from "../../misc/EverApi";
import everTokens from "../../misc/everTokens.json";
import {BalanceArray, RootState,WalletSelect} from "../../types";
import {fetch, setError, setFetched, setLoading} from "../reducers/everTokens";

function* fetchEverTokens() {
  yield put(setLoading());

  const everWallet: WalletSelect = yield select(
    (state: RootState) => state.everWallet.data,
  );
  if (!everWallet) {
    yield put(setError("Ever wallet not connected"));
    return;
  }

  const balances: BalanceArray = yield all(
    everTokens.map((t) =>
      call(
        EverApi.balanceByTokenRoot,
        new Address(everWallet.address),
        new Address(t.address),
      ),
    ),
  );

  yield put(
    setFetched(everTokens.map((t, i) => ({...t, balance: +balances[i]}))),
  );
}

export default function* fetchEverTokensSaga() {
  yield takeLatest(fetch, fetchEverTokens);
}
