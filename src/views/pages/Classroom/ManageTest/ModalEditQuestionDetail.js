// ** Reactstrap
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

// ** React
import { useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Third Party Components
import { Editor } from "react-draft-wysiwyg";
import {
  convertToRaw,
  EditorState,
  ContentState,
  convertFromHTML,
} from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { Image } from "antd";
import toast from "react-hot-toast";
import { containsHTML } from "../../../../utility/Utils";

// ** Icons
import { Upload } from "react-feather";

// ** Constants
import {
  LIMIT_ANSWER_OPTIONS,
  QUESTION_TYPES_OPTIONS,
} from "../../../../@core/constants";

// ** Apis
import { testApi } from "../../../../@core/api/quiz/testApi";

const Answer = ({ typeInput, label, isCorrect, id, setAnswers }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [isEdit, setIsEdit] = useState(false);
  const [value, setValue] = useState(label);

  const handleSave = () => {
    if (value.trim() === "") return;

    setAnswers((prev) =>
      prev.map((ans) => {
        if (ans._id === id) {
          return { ...ans, content: value.trim() };
        }
        return ans;
      })
    );

    setIsEdit(false);
  };

  return (
    <Col xs={12} className="mt-50 d-flex justify-content-between">
      <div
        className="form-check form-check-inline"
        style={isEdit ? { width: "100%", margin: 0 } : {}}
      >
        <Input
          type={typeInput}
          checked={isCorrect}
          name="answer"
          id={`basic-cb-checked-${id}`}
          onClick={(e) => {
            setAnswers((prev) =>
              prev.map((ans) => {
                if (ans._id === id) {
                  return { ...ans, isCorrect: !isCorrect };
                }

                return typeInput === "radio"
                  ? { ...ans, isCorrect: false }
                  : ans;
              })
            );
          }}
        />
        {isEdit ? (
          <>
            <Input
              type="textarea"
              rows="3"
              style={{ width: "100%" }}
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />
            <div className="mt-50">
              <Button
                style={{ float: "right" }}
                color="primary"
                size="sm"
                onClick={handleSave}
              >
                {t("fieldName.save")}
              </Button>
              <Button
                style={{ float: "right", marginRight: ".5rem" }}
                size="sm"
                onClick={() => {
                  setIsEdit(false);
                  setValue(label);
                }}
              >
                {t("fieldName.cancel")}
              </Button>
            </div>
          </>
        ) : (
          <Label
            htmlFor={`basic-cb-checked-${id}`}
            className="form-check-label"
          >
            {label}
          </Label>
        )}
      </div>
      {!isEdit && (
        <Button.Ripple
          style={{ height: "fit-content" }}
          size="sm"
          color="primary"
          onClick={() => setIsEdit(true)}
        >
          {t("fieldName.edit")}
        </Button.Ripple>
      )}
    </Col>
  );
};

const ModalEditQuestionDetail = ({
  selectedQuestion,
  setSelectedQuestion,
  testId,
  setQuestions,
}) => {
  // ** Hooks
  const { t } = useTranslation();

  // ** State
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);
  const [question, setQuestion] = useState({
    _id: selectedQuestion?._id,
    picture: selectedQuestion?.picture,
    content: containsHTML(selectedQuestion?.content)
      ? EditorState.createWithContent(
          ContentState.createFromBlockArray(
            convertFromHTML(selectedQuestion?.content)
          )
        )
      : EditorState.createWithText(selectedQuestion?.content),
    type: QUESTION_TYPES_OPTIONS(t).find(
      (type) => type.value === selectedQuestion?.type
    ),
  });
  const [answers, setAnswers] = useState(selectedQuestion?.answers);
  const [numberOfAnswers, setNumberOfAnswers] = useState(
    LIMIT_ANSWER_OPTIONS(t).find((type) => type.value === answers.length)
  );

  // ** Default value
  const defaultAnswers = {
    content: "",
    picture: null,
    isCorrect: false,
  };

  // ** Handler
  const closeModal = () => {
    setSelectedQuestion(null);
  };

  const handleChangeNumberQuestion = (option) => {
    const value = option.value;

    if (answers.length > value) {
      setAnswers((prev) => [...prev.slice(0, value)]);
    } else {
      const numberToPush = value - answers.length;

      setAnswers((prev) => [
        ...prev,
        ...Array.from({ length: numberToPush }, () => ({
          ...defaultAnswers,
          content: `Answer`,
          id: uuidv4(),
        })),
      ]);
    }
  };

  const handleUpdateQuestion = () => {
    if (
      !question.content.getCurrentContent().getPlainText().trim() &&
      picture === null
    ) {
      return toast.error(t("message.questionRequired"));
    }

    const isHasAtLeast1CorrectAns = answers.some((q) => q.isCorrect);

    if (!isHasAtLeast1CorrectAns)
      return toast.error(t("message.answerRequired1Correct"));

    const content = draftToHtml(
      convertToRaw(question.content.getCurrentContent())
    ).trim();

    const formData = new FormData();
    if (picture) formData.append("picture", picture);
    formData.append("content", content);
    formData.append("type", question.type.value);
    formData.append(
      "answers",
      JSON.stringify(
        answers.map((ans) => {
          const newAns = { ...ans };
          delete newAns._id;
          delete newAns.id;

          return newAns;
        })
      )
    );

    setLoading(true);
    testApi
      .updateQuestion({
        testId,
        questionId: question._id,
        data: formData,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          console.log(data.data.question);
          setQuestions((prev) =>
            prev.map((question) => {
              if (question._id === data.data.question._id)
                return data.data.question;
              else return question;
            })
          );
          setSelectedQuestion(null);
          toast.success(t("message.updateSuccess", { value: t("common.question")}));
        } else toast.error(data?.message || t("error.unknow"));
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal className="modal-lg" centered isOpen={Boolean(selectedQuestion)}>
      <ModalHeader toggle={closeModal}>{t("title.addQuestion")}</ModalHeader>
      <ModalBody style={{ maxHeight: "77vh", overflow: "auto" }}>
        <div>
          <Label>{t("common.content")}</Label>
          <Editor
            toolbarClassName="rounded-0"
            wrapperClassName="toolbar-top"
            editorClassName="rounded-0 border-1"
            toolbar={{
              options: ["inline", "textAlign", "list", "history"],
              inline: {
                inDropdown: false,
                options: ["bold", "italic", "underline", "strikethrough"],
              },
              list: {
                inDropdown: false,
                options: ["unordered", "ordered", "indent", "outdent"],
              },
              history: {
                inDropdown: false,
                options: ["undo", "redo"],
              },
            }}
            editorState={question.content}
            onEditorStateChange={(data) =>
              setQuestion((prev) => ({ ...prev, content: data }))
            }
          />
        </div>
        <Row className="mt-50">
          <Col md={6}>
            <Label>{t("common.questionType")}</Label>
            <Select
              id="action-select"
              className="react-select role-select"
              classNamePrefix="select"
              options={QUESTION_TYPES_OPTIONS(t)}
              value={question?.type}
              onChange={(data) => {
                setQuestion((prev) => ({ ...prev, type: data }));
                setAnswers((prev) =>
                  prev.map((ans, index) =>
                    index === 0
                      ? { ...ans, isCorrect: true }
                      : { ...ans, isCorrect: false }
                  )
                );
              }}
            />
          </Col>
          <Col md={6}>
            <Label>{t("fieldName.numberOfAnswers")}</Label>
            <Select
              id="action-select"
              className="react-select role-select"
              classNamePrefix="select"
              options={LIMIT_ANSWER_OPTIONS(t)}
              value={numberOfAnswers}
              onChange={(data) => {
                setNumberOfAnswers(data);
                handleChangeNumberQuestion(data);
              }}
            />
          </Col>
        </Row>
        <Row className="mt-1">
          <Col>
            <div>
              <Button
                tag={Label}
                className="w-100 d-flex align-items-center justify-content-center"
                color="primary"
              >
                <Upload width={16} height={16} />
                <span style={{ marginLeft: ".5rem" }}>
                  {t("fieldName.uploadImage")}
                </span>
                <Input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];

                    if (file.size > 2000000)
                      return toast.error(
                        t("message.imageLessThanOrEqual", { value: 2 })
                      );

                    setPicture(file);
                    e.target.files = null;
                  }}
                />
              </Button>
            </div>
            {(question.picture || picture) && (
              <div>
                <img
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                  src={question.picture || URL.createObjectURL(picture)}
                />
                <Button.Ripple
                  style={{ marginLeft: "1rem" }}
                  color="primary"
                  onClick={() => setPicture(null)}
                  size="sm"
                >
                  {t("fieldName.remove")}
                </Button.Ripple>
              </div>
            )}
          </Col>
        </Row>
        <Row className="mt-1">
          {answers.map((answer) => (
            <Answer
              key={answer._id}
              id={answer._id}
              isCorrect={answer.isCorrect}
              label={answer.content}
              typeInput={
                question?.type?.value === "single" ? "radio" : "checkbox"
              }
              setAnswers={setAnswers}
            />
          ))}
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple color="secondary" onClick={closeModal}>
          {t("fieldName.cancel")}
        </Button.Ripple>
        <Button.Ripple
          className="d-flex align-items-center"
          color="primary"
          disabled={loading}
          type="submit"
          onClick={handleUpdateQuestion}
        >
          {loading && (
            <Spinner
              style={{ width: 14, height: 14, marginRight: ".5rem" }}
              type="grow"
              color="dark"
            />
          )}
          <span>{t("fieldName.save")}</span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalEditQuestionDetail;
