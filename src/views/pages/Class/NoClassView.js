// ** Reactstrap
import { Button } from "reactstrap";

// ** React
import { useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";
import ModalCreateClass from "./ModalCreateClass";
import ModalJoinClass from "./ModalJoinClass";

const NoClassView = ({ setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [isOpenModalCreate, setIsOpenModalCreate] = useState(false);
  const [isOpenModalJoin, setIsOpenModalJoin] = useState(false);

  return (
    <div
      style={{ marginTop: "20vh", display: "flex", justifyContent: "center" }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src="https://www.gstatic.com/classroom/empty_states_home.svg" />
        </div>
        <div>
          <p style={{ textAlign: "center" }}>{t("message.addClassToStart")}</p>
          <div>
            <Button
              color="flat-primary"
              style={{ marginRight: ".5rem" }}
              onClick={() => setIsOpenModalCreate(true)}
            >
              {t("fieldName.createClass")}
            </Button>
            <Button
              color="primary"
              style={{ marginLeft: ".5rem" }}
              onClick={() => setIsOpenModalJoin(true)}
            >
              {t("fieldName.joinClass")}
            </Button>
          </div>
        </div>
      </div>

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
    </div>
  );
};

export default NoClassView;
