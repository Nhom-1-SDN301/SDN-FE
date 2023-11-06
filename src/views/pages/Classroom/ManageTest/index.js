// ** Reactstrap
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Input,
  Row,
} from "reactstrap";

// ** React
import { forwardRef, useEffect, useState } from "react";
import toast from "react-hot-toast";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Icons
import { ChevronDown, RefreshCcw } from "react-feather";

// ** Components
import Select from "react-select";
import DataTable from "react-data-table-component";
import UILoader from "@components/ui-loader";
import Spinner from "@components/spinner/Loading-spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { testColumn } from "./columns";
import ModalEditInfo from "./ModalEditInfo";
import ModalEditQuestion from "./ModalEditQuestion";

// ** Styles
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";

const MySwal = withReactContent(Swal);

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const ManageTest = ({ user, klass }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [testSelected, setTestSelected] = useState(null);

  useEffect(() => {
    if (klass?._id) {
      fetchTests({ classId: klass?._id });
    }
  }, [klass?._id]);

  // ** Handler
  const fetchTests = ({ classId }) => {
    setLoading(true);
    classApi
      .getAllTestsInClass({
        classId,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData(data.data.tests);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleRemoveTest = async ({ testId, classId }) => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.confirm"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          return classApi.removeTestInClass({
            classId,
            testId,
          });
        }
      })
      .then((resp) => {
        if (resp) {
          if (resp.data.isSuccess) {
            setData((prev) => prev.filter((test) => test._id !== testId));
            toast.success(t("message.deleteSuccess", { value: "test" }));
          } else {
            toast.err(resp.data.message || t("error.unknow"));
          }
        }
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title.manageTest")}</CardTitle>
      </CardHeader>
      <CardBody className="border-bottom">
        <Row>
          <Col md={3}>
            <Select
              id="action-select"
              className="react-select role-select"
              classNamePrefix="select"
              placeholder={t("fieldName.action")}
              options={[]}
            />
          </Col>
          <Col md={9} style={{ display: "flex", justifyContent: "flex-end" }}>
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
              />
            </div>
            <Button
              className="add-new-user d-flex align-items-center"
              color="primary"
            >
              <RefreshCcw size={16} />
              <span style={{ marginLeft: ".5rem" }}>
                {t("fieldName.refresh")}
              </span>
            </Button>
          </Col>
        </Row>
      </CardBody>
      <UILoader blocking={loading} loader={<Spinner />}>
        <div
          className="react-dataTable react-dataTable-selectable-rows"
          style={{ minHeight: "300px" }}
        >
          <DataTable
            noHeader
            pagination
            responsive
            paginationServer
            columns={testColumn({ t, handleRemoveTest, setTestSelected })}
            // onSort={handleSort}
            sortIcon={<ChevronDown />}
            selectableRowsComponent={BootstrapCheckbox}
            className="react-dataTable"
            data={data}
            // onSelectedRowsChange={handleOnSelectedRowChange}
            // selectableRowSelected={handleRowSelected}
          />
        </div>
      </UILoader>

      {/* Modal */}
      {testSelected && (
        <ModalEditQuestion
          selectedTest={testSelected}
          setSelectedTest={setTestSelected}
          setData={setData}
        />
      )}
    </Card>
  );
};

export default ManageTest;
