import {
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import {getTezosWallets} from "../../lib/tezosApiClient";
import {CallReturnType, RootState} from "../../types";
import {fetch, setError, setFetched, setLoading} from "../reducers/tezosTokens";

function* fetchTezosTokens() {
  yield put(setLoading());

  const tezosWallet: SagaReturnType<() => RootState["tezosWallet"]["data"]> =
    yield select((state: RootState) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const {data}: CallReturnType<typeof getTezosWallets> = yield call(
    getTezosWallets,
    tezosWallet.address,
  );

  yield put(
    setFetched(data.balances.map((t) => ({...t, balance: +t.balance}))),
  );
}

export default function* fetchTezosTokensSaga() {
  yield takeLatest(fetch, fetchTezosTokens);
}
