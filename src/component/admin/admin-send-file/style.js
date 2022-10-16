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
}));

export default useStyles;
