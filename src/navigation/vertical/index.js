import {
  Mail,
  Home,
  Folder,
  Lock,
  Circle,
  Book,
  BookOpen,
} from "react-feather";

const getMenuData = ({ t }) => [
  {
    id: "home",
    title: t("page.home"),
    icon: <Home size={20} />,
    navLink: "/home",
    authorization: false,
    can: [1, 2, 3],
  },
  {
    id: "studySet",
    title: t("page.studySet"),
    icon: <Book size={20} />,
    navLink: "/study-set",
    authorization: true,
    can: [1, 2, 3],
  },
  {
    id: "classroom",
    title: t("page.classroom"),
    icon: <BookOpen size={20} />,
    navLink: "/classes",
    authorization: true,
    can: [1, 2, 3],
  },
  {
    id: "managment",
    title: t("page.managment"),
    icon: <Lock size={20} />,
    navLink: "/managment",
    authorization: true,
    can: [1, 2],
    children: [
      {
        id: "user-managment",
        title: t("page.user"),
        icon: <Circle size={12} />,
        navLink: "/managment/user",
        authorization: true,
        can: [1],
      },
      {
        id: "modorator-managment",
        title: t("page.moderator"),
        icon: <Circle size={12} />,
        can: [1, 2],
        children: [
          {
            id: "modorator-managment-study-set",
            title: t("page.studySet"),
            navLink: "/managment/moderator-study-set",
            authorization: true,
            can: [1, 2],
          },
        ],
      },
    ],
  },
  {
    id: "folder",
    title: t("fieldName.folder"),
    icon: <Folder size={20} />,
    navLink: "/folder",
    authorization: true,
    can: [1, 2, 3],
  },
];

export default getMenuData;
