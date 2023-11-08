// ** Reactstrap
import {
  Button,
  Col,
  Form,
  FormFeedback,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";

// ** I18n
import { useTranslation } from "react-i18next";

// ** React
import { useState } from "react";

// ** Icons
import { Minus, Plus } from "react-feather";

// ** Components
import InputNumber from "rc-input-number";
import Flatpickr from "react-flatpickr";

// ** Libs
import * as yup from "yup";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import toast from "react-hot-toast";
import { testApi } from "../../../../@core/api/quiz";

const ModalCreateTest = ({ open, setOpen, classId, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);

  // ** Schema
  const Schema = yup.object().shape({
    title: yup
      .string()
      .required(
        t("validationMessage.required", { field: t("fieldName.title") })
      )
      .test(
        "len",
        t("validationMessage.maxLength", {
          field: t("fieldName.title"),
          value: 100,
        }),
        (val) => val.length < 100
      ),
    description: yup.string(),
    subject: yup
      .string()
      .required(
        t("validationMessage.required", { field: t("fieldName.subject") })
      )
      .test(
        "len",
        t("validationMessage.maxLength", {
          field: t("fieldName.subject"),
          value: 20,
        }),
        (val) => val.length < 20
      ),
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
      title: "",
      description: "",
      subject: "",
    },
  });

  const [limitTimesDoTest, setLimitTimesDoTest] = useState(1);
  const [time, setTime] = useState(300);
  const [endAt, setEndAt] = useState(new Date().valueOf());

  // ** Handler
  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit = (data) => {
    if (time <= 0) return toast.error(t("message.timeAtleast1Min"));

    setLoading(true);
    testApi
      .createTest({
        classId,
        data: {
          ...data,
          limitTimesDoTest,
          time,
          startAt: new Date().valueOf(),
          endAt,
        },
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData((prev) => [data.data.test, ...prev]);
          setOpen(false);
          reset();
          setLimitTimesDoTest(1);
          setTime(300);
          setEndAt(new Date().valueOf());
          toast.success(
            t("message.createSuccess", { value: t("fieldName.test") })
          );
        } else {
          toast.error(data?.message || t("error.unknow"));
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
    <Modal className="modal-lg" centered isOpen={open}>
      <ModalHeader toggle={handleClose}>{t("title.createTest")}</ModalHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <ModalBody>
          <Row>
            <Col className="mb-1" xs="12" sm="12">
              <Label className="form-label" for="basicInput">
                {t("fieldName.title")}
              </Label>
              <Controller
                name="title"
                control={control}
                render={({ field }) => (
                  <Input invalid={errors.title} placeholder="..." {...field} />
                )}
              />
              {errors.title && (
                <FormFeedback className="text-danger">
                  {errors.title.message}
                </FormFeedback>
              )}
            </Col>
            <Col className="mb-1" xs="12" sm="12">
              <Label className="form-label" for="basicInput">
                {t("fieldName.description")}
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input
                    placeholder="..."
                    type="textarea"
                    rows="2"
                    {...field}
                  />
                )}
              />
            </Col>
            <Col className="mb-1" xs="12" sm="12">
              <Label className="form-label" for="basicInput">
                {t("fieldName.subject")}
              </Label>
              <Controller
                name="subject"
                control={control}
                render={({ field }) => (
                  <Input
                    invalid={errors.subject}
                    placeholder="SDN301, FER201m, PRF192,..."
                    {...field}
                  />
                )}
              />
              {errors.subject && (
                <FormFeedback className="text-danger">
                  {errors.subject.message}
                </FormFeedback>
              )}
            </Col>
            <Col className="mb-1" xs="4">
              <Label className="form-label" for="basicInput">
                {t("fieldName.limitTimesDoTest")}
              </Label>
              <InputNumber
                id="basic-number-input"
                upHandler={<Plus />}
                downHandler={<Minus />}
                min={1}
                onChange={(e) => setLimitTimesDoTest(e)}
                value={limitTimesDoTest}
              />
            </Col>
            <Col className="mb-1" xs="8">
              <Label className="form-label" for="basicInput">
                {`${t("fieldName.time")}(HH:MM)`}
              </Label>
              <div style={{ display: "flex" }}>
                <InputNumber
                  id="basic-number-input"
                  value={Math.floor(time / 3600)}
                  min={0}
                  max={60}
                  upHandler={<Plus />}
                  downHandler={<Minus />}
                  onChange={(e) => setTime((time % 3600) + e * 3600)}
                />
                <span style={{ margin: "0 .5rem" }}>:</span>
                <InputNumber
                  id="basic-number-input"
                  value={(time % 3600) / 60}
                  min={0}
                  max={60}
                  upHandler={<Plus />}
                  downHandler={<Minus />}
                  onChange={(e) =>
                    setTime(Math.floor(time / 3600) * 3600 + e * 60)
                  }
                />
              </div>
            </Col>
            <Col className="mb-1" xs="6">
              <Label className="form-label" for="basicInput">
                {t("fieldName.endAt")}
              </Label>
              <Flatpickr
                data-enable-time
                id="date-time-picker"
                className="form-control"
                placeholder="Date - Time"
                value={endAt}
                onChange={(date) => setEndAt(date[0].valueOf())}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button.Ripple color="secondary" onClick={handleClose}>
            {t("fieldName.cancel")}
          </Button.Ripple>
          <Button.Ripple
            type="submit"
            className="d-flex align-items-center"
            color="primary"
            disabled={loading}
          >
            {loading && (
              <Spinner
                style={{ width: 14, height: 14, marginRight: ".5rem" }}
                type="grow"
                color="dark"
              />
            )}
            <span>{t("fieldName.create")}</span>
          </Button.Ripple>
        </ModalFooter>
      </Form>
    </Modal>
  );
};

export default ModalCreateTest;
