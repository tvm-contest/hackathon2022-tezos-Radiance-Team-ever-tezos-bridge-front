import {createSlice} from "@reduxjs/toolkit";

import {RootState, WalletState} from "../../types";

const initialState: WalletState = null as WalletState;

export const everWalletSlice = createSlice({
  initialState,
  name: "everWallet",
  reducers: {
    connect(state) {
      // Handled by saga
    },
    disconnect() {
      return null;
    },
  },
});

export const {connect, disconnect} = everWalletSlice.actions;

export const selectEverWallet = (state: RootState) => state.everWallet;

export default everWalletSlice.reducer;
