// ** React
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Label,
  Row,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Icons
import { ChevronDown } from "react-feather";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Table Columns
import { columns } from "./column";

// ** Custom components
import CustomHeader, { optionPerPage } from "./CustomHeader";
import UILoader from "@components/ui-loader";
import Spinner from "@components/spinner/Loading-spinner";

// ** Third libs
import Select from "react-select";
import ReactPaginate from "react-paginate";
import DataTable from "react-data-table-component";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "@styles/react/libs/react-select/_react-select.scss";
import "@styles/react/libs/tables/react-dataTable-component.scss";
import "@styles/react/libs/block-ui/block-ui.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

// ** Apis
import { userApi } from "../../../../@core/api/quiz/userApi";

const MySwal = withReactContent(Swal);

const getRoles = (t) => [
  {
    value: 1,
    label: t("common.admin"),
  },
  {
    value: 2,
    label: t("common.moderator"),
  },
  {
    value: 3,
    label: t("common.member"),
  },
];

const getStatus = (t) => [
  {
    value: 0,
    label: t("common.active"),
  },
  {
    value: 1,
    label: t("common.banned"),
  },
];

const defaultOption = {
  search: "",
  role: null,
  status: null,
  limit: optionPerPage[0],
};

const Table = () => {
  // ** Store Vars
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  // ** Hooks
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [option, setOption] = useState(defaultOption);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    handleFetchUsers();
  }, [option, currentPage]);

  // ** Custom Pagination
  const CustomPagination = () => {
    return (
      <ReactPaginate
        previousLabel={""}
        nextLabel={""}
        pageCount={totalPage}
        activeClassName="active"
        forcePage={currentPage}
        onPageChange={({ selected }) => setCurrentPage(selected)}
        pageClassName={"page-item"}
        nextLinkClassName={"page-link"}
        nextClassName={"page-item next"}
        previousClassName={"page-item prev"}
        previousLinkClassName={"page-link"}
        pageLinkClassName={"page-link"}
        containerClassName={
          "pagination react-paginate justify-content-end my-2 pe-1"
        }
      />
    );
  };

  // ** Handler
  const handleRefresh = () => {
    setOption(defaultOption);
  };

  const handleUpdateStatusUser = async (userId, isDelete = true) => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.suspended"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then((result) => {
        if (result.isConfirmed) {
          return userApi.updateStatusUser({ userId, isDelete });
        }
      })
      .then((resp) => {
        if (resp) {
          const { data } = resp;

          if (data.isSuccess) {
            setData((prev) =>
              prev.map((user) =>
                user._id === userId ? { ...user, isDelete } : user
              )
            );
            toast.success(
              t("message.updateStatusUserSuccess", {
                email: data.data.user.email,
              })
            );
          } else {
            toast.error(data.message);
          }
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"));
      });
  };

  const handleFetchUsers = () => {
    setIsLoading(true);
    userApi
      .getUsersByAdmin({
        ...option,
        limit: option.limit.value,
        offset: currentPage,
        role: option.role?.value,
        status: option.status?.value,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData(data.data.users);
          setTotalPage(data.data.totalPage);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <Fragment>
      <Card>
        <UILoader blocking={isLoading} loader={<Spinner />}>
          <CardHeader>
            <CardTitle tag="h4">{t("title.filters")}</CardTitle>
          </CardHeader>
          <CardBody>
            <Row>
              <Col md="6">
                <Label for="role-select">{t("fieldName.role")}</Label>
                <Select
                  isClearable={false}
                  value={option.role}
                  options={getRoles(t)}
                  className="react-select role-select"
                  classNamePrefix="select"
                  theme={selectThemeColors}
                  onChange={(role) => setOption((prev) => ({ ...prev, role }))}
                />
              </Col>
              <Col md="6">
                <Label for="status-select">{t("fieldName.status")}</Label>
                <Select
                  theme={selectThemeColors}
                  isClearable={false}
                  className="react-select status-select"
                  classNamePrefix="select"
                  options={getStatus(t)}
                  value={option.status}
                  onChange={(status) =>
                    setOption((prev) => ({ ...prev, status }))
                  }
                />
              </Col>
            </Row>
          </CardBody>
        </UILoader>
      </Card>

      <Card className="overflow-hidden">
        <UILoader blocking={isLoading} loader={<Spinner />}>
          <div className="react-dataTable" style={{ minHeight: "300px" }}>
            <DataTable
              noHeader
              subHeader
              sortServer
              pagination
              responsive
              paginationServer
              columns={columns({ t, handleUpdateStatusUser })}
              // onSort={handleSort}
              sortIcon={<ChevronDown />}
              className="react-dataTable"
              paginationComponent={CustomPagination}
              data={data}
              subHeaderComponent={
                <CustomHeader
                  handleRefresh={handleRefresh}
                  option={option}
                  setOption={setOption}
                  setCurrentPage={setCurrentPage}
                  data={data}
                  t={t}
                />
              }
            />
          </div>
        </UILoader>
      </Card>
    </Fragment>
  );
};

export default Table;
