// ** Reactstrap
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";
import { Check, X } from "react-feather";

const CardQuestion = ({ question, position, isCorrectQuestion }) => {
  return (
    <Card>
      <CardTitle className="d-flex justify-content-between" style={{ margin: 0 }}>
        <span className="text-primary">{`Question ${position}:`}</span>
        <span style={{ marginLeft: "1rem"}}>
          {isCorrectQuestion({ question }) ? (
            <span className="text-primary">1/1</span>
          ) : (
            <span className="text-primary">0/1</span>
          )}
        </span>
      </CardTitle>
      <CardTitle
        style={{ marginBottom: "1rem" }}
        dangerouslySetInnerHTML={{ __html: question.content }}
      ></CardTitle>
      <div>
        {question.answers.map((answer) => (
          <div className="form-check mt-50" key={answer._id}>
            <Input
              checked={answer.isSelected}
              type={question?.type === "single" ? "radio" : "checkbox"}
            />
            <Label>
              {answer.content}{" "}
              {answer.isSelected && answer.isCorrect && (
                <Check className="text-success" size={18} />
              )}
              {((answer.isSelected && !answer.isCorrect) ||
                (!answer.isSelected && answer.isCorrect)) && (
                <X className="text-danger" size={18} />
              )}
            </Label>
          </div>
        ))}
      </div>
    </Card>
  );
};

const ModalDetailHistory = ({
  selectedTestHistory,
  setSelectedTestHistory,
  isCorrectQuestion,
}) => {
  // ** Hooks
  const { t } = useTranslation();

  console.log(selectedTestHistory);

  // ** Handler
  const handleClose = () => {
    setSelectedTestHistory(null);
  };

  return (
    <Modal
      className="modal-fullscreen"
      isOpen={Boolean(selectedTestHistory?._id)}
    >
      <ModalHeader toggle={handleClose}>
        {selectedTestHistory?.title}
      </ModalHeader>
      <ModalBody>
        {selectedTestHistory?.questions.map((question, index) => (
          <CardQuestion
            key={question._id}
            question={question}
            position={index + 1}
            isCorrectQuestion={isCorrectQuestion}
          />
        ))}
      </ModalBody>
      <ModalFooter>
        <Button.Ripple color="primary" onClick={handleClose}>
          {t("common.done")}
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalDetailHistory;
