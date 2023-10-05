// ** Reactstrap
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

// ** React
import toast from "react-hot-toast";

// ** Apis
import { termApi } from "../../../@core/api/quiz";

// ** Hooks
import { useParams } from "react-router-dom";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";

// ** Icons
import { Info } from "react-feather";

const ModalInputPassword = ({ open, setOpen, setCanAccess, setData }) => {
  // ** Hooks
  const [isLoading, setIsLoading] = useState(false);
  const { studySetId } = useParams();
  const { t } = useTranslation();
  const inputRef = useRef();

  // ** Handler
  const handleCheckPassword = async () => {
    setIsLoading(true);
    const { data } = await termApi.getTerms({
      studySetId,
      password: inputRef.current.value,
    });

    if (data.isSuccess) {
      setOpen(false);
      setCanAccess(true);
      if (data.data?.terms?.length === 0)
        toast(() => (
          <div className="d-flex align-items-center">
            <Info style={{ color: "orange" }} size={20} />
            <span style={{ marginLeft: ".5rem" }}>
              {t("message.empty", { value: t("fieldName.studySet") })}
            </span>
          </div>
        ));
      else setData(data.data.terms);
    } else {
      toast.error(t("message.invalid", { value: t("fieldName.password") }), {
        duration: 1000,
      });
    }
    setIsLoading(false);
  };

  return (
    <Modal isOpen={open}>
      <ModalHeader>Password</ModalHeader>
      <ModalBody>
        <div className="mb-1">
          <Input
            autoFocus
            innerRef={inputRef}
            type="password"
            placeholder="password"
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple color="secondary" onClick={() => history.back()}>
          Back
        </Button.Ripple>
        <Button.Ripple
          className="d-flex align-items-center"
          color="primary"
          onClick={handleCheckPassword}
          disabled={isLoading}
        >
          {isLoading && (
            <Spinner
              style={{ width: 14, height: 14 }}
              type="grow"
              color="dark"
            />
          )}
          <span style={{ marginLeft: ".5rem" }}>Confirm</span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalInputPassword;
