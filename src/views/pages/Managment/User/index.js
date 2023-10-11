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
      <BreadCrumbsPage
        title={t("page.user")}
        data={[{ title: t("page.managment") }, { title: t("page.user") }]}
      />
      <Row>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="primary"
            statTitle="Total Users"
            icon={<User size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">21,459</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="danger"
            statTitle="Paid Users"
            icon={<UserPlus size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">4,567</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="success"
            statTitle="Active Users"
            icon={<UserCheck size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">19,860</h3>}
          />
        </Col>
        <Col lg="3" sm="6">
          <StatsHorizontal
            color="warning"
            statTitle="Pending Users"
            icon={<UserX size={20} />}
            renderStats={<h3 className="fw-bolder mb-75">237</h3>}
          />
        </Col>
      </Row>
      <Table />
    </div>
  );
};

export default UserManagment;
