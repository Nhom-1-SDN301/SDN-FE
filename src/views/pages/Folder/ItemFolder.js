import React from 'react';
import { Card, CardBody, Row, UncontrolledTooltip } from 'reactstrap';
import Avatar from "@components/avatar";
import { Bold, Edit, Trash2 } from 'react-feather';
import styles from './folderStyle.module.scss';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';
import { folderApi } from "../../../@core/api/quiz/folderApi"

const FolderCard = ({ id, numberOfTerms, author, title, description, handleDelete, handleEdit, handleRidirecToFolder, folders, userId }) => {
    const { t } = useTranslation();
    console.log("1235", userId);
    if (!Array.isArray(folders)) {
        return null;
    }
    const infoFolderUrl = `/folder`;
    return (
        folders.map((folder) => {
            return (
                <Link to={`${infoFolderUrl}/${folder._id}`}>
                    <Card
                        className={`${styles.card_folder}`}
                    >
                        <CardBody>
                            <div className={`${styles.card_hover}`}>
                                <div style={{ position: 'relative' }}>
                                    <Trash2 className={styles.trash_folder} onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleDelete(folder._id);
                                    }} />
                                </div>
                                <div style={{ position: 'relative' }}>
                                    <Edit className={styles.edit_folder} onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        handleEdit(folder);
                                    }} />
                                </div>
                            </div>
                            <div className="d-flex">
                                {/* <div className="d-flex align-items-center" color="primary" style={{ paddingRight: "1rem", borderRight: "2px solid #b8b4b4" }}>
                                    <h6 className="m-0" style={{ fontSize: ".9rem", whiteSpace: "nowrap" }}>
                                        {`${numberOfTerms || 0} ${t("fieldName.terms")}`}
                                    </h6>
                                </div> */}
                                <div
                                    className={`${styles.author} d-flex align-items-center cursor-pointer`}
                                    style={{ marginLeft: "1rem" }}
                                >
                                    <Avatar
                                        size="sm"
                                        img={
                                           folder.userId.picture
                                        }

                                    />
                                    <div style={{ display: "flex", flexDirection: "column" }}>
                                        <h6
                                            id={`title-tooltip-${folder._id}`} 
                                            style={{
                                                margin: ".5rem 0 0 .5rem",
                                                fontSize: "1.2rem",
                                                fontWeight: "bold",
                                                 whiteSpace: "nowrap",
                                                overflow: "hidden",
                                                textOverflow: "ellipsis",
                                                 width: "100%",
                                            }}
                                        >
                                            {folder.title.length > 75 ? `${folder.title.slice(0, 75)}...` : folder.title}
                                        </h6>
                                        <UncontrolledTooltip target={`title-tooltip-${folder._id}`} placement="top">
                                            {folder.title}
                                        </UncontrolledTooltip>
                                        <h6 style={{ margin: "0 0 0 .5rem", fontSize: ".9rem" }}>
                                            {folder.description}
                                        </h6>
                                    </div>
                                </div>
                            </div>
                            <Row className="mt-2">
                                <h3 style={{ margin: 0 }}>{title}</h3>
                            </Row>
                        </CardBody>
                    </Card>
                </Link>
            )

        }
        )

    );
};

export default FolderCard;
