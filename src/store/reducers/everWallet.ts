import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState, Wallet, WalletState} from "../../types";

const initialState: WalletState = {
  data: null,
  error: null,
  fetched: false,
  loading: false,
};

export const everWalletSlice = createSlice({
  initialState,
  name: "everWallet",
  reducers: {
    connect() {
      // Handled by saga
    },
    disconnect() {
      // handled by saga
    },
    setConnected(state, action: PayloadAction<Wallet>) {
      state.data = action.payload;
      state.error = null;
      state.fetched = true;
      state.loading = false;
    },
    setConnecting(state) {
      state.error = null;
      state.fetched = false;
      state.loading = true;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.fetched = true;
      state.loading = false;
    },
  },
});

export const {connect, disconnect, setConnecting, setError, setConnected} =
  everWalletSlice.actions;

export const selectEverWallet = (state: RootState) => state.everWallet.data;

export default everWalletSlice.reducer;
