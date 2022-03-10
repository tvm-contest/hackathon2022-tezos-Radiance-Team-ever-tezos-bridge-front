/* eslint-disable sort-keys */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DepositAction, RootState, TransactionsState} from "../../types";

const initialState: TransactionsState = {
  currentTransaction: {
    opHash: null,
    everId: null,
    tezosId: null,
  },
  error: null,
  fetched: false,
  loading: false,
};

export const everTezosTransactionsSlice = createSlice({
  initialState,
  name: "everTezosTransactions",
  reducers: {
    deposit(_, __: PayloadAction<DepositAction>) {
      // Handled by saga
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.fetched = true;
      state.error = action.payload;
    },
    setEverId(state, action: PayloadAction<number>) {
      state.currentTransaction.everId = action.payload;
      state.loading = false;
      state.fetched = true;
      state.error = null;
    },
    setLoading(state) {
      state.loading = true;
      state.fetched = false;
      state.error = null;
    },
    setOpHash(state, action: PayloadAction<string>) {
      state.currentTransaction.opHash = action.payload;
      state.loading = false;
      state.fetched = true;
      state.error = null;
    },
    setTezosId(state, action: PayloadAction<number>) {
      state.currentTransaction.tezosId = action.payload;
      state.loading = false;
      state.fetched = true;
      state.error = null;
    },
    subscribe() {
      // Handled by saga
    },
  },
});

export const {
  deposit,
  setError,
  setEverId,
  setLoading,
  setOpHash,
  setTezosId,
  subscribe,
} = everTezosTransactionsSlice.actions;

export const selectCurrentEverTezosTransaction = (state: RootState) =>
  state.everTezosTransactions.currentTransaction;

export default everTezosTransactionsSlice.reducer;
