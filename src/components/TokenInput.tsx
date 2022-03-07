import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LinkIcon from "@mui/icons-material/Link";
import {
  Button,
  CircularProgress,
  FormControl,
  InputBase,
  InputLabel,
  Paper,
  Stack,
  StackProps,
} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";
import {useMemo} from "react";

import {TokenInputProps} from "../types";

const StyledPaper = styled(Paper)(({theme}) => ({
  "&": {
    borderRadius: 24,
    borderWidth: 2,
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
    height: "100%",
    marginTop: theme.spacing(3),
  },
  "& .MuiInputBase-input": {
    "&:focus": {
      borderColor: theme.palette.primary.main,
      boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
    },
    fontSize: "2.5rem",
    fontWeight: 700,
    height: "inherit",
    padding: 0,
    position: "relative",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
  },
}));

const Balance = styled("span")(({theme}) => ({
  color: theme.palette.text.secondary,
  fontSize: "1.125rem",
  fontWeight: 700,
  textAlign: "end",
}));

export default function TokenInput({
  extensionInstalled,
  extensionLabel,
  extensionLink,
  label,
  loading,
  onConnectWallet,
  onSelectToken,
  token,
  wallet,
  walletLabel,
  ...rest
}: TokenInputProps) {
  const CurrentButton = useMemo(() => {
    if (token)
      return (props: StackProps) => (
        <Stack justifyContent="space-between" spacing={1} {...props}>
          <Balance>Balance: {token.balance}</Balance>
          <Button onClick={onSelectToken}>{token.name}</Button>
        </Stack>
      );
    else if (wallet && rest.readOnly) return () => null;
    else if (wallet)
      return (props: StackProps) => (
        <Stack justifyContent="flex-end" {...props}>
          <Button endIcon={<KeyboardArrowDownIcon />} onClick={onSelectToken}>
            Select a token
          </Button>
        </Stack>
      );
    else if (extensionInstalled)
      return (props: StackProps) => (
        <Stack justifyContent="flex-end" {...props}>
          <Button
            endIcon={loading && <CircularProgress color="inherit" size={25} />}
            onClick={onConnectWallet}
          >
            {walletLabel}
          </Button>
        </Stack>
      );
    else
      return (props: StackProps) => (
        <Stack justifyContent="flex-end" {...props}>
          <Button
            endIcon={<LinkIcon />}
            href={extensionLink}
            sx={{textAlign: "center"}}
            target="_blank"
            variant="outlined"
          >
            {extensionLabel}
          </Button>
        </Stack>
      );
  }, [
    extensionLink,
    extensionInstalled,
    extensionLabel,
    loading,
    onSelectToken,
    onConnectWallet,
    rest.readOnly,
    token,
    wallet,
    walletLabel,
  ]);

  return (
    <StyledPaper>
      <Stack direction="row" justifyContent="space-between" spacing={1}>
        <FormControl sx={{flexGrow: 1}}>
          <StyledLabel htmlFor="standard-input">{label}</StyledLabel>
          <StyledInput
            id="standard-input"
            {...rest}
            sx={{color: "text.secondary"}}
          />
        </FormControl>
        <CurrentButton sx={{flexBasis: 350}} />
      </Stack>
    </StyledPaper>
  );
}
