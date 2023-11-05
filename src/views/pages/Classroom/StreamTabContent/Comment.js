// ** Icons
import {
  ChevronUp,
  CornerDownRight,
  CornerUpLeft,
  MoreVertical,
} from "react-feather";

// ** Reactstrap
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";

// ** Images
import defaultPic from "../../../../assets/images/portrait/small/avatar-s-11.jpg";

// ** Styles
import styles from "../style.module.scss";
import "@styles/base/plugins/extensions/ext-component-sweet-alerts.scss";

// ** Custom Components
import Avatar from "@components/avatar";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Third libs
import { formatDistance } from "date-fns";
import { enUS, vi } from "date-fns/locale";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { toast } from "react-hot-toast";

// ** React
import { Fragment, useState } from "react";

// ** Redux
import { useSelector } from "react-redux";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";

const MySwal = withReactContent(Swal);

const RepComment = ({
  mainComment,
  comment,
  setMainComment,
  setReplyTo,
  inputRef,
  classId,
  postId,
}) => {
  // ** Hooks
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [isEdit, setIsEdit] = useState(false);
  const [valueEdit, setValueEdit] = useState(comment.content);

  const [loadingEdit, setLoadingEdit] = useState(false);

  // ** Handler
  const handlerRepComment = () => {
    const data = {
      replyToComment: mainComment._id,
      replyUser: comment.user,
    };

    setReplyTo(data);
    inputRef.current.focus();
  };

  const handleEditComment = () => {
    setIsEdit(true);
  };

  const handleSubmitEdit = () => {
    const value = valueEdit.trim();
    if (value === "") return;

    setLoadingEdit(true);
    classApi
      .updateComment({
        classId,
        content: value,
        postId,
        mainCommentId: mainComment._id,
        subCommentId: comment._id,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setMainComment((prev) =>
            prev.map((c) => {
              if (c._id === data.data.comment._id) {
                for (let i = 0; i < c.reply.length; ++i) {
                  if (c.reply[i]._id === comment._id) {
                    c.reply[i].content = value;
                    break;
                  }
                }
              }

              return c;
            })
          );
          setIsEdit(false);
          toast.success(
            t("message.updateSuccess", { value: t("fieldName.comment") })
          );
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoadingEdit(false);
      });
  };

  const handleDeleteComment = async () => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.confirm"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          return classApi.deleteComment({
            classId,
            postId,
            mainCommentId: mainComment._id,
            subCommentId: comment._id,
          });
        }
      })
      .then((resp) => {
        if (resp) {
          const isSuccess = resp.data.isSuccess;
          if (isSuccess) {
            setMainComment((prev) => {
              return prev.map((c) => {
                if (c._id === mainComment._id) {
                  c.reply = c.reply.filter((rep) => rep._id !== comment._id);
                }

                return c;
              });
            });
            toast.success(
              t("message.deleteSuccess", { value: t("fieldName.comment") })
            );
          } else {
            toast.error(resp.data.message || t("error.unknow"));
          }
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      });
  };

  return (
    <div
      className={`d-flex align-items-start mt-1 ${styles.comment}`}
      style={{ paddingLeft: "3rem" }}
    >
      <Avatar
        img={comment?.user?.picture || defaultPic}
        className="mt-25 me-75"
        imgHeight="34"
        imgWidth="34"
      />
      <div className="profile-user-info w-100">
        <div className="d-flex align-items-center justify-content-between">
          <div className="d-flex">
            <h6 className="mb-0">{comment?.user?.fullName}</h6>
            <small className="text-muted" style={{ marginLeft: "1rem" }}>
              {formatDistance(new Date(comment.createdAt), new Date(), {
                addSuffix: true,
                locale: i18n.language === "vn" ? vi : enUS,
              })}
            </small>
          </div>
          <a href="/" onClick={(e) => e.preventDefault()}>
            {user?._id === comment.user._id ? (
              <UncontrolledDropdown direction="down">
                <DropdownToggle
                  color="flat-primary"
                  style={{ padding: ".25rem .5rem" }}
                >
                  <MoreVertical
                    size={18}
                    className={`text-primary ${styles.icon_reply}`}
                  />
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    style={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleEditComment}
                  >
                    <span style={{ marginLeft: ".5rem" }}>
                      {t("fieldName.edit")}
                    </span>
                  </DropdownItem>
                  <DropdownItem
                    style={{
                      width: 200,
                      display: "flex",
                      alignItems: "center",
                    }}
                    onClick={handleDeleteComment}
                  >
                    <span style={{ marginLeft: ".5rem" }}>
                      {t("fieldName.delete")}
                    </span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <CornerUpLeft
                size={18}
                className={`${styles.icon_reply}`}
                onClick={handlerRepComment}
              />
            )}
          </a>
        </div>
        {isEdit ? (
          <div>
            <Input
              type="textarea"
              rows="2"
              spellCheck={false}
              value={valueEdit}
              onChange={(e) => setValueEdit(e.target.value)}
            />
            <div className="mt-50">
              <Button.Ripple
                color="primary"
                size="sm"
                style={{ float: "right" }}
                onClick={handleSubmitEdit}
              >
                {loadingEdit && <Spinner style={{ width: 12, height: 12 }} />}
                <span style={{ marginLeft: ".25rem" }}>
                  {t("fieldName.submit")}
                </span>
              </Button.Ripple>
              <Button.Ripple
                size="sm"
                style={{ float: "right", marginRight: ".5rem" }}
                onClick={() => {
                  setIsEdit(false);
                  setValueEdit(comment.content);
                }}
              >
                {t("fieldName.cancel")}
              </Button.Ripple>
            </div>
          </div>
        ) : (
          <small>
            {comment.replyUser && (
              <small
                className="text-primary"
                style={{ marginRight: ".5rem", cursor: "pointer" }}
              >
                {comment.replyUser.fullName}
              </small>
            )}
            {comment.content}
          </small>
        )}
      </div>
    </div>
  );
};

