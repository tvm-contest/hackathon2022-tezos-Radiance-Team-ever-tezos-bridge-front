import BigNumber from "bignumber.js";
import {
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import {getTezosWallets} from "../../lib/tezosApiClient";
import {VIEW_DECIMAL_PLACES} from "../../misc/constants";
import tezosTokens from "../../misc/tezos-tokens";
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
    setFetched(
      data.balances.map((t) => ({
        ...tezosTokens[0],
        address: tezosTokens[0].contract,
        balance: new BigNumber(t.balance)
          .div(10 ** tezosTokens[0].decimals)
          .dp(VIEW_DECIMAL_PLACES)
          .toNumber(),
      })),
    ),
  );
}

export default function* fetchTezosTokensSaga() {
  yield takeLatest(fetch, fetchTezosTokens);
}
