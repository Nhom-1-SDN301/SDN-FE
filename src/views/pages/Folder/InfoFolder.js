import React from 'react';
import BreadCrumbsPage from '@components/breadcrumbs';
import { useState } from 'react';
import { Card, CardBody, Row, } from 'reactstrap';
import { Edit, Trash2 } from 'react-feather';
import styles from './folderStyle.module.scss';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import Avatar from "@components/avatar";

const InfoFolder = (id, numberOfTerms, author, title, handleDeleteInfo, handleEditInfo) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const termsUrl = `/flash-card/:studySetId`;

    const handleInfoFolderClick = () => {
        navigate(termsUrl)
    }

    return (
        <div>
            <BreadCrumbsPage
                title={t('page.infoFolder')}
                data={[
                    { title: t('page.folder'), link: '/folder' },
                    { title: t('page.infoFolder') },
                ]}
            />
            <Card style={{ height: '130px' }}
                className={`${styles.card_infoFolder}`}
            >
                <CardBody onClick={handleInfoFolderClick}>
                    <div className={`${styles.card_infoFolderHover}`}>
                        <div style={{ position: 'relative' }}>
                            <Trash2 className={styles.trash_infoFolder} onClick={() => handleDeleteInfo(id)} />
                        </div>
                        <div style={{ position: 'relative' }}>
                            <Edit className={styles.edit_infoFolder} onClick={() => handleEditInfo(id)} />
                        </div>
                    </div>
                    <div className="d-flex">
                        <div
                            className="d-flex align-items-center"
                            color="primary"
                            style={{ paddingRight: "1rem", borderRight: "2px solid #b8b4b4" }}
                        >
                            <h6 className="m-0" style={{ fontSize: ".9rem" }}>
                                {`0 ${t("fieldName.terms")}`}
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
                                {author?.fullName} HongThang
                            </h6>
                        </div>
                    </div>
                    <Row className="mt-3">
                        <h3 style={{ margin: 0 }}>{title}Subject</h3>
                    </Row>
                </CardBody>
            </Card>
        </div>
    );
};

export default InfoFolder;
