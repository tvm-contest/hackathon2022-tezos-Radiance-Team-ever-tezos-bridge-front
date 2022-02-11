import {configureStore} from "@reduxjs/toolkit";

import currentStep from "./reducers/currentStep";
import everWallet from "./reducers/everWallet";
import tezosWallet from "./reducers/tezosWallet";

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: {
    currentStep,
    everWallet,
    tezosWallet,
  },
});

export default store;
