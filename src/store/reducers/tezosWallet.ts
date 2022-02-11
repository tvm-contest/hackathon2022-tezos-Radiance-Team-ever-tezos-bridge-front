import {createSlice} from "@reduxjs/toolkit";

import {RootState, WalletState} from "../../types";

const initialState: WalletState | null = null;

export const tezosWalletSlice = createSlice({
  initialState,
  name: "tezosWallet",
  reducers: {
    connect() {
      // Handled by saga
    },
  },
});

export const {connect} = tezosWalletSlice.actions;

export const selectTezosWallet = (state: RootState) => state.tezosWallet;

export default tezosWalletSlice.reducer;
