import {call, put, select, takeLatest} from "redux-saga/effects";

import tezos from "../../lib/tezosRpcClient";
import {VAULT_ADDRESS} from "../../misc/constants";
import {debug} from "../../utils/console";
import {
  deposit,
  setError,
  setLoading,
  setOpHash,
} from "../reducers/tezosEverTransactions";

function* depositFn(action) {
  yield put(setLoading());

  const tezosWallet = yield select((state) => state.tezosWallet.data);
  if (!tezosWallet) {
    yield put(setError("Tezos wallet not connected"));
    return;
  }

  const tokenContract = yield call(
    tezos.wallet.at.bind(tezos.wallet),
    VAULT_ADDRESS,
  );
  const methodProvider = tokenContract.methodsObject.deposit_to_vault({
    amt_for_deposit: action.payload.amount,
    everscale_receiver: action.payload.receiver.slice(2),
    requests: [{owner: tezosWallet.address, token_id: 0}],
  });

  const op = yield call(methodProvider.send.bind(methodProvider));

  debug("deposit_operation", op);
  yield put(setOpHash(op.opHash));
}

export default function* depositTezosEverSaga() {
  yield takeLatest(deposit, depositFn);
}
