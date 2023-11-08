import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  CardBody,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Table,
} from "reactstrap";

// ** APis
import { testApi } from "../../../../@core/api/quiz";

// ** Components
import Avatar from "@components/avatar";
import { Link } from "react-router-dom";
import Select from "react-select";

// ** Utils
import { selectThemeColors } from "@utils";
import { formatDateISOToDDMMYYY_HHMM } from "../../../../utility/Utils";

const filter_options = [
  {
    value: 1,
    label: "Group highest mark",
  },
];

const ModalTestReport = ({ selectedTest, setSelectedTest }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [testsHistory, setTestsHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState(null);

  useEffect(() => {
    if (selectedTest?._id) {
      setLoading(true);
      testApi
        .getTestsHistoryTeacher({
          testId: selectedTest?._id,
        })
        .then(({ data }) => {
          if (data.isSuccess) {
            if (filter) {
                setTestsHistory(data.data.testsHistory);
            } else {
                setTestsHistory(
                    data.data.testsHistory
                )
            }
          }
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [selectedTest?._id, filter]);

  // ** Handler
  const handleClose = () => {
    setSelectedTest(null);
  };

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

    return totalCorrect;
  };

  console.log(testsHistory);

  return (
    <Modal className="modal-fullscreen" isOpen={Boolean(selectedTest)}>
      <ModalHeader toggle={handleClose}>{selectedTest?.title}</ModalHeader>
      <ModalBody>
        <CardBody>
          <div style={{ width: 240, marginBottom: "1rem" }}>
            <Select
              theme={selectThemeColors}
              className="react-select"
              classNamePrefix="select"
              value={filter}
              options={filter_options}
              onChange={e => setFilter(e)}
              isClearable
            />
          </div>
          <Table responsive>
            <thead>
              <tr>
                <th className="text-center">No</th>
                <th className="text-center">User</th>
                <th className="text-center">Question</th>
                <th className="text-center">Mark</th>
                <th className="text-center">Date</th>
              </tr>
            </thead>
            <tbody>
              {testsHistory.map((history, index) => (
                <tr key={history._id}>
                  <td
                    className="text-center"
                    style={{ background: "transparent" }}
                  >
                    {index + 1}
                  </td>
                  <td style={{ background: "transparent" }}>
                    <div className="d-flex justify-content-left align-items-center">
                      <Avatar
                        className="me-1"
                        img={
                          history.user.picture ||
                          "/src/assets/images/portrait/small/avatar-s-11.jpg"
                        }
                        width="32"
                        height="32"
                      />
                      <div className="d-flex flex-column">
                        <Link className="user_name text-truncate text-body">
                          <span className="fw-bolder">
                            {history.user.fullName}
                          </span>
                        </Link>
                        <small className="text-truncate text-muted mb-0">
                          {history.user.email}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td
                    className="text-center"
                    style={{ background: "transparent" }}
                  >
                    {`${calMark({ history })}/${history.questions.length}`}
                  </td>
                  <td
                    className="text-center"
                    style={{ background: "transparent" }}
                  >
                    {(
                      (calMark({ history }) / history.questions.length) *
                      10
                    ).toFixed(2)}
                  </td>
                  <td
                    className="text-center"
                    style={{ background: "transparent" }}
                  >
                    {formatDateISOToDDMMYYY_HHMM(history.createdAt)}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </CardBody>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple color="primary" onClick={handleClose}>
          {t("fieldName.done")}
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalTestReport;
