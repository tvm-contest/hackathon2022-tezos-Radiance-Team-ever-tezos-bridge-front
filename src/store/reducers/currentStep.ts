import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {CurrentStepState, RootState, Step, StepAction} from "../../types";

const initialState: CurrentStepState = {
  value: Step.EnterValues,
};

export const currentStepSlice = createSlice({
  initialState,
  name: "currentStep",
  reducers: {
    next(state, action: PayloadAction<StepAction>) {
      state.value = action.payload;
    },
    prev(state) {
      state.value = Step.EnterValues;
    },
  },
});

export const {next, prev} = currentStepSlice.actions;

export const selectCurrentStep = (state: RootState) => state.currentStep.value;

export default currentStepSlice.reducer;
