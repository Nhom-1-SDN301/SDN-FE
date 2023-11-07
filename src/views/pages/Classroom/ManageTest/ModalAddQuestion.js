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
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select from "react-select";
import { v4 as uuidv4 } from "uuid";
import { Image } from "antd";

// ** Icons
import { Upload } from "react-feather";

// ** Constants
import {
  LIMIT_ANSWER_OPTIONS,
  QUESTION_TYPES_OPTIONS,
} from "../../../../@core/constants";
import toast from "react-hot-toast";
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
        if (ans.id === id) {
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
                if (ans.id === id) {
                  return { ...ans, isCorrect: !isCorrect };
                }

                console.log(typeInput === "radio");
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

const ModalAddQuestion = ({ open, setOpen, testId, setQuestions }) => {
  // ** Hooks
  const { t } = useTranslation();

  // ** Default value
  const defaultQuestion = {
    content: EditorState.createEmpty(),
    type: QUESTION_TYPES_OPTIONS(t)[0],
    numberOfAnswers: LIMIT_ANSWER_OPTIONS(t)[2],
    picture: null,
  };

  const defaultAnswers = {
    content: "",
    picture: null,
    isCorrect: false,
  };

  // ** State
  const [loading, setLoading] = useState(false);
  const [question, setQuestion] = useState(defaultQuestion);
  const [picture, setPicture] = useState(null);
  const [answers, setAnswers] = useState(
    Array.from(
      { length: defaultQuestion.numberOfAnswers.value },
      (_, index) => ({
        ...defaultAnswers,
        isCorrect: index === 0 ? true : false,
        content: `Answer ${index + 1}`,
        id: uuidv4(),
      })
    )
  );

  // ** Handler
  const closeModal = () => {
    setOpen(false);
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

  const handleAddQuestion = () => {
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
    if (question.content.getCurrentContent().getPlainText().trim())
      formData.append("content", content);
    if (picture) formData.append("picture", picture);
    formData.append("type", question.type.value);
    formData.append(
      "answers",
      JSON.stringify(
        answers.map((ans) => {
          const { id, ...data } = ans;

          return data;
        })
      )
    );

    setLoading(true);
    testApi
      .addQuestion({
        testId,
        data: formData,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setQuestions(data.data.question.questions);
          setQuestion(defaultQuestion);
          setAnswers(
            Array.from(
              { length: defaultQuestion.numberOfAnswers.value },
              (_, index) => ({
                ...defaultAnswers,
                isCorrect: index === 0 ? true : false,
                content: `Answer ${index + 1}`,
                id: uuidv4(),
              })
            )
          );
          setPicture(null);
          setOpen(false);
          toast.success(
            t("message.createSuccess", { value: t("fieldName.question") })
          );
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal className="modal-lg" centered isOpen={open}>
      <ModalHeader toggle={closeModal}>{t("title.addQuestion")}</ModalHeader>
      <ModalBody style={{ maxHeight: "77vh", overflow: "auto" }}>
        <div>
          <Label>{t("common.content")}</Label>
          <Editor
            toolbarClassName="rounded-0"
            wrapperClassName="toolbar-top"
            editorClassName="rounded-0 border-1"
            // editorStyle={{
            //   borderBottom: "1px solid #ea5455",
            //   borderLeft: "1px solid #ea5455",
            //   borderRight: "1px solid #ea5455",
            // }}
            // toolbarStyle={{
            //   borderTop: "1px solid #ea5455",
            //   borderLeft: "1px solid #ea5455",
            //   borderRight: "1px solid #ea5455",
            // }}
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
              value={question.type}
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
              value={question.numberOfAnswers}
              onChange={(data) => {
                setQuestion((prev) => ({ ...prev, numberOfAnswers: data }));
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
                  }}
                />
              </Button>
            </div>
            {picture && (
              <div>
                <img
                  style={{ width: 80, height: 80, objectFit: "cover" }}
                  src={URL.createObjectURL(picture)}
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
              key={answer.id}
              id={answer.id}
              isCorrect={answer.isCorrect}
              label={answer.content}
              typeInput={
                question.type.value === "single" ? "radio" : "checkbox"
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
          onClick={handleAddQuestion}
        >
          {loading && (
            <Spinner
              style={{ width: 14, height: 14, marginRight: ".5rem" }}
              type="grow"
              color="dark"
            />
          )}
          <span>{t("fieldName.add")}</span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalAddQuestion;
