import { blue, blueGrey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  navlinks: {
    color: "black",
    "&:hover, &:hover div": {
      color: "#800000",
    },
    "& div": {
      color: "black",
    },
  },
  navlinksactive: {
    color: "#800000",
    "&:hover, &:hover div": {
      color: "#800000",
    },
    "& div": {
      color: "#800000",
    },
  },
}));
