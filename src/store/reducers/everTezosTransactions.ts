import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {DepositAction, EverTezosTransactionsState} from "../../types";

const initialState: EverTezosTransactionsState = {
  currentTransaction: {
    id: null, // 1 step
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
    setLoading(state) {
      state.loading = true;
      state.fetched = false;
      state.error = null;
    },
  },
});

export const {deposit, setError, setLoading} =
  everTezosTransactionsSlice.actions;

export default everTezosTransactionsSlice.reducer;
