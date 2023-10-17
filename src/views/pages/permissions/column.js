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
const renderGender = (gender, t) => {
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
    <span className="text-truncate text-capitalize align-middle">
      <Icon
        size={18}
        className={`me-50`}
        style={{ color: genderObj[gender]?.color }}
      />
      {gender === 0 ? t("fieldName.female") : t("fieldName.male")}
    </span>
  );
};

export const columns = ({ t }) => [
  {
    name: t(" fieldName.user"),
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
    name: "Actions",
    minWidth: "100px",
    cell: (row) => (
      <div className="column-action">
        <Link to={`#`}>
          <FileText size={14} className="me-50" />
          <span className="align-middle">{t("common.detail")}</span>
        </Link>
        <Link to={`/`} onClick={(e) => e.preventDefault()}>
          <Archive size={14} className="me-50" />
          <span className="align-middle">{t("common.edit")}</span>
        </Link>
      </div>
    ),
  },

];
