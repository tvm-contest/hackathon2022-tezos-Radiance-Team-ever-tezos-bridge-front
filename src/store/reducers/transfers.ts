import {createSlice, PayloadAction} from "@reduxjs/toolkit";

import {RootState, Transfer, TransfersState} from "../../types";

const initialState: TransfersState = {
  items: {
    data: [],
    error: null,
    fetched: false,
    loading: false,
  },
  modal: {
    visible: false,
  },
};

export const transfersSlice = createSlice({
  initialState,
  name: "transfers",
  reducers: {
    fetch() {
      // Handled by saga
    },
    hideModal(state) {
      state.modal.visible = false;
    },
    setError(state, action: PayloadAction<string>) {
      state.items.error = action.payload;
      state.items.fetched = true;
      state.items.loading = false;
    },
    setFetched(state, action: PayloadAction<Transfer[]>) {
      state.items.data = action.payload;
      state.items.error = null;
      state.items.fetched = true;
      state.items.loading = false;
    },
    setLoading(state) {
      state.items.error = null;
      state.items.fetched = false;
      state.items.loading = true;
    },
    showModal(state) {
      state.modal.visible = true;
    },
  },
});

export const {fetch, hideModal, setFetched, setError, setLoading, showModal} =
  transfersSlice.actions;

export const selectTransfersVisible = (state: RootState) =>
  state.transfers.modal.visible;
export const selectTransfers = (state: RootState) => state.transfers.items.data;

export default transfersSlice.reducer;
