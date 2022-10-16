import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  welcomeBox: {
    marginTop: "30px",
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    backgroundColor: "rgba(255,255,255, 1) !important",
    padding: "20px",
  },
  welcomeText: {
    color: "black",
    fontFamily: "Montserrat !important",
  },
  countempTitle: {
    color: "black",
  },
  mainbox: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255, 1) !important",
    marginTop: "30px",
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    padding: "20px",
    cursor: "pointer",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
}));

export default useStyles;
