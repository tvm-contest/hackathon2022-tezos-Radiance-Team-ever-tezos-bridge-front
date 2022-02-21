import {Address} from "everscale-inpage-provider";
import {
  all,
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import {balanceByTokenRoot} from "../../lib/everRpcClient";
import everTokens from "../../misc/everTokens";
import {RootState} from "../../types";
import {fetch, setError, setFetched, setLoading} from "../reducers/everTokens";

function* fetchEverTokens() {
  yield put(setLoading());

  const everWallet: SagaReturnType<() => RootState["everWallet"]["data"]> =
    yield select((state: RootState) => state.everWallet.data);
  if (!everWallet) {
    yield put(setError("Ever wallet not connected"));
    return;
  }

  const balances: SagaReturnType<() => string[]> = yield all(
    everTokens.map((t) =>
      call(
        balanceByTokenRoot,
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
