// ** Reactstrap
import {
  Button,
  Form,
  FormFeedback,
  Input,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Third libs
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

// ** Components
import SingleUpload from "../../ui-elements/fileUpload/SingleUpload";

// ** Apis
import { termApi } from "../../../@core/api/quiz";
import classNames from "classnames";

const ModalUpdateTerm = ({ term, setTerm, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [file, setFile] = useState(null);
  const [currentImage, setCurrentImage] = useState(term?.picture);
  const [loading, setLoading] = useState(false);

  // ** Schema
  const Schema = yup.object().shape({
    term: yup.string().required(),
    definition: yup.string().required(),
  });

  // ** Form
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema),
  });

  // ** Handler
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("id", term._id);
    formData.append("name", data.term);
    formData.append("definition", data.definition);

    if (!file && currentImage) {
      // Not update
      formData.append("currentPicture", term.picture);
    } else if (file && !currentImage) {
      // update image
      formData.append("picture", file);
    } else {
      //delete image
    }

    setLoading(true);
    termApi
      .updateTerm(formData)
      .then((resp) => {
        if (resp.data.isSuccess) {
          setData((prev) => {
            const newTerm = resp.data.data.term;
            return prev.map((t) => (t._id === newTerm._id ? newTerm : t));
          });
          toast.success(
            `${t("message.updateSuccess", { value: t("fieldName.term") })}`
          );
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
        setTerm(null);
      });
  };

  const handleCancel = () => {
    setTerm(null);
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={Boolean(term)}>
      <ModalHeader toggle={handleCancel}>{t("fieldName.edit")}</ModalHeader>
      <Form
        className="auth-register-form mt-2"
        onSubmit={handleSubmit(onSubmit)}
      >
        <ModalBody>
          <div className="mb-1">
            <Controller
              id="term"
              name="term"
              defaultValue={term?.name}
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="term"
                  rows={3}
                  placeholder="Quả táo"
                  invalid={errors.term && true}
                  {...field}
                />
              )}
            />
            {errors.term && (
              <FormFeedback style={{ color: "#ea5455" }}>
                {errors.term.message}
              </FormFeedback>
            )}
          </div>
          <div className="mb-1">
            <Controller
              id="definition"
              name="definition"
              control={control}
              defaultValue={term?.definition}
              render={({ field }) => (
                <Input
                  type="textarea"
                  id="definition"
                  rows={3}
                  placeholder="Apple"
                  invalid={errors.definition && true}
                  {...field}
                />
              )}
            />
            {errors.definition && (
              <FormFeedback style={{ color: "#ea5455" }}>
                {errors.definition.message}
              </FormFeedback>
            )}
          </div>
          <div className="mb-1">
            <SingleUpload
              style={{ minHeight: 240 }}
              file={file}
              setFile={setFile}
              image={currentImage}
              setImage={setCurrentImage}
            />
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple
            color="secondary"
            onClick={handleCancel}
            disabled={loading}
          >
            {t("fieldName.cancel")}
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit" disabled={loading}>
            {loading && <Spinner color="white" size="sm" />}
            <span className={classNames({ "ms-50": loading })}>
              {t("fieldName.save")}
            </span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalUpdateTerm;
