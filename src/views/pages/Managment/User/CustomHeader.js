// ** React
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

// ** Icons
import {
  Copy,
  File,
  FileText,
  Grid,
  Printer,
  RefreshCcw,
  Share,
} from "react-feather";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third Party Components
import Select from "react-select";
import _ from "lodash";
import { useCallback } from "react";

export const optionPerPage = [
  {
    label: 10,
    value: 10,
  },
  {
    label: 25,
    value: 25,
  },
  {
    label: 50,
    value: 50,
  },
];

const CustomHeader = ({
  handleRefresh,
  option,
  setOption,
  data,
  t,
  setCurrentPage,
}) => {
  // ** Converts table to CSV
  function convertArrayOfObjectsToCSV(array) {
    let result;

    const columnDelimiter = ",";
    const lineDelimiter = "\n";
    const keys = Object.keys(data[0]);

    result = "";
    result += keys.join(columnDelimiter);
    result += lineDelimiter;

    array.forEach((item) => {
      let ctr = 0;
      keys.forEach((key) => {
        if (ctr > 0) result += columnDelimiter;

        result += item[key];

        ctr++;
      });
      result += lineDelimiter;
    });

    return result;
  }

  // ** Downloads CSV
  function downloadCSV(array) {
    const link = document.createElement("a");
    let csv = convertArrayOfObjectsToCSV(array);
    if (csv === null) return;

    const filename = "data_user.csv";

    if (!csv.match(/^data:text\/csv/i)) {
      csv = `data:text/csv;charset=utf-8,${csv}`;
    }

    link.setAttribute("href", encodeURI(csv));
    link.setAttribute("download", filename);
    link.click();
  }

  const handleSearch = useCallback(
    _.debounce((e) => {
      setOption((prev) => ({ ...prev, search: e.target.value }));
      setCurrentPage(0);
    }, 500),
    []
  );

  return (
    <div className="invoice-list-table-header w-100 me-1 ms-50 mt-2 mb-75">
      <Row>
        <Col xl="4" className="d-flex align-items-center p-0">
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
          xl="8"
          className="d-flex align-items-sm-center justify-content-xl-end justify-content-start flex-xl-nowrap flex-wrap flex-sm-row flex-column pe-xl-1 p-0 mt-xl-0 mt-1"
        >
          <div className="d-flex align-items-center mb-sm-0 mb-1 me-1">
            <label
              className="mb-0"
              htmlFor="search-invoice"
              style={{ width: 100 }}
            >
              {t("fieldName.search")}:
            </label>
            <Input
              id="search-invoice"
              className="ms-50 w-100"
              placeholder={`...`}
              type="text"
              defaultValue={option.search}
              onChange={handleSearch}
            />
          </div>

          <div className="d-flex align-items-center table-header-actions">
            <UncontrolledDropdown className="me-1">
              <DropdownToggle color="secondary" caret outline>
                <Share className="font-small-4 me-50" />
                <span className="align-middle">{t("common.export")}</span>
              </DropdownToggle>
              <DropdownMenu>
                <DropdownItem className="w-100">
                  <Printer className="font-small-4 me-50" />
                  <span className="align-middle">Print</span>
                </DropdownItem>
                <DropdownItem
                  className="w-100"
                  onClick={() => downloadCSV(data)}
                >
                  <FileText className="font-small-4 me-50" />
                  <span className="align-middle">CSV</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Grid className="font-small-4 me-50" />
                  <span className="align-middle">Excel</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <File className="font-small-4 me-50" />
                  <span className="align-middle">PDF</span>
                </DropdownItem>
                <DropdownItem className="w-100">
                  <Copy className="font-small-4 me-50" />
                  <span className="align-middle">Copy</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>

            <Button
              className="add-new-user d-flex align-items-center"
              color="primary"
              onClick={handleRefresh}
            >
              <RefreshCcw size={16} />
              <span style={{ marginLeft: ".5rem" }}>
                {t("fieldName.refresh")}
              </span>
            </Button>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default CustomHeader;
