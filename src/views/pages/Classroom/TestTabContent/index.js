// ** React
import { Fragment, useEffect, useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";

// ** Third libs
import toast from "react-hot-toast";
import { formatDistanceToNow } from "date-fns";
import { vi, enUS } from "date-fns/locale";

// ** Reactstrap
import {
  Badge,
  Card,
  CardBody,
  CardLink,
  CardSubtitle,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

// ** Utils
import { formatSecondToHHMMSS } from "../../../../utility/Utils";

// ** Icons
import { ArrowRight, Clock } from "react-feather";

const TestTabContent = ({ klass }) => {
  // ** Hooks
  const { t, i18n } = useTranslation();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (klass) fetchActiveTests({ classId: klass?._id });
  }, [klass]);

  // ** Handler
  const fetchActiveTests = ({ classId }) => {
    classApi
      .getTestsInClass({ classId })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData(data.data.tests);
        } else toast.error(data.message || t("error.unknow"));
      })
      .catch((err) => {
        toast.error(err.message || t("error.unknow"));
      });
  };

  return (
    <Fragment>
      <div style={{ marginTop: "1rem" }}>
        {data.map((test) => (
          <Col md="6" key={test._id}>
            <Card className="mb-4">
              <CardBody>
                <CardTitle
                  tag="h4"
                  style={{
                    width: "100%",
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  {`${test.title} (${test.subject})`}
                </CardTitle>
                <CardSubtitle className="text-muted mb-1">
                  {formatSecondToHHMMSS(test.time)}
                </CardSubtitle>
                <CardText
                  style={{
                    width: "100%",
                    height: 60,
                    textOverflow: "ellipsis",
                    overflow: "hidden",
                  }}
                >
                  {test.description.length > 180
                    ? `${test.description.slice(0, 180)}...`
                    : test.description}
                </CardText>
                <div className="d-flex justify-content-between">
                  <Badge color="primary">
                    <Clock size={12} className="align-middle me-25" />
                    <span className="align-middle">{`${formatDistanceToNow(
                      new Date(test.endAt),
                      {
                        locale: i18n.language === "en" ? enUS : vi,
                      }
                    )}`}</span>
                  </Badge>
                  <CardLink href={`/classroom/${klass._id}/test/${test._id}`}>
                    <span
                      className="text-primary"
                      style={{ marginRight: ".5rem" }}
                    >
                      {t("common.doTest")}
                    </span>
                    <ArrowRight style={{ width: 16, height: 16 }} />
                  </CardLink>
                </div>
              </CardBody>
            </Card>
          </Col>
        ))}
      </div>
    </Fragment>
  );
};

export default TestTabContent;
