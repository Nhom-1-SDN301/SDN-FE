// ** Reactstrap
import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap";

// ** React
import { useState } from "react";
import { useSelector } from "react-redux";

// ** Styles
import styles from "./style.module.scss";

// ** Icons
import { Copy, Flag, MoreHorizontal, Share, Trash } from "react-feather";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Components
import Avatar from "@components/avatar";
import ModalShare from "./ModalShare";
import ModalReport from "./ModalReport";

// ** Third libs
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// ** Apis
import { studySetApi } from "../../../@core/api/quiz";

const MySwal = withReactContent(Swal);

const Author = ({ author, isAuthor, studySet }) => {
  // ** Hooks
  const { t } = useTranslation();
  const user = useSelector((state) => state.auth.user);
  const [openModalShare, setOpenModalShare] = useState(false);
  const [openModalReport, setOpenModalReport] = useState(false);

  // ** Handler
  const handleDelete = (e) => {
    e.preventDefault();

    MySwal.fire({
      title: t("message.areYouSure"),
      text: t("message.delete"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("fieldName.confirmDelete"),
      cancelButtonText: t("fieldName.cancel"),
      customClass: {
        confirmButton: `btn btn-danger`,
        cancelButton: "btn btn-secondary ms-1",
      },
      buttonsStyling: false,
    })
      .then(({ isConfirmed }) => {
        if (isConfirmed)
          return studySetApi.deleteStudySet({ studySetId: studySet?._id });
      })
      .then((resp) => {
        if (!resp) return;

        if (resp.data.isSuccess) {
          toast.success(
            t("message.deleteSuccess", { value: t("fieldName.studySet") })
          );
        } else {
          toast.error(resp.data.message);
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      });
  };

  const handleCopy = () => {};

  return (
    <div className={styles.author_container}>
      <div className={styles.author_container__item}>
        <div className={`${styles.user} d-flex align-items-center`}>
          <Avatar
            img={
              author?.picture ||
              "/src/assets/images/portrait/small/avatar-s-11.jpg"
            }
            imgWidth={40}
            imgHeight={40}
          />
          <div
            className={styles.fullName}
            style={{ fontSize: "1.25rem", fontWeight: 600, marginLeft: "1rem" }}
          >
            {author?.fullName}
          </div>
        </div>
        <div className="d-flex">
          {isAuthor && (
            <Button.Ripple
              className="d-flex align-items-center"
              color="primary"
              outline
              style={{ marginRight: ".5rem" }}
              onClick={() => setOpenModalShare(true)}
            >
              <Share size={16} />
              <span style={{ marginLeft: ".5rem" }}>
                {t("fieldName.share")}
              </span>
            </Button.Ripple>
          )}
          <UncontrolledDropdown direction="up">
            <DropdownToggle color="primary" outline>
              <MoreHorizontal size={16} />
            </DropdownToggle>
            <DropdownMenu end>
              <DropdownItem
                href="/"
                tag="a"
                style={{ width: 200, display: "flex", alignItems: "center" }}
                onClick={handleCopy}
              >
                <Copy size={20} />
                <span style={{ marginLeft: ".5rem" }}>
                  {t("fieldName.copy")}
                </span>
              </DropdownItem>
              {(studySet?.user?._id === user?._id ||
                user?.role?.id === 1 ||
                user?.role?.id === 2) && (
                <DropdownItem
                  href="/"
                  tag="a"
                  style={{ width: 200, display: "flex", alignItems: "center" }}
                  onClick={handleDelete}
                >
                  <Trash size={20} />
                  <span style={{ marginLeft: ".5rem" }}>
                    {t("fieldName.delete")}
                  </span>
                </DropdownItem>
              )}
              {studySet?.user?._id !== user?._id && (
                <DropdownItem
                  href="/"
                  tag="a"
                  style={{ width: 200, display: "flex", alignItems: "center" }}
                  onClick={(e) => {
                    e.preventDefault();
                    setOpenModalReport(true);
                  }}
                >
                  <Flag size={20} />
                  <span style={{ marginLeft: ".5rem" }}>
                    {t("fieldName.report")}
                  </span>
                </DropdownItem>
              )}
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>

      {/* Modal */}
      <ModalShare open={openModalShare} setOpen={setOpenModalShare} />

      <ModalReport
        open={openModalReport}
        setOpen={setOpenModalReport}
        studySetId={studySet?._id}
      />
    </div>
  );
};

export default Author;
