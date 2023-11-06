// ** Reactstrap
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Table } from "reactstrap";

const TableHistory = ({ testsHistory }) => {
  // ** Hooks
  const { t } = useTranslation();

  const isCorrectQuestion = ({ question }) => {
    let isCorrect = false;

    for (let i = 0; i < question.answers.length; ++i) {
      if (question.answers[i].isCorrect && question.answers[i].isSelected)
        isCorrect = true;
      if (
        question.type === "multiple" &&
        question.answers[i].isCorrect &&
        !question.answers[i].isSelected
      ) {
        isCorrect = false;
        break;
      }
    }
    return isCorrect;
  };

  const calMark = ({ history }) => {
    let totalCorrect = 0;

    for (let i = 0; i < history.questions.length; ++i) {
      if (isCorrectQuestion({ question: history.questions[i] })) {
        totalCorrect++;
      }
    }

    return `${totalCorrect}/${history.questions.length}`;
  };

  return (
    <div style={{ paddingBottom: "1rem" }}>
      <div style={{ padding: "0 21px", marginBottom: "1rem" }}>
        <h4>{t("common.testHistoryTitle")}</h4>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th className="text-center">{t("fieldName.attempt")}</th>
            <th className="text-center">State</th>
            <th className="text-center">Mark</th>
            <th className="text-center">Review</th>
          </tr>
        </thead>
        <tbody>
          {testsHistory.map((history, index) => (
            <tr key={history._id}>
              <td style={{ background: "transparent" }} className="text-center">
                {index + 1}
              </td>
              <td style={{ background: "transparent" }} className="text-center">
                {"Submited"}
              </td>
              <td style={{ background: "transparent" }} className="text-center">
                {calMark({ history })}
              </td>
              <td style={{ background: "transparent" }} className="text-center">
                <Link to={"#"}>Review</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableHistory;
