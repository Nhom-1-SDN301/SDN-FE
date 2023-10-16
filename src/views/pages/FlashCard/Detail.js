// Styles
import { Card } from "reactstrap";
import styles from "./style.module.scss";

// ** Icons
import { Edit2, Volume2 } from "react-feather";

// ** Hooks
import { useTranslation } from "react-i18next";
import { useState } from "react";

// ** Antd
import { Image } from "antd";
import ModalUpdateTerm from "./ModalUpdateTerm";

// ** Endpoint
import { QUIZ_IMAGES_URL } from "../../../@core/constants";

const Detail = ({ studySet, data, isAuthor, setData }) => {
  // ** Hooks
  const { t } = useTranslation();
  const [selectEditTerm, setSelectEditTerm] = useState(null);

  // ** Handler
  // console.log(selectEditTerm);

  return (
    <div className={styles.detail_container}>
      <div className={styles.detail_container__item}>
        <div className={styles.description}>
          {studySet?.description || "description"}
        </div>
        <div className={styles.detail_data}>
          <div className="mb-2">
            <h3>{`${t("title.termInThisSet")} (${data?.length || 0})`}</h3>
          </div>
          <div className={styles.detail_data__main}>
            {data?.map((term) => (
              <Card key={term._id} className={styles.detail_data__main_item}>
                <div className="d-flex" style={{ width: "calc(100% - 6rem)" }}>
                  <div
                    style={{
                      width: "40%",
                      fontSize: "1.2rem",
                      paddingRight: "1rem",
                      borderRight: "1px solid rgba(204,204,204,0.6)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {term.name}
                  </div>
                  <div
                    className="d-flex justify-content-between"
                    style={{
                      width: "60%",
                      paddingLeft: "1rem",
                      fontSize: "1.2rem",
                    }}
                  >
                    <div style={{ whiteSpace: "pre-wrap" }}>
                      {term.definition}
                    </div>
                    <div style={{ marginRight: "1rem" }}>
                      {term.picture && (
                        <Image
                          width={60}
                          src={`${QUIZ_IMAGES_URL}/${term.picture}`}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    width: "6rem",
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    justifyContent: "center",
                  }}
                >
                  {isAuthor && (
                    <div
                      className={styles.item}
                      onClick={() => setSelectEditTerm(term)}
                    >
                      <Edit2 className={styles.item_icon} size={16} />
                    </div>
                  )}
                  <div className={styles.item}>
                    <Volume2 className={styles.item_icon} size={16} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Modal */}
      <ModalUpdateTerm
        key={selectEditTerm?._id}
        term={selectEditTerm}
        setTerm={setSelectEditTerm}
        setData={setData}
      />
    </div>
  );
};

export default Detail;
