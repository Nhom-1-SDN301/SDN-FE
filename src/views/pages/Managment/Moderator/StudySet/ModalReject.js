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
  
  // ** I18n
  import { useTranslation } from "react-i18next";
  
  // ** Third libs
  import classNames from "classnames";
  import { Link } from "react-router-dom";
  import { studySetApi } from "../../../../../@core/api/quiz/studySetApi";
  import toast from "react-hot-toast";
  
  const ModalReject = ({ select, setSelect, setData }) => {
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
        status: 2,
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
  
    return (
      <Modal className="modal-dialog-centered modal-lg" isOpen={Boolean(select)}>
        <ModalHeader toggle={handleCloseModal}>
          {t("fieldName.rejectReport")}
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
  
  export default ModalReject;
  