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
  marginTop: theme.spacing(8),
  position: "fixed",
  right: 0,
  top: 0,
  zIndex: 1300,
}));

export default function TokenListPopup({onClose, tokens}: TokenListPopupProps) {
  return (
    <StyledModal
      BackdropComponent={Backdrop}
      aria-describedby="modal-description"
      aria-labelledby="modal-title"
      onClose={onClose}
      open
    >
      <Box sx={{maxWidth: 400, width: "100%"}}>
        <Typography
          id="modal-title"
          sx={{
            mb: 1,
            textAlign: "center",
          }}
          variant="h1"
        >
          Select a token
        </Typography>
        <Typography id="modal-description" sx={{display: "none"}}>
          List of a tokens to select from
        </Typography>
        <SearchInput />
        {tokens.map((t) => (
          <TokenListItem key={t.name} token={t} />
        ))}
      </Box>
    </StyledModal>
  );
}
