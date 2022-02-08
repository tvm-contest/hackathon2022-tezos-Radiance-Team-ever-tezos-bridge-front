import {createTheme} from "@mui/material";
import {orange} from "@mui/material/colors";

const theme = createTheme({
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          "&:hover": {
            boxShadow: "none",
          },
          borderRadius: 18,
          boxShadow: "none",
          fontSize: "1.25rem",
          fontWeight: 700,
          lineHeight: 1,
          padding: "16px 20px",
          textTransform: "none",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
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
  palette: {
    primary: {
      main: "#3569f0",
    },
  },
  status: {
    danger: orange[500],
  },
  typography: {
    fontFamily: ["Gilroy", "sans-serif"].join(","),
  },
});

export default theme;
