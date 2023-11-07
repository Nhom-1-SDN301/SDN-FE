// ** React Imports
import { Link, useNavigate, useParams } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { ChevronLeft } from "react-feather";

// ** Reactstrap Imports
import {
  Row,
  Col,
  CardTitle,
  CardText,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
  Spinner,
} from "reactstrap";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/forgot-password-v2.svg";
import illustrationsDark from "@src/assets/images/pages/forgot-password-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Third libs
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

// ** React
import { useState } from "react";

// ** Apis
import { authApi } from "../../../@core/api/quiz/authApi";

const ResetPassword = () => {
  // ** Hooks
  const { skin } = useSkin();
  const { t } = useTranslation();
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  const Schema = yup.object().shape({
    password: yup
      .string()
      .min(8)
      .required(
        t("validationMessage.required", { field: t("fieldName.newPassword") })
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
    confirmPassword: yup
      .string()
      .required(
        t("validationMessage.required", {
          field: t("fieldName.confirmPassword"),
        })
      )
      .oneOf(
        [yup.ref("password"), null],
        t("validationMessage.notMatch", { field: t("fieldName.password") })
      ),
  });

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
    setLoading(true);
    authApi
      .resetPassword({ password: data.password, token })
      .then(({ data }) => {
        if (data.isSuccess) {
          toast.success(t("message.resetPasswordSuccess"));
          navigate("/login");
        } else {
          toast.error(data.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.error(err.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link
          className="brand-logo"
          to="/home"
          onClick={(e) => e.preventDefault()}
        >
          <svg viewBox="0 0 139 95" version="1.1" height="28">
            <defs>
              <linearGradient
                x1="100%"
                y1="10.5120544%"
                x2="50%"
                y2="89.4879456%"
                id="linearGradient-1"
              >
                <stop stopColor="#000000" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
              <linearGradient
                x1="64.0437835%"
                y1="46.3276743%"
                x2="37.373316%"
                y2="100%"
                id="linearGradient-2"
              >
                <stop stopColor="#EEEEEE" stopOpacity="0" offset="0%"></stop>
                <stop stopColor="#FFFFFF" offset="100%"></stop>
              </linearGradient>
            </defs>
            <g
              id="Page-1"
              stroke="none"
              strokeWidth="1"
              fill="none"
              fillRule="evenodd"
            >
              <g id="Artboard" transform="translate(-400.000000, -178.000000)">
                <g id="Group" transform="translate(400.000000, 178.000000)">
                  <path
                    d="M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z"
                    id="Path"
                    className="text-primary"
                    style={{ fill: "currentColor" }}
                  ></path>
                  <path
                    d="M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z"
                    id="Path"
                    fill="url(#linearGradient-1)"
                    opacity="0.2"
                  ></path>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.049999997"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325"
                  ></polygon>
                  <polygon
                    id="Path-2"
                    fill="#000000"
                    opacity="0.099999994"
                    points="69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338"
                  ></polygon>
                  <polygon
                    id="Path-3"
                    fill="url(#linearGradient-2)"
                    opacity="0.099999994"
                    points="101.428699 0 83.0667527 94.1480575 130.378721 47.0740288"
                  ></polygon>
                </g>
              </g>
            </g>
          </svg>
          <h2 className="brand-text text-primary ms-1">QUIZROOM</h2>
        </Link>
        <Col className="d-none d-lg-flex align-items-center p-5" lg="8" sm="12">
          <div className="w-100 d-lg-flex align-items-center justify-content-center px-5">
            <img className="img-fluid" src={source} alt="Login Cover" />
          </div>
        </Col>
        <Col
          className="d-flex align-items-center auth-bg px-2 p-lg-5"
          lg="4"
          sm="12"
        >
          <Col className="px-xl-2 mx-auto" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              {t("fieldName.resetPassword")} 🔒
            </CardTitle>
            <Form
              className="auth-forgot-password-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label className="form-label" for="new-password">
                  {t("fieldName.newPassword")}
                </Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      id="new-password"
                      invalid={errors.password && true}
                      {...field}
                    />
                  )}
                />
                {errors.password && (
                  <FormFeedback className="text-danger">
                    {errors.password.message}
                  </FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="confirm-new-password">
                  {t("fieldName.confirmNewPassword")}
                </Label>
                <Controller
                  name="confirmPassword"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      id="confirm-new-password"
                      invalid={errors.confirmPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.confirmPassword && (
                  <FormFeedback className="text-danger">
                    {errors.confirmPassword.message}
                  </FormFeedback>
                )}
              </div>
              <Button color="primary" block disabled={loading}>
                {loading && (
                  <Spinner
                    style={{ width: 16, height: 16, marginRight: ".5rem" }}
                  />
                )}
                {t("fieldName.resetPassword")}
              </Button>
            </Form>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default ResetPassword;
