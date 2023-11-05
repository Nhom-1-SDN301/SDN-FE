// ** Reactstrap
import classNames from "classnames";

// ** React
import { useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Reactstrap
import {
  Button,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

// ** Apis
import { classApi } from "../../../@core/api/quiz";
import toast from "react-hot-toast";

const ModalJoinClass = ({ open, setOpen, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [code, setCode] = useState({
    error: "",
    value: "",
  });

  // ** Handler
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleJoinClass = () => {
    if (code.value.trim() === "")
      return setCode((prev) => ({
        ...prev,
        error: t("validationMessage.required", { field: "Code" }),
      }));

    setLoading(true);
    classApi
      .joinClassWithCode({ code: code.value.trim() })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData((prev) => {
            const newData = [...prev];
            newData.unshift(data.data.class);

            return newData;
          });
          setOpen(false);
          setCode({
            error: "",
            value: "",
          });

          toast.success(t("message.joinClassSuccess"));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unkow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal className="modal-dialog-centered" isOpen={open}>
      <ModalHeader toggle={handleCloseModal}>
        {t("title.joinClass")}
      </ModalHeader>
      <ModalBody>
        <div>
          <Label className={classNames("form-label")} for="code">
            {t("fieldName.classCode")}
          </Label>
          <Input
            id="code"
            value={code.value}
            invalid={code.error}
            spellCheck={false}
            onChange={(e) => {
              const value = e.target.value.trim().toLocaleUpperCase();
              if (value)
                setCode({
                  error: "",
                  value,
                });
              else {
                setCode({
                  error: t("validationMessage.required", { field: "Code" }),
                  value,
                });
              }
            }}
            placeholder={t("message.messageClassCodeJoin")}
          />
          {code.error && (
            <FormFeedback style={{ color: "#ea5455" }}>
              {code.error}
            </FormFeedback>
          )}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple
          color="secondary"
          onClick={handleCloseModal}
          disabled={loading}
        >
          {t("fieldName.cancel")}
        </Button.Ripple>
        <Button.Ripple
          color="primary"
          type="submit"
          disabled={loading}
          onClick={handleJoinClass}
        >
          {loading && <Spinner color="white" size="sm" />}
          <span className={classNames({ "ms-50": loading })}>
            {t("fieldName.submit")}
          </span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalJoinClass;
