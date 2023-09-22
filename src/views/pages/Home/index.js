// ** Reactstrap import
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  CardText,
  CardLink,
  Col,
  Row,
} from "reactstrap";

// ** Third Party Components
import ReactPaginate from 'react-paginate'

// ** Components import
import CardCongratulations from "../../ui-elements/cards/advance/CardCongratulations";
import CardTerm from "../../ui-elements/cards/advance/CardTerm";
import BreadCrumbsPage from "@components/breadcrumbs";
import { useTranslation } from "react-i18next";

const Home = () => {
  // ** Hooks
  const { t } = useTranslation();

  return (
    <div>
      <BreadCrumbsPage title={t("page.home")} data={[]} />

      <Row className="match-height">
        <CardCongratulations />
      </Row>

      <Row className="match-height">
        <Row className="mb-1">
          <h3>{t("common.recent")}</h3>
        </Row>
        <Row style={{ paddingRight: 0 }}> 
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
          <CardTerm />
        </Row>
        <Row>
          <ReactPaginate
            nextLabel=""
            pageCount={10}
            breakLabel="..."
            previousLabel=""
            pageRangeDisplayed={5}
            marginPagesDisplayed={2}
            activeClassName="active"
            pageClassName="page-item"
            breakClassName="page-item"
            nextLinkClassName="page-link"
            pageLinkClassName="page-link"
            nextClassName="page-item next"
            breakLinkClassName="page-link"
            previousLinkClassName="page-link"
            previousClassName="page-item prev"
            containerClassName="pagination react-paginate justify-content-end"
          />
        </Row>
      </Row>
    </div>
  );
};

export default Home;
