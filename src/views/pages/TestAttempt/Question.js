import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Input,
  Label,
} from "reactstrap";

const Answer = ({ option, label, id }) => {
  return (
    <div className="form-check mt-50">
      {option}
      <Label style={{ userSelect: "none" }} className="form-check-label" htmlFor={id}>
        {label}
      </Label>
    </div>
  );
};

const Question = ({
  answers,
  position,
  totalQuestion,
  type,
  question,
  setUserChoices,
}) => {
  return (
    <Card>
      <CardHeader
        className="text-primary"
        style={{ fontWeight: 600, fontSize: "1rem" }}
      >
        {`Question ${position} of ${totalQuestion}`}
      </CardHeader>
      <CardBody>
        <CardTitle
          style={{ userSelect: "none" }}
          dangerouslySetInnerHTML={{ __html: question.content }}
        ></CardTitle>
        {answers.map((answer) => (
          <Answer
            key={answer._id}
            id={answer._id}
            option={
              <Input
                id={answer._id}
                name={question._id}
                type={type === "single" ? "radio" : "checkbox"}
                onChange={() => {
                  setUserChoices((prev) =>
                    prev.map((q) => {
                      if (q.questionId === question._id) {
                        let choices = q.choices;
                        if (type === "single") {
                          return {
                            ...q,
                            choices: [answer._id],
                          };
                        } else {
                          if (choices.includes(answer._id)) {
                            choices = choices.filter(
                              (aId) => aId !== answer._id
                            );
                            return {
                              ...q,
                              choices,
                            };
                          } else {
                            return {
                              ...q,
                              choices: [...choices, answer._id],
                            };
                          }
                        }
                      } else return q;
                    })
                  );
                }}
              />
            }
            label={answer.content}
          />
        ))}
      </CardBody>
    </Card>
  );
};

export default Question;
