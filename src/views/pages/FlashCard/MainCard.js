// ** React
import { useState } from "react";
import { Button, Card, Progress } from "reactstrap";
import { ArrowLeft, ArrowRight, Edit2, Volume2 } from "react-feather";

// ** MUI
import { Skeleton } from "@mui/material";

// ** Third party
import classNames from "classnames";

// Styles
import styles from "./style.module.scss";

// ** Hooks
import { useSkin } from "../../../utility/hooks/useSkin";

const MainCard = ({ data, isAuthor }) => {
  // ** Hooks
  const { skin } = useSkin();
  const [isActive, setIsActive] = useState(false);
  const [position, setPosition] = useState(0);
  const [animateLeft, setAnimateLeft] = useState(false);
  const [animateRight, setAnimateRight] = useState(false);

  // ** Handler
  const handleEdit = (e) => {
    e.stopPropagation();
  };

  const handleSpech = (e) => {
    e.stopPropagation();
  };

  return (
    <div>
      <div
        className={`d-flex flex-column align-items-center mt-1 mb-2 ${styles.card_container}`}
      >
        {data ? (
          <Card
            className={classNames(
              styles.card,
              {
                [styles.card_active]: isActive,
              },
              { [styles.card_animate__left]: animateLeft },
              { [styles.card_animate__right]: animateRight }
            )}
            style={{ height: 400, maxWidth: 800, width: "100%", margin: 0 }}
            onClick={() => setIsActive((prev) => !prev)}
          >
            <div className={styles.card_front}>
              <div className={styles.card_front__option}>
                <div></div>
                <div className="d-flex">
                  {isAuthor && (
                    <div className={styles.item} onClick={handleEdit}>
                      <Edit2 className={styles.item_icon} size={14} />
                    </div>
                  )}
                  <div className={styles.item} onClick={handleSpech}>
                    <Volume2 className={styles.item_icon} size={14} />
                  </div>
                </div>
              </div>
              <div className={styles.card_front__value}>
                {data[position]?.name}
              </div>
            </div>
            <div className={styles.card_back}>
              <div className={styles.card_back__option}>
                <div></div>
                <div className="d-flex">
                  {isAuthor && (
                    <div className={styles.item} onClick={handleEdit}>
                      <Edit2 className={styles.item_icon} size={14} />
                    </div>
                  )}
                  <div className={styles.item} onClick={handleSpech}>
                    <Volume2 className={styles.item_icon} size={14} />
                  </div>
                </div>
              </div>
              <div className={styles.card_back__value}>
                {data[position]?.definition}
              </div>
            </div>
          </Card>
        ) : (
          <Skeleton
            className={styles.card_skeleton}
            variant="rounded"
            animation="wave"
            height={400}
            width={800}
            style={{
              background: skin === "dark" ? "#2f3852" : "#ccc",
              maxWidth: "800px",
              width: "100%",
            }}
          />
        )}
        <div className="mt-2 d-flex align-items-center">
          <Button.Ripple
            style={{ padding: ".5rem 1rem" }}
            color="primary"
            disabled={position === 0}
            onClick={() => {
              setPosition((prev) => prev - 1);
              setAnimateLeft(true);
              setTimeout(() => {
                setAnimateLeft(false);
              }, 150);
            }}
          >
            <ArrowLeft size={20} />
          </Button.Ripple>
          <section className="mx-1" style={{ userSelect: "none" }}>
            <span>{data?.length > 0 ? position + 1 : 0}</span>
            <span style={{ margin: "0 .5rem" }}>/</span>
            <span>{data?.length || 0}</span>
          </section>
          <Button.Ripple
            style={{ padding: ".5rem 1rem" }}
            color="primary"
            disabled={!(data?.length > 0) || position === data?.length - 1}
            onClick={() => {
              setPosition((prev) => prev + 1);
              setAnimateRight(true);
              setTimeout(() => {
                setAnimateRight(false);
              }, 150);
            }}
          >
            <ArrowRight size={20} />
          </Button.Ripple>
        </div>
      </div>
      <div className="d-flex justify-content-center">
        <div style={{ maxWidth: 800, width: "100%" }}>
          <Progress
            value={(position / (data?.length - 1)) * 100 || 0}
            style={{ height: 4 }}
          />
        </div>
      </div>
    </div>
  );
};

export default MainCard;
