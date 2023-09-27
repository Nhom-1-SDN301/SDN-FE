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
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { useRef, useState } from "react";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz";

const ModalInputPassword = ({
  open,
  setOpen,
  setCanAccess,
  setPasswordStudySet,
}) => {
  // ** Hooks
  const [isLoading, setIsLoading] = useState(false);
  const { studySetId } = useParams();
  const inputRef = useRef();

  // ** Handler
  const handleCheckPassword = async () => {
    setIsLoading(true);
    const { data } = await studySetApi.checkPassword({
      studySetId,
      password: inputRef.current?.value,
    });

    if (data.isSuccess) {
      setOpen(false);
      setCanAccess(true);
      setPasswordStudySet(inputRef.current?.value);
    } else {
      toast.error("Invalid password", {
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
