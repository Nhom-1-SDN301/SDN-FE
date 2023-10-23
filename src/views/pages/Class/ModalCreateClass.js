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

// ** Apis
import { classApi } from "../../../@core/api/quiz";

const ModalCreateClass = ({ open, setOpen, setData }) => {
  // ** Hooks
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

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
      name: "",
      description: "",
    },
  });

  // ** Handler
  const handleCloseModal = () => {
    setOpen(false);
  };

  const handleCreateClass = (data) => {
    setLoading(true);
    classApi
      .createClass(data)
      .then(({ data }) => {
        if (data.isSuccess) {
          setData((prev) => {
            const newData = [...prev];
            newData.unshift(data.data.class);
            return newData;
          });
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
        setOpen(false);
        reset();
      });
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={open}>
      <Form onSubmit={handleSubmit(handleCreateClass)}>
        <ModalHeader toggle={handleCloseModal}>
          {t("fieldName.createClass")}
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
              {t("fieldName.className")}
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
        </ModalBody>
        <ModalFooter>
          <Button.Ripple
            color="secondary"
            onClick={handleCloseModal}
            disabled={loading}
          >
            {t("fieldName.cancel")}
          </Button.Ripple>
          <Button.Ripple color="primary" type="submit" disabled={loading}>
            {loading && <Spinner color="white" size="sm" />}
            <span className={classNames({ "ms-50": loading })}>
              {t("fieldName.submit")}
            </span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalCreateClass;
