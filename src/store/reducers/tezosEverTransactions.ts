/* eslint-disable sort-keys */
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DepositAction, RootState, TransactionsState} from "../../types";

const initialState: TransactionsState = {
  currentTransaction: {
    opHash: null, // 1 step
    tezosId: null, // 2 step
    everId: null, // 3 step
  },
  error: null,
  fetched: false,
  loading: false,
};

export const tezosEverTransactionsSlice = createSlice({
  initialState,
  name: "tezosEverTransactions",
  reducers: {
    deposit(_, __: PayloadAction<DepositAction>) {
      // Handled by saga
    },
    resetTransaction() {
      return initialState;
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
    setTezosId(state, action: PayloadAction<number>) {
      state.currentTransaction.tezosId = action.payload;
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
    subscribeDeposit() {
      // Handled by saga
    },
    subscribeReceive() {
      // Handled by saga
    },
  },
});

export const {
  deposit,
  resetTransaction,
  setError,
  setEverId,
  setTezosId,
  setLoading,
  setOpHash,
  subscribeDeposit,
  subscribeReceive,
} = tezosEverTransactionsSlice.actions;

export const selectCurrentTezosEverTransaction = (state: RootState) =>
  state.tezosEverTransactions.currentTransaction;

export default tezosEverTransactionsSlice.reducer;
