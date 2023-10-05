// ** Reactstrap
import { Button, Card, CardBody, Col, Row } from "reactstrap";

// ** Components
import Avatar from "@components/avatar";

// ** Styles
import styles from "./style.module.scss";

// ** Hooks
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { Delete, Edit } from "react-feather";

const ItemStudySet = ({ id, numberOfTerms, author, title, onEdit }) => {
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
      <CardBody className={`${styles.card_study_set__body}`}>
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
                author?.picture ||
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
        <div className={styles.options}>
          <Button.Ripple
            className={styles.options_edit}
            style={{ padding: ".5rem 1rem" }}
            outline
            color="primary"
            onClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
          >
            <Edit size={16} />
          </Button.Ripple>
        </div>
      </CardBody>
    </Card>
  );
};

export default ItemStudySet;