const Comment = ({
  comment,
  setComments,
  setReplyTo,
  inputRef,
  classId,
  postId,
}) => {
  // ** Hooks
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [showComments, setShowComments] = useState(false);
  const [valueEdit, setValueEdit] = useState(comment.content);
  const [isEdit, setIsEdit] = useState(false);

  const [loadingEdit, setLoadingEdit] = useState(false);

  // ** Handler
  const handlerRepComment = () => {
    const data = {
      replyToComment: comment._id,
      replyUser: comment.user,
    };

    setReplyTo(data);
    inputRef.current.focus();
  };

  const handleEditComment = () => {
    setIsEdit(true);
  };

  const handleSubmitEditComment = () => {
    const value = valueEdit.trim();
    if (value === "") return;

    setLoadingEdit(true);
    classApi
      .updateComment({
        classId,
        content: value,
        postId,
        mainCommentId: comment._id,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setComments((prev) =>
            prev.map((c) =>
              c._id === comment._id ? { ...c, content: value } : c
            )
          );
          setIsEdit(false);
          toast.success(
            t("message.updateSuccess", { value: t("fieldName.comment") })
          );
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoadingEdit(false);
      });
  };

  const handleDeleteComment = async () => {
    return MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.confirm"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then(({ isConfirmed }) => {
        if (isConfirmed) {
          return classApi.deleteComment({
            classId,
            postId,
            mainCommentId: comment._id,
          });
        }
      })
      .then((resp) => {
        if (resp) {
          const isSuccess = resp.data.isSuccess;
          if (isSuccess) {
            setComments((prev) => {
              return prev.filter((c) => c._id !== comment._id);
            });
            toast.success(
              t("message.deleteSuccess", { value: t("fieldName.comment") })
            );
          } else {
            toast.error(resp.data.message || t("error.unknow"));
          }
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      });
  };

  return (
    <Fragment>
      <div className={`d-flex align-items-start mt-1 ${styles.comment}`}>
        <Avatar
          img={comment.user.picture || defaultPic}
          className="mt-25 me-75"
          imgHeight="34"
          imgWidth="34"
        />
        <div className="profile-user-info w-100">
          <div className="d-flex align-items-center justify-content-between">
            <div className="d-flex">
              <h6 className="mb-0">{comment.user.fullName}</h6>
              <small className="text-muted" style={{ marginLeft: "1rem" }}>
                {formatDistance(new Date(comment.createdAt), new Date(), {
                  addSuffix: true,
                  locale: i18n.language === "vn" ? vi : enUS,
                })}
              </small>
            </div>
            <a href="/" onClick={(e) => e.preventDefault()}>
              {user?._id === comment.user._id ? (
                <UncontrolledDropdown direction="down">
                  <DropdownToggle
                    color="flat-primary"
                    style={{ padding: ".25rem .5rem" }}
                  >
                    <MoreVertical
                      size={18}
                      className={`text-primary ${styles.icon_reply}`}
                    />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <DropdownItem
                      style={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleEditComment}
                    >
                      <span style={{ marginLeft: ".5rem" }}>
                        {t("fieldName.edit")}
                      </span>
                    </DropdownItem>
                    <DropdownItem
                      style={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleDeleteComment}
                    >
                      <span style={{ marginLeft: ".5rem" }}>
                        {t("fieldName.delete")}
                      </span>
                    </DropdownItem>
                  </DropdownMenu>
                </UncontrolledDropdown>
              ) : (
                <CornerUpLeft
                  size={18}
                  className={`${styles.icon_reply}`}
                  onClick={handlerRepComment}
                />
              )}
            </a>
          </div>
          {isEdit ? (
            <div>
              <Input
                type="textarea"
                rows="2"
                spellCheck={false}
                value={valueEdit}
                onChange={(e) => setValueEdit(e.target.value)}
              />
              <div className="mt-50">
                <Button.Ripple
                  color="primary"
                  size="sm"
                  style={{ float: "right" }}
                  onClick={handleSubmitEditComment}
                >
                  {loadingEdit && <Spinner style={{ width: 12, height: 12 }} />}
                  <span style={{ marginLeft: ".25rem" }}>
                    {t("fieldName.submit")}
                  </span>
                </Button.Ripple>
                <Button.Ripple
                  size="sm"
                  style={{ float: "right", marginRight: ".5rem" }}
                  onClick={() => {
                    setIsEdit(false);
                    setValueEdit(comment.content);
                  }}
                >
                  {t("fieldName.cancel")}
                </Button.Ripple>
              </div>
            </div>
          ) : (
            <small>{comment.content}</small>
          )}
        </div>
      </div>
      {!showComments && comment.reply.length > 0 ? (
        <div
          className="d-flex align-items-center"
          style={{ paddingLeft: "3rem", marginTop: ".25rem" }}
          onClick={() => setShowComments(true)}
        >
          <CornerDownRight size={16} />
          <small
            className={`${styles.hoverDecoration} text-primary`}
            style={{ margin: "0 .5rem", cursor: "pointer" }}
          >
            {t("message.showComments", { value: comment.reply.length })}
          </small>
        </div>
      ) : (
        <Fragment>
          {comment.reply.length > 0 && (
            <div
              className="d-flex align-items-center"
              style={{ paddingLeft: "3rem", marginTop: ".25rem" }}
              onClick={() => setShowComments(false)}
            >
              <ChevronUp size={16} />
              <small
                className={`${styles.hoverDecoration} text-primary`}
                style={{ margin: "0 .5rem", cursor: "pointer" }}
              >
                {t("message.hideComments")}
              </small>
            </div>
          )}
          {comment.reply.map((repComment) => (
            <RepComment
              inputRef={inputRef}
              key={repComment._id}
              mainComment={comment}
              comment={repComment}
              setReplyTo={setReplyTo}
              classId={classId}
              postId={postId}
              setMainComment={setComments}
            />
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Comment;
