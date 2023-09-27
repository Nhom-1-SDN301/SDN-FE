// ** React
import { useContext, useEffect, useRef, useState } from "react";
import { Card, Row } from "reactstrap";
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

// ** Utils
import { getUserIdFromToken } from "../../../utility/Can";

// ** Third libs
import classNames from "classnames";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz/studySetApi";

// ** Components
import MainCard from "./MainCard";
import ModalInputPassword from "./ModalInputPassword";
import Author from "./Author";
import Detail from "./Detail";

const FlashCard = () => {
  // ** Hooks
  const { studySetId } = useParams();
  const [canAccess, setCanAccess] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [passwordStudySet, setPasswordStudySet] = useState(null);
  const [studySet, setStudySet] = useState(null);
  const [data, setData] = useState(null);
  const [openModalPassword, setOpenModalPassword] = useState(false);

  // ** Context
  const themeColors = useContext(ThemeColors);

  useEffect(() => {
    studySetApi
      .getStudySetbyId({ studySetId })
      .then((resp) => {
        if (resp.data?.isSuccess) {
          const respStudySet = resp.data?.data?.studySet;
          setStudySet(() => respStudySet);

          // Constants
          const isAuthor = getUserIdFromToken() === respStudySet?.user?.id;
          const isPublic = respStudySet?.canVisit === 1;
          const isPublicWithPassword = respStudySet?.canVisit === 2;
          const isPrivate = respStudySet?.canVisit === 3;

          setIsAuthor(isAuthor);

          // can access
          if ((isAuthor && isPrivate) || isPublic || isAuthor) {
            setCanAccess(true);
          } else if (isPublicWithPassword) {
            // access with password
            setOpenModalPassword(true);
          } else {
            // unauthorized
            setCanAccess(false);
          }
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [studySetId]);

  useEffect(() => {
    if (canAccess === false) {
      console.log("navigate Unauthorize page");
    }

    if (canAccess) {
      loadStudySet();
    }
  }, [canAccess]);

  // ** Handler
  const loadStudySet = async () => {
    const { data } = await studySetApi.getAllTermOfStudySet({
      studySetId,
      password: passwordStudySet,
    });

    if (data.isSuccess) {
      setData(data.data?.terms);
    }
  };

  return (
    <Row className={styles.container}>
      <h1 style={{ fontWeight: 700 }}>{studySet?.title}</h1>
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
          {studySet?.avgRate}
        </span>
        <span>{`(${studySet?.totalRate} reviews)`}</span>
      </div>

      {/* option */}
      <div className="d-flex justify-content-center">
        <div
          className="d-flex mt-2 justify-content-between"
          style={{ maxWidth: 800, width: "100%" }}
        >
          <Card
            className={classNames(
              { [styles.card_option]: data },
              { [styles.card_disable]: !data }
            )}
            style={{ margin: 0 }}
          >
            <PiCardsDuotone className={styles.card_option__icon} size={24} />
            <span>FlashCard</span>
          </Card>
          <Card
            className={classNames(
              { [styles.card_option]: data },
              { [styles.card_disable]: !data }
            )}
            style={{ margin: 0 }}
          >
            <SiBookstack className={styles.card_option__icon} size={24} />
            <span>Learn</span>
          </Card>
          <Card
            className={classNames(
              { [styles.card_option]: data },
              { [styles.card_disable]: !data }
            )}
            style={{ margin: 0 }}
            onClick={() => console.log(passwordStudySet)}
          >
            <FaRegNoteSticky className={styles.card_option__icon} size={24} />
            <span>Test</span>
          </Card>
        </div>
      </div>

      {/* main flash-card */}
      <MainCard data={data} isAuthor={isAuthor} />

      {/* Author */}
      <Author author={studySet?.user} />

      {/* Detail all card */}
      <Detail studySet={studySet} data={data}/>

      {/* Modal */}
      <ModalInputPassword
        open={openModalPassword}
        setOpen={setOpenModalPassword}
        setCanAccess={setCanAccess}
        setPasswordStudySet={setPasswordStudySet}
      />
    </Row>
  );
};

export default FlashCard;
