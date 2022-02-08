import {createTheme} from "@mui/material";
import {orange} from "@mui/material/colors";

const theme = createTheme({
  status: {
    danger: orange[500],
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontSize: "1.85rem",
          fontWeight: 700,
          lineHeight: 1,
        },
      },
    },
  },
});

export default theme;
