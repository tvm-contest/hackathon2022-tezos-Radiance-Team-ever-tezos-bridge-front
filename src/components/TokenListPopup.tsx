import {ModalUnstyled} from "@mui/base";
import {Box, styled, Typography} from "@mui/material";

import {TokenListPopupProps} from "../types";
import Backdrop from "./Backdrop";
import SearchInput from "./SearchInput";
import TokenListItem from "./TokenListItem";

const StyledModal = styled(ModalUnstyled)(({theme}) => ({
  bottom: 0,
  display: "flex",
  justifyContent: "center",
  left: 0,
  marginBottom: theme.spacing(8),
  marginTop: theme.spacing(8),
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: 1300,
}));

const StyledContainer = styled(Box)(({theme}) => ({
  background: "rgba(255, 255, 255, 0.6)",
  border: "1px solid #eee",
  borderRadius: 30,
  maxWidth: 600,
  padding: 30,
  width: "90%",
}));

export default function TokenListPopup({
  onClose,
  tokens,
  open = false,
  onTokenSelect,
}: TokenListPopupProps) {
  return (
    <StyledModal
      BackdropComponent={Backdrop}
      aria-describedby="modal-description"
      aria-labelledby="modal-title"
      onClose={onClose}
      open={open}
    >
      <StyledContainer>
        <Typography
          color="textSecondary"
          id="modal-title"
          sx={{
            mb: 2,
            textAlign: "center",
          }}
          variant="h1"
        >
          Select a token
        </Typography>
        <Typography id="modal-description" sx={{display: "none"}}>
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
      </StyledContainer>
    </StyledModal>
  );
}
