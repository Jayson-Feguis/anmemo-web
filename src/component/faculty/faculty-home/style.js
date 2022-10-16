import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: "20px",
  },
  subContainer: {
    width: "100%",
    border: "1px lightgray solid",
    padding: "50px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    gap: "20px",
  },
  header: {
    width: "100%",
  },
  content: {
    [theme.breakpoints.up("md")]: {
      width: "70%",
    },
    [theme.breakpoints.down("md")]: {
      width: "100%",
    },
  },
  typoHeader: {
    textAlign: "left",
    color: "gray",
  },
  typoDate: {
    color: "gray",
    fontStyle: "italic",
    fontWeight: "bold",
  },
}));

export default useStyles;
