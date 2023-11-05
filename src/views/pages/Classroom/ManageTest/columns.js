// ** React
import { Link } from "react-router-dom";

// ** Components
import Avatar from "@components/avatar";

// ** Utils
import { formatDateISOToDDMMYYY_HHMM } from "../../../../utility/Utils";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";
import { Edit, Edit3, FileText, MoreVertical, Trash } from "react-feather";

const styleTextOverflow = {
  textOverflow: "ellipsis",
  overflow: "hidden",
  whiteSpace: "nowrap",
};

const renderStatus = ({ color, label }) => <Badge color={color}>{label}</Badge>;

export const testColumn = ({ t, handleRemoveTest, setTestSelected }) => [
  {
    name: t("fieldName.creater"),
    sortable: true,
    minWidth: "250px",
    sortField: "user",
    selector: (row) => row.user.fullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <Avatar
          className="me-1"
          img={
            row.user.picture ||
            "/src/assets/images/portrait/small/avatar-s-11.jpg"
          }
          width="32"
          height="32"
        />
        <div className="d-flex flex-column">
          <Link className="user_name text-truncate text-body">
            <span className="fw-bolder">{row.user.fullName}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">
            {row.user.email}
          </small>
        </div>
      </div>
    ),
  },
  {
    name: t("fieldName.title"),
    sortable: true,
    minWidth: "200px",
    sortField: "title",
    selector: (row) => row.title,
    cell: (row) => (
      <div
        className="w-100 text-center"
        style={{
          ...styleTextOverflow,
        }}
      >
        {row.title}
      </div>
    ),
  },
  {
    name: t("fieldName.description"),
    sortable: true,
    minWidth: "200px",
    sortField: "description",
    selector: (row) => row.description,
    cell: (row) => (
      <div
        className="w-100 text-center"
        style={{
          ...styleTextOverflow,
        }}
      >
        {row.description}
      </div>
    ),
  },
  {
    name: t("fieldName.subject"),
    sortable: true,
    minWidth: "200px",
    sortField: "subject",
    selector: (row) => row.subject,
    cell: (row) => (
      <div
        className="w-100 text-center"
        style={{
          ...styleTextOverflow,
          fontWeight: 700,
        }}
      >
        <Badge color="light-primary">{row.subject}</Badge>
      </div>
    ),
  },
  {
    name: t("fieldName.questions"),
    sortable: true,
    sortField: "numberOfQuestion",
    selector: (row) => row.numberOfQuestion,
    cell: (row) => (
      <div
        className="w-100 text-center"
        style={{
          ...styleTextOverflow,
        }}
      >
        {row.numberOfQuestion}
      </div>
    ),
  },
  {
    name: t("fieldName.isActive"),
    sortable: true,
    sortField: "isActive",
    selector: (row) => row.isActive,
    cell: (row) => {
      const active = {
        0: {
          color: "light-danger",
          label: t("common.disabled"),
        },
        1: {
          color: "light-success",
          label: t("common.active"),
        },
      };

      const status = row.isActive ? 1 : 0;

      return (
        <div
          className="w-100 text-center"
          style={{
            ...styleTextOverflow,
          }}
        >
          {renderStatus({
            color: active[status].color,
            label: active[status].label,
          })}
        </div>
      );
    },
  },
  {
    name: t("fieldName.endAt"),
    sortable: true,
    sortField: "endAt",
    minWidth: "160px",
    selector: (row) => row.endAt,
    cell: (row) => (
      <div
        className="w-100 text-center"
        style={{
          ...styleTextOverflow,
        }}
      >
        {formatDateISOToDDMMYYY_HHMM(new Date(row.endAt).toISOString())}
      </div>
    ),
  },
  {
    name: t("fieldName.actions"),
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              className="w-100"
              onClick={() => setTestSelected(row)}
            >
              <Edit3 size={14} className="me-50" />
              <span className="align-middle">{t("common.edit")}</span>
            </DropdownItem>
            <DropdownItem
              className="w-100"
              onClick={() =>
                handleRemoveTest({ testId: row._id, classId: row.classId })
              }
            >
              <Trash size={14} className="me-50" />
              <span className="align-middle">{t("common.remove")}</span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
