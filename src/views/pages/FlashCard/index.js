// ** React
import { useContext, useEffect, useRef, useState } from "react";
import { Card, Row } from "reactstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import toast from "react-hot-toast";

// ** Icons
import { Info, Star } from "react-feather";
import { PiCardsDuotone } from "react-icons/pi";
import { SiBookstack } from "react-icons/si";
import { FaRegNoteSticky } from "react-icons/fa6";

// ** Context
import { ThemeColors } from "@src/utility/context/ThemeColors";

// ** Style
import styles from "./style.module.scss";

// ** Utils
import { getUserIdFromToken, isJwtExpir } from "../../../utility/Can";

// ** Third libs
import classNames from "classnames";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz/studySetApi";
import { termApi } from "../../../@core/api/quiz";

// ** Components
import MainCard from "./MainCard";
import ModalInputPassword from "./ModalInputPassword";
import Author from "./Author";
import Detail from "./Detail";
import ModalRating from "./ModalRating";
import { jwtConfig } from "../../../@core/auth/jwt/jwtDefaultConfig";
import { authService } from "../../../@core/auth/jwt/authService";

const FlashCard = () => {
  // ** Hooks
  const { studySetId } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [canAccess, setCanAccess] = useState(null);
  const [isAuthor, setIsAuthor] = useState(false);
  const [studySet, setStudySet] = useState(null);
  const [data, setData] = useState(null);
  const [openModalPassword, setOpenModalPassword] = useState(false);
  const [openModalRating, setOpenModalRating] = useState(false);

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
          const userId = getUserIdFromToken();
          const isAuthor = userId === respStudySet?.user?._id;
          const isPublic = respStudySet?.canVisit === 1;
          const isPublicWithPassword = respStudySet?.canVisit === 2;
          const isPrivate = respStudySet?.canVisit === 3;

          setIsAuthor(isAuthor);

          const isShared = Boolean(
            respStudySet.shareTo.find((_id) => userId === _id)
          );

          // can access
          if ((isAuthor && isPrivate) || isPublic || isAuthor || isShared) {
            setCanAccess(true);
          } else if (isPublicWithPassword) {
            // access with password
            setOpenModalPassword(true);
          } else {
            // unauthorized
            setCanAccess(false);
          }
        }
        if (resp.data?.statusCode === 404 || resp.data?.statusCode === 500)
          navigate("/error");
      })
      .catch((err) => {
        console.log(err);
        navigate("/error");
      });
  }, [studySetId]);

  useEffect(() => {
    if (canAccess === false) {
      navigate("/unauthorize");
    }
    if (canAccess && getUserIdFromToken()) {
      if (isJwtExpir()) {
        authService
          .refreshToken()
          .then((rs) => {
            if (rs.data?.isSuccess) {
              const { accessToken } = rs.data.data;
              const payload = {
                accessToken,
              };
              authService.updateStorageWhenRefreshToken(payload);
              loadStudySet();
            } else {
              console.log("loi2");
              authService.removeLocalStorageWhenLogout();
              window.location.href = jwtConfig.logoutEndpoint;
            }
          })
          .catch((err) => {
            console.log(err);
            authService.removeLocalStorageWhenLogout();
            window.location.href = jwtConfig.logoutEndpoint;
          });
      } else loadStudySet();
    } else if (canAccess) {
      loadStudySet();
    }
  }, [canAccess]);

  // ** Handler
  const loadStudySet = async () => {
    const { data } = await termApi.getTerms({
      studySetId,
    });

    if (data.isSuccess && data.data?.terms?.length !== 0) {
      setData(data.data?.terms);
    }
    if (data.data?.terms?.length === 0) {
      toast(() => (
        <div className="d-flex align-items-center">
          <Info style={{ color: "orange" }} size={20} />
          <span style={{ marginLeft: ".5rem" }}>
            {t("message.empty", { value: t("fieldName.studySet") })}
          </span>
        </div>
      ));
    }
  };

  const handleCommingSoon = () => {
    toast(() => (
      <div className="d-flex align-items-center">
        <Info style={{ color: "orange" }} size={20} />
        <span style={{ marginLeft: ".5rem" }}>{t("message.commingSoon")}</span>
      </div>
    ));
  };

  return (
    <Row className={styles.container}>
      <h1 style={{ fontWeight: 700 }}>{studySet?.title}</h1>
      <div
        className={`${styles.rating} d-flex align-items-center`}
        onClick={() => setOpenModalRating(true)}
      >
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
          {studySet?.avgStar}
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
            onClick={handleCommingSoon}
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
            onClick={handleCommingSoon}
          >
            <FaRegNoteSticky className={styles.card_option__icon} size={24} />
            <span>Test</span>
          </Card>
        </div>
      </div>

      {/* main flash-card */}
      <MainCard data={data} isAuthor={isAuthor} />

      {/* Author */}
      <Author author={studySet?.user} isAuthor={isAuthor} studySet={studySet} />

      {/* Detail all card */}
      <Detail
        studySet={studySet}
        data={data}
        setData={setData}
        isAuthor={isAuthor}
      />

      {/* Modal */}
      <ModalInputPassword
        open={openModalPassword}
        setOpen={setOpenModalPassword}
        setCanAccess={setCanAccess}
        setData={setData}
      />

      <ModalRating
        open={openModalRating}
        setOpen={setOpenModalRating}
        studySetId={studySetId}
      />
    </Row>
  );
};

export default FlashCard;
