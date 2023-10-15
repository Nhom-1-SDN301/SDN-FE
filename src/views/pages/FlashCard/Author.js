// ** Reactstrap
import { Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledDropdown } from "reactstrap";

// ** React
import { useState } from "react";

// ** Styles
import styles from "./style.module.scss";

// ** Icons
import { MoreHorizontal, Share } from "react-feather";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Components
import Avatar from "@components/avatar";
import ModalShare from "./ModalShare";

const Author = ({ author, isAuthor }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [openModalShare, setOpenModalShare] = useState(false);

  return (
    <div className={styles.author_container}>
      <div className={styles.author_container__item}>
        <div className={`${styles.user} d-flex align-items-center`}>
          <Avatar
            img={
              author?.avatar ||
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
              <DropdownItem href="/" tag="a">
                Option 1
              </DropdownItem>
              <DropdownItem href="/" tag="a">
                Option 2
              </DropdownItem>
              <DropdownItem href="/" tag="a">
                Option 3
              </DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        </div>
      </div>

      {/* Modal */}
      <ModalShare open={openModalShare} setOpen={setOpenModalShare} />
    </div>
  );
};

export default Author;
