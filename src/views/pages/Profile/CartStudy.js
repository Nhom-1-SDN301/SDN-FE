// ** Reactstrap
import {
    Button,
    Col,
    Input,
    InputGroup,
    InputGroupText,
    Row,
    Spinner,
} from "reactstrap";

// ** Hooks
import { useTranslation } from "react-i18next";
import { useCallback, useEffect, useState } from "react";

// ** React
import { Search, Plus } from "react-feather";

// ** Styles
import styles from '../StudySet/style.module.scss';

// ** Components
import ItemStudySet from "../StudySet/ItemStudySet";
import ReactPaginate from "react-paginate";
import LoadingItem from "../StudySet/LoadingItem";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz/index";

// ** Third library
import _ from "lodash";
import ModalCreateStudySet from "../StudySet/ModalCreateStudySet";
import ModalEditStudySet from "../StudySet/ModalEditStudySet";

const CardStudy = () => {
    const { t } = useTranslation();
    const [studySets, setStudySets] = useState([]);
    const [search, setSearch] = useState("");
    const [page, setPage] = useState(0);
    const [totalPage, setTotalPage] = useState(1);

    const [loadingStudySet, setLoadingStudySet] = useState(false);
    const [loadingSearch, setLoadingSearch] = useState(false);

    const [openModalCreate, setOpenModalCreate] = useState(false);
    const [selectedStudySet, setSelectedStudySet] = useState(null);

    useEffect(() => {
        handleFetch(5, page, search);
    }, [page]);

    // ** Handler
    const handleFetch = (limit, offset, search) => {
        setLoadingStudySet(true);
        setStudySets(() => []);

        studySetApi
            .getAllCurentStudySet({ limit, offset, search })
            .then((resp) => {
                if (resp.data?.isSuccess) {
                    setStudySets(resp.data?.data?.studySets);
                    setTotalPage(resp.data?.data?.totalPage);
                }
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setLoadingSearch(false);
                setLoadingStudySet(false);
            });
    };

    const searchDebounce = useCallback(
        _.debounce((limit, offset, search) => {
            setLoadingSearch(true);
            setPage(0);
            handleFetch(limit, offset, search, true);
        }, 500),
        []
    );

    return (
        <Row className="justify-content-center">
            <Row>
                <Col>
                    {loadingStudySet ? (
                        <LoadingItem />
                    ) : (
                        studySets.map((studySet) => (
                            <ItemStudySet
                                key={studySet._id}
                                id={studySet._id}
                                author={studySet.user}
                                numberOfTerms={studySet.numberOfTerms}
                                title={studySet.title}
                                onEdit={() => setSelectedStudySet(studySet)}
                            />
                        ))
                    )}
                </Col>
            </Row>

            {/* Modal */}
            <ModalCreateStudySet
                open={openModalCreate}
                setOpen={setOpenModalCreate}
                handleFetch={handleFetch}
            />
        </Row>
    );
};

export default CardStudy;