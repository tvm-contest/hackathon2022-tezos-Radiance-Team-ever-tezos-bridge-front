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

  const tokenContract: CallReturnType<typeof tezos.wallet.at> = yield call(
    tezos.wallet.at.bind(tezos.wallet),
    VAULT_ADDRESS,
  );
  const methodProvider = tokenContract.methodsObject.deposit_to_vault({
    amt_for_deposit: action.payload.amount,
    everscale_receiver: action.payload.everscaleReceiver.slice(2),
    requests: [{owner: tezosWallet.address, token_id: 0}],
  });

  const op: CallReturnType<typeof methodProvider.send> = yield call(
    methodProvider.send.bind(methodProvider),
  );
  yield call(op.confirmation.bind(op));
}

export default function* depositSaga() {
  yield takeLatest(deposit, depositFn);
}
