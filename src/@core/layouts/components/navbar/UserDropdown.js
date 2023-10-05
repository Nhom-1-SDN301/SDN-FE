// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import {
  User,
  Mail,
  CheckSquare,
  MessageSquare,
  Settings,
  CreditCard,
  HelpCircle,
  Power,
} from "react-feather";

// ** Reactstrap Imports
import {
  UncontrolledDropdown,
  DropdownMenu,
  DropdownToggle,
  DropdownItem,
  Button,
} from "reactstrap";

// ** Default Avatar Image
import defaultAvatar from "@src/assets/images/portrait/small/avatar-s-11.jpg";

// ** Redux import
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../redux/auth";

// ** Styles
import styles from "./styles.module.scss";
import { useTranslation } from "react-i18next";

const UserDropdown = () => {
  // ** Hooks
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);

  // ** Handler
  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <UncontrolledDropdown
      tag="li"
      className={`dropdown-user nav-item ${styles.user_dropdown}`}
    >
      {user ? (
        <>
          <DropdownToggle
            href="/"
            tag="a"
            className="nav-link dropdown-user-link"
            onClick={(e) => e.preventDefault()}
          >
            <div className="user-nav d-sm-flex d-none">
              <span className="user-name fw-bold">{user?.fullName}</span>
              <span className="user-status">{user?.role?.name}</span>
            </div>
            <Avatar
              img={defaultAvatar}
              imgHeight="40"
              imgWidth="40"
              status="online"
            />
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <User size={14} className="me-75" />
              <span className="align-middle">Profile</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <Mail size={14} className="me-75" />
              <span className="align-middle">Inbox</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <CheckSquare size={14} className="me-75" />
              <span className="align-middle">Tasks</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <MessageSquare size={14} className="me-75" />
              <span className="align-middle">Chats</span>
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem
              tag={Link}
              to="/pages/"
              onClick={(e) => e.preventDefault()}
            >
              <Settings size={14} className="me-75" />
              <span className="align-middle">Settings</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <CreditCard size={14} className="me-75" />
              <span className="align-middle">Pricing</span>
            </DropdownItem>
            <DropdownItem tag={Link} to="/" onClick={(e) => e.preventDefault()}>
              <HelpCircle size={14} className="me-75" />
              <span className="align-middle">FAQ</span>
            </DropdownItem>
            <DropdownItem tag={Link} onClick={handleLogout}>
              <Power size={14} className="me-75" />
              <span className="align-middle">Logout</span>
            </DropdownItem>
          </DropdownMenu>
        </>
      ) : (
        <>
          <Button.Ripple
            className={styles.button}
            outline
            color="primary"
            style={{ padding: ".75rem 1rem", margin: "0 .5rem" }}
            onClick={() => navigate("/login")}
          >
            {t("fieldName.login")}
          </Button.Ripple>
          <Button.Ripple
            color="primary"
            style={{ padding: ".75rem 1rem" }}
            onClick={() => navigate("/register")}
          >
            {t("fieldName.register")}
          </Button.Ripple>
        </>
      )}
    </UncontrolledDropdown>
  );
};

export default UserDropdown;
