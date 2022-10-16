import { blue, blueGrey } from "@mui/material/colors";
import { makeStyles } from "@mui/styles";

export const useStyles = makeStyles((theme) => ({
  navlinks: {
    "&:hover, &:hover div": {
      color: "#800000",
    },
    "& div": {
      color: "black",
    },
  },
  navlinksactive: {
    backgroundColor: "lightgray !important",
    color: 'white !important',
    "&:hover, &:hover div": {
      color: "#800000",
    },
    "& div": {
      color: "#800000",
    },
  },
}));
