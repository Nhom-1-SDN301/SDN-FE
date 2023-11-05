// ** Reactstrap
import {
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
  Button,
} from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";

// ** React
import { useState } from "react";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";
import toast from "react-hot-toast";

const ModalTurnOffCode = ({ open, setOpen, setKlass, klass }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // ** Handler
  const handleClose = () => {
    setOpen(false);
  };

  const handleTurnOff = () => {
    setLoading(true);
    classApi
      .turnOffInviteCode({ classId: klass?._id })
      .then(({ data }) => {
        if (data.isSuccess) {
          setKlass(data.data.class);
          toast.success(t("message.turnOffInviteCodeSuccess"));
        } else {
          toast.error(data.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.error(err.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
      });
  };

  return (
    <Modal centered isOpen={open}>
      <ModalHeader toggle={handleClose}>
        {t("title.turnOffInviteCode")}
      </ModalHeader>
      <ModalBody>
        <span>{t("message.turnOffInviteCode")}</span>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple color="secondary" onClick={handleClose}>
          {t("fieldName.cancel")}
        </Button.Ripple>
        <Button.Ripple
          className="d-flex align-items-center"
          color="primary"
          onClick={handleTurnOff}
          disabled={loading}
        >
          {loading && (
            <Spinner
              style={{ width: 14, height: 14 }}
              type="grow"
              color="dark"
            />
          )}
          <span style={{ marginLeft: ".5rem" }}>{t("fieldName.confirm")}</span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalTurnOffCode;
