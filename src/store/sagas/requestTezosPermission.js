import {call, put, select, takeLatest} from "redux-saga/effects";

import tezos from "../../lib/tezosRpcClient";
import {FA2_ADDRESS, VAULT_ADDRESS} from "../../misc/constants";
import {
  getTezosPermissions,
  permitTezosToken,
  setError,
  setLoading,
} from "../reducers/permissions";

function* requestTezosPermission() {
  yield put(setLoading());

  const tezosWallet = yield select((state) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const tokenWallet = yield call(
    tezos.wallet.at.bind(tezos.wallet),
    FA2_ADDRESS,
  );

  const methodProvider = tokenWallet.methods.update_operators([
    {
      add_operator: {
        operator: VAULT_ADDRESS,
        owner: tezosWallet.address,
        token_id: 0,
      },
    },
  ]);
  const op = yield call(methodProvider.send.bind(methodProvider));
  yield call(op.confirmation.bind(op));

  // Lunch checkTezosPermissions saga
  yield put(getTezosPermissions());
}

export default function* requestTezosPermissionSaga() {
  yield takeLatest(permitTezosToken, requestTezosPermission);
}
