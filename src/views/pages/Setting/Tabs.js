// ** Reactstrap Imports
import { Nav, NavItem, NavLink } from "reactstrap";

// ** Icons Imports
import { User, Lock, Layout } from "react-feather";
import { useTranslation } from "react-i18next";

const Tabs = ({ activeTab, toggleTab }) => {
  const { t } = useTranslation();

  return (
    <Nav pills className="mb-2">
      <NavItem>
        <NavLink active={activeTab === "1"} onClick={() => toggleTab("1")}>
          <User size={18} className="me-50" />
          <span className="fw-bold">{t("fieldName.account")}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "2"} onClick={() => toggleTab("2")}>
          <Lock size={18} className="me-50" />
          <span className="fw-bold">{t("fieldName.security")}</span>
        </NavLink>
      </NavItem>
      <NavItem>
        <NavLink active={activeTab === "3"} onClick={() => toggleTab("3")}>
          <Layout size={18} className="me-50" />
          <span className="fw-bold">{t("fieldName.layout")}</span>
        </NavLink>
      </NavItem>
    </Nav>
  );
};

export default Tabs;
