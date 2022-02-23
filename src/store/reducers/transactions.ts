import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DepositAction, RootState, TransactionsState} from "../../types";

const initialState: TransactionsState = {
  allTransactions: [],
  error: null,
  fetched: false,
  loading: false,
};

export const transactionsSlice = createSlice({
  initialState,
  name: "transactions",
  reducers: {
    addTransaction(state, action: PayloadAction<string>) {
      state.allTransactions.push(action.payload);
      state.loading = false;
      state.fetched = true;
      state.error = null;
    },
    deposit(_, __: PayloadAction<DepositAction>) {
      // Handled by saga
    },
    setError(state, action: PayloadAction<string>) {
      state.loading = false;
      state.fetched = true;
      state.error = action.payload;
    },
    setLoading(state) {
      state.loading = true;
      state.fetched = false;
      state.error = null;
    },
  },
});

export const {deposit, setLoading, setError} = transactionsSlice.actions;

export const selectPermittedTezosTokens = (state: RootState) =>
  state.permissions;

export default transactionsSlice.reducer;
