// ** Reactstrap
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { CardBody, CardHeader, Row, Table } from "reactstrap";

const TableHistory = () => {
  // ** Hooks
  const { t } = useTranslation();

  return (
    <div style={{ paddingBottom: "1rem" }}>
      <div style={{ padding: "0 21px", marginBottom: "1rem" }}>
        <h4>{t("common.testHistoryTitle")}</h4>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-center">{t("fieldName.attempt")}</th>
            <th className="text-center">State</th>
            <th className="text-center">Mark</th>
            <th className="text-center">Review</th>
          </tr>
        </thead>
        <tbody></tbody>
      </Table>
    </div>
  );
};

export default TableHistory;
