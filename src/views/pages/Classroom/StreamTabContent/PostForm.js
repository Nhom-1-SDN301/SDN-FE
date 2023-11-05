// ** React
import { Fragment, useEffect, useRef, useState } from "react";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Reactstrap
import { Button, Card, Col, Row, Spinner } from "reactstrap";

// ** Third libs
import { EditorState, convertToRaw } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { Editor } from "react-draft-wysiwyg";
import { v4 as uuidV4 } from "uuid";
import toast from "react-hot-toast";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import styles from "../style.module.scss";

// ** Images
import defaultPic from "../../../../assets/images/portrait/small/avatar-s-11.jpg";

// ** Components
import Avatar from "@components/avatar";

// ** Redux
import { useSelector } from "react-redux";

// ** Icons
import { Upload, X } from "react-feather";

// ** Utils
import { useSkin } from "../../../../utility/hooks/useSkin";

// ** Apis
import { classApi } from "../../../../@core/api/quiz";

const PostForm = ({ classId, setPosts }) => {
  // ** Hooks
  const { t } = useTranslation();
  const { skin } = useSkin();
  const user = useSelector((state) => state.auth.user);
  const inputFileRef = useRef(null);
  const [enablePost, setEnablePost] = useState(false);
  const [value, setValue] = useState(EditorState.createEmpty());
  const [files, setFiles] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  // ** Handler
  const handlePost = () => {
    if (!value.getCurrentContent().getPlainText().trim()) return;

    const html = draftToHtml(convertToRaw(value.getCurrentContent()));

    const body = new FormData();

    body.append("content", html);

    images.forEach((image) => {
      body.append("file", image);
    });

    files.forEach((file) => {
      body.append("file", file);
    });

    setLoading(true);
    classApi
      .createPost({
        classId,
        data: body,
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setImages([]);
          setFiles([]);
          setValue(EditorState.createEmpty());
          setEnablePost(false);
          setPosts((prev) => [data.data.post, ...prev]);
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

  const handleOpenUpload = () => {
    inputFileRef.current.click();
  };

  const handleProgessFiles = (e) => {
    const filesOnUpload = e.target.files;

    const imagesUpload = [];
    const filesUpload = [];

    for (let i = 0; i < filesOnUpload.length; ++i) {
      filesOnUpload[i].id = uuidV4();
      if (filesOnUpload[i].type.includes("image")) {
        imagesUpload.push(filesOnUpload[i]);
      } else filesUpload.push(filesOnUpload[i]);
    }

    setImages([...images, ...imagesUpload]);
    setFiles([...files, ...filesUpload]);

    inputFileRef.current.value = null;
  };

  const handleDeleteFile = (id) => {
    setFiles((prev) => prev.filter((file) => file.id !== id));
  };

  const handleDeleteImage = (id) => {
    setImages((prev) => prev.filter((image) => image.id !== id));
  };

  return (
    <Fragment>
      {enablePost ? (
        <Card style={{ padding: "1rem" }}>
          <Editor
            toolbar={{
              options: [
                "inline",
                "blockType",
                "fontSize",
                "fontFamily",
                "list",
                "textAlign",
                "link",
                "embedded",
                "emoji",
                "image",
                "remove",
                "history",
              ],
            }}
            editorState={value}
            onEditorStateChange={(data) => setValue(data)}
            placeholder={t("common.placeholder.postClass")}
          />
          {images.length > 0 && (
            <div
              style={{
                width: "100%",
                whiteSpace: "nowrap",
                height: 160,
                overflowX: "auto",
                overflowY: "hidden",
                marginTop: "1rem",
              }}
            >
              {images.map((img) => (
                <span className={styles.itemImage} key={img.id}>
                  <img
                    style={{
                      width: 160,
                      height: 160,
                      objectFit: "cover",
                    }}
                    src={URL.createObjectURL(img)}
                  />
                  <span
                    className={styles.itemImage_delete}
                    onClick={() => handleDeleteImage(img.id)}
                  >
                    <X size={24} />
                  </span>
                </span>
              ))}
            </div>
          )}
          {files.length > 0 && (
            <Row
              style={{
                marginTop: "1rem",
              }}
            >
              {files.map((file) => (
                <Col key={file.id} md={3}>
                  <div
                    className={styles.itemFile}
                    style={{
                      padding: "1rem",
                      borderRadius: 4,
                      textAlign: "center",
                      outline: `1px solid ${
                        skin === "dark" ? "#404656" : "#d8d6de"
                      }`,
                    }}
                  >
                    <span>{file.name}</span>
                    <span
                      className={styles.itemFile_delete}
                      onClick={() => handleDeleteFile(file.id)}
                    >
                      <X size={24} />
                    </span>
                  </div>
                </Col>
              ))}
            </Row>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "1rem",
            }}
          >
            <Button color="flat-primary" onClick={handleOpenUpload}>
              <Upload size={18} />
            </Button>
            <input
              ref={inputFileRef}
              multiple
              accept="image/*, .docx, .csv, .zip, .txt, .rar"
              type="file"
              style={{ visibility: "hidden" }}
              onChange={handleProgessFiles}
            />
            <div>
              <Button.Ripple
                color="primary"
                style={{ float: "right" }}
                onClick={handlePost}
                disabled={loading}
              >
                {loading && <Spinner style={{ width: 12, height: 12 }} />}
                <span style={{ marginLeft: ".25rem" }}>
                  {t("fieldName.post")}
                </span>
              </Button.Ripple>
              <Button.Ripple
                style={{ float: "right", marginRight: ".5rem" }}
                onClick={() => setEnablePost(false)}
                disabled={loading}
              >
                {t("fieldName.cancel")}
              </Button.Ripple>
            </div>
          </div>
        </Card>
      ) : (
        <Card
          className={styles.postDisabled}
          style={{ padding: "1rem" }}
          onClick={() => setEnablePost(true)}
        >
          <div className="d-flex justify-content-start align-items-center">
            <Avatar
              className="me-1"
              img={user?.picture || defaultPic}
              imgHeight="50"
              imgWidth="50"
            />
            <div>
              <h6 className="mb-0">{t("common.placeholder.postClass")}</h6>
            </div>
          </div>
        </Card>
      )}
    </Fragment>
  );
};

export default PostForm;
