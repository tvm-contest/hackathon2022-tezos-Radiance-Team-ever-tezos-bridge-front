import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {
  DepositAction,
  RootState,
  TezosEverTransactionsState,
} from "../../types";

const initialState: TezosEverTransactionsState = {
  currentTransaction: {
    everId: null, // 3 step (simulated)
    id: null, // 2 step
    opHash: null, // 1 step
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
    setEverId(state, action: PayloadAction<string>) {
      state.currentTransaction.everId = action.payload;
      state.loading = false;
      state.fetched = true;
      state.error = null;
    },
    setId(state, action: PayloadAction<number>) {
      state.currentTransaction.id = action.payload;
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
  setId,
  setLoading,
  setOpHash,
  subscribeDeposit,
  subscribeReceive,
} = tezosEverTransactionsSlice.actions;

export const selectCurrentTezosEverTransaction = (state: RootState) =>
  state.tezosEverTransactions.currentTransaction;

export default tezosEverTransactionsSlice.reducer;
