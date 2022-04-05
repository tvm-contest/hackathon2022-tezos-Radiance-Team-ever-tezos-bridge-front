import {Address, Contract} from "everscale-inpage-provider";
import {call, put, select, takeLatest} from "redux-saga/effects";

import everRpcClient from "../../lib/everRpcClient";
import {TOKEN_PROXY_ADDRESS} from "../../misc/constants";
import {NO_WALLET} from "../../misc/error-messages";
import {TokenProxy, TokenRoot, TokenWallet} from "../../misc/ever-abi";
import {debug} from "../../utils/console";
import {
  deposit,
  setError,
  setLoading,
  setOpHash,
} from "../reducers/everTezosTransactions";

function* depositFn(action) {
  debug("params", action.payload);

  yield put(setLoading());

  const everWallet = yield select((state) => state.everWallet.data);
  if (!everWallet) {
    yield put(setError(NO_WALLET));
    return;
  }

  const proxyContract = new Contract(
    everRpcClient,
    TokenProxy,
    new Address(TOKEN_PROXY_ADDRESS),
  );
  const encodeCall = proxyContract.methods.encodeTezosAddrPayload({
    recipient: action.payload.receiver,
  });
  const resEncode = yield call(encodeCall.call.bind(encodeCall), {});
  debug("encode_tezos_addr", resEncode);

  const rootContract = new Contract(
    everRpcClient,
    TokenRoot,
    new Address(
      "0:0d9b85d42c4824fb8b92ffc122168d92b431b6814686fa04af25277a987683a5",
    ),
  );
  const walletOfCall = rootContract.methods.walletOf({
    answerId: 0,
    walletOwner: new Address(everWallet.address),
  });
  const walletOfRes = yield call(walletOfCall.call.bind(walletOfCall), {});
  debug("wallet_of", walletOfRes);

  yield put(setOpHash("" + Math.random()));

  const walletContract = new Contract(
    everRpcClient,
    TokenWallet,
    walletOfRes.value0,
  );
  const walletCall = walletContract.methods.burn({
    amount: action.payload.amount,
    callbackTo: new Address(TOKEN_PROXY_ADDRESS),
    payload: resEncode.data,
    remainingGasTo: new Address(everWallet.address),
  });
  const walletRes = yield walletCall.send({
    amount: "1600000000",
    bounce: true,
    from: new Address(everWallet.address),
  });
  debug("ever_operation_hash", walletRes.id.hash);
}

export default function* depositEverTezosSaga() {
  yield takeLatest(deposit, depositFn);
}
