// ** React
import { Fragment } from "react";
import { useTranslation } from "react-i18next";

// ** Reactstrap
import { Card, CardBody, CardTitle } from "reactstrap";
import TableClassmates from "./TableClassmates";

const PeopleTabContent = ({ klass }) => {
  //** Hooks
  const { t } = useTranslation();

  return (
    <Fragment>
      <Card>
        <CardBody>
          <CardTitle>{t("title.teacher")}</CardTitle>
        </CardBody>
      </Card>
      <TableClassmates klass={klass} />
    </Fragment>
  );
};

export default PeopleTabContent;
