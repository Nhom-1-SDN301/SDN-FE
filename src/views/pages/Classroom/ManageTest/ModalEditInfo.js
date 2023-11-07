// ** Reactstrap
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Row,
  Spinner,
} from "reactstrap";
import { useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Icons
import { Minus, Plus } from "react-feather";

// ** Components
import InputNumber from "rc-input-number";
import Flatpickr from "react-flatpickr";

// ** Styles
import "@styles/react/libs/input-number/input-number.scss";
import "@styles/react/libs/flatpickr/flatpickr.scss";
import toast from "react-hot-toast";
import { testApi } from "../../../../@core/api/quiz/testApi";

const ModalEditInfo = ({ open, setOpen, selectedTest, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [test, setTest] = useState(selectedTest);

  // ** Handler
  const closeModal = () => {
    setOpen(false);
  };

  const handleSaveInfoTest = () => {
    const data = {
      title: test.title,
      description: test.description,
      limitTimesDoTest: test.limitTimesDoTest,
      time: test.time,
      endAt: test.endAt,
      isActive: test.isActive,
    };

    if (data.time <= 0)
      return toast.error(
        t("message.greaterThan", { field: t("fieldName.time"), value: 0 })
      );

    setLoading(true);
    testApi
      .updateTest({
        testId: test._id,
        data,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData((prev) =>
            prev.map((t) => (t._id === data.data.test._id ? data.data.test : t))
          );
          setOpen(false);
          toast.success(
            t("message.updateSuccess", { value: t("fieldName.test") })
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
    <Modal centered className="modal-lg" isOpen={open} toggle={closeModal}>
      <ModalHeader toggle={closeModal}>{t("title.editTestInfo")}</ModalHeader>
      <ModalBody>
        <Row>
          <Col className="mb-1" xs="12" sm="12">
            <Label className="form-label" for="basicInput">
              {t("fieldName.title")}
            </Label>
            <Input
              placeholder="..."
              value={test.title}
              onChange={(e) =>
                setTest((prev) => ({ ...prev, title: e.target.value }))
              }
            />
          </Col>
          <Col className="mb-1" xs="12" sm="12">
            <Label className="form-label" for="basicInput">
              {t("fieldName.description")}
            </Label>
            <Input
              placeholder="..."
              type="textarea"
              rows="2"
              value={test.description}
              onChange={(e) =>
                setTest((prev) => ({ ...prev, description: e.target.value }))
              }
            />
          </Col>
          <Col className="mb-1" xs="4">
            <Label className="form-label" for="basicInput">
              {t("fieldName.limitTimesDoTest")}
            </Label>
            <InputNumber
              id="basic-number-input"
              upHandler={<Plus />}
              downHandler={<Minus />}
              onChange={(e) =>
                setTest((prev) => ({ ...prev, limitTimesDoTest: e }))
              }
              value={test.limitTimesDoTest}
            />
          </Col>
          <Col className="mb-1" xs="8">
            <Label className="form-label" for="basicInput">
              {`${t("fieldName.time")}(HH:MM)`}
            </Label>
            <div style={{ display: "flex" }}>
              <InputNumber
                id="basic-number-input"
                value={Math.floor(test.time / 3600)}
                min={0}
                max={60}
                upHandler={<Plus />}
                downHandler={<Minus />}
                onChange={(e) =>
                  setTest((prev) => ({
                    ...prev,
                    time: (test.time % 3600) + e * 3600,
                  }))
                }
              />
              <span style={{ margin: "0 .5rem" }}>:</span>
              <InputNumber
                id="basic-number-input"
                value={(test.time % 3600) / 60}
                min={0}
                max={60}
                upHandler={<Plus />}
                downHandler={<Minus />}
                onChange={(e) =>
                  setTest((prev) => {
                    return {
                      ...prev,
                      time: Math.floor(test.time / 3600) * 3600 + e * 60,
                    };
                  })
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
              value={test.endAt}
              onChange={(date) =>
                setTest((prev) => ({ ...prev, endAt: date[0].valueOf() }))
              }
            />
          </Col>
          <Col className="mb-1" xs="6">
            <div className="form-check form-switch">
              <Label className="form-label"></Label>
              <div>
                <Label htmlFor="active-switch">
                  {t("fieldName.publicTest")}
                </Label>
                <Input
                  id="active-switch"
                  type="switch"
                  checked={test.isActive}
                  onChange={(e) =>
                    setTest((prev) => ({ ...prev, isActive: e.target.checked }))
                  }
                />
              </div>
            </div>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple color="secondary" onClick={closeModal}>
          {t("fieldName.cancel")}
        </Button.Ripple>
        <Button.Ripple
          className="d-flex align-items-center"
          color="primary"
          disabled={loading}
          onClick={handleSaveInfoTest}
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
    </Modal>
  );
};

export default ModalEditInfo;
