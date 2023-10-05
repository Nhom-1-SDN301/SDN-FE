import { Mail, Home, AlertOctagon, Folder } from "react-feather";

export default [
  {
    id: "home",
    title: "Home",
    icon: <Home size={20} />,
    navLink: "/home",
  },
  {
    id: "studySet",
    title: "Study Sets",
    icon: <Mail size={20} />,
    navLink: "/study-set",
  },
  {
    id: "classroom",
    title: "Classroom",
    icon: <AlertOctagon size={20}/>,
    navLink: "/classroom"
  },
  {
    id: "folder",
    title: "Folder",
    icon: <Folder  size={20}/>,
    navLink: "/folder"
  }
];
