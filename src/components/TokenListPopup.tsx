import {Typography} from "@mui/material";

import {TokenListPopupProps} from "../types";
import Backdrop from "./Backdrop";
import Modal from "./Modal";
import ModalContainer from "./ModalContainer";
import SearchInput from "./SearchInput";
import TokenListItem from "./TokenListItem";

export default function TokenListPopup({
  onClose,
  tokens,
  open = false,
  onTokenSelect,
}: TokenListPopupProps) {
  return (
    <Modal
      BackdropComponent={Backdrop}
      aria-describedby="token-list-modal-description"
      aria-labelledby="token-list-modal-title"
      onClose={onClose}
      open={open}
    >
      <ModalContainer
        sx={{
          background: "rgba(255, 255, 255, 0.6)",
          maxWidth: 600,
        }}
      >
        <Typography
          color="textSecondary"
          id="token-list-modal-title"
          sx={{
            mb: 2,
            textAlign: "center",
          }}
          variant="h1"
        >
          Select a token
        </Typography>
        <Typography id="token-list-modal-description" sx={{display: "none"}}>
          List of a tokens to select from
        </Typography>
        <SearchInput containerProps={{sx: {mb: 2}}} />
        {tokens?.map((t) => (
          <TokenListItem
            key={t.name}
            onClick={() => onTokenSelect(t)}
            token={t}
          />
        ))}
      </ModalContainer>
    </Modal>
  );
}
