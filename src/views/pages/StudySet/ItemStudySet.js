// ** Reactstrap
import { Button, Card, CardBody, Col, Row } from "reactstrap";

// ** Components
import Avatar from "@components/avatar";

// ** Styles
import styles from "./style.module.scss";

// ** Hooks
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const ItemStudySet = ({ id, numberOfTerms, author, title }) => {
  // ** Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();

  // ** Handler
  const handleRidirecToProfileOwner = (e) => {
    e.stopPropagation();
    console.log(`navigate to profile user id: ${author.id}`);
  };

  const handleRidirecToSStudySet = () => {
    navigate(`/flash-card/${id}`);
  };

  return (
    <Card
      className={`${styles.card_study_set}`}
      onClick={handleRidirecToSStudySet}
    >
      <CardBody>
        <div className="d-flex">
          <div
            className="d-flex align-items-center"
            color="primary"
            style={{ paddingRight: "1rem", borderRight: "2px solid #b8b4b4" }}
          >
            <h6 className="m-0" style={{ fontSize: ".9rem" }}>
              {`${numberOfTerms || 0} ${t("fieldName.terms")}`}
            </h6>
          </div>
          <div
            className={`${styles.author} d-flex align-items-center cursor-pointer`}
            style={{ marginLeft: "1rem" }}
            onClick={handleRidirecToProfileOwner}
          >
            <Avatar
              size="sm"
              img={
                author?.avatar ||
                "/src/assets/images/portrait/small/avatar-s-11.jpg"
              }
            />
            <h6 style={{ margin: "0 0 0 .5rem", fontSize: ".9rem" }}>
              {author?.fullName}
            </h6>
          </div>
        </div>
        <Row className="mt-2">
          <h3 style={{ margin: 0 }}>{title}</h3>
        </Row>
      </CardBody>
    </Card>
  );
};

export default ItemStudySet;
