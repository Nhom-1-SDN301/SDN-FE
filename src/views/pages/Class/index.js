// ** React
import { Fragment, useState } from "react";

// ** Components
import BreadCrumbsPage from "@components/breadcrumbs";
import NoClassView from "./NoClassView";
import { useTranslation } from "react-i18next";

const ClassPage = () => {
  // ** Hooks
  const { t } = useTranslation();
  const [classes, setClasses] = useState([]);

  return (
    <Fragment>
      <BreadCrumbsPage
        title={t("page.classroom")}
        data={[{ title: t("page.classroom") }]}
      />
      {classes.length === 0 ? (
        <NoClassView setData={setClasses} />
      ) : (
        <div>Class</div>
      )}
    </Fragment>
  );
};

export default ClassPage;
