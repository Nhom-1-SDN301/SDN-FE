// ** React Imports
import { useMemo, useState } from "react";

// ** Custom Components
import Avatar from "@components/avatar";

// ** Third Party Components
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, EditorState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import Select, { components } from "react-select";
import {
  Minus,
  X,
  Maximize2,
  Paperclip,
  MoreVertical,
  Trash,
} from "react-feather";

// ** Reactstrap Imports
import {
  Form,
  Label,
  Input,
  Modal,
  Button,
  ModalBody,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
  UncontrolledDropdown,
  UncontrolledButtonDropdown,
  Spinner,
} from "reactstrap";

// ** Utils
import { selectThemeColors } from "@utils";

// ** User Avatars
import defaultPicture from "@src/assets/images/portrait/small/avatar-s-11.jpg";

// ** Styles
import "@styles/react/libs/editor/editor.scss";
import "@styles/react/libs/react-select/_react-select.scss";

// Third libs
import toast from "react-hot-toast";

// ** I18n
import { useTranslation } from "react-i18next";
import { classApi } from "../../../../@core/api/quiz";

const ModalEmail = (props) => {
  // ** Props & Custom Hooks
  const { composeOpen, toggleCompose, members, classId } = props;

  // ** States
  const { t } = useTranslation();
  const [ccOpen, setCCOpen] = useState(false);
  const [bccOpen, setBCCOpen] = useState(false);
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState(EditorState.createEmpty());

  const [loadingSendMail, setLoadingSendMail] = useState(false);

  const selectOptions = useMemo(
    () =>
      members.map((mem) => ({
        value: mem.user._id,
        label: mem.user.fullName,
        img: mem.user.picture || defaultPicture,
        email: mem.user.email,
        id: mem.user._id,
      })),
    [members]
  );

  const SelectComponent = ({ data, ...props }) => {
    return (
      <components.Option {...props}>
        <div className="d-flex flex-wrap align-items-center">
          <Avatar className="my-0 me-50" size="sm" img={data.img} />
          {data.label}
        </div>
      </components.Option>
    );
  };

  // ** CC Toggle Function
  const toggleCC = (e) => {
    e.preventDefault();
    setCCOpen(!ccOpen);
  };

  // ** BCC Toggle Function
  const toggleBCC = (e) => {
    e.preventDefault();
    setBCCOpen(!bccOpen);
  };

  // ** Toggles Compose POPUP
  const togglePopUp = (e) => {
    e.preventDefault();
    toggleCompose();
  };

  const handleSendMail = () => {
    if (subject.trim() === "") {
      return toast.error(
        t("validationMessage.required", { field: t("fieldName.subject") })
      );
    }
    if (!message.getCurrentContent().getPlainText().trim()) {
      return toast.error(
        t("validationMessage.required", { field: t("fieldName.message") })
      );
    }

    const html = draftToHtml(convertToRaw(message.getCurrentContent()));

    setLoadingSendMail(true);
    classApi
      .sendEmailToMembers({
        classId,
        members: selectOptions,
        message: html,
        subject: subject.trim(),
      })
      .then(({ data }) => {
        if (data.isSuccess) {
          setSubject("");
          setMessage(EditorState.createEmpty());
          toggleCompose();
          toast.success(t("message.sendEmailSuccess"));
        } else {
          toast.error(data?.message || t("error.unknow"));
        }
      })
      .catch((err) => {
        toast.error(err?.message || t("error.unknow"));
      })
      .finally(() => {
        setLoadingSendMail(false);
      });
  };

  return (
    <Modal
      scrollable
      fade={false}
      keyboard={false}
      backdrop={false}
      id="compose-mail"
      //   container=".content-body"
      className="modal-lg"
      isOpen={composeOpen}
      contentClassName="p-0"
      toggle={toggleCompose}
      modalClassName="modal-sticky"
    >
      <div className="modal-header">
        <h5 className="modal-title">Mail</h5>
        <div className="modal-actions">
          <a href="/" className="text-body me-75" onClick={togglePopUp}>
            <Minus size={14} />
          </a>
          <a
            href="/"
            className="text-body me-75"
            onClick={(e) => e.preventDefault()}
          >
            <Maximize2 size={14} />
          </a>
          <a href="/" className="text-body" onClick={togglePopUp}>
            <X size={14} />
          </a>
        </div>
      </div>
      <ModalBody className="flex-grow-1 p-0">
        <Form className="compose-form" onSubmit={(e) => e.preventDefault()}>
          <div
            className="compose-mail-form-field d-flex justify-content-center align-items-center"
            style={{ padding: ".5rem 1rem" }}
          >
            <Label
              for="email-to"
              className="form-label"
              style={{ fontSize: "1rem" }}
            >
              To:
            </Label>
            <div className="flex-grow-1">
              <Select
                isMulti
                id="email-to"
                isClearable={false}
                theme={selectThemeColors}
                options={selectOptions}
                className="react-select select-borderless"
                classNamePrefix="select"
                components={{ Option: SelectComponent }}
                value={selectOptions}
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    backgroundColor: "transparent",
                  }),
                }}
              />
            </div>
            <div>
              <a
                href="/"
                className="toggle-cc text-body me-1"
                onClick={toggleCC}
              >
                Cc
              </a>
              <a href="/" className="toggle-cc text-body" onClick={toggleBCC}>
                Bcc
              </a>
            </div>
          </div>
          {ccOpen === true ? (
            <div
              className="compose-mail-form-field cc-wrapper d-flex justify-content-center align-items-center"
              style={{ padding: ".5rem 1rem" }}
            >
              <Label
                for="email-cc"
                className="form-label"
                style={{ fontSize: "1rem" }}
              >
                Cc:
              </Label>
              <div className="flex-grow-1">
                <Select
                  isMulti
                  id="email-cc"
                  isClearable={false}
                  theme={selectThemeColors}
                  options={selectOptions}
                  className="react-select select-borderless"
                  classNamePrefix="select"
                  components={{ Option: SelectComponent }}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: "transparent",
                    }),
                  }}
                />
              </div>
              <div>
                <a href="/" className="toggle-cc text-body" onClick={toggleCC}>
                  <X size={14} />
                </a>
              </div>
            </div>
          ) : null}
          {bccOpen === true ? (
            <div
              className="compose-mail-form-field cc-wrapper d-flex justify-content-center align-items-center"
              style={{ padding: ".5rem 1rem" }}
            >
              <Label
                for="email-bcc"
                className="form-label"
                style={{ fontSize: "1rem" }}
              >
                Bcc:
              </Label>
              <div className="flex-grow-1">
                <Select
                  isMulti
                  id="email-bcc"
                  isClearable={false}
                  theme={selectThemeColors}
                  options={selectOptions}
                  className="react-select select-borderless"
                  classNamePrefix="select"
                  components={{ Option: SelectComponent }}
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      backgroundColor: "transparent",
                    }),
                  }}
                />
              </div>
              <div>
                <a href="/" className="toggle-cc text-body" onClick={toggleBCC}>
                  <X size={14} />
                </a>
              </div>
            </div>
          ) : null}
          <div
            className="compose-mail-form-field d-flex justify-content-center align-items-center border-top border-bottom"
            style={{ padding: ".25rem 1rem" }}
          >
            <Label
              for="email-subject"
              className="form-label"
              style={{ fontSize: "1rem" }}
            >
              Subject:
            </Label>
            <Input
              id="email-subject"
              placeholder="Subject"
              style={{ border: "none", backgroundColor: "transparent" }}
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>
          <div id="message-editor">
            <Editor
              placeholder="Message"
              toolbarClassName="rounded-0"
              wrapperClassName="toolbar-bottom"
              editorClassName="rounded-0 border-0"
              toolbar={{
                options: ["inline", "textAlign"],
                inline: {
                  inDropdown: false,
                  options: ["bold", "italic", "underline", "strikethrough"],
                },
              }}
              editorState={message}
              onEditorStateChange={(data) => setMessage(data)}
            />
          </div>
          <div
            className="compose-footer-wrapper d-flex justify-content-between"
            style={{ padding: ".5rem 1rem" }}
          >
            <div className="btn-wrapper d-flex align-items-center">
              <UncontrolledButtonDropdown direction="up" className="me-1">
                <Button
                  color="primary d-flex align-items-center"
                  onClick={handleSendMail}
                  disabled={loadingSendMail}
                >
                  {loadingSendMail && (
                    <Spinner
                      style={{ width: 16, height: 16, marginRight: ".5rem" }}
                    />
                  )}
                  Send
                </Button>
                <DropdownToggle
                  className="dropdown-toggle-split"
                  color="primary"
                  caret
                ></DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem href="/" tag="a" onClick={togglePopUp}>
                    Schedule Send
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledButtonDropdown>
              <div className="email-attachement">
                <Label className="mb-0" for="attach-email-item">
                  <Paperclip className="cursor-pointer ms-50" size={18} />
                  <input
                    type="file"
                    name="attach-email-item"
                    id="attach-email-item"
                    hidden
                  />
                </Label>
              </div>
            </div>
            <div className="footer-action d-flex align-items-center">
              <UncontrolledDropdown className="me-50" direction="up">
                <DropdownToggle tag="span">
                  <MoreVertical className="cursor-pointer" size={18} />
                </DropdownToggle>
                <DropdownMenu end>
                  <DropdownItem
                    href="/"
                    tag="a"
                    onClick={(e) => e.preventDefault()}
                  >
                    Add Label
                  </DropdownItem>
                  <DropdownItem
                    href="/"
                    tag="a"
                    onClick={(e) => e.preventDefault()}
                  >
                    Plain text mode
                  </DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem
                    href="/"
                    tag="a"
                    onClick={(e) => e.preventDefault()}
                  >
                    Print
                  </DropdownItem>
                  <DropdownItem
                    href="/"
                    tag="a"
                    onClick={(e) => e.preventDefault()}
                  >
                    Check Spelling
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
              <Trash
                className="cursor-pointer"
                size={18}
                onClick={toggleCompose}
              />
            </div>
          </div>
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default ModalEmail;
