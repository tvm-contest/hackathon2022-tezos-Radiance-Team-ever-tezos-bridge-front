/* eslint-disable sort-keys */
import {createTheme} from "@mui/material";

const theme = createTheme({
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 640,
      laptop: 1024,
      desktop: 1280,
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: "contained",
      },
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
        sizeSmall: {
          padding: "12px 16px",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "standard",
      },
    },
    MuiInputLabel: {
      defaultProps: {
        shrink: true,
      },
    },
    MuiPaper: {
      defaultProps: {
        variant: "outlined",
      },
      styleOverrides: {
        root: {
          borderColor: "rgba(0, 0, 0, 0.1)",
          borderStyle: "solid",
        },
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
    text: {
      primary: "#626262",
      secondary: "#333333",
    },
  },
  typography: {
    fontFamily: ["Gilroy", "sans-serif"].join(","),
  },
});

export default theme;
