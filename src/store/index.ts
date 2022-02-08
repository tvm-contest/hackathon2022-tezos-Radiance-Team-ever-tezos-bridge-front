import { configureStore } from "@reduxjs/toolkit";
import currentStep from "./reducers/currentStep";

const store = configureStore({
  reducer: {
    currentStep,
  },
  devTools: process.env.NODE_ENV === "development",
});

export default store;
