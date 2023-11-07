// ** Reactstrap
import {
  Card,
  Col,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row,
  UncontrolledDropdown,
} from "reactstrap";

// ** Images
import defaultPic from "../../../assets/images/logo/bg_class_default.jpg";
import defaultAvatar from "../../../assets/images/portrait/small/avatar-s-11.jpg";

// ** Styles
import styles from "./style.module.scss";

// ** Icons
import { Copy, MoreHorizontal } from "react-feather";

// ** I18n
import { useTranslation } from "react-i18next";

// ** Redux
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ClassItem = ({ image, name, id, author }) => {
  // ** Hooks
  const { t } = useTranslation();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);

  return (
    <Col lg="3" md="4">
      <Card style={{ position: "relative", paddingBottom: ".5rem" }}>
        <img
          src={image || defaultPic}
          style={{
            borderTopLeftRadius: "inherit",
            borderTopRightRadius: "inherit",
            height: 100,
            width: "100%",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => navigate(`/classroom/${id}`)}
        />
        <div
          style={{
            position: "absolute",
            top: "1rem",
            left: "1rem",
            maxWidth: "calc(100% - 2rem)",
          }}
        >
          <h4
            className={`${styles.link} text-white`}
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {name}
          </h4>
        </div>
        <div
          style={{
            position: "absolute",
            top: "76px",
            left: "1rem",
            maxWidth: "calc(100% - 8rem)",
          }}
        >
          <h6
            className={`${styles.link} text-white`}
            style={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              whiteSpace: "nowrap",
            }}
          >
            {author?.fullName}
          </h6>
        </div>
        <div style={{ height: 70, position: "relative" }}>
          <img
            src={author?.picture || defaultAvatar}
            style={{
              borderRadius: "50%",
              width: 70,
              height: 70,
              position: "absolute",
              right: 16,
              top: -35,
              objectFit: "cover",
            }}
          />
        </div>
        <hr />
        <div
          style={{
            padding: "0 .5rem",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <div></div>
          <div>
            <UncontrolledDropdown direction="down">
              <DropdownToggle
                color="flat-primary"
                style={{ padding: ".5rem", borderRadius: "50%" }}
              >
                <MoreHorizontal size={16} />
              </DropdownToggle>
              <DropdownMenu end>
                {author._id === user._id ? (
                  <>
                    <DropdownItem
                      href="#"
                      tag="a"
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
                      href="#"
                      tag="a"
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
                  </>
                ) : (
                  <>
                    <DropdownItem
                      href="#"
                      tag="a"
                      style={{
                        width: 200,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <span style={{ marginLeft: ".5rem" }}>
                        {t("fieldName.unenrol")}
                      </span>
                    </DropdownItem>
                  </>
                )}
              </DropdownMenu>
            </UncontrolledDropdown>
          </div>
        </div>
      </Card>
    </Col>
  );
};

export default ClassItem;
