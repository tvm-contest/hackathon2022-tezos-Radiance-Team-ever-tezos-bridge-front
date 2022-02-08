import { configureStore } from "@reduxjs/toolkit";
import currentStep from "./reducers/currentStep";

const store = configureStore({
  reducer: {
    currentStep,
  },
});

export default store;
