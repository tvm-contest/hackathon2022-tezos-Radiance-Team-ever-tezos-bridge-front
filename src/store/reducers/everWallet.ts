import {createSlice} from "@reduxjs/toolkit";

import {RootState, WalletState} from "../../types";

const initialState: WalletState | null = null;

export const everWalletSlice = createSlice({
  initialState,
  name: "everWallet",
  reducers: {
    connect() {
      // Handled by saga
    },
  },
});

export const {connect} = everWalletSlice.actions;

export const selectEverWallet = (state: RootState) => state.everWallet;

export default everWalletSlice.reducer;
