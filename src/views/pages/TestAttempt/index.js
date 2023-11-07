// ** React
import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ** Reactstrap
import { Button, Card, CardBody, Col, Container, Row } from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Redux
import { useSelector } from "react-redux";

// ** Apis
import { testApi } from "../../../@core/api/quiz";

// ** Components
import SpinnerComponent from "@components/spinner/Loading-spinner";
import UILoader from "@components/ui-loader";
import Question from "./Question";

// ** Third libs
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";
import ProgressTime from "./ProgressTime";

const MySwal = withReactContent(Swal);

/**
 *
 * [{questionId: id, choices: [answerId]}]
 */
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const TestAttempt = () => {
  // ** Hooks
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const { testId } = useParams();
  const [test, setTest] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [userChoices, setUserChoices] = useState([]);
  const [initTime, setInitTime] = useState(new Date().valueOf());

  const [loading, setLoading] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  useEffect(() => {
    if (testId && user?._id) {
      fetchTest({ testId });
    }
  }, [testId, user?._id]);

  useEffect(() => {
    const handleBlur = () => {
      if (test?._id)
        submitTest({
          doTime: (new Date().valueOf() - initTime) / 1000,
          testId: test._id,
        });
    };

    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("blur", handleBlur);
    };
  }, [test?._id]);

  // ** Handler
  const fetchTest = ({ testId }) => {
    testApi
      .getTestToDoById({ testId })
      .then(({ data }) => {
        if (data.isSuccess) {
          const { questions, ...test } = data.data.test;

          setTest(test);
          setQuestions(shuffleArray(questions));
          setUserChoices(
            questions.map((question) => ({
              questionId: question._id,
              choices: [],
            }))
          );
        } else {
          toast.error(data.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.error(err.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleSubmitTest = async () => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.submit"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        submitTest({
          doTime: (new Date().valueOf() - initTime) / 1000,
          testId: test._id,
        });
      }
    });
  };

  const submitTest = ({ doTime, testId }) => {
    setLoadingSubmit(true);
    testApi
      .submitTest({
        testId,
        data: {
          userChoices,
          doTime: Number.parseInt(doTime),
        },
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          history.back();
        } else {
          toast.error(data.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.error(err.message || t("error.unknow"));
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  };

  return (
    <Fragment>
      <UILoader blocking={loadingSubmit}>
        <div
          className="mx-md-3 my-md-2 mx-sm-2 my-sm-1 mx-1 my-1"
          style={{ position: "relative" }}
        >
          {loading ? (
            <div style={{ marginTop: "50vh" }}>
              <SpinnerComponent />
            </div>
          ) : (
            <Row className="justify-content-center">
              <Col md={6}>
                <h1>{test?.title}</h1>
                <Card style={{ marginTop: "1rem" }}>
                  <CardBody>
                    <ProgressTime
                      initTime={test?.time}
                      submitTest={submitTest}
                      testId={test._id}
                    />
                  </CardBody>
                </Card>
                {questions?.map((question, index) => (
                  <Question
                    key={question._id}
                    question={question}
                    answers={question.answers}
                    position={index + 1}
                    totalQuestion={questions.length}
                    type={question.type}
                    setUserChoices={setUserChoices}
                  />
                ))}
              </Col>
            </Row>
          )}
          <div style={{ position: "fixed", bottom: 0, left: 0, right: 0 }}>
            <Card
              style={{
                margin: 0,
                borderRadius: 0,
                padding: ".5rem",
                flexDirection: "row-reverse",
              }}
            >
              <Button.Ripple
                onClick={handleSubmitTest}
                color="primary"
                style={{ width: "fit-content", marginRight: "5rem" }}
              >
                {t("fieldName.submit")}
              </Button.Ripple>
            </Card>
          </div>
        </div>
      </UILoader>
    </Fragment>
  );
};

export default TestAttempt;
