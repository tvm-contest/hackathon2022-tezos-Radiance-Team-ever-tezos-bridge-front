import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  FormControl,
  InputBase,
  InputLabel,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import {useMemo} from "react";

import {TokenInputProps} from "../types";

const StyledPaper = styled(Paper)(({theme}) => ({
  "&": {
    borderRadius: 24,
    borderWidth: 2,
    display: "flex",
    justifyContent: "space-between",
    padding: 20,
  },
}));

const StyledLabel = styled(InputLabel)(({theme}) => ({
  "&": {
    fontSize: "1.25rem",
  },
}));

const StyledInput = styled(InputBase)(({theme}) => ({
  "&": {
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
    fontSize: 16,
    padding: "10px 12px",
    position: "relative",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    width: "auto",
  },
}));

const Balance = styled("span")(({theme}) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.125rem",
  fontWeight: 700,
  textAlign: "end",
}));

export default function TokenInput({
  label,
  token,
  onConnectWallet,
  onSelectToken,
  wallet,
}: TokenInputProps) {
  const currentButton = useMemo(() => {
    if (token)
      return (
        <Stack justifyContent="space-between" spacing={1}>
          <Balance>Balance: {token.balance}</Balance>
          <Button onClick={onSelectToken}>{token.name}</Button>
        </Stack>
      );
    else if (wallet)
      return (
        <Stack justifyContent="flex-end">
          <Button endIcon={<KeyboardArrowDownIcon />} onClick={onSelectToken}>
            Select a token
          </Button>
        </Stack>
      );
    else
      return (
        <Stack justifyContent="flex-end">
          <Button onClick={onConnectWallet}>Connect wallet</Button>
        </Stack>
      );
  }, [wallet, token, onSelectToken, onConnectWallet]);

  return (
    <StyledPaper>
      <FormControl>
        <StyledLabel htmlFor="standard-input">{label}</StyledLabel>
        <StyledInput id="standard-input" />
      </FormControl>
      {currentButton}
    </StyledPaper>
  );
}
