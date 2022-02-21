import BigNumber from "bignumber.js";
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
import {DECIMAL_PLACES} from "../../misc/constants";
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
    setFetched(
      everTokens.map((t, i) => ({
        ...t,
        balance: new BigNumber(balances[i])
          .div(10 ** t.decimals)
          .dp(DECIMAL_PLACES)
          .toNumber(),
      })),
    ),
  );
}

export default function* fetchEverTokensSaga() {
  yield takeLatest(fetch, fetchEverTokens);
}
