import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  tablebox: {
    borderRadius: "15px",
    boxShadow: "10px 10px 20px rgba(0,0,0,0.5)",
    background: "rgba(255,255,255,0.1)",
  },
  loginContainer: {
    backgroundImage: "url(/images/main-background.jpg)",
    backgroundPosition: "center",
    backgroundSize: "cover",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",

    [theme.breakpoints.up("md")]: {
      paddingRight: "100px",
      justifyContent: "end",
    },
    [theme.breakpoints.down("md")]: {
      paddingRight: "0px",
      justifyContent: "center",
    },
  },
  loginCard: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    padding: "20px",
    background: "white",
    border: "1px lightgray solid",
    borderRadius: "10px",

    [theme.breakpoints.up("md")]: {
      width: "400px",
    },
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
  },
  Form: {
    width: "100%",
  },
  btnEdit: {
    color: "yellowgreen !important",
  },
  btnDelete: {
    color: "red !important",
  },
}));

export default useStyles;
