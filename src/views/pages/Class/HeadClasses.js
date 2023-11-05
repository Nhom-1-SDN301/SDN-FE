// ** React
import { useState } from "react";

// ** Third libs
import Select from "react-select";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Reactstrap
import {
  Button,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Label,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

// ** Icons
import { Plus } from "react-feather";
import ModalCreateClass from "./ModalCreateClass";
import ModalJoinClass from "./ModalJoinClass";

const options = (t) => [
  {
    value: "teaching",
    label: t("fieldName.teaching"),
  },
  {
    value: "enrolled",
    label: t("fieldName.enrolled"),
  },
];

const HeadClasses = ({ setData, filter, setFilter }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalJoin, setIsOpenModalJoin] = useState(false);

  // ** Handler
  const handleCreateClass = (e) => {
    e.preventDefault();

    setIsOpenModalCreate(true);
  };

  const handleJoinClass = (e) => {
    e.preventDefault();

    setIsOpenModalJoin(true);
  };

  return (
    <Row>
      <Col md="4">
        <Select
          className="react-select"
          classNamePrefix="select"
          options={options(t)}
          value={filter}
          onChange={(e) => setFilter(e)}
          isClearable
        />
      </Col>
      <Col md="8">
        <UncontrolledDropdown direction="down">
          <DropdownToggle
            color="primary"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Plus size={16} />
            <span style={{ marginLeft: ".5rem" }}>{t("fieldName.add")}</span>
          </DropdownToggle>
          <DropdownMenu end>
            <DropdownItem
              href="#"
              tag="a"
              style={{ width: 200, display: "flex", alignItems: "center" }}
              onClick={handleJoinClass}
            >
              <span style={{ marginLeft: ".5rem" }}>
                {t("fieldName.joinClass")}
              </span>
            </DropdownItem>
            <DropdownItem
              href="/"
              tag="a"
              style={{ width: 200, display: "flex", alignItems: "center" }}
              onClick={handleCreateClass}
            >
              <span style={{ marginLeft: ".5rem" }}>
                {t("fieldName.createClass")}
              </span>
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Col>

      {/* Modal */}
      <ModalCreateClass
        open={isOpenModalCreate}
        setOpen={setIsOpenModalCreate}
        setData={setData}
      />

      <ModalJoinClass
        open={isOpenModalJoin}
        setOpen={setIsOpenModalJoin}
        setData={setData}
      />
    </Row>
  );
};

export default HeadClasses;
