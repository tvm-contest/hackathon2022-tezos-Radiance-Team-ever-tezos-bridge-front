import BigNumber from "bignumber.js";
import {Address} from "everscale-inpage-provider";
import {all, call, put, select, takeLatest} from "redux-saga/effects";

import {balanceByTokenRoot} from "../../lib/everRpcClient";
import {VIEW_DECIMAL_PLACES} from "../../misc/constants";
import {NEED_RECONNECT, NO_WALLET} from "../../misc/error-messages";
import everTokens from "../../misc/ever-tokens";
import {error} from "../../utils/console";
import {fetch, setError, setFetched, setLoading} from "../reducers/everTokens";

function* fetchEverTokens() {
  yield put(setLoading());

  const everWallet = yield select((state) => state.everWallet.data);
  if (!everWallet) {
    yield put(setError(NO_WALLET));
    return;
  }

  let balances = [];

  try {
    balances = yield all(
      everTokens.map((t) =>
        call(
          balanceByTokenRoot,
          new Address(everWallet.address),
          new Address(t.address),
        ),
      ),
    );
  } catch (e) {
    if (
      typeof e.message === "string" &&
      /API request failed\. Request failed/.test(e.message)
    ) {
      yield put(setError(NEED_RECONNECT));
      return;
    }

    error(e);
    throw e;
  }

  yield put(
    setFetched(
      everTokens.map((t, i) => ({
        ...t,
        balance: new BigNumber(balances[i])
          .div(10 ** t.decimals)
          .dp(VIEW_DECIMAL_PLACES)
          .toNumber(),
      })),
    ),
  );
}

export default function* fetchEverTokensSaga() {
  yield takeLatest(fetch, fetchEverTokens);
}
