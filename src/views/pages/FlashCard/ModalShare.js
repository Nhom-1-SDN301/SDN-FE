// ** Reactstrap
import {
  Button,
  Label,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";

// ** React
import { toast } from "react-hot-toast";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Styles
import styles from "./style.module.scss";

// ** Utils
import { selectThemeColors } from "@utils";

// ** Components
import AsyncSelect from "react-select/async";
import { useCallback, useEffect, useRef, useState } from "react";

// ** Icons
import { X } from "react-feather";

// ** Apis
import { studySetApi, userApi } from "../../../@core/api/quiz";

// ** Third libs
import _ from "lodash";
import classNames from "classnames";
import { useParams } from "react-router-dom";

const ModalShare = ({ open, setOpen }) => {
  // ** Hooks
  const { t } = useTranslation();
  const { studySetId } = useParams();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  // ** Handler
  const handleClose = () => {
    setOpen(false);
  };

  const handleLoadOptions = (inputValue, callback) => {
    if (inputValue.trim() === "") return;

    searchDebounce(inputValue, callback, users);
  };

  const searchDebounce = useCallback(
    _.debounce((search, callback, users) => {
      userApi
        .getUsersByEmail({ email: search, studySetId })
        .then(({ data }) => {
          if (data.isSuccess) {
            const options = data.data.users
              .map((user) => ({
                value: user._id,
                label: user.email,
                id: user._id,
                email: user.email,
                fullName: user.fullName,
                picture: user.picture,
              }))
              .filter((user) => !users.find((u) => u.id === user.id));
            callback(options);
          } else {
            callback([]);
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error(t("error.unknow"));
        });
    }, 500),
    []
  );

  const handlePushUser = (user) => {
    setUsers((prev) => [...prev, user]);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleRemoveUser = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleShareToUsers = () => {
    setLoading(true);
    studySetApi
      .shareToUsers({ studySetId, users: users.map((u) => u.id) })
      .then(({ data }) => {
        if (data.isSuccess) {
          setUsers([]);
          setOpen(false);
          toast.success(t("message.shareStudySetSuccess"));
        } else {
          toast.error(data.message);
        }
      })
      .catch((err) => {
        toast.error(t("error.unknow"));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <Modal className="modal-dialog-centered modal-lg" isOpen={open}>
      <ModalHeader toggle={handleClose}>{t("title.shareStudySet")}</ModalHeader>
      <ModalBody>
        <div>
          <Label className="form-label">{t("fieldName.enterEmail")}</Label>
          <AsyncSelect
            ref={(el) => {
              setTimeout(() => {
                el?.focus();
              }, 100);
            }}
            isClearable={false}
            className="react-select"
            classNamePrefix="select"
            name="callback-react-select"
            placeholder={t("common.placeholder.searchWithEmail")}
            loadOptions={handleLoadOptions}
            defaultOptions={[]}
            theme={selectThemeColors}
            onChange={handlePushUser}
            components={{
              Option: ({ innerProps, data, isFocused }) => {
                return (
                  <div
                    className={`${styles.option} ${
                      isFocused && styles.option_selected
                    }`}
                    {...innerProps}
                  >
                    <img
                      src={
                        data.picture ||
                        "/src/assets/images/portrait/small/avatar-s-11.jpg"
                      }
                    />
                    <span>
                      <div className={`${styles.option_fullName}`}>
                        {data.fullName}
                      </div>
                      <div className={`${styles.option_email}`}>
                        {data.email}
                      </div>
                    </span>
                  </div>
                );
              },
            }}
          />
        </div>
        <div className={styles.list_user}>
          {users.map((user) => (
            <div key={user.id} className={styles.list_user__item}>
              <div className={styles.list_user__item_sub}>
                <img
                  src={
                    user.picture ||
                    "/src/assets/images/portrait/small/avatar-s-11.jpg"
                  }
                />
                <span>
                  <div className={`${styles.option_fullName}`}>
                    {user.fullName}
                  </div>
                  <div className={`${styles.option_email}`}>{user.email}</div>
                </span>
              </div>
              <div>
                <X
                  className={styles.delete_icon}
                  onClick={() => handleRemoveUser(user.id)}
                />
              </div>
            </div>
          ))}
        </div>
      </ModalBody>
      <ModalFooter>
        <Button.Ripple
          color="secondary"
          onClick={handleCancel}
          disabled={loading}
        >
          {t("fieldName.cancel")}
        </Button.Ripple>
        <Button.Ripple
          color="primary"
          type="submit"
          disabled={loading}
          onClick={handleShareToUsers}
        >
          {loading && <Spinner color="white" size="sm" />}
          <span className={classNames({ "ms-50": loading })}>
            {t("fieldName.submit")}
          </span>
        </Button.Ripple>
      </ModalFooter>
    </Modal>
  );
};

export default ModalShare;
