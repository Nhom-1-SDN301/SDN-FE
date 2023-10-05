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

// ** Hooks
import { useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Third libs
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Select from "react-select";
import classNames from "classnames";
import { toast } from "react-hot-toast";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz";

const ModalCreateStudySet = ({ open, setOpen, handleFetch }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // ** Options visit
  const visitOptions = [
    { value: 1, label: t("common.everyone") },
    { value: 2, label: t("common.userWithPassword") },
    { value: 3, label: t("common.justMe") },
  ];

  // ** Schema
  const Schema = yup.object().shape({
    title: yup
      .string()
      .required(
        t("validationMessage.required", { field: t("fieldName.title") })
      ),
    description: yup.string().nullable(),
    canVisit: yup.number().oneOf([1, 2, 3]),
    visitPassword: yup.string(),
  });

  // ** Form
  const {
    control,
    handleSubmit,
    formState: { errors },
    getFieldState,
    getValues,
    setValue,
    watch,
    setError,
    clearErrors,
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Schema),
    defaultValues: {
      title: "",
      description: "",
      canVisit: visitOptions[0].value,
      visitPassword: "",
    },
  });

  // ** Handler
  const onSubmit = (data) => {
    let isError = false;
    if (data.visitPassword.trim() === "" && data.canVisit === 2) {
      setError("visitPassword", {
        type: "custom",
        message: t("validationMessage.required", {
          value: t("fieldName.visitPassword"),
        }),
      });
      isError = true;
    }

    if (data.title.trim() === "") {
      setError("title", {
        type: "custom",
        message: t("validationMessage.required", {
          field: t("fieldName.title"),
        }),
      });
      isError = true;
    }
    if (isError) return;

    const body = {
      ...data,
    };

    if (body.canVisit === 1 || body.canVisit === 3 || body.visitPassword === "")
      body.visitPassword = null;
    if (
      (typeof body.description === "string" ||
        body.description instanceof String) &&
      body.description.trim() === ""
    )
      body.description = null;

    setLoading(true);
    studySetApi
      .createStudySet({
        title: data.title.trim(),
        description: data.description,
        canVisit: data.canVisit,
        visitPassword: data.visitPassword,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setValue("title", "");
          setValue("description", "");
          setValue("canVisit", 1);
          setValue("visitPassword", "");
          setOpen(false);
          toast.success(
            t("message.createSuccess", { value: t("fieldName.studySet") })
          );
          handleFetch(5, 0, "");
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={open}>
      <ModalHeader toggle={() => setOpen(false)}>
        {t("title.createStudySet")}
      </ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="mb-1">
            <Label
              className="form-label"
              for="title"
              style={{ color: errors.title && "#ea5455" }}
            >
              {t("fieldName.title")}
              <span style={{ color: "red", marginLeft: ".25rem" }}>*</span>
            </Label>
            <Controller
              id="title"
              name="title"
              defaultValue={""}
              control={control}
              render={({ field }) => (
                <Input
                  id="title"
                  placeholder={t("common.placeholder.createStudySetTitle")}
                  invalid={errors.title && true}
                  {...field}
                />
              )}
            />
            {errors.title && (
              <FormFeedback style={{ color: "#ea5455" }}>
                {errors.title.message}
              </FormFeedback>
            )}
          </div>
          <div className="mb-1">
            <Label className="form-label" for="description">
              {t("fieldName.description")}
            </Label>
            <Controller
              id="description"
              name="description"
              defaultValue={""}
              control={control}
              render={({ field }) => (
                <Input
                  id="description"
                  placeholder={t(
                    "common.placeholder.createStudySetDescription"
                  )}
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
          <div className="mb-1">
            <Label className="form-label" for="canVisit">
              {t("message.whoCanSeeStudySet")}
              <span style={{ color: "red", marginLeft: ".25rem" }}>*</span>
            </Label>
            <Controller
              id="canVisit"
              name="canVisit"
              defaultValue={""}
              control={control}
              render={({ field }) => {
                return (
                  <Select
                    theme={selectThemeColors}
                    className="react-select"
                    classNamePrefix="select"
                    value={visitOptions.find(
                      (vo) => vo.value === getValues().canVisit
                    )}
                    options={visitOptions}
                    isClearable={false}
                    onChange={(e) => setValue("canVisit", e.value)}
                  />
                );
              }}
            />
          </div>
          {watch("canVisit") === 2 && (
            <div className="mb-1">
              <Label
                className="form-label"
                for="visitPassword"
                style={{ color: errors.visitPassword && "#ea5455" }}
              >
                {t("fieldName.visitPassword")}
                <span style={{ color: "red", marginLeft: ".25rem" }}>*</span>
              </Label>
              <Controller
                id="visitPassword"
                name="visitPassword"
                defaultValue={""}
                control={control}
                render={({ field }) => {
                  return (
                    <Input
                      id="visitPassword"
                      type="password"
                      placeholder="******"
                      invalid={errors.visitPassword && true}
                      {...field}
                      onChange={(e) => {
                        const value = e.target.value.trim();
                        setValue("visitPassword", value);

                        if (value.length === 0) {
                          setError("visitPassword", {
                            type: "custom",
                            message: t("validationMessage.required", {
                              value: t("fieldName.visitPassword"),
                            }),
                          });
                        } else if (value.length <= 20) {
                          clearErrors("visitPassword");
                        } else {
                          setError("visitPassword", {
                            type: "custom",
                            message: t("validationMessage.maxLength", {
                              field: t("fieldName.visitPassword"),
                              value: 20,
                            }),
                          });
                        }
                      }}
                    />
                  );
                }}
              />
              {errors.visitPassword && (
                <FormFeedback style={{ color: "#ea5455" }}>
                  {errors.visitPassword.message}
                </FormFeedback>
              )}
            </div>
          )}
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
              {t("fieldName.submit")}
            </span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalCreateStudySet;
