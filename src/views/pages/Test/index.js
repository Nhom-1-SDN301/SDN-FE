// ** Hooks
import { useParams } from "react-router-dom";

// ** Components
import BreadCrumbsPage from "@components/breadcrumbs";
import LoadingTab from "../Classroom/LoadingTab";

// ** I18n
import { useTranslation } from "react-i18next";

// ** React
import { Fragment, useEffect, useState } from "react";

// ** Apis
import { classApi } from "../../../@core/api/quiz";
import DetailTest from "./DetailTest";

const Test = () => {
  // ** Hooks
  const { classId, testId } = useParams();
  const { t } = useTranslation();
  const [klass, setKlass] = useState(null);
  const [test, setTest] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (classId && testId) {
      setLoading(true);
      Promise.all([
        handleFetchClass({ classId }),
        handleFetchTest({ classId, testId }),
      ])
        .then((resps) => {
          if (resps[0].data.isSuccess) {
            setKlass(resps[0].data.data.class);
          }
          if (resps[1].data.isSuccess) {
            setTest(resps[1].data.data.test);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [classId, testId]);

  // ** Handler
  const handleFetchClass = async ({ classId }) => {
    return classApi.getClassById({
      id: classId,
    });
  };

  const handleFetchTest = async ({ classId, testId }) => {
    return classApi.getTest({ classId, testId });
  };

  return (
    <div>
      {loading ? (
        <LoadingTab />
      ) : (
        <Fragment>
          <BreadCrumbsPage
            title={t("page.classroom")}
            data={[
              { title: t("page.classroom"), link: "/classes" },
              { title: klass?.name || "", link: `/classroom/${classId}` },
              { title: test?.title || "" },
            ]}
          />
          <DetailTest test={test} />
        </Fragment>
      )}
    </div>
  );
};

export default Test;
