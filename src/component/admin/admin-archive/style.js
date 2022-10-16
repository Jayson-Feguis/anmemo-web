import { makeStyles } from "@mui/styles";
import { createTheme } from "@mui/material/styles";

const theme = createTheme();
const useStyles = makeStyles(() => ({
  welcomeBox: {
    minHeight: "100px",
    marginTop: "30px",
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,0.1)",
  },
  welcomeText: {
    color: "black",
    float: "left",
    paddingTop: "40px",
    paddingLeft: "10px",
  },
  countempTitle: {
    color: "black",
  },
  mainbox: {
    backgroundImage:
      "url(https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-teacher-literature-flaticons-lineal-color-flat-icons.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "100px",

    background: "#fff",
    marginTop: "30px",
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,0.1)",
    padding: "14px 80px 18px 36px",
    cursor: "pointer",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
  mainbox2: {
    backgroundImage:
      "url(https://img.icons8.com/external-flaticons-flat-flat-icons/64/000000/external-department-university-flaticons-flat-flat-icons-3.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "100px",

    background: "#fff",
    marginTop: "30px",
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,0.1)",
    padding: "14px 80px 18px 36px",
    cursor: "pointer",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
  mainbox3: {
    backgroundImage:
      "url(https://img.icons8.com/external-flaticons-lineal-color-flat-icons/64/000000/external-archive-literature-flaticons-lineal-color-flat-icons-3.png)",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    backgroundSize: "100px",

    marginTop: "30px",
    borderRadius: "15px",
    boxShadow: "5px 5px 5px rgba(0,0,0,0.2)",
    background: "rgba(255,255,255,0.1)",
    padding: "14px 80px 18px 36px",
    cursor: "pointer",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.05, 1.05, 1)" },
  },
}));

export default useStyles;
