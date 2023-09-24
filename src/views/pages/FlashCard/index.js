// ** React
import { useContext, useState } from "react";
import { Card, Row } from "reactstrap";
import Rating from "react-rating";
import { useParams } from "react-router-dom";

// ** Icons
import { Star } from "react-feather";
import { PiCardsDuotone } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";
import { FaRegNoteSticky } from "react-icons/fa6";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Style
import styles from "./style.module.scss";
import classnames from "classnames";

const FlashCard = () => {
  const { studySetId } = useParams();
  const [isActive, setIsActive] = useState(false);

  // ** Context
  const themeColors = useContext(ThemeColors);

  console.log(studySetId);
  return (
    <Row className={styles.container}>
      <h1 style={{ fontWeight: 700 }}>SE_Ky_1_CSI104</h1>
      <div className="d-flex align-items-center">
        <Star
          size={16}
          fill={themeColors.colors.warning.main}
          stroke={themeColors.colors.warning.main}
        />
        <span
          style={{
            margin: "0 .25rem 0 .5rem",
            fontWeight: 600,
            fontSize: "1rem",
          }}
        >
          4.7
        </span>
        <span>{`(254 reviews)`}</span>
      </div>

      {/* option */}
      <div className="d-flex justify-content-center">
        <div
          className="d-flex mt-2 justify-content-between"
          style={{ maxWidth: 800, width: "100%" }}
        >
          <Card className={styles.card_option} style={{ margin: 0 }}>
            <PiCardsDuotone className={styles.card_option__icon} size={24} />
            <span>FlashCard</span>
          </Card>
          <Card className={styles.card_option} style={{ margin: 0 }}>
            <SiBookstack className={styles.card_option__icon} size={24} />
            <span>Learn</span>
          </Card>
          <Card className={styles.card_option} style={{ margin: 0 }}>
            <FaRegNoteSticky className={styles.card_option__icon} size={24} />
            <span>Test</span>
          </Card>
        </div>
      </div>

      {/* main flash-card */}
      <div
        className={`d-flex justify-content-center mt-1 mb-2 ${styles.card_container}`}
      >
        <Card
          className={classnames(styles.card, {
            [styles.card_active]: isActive,
          })}
          style={{ height: 400, maxWidth: 800, width: "100%", margin: 0 }}
          onClick={() => setIsActive((prev) => !prev)}
        >
          <div className={styles.card_front}>The front</div>
          <div className={styles.card_back}>The back</div>
        </Card>
      </div>
    </Row>
  );
};

export default FlashCard;
