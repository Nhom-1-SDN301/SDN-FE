// ** React
import { Link } from "react-router-dom";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Utils
import { formatDateISOToDDMMYYY_HHMM } from "@src/utility/Utils";
import { Badge, Button, UncontrolledTooltip } from "reactstrap";
import { CheckSquare, XSquare } from "react-feather";

export const columns = ({
  t,
  navigate,
  setSelectedRowAccept,
  setSelectedRowReject,
}) => [
  {
    name: t("fieldName.studySet"),
    maxWidth: "150px",
    selector: (row) => row.studySet,
    cell: (row) => (
      <Link target="_blank" to={`/flash-card/${row.studySet._id}`}>
        {row.studySet.title}
      </Link>
    ),
  },
  {
    name: t("fieldName.reporter"),
    minWidth: "250px",
    selector: (row) => row.user,
    cell: (row) => (
      <div
        className="d-flex justify-content-left align-items-center"
        onClick={() => navigate(`/profile/${row.user._id}`)}
      >
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
          <Link
            // to={`/apps/user/view/${row.id}`}
            className="user_name text-truncate text-body"
            // onClick={() => store.dispatch(getUser(row.id))}
          >
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
    name: t("fieldName.createDate"),
    minWidth: "120px",
    selector: (row) => row.createdAt,
    cell: (row) => formatDateISOToDDMMYYY_HHMM(row.createdAt),
  },
  {
    name: t("fieldName.content"),
    maxWidth: "170px",
    minWidth: "170px",
    selector: (row) => row.description,
    cell: (row) => (
      <>
        <div
          style={{
            width: "100%",
            height: "fit-content",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
            textAlign: "center",
          }}
          id={`tooltip-${row._id}`}
        >
          {row.description}
        </div>
        <UncontrolledTooltip placement="top" target={`tooltip-${row._id}`}>
          {row.description}
        </UncontrolledTooltip>
      </>
    ),
  },
  {
    name: t("fieldName.type"),
    minWidth: 250,
    selector: (row) => row.types,
    cell: (row) => (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <div>
          {row.types.sort().map((type, index) => (
            <Badge
              key={index}
              style={{ marginRight: ".25rem" }}
              color="light-primary"
            >
              {type}
            </Badge>
          ))}
        </div>
      </div>
    ),
  },
  {
    name: t("fieldName.action"),
    minWidth: 250,
    cell: (row) => (
      <div className="d-flex justify-content-center" style={{ width: "100%" }}>
        <div style={{ display: "flex" }}>
          <Button
            outline
            color="success"
            style={{ padding: ".5rem", marginRight: "1rem" }}
            onClick={() => setSelectedRowAccept(row)}
          >
            <CheckSquare className="text-success" size={16} />
          </Button>
          <Button
            outline
            color="danger"
            style={{ padding: ".5rem" }}
            onClick={() => setSelectedRowReject(row)}
          >
            <XSquare className="text-danger" size={16} />
          </Button>
        </div>
      </div>
    ),
  },
];
