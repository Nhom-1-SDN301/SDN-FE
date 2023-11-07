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

// ** I18n
import { useTranslation } from "react-i18next";

// ** React
import { useEffect, useState } from "react";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";
import toast from "react-hot-toast";

const defaultPermission = (
  canComment = true,
  canPost = false,
  canDoTest = true,
  canCreateTest = false
) => ({
  canComment,
  canPost,
  canDoTest,
  canCreateTest,
});

const ModalDetailMember = ({ member, setMember, classId, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [permissions, setPermissions] = useState(defaultPermission());

  useEffect(() => {
    if (member)
      setPermissions(
        defaultPermission(
          member.canComment,
          member.canPost,
          member.canDoTest,
          member.canCreateTest
        )
      );
  }, [member]);

  // ** Handler
  const handleClose = () => {
    setMember(null);
  };

  const handleSave = () => {
    setLoading(true);
    classApi
      .updateMemberInClass({
        classId,
        memberId: member.user._id,
        ...permissions,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setData((prev) => {
            for (let i = 0; i < prev.length; ++i) {
              if (prev[i].user._id === member.user._id) {
                prev[i].canComment = permissions.canComment;
                prev[i].canPost = permissions.canPost;
                prev[i].canDoTest = permissions.canDoTest;
                prev[i].canCreateTest = permissions.canCreateTest;
                break;
              }
            }
            return prev;
          });
          toast.success(
            t("message.updateSuccess", { value: t("fieldName.permission") })
          );
        } else toast.error(data?.message || t("error.unknow"));
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
        setMember(null);
      });
  };

  return (
    <Modal centered isOpen={Boolean(member)}>
      <ModalHeader toggle={handleClose}>{t("title.permission")}</ModalHeader>
      <ModalBody>
        <Row style={{ margin: "1rem 0" }}>
          <Col md="5" className="form-check form-check-inline mt-50">
            <Input
              type="checkbox"
              checked={permissions.canComment}
              id="can-comment"
              onChange={(e) =>
                setPermissions((prev) => ({
                  ...prev,
                  canComment: e.target.checked,
                }))
              }
            />
            <Label for="can-comment" className="form-check-label">
              {t("common.classroom.canComment")}
            </Label>
          </Col>
          <Col md="5" className="form-check form-check-inline mt-50">
            <Input
              type="checkbox"
              checked={permissions.canPost}
              id="can-post"
              onChange={(e) =>
                setPermissions((prev) => ({
                  ...prev,
                  canPost: e.target.checked,
                }))
              }
            />
            <Label for="can-post" className="form-check-label">
              {t("common.classroom.canPost")}
            </Label>
          </Col>
          <Col md="5" className="form-check form-check-inline mt-50">
            <Input
              type="checkbox"
              checked={permissions.canDoTest}
              id="can-do-test"
              onChange={(e) =>
                setPermissions((prev) => ({
                  ...prev,
                  canDoTest: e.target.checked,
                }))
              }
            />
            <Label for="can-do-test" className="form-check-label">
              {t("common.classroom.canDoTest")}
            </Label>
          </Col>
          <Col md="5" className="form-check form-check-inline mt-50">
            <Input
              type="checkbox"
              checked={permissions.canCreateTest}
              id="can-create-test"
              onChange={(e) =>
                setPermissions((prev) => ({
                  ...prev,
                  canCreateTest: e.target.checked,
                }))
              }
            />
            <Label for="can-create-test" className="form-check-label">
              {t("common.classroom.canManageTest")}
            </Label>
          </Col>
        </Row>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple color="secondary" onClick={handleClose}>
          {t("fieldName.cancel")}
        </Button.Ripple>
        <Button.Ripple
          className="d-flex align-items-center"
          color="primary"
          disabled={loading}
          onClick={handleSave}
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

export default ModalDetailMember;
