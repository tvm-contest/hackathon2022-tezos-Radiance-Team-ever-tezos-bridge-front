import {createSlice} from "@reduxjs/toolkit";

import {RootState, TransfersState} from "../../types";

const initialState: TransfersState = {
  items: {
    data: [],
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
    showModal(state) {
      state.modal.visible = true;
    },
  },
});

export const {fetch, hideModal, showModal} = transfersSlice.actions;

export const selectTransfersVisible = (state: RootState) =>
  state.transfers.modal.visible;

export default transfersSlice.reducer;
