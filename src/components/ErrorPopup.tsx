import {Alert} from "@mui/material";
import {useMemo} from "react";

import useAppDispatch from "../hooks/useAppDispatch";
import useAppSelector from "../hooks/useAppSelector";
import {reset, selectEverTokensError} from "../store/reducers/everTokens";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer";

export default function ErrorPopup() {
  const dispatch = useAppDispatch();
  const everTokensError = useAppSelector(selectEverTokensError);

  const error = useMemo(() => {
    return Boolean(everTokensError);
  }, [everTokensError]);
  const errorMsg = useMemo(() => {
    return everTokensError;
  }, [everTokensError]);

  function onClose() {
    dispatch(reset());
  }

  return (
    <Modal
      BackdropComponent={Backdrop}
      aria-describedby="modal-description"
      aria-labelledby="modal-title"
      onClose={onClose}
      open={error}
    >
      <ModalContainer
        sx={{
          alignSelf: "start",
          background: "rgba(255, 255, 255, 0.6)",
          maxWidth: 600,
        }}
      >
        <Alert
          severity="error"
          sx={{
            backgroundColor: "transparent",
            border: "none",
            whiteSpace: "pre-line",
          }}
        >
          {errorMsg}
        </Alert>
      </ModalContainer>
    </Modal>
  );
}
