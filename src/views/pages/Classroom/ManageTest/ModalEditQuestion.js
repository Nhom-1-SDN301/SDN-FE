// ** Reactstrap
import {
  Button,
  CardText,
  CardTitle,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
} from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";

// ** React
import { useEffect, useState } from "react";

// ** Icons
import { ArrowDown, Download, Edit, Plus } from "react-feather";

// ** Components
import ModalEditInfo from "./ModalEditInfo";
import ModalAddQuestion from "./ModalAddQuestion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Apis
import { testApi } from "../../../../@core/api/quiz/testApi";

// ** Components
import SpinnerComponent from "@components/spinner/Loading-spinner";

// ** Styles
import styles from "../style.module.scss";
import toast from "react-hot-toast";

const MySwal = withReactContent(Swal);

const ModalEditQuestion = ({ selectedTest, setSelectedTest, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);

  const [openModalEditInfo, setOpenModalEditInfo] = useState(false);
  const [openModalAddQuestion, setOpenModalAddQuestion] = useState(false);

  useEffect(() => {
    if (selectedTest?._id) {
      setLoading(true);
      testApi
        .getQuestionsInTest({ testId: selectedTest?._id })
        .then(({ data }) => {
          if (data.isSuccess) {
            setQuestions(data.data.questions);
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedTest?._id]);

  // ** Handler
  const handleCloseModal = () => {
    setSelectedTest(null);
  };

  const handleDelteQuestion = async (id) => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.confirm"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    }).then(({ isConfirmed }) => {
      if (isConfirmed) {
        testApi
          .removeQuestion({
            testId: selectedTest?._id,
            questionId: id,
          })
          .then(({ data }) => {
            if (data.isSuccess) {
              setQuestions((prev) => prev.filter((q) => q._id !== id));
              toast.success(
                t("message.deleteSuccess", { value: t("fieldName.question") })
              );
            }
          });
      }
    });
  };

  return (
    <Modal className="modal-fullscreen" isOpen={Boolean(selectedTest)}>
      <ModalHeader toggle={handleCloseModal}>
        {t("common.editValue", { value: selectedTest?.title })}
      </ModalHeader>
      <ModalBody style={{ overflow: "hidden" }}>
        <Row className="justify-content-between mb-1 border-bottom pb-1">
          <Col md={6}>
            <Button color="primary" outline>
              <ArrowDown width={16} height={16} />
              <span style={{ marginLeft: ".5rem" }}>
                {t("fieldName.import")}
              </span>
            </Button>
            <Button color="primary" style={{ marginLeft: ".5rem" }} outline>
              <Download width={16} height={16} />
              <span style={{ marginLeft: ".5rem" }}>
                {t("fieldName.downloadSample")}
              </span>
            </Button>
          </Col>
          <Col md={6}>
            <Button
              className="d-flex align-items-center"
              color="primary"
              onClick={() => setOpenModalEditInfo(true)}
              style={{ float: "right" }}
            >
              <Edit width={16} height={16} />
              <span style={{ marginLeft: ".5rem" }}>{t("fieldName.edit")}</span>
            </Button>
          </Col>
        </Row>
        <Row style={{ minHeight: "90%", maxHeight: "90%" }}>
          <Col md={4} className="border-end" style={{ minHeight: "100%" }}>
            <p className="fw-bolder">{t("common.questionRequirments")}:</p>
            <ul className="ps-1 ms-25">
              <li className="mb-50">{t("common.questionRequirment1")}</li>
              <li className="mb-50">{t("common.questionRequirment2")}</li>
            </ul>
            <p className="fw-bolder">
              {t("common.totalQuestions")}: <span>{questions.length}</span>
            </p>
          </Col>
          <Col md={8} style={{ height: "78vh", overflow: "auto" }}>
            <div>
              {loading ? (
                <SpinnerComponent />
              ) : (
                questions.map((question, index) => {
                  return (
                    <div
                      key={question._id}
                      className={styles.question}
                      style={{ marginBottom: "1rem", position: "relative" }}
                    >
                      <div style={{ fontWeight: 600, display: "flex" }}>
                        <span style={{ marginRight: ".5rem" }}>
                          {index + 1}.
                        </span>
                        <span
                          dangerouslySetInnerHTML={{ __html: question.content }}
                        ></span>
                      </div>
                      <div>
                        {question.answers.map((answer) => {
                          return (
                            <Col key={answer._id} xs={12} className="mt-50">
                              <div className="form-check form-check-inline">
                                <Input
                                  type={
                                    question.type === "single"
                                      ? "radio"
                                      : "checkbox"
                                  }
                                  checked={answer.isCorrect}
                                />
                                <div className="form-check-label">
                                  {answer.content}
                                </div>
                              </div>
                            </Col>
                          );
                        })}
                      </div>
                      <div
                        className={styles.question_actions}
                        style={{
                          position: "absolute",
                          top: 0,
                          right: 0,
                        }}
                      >
                        <Button
                          size="sm"
                          color="primary"
                          style={{ marginRight: ".5rem" }}
                        >
                          {t("fieldName.edit")}
                        </Button>
                        <Button
                          size="sm"
                          color="danger"
                          onClick={() => handleDelteQuestion(question._id)}
                        >
                          {t("fieldName.delete")}
                        </Button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter style={{ justifyContent: "space-between" }}>
        <Button
          className="d-flex align-items-center"
          color="primary"
          onClick={() => setOpenModalAddQuestion(true)}
        >
          <Plus width={16} height={16} />
          <span style={{ marginLeft: ".5rem" }}>{t("fieldName.add")}</span>
        </Button>
        <Button color="primary" onClick={handleCloseModal}>
          {t("fieldName.done")}
        </Button>
      </ModalFooter>

      {/* SubModal */}
      <ModalEditInfo
        open={openModalEditInfo}
        setOpen={setOpenModalEditInfo}
        selectedTest={selectedTest}
        setData={setData}
      />
      <ModalAddQuestion
        open={openModalAddQuestion}
        setOpen={setOpenModalAddQuestion}
        testId={selectedTest?._id}
        setQuestions={setQuestions}
      />
    </Modal>
  );
};

export default ModalEditQuestion;
