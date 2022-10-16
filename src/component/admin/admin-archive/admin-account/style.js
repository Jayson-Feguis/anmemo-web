import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  tablebox: {
    borderRadius: "15px",
    boxShadow: "10px 10px 20px rgba(0,0,0,0.5)",
    background: "rgba(255,255,255,0.1)",
    marginTop: "20px",
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
  radioLabel: {
    fontSize: "4px",
  },
}));

export default useStyles;
