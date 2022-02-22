import BigNumber from "bignumber.js";
import {
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import tezos from "../../lib/tezosRpcClient";
import {CallReturnType, RootState} from "../../types";
import {fetch, setError, setLoading} from "../reducers/tezosTokens";

function* tezosTransfer() {
  yield put(setLoading());

  const tezosWallet: SagaReturnType<() => RootState["tezosWallet"]["data"]> =
    yield select((state: RootState) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const tokenContract: CallReturnType<typeof tezos.wallet.at> = yield call(
    tezos.wallet.at.bind(tezos),
    "KT1Ua1r4kEBUQ4vP546QyCc5WK6sadvesoPu",
  );

  const op = tokenContract.methods
    .transfer([
      {
        from_: tezosWallet.address,
        txs: [
          {
            amount: new BigNumber(10).pow(9),
            to_: tezosWallet.address,
            token_id: 0,
          },
        ],
      },
    ])
    .send();
}

export default function* tezosTransferSaga() {
  yield takeLatest(fetch, tezosTransfer);
}
