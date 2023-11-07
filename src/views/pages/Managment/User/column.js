// ** Custom Components
import Avatar from "@components/avatar";

// ** Icons
import {
  Archive,
  Edit2,
  FileText,
  MoreVertical,
  Settings,
  Slack,
  User,
  UserMinus,
  UserX,
} from "react-feather";
import { BsGenderMale, BsGenderFemale } from "react-icons/bs";

// ** React
import { Link } from "react-router-dom";
import {
  Badge,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Utils
import { formatDateISOToDDMMYYY_HHMM } from "@src/utility/Utils";

const statusObj = {
  0: "light-danger",
  1: "light-success",
};

// ** Renders Role Columns
const renderRole = (row) => {
  const roleObj = {
    1: {
      class: "text-danger",
      icon: Slack,
    },
    2: {
      class: "text-warning",
      icon: Settings,
    },
    3: {
      class: "text-primary",
      icon: User,
    },
  };

  const Icon = roleObj[row.id] ? roleObj[row.id].icon : Edit2;

  return (
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`${roleObj[row.id] ? roleObj[row.id].class : ""} me-50`}
      />
      {row.name}
    </span>
  );
};

// ** Renders Gender Columns
export const renderGender = (gender, t) => {
  const genderObj = {
    0: {
      color: "#ba3ebc",
      icon: BsGenderFemale,
    },
    1: {
      color: "#2986cc",
      icon: BsGenderMale,
    },
  };

  const Icon = genderObj[gender] ? genderObj[gender].icon : Edit2;

  return (
    <div
      className="text-truncate text-capitalize align-middle d-flex"
      style={{ width: "100%", justifyContent: "center" }}
    >
      <Icon
        size={18}
        className={`me-50`}
        style={{ color: genderObj[gender]?.color }}
      />
      {gender === 0 ? t("fieldName.female") : t("fieldName.male")}
    </div>
  );
};

export const columns = ({ t, handleUpdateStatusUser }) => [
  {
    name: t("fieldName.user"),
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
    selector: (row) => row.fullName,
    cell: (row) => (
      <div className="d-flex justify-content-left align-items-center">
        <Avatar
          className="me-1"
          img={
            row.picture || "/src/assets/images/portrait/small/avatar-s-11.jpg"
          }
          width="32"
          height="32"
        />
        <div className="d-flex flex-column">
          <Link
            // to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
          // onClick={() => store.dispatch(getUser(row.id))}
          >
            <span className="fw-bolder">{row.fullName}</span>
          </Link>
          <small className="text-truncate text-muted mb-0">{row.email}</small>
        </div>
      </div>
    ),
  },
  {
    name: t("fieldName.role"),
    sortable: true,
    minWidth: "172px",
    sortField: "role",
    selector: (row) => row.role.id,
    cell: (row) => renderRole(row.role),
  },
  {
    name: t("fieldName.gender"),
    minWidth: "138px",
    sortable: true,
    sortField: "gender",
    selector: (row) => row.gender,
    cell: (row) => renderGender(row.gender, t),
  },
  {
    name: t("fieldName.createDate"),
    minWidth: "230px",
    sortable: true,
    sortField: "createdAt",
    selector: (row) => row.createdAt,
    cell: (row) => (
      <span className="text-capitalize">
        {formatDateISOToDDMMYYY_HHMM(row?.createdAt)}
      </span>
    ),
  },
  {
    name: "Status",
    minWidth: "138px",
    sortable: true,
    sortField: "status",
    selector: (row) => row?.status,
    cell: (row) => (
      <Badge
        className="text-capitalize"
        color={statusObj[row.isDelete ? 0 : 1]}
        pill
      >
        {row?.isDelete ? t("common.banned") : t("common.active")}
      </Badge>
    ),
  },
  {
    name: "Actions",
    minWidth: "100px",
    cell: (row) => (
      <div
        className="column-action"
      >
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
              <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            <DropdownItem
              tag={Link}
              className="w-100"
              to={`#`}
            //   onClick={() => store.dispatch(getUser(row.id))}
            >
              <FileText size={14} className="me-50" />
              <span className="align-middle">{t("common.detail")}</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => e.preventDefault()}
            >
              <Archive size={14} className="me-50" />
              <span className="align-middle">{t("common.edit")}</span>
            </DropdownItem>
            <DropdownItem
              tag="a"
              href="/"
              className="w-100"
              onClick={(e) => {
                e.preventDefault();
                if (row.isDelete) handleUpdateStatusUser(row._id, false);
                if (!row.isDelete) handleUpdateStatusUser(row._id, true);
              }}
            >
              {row.isDelete ? (
                <UserMinus size={14} className="me-50" />
              ) : (
                <UserX size={14} className="me-50" />
              )}
              <span className="align-middle">
                {row.isDelete ? t("common.unSuspended") : t("common.suspended")}
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
