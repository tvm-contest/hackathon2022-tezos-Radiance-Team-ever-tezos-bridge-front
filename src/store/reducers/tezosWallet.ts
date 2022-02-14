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
    connect(_) {
      // Handled by saga
    },
    disconnect(_) {
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
  tezosWalletSlice.actions;

export const selectTezosWallet = (state: RootState) => state.tezosWallet;

export default tezosWalletSlice.reducer;
