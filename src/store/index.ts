import {configureStore} from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import {all} from "redux-saga/effects";

import currentStep from "./reducers/currentStep";
import everWallet from "./reducers/everWallet";
import tezosWallet from "./reducers/tezosWallet";
import connectEverWallet from "./sagas/connectEverWallet";
import connectTezosWallet from "./sagas/connectTezosWallet";

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  // mount it on the Store
  middleware: [sagaMiddleware],
  reducer: {
    currentStep,
    everWallet,
    tezosWallet,
  },
});

// then run the saga
sagaMiddleware.run(function* () {
  yield all([connectEverWallet(), connectTezosWallet()]);
});

export default store;
