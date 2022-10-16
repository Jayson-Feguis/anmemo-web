import { createTheme } from "@mui/material";

const customTheme = createTheme({
  palette: {
    bgcolors: {
      main: "#000000",
    },
  },
  typography: {
    textTransform: "none",
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
    },
  },
});

export default customTheme;
