// ** Reactstrap
import { Col, Row } from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Icons
import { User, UserCheck, UserPlus, UserX } from "react-feather";

// ** Components import
import BreadCrumbsPage from "@components/breadcrumbs";
import StatsHorizontal from "@components/widgets/stats/StatsHorizontal";
import Table from "./Table";

const Moderator = () => {
  // ** Hooks
  const { t } = useTranslation();
  return (
    <div>
      <BreadCrumbsPage
        title={t("page.studySet")}
        data={[
          { title: t("page.managment") },
          { title: t("page.moderator") },
          { title: t("page.studySet") },
        ]}
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

export default Moderator;
