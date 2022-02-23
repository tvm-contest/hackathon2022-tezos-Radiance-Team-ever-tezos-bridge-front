import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {PermissionsState, RootState} from "../../types";

const initialState: PermissionsState = {
  error: null,
  fetched: false,
  loading: false,
  permittedTezosTokens: [],
};

export const permissionsSlice = createSlice({
  initialState,
  name: "permissions",
  reducers: {
    getTezosPermissions() {
      // Handled by saga
    },
    permitTezosToken() {
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
    setTezosPermissions(state, action: PayloadAction<string[]>) {
      state.permittedTezosTokens = action.payload;
      state.loading = false;
      state.fetched = true;
      state.error = null;
    },
  },
});

export const {
  getTezosPermissions,
  permitTezosToken,
  setError,
  setLoading,
  setTezosPermissions,
} = permissionsSlice.actions;

export const selectPermittedTezosTokens = (state: RootState) =>
  state.permissions.permittedTezosTokens;

export default permissionsSlice.reducer;
