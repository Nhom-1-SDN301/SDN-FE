// ** Reactstrap
import {
  Button,
  Card,
  CardBody,
  CardText,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  Label,
  Row,
  Spinner,
  UncontrolledDropdown,
} from "reactstrap";

// ** Antd
import { Image } from "antd";

// ** Images
import defaultPic from "../../../../assets/images/portrait/small/avatar-s-11.jpg";

// ** Custom Components
import Avatar from "@components/avatar";
import UILoader from "@components/ui-loader";
import SpinnerComponent from "@components/spinner/Loading-spinner";

// ** I18n
import { useTranslation } from "react-i18next";
import { useSkin } from "../../../../utility/hooks/useSkin";

// ** Icons
import {
  ArrowDown,
  CornerUpLeft,
  Folder,
  MoreVertical,
  Users,
} from "react-feather";

// ** Styles
import styles from "../style.module.scss";

// ** Utils
import { splitFile } from "../../../../utility/Utils";

// ** Apis
import { classApi, downloadApi } from "../../../../@core/api/quiz";

// ** React
import { Fragment, useEffect, useMemo, useRef, useState } from "react";

// ** Third libs
import { formatDistance } from "date-fns";
import { vi, enUS } from "date-fns/locale";
import Comment from "./Comment";
import InputComment from "./InputComment";
import { useSelector } from "react-redux";

const ImageUpload = ({ srcPicture }) => {
  return (
    <span style={{ marginRight: ".5rem" }}>
      <Image
        style={{ width: 200, height: 200, objectFit: "cover" }}
        src={srcPicture}
      />
    </span>
  );
};

const FileUpload = ({ file }) => {
  // ** Hooks
  const { skin } = useSkin();
  const [loading, setLoading] = useState(false);

  const { filename, type } = splitFile(file);

  // ** Handler
  const handleDownload = () => {
    setLoading(true);
    downloadApi
      .file({ filename: file })
      .then((resp) => {
        const link = document.createElement("a");
        link.href = resp.request.responseURL;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();
      })
      .finally(() => setLoading(false));
  };

  return (
    <Col md={3}>
      <UILoader blocking={loading} loader={<Spinner color="primary" />}>
        <div
          className={styles.itemFile}
          style={{
            padding: "1rem 2rem 1rem 1rem",
            outline: `1px solid ${skin === "dark" ? "#404656" : "#d8d6de"}`,
            borderRadius: 4,
            textAlign: "center",
            cursor: "pointer",
          }}
          onClick={handleDownload}
        >
          <Folder size={18} />
          <span
            style={{
              marginLeft: ".5rem",
              width: "100%",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {filename}
          </span>
          <span>{`.${type}`}</span>
          <span className={styles.itemFile_download}>
            <ArrowDown size={18} />
          </span>
        </div>
      </UILoader>
    </Col>
  );
};

const Post = ({ post, classId, canComment, isRoot }) => {
  // ** Hooks
  const { t, i18n } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const inputCommentRef = useRef(null);
  const [comments, setComments] = useState([]);
  const [loadingComments, setLoadingComments] = useState(false);
  const [replyTo, setReplyTo] = useState(null);
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    fetchComments();
  }, []);

  // ** Handler
  const fetchComments = () => {
    setLoadingComments(true);
    classApi
      .getComments({ classId: post.classId, postId: post._id })
      .then(({ data }) => {
        setComments(data.data.comments);
      })
      .finally(() => {
        setLoadingComments(false);
      });
  };

  const totalComment = useMemo(() => {
    return comments.reduce(
      (prev, current) => prev + current.reply.length + 1,
      0
    );
  }, [comments]);

  return (
    <Card>
      <div style={{ padding: "1rem 1rem 0 1rem" }}>
        <div className="d-flex justify-content-between align-items-center mb-1">
          <div className="d-flex justify-content-start align-items-center">
            <Avatar
              className="me-1"
              img={post.user.picture || defaultPic}
              imgHeight="50"
              imgWidth="50"
            />
            <div className="profile-user-info">
              <h6 className="mb-0">{post.user.fullName}</h6>
              <small className="text-muted">
                {formatDistance(new Date(post.createdAt), new Date(), {
                  addSuffix: true,
                  locale: i18n.language === "vn" ? vi : enUS,
                })}
              </small>
            </div>
          </div>
          <div>
            <UncontrolledDropdown direction="down">
              <DropdownToggle
                color="flat-primary"
                style={{ padding: ".25rem .5rem" }}
              >
                <MoreVertical size={18} className={`text-primary`} />
              </DropdownToggle>
              <DropdownMenu end>
                {user._id === post?.user?._id ? (
                  <Fragment>
                    <DropdownItem
                      style={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
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
                    >
                      <span style={{ marginLeft: ".5rem" }}>
                        {t("fieldName.delete")}
                      </span>
                    </DropdownItem>
                  </Fragment>
                ) : (
                  <Fragment>
                    <DropdownItem
                      style={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: ".5rem" }}>
                        {t("fieldName.report")}
                      </span>
                    </DropdownItem>
                  </Fragment>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
        <CardText
          className="text-post"
          dangerouslySetInnerHTML={{
            __html: post.content,
          }}
        ></CardText>
        <div
          style={{
            width: "100%",
            whiteSpace: "nowrap",
            maxHeight: 200,
            overflowX: "auto",
            overflowY: "hidden",
          }}
        >
          {post.images.map((image, index) => (
            <ImageUpload key={index} srcPicture={image} />
          ))}
        </div>
        {post.files.length > 0 && (
          <Row style={{ marginTop: "2rem" }}>
            {post.files.map((file, index) => (
              <FileUpload key={index} file={file} />
            ))}
          </Row>
        )}
      </div>
      <hr />
      {loadingComments ? (
        <SpinnerComponent />
      ) : (
        <div style={{ padding: "0 1rem 1rem 1rem" }}>
          {comments.length > 0 && (
            <div
              style={{
                fontWeight: 700,
                display: "flex",
                alignItems: "center",
                marginBottom: ".5rem",
                width: "fit-content",
                cursor: "pointer",
              }}
              onClick={() => setShowComments((prev) => !prev)}
            >
              <Users size={18} />
              <span style={{ marginLeft: ".5rem" }}>{`${totalComment} ${t(
                "fieldName.comments"
              )}`}</span>
            </div>
          )}

          {/* Comments */}
          {showComments &&
            comments.map((comment) => (
              <Comment
                key={comment._id}
                comment={comment}
                setReplyTo={setReplyTo}
                inputRef={inputCommentRef}
                classId={classId}
                postId={post._id}
                setComments={setComments}
              />
            ))}

          {/* Form Submit Comment */}
          {(canComment || isRoot) && (
            <InputComment
              inputRef={inputCommentRef}
              replyTo={replyTo}
              setReplyTo={setReplyTo}
              postId={post?._id}
              classId={post?.classId}
              setComments={setComments}
            />
          )}
        </div>
      )}
    </Card>
  );
};

export default Post;
