// ** Reactstrap
import {
  Button,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

// ** React
import { useState } from "react";
import { Link } from "react-router-dom";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Third libs
import classNames from "classnames";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Apis
import { studySetApi } from "../../../../../@core/api/quiz/studySetApi";

const MySwal = withReactContent(Swal);

const ModalAccept = ({ select, setSelect, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState("");

  // ** Handler
  const handleCloseModal = () => {
    setSelect(null);
  };

  const handleSubmitReport = () => {
    const data = {
      id: select._id,
      status: 1,
    };

    if (content.trim() !== "") data["comment"] = content.trim();

    setLoading(true);
    studySetApi
      .updateReport(data)
      .then(({ data }) => {
        if (data.isSuccess) {
          setData((prev) => prev.filter((rp) => rp._id !== select._id));
        }
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setLoading(false);
        setSelect(null);
        setContent("");
      });
  };

  const handleSoftDelete = () => {
    MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.softDeleteMessageText", {
        value: t("fieldName.studySet"),
      }),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("common.suspended"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          return studySetApi.deleteStudySet({
            studySetId: select.studySet._id,
          });
        }
      })
      .then((resp) => {
        if (!resp) return;

        if (resp.data.isSuccess) {
          toast.success(
            t("message.deleteSuccess", { value: t("fieldName.studySet") })
          );
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      });
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={Boolean(select)}>
      <ModalHeader toggle={handleCloseModal}>
        {t("fieldName.acceptReport")}
      </ModalHeader>
      <ModalBody>
        <div>
          <Label className="form-label" for={`comment`}>
            {t("fieldName.comment")}
          </Label>
          <Input
            type="textarea"
            id="comment"
            placeholder={t("common.placeholder.enterComment")}
            spellCheck={false}
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <div className="mt-2 mb-1 d-flex align-items-center justify-content-between">
          <div>
            <Label className="form-label" style={{ margin: 0 }}>
              {`${t("common.studySetLinkReport")}:`}
            </Label>
            <Link
              target="_blank"
              to={`/flash-card/${select?.studySet?._id}`}
              style={{ textDecoration: "underline", marginLeft: ".5rem" }}
            >
              click
            </Link>
          </div>
          <Button outline color="danger" onClick={handleSoftDelete}>
            {t("fieldName.temporaryDeletion")}
          </Button>
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
          onClick={handleSubmitReport}
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

export default ModalAccept;
