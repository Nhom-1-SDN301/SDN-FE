// ** React Imports
import { Link, useNavigate } from "react-router-dom";

// ** Custom Hooks
import { useSkin } from "@hooks/useSkin";

// ** Icons Imports
import { Facebook, Twitter, Mail, GitHub } from "react-feather";

// ** Custom Components
import InputPasswordToggle from "@components/input-password-toggle";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardText,
  CardBody,
  Form,
  Label,
  Input,
  Button,
  FormFeedback,
} from "reactstrap";

// ** React
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";

// ** Illustrations Imports
import illustrationsLight from "@src/assets/images/pages/register-v2.svg";
import illustrationsDark from "@src/assets/images/pages/register-v2-dark.svg";

// ** Styles
import "@styles/react/pages/page-authentication.scss";

// ** I18n import
import { useTranslation } from "react-i18next";

// ** Third Party Components
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { toast } from "react-hot-toast";

// ** Apis
import { authApi } from "../../../@core/api/quiz/authApi";

const Register = () => {
  const { t } = useTranslation();
  const [gender, setGender] = useState(0);

  const SignupSchema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required(
        t("validationMessage.required", { field: t("fieldName.email") })
      ),
    fullName: yup
      .string()
      .required(
        t("validationMessage.required", { field: t("fieldName.fullName") })
      ),
    password: yup
      .string()
      .min(8)
      .required(
        t("validationMessage.required", { field: t("fieldName.password") })
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
    cPassword: yup
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

  // ** Hooks
  const { skin } = useSkin();
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(SignupSchema),
  });

  // Handler
  const onSubmit = (data) => {
    let isError = false;

    Object.keys(data).forEach((key) => {
      data[key] = data[key].trim();
      if (data[key] === "")
        setError(key, {
          type: "manual",
          message: t("validationMessage.required", { field: key }),
        });
    });

    if (isError) return;

    delete data.cPassword;

    authApi
      .register({
        ...data,
        gender,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          toast.success(
            t("message.createSuccess", { value: t("fieldName.account") })
          );
          navigate("/login");
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      });
  };

  const source = skin === "dark" ? illustrationsDark : illustrationsLight;

  console.log("render");

  return (
    <div className="auth-wrapper auth-cover">
      <Row className="auth-inner m-0">
        <Link className="brand-logo" to="/" onClick={(e) => e.preventDefault()}>
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
          <Col className="px-xl-2 mx-auto" xs="12" sm="8" md="6" lg="12">
            <CardTitle tag="h2" className="fw-bold mb-1">
              {`${t("title.registerTitle")} 🚀`}
            </CardTitle>
            <CardText className="mb-2">
              {t("title.registerDescription")}
            </CardText>
            <Form
              // className="auth-register-form mt-2"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="mb-1">
                <Label
                  className={classNames("form-label", {
                    "text-danger": errors.email,
                  })}
                  for="email"
                >
                  {t("fieldName.email")}
                </Label>
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      type="email"
                      id="email"
                      placeholder="john@example.com"
                      invalid={errors.email && true}
                      {...field}
                    />
                  )}
                />
                {errors.email && (
                  <FormFeedback className="text-danger">
                    {errors.email.message}
                  </FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label
                  className={classNames("form-label", {
                    "text-danger": errors.password,
                  })}
                  for="password"
                >
                  {t("fieldName.password")}
                </Label>
                <Controller
                  name="password"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="password"
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
                <Label
                  className={classNames("form-label", {
                    "text-danger": errors.cPassword,
                  })}
                  for="cPassword"
                >
                  {t("fieldName.confirmPassword")}
                </Label>
                <Controller
                  name="cPassword"
                  control={control}
                  render={({ field }) => (
                    <InputPasswordToggle
                      className="input-group-merge"
                      id="cPassword"
                      invalid={errors.cPassword && true}
                      {...field}
                    />
                  )}
                />
                {errors.cPassword && (
                  <FormFeedback className="text-danger">
                    {errors.cPassword.message}
                  </FormFeedback>
                )}
              </div>
              <div className="mb-1">
                <Label className="form-label" for="fullName">
                  {t("fieldName.fullName")}
                </Label>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="johndoe"
                      autoFocus
                      invalid={errors.fullName && true}
                      {...field}
                    />
                  )}
                />
                {errors.fullName && (
                  <FormFeedback className="text-danger">
                    {errors.fullName.message}
                  </FormFeedback>
                )}
              </div>
              <div>
                <Label cPassword for="gender">
                  {t("fieldName.gender")}
                </Label>
                <div className="mb-1 demo-inline-spacing">
                  <div className="form-check mt-1">
                    <Input
                      type="radio"
                      id="male"
                      name="gender"
                      value={0}
                      checked={gender === 0}
                      onClick={(e) => {
                        if (gender !== 0) setGender(0);
                      }}
                    />
                    <Label className="form-check-label" for="male">
                      {t("fieldName.male")}
                    </Label>
                  </div>
                  <div className="form-check mt-1">
                    <Input
                      type="radio"
                      name="gender"
                      id="female"
                      value={1}
                      checked={gender === 1}
                      onClick={(e) => {
                        if (gender !== 1) setGender(1);
                      }}
                    />
                    <Label className="form-check-label" for="female">
                      {t("fieldName.female")}
                    </Label>
                  </div>
                </div>
              </div>
              <div className="form-check mb-1">
                <Input type="checkbox" id="terms" />
                <Label className="form-check-label" for="terms">
                  {t("fieldName.agreeTo")}
                  <a
                    className="ms-25"
                    href="/"
                    onClick={(e) => e.preventDefault()}
                  >
                    {t("fieldName.privacyPolicyTerm")}
                  </a>
                </Label>
              </div>
              <Button type="submit" color="primary" block>
                {t("fieldName.signUp")}
              </Button>
            </Form>
            <p className="text-center mt-2">
              <span className="me-25">{t("fieldName.alreadyHaveAccount")}</span>
              <Link to="/login">
                <span className="text-primary">{t("fieldName.signIn")}</span>
              </Link>
            </p>
          </Col>
        </Col>
      </Row>
    </div>
  );
};

export default Register;
