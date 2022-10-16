import ROUTES from "../../../routes/Routes";
import HomeIcon from "@mui/icons-material/Home";
import ArticleIcon from "@mui/icons-material/Article";
import NoteAltIcon from "@mui/icons-material/NoteAlt";

export const navItems = [
  {
    id: 1,
    label: "Home",
    link: ROUTES.FACULTY_ANNOUNCEMENT,
    icon: <HomeIcon />,
  },
  {
    id: 2,
    label: "Documents",
    link: ROUTES.FACULTY_DOCUMENT,
    icon: <ArticleIcon />,
  },
  {
    id: 3,
    label: "Memorandum",
    link: ROUTES.FACULTY_MEMORANDUM,
    icon: <NoteAltIcon />,
  },
  // {
  //   id: 4,
  //   label: "Announcement",
  //   link: ROUTES.FACULTY_ANNOUNCEMENT,
  //   icon: <HomeIcon />,
  // },
];
