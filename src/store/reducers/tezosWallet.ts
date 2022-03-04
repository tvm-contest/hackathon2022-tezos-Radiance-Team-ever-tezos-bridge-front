import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState, Wallet, WalletState} from "../../types";

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
    check() {
      // Handled by saga
    },
    connect() {
      // Handled by saga
    },
    disconnect() {
      // handled by saga
    },
    reset() {
      return initialState;
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

export const {
  check,
  connect,
  disconnect,
  reset,
  setConnecting,
  setError,
  setConnected,
} = tezosWalletSlice.actions;

export const selectTezosWallet = (state: RootState) => state.tezosWallet.data;
export const selectTezosWalletError = (state: RootState) =>
  state.tezosWallet.error;
export const selectTezosWalletLoading = (state: RootState) =>
  state.tezosWallet.loading;

export default tezosWalletSlice.reducer;
