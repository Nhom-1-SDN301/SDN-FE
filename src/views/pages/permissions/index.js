// ** Reactstrap
import { Col, Row } from "reactstrap";

// ** Icons
import { User, UserCheck, UserPlus, UserX } from "react-feather";

// ** Custom Components
import BreadCrumbsPage from "@components/breadcrumbs";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import Table from "./Table";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Styles
import "@styles/react/apps/app-users.scss";

const UserManagment = () => {
  const { t } = useTranslation();
  return (
    <div className="app-user-list">
      <h3>Permissions List</h3>
      <p>Each category(Basic, Professional, and Business) includes the four predefined roles shown below.</p>
      <Table />
    </div>
  );
};

export default UserManagment;
