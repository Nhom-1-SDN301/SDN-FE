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
import styles from "./style.module.scss";

// ** Components
import ItemStudySet from "./ItemStudySet";
import ReactPaginate from "react-paginate";
import LoadingItem from "./LoadingItem";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz/index";

// ** Third library
import _ from "lodash";

const YourStudySet = () => {
  const { t } = useTranslation();
  const [studySets, setStudySets] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);

  const [loadingStudySet, setLoadingStudySet] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

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
          setStudySets(resp.data?.data?.data);
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
      handleFetch(limit, offset, search);
    }, 500),
    []
  );

  return (
    <Row className="justify-content-center">
      <Row className="my-3" xs={1} sm={1} md={2}>
        <Col>
          <Button.Ripple className={styles.width_button_auto} color="primary">
            <Plus size={14} />
            <span className="align-middle ms-25">Create</span>
          </Button.Ripple>
        </Col>
        <Col>
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
            <Input
              placeholder={`${t("fieldName.search")}...`}
              value={search}
              onChange={(e) => {
                setSearch(() => e.target.value);
                searchDebounce(5, page, e.target.value);
              }}
            />
            {loadingSearch && (
              <InputGroupText>
                <Spinner color="primary" style={{ width: 20, height: 20 }} />
              </InputGroupText>
            )}
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col>
          {loadingStudySet ? (
            <LoadingItem />
          ) : (
            studySets.map((studySet) => (
              <ItemStudySet
                key={studySet.id}
                id={studySet.id}
                author={studySet.author}
                numberOfTerms={studySet.numberOfTerms}
                title={studySet.title}
              />
            ))
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <ReactPaginate
          nextLabel=""
          pageCount={totalPage}
          breakLabel="..."
          previousLabel=""
          pageRangeDisplayed={5}
          marginPagesDisplayed={2}
          activeClassName="active"
          pageClassName="page-item"
          breakClassName="page-item"
          nextLinkClassName="page-link"
          pageLinkClassName="page-link"
          nextClassName="page-item next"
          breakLinkClassName="page-link"
          previousLinkClassName="page-link"
          previousClassName="page-item prev"
          containerClassName="pagination react-paginate justify-content-end"
          initialPage={page}
          onPageChange={(e) => setPage(e.selected)}
        />
      </Row>
    </Row>
  );
};

export default YourStudySet;
