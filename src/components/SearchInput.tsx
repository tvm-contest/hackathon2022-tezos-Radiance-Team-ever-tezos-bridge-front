import SearchIcon from "@mui/icons-material/Search";
import {
  FormControl,
  InputBase,
  InputBaseProps,
  Paper,
  styled,
} from "@mui/material";

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

export default function SearchInput(props: InputBaseProps) {
  return (
    <StyledPaper>
      <StyledFormControl>
        <InputBase
          id="search-input"
          placeholder="Search name or paste address"
          startAdornment={<SearchIcon />}
          {...props}
        />
      </StyledFormControl>
    </StyledPaper>
  );
}
