// ** React
import { Fragment, useEffect, useState } from "react";

// ** Components
import BreadCrumbsPage from "@components/breadcrumbs";
import NoClassView from "./NoClassView";
import Classes from "./Classes";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Apis
import { classApi } from "../../../@core/api/quiz";

// ** Redux
import { useSelector } from "react-redux";

const ClassPage = () => {
  // ** Hooks
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [classes, setClasses] = useState([]);
  const [filter, setFilter] = useState(null);
  const [mount, setMount] = useState(true);

  useEffect(() => {
    fetchClass();
  }, [filter]);

  // ** Handler
  const fetchClass = () => {
    classApi
      .getClassOfUser()
      .then(({ data }) => {
        if (data.isSuccess) {
          if (filter?.value === "teaching") {
            setClasses(
              data.data.classes.filter((klass) => klass.user._id === user._id)
            );
          } else if (filter?.value === "enrolled") {
            setClasses(
              data.data.classes.filter((klass) => klass.user._id !== user._id)
            );
          } else setClasses(data.data.classes);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        if (mount) setMount(false);
      });
  };

  return (
    <Fragment>
      <BreadCrumbsPage
        title={t("page.classroom")}
        data={[{ title: t("page.classroom") }]}
      />
      {classes.length === 0 && mount ? (
        <NoClassView setData={setClasses} />
      ) : (
        <Classes
          data={classes}
          setData={setClasses}
          filter={filter}
          setFilter={setFilter}
        />
      )}
    </Fragment>
  );
};

export default ClassPage;
