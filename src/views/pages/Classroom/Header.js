// ** Reactstrap
import { Nav, NavItem, NavLink } from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Icons
import { Tv, Users } from "react-feather";
import { FaRegNoteSticky } from "react-icons/fa6";

const Header = ({ activeTab, toggleTab, canManageTest }) => {
  // ** Hooks
  const { t } = useTranslation();

  return (
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <Tv size={18} className="me-50" />
          <span className="fw-bold">{t("fieldName.stream")}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <FaRegNoteSticky size={18} className="me-50" />
          <span className="fw-bold">{t("fieldName.test")}</span>
        </NavLink>
      </NavItem>
      {canManageTest && (
        <NavItem>
          <NavLink active={activeTab === "4"} onClick={() => toggleTab("4")}>
            <Users size={18} className="me-50" />
            <span className="fw-bold">{t("fieldName.manageTest")}</span>
          </NavLink>
        </NavItem>
      )}
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <Users size={18} className="me-50" />
          <span className="fw-bold">{t("fieldName.people")}</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Header;
