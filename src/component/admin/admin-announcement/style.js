import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  cardContainer: {
    width: "270px",
    height: "350px",
    border: "1px solid lightgray",
    borderRadius: "10px",
    padding: "10px",
    boxShadow: "0px 0px 13px -3px rgba(0,0,0,0.1)",
    background: "#fff",
  },
  cardTitle: {
    fontWeight: "bolder",
  },
  cardContent: {
    height: "250px",
    whiteSpace: "pre-line",
    textOverflow: "ellipsis",
    wordWrap: "break-word",
    textAlign: "left",
    overflow: "hidden",
    transition: "all ease 0.5s",
    "&:hover": {
      boxShadow: "inset 0px -7px 264px -3px rgba(0,0,0,0.1)",
      cursor: "pointer",
    },
  },
  btnSend: {
    color: "blue !important",
  },
  btnEdit: {
    color: "yellowgreen !important",
  },
  btnDelete: {
    color: "red !important",
  },
}));

export default useStyles;
