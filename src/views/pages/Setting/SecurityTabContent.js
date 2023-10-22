// ** React Imports
import { Fragment } from "react";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  Form,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from "reactstrap";

// ** Third Party Components
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Demo Components
import TwoFactorAuth from "./TwoFactorAuth";

// ** I18n
import { useTranslation } from "react-i18next";

const showErrors = (field, valueLen, min) => {
  if (valueLen === 0) {
    return `${field} field is required`;
  } else if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  } else {
    return "";
  }
};

const defaultValues = {
  newPassword: "",
  currentPassword: "",
  retypeNewPassword: "",
};

const SecurityTabContent = () => {
  // ** Hooks
  const { t } = useTranslation();

  const SignupSchema = yup.object().shape({
    currentPassword: yup
      .string()
      .required(
        t("validationMessage.required", {
          field: t("fieldName.password"),
        })
      )
      .min(
        6,
        t("validationMessage.minLength", {
          field: t("fieldName.password"),
          value: 6,
        })
      ),
    newPassword: yup
      .string()
      .required(
        t("validationMessage.required", {
          field: t("fieldName.newPassword"),
        })
      )
      .min(
        8,
        t("validationMessage.minLength", {
          field: t("fieldName.password"),
          value: 8,
        })
      )
      .test(
        "Oke",
        t("validationMessage.passwordValidate_1"),
        (value, context) => {
          const hasUpperCase = /[A-Z]/.test(value);
          const hasLowerCase = /[a-z]/.test(value);
          const hasNumber = /[0-9]/.test(value);
          const hasSymbole = /[!@#%&]/.test(value);

          let validCondition = 0;
          const numberOfMustBeValidConditions = 3;
          const conditions = [
            hasUpperCase,
            hasLowerCase,
            hasNumber,
            hasSymbole,
          ];

          conditions.forEach((condition) =>
            condition ? validCondition++ : null
          );

          if (validCondition >= numberOfMustBeValidConditions) return true;

          return false;
        }
      ),
    retypeNewPassword: yup
      .string()
      .required(
        t("validationMessage.required", {
          field: t("fieldName.confirmPassword"),
        })
      )
      .min(
        8,
        t("validationMessage.minLength", {
          field: t("fieldName.password"),
          value: 8,
        })
      )
      .oneOf(
        [yup.ref(`newPassword`), null],
        t("validationMessage.notMatch", { field: t("fieldName.password") })
      ),
  });

  // ** Hooks
  const {
    control,
    handleSubmit,
    clearErrors,
    reset,
    setError,
    getFieldState,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  // ** Handler
  const onSubmit = (data) => {
    let isError = false;

    // Object.keys(data).forEach((key) => {
    //   data[key] = data[key].trim();
    //   if (data[key] === "")
    //   console.log(key);
    //     setError(key, {
    //       type: "manual",
    //     });
    // });

    if (isError) return;

    console.log(data);
  };

  const handleCancel = () => {
    clearErrors();
    reset();
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Change Password</CardTitle>
        </CardHeader>
        <CardBody className="pt-1">
          <Form onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6" className="mb-1">
                <Controller
                  name="currentPassword"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t("fieldName.currentPassword")}
                      htmlFor="currentPassword"
                      className="input-group-merge"
                      invalid={errors.currentPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.currentPassword && (
                  <FormFeedback className="d-block text-danger">
                    {errors.currentPassword.message}
                  </FormFeedback>
                )}
              </Col>
            </Row>
            <Row>
              <Col sm="6" className="mb-1">
                <Controller
                  name="newPassword"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t("fieldName.newPassword")}
                      htmlFor="newPassword"
                      className="input-group-merge"
                      invalid={errors.newPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.newPassword && (
                  <FormFeedback className="d-block text-danger">
                    {errors.newPassword.message}
                  </FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Controller
                  name="retypeNewPassword"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      label={t("fieldName.confirmPassword")}
                      htmlFor="retypeNewPassword"
                      className="input-group-merge"
                      invalid={errors.retypeNewPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.retypeNewPassword && (
                  <FormFeedback className="d-block text-danger">
                    {errors.retypeNewPassword.message}
                  </FormFeedback>
                )}
              </Col>
              <Col xs={12}>
                <p className="fw-bolder">Password requirements:</p>
                <ul className="ps-1 ms-25">
                  <li className="mb-50">
                    Minimum 8 characters long - the more, the better
                  </li>
                  <li className="mb-50">At least one lowercase character</li>
                  <li>At least one number, symbol, or whitespace character</li>
                </ul>
              </Col>
              <Col className="mt-1" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  {t("fieldName.save")}
                </Button>
                <Button color="secondary" outline onClick={handleCancel}>
                  {t("fieldName.cancel")}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
      <TwoFactorAuth />
    </Fragment>
  );
};

export default SecurityTabContent;
