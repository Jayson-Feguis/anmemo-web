import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  tablebox: {
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,1)",
    marginTop: "20px",
    zIndex: 3,
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
