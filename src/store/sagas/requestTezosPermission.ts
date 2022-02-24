import {
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import tezos from "../../lib/tezosRpcClient";
import {FA2_ADDRESS, VAULT_ADDRESS} from "../../misc/constants";
import {CallReturnType, RootState} from "../../types";
import {permitTezosToken, setError, setLoading} from "../reducers/permissions";

function* requestTezosPermission() {
  yield put(setLoading());

  const tezosWallet: SagaReturnType<() => RootState["tezosWallet"]["data"]> =
    yield select((state: RootState) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const tokenWallet: CallReturnType<typeof tezos.contract.at> = yield call(
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
  const op: CallReturnType<typeof methodProvider.send> = yield call(
    methodProvider.send.bind(methodProvider),
  );
  yield call(op.confirmation.bind(op));
}

export default function* requestTezosPermissionSaga() {
  yield takeLatest(permitTezosToken, requestTezosPermission);
}
