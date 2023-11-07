import { useEffect, useState } from "react";
import { Search } from "react-feather";
import { useTranslation } from "react-i18next";
import ReactPaginate from "react-paginate";
import {
  Col,
  Input,
  InputGroup,
  InputGroupText,
  Row,
  Spinner,
} from "reactstrap";
import ItemStudySet from "./ItemStudySet";
import LoadingItem from "./LoadingItem";
import { studySetApi } from "../../../@core/api/quiz";

const SharedStudySet = () => {
  const { t } = useTranslation();
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [loadingStudySet, setLoadingStudySet] = useState(false);
  const [studySets, setStudySets] = useState([]);

  useEffect(() => {
    setLoadingStudySet(true);
    studySetApi
      .getStudySetShared()
      .then(({ data }) => {
        if (data.isSuccess) {
          setStudySets(data.data.studySets);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoadingStudySet(false);
      });
  }, []);

  return (
    <Row className="justify-content-center">
      <Row className="my-3" xs={1} sm={1} md={2}>
        <Col></Col>
        <Col>
          <InputGroup className="input-group-merge">
            <InputGroupText>
              <Search size={14} />
            </InputGroupText>
            <Input
              placeholder={`${t("fieldName.search")}...`}
              //   value={search}
              //   onChange={(e) => {
              //     setSearch(() => e.target.value);
              //     searchDebounce(5, page, e.target.value);
              //   }}
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
                key={studySet._id}
                id={studySet._id}
                author={studySet.user}
                numberOfTerms={studySet.numberOfTerms}
                title={studySet.title}
                // onEdit={() => setSelectedStudySet(studySet)}
              />
            ))
          )}
        </Col>
      </Row>
      <Row className="mt-2">
        <ReactPaginate
          nextLabel=""
          //   pageCount={totalPage}
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
          //   forcePage={page}
          //   onPageChange={(e) => setPage(e.selected)}
        />
      </Row>
    </Row>
  );
};

export default SharedStudySet;
