// ** React
import { Fragment, forwardRef, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Reactstrap
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Label,
  Row,
} from "reactstrap";

// ** Constants
import { STUDYSET_REPORT_TYPES_MODERATE } from "../../../../../@core/constants";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Custom components
// import CustomHeader, { optionPerPage } from "./CustomHeader";
import UILoader from "@components/ui-loader";
import Spinner from "@components/spinner/Loading-spinner";
import DataTable from "react-data-table-component";
import ModalAccept from "./ModalAccept";
import ModalReject from "./ModalReject";
import { columns } from "./columns";

// ** Third libs
import Select from "react-select";
import _ from "lodash";
import { optionPerPage } from "../../User/CustomHeader";

// ** Icons
import { ChevronDown, Plus, RefreshCcw } from "react-feather";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/react/libs/block-ui/block-ui.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

// ** Apis
import { studySetApi } from "../../../../../@core/api/quiz/studySetApi";

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const defaultOption = {
  search: "",
  type: [],
  limit: optionPerPage[0],
};

const Table = () => {
  // ** Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [option, setOption] = useState(defaultOption);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedRowAccept, setSelectedRowAccept] = useState(null);
  const [selectedRowReject, setSelectedRowReject] = useState(null);
  const [isFirstFetch, setIsFirstFetch] = useState(true);

  useEffect(() => {
    handleFetchReports({ filter: option });
  }, [option]);

  // ** Handler
  const handleFetchReports = ({ filter }) => {
    setIsLoading(true);
    studySetApi
      .getReportStudySets({ status: 0 })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData(
            data.data.reportStudySets.filter(
              (rp) =>
                (rp.description.includes(filter.search) ||
                  rp.studySet.title.includes(filter.search) ||
                  rp.user.fullName.includes(filter.search) ||
                  rp.user.email.includes(filter.search)) &&
                (option.type.length > 0
                  ? rp.types.some((t) => {
                      console.log(option.type.map((t) => t.value));
                      return option.type.map((t) => t.value).includes(t);
                    })
                  : true)
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
        setIsFirstFetch(false);
      });
  };

  const handleRowSelected = useCallback((row) => {
    return selectedRows.findIndex((rp) => rp._id === row._id) > -1;
  }, []);

  const handleOnSelectedRowChange = useCallback(
    (e) => {
      if (isFirstFetch) return;
      setSelectedRows(e.selectedRows);
    },
    [isFirstFetch]
  );

  const debouceSearch = useCallback(
    _.debounce((e) => {
      setOption((prev) => ({ ...prev, search: e.target.value }));
    }, 400),
    []
  );

  console.log(data);

  return (
    <Fragment>
      <Card>
        <UILoader blocking={isLoading} loader={<Spinner />}>
          <CardHeader>
            <CardTitle tag="h4">{t("title.filters")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="12">
                <Label for="role-select">{t("fieldName.type")}</Label>
                <Select
                  options={STUDYSET_REPORT_TYPES_MODERATE(t)}
                  className="react-select role-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  isMulti
                  value={option.type}
                  onChange={(e) =>
                    setOption((prev) => ({
                      ...prev,
                      type: e.map((t) => t),
                    }))
                  }
                />
              </Col>
            </Row>
          </CardBody>
        </UILoader>
      </Card>

      <Card>
        <UILoader blocking={isLoading} loader={<Spinner />}>
          <CardHeader className="flex-md-row flex-column align-md-items-center align-items-start border-bottom">
            {/* <Row style={{ width: "100%" }}>
              <Col md={6}>
                <div className="d-flex align-items-center w-100">
                  <label htmlFor="rows-per-page">{t("common.show")}</label>
                  <span style={{ margin: "0 .5rem" }}>
                    <Select
                      theme={selectThemeColors}
                      classNamePrefix="select"
                      value={option.limit}
                      options={optionPerPage}
                      isClearable={false}
                      onChange={(value) =>
                        setOption((prev) => ({ ...prev, limit: value }))
                      }
                    />
                  </span>
                  <label htmlFor="rows-per-page">{t("common.entries")}</label>
                </div>
              </Col>
              <Col
                md={6}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: 0,
                }}
              >
                <div></div>
                <div className="d-flex mt-md-0 mt-1">
                  <Button className="ms-2" color="primary">
                    <RefreshCcw size={16} />
                    <span className="align-middle ms-50">
                      {t("fieldName.refresh")}
                    </span>
                  </Button>
                </div>
              </Col>
            </Row> */}
          </CardHeader>
          <Row className="justify-content-end mx-0">
            {selectedRows.length > 0 && (
              <Col
                className="d-flex align-items-center mt-1 mb-50"
                md="6"
                sm="12"
              >
                <Button color="success" style={{ marginRight: ".5rem" }}>
                  {t("fieldName.acceptAll")}
                </Button>
                <Button color="danger">{t("fieldName.rejectAll")}</Button>
              </Col>
            )}
            <Col
              className="d-flex align-items-center justify-content-end mt-1"
              md="6"
              sm="12"
            >
              <Label className="me-1" for="search-input">
                {t("fieldName.search")}
              </Label>
              <Input
                className="dataTable-filter mb-50"
                type="text"
                id="search-input"
                placeholder={`...${t("fieldName.search")}`}
                defaultValue={option.search}
                onChange={debouceSearch}
              />
            </Col>
          </Row>
          <div className="react-dataTable react-dataTable-selectable-rows">
            <DataTable
              noHeader
              pagination
              selectableRows
              columns={columns({
                t,
                navigate,
                setSelectedRowAccept,
                setSelectedRowReject,
              })}
              paginationPerPage={option.limit.value}
              className="react-dataTable"
              sortIcon={<ChevronDown size={10} />}
              selectableRowsComponent={BootstrapCheckbox}
              data={data}
              onSelectedRowsChange={handleOnSelectedRowChange}
              selectableRowSelected={handleRowSelected}
            />
          </div>
        </UILoader>
      </Card>

      {/* Modal */}
      <ModalAccept
        select={selectedRowAccept}
        setSelect={setSelectedRowAccept}
        setData={setData}
      />

      <ModalReject
        select={selectedRowReject}
        setSelect={setSelectedRowReject}
        setData={setData}
      />
    </Fragment>
  );
};

export default Table;
