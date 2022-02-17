import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";

import currentStep from "./reducers/currentStep";
import everTokens from "./reducers/everTokens";
import everWallet from "./reducers/everWallet";
import tezosTokens from "./reducers/tezosTokens";
import tezosWallet from "./reducers/tezosWallet";
import connectEverWallet from "./sagas/connectEverWallet";
import connectTezosWallet from "./sagas/connectTezosWallet";
import fetchEverTokensSaga from "./sagas/fetchEverTokens";
import fetchTezosTokensSaga from "./sagas/fetchTezosTokens";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  // mount it on the Store
  middleware: [sagaMiddleware],
  reducer: {
    currentStep,
    everTokens,
    everWallet,
    tezosTokens,
    tezosWallet,
  },
});

// then run the saga
sagaMiddleware.run(function* () {
  yield all([
    connectEverWallet(),
    connectTezosWallet(),
    fetchEverTokensSaga(),
    fetchTezosTokensSaga(),
  ]);
});

export default store;
