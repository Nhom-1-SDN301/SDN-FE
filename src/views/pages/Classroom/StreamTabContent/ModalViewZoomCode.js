// ** Reactstrap
import { Modal, ModalBody, ModalHeader } from "reactstrap";

const ModalViewZoomCode = ({ open, setOpen, code }) => {
  // **Handler
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Modal centered isOpen={open}>
      <ModalHeader toggle={handleClose}></ModalHeader>
      <ModalBody>
        <div
          className="d-flex justify-content-center"
          style={{ margin: "3rem 0" }}
        >
          <h1 style={{ fontSize: "6rem", fontWeight: 700 }}>{code}</h1>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default ModalViewZoomCode;
