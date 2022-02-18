import {call, put, select, takeLatest} from "redux-saga/effects";

import tezosApiClient from "../../lib/tezosApiClient";
import {GetTezosTokensResponse, RootState, WalletSelect} from "../../types";
import {fetch, setError, setFetched, setLoading} from "../reducers/tezosTokens";

function* fetchTezosTokens() {
  yield put(setLoading());

  const tezosWallet: WalletSelect = yield select(
    (state: RootState) => state.tezosWallet.data,
  );
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const {data}: GetTezosTokensResponse = yield call(
    tezosApiClient.get.bind(tezosApiClient),
    `/account/hangzhou2net/${tezosWallet.address}/token_balances`,
  );

  yield put(
    setFetched(data.balances.map((t) => ({...t, balance: +t.balance}))),
  );
}

export default function* fetchTezosTokensSaga() {
  yield takeLatest(fetch, fetchTezosTokens);
}
