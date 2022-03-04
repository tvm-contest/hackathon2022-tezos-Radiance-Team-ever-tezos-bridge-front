import {PayloadAction} from "@reduxjs/toolkit";
import {Address, Contract} from "everscale-inpage-provider";
import {
  call,
  put,
  SagaReturnType,
  select,
  takeLatest,
} from "redux-saga/effects";

import everRpcClient from "../../lib/everRpcClient";
import client from "../../lib/everWSClient";
import {PROXY_ADDRESS, TOKEN_ROOT_PROXY} from "../../misc/constants";
import {NO_WALLET} from "../../misc/error-messages";
import {MultisigWallet, TokenProxy, TokenWallet} from "../../misc/ever-abi";
import {CallReturnType, DepositAction, RootState} from "../../types";
import {debug} from "../../utils/console";
import {deposit, setError, setLoading} from "../reducers/everTezosTransactions";

function* depositFn(action: PayloadAction<DepositAction>) {
  yield put(setLoading());

  const everWallet: SagaReturnType<() => RootState["everWallet"]["data"]> =
    yield select((state: RootState) => state.everWallet.data);
  if (!everWallet) {
    yield put(setError(NO_WALLET));
    return;
  }

  const proxyContract = new Contract(
    everRpcClient,
    TokenProxy,
    new Address(TOKEN_ROOT_PROXY),
  );
  const encodeCall = proxyContract.methods.encodeTezosAddrPayload({
    recipient: action.payload.receiver,
  });
  const resEncode: CallReturnType<typeof encodeCall.call> = yield call(
    encodeCall.call.bind(encodeCall),
    {},
  );
  debug("encode_tezos_addr", resEncode);

  const {body}: CallReturnType<typeof client.abi.encode_message_body> =
    yield call(client.abi.encode_message_body.bind(client.abi), {
      abi: {type: "Contract", value: TokenWallet as any},
      call_set: {
        function_name: "burn",
        input: {
          amount: action.payload.amount,
          callbackTo: PROXY_ADDRESS,
          payload: resEncode.data,
          remainingGasTo: everWallet.address,
        },
      },
      is_internal: true,
      signer: {type: "None"},
    });
  debug("encoded_body", body);

  const multisigContract = new Contract(
    everRpcClient,
    MultisigWallet,
    new Address(everWallet.address),
  );
  const transactionCall = multisigContract.methods.sendTransaction({
    bounce: true,
    dest: new Address(everWallet.address),
    flags: 3,
    payload: body,
    value: 1600000000,
  });
  const resTransaction: CallReturnType<typeof transactionCall.call> =
    yield call(transactionCall.call.bind(transactionCall), {});
  debug("transaction_response", resTransaction);
}

export default function* depositSaga() {
  yield takeLatest(deposit, depositFn);
}
