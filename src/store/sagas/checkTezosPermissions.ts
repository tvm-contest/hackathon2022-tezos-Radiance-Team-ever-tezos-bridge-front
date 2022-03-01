import {put, SagaReturnType, select, takeLatest} from "redux-saga/effects";

import {getBigMapKeys} from "../../lib/tezosApiClient";
import {OPERATORS_MAP_ID} from "../../misc/constants";
import {CallReturnType, RootState} from "../../types";
import {debug} from "../../utils/console";
import {
  getTezosPermissions,
  setError,
  setLoading,
  setTezosPermissions,
} from "../reducers/permissions";

function* checkTezosPermissions() {
  yield put(setLoading());

  const tezosWallet: SagaReturnType<() => RootState["tezosWallet"]["data"]> =
    yield select((state: RootState) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const operatorsKeys: CallReturnType<typeof getBigMapKeys> =
    yield getBigMapKeys(OPERATORS_MAP_ID);
  debug("permissions_keys", operatorsKeys.data);

  const allowedTokens: string[] = [];
  operatorsKeys.data.forEach((ent) => {
    if (ent.key.address_0 === tezosWallet.address && ent.active)
      allowedTokens.push(ent.key.nat);
  });

  yield put(setTezosPermissions(allowedTokens));
}

export default function* checkTezosPermissionsSaga() {
  yield takeLatest(getTezosPermissions, checkTezosPermissions);
}
