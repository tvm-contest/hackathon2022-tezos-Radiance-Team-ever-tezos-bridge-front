import {PayloadAction} from "@reduxjs/toolkit";
import {
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import tezos from "../../lib/tezosRpcClient";
import {VAULT_ADDRESS} from "../../misc/constants";
import {CallReturnType, DepositAction, RootState} from "../../types";
import {deposit, setError, setLoading} from "../reducers/transactions";

function* depositFn(action: PayloadAction<DepositAction>) {
  yield put(setLoading());

  const tezosWallet: SagaReturnType<() => RootState["tezosWallet"]["data"]> =
    yield select((state: RootState) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const tokenContract: CallReturnType<typeof tezos.contract.at> = yield call(
    tezos.contract.at.bind(tezos),
    VAULT_ADDRESS,
  );
  const methodProvider = tokenContract.methods.deposit_to_vault([
    {
      amt_for_deposit: action.payload.amount,
      everscale_receiver: action.payload.everscaleReceiver,
    },
  ]);

  const op: CallReturnType<typeof methodProvider.send> = yield call(
    methodProvider.send,
  );
  yield call(op.confirmation, 3);
}

export default function* depositSaga() {
  yield takeLatest(deposit, depositFn);
}
