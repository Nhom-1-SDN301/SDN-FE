// ** I18n
import { useTranslation } from "react-i18next";

// ** React
import { forwardRef, useRef, useState } from "react";

// ** Reactstrap
import { Alert, Button, Label, Input, Spinner } from "reactstrap";

// ** Icons
import { CornerUpRight, X } from "react-feather";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";
import toast from "react-hot-toast";

const InputComment = ({
  replyTo,
  setReplyTo,
  classId,
  postId,
  inputRef,
  setComments,
}) => {
  // ** Hooks
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  // ** Handler
  const handlePostComment = () => {
    if (value.trim() === "") return;

    const body = new FormData();
    body.append("content", value.trim());

    if (replyTo) {
      body.append("replyToComment", replyTo?.replyToComment);
      body.append("replyUser", replyTo?.replyUser?._id);
    }

    setLoading(true);
    classApi
      .createComment({ classId, postId, data: body })
      .then(({ data }) => {
        if (data.isSuccess) {
          setComments((prev) => {
            const isExistComment =
              prev.findIndex(
                (comment) => comment._id === data.data.comment._id
              ) >= 0;

            if (isExistComment)
              return prev.map((comment) =>
                comment._id === data.data.comment._id
                  ? data.data.comment
                  : comment
              );
            else return [...prev, data.data.comment];
          });
          setValue("");
          setReplyTo(null);
        } else toast.error(data.message || t("error.unknow"));
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div style={{ marginTop: "1rem" }}>
      <fieldset className="form-label-group mb-50">
        <Label className="form-check-label">{t("fieldName.addComment")}</Label>
        {replyTo && (
          <Alert
            color="primary d-flex align-items-center justify-content-between m-0"
            isOpen={Boolean(replyTo)}
            toggle={() => setReplyTo(null)}
          >
            <div className="alert-body">
              <CornerUpRight size={18} />
              <small style={{ margin: "0 .5rem" }}>
                {t("common.replyTo")}:
              </small>
              <span className="text-primary">{replyTo.replyUser.fullName}</span>
            </div>
          </Alert>
        )}
        <Input
          innerRef={inputRef}
          placeholder={t("fieldName.addComment")}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          disabled={loading}
        />
      </fieldset>
      <Button
        color="primary"
        size="sm"
        style={{ float: "right" }}
        onClick={handlePostComment}
        disabled={loading}
      >
        {loading && <Spinner style={{ width: 12, height: 12 }} />}
        <span style={{ marginLeft: ".5rem" }}>
          {t("fieldName.postComment")}
        </span>
      </Button>
    </div>
  );
};

export default InputComment;
