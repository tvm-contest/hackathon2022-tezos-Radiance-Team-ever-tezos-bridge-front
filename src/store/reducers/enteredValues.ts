import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {EnteredValuesAction, EnteredValuesState, RootState} from "../../types";

const initialState: EnteredValuesState = {
  data: null,
};

export const enteredValuesSlice = createSlice({
  initialState,
  name: "enteredValues",
  reducers: {
    resetValues() {
      return initialState;
    },
    setValues(state, action: PayloadAction<EnteredValuesAction>) {
      return {
        data: action.payload,
      };
    },
  },
});

export const {resetValues, setValues} = enteredValuesSlice.actions;

export const selectEnteredValues = (state: RootState) => state.enteredValues;

export default enteredValuesSlice.reducer;
