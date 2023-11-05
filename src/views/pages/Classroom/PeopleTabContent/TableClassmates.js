// ** React
import { forwardRef, useCallback, useEffect, useState } from "react";

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

// ** Third libs
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import Select from "react-select";
import _ from "lodash";
import toast from "react-hot-toast";

// ** Components
import UILoader from "@components/ui-loader";
import Spinner from "@components/spinner/Loading-spinner";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ModalDetailMember from "./ModalDetailMember";
import ModalEmail from "./ModalEmail";

// ** Icons
import { ChevronDown, RefreshCcw } from "react-feather";

// ** I18n
import { useTranslation } from "react-i18next";

// Utils
import { classmatesColumns } from "./columns";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/react/libs/block-ui/block-ui.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";

// ** Constants
import { ACTION_MEMBERS } from "../../../../@core/constants";

// ** Redux
import { useSelector } from "react-redux";

const MySwal = withReactContent(Swal);

// ** Bootstrap Checkbox Component
const BootstrapCheckbox = forwardRef((props, ref) => (
  <div className="form-check">
    <Input type="checkbox" ref={ref} {...props} />
  </div>
));

const defaultFilter = {
  search: "",
};

const TableClassmates = ({ klass }) => {
  // ** Hooks
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState(defaultFilter);

  const [selectedRows, setSelectedRows] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null);
  const [openModalSendMail, setOpenModalSendMail] = useState(false);

  useEffect(() => {
    if (klass)
      fetchMembersInClass({ search: filter.search, classId: klass._id });
  }, [klass, filter.search]);

  // ** Handler
  const fetchMembersInClass = ({ search, classId }) => {
    setIsLoading(true);
    classApi
      .getMembersInClass({
        classId,
        search,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData(data.data.members);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleRefresh = () => {
    setFilter(defaultFilter);
  };

  const handleOnSelectedRowChange = useCallback((e) => {
    setSelectedRows(e.selectedRows);
  }, []);

  const handleSearch = useCallback(
    _.debounce((e) => {
      setFilter((prev) => ({ ...prev, search: e.target.value }));
    }, 500),
    []
  );

  const handleSendEmail = () => {
    setOpenModalSendMail(true);
  };

  const handleRemoveFromClass = async () => {
    const members = selectedRows.map((member) => member.user._id);

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
          return classApi.removeMembersFromClass({
            classId: klass._id,
            members,
          });
        }
      })
      .then((resp) => {
        if (resp) {
          if (resp.data.isSuccess) {
            setData((prev) =>
              prev.filter((member) => !members.includes(member.user._id))
            );
            toast.success(
              t("message.deleteSuccess", { value: t("fieldName.members") })
            );
          } else {
            toast.error(resp.data.message || t("error.unknow"));
          }
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("title.classmates")}</CardTitle>
      </CardHeader>
      <CardBody className="border-bottom">
        <Row>
          <Col md={3}>
            {klass?.userId === user._id && (
              <Select
                isDisabled={selectedRows.length === 0}
                id="action-select"
                className="react-select role-select"
                classNamePrefix="select"
                placeholder={t("fieldName.action")}
                options={ACTION_MEMBERS(t)}
                value={null}
                onChange={(e) => {
                  if (e.value === 0) {
                    handleSendEmail();
                  } else if (e.value === 1) {
                    handleRemoveFromClass();
                  }
                }}
              />
            )}
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
                defaultValue={filter.search}
                onChange={handleSearch}
              />
            </div>
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
          </Col>
        </Row>
      </CardBody>
      <UILoader blocking={isLoading} loader={<Spinner />}>
        <div
          className="react-dataTable react-dataTable-selectable-rows"
          style={{ minHeight: "300px" }}
        >
          <DataTable
            noHeader
            pagination
            responsive
            paginationServer
            selectableRows={klass?.userId === user._id}
            columns={classmatesColumns({ t, setSelectedMember, user, klass })}
            // onSort={handleSort}
            sortIcon={<ChevronDown />}
            selectableRowsComponent={BootstrapCheckbox}
            className="react-dataTable"
            data={data}
            onSelectedRowsChange={handleOnSelectedRowChange}
            // selectableRowSelected={handleRowSelected}
          />
        </div>
      </UILoader>

      {/* Modal */}
      <ModalDetailMember
        classId={klass?._id}
        member={selectedMember}
        setMember={setSelectedMember}
        setData={setData}
      />

      <ModalEmail
        composeOpen={openModalSendMail}
        toggleCompose={() => setOpenModalSendMail(!openModalSendMail)}
        members={selectedRows}
        classId={klass?._id}
      />
    </Card>
  );
};

export default TableClassmates;
