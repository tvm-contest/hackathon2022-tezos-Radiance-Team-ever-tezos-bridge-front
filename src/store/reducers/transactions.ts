import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DepositAction, RootState, TransactionsState} from "../../types";

const initialState: TransactionsState = {
  currentTransaction: {
    id: null,
    opHash: null,
  },
  error: null,
  fetched: false,
  loading: false,
};

export const transactionsSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {
    deposit(_, __: PayloadAction<DepositAction>) {
      // Handled by saga
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.fetched = true;
      state.error = action.payload;
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
  setError,
  setId,
  setLoading,
  setOpHash,
  subscribeDeposit,
  subscribeReceive,
} = transactionsSlice.actions;

export const selectCurrentTransaction = (state: RootState) =>
  state.transactions.currentTransaction;

export default transactionsSlice.reducer;
