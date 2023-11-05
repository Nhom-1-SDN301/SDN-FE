// ** Custom Components
import Avatar from "@components/avatar";
import { renderGender } from "../../Managment/User/column";

// ** React
import { Link } from "react-router-dom";

// ** Reactstrap
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** Icons
import { FileText, Mail, MoreVertical } from "react-feather";

export const classmatesColumns = ({ t, setSelectedMember, user, klass }) => [
  {
    name: t("fieldName.user"),
    sortable: true,
    minWidth: "300px",
    sortField: "fullName",
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
    name: t("fieldName.gender"),
    minWidth: "138px",
    sortable: true,
    sortField: "gender",
    selector: (row) => row.user.gender,
    cell: (row) => renderGender(row.user.gender, t),
  },
  {
    name: t("fieldName.email"),
    sortable: true,
    minWidth: "300px",
    sortField: "email",
    selector: (row) => row.user.email,
    cell: (row) => row.user.email,
  },
  {
    name: "Actions",
    minWidth: "160px",
    maxWidth: "160px",
    cell: (row) => (
      <div className="column-action">
        <UncontrolledDropdown>
          <DropdownToggle tag="div" className="btn btn-sm">
            <MoreVertical size={14} className="cursor-pointer" />
          </DropdownToggle>
          <DropdownMenu>
            {klass?.userId === user._id ? (
              <DropdownItem
                className="w-100"
                onClick={() => setSelectedMember(row)}
              >
                <FileText size={14} className="me-50" />
                <span className="align-middle">{t("common.detail")}</span>
              </DropdownItem>
            ) : (
              <DropdownItem
                className="w-100"
              >
                <Mail size={14} className="me-50" />
                <span className="align-middle">{t("common.sendEmail")}</span>
              </DropdownItem>
            )}
          </DropdownMenu>
        </UncontrolledDropdown>
      </div>
    ),
  },
];
