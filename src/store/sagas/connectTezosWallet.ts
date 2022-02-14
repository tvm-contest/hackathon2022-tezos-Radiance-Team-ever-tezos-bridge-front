import {call, put, select, takeLatest} from "redux-saga/effects";

import {connect} from "../reducers/tezosWallet";

export default function* connectTezosWallet() {
  yield takeLatest(connect, () => console.log("saga for tezos connect"));
}
