import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  btnSend: {
    color: "blue !important",
  },
  btnEdit: {
    color: "yellowgreen !important",
  },
  btnDelete: {
    color: "red !important",
  },
  btnView: {
    color: "gray !important",
  },
  btnDownload: {
    color: "green !important",
    border: "1px lightgray solid",
    borderRadius: "2px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "28px",
    "&:hover": {
      border: "1px #40A9FF solid",
    },
  },
}));

export default useStyles;
