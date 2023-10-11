import React from 'react';
import { Card, CardBody, Row } from 'reactstrap';
import Avatar from "@components/avatar";
import { Edit, Trash2 } from 'react-feather';
import styles from './folderStyle.module.scss';
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom'; // Import Link from React Router

const FolderCard = ({ id, numberOfTerms, author, title, handleDelete, handleEdit, handleRidirecToFolder }) => {
    const { t } = useTranslation();

    const infoFolderUrl = `/folder/infoFolder`;

    return (
        <Link to={infoFolderUrl}> 
            <Card 
                className={`${styles.card_folder}`}
            >
                <CardBody>
                    <div className={`${styles.card_hover}`}>
                        <div style={{ position: 'relative' }}>
                            <Trash2 className={styles.trash_folder} onClick={() => handleDelete(id)} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Edit className={styles.edit_folder} onClick={() => handleEdit(id)} />
                        </div>
                    </div>
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
        </Link>
    );
};

export default FolderCard;
