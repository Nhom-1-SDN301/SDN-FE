// ** React
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Reactstrap
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";

// ** Utils
import { formatSecondToHHMMSS } from "../../../utility/Utils";

// ** Styles
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

// ** Components
import TableHistory from "./TableHistory";

// ** Third libs
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const InfoTest = ({ label, value }) => {
  return (
    <div className="mt-50">
      <span style={{ fontWeight: 600 }}>{label}:</span>
      <span style={{ marginLeft: ".5rem" }}>{value}</span>
    </div>
  );
};

const DetailTest = ({ test, testsHistory }) => {
  // ** Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  //** Handler
  const handleAttemptQuiz = async () => {
    return MySwal.fire({
      title: t("common.startAttempt"),
      text: t("message.startAttempt", {
        value: formatSecondToHHMMSS(test?.time),
      }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.startAttempt"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        navigate(`/test-attempt/${test._id}`);
      }
    });
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>{test?.title}</CardTitle>
        </CardHeader>
        <CardBody>
          <InfoTest
            label={t("common.timeLimits")}
            value={formatSecondToHHMMSS(test?.time)}
          />
          <InfoTest
            label={t("fieldName.description")}
            value={test?.description}
          />
          <InfoTest
            label={t("common.timesLimit")}
            value={test?.limitTimesDoTest}
          />
          <InfoTest
            label={t("common.numberOfQuestion")}
            value={test?.numberOfQuestion}
          />
          <InfoTest label={t("common.creater")} value={test?.user?.fullName} />
          <div
            className="d-flex justify-content-center"
            style={{ marginTop: "1rem" }}
          >
            <Button.Ripple
              color="primary"
              disabled={test?.limitTimesDoTest <= testsHistory?.length}
              onClick={handleAttemptQuiz}
            >
              {t("fieldName.attemptQuiz")}
            </Button.Ripple>
          </div>
        </CardBody>
        <TableHistory testsHistory={testsHistory} />
      </Card>
    </Fragment>
  );
};

export default DetailTest;
