import React, { useEffect, useState } from "react";
import BreadCrumbsPage from "@components/breadcrumbs";
import {
  Button,
  Card,
  CardBody,
  Col,
  Row,
  Container,
  UncontrolledTooltip,
} from "reactstrap"; // Thêm Container vào để bọc lưới
import { Edit, Plus, Trash2 } from "react-feather";
import styles from "./folderStyle.module.scss";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Avatar from "@components/avatar";
import ModalAddStudySetToFolder from "./ModalAddStudySetToFolder";
import { folderApi } from "../../../@core/api/quiz/folderApi";

const InfoFolder = ({
  id,
  author,
  title,
  handleDeleteInfo,
  handleEditInfo,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const params = useParams();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [studySets, setStudySets] = useState([]);

  const openCreateModal = () => {
    setShowCreateModal(true);
  };
  const linkToFlashCard = `/flash-card`;

  const handleInfoFolderClick = () => {
    navigate(termsUrl);
  };

  const getStudySetByFolderId = () => {
    folderApi
      .getStudySetByFolderId(params.inforFolder)
      .then((res) => {
        const studySetsData = res.data.data.studySets;
        console.log("100");
        setStudySets(studySetsData);
      })
      .catch((error) => {
        console.error("Error fetching study sets:", error);
      });
  };

  useEffect(() => {
    getStudySetByFolderId();
  }, []);

  return (
    <div>
      <BreadCrumbsPage
        title={t("page.infoFolder")}
        data={[
          { title: t("page.folder"), link: "/folder" },
          { title: t("page.infoFolder") },
        ]}
      />

      <Col style={{ marginTop: "-25px", marginTop: "25px" }}>
        <Button.Ripple
          className={styles.width_button_auto}
          color="primary"
          onClick={openCreateModal}
          style={{ marginLeft: "10px" }}
        >
          <Plus size={14} />
          <span className="align-middle ms-25">
            {t("fieldName.addStudySet")}
          </span>
        </Button.Ripple>
      </Col>

      <Row>
        {studySets.map((studySet) => (
          <Col sm="6" key={studySet._id}>
            <Link to={`${linkToFlashCard}/${studySet._id}`}>
              <Card
                style={{ height: "100px", marginTop: "10px" }}
                className={`${styles.card_infoFolder}`}
              >
                <CardBody onClick={handleInfoFolderClick}>
                  <div className={`${styles.card_infoFolderHover}`}>
                    {/* <div style={{ position: 'relative' }}>
                                                <Trash2 className={styles.trash_infoFolder} onClick={() => handleDeleteInfo(id)} />
                                            </div> */}
                  </div>
                  <div className="d-flex">
                    <div
                      className="d-flex align-items-center"
                      color="primary"
                      style={{
                        paddingRight: "1rem",
                        borderRight: "2px solid #b8b4b4",
                      }}
                    >
                      {/* <h6 className="m-0" style={{ fontSize: '.9rem' }}>
                        {`${studySet?.numberOfTerms} ${t('fieldName.terms')}`}
                      </h6> */}
                    </div>
                    <div
                      className={`${styles.author} d-flex align-items-center cursor-pointer`}
                      style={{ marginLeft: "1rem" }}
                    >
                      <Avatar
                        size="sm"
                        img={
                          author?.avatar ||
                          "/src/assets/images/portrait/small/avatar-s-11.jpg"
                        }
                      />
                      <h5 style={{ margin: "0 0 0 .5rem" }}>
                        {studySet.title}
                      </h5>
                    </div>
                  </div>
                  <Row className="mt-2">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                      <h6
                        id={`title-tooltip-${studySet.id}`}
                        style={{
                          margin: ".5rem 0 0 .5rem",
                          fontSize: "1.0rem",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100%",
                        }}
                      >
                        {studySet.description.length > 65
                          ? `${studySet.description.slice(0, 65)}...`
                          : studySet.description}
                      </h6>
                      <UncontrolledTooltip
                        target={`title-tooltip-${studySet.id}`}
                        placement="top"
                      >
                        {studySet.description}
                      </UncontrolledTooltip>
                      {/* <h6 style={{ margin: "0 0 0 .5rem", fontSize: ".9rem" }}>
                                            {studySet.description}
                                        </h6> */}
                    </div>
                  </Row>
                </CardBody>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>

      <ModalAddStudySetToFolder
        folderId={params.inforFolder}
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        isUpdated={(isUpdated) => {
          getStudySetByFolderId();
        }}
      />
    </div>
  );
};

export default InfoFolder;
