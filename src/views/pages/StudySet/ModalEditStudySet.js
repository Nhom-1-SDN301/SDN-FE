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
import { useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Components
import InputPasswordToggle from "@components/input-password-toggle";
import Select from "react-select";

// ** Third libs
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { toast } from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Styles
import "animate.css/animate.css";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz";
import { Trash } from "react-feather";

const MySwal = withReactContent(Swal);

const ModalEditStudySet = ({
  studySet,
  setStudySet,
  setData,
  handleFetch,
  dataFetch,
}) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [loadingDelete, setLoadingDelete] = useState(false);

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
      title: studySet?.title,
      description: studySet?.description || "",
      canVisit: studySet?.canVisit,
      visitPassword: studySet?.visitPassword || "",
    },
  });

  // ** Handler
  const onSubmit = (data) => {
    let isError = false;
    if (data.visitPassword.trim() === "" && data.canVisit === 2) {
      setError("visitPassword", {
        type: "custom",
        message: "Visit password is required",
      });
      isError = true;
    }

    if (isError) return;

    const body = {
      id: studySet._id,
      title: data.title.trim(),
      description:
        data.description.trim() === "" ? null : data.description.trim(),
      canVisit: data.canVisit,
      visitPassword:
        data.canVisit === 1 || data.canVisit === 3
          ? null
          : data.visitPassword.trim(),
    };

    setLoading(true);
    studySetApi
      .updateSudySet(body)
      .then(({ data }) => {
        if (data.isSuccess) {
          const studySetUpdated = data.data.studySet;
          setData((prev) => {
            return prev.map((ss) =>
              ss._id === studySetUpdated._id
                ? {
                    ...ss,
                    title: studySetUpdated.title,
                    description: studySetUpdated.description,
                    canVisit: studySetUpdated.canVisit,
                    visitPassword: studySetUpdated.visitPassword,
                  }
                : ss
            );
          });
          toast.success(
            t("message.updateSuccess", { value: t("fieldName.studySet") }),
            {
              duration: 3000,
            }
          );
          setStudySet(null);
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"), { duration: 3000 });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleDelete = async () => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.confirmDelete"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then((result) => {
        if (result.value) {
          setLoadingDelete(true);
          return studySetApi.deleteStudySet({ studySetId: studySet._id });
        }
      })
      .then((resp) => {
        if (resp) {
          const { data } = resp;

          if (data.isSuccess) {
            handleFetch(dataFetch.limit, dataFetch.offset, dataFetch.search);
            setStudySet(null);
            toast.success(
              t("message.deleteSuccess", { value: t("fieldName.studySet") })
            );
          }
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setLoadingDelete(false);
      });
  };

  const handleCancel = () => {
    setStudySet(null);
  };

  return (
    <Modal
      className="modal-dialog-centered modal-lg"
      isOpen={Boolean(studySet)}
    >
      <ModalHeader toggle={() => setStudySet(null)}>
        {t("fieldName.edit")}
      </ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <div className="mb-1">
            <Label className="form-label" for="description">
              {t("fieldName.id")}
            </Label>
            <Input value={studySet?._id} disabled />
          </div>
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
                    {...field}
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
                    <InputPasswordToggle
                      id="visitPassword"
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
          <div className="mb-1 mt-2 d-flex justify-content-between">
            <div></div>
            <Button.Ripple
              outline
              color="danger"
              type="button"
              style={{
                padding: ".5rem 1.5rem",
                display: "flex",
                alignItems: "center",
              }}
              onClick={handleDelete}
            >
              <Trash size={16} />
              <span style={{ marginLeft: ".25rem" }}>
                {t("fieldName.delete")}
              </span>
            </Button.Ripple>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple
            color="secondary"
            type="button"
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

export default ModalEditStudySet;
