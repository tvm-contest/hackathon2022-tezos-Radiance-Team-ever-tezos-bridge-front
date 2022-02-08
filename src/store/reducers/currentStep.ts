import {createSlice} from "@reduxjs/toolkit";

import {CurrentStepState, RootState} from "../../types";

const initialState: CurrentStepState = {
  value: 1,
};

export const currentStepSlice = createSlice({
  initialState,
  name: "currentStep",
  reducers: {
    next(state) {
      state.value += 1;
    },
    prev(state) {
      state.value -= 1;
    },
  },
});

export const {next, prev} = currentStepSlice.actions;

export const selectCurrentStep = (state: RootState) => state.currentStep.value;

export default currentStepSlice.reducer;
