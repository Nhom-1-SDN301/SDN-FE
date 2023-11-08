// ** React
import { Fragment, useEffect, useMemo, useState } from "react";

// ** Reactstrap
import {
  Button,
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

// ** Images
import defaultPic from "../../../../assets/images/logo/bg_class_default.jpg";

// ** Icons
import {
  Copy,
  Edit2,
  Eye,
  MoreVertical,
  RefreshCcw,
  XSquare,
} from "react-feather";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Styles
import styles from "../style.module.scss";

// ** Redux
import { useSelector } from "react-redux";

// ** Components
import PostForm from "./PostForm";
import PostList from "./PostList";

// ** Third libs
import { CopyToClipboard } from "react-copy-to-clipboard";

// ** Apis
import { classApi } from "../../../../@core/api/quiz/classApi";
import toast from "react-hot-toast";
import ModalViewZoomCode from "./ModalViewZoomCode";
import ModalTurnOffCode from "./ModalTurnOffCode";
import ModalEditClass from "./ModalEditClass";

const StreamTabContent = ({ klass, setKlass }) => {
  // ** Hooks
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [posts, setPosts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [limit] = useState(5);
  const [hasMorePost, setHasMorePost] = useState(false);

  const [loadingFetchPost, setLoadingFetchPost] = useState(false);

  const [openModalViewCode, setOpenModalViewCode] = useState(false);
  const [openModalturnOffCode, setOpenModalTurnOffCode] = useState(false);
  const [openModalEditClass, setOpenModalEditClass] = useState(false);

  useEffect(() => {
    if (klass?._id) fetchingPosts({ classId: klass?._id, limit, offset });
  }, [klass?._id, limit, offset]);

  // ** Handler
  const fetchingPosts = ({ classId, limit, offset }) => {
    setLoadingFetchPost(true);
    classApi
      .getPostsOfClass({
        classId,
        limit,
        offset,
      })
      .then(({ data }) => {
        setPosts((prev) => [...prev, ...data.data.posts]);
        setHasMorePost(data.data.isHasMore);
      })
      .finally(() => {
        setLoadingFetchPost(false);
      });
  };

  const handleCopy = () => {
    toast.success(t("message.copiedToClipboard"));
  };

  const handleResetClassCode = () => {
    classApi
      .resetInviteCode({ classId: klass?._id })
      .then(({ data }) => {
        if (data.isSuccess) {
          setKlass(data.data.class);
          toast.success(t("message.resetInviteCodeSuccess"));
        } else {
          toast.error(data.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.err(err?.message || t("error.unknow"));
      });
  };

  const handleTurnOffClassCode = () => {
    setOpenModalTurnOffCode(true);
  };

  const handleTurnOnCode = () => {
    classApi
      .resetInviteCode({ classId: klass?._id })
      .then(({ data }) => {
        if (data.isSuccess) {
          setKlass(data.data.class);
          toast.success(t("message.turnOnInviteCodeSuccess"));
        } else {
          toast.error(data.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.error(err.message || t("error.unknow"));
      });
  };

  const canPost = useMemo(() => {
    if (klass && user) {
      return klass.members.find((mem) => mem.userId === user._id)?.canPost;
    }
    return false;
  }, [user, klass]);

  const canComment = useMemo(() => {
    if (klass && user) {
      return klass.members.find((mem) => mem.userId === user._id)?.canComment;
    }
    return false;
  }, [user, klass]);

  return (
    <Fragment>
      <Card className={styles.bg_class} style={{ position: "relative" }}>
        <img
          src={klass?.picture || defaultPic}
          style={{
            borderRadius: "inherit",
            objectFit: "cover",
            minHeight: 200,
            maxHeight: 320,
            overflow: "hidden",
          }}
        />
        <Button.Ripple
          color="primary"
          style={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "flex",
            alignItems: "center",
          }}
          onClick={() => setOpenModalEditClass(true)}
        >
          <Edit2 size={16} />
          <span style={{ marginLeft: ".5rem" }}>{t("fieldName.edit")}</span>
        </Button.Ripple>
        <h2
          className="text-white"
          style={{
            position: "absolute",
            bottom: "1rem",
            left: "1rem",
            maxWidth: "calc(100% - 2rem)",
            textOverflow: "ellipsis",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          {klass?.name}
        </h2>
      </Card>
      <Row>
        <Col className="hidden-xs" md={3}>
          <Card style={{ padding: "1rem" }}>
            <div className="d-flex justify-content-between align-items-center">
              <h4 style={{ margin: 0 }}>
                {klass?.inviteCode
                  ? t("title.classCode")
                  : t("title.classCodeDisabled")}
              </h4>
              {klass?.inviteCode && (
                <UncontrolledDropdown direction="down">
                  <DropdownToggle
                    color="flat-primary"
                    style={{ padding: ".5rem", borderRadius: "50%" }}
                  >
                    <MoreVertical size={18} />
                  </DropdownToggle>
                  <DropdownMenu end>
                    <CopyToClipboard
                      onCopy={handleCopy}
                      text={klass?.inviteCode}
                    >
                      <DropdownItem
                        style={{
                          width: 200,
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <>
                          <Copy size={16} />
                          <span style={{ marginLeft: ".5rem" }}>
                            {t("fieldName.copy")}
                          </span>
                        </>
                      </DropdownItem>
                    </CopyToClipboard>
                    {klass?.userId === user?._id && (
                      <Fragment>
                        <DropdownItem
                          style={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={handleResetClassCode}
                        >
                          <RefreshCcw size={16} />
                          <span style={{ marginLeft: ".5rem" }}>
                            {t("fieldName.reset")}
                          </span>
                        </DropdownItem>
                        <DropdownItem
                          style={{
                            width: 200,
                            display: "flex",
                            alignItems: "center",
                          }}
                          onClick={handleTurnOffClassCode}
                        >
                          <XSquare size={16} />
                          <span style={{ marginLeft: ".5rem" }}>
                            {t("fieldName.turnOff")}
                          </span>
                        </DropdownItem>
                      </Fragment>
                    )}
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            </div>
            {klass?.inviteCode ? (
              <div style={{ margin: "2rem 0" }}>
                <h2
                  style={{
                    textAlign: "center",
                    fontWeight: 700,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  {klass?.inviteCode}
                  <Button
                    color="flat-primary"
                    style={{
                      padding: ".5rem",
                      marginLeft: ".25rem",
                      borderRadius: "50%",
                    }}
                    onClick={() => setOpenModalViewCode(true)}
                  >
                    <Eye size={18} />
                  </Button>
                </h2>
              </div>
            ) : (
              <div style={{ margin: "2rem 0" }}>
                <h5
                  className={`${styles.fakeATag} text-primary`}
                  onClick={handleTurnOnCode}
                >
                  {t("fieldName.enable")}
                </h5>
              </div>
            )}
          </Card>
        </Col>
        <Col md={9}>
          {(user._id === klass?.userId || canPost) && (
            <PostForm classId={klass?._id} setPosts={setPosts} />
          )}
          {user && klass && (
            <PostList
              posts={posts}
              setPosts={setPosts}
              loadingFetchPost={loadingFetchPost}
              classId={klass._id}
              canComment={canComment}
              isRoot={user._id === klass?.userId}
              hasMorePost={hasMorePost}
              setOffset={setOffset}
            />
          )}
        </Col>
      </Row>

      {/* Modal */}
      <ModalViewZoomCode
        open={openModalViewCode}
        setOpen={setOpenModalViewCode}
        code={klass?.inviteCode}
      />

      <ModalTurnOffCode
        open={openModalturnOffCode}
        setOpen={setOpenModalTurnOffCode}
        setKlass={setKlass}
        klass={klass}
      />

      <ModalEditClass
        open={openModalEditClass}
        setOpen={setOpenModalEditClass}
        klass={klass}
        setKlass={setKlass}
      />
    </Fragment>
  );
};

export default StreamTabContent;
