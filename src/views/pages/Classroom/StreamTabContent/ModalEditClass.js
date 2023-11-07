// ** Reactstrap
import {
  Button,
  Form,
  FormFeedback,
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
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-hot-toast";

// ** Icons
import { Upload } from "react-feather";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";

const ModalEditClass = ({ open, setOpen, klass, setKlass }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [picture, setPicture] = useState(null);

  const Schema = yup.object().shape({
    name: yup
      .string()
      .required(
        t("validationMessage.required", { field: t("fieldName.className") })
      ),
    description: yup.string(),
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues: {
      name: klass?.name,
      description: klass?.description,
    },
  });

  // ** Handler
  const handleClose = () => {
    setOpen(false);
    setPicture(null);
    reset();
  };

  const handleEditClass = (data) => {
    const body = new FormData();

    body.append("name", data.name);
    if (data.description.trim() !== "")
      body.append("description", data.description.trim());
    if (picture) body.append("picture", picture);

    setLoading(true);
    classApi
      .updateClass({
        id: klass._id,
        data: body,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setKlass(data.data.class);
          reset();
          setPicture(null);
          setOpen(false);
          toast.success(
            t("message.updateSuccess", { value: t("fieldName.class") })
          );
        } else {
          toast.error(data.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={open}>
      <Form onSubmit={handleSubmit(handleEditClass)}>
        <ModalHeader toggle={handleClose}>
          {t("title.customiseAppearance")}
        </ModalHeader>
        <ModalBody>
          <div>
            <Label
              className={classNames("form-label", {
                "text-danger": errors.name,
              })}
              for="name"
            >
              {t("fieldName.className")} <span className="text-danger">*</span>
            </Label>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input id="name" invalid={errors.name && true} {...field} />
              )}
            />
            {errors.name && (
              <FormFeedback style={{ color: "#ea5455" }}>
                {errors.name.message}
              </FormFeedback>
            )}
          </div>
          <div className="mt-50">
            <Label
              className={classNames("form-label", {
                "text-danger": errors.description,
              })}
              for="name"
            >
              {t("fieldName.description")}
            </Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input
                  type="textarea"
                  rows={3}
                  id="description"
                  invalid={errors.description && true}
                  {...field}
                />
              )}
            />
            {errors.description && (
              <FormFeedback style={{ color: "#ea5455" }}>
                {errors.description.message}
              </FormFeedback>
            )}
          </div>
          <div className="mt-50">
            <Label className={classNames("form-label")}>
              {t("fieldName.picture")}
            </Label>
            <div>
              <div>
                <Button
                  color="primary d-flex align-items-center"
                  style={{ width: "fit-content" }}
                  tag={"label"}
                >
                  <Upload size={18} style={{ marginRight: ".5rem" }} />
                  <span>{t("common.upload")}</span>
                  <Input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file.size > 1000000)
                        return toast.error(
                          t("message.imageLessThanOrEqual", { value: 1 })
                        );

                      setPicture(file);
                    }}
                  />
                </Button>
              </div>
              {picture && (
                <div style={{ margin: "1rem 0" }}>
                  <img
                    style={{
                      borderRadius: "inherit",
                      objectFit: "cover",
                      width: "100%",
                      minHeight: 200,
                      maxHeight: 320,
                      overflow: "hidden",
                    }}
                    src={URL.createObjectURL(picture)}
                  />
                </div>
              )}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple color="secondary" onClick={handleClose}>
            {t("fieldName.cancel")}
          </Button.Ripple>
          <Button.Ripple
            className="d-flex align-items-center"
            color="primary"
            disabled={loading}
            type="submit"
          >
            {loading && (
              <Spinner
                style={{ width: 14, height: 14, marginRight: ".5rem" }}
                type="grow"
                color="dark"
              />
            )}
            <span>{t("fieldName.save")}</span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalEditClass;
