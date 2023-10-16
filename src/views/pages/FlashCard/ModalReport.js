// ** Reactstrap
import { useTranslation } from "react-i18next";

// ** I18n
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

// ** Consstants
import { STUDYSET_REPORT_TYPES } from "../../../@core/constants/report";

// ** Icons
import { AlertTriangle } from "react-feather";

// ** Third libs
import classNames from "classnames";
import toast from "react-hot-toast";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz";
import { Link } from "react-router-dom";

const ModalReport = ({ open, setOpen, studySetId }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [types, setTypes] = useState([]);
  const [description, setDescription] = useState("");

  // ** Handler
  const handleToggleModal = () => {
    setOpen(false);
  };

  const handleSubmitReportStudySet = () => {
    if (types.length === 0)
      return toast.error(t("message.requiredOptionReportStudySet"));

    studySetApi
      .createReportStudySet({
        studySetId,
        description,
        types,
      })
      .then(({ data }) => {
        if (data.isSuccess && data.statusCode === 200) {
          setDescription("");
          setTypes([]);
          setOpen(false);

          toast.success(() => (
            <span>
              {t("message.reportStudySetSuccess")}
              <Link style={{ marginLeft: ".5rem" }} to={"/history"}>
                {t("common.history")}
              </Link>
            </span>
          ));
        } else if (data.statusCode === 405) {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={open}>
      <ModalHeader toggle={handleToggleModal}>
        <AlertTriangle size={16} className="text-warning" />
        <span style={{ marginLeft: ".5rem" }}>{t("title.reportStudySet")}</span>
      </ModalHeader>
      <ModalBody>
        <div style={{ marginBottom: "2rem" }}>
          <div style={{ marginBottom: "2rem", fontWeight: 600 }}>
            {t("title.whyReportStudySet")}
          </div>
          {STUDYSET_REPORT_TYPES(t).map((type, index) => (
            <div
              style={{ marginTop: index !== 0 ? "1.5rem" : ".75rem" }}
              className="form-check"
              key={type.value}
            >
              <Input
                type="checkbox"
                id={`${type.value}`}
                checked={types.includes(type.value)}
                onChange={(e) => {
                  if (e.target.checked)
                    setTypes((prev) => [...prev, type.value]);
                  else setTypes((prev) => prev.filter((t) => t !== type.value));
                }}
              />
              <Label for={`${type.value}`} className="form-check-label">
                {type.label}
              </Label>
            </div>
          ))}
        </div>
        <div className="mb-1">
          <Label className="form-label" for="basicInput">
            {t("common.tellUsMore")}
          </Label>
          <Input
            type="textarea"
            name="text"
            id="exampleText"
            rows="3"
            placeholder={t("common.placeholder.reportStudySet")}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple
          color="secondary"
          onClick={handleToggleModal}
          disabled={loading}
        >
          {t("fieldName.cancel")}
        </Button.Ripple>
        <Button.Ripple
          color="primary"
          type="submit"
          disabled={loading}
          onClick={handleSubmitReportStudySet}
        >
          {loading && <Spinner size="sm" />}
          <span className={classNames({ "ms-50": loading })}>
            {t("fieldName.submit")}
          </span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalReport;
