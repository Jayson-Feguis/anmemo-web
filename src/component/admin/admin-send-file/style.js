import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tablebox: {
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,1)",
    marginTop: "20px",
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
