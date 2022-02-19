import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputBase,
  Paper,
  styled,
} from "@mui/material";

import { SearchInputProps } from "../types";

const StyledPaper = styled(Paper)(() => ({
  "&": {
    borderRadius: 24,
    padding: "20px 57px",
  },
}));

const StyledFormControl = styled(FormControl)(() => ({
  "&": {
    display: "flex",
  },
}));

export default function SearchInput({
  containerProps,
  inputProps,
}: SearchInputProps) {
  return (
    <StyledPaper {...containerProps}>
      <StyledFormControl>
        <InputBase
          id="search-input"
          placeholder="Search name or paste address"
          startAdornment={<SearchIcon />}
          {...inputProps}
        />
      </StyledFormControl>
    </StyledPaper>
  );
}
