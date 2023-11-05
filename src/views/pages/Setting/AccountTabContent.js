// ** React Imports
import { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";

// ** Third Party Components
import Select from "react-select";
import Cleave from "cleave.js/react";
import { useForm, Controller } from "react-hook-form";
import "cleave.js/dist/addons/cleave-phone.us";
import Flatpickr from "react-flatpickr";
import toast from "react-hot-toast";

// ** Reactstrap Imports
import {
  Row,
  Col,
  Form,
  Card,
  Input,
  Label,
  Button,
  CardBody,
  CardTitle,
  CardHeader,
  FormFeedback,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";
import { useDispatch, useSelector } from "react-redux";
import defaultAvatar from "../../../assets/images/portrait/small/avatar-s-11.jpg";
import {
  formatDateISOTODDMMYYYY,
  formatDateISOToDDMMYYY_HHMM,
} from "../../../utility/Utils";

// ** Demo Components

// ** Styles
import "@styles/react/libs/flatpickr/flatpickr.scss";

// ** Apis
import { userApi } from "../../../@core/api/quiz";
import { setUser } from "../../../redux/auth";

const AccountTabContent = () => {
  // ** Hooks
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const [avatar, setAvatar] = useState(null);

  const defaultValues = {
    fullName: user?.fullName,
    dob: user?.dob ? formatDateISOTODDMMYYYY(user?.dob) : null,
    gender: user?.gender,
    phone: user?.phone,
    address: user?.address,
    picture: user?.picture,
  };

  // ** Options
  const genderOptions = [
    { value: 0, label: t("fieldName.female") },
    { value: 1, label: t("fieldName.male") },
  ];

  const {
    control,
    setError,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues });

  const onSubmit = (data) => {
    if (data.fullName.trim() === "") {
      return setError("fullName", {
        type: "manual",
        message: t("validationMessage.required", {
          field: t("fieldName.fullName"),
        }),
      });
    }

    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] !== null) {
        if (key === "dob") {
          formData.append(key, data[key].replaceAll("-", "/"));
        } else if (!(key === "picture" && data[key] !== null))
          formData.append(key, data[key]);
      }
    });

    // Khong thay doi anh
    if (!avatar && data.picture === defaultValues.picture)
      formData.append("currentPicture", defaultValues.picture);

    // Thay the anh cu
    if (avatar) formData.append("picture", avatar);

    userApi
      .updateUser({ data: formData, userId: user._id })
      .then(({ data }) => {
        if (data.isSuccess) {
          dispatch(setUser({ user: data.data.user }));
          toast.success(
            t("message.updateSuccess", { value: t("fieldName.profile") })
          );
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      });
  };

  const handleImgReset = () => {
    setAvatar(() => null);
    setValue("picture", null);
  };

  return (
    <Fragment>
      <Card>
        <CardHeader className="border-bottom">
          <CardTitle tag="h4">Profile Details</CardTitle>
        </CardHeader>
        <CardBody className="py-2 my-25">
          <div className="d-flex">
            <div className="me-25">
              <Controller
                name="picture"
                control={control}
                render={({ field }) => (
                  <img
                    className="rounded me-50"
                    src={
                      avatar
                        ? URL.createObjectURL(avatar)
                        : field.value || defaultAvatar
                    }
                    alt="Generic placeholder image"
                    height="100"
                    width="100"
                    style={{ objectFit: "cover" }}
                  />
                )}
              />
            </div>
            <div className="d-flex align-items-end mt-75 ms-1">
              <div>
                <Button
                  tag={Label}
                  className="mb-75 me-75"
                  size="sm"
                  color="primary"
                  disabled={user.provider !== "Quizroom"}
                >
                  Upload
                  <Controller
                    name="picture"
                    control={control}
                    render={({ field }) => (
                      <Input
                        type="file"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          if (file.size > 1000000)
                            return toast.error(
                              t("message.imageLessThanOrEqual", { value: 1 })
                            );

                          setAvatar(file);
                        }}
                        hidden
                        accept="image/*"
                      />
                    )}
                  />
                </Button>
                <Button
                  className="mb-75"
                  color="secondary"
                  size="sm"
                  outline
                  disabled={user.provider !== "Quizroom"}
                  onClick={handleImgReset}
                >
                  Reset
                </Button>
                <p className="mb-0">Allowed JPG, GIF or PNG. Max size of 1MB</p>
              </div>
            </div>
          </div>
          <Form className="mt-2 pt-50" onSubmit={handleSubmit(onSubmit)}>
            <Row>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="Id">
                  ID
                </Label>
                <Input id="Id" disabled value={user?._id} />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="email">
                  Email
                </Label>
                <Input id="email" disabled value={user?.email} />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="createdAt">
                  {t("fieldName.createDate")}
                </Label>
                <Input
                  id="createdAt"
                  disabled
                  value={formatDateISOToDDMMYYY_HHMM(user?.createdAt)}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="provider">
                  {t("fieldName.provider")}
                </Label>
                <Input id="provider" disabled value={user?.provider} />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="fullName">
                  {t("fieldName.fullName")}
                </Label>
                <Controller
                  name="fullName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="fullName"
                      placeholder="John Doe"
                      invalid={errors.fullName && true}
                      {...field}
                    />
                  )}
                />
                {errors.fullName && (
                  <FormFeedback style={{ color: "#ea5455" }}>
                    {errors.fullName.message}
                  </FormFeedback>
                )}
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="dob">
                  {t("fieldName.dob")}
                </Label>
                <Controller
                  name="dob"
                  control={control}
                  render={({ field }) => (
                    <Flatpickr
                      className="form-control"
                      id="dob"
                      placeholder="DD-MM-YYYY"
                      datatype=""
                      options={{
                        dateFormat: "d-m-Y",
                      }}
                      {...field}
                      onChange={(_, d) => {
                        setValue("dob", d);
                      }}
                    />
                  )}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="phone">
                  {t("fieldName.phone")}
                </Label>
                <Controller
                  name="phone"
                  control={control}
                  render={({ field }) => (
                    <Cleave
                      id="phone"
                      name="phone"
                      className="form-control"
                      placeholder="1 234 567 8900"
                      options={{ phone: true, phoneRegionCode: "VN" }}
                      {...field}
                    />
                  )}
                />
              </Col>
              <Col sm="6" className="mb-1">
                <Label className="form-label" for="gender">
                  {t("fieldName.gender")}
                </Label>
                <Controller
                  name="gender"
                  control={control}
                  render={({ field }) => (
                    <Select
                      id="gender"
                      isClearable={false}
                      className="react-select"
                      classNamePrefix="select"
                      options={genderOptions}
                      theme={selectThemeColors}
                      {...field}
                      value={genderOptions.find((g) => g.value === field.value)}
                    />
                  )}
                />
              </Col>
              <Col sm="12" className="mb-1">
                <Label className="form-label" for="address">
                  {t("fieldName.address")}
                </Label>
                <Controller
                  name="address"
                  control={control}
                  render={({ field }) => (
                    <Input id="address" placeholder="Los Santos" {...field} />
                  )}
                />
              </Col>
              <Col className="mt-2" sm="12">
                <Button type="submit" className="me-1" color="primary">
                  {t("fieldName.save")}
                </Button>
              </Col>
            </Row>
          </Form>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export default AccountTabContent;
