import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  Button,
  FormControl,
  InputBase,
  InputLabel,
  Paper,
  Stack,
} from "@mui/material";
import {alpha, styled} from "@mui/material/styles";

import {InputProps} from "../types";

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

export default function TokenInput({label, token}: InputProps) {
  return (
    <StyledPaper>
      <FormControl>
        <StyledLabel htmlFor="standard-input">{label}</StyledLabel>
        <StyledInput id="standard-input" />
      </FormControl>
      <Stack justifyContent={token ? "space-between" : "flex-end"}>
        <Button endIcon={<KeyboardArrowDownIcon />}>Select a token</Button>
      </Stack>
    </StyledPaper>
  );
}
