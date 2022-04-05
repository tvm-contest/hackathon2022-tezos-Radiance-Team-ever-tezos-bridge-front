import {put, select, takeLatest} from "redux-saga/effects";

import {getBigMapKeys} from "../../lib/tezosApiClient";
import {OPERATORS_MAP_ID} from "../../misc/constants";
import {debug} from "../../utils/console";
import {
  getTezosPermissions,
  setError,
  setLoading,
  setTezosPermissions,
} from "../reducers/permissions";

function* checkTezosPermissions() {
  yield put(setLoading());

  const tezosWallet = yield select((state) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const operatorsKeys = yield getBigMapKeys(OPERATORS_MAP_ID);
  debug("permissions_keys", operatorsKeys.data);

  const allowedTokens = [];
  operatorsKeys.data.forEach((ent) => {
    if (ent.key.address_0 === tezosWallet.address && ent.active)
      allowedTokens.push(ent.key.nat);
  });

  yield put(setTezosPermissions(allowedTokens));
}

export default function* checkTezosPermissionsSaga() {
  yield takeLatest(getTezosPermissions, checkTezosPermissions);
}
