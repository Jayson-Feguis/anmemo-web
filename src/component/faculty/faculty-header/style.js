import { blue, blueGrey } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';


export const useStyles = makeStyles((theme) => ({
    logo: {
        color: "white",
        fontWeight: "bold"
    },

    menuColor: {
        color: "white !important"
    },

    navlist: {
        minWidth: "250px",
        maxWidth: "300px",
        cursor: 'pointer',
    },

    navAavatar: {
        height: "35px",
        width: "35px"
    },

    ulAvatar: {
        backgroundColor: "skyblue !important"
    },

    navlinks: {
        color: blueGrey['A400'],
        "&:hover, &:hover div": {
            color: blue['A400']
        },
        "& div": {
            color: blueGrey['A400']
        }
    },

    activeNavlinks: {
        color: blue['A700'],
        "& div": {
            color: blue['A700']
        }
    }
}))