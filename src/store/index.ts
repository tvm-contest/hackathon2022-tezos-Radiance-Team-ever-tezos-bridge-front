import {configureStore} from "@reduxjs/toolkit";

import currentStep from "./reducers/currentStep";

const store = configureStore({
  devTools: process.env.NODE_ENV === "development",
  reducer: {
    currentStep,
  },
});

export default store;
