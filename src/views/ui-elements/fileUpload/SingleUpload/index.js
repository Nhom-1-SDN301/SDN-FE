// ** React
import { Fragment, useState } from "react";

// ** Third Party Imports
import { useDropzone } from "react-dropzone";
import { FileText, X, DownloadCloud } from "react-feather";
import { Image } from "antd";

// ** Styles
import "@styles/react/libs/file-uploader/file-uploader.scss";
import { Button, ListGroup, ListGroupItem } from "reactstrap";
import { QUIZ_IMAGES_URL } from "../../../../@core/constants";

const SingleUpload = ({ style, image, setImage, file, setFile }) => {
  // ** Hooks
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    accept: { "image/jpeg": [], "image/png": [] },
    onDrop: (acceptedFiles) => {
      setFile(acceptedFiles[0]);
      setImage(null);
    },
  });

  // ** Renderer
  const renderFilePreview = (file) => {
    if (file.type.startsWith("image")) {
      return (
        <Image
          className="rounded"
          alt={file.name}
          src={URL.createObjectURL(file)}
          style={{ width: 60, height: 60 }}
        />
      );
    } else {
      return <FileText size="28" />;
    }
  };

  const renderFileSize = (size) => {
    if (Math.round(size / 100) / 10 > 1000) {
      return `${(Math.round(size / 100) / 10000).toFixed(1)} mb`;
    } else {
      return `${(Math.round(size / 100) / 10).toFixed(1)} kb`;
    }
  };

  const fileRender = (file) => (
    <ListGroupItem
      key={`${file.name}`}
      className="d-flex align-items-center justify-content-between"
    >
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">{renderFilePreview(file)}</div>
        <div>
          <p className="file-name mb-0">{file.name}</p>
          <p className="file-size mb-0">{renderFileSize(file.size)}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveFile()}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  );

  const imageRender = (image) => (
    <ListGroupItem className="d-flex align-items-center justify-content-between">
      <div className="file-details d-flex align-items-center">
        <div className="file-preview me-1">
          <Image
            className="rounded"
            src={`${QUIZ_IMAGES_URL}/${image}`}
            style={{ width: 60, height: 60 }}
          />
        </div>
        <div>
          <p className="file-name mb-0">{image}</p>
        </div>
      </div>
      <Button
        color="danger"
        outline
        size="sm"
        className="btn-icon"
        onClick={() => handleRemoveImage()}
      >
        <X size={14} />
      </Button>
    </ListGroupItem>
  );

  const handleRemoveFile = () => {
    setFile(null);
  };

  const handleRemoveImage = () => {
    setImage(null);
  };

  return (
    <div>
      <div {...getRootProps({ className: "dropzone" })} style={style}>
        <input {...getInputProps()} />
        <div className="d-flex align-items-center justify-content-center flex-column">
          <DownloadCloud size={64} />
          <h5>Drop Files here or click to upload</h5>
          <p className="text-secondary">
            Drop files here or click{" "}
            <a href="/" onClick={(e) => e.preventDefault()}>
              browse
            </a>{" "}
            thorough your machine
          </p>
        </div>
      </div>
      {file ? (
        <Fragment>
          <ListGroup className="my-2">{fileRender(file)}</ListGroup>
          <div className="d-flex justify-content-end"></div>
        </Fragment>
      ) : null}
      {image && (
        <Fragment>
          <ListGroup className="my-2">{imageRender(image)}</ListGroup>
          <div className="d-flex justify-content-end"></div>
        </Fragment>
      )}
    </div>
  );
};

export default SingleUpload;
