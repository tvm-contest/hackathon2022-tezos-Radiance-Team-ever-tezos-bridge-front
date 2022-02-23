import {
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import tezos from "../../lib/tezosRpcClient";
import {FA2_ADDRESS} from "../../misc/constants";
import {CallReturnType, RootState} from "../../types";
import {
  getTezosPermissions,
  setError,
  setLoading,
} from "../reducers/permissions";

function* requestTezosPermission() {
  yield put(setLoading());

  const tezosWallet: SagaReturnType<() => RootState["tezosWallet"]["data"]> =
    yield select((state: RootState) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const tokenContract: CallReturnType<typeof tezos.contract.at> = yield call(
    tezos.contract.at.bind(tezos),
    FA2_ADDRESS,
  );
  const methodProvider = tokenContract.methods.update_operators();

  const op: CallReturnType<typeof methodProvider.send> = yield call(
    methodProvider.send,
  );

  yield call(op.confirmation);

  yield put(getTezosPermissions());
}

export default function* requestTezosPermissionSaga() {
  yield takeLatest(getTezosPermissions, requestTezosPermission);
}
