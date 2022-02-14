import {createSlice} from "@reduxjs/toolkit";

import {RootState, WalletState} from "../../types";

const initialState: WalletState = {
  data: null,
  error: null,
  fetched: false,
  loading: false,
};

export const tezosWalletSlice = createSlice({
  initialState,
  name: "tezosWallet",
  reducers: {
    connect(_) {
      // Handled by saga
    },
    disconnect() {
      return initialState;
    },
  },
});

export const {connect, disconnect} = tezosWalletSlice.actions;

export const selectTezosWallet = (state: RootState) => state.tezosWallet;

export default tezosWalletSlice.reducer;
