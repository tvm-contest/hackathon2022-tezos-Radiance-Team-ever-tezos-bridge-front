import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState, Token, TokensState} from "../../types";

const initialState: TokensState = {
  data: [],
  error: null,
  fetched: false,
  loading: false,
};

export const everTokensSlice = createSlice({
  initialState,
  name: "everTokens",
  reducers: {
    fetch(_) {
      // Handled by saga
    },
    reset() {
      return initialState;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.fetched = true;
      state.loading = false;
    },
    setFetched(state, action: PayloadAction<Token[]>) {
      state.data = action.payload;
      state.error = null;
      state.fetched = true;
      state.loading = false;
    },
    setLoading(state) {
      state.error = null;
      state.fetched = false;
      state.loading = true;
    },
  },
});

export const {fetch, reset, setError, setFetched, setLoading} =
  everTokensSlice.actions;

export const selectEverTokens = (state: RootState) => state.everTokens.data;

export default everTokensSlice.reducer;
