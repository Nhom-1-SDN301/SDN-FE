// Styles
import { Card } from "reactstrap";
import styles from "./style.module.scss";

// ** Icons
import { Edit2, Volume2 } from "react-feather";

// ** Hooks
import { useTranslation } from "react-i18next";

const Detail = ({ studySet, data }) => {
  const { t } = useTranslation();
  console.log(data);
  return (
    <div className={styles.detail_container}>
      <div className={styles.detail_container__item}>
        <div className={styles.description}>
          {studySet?.description || "test description"}
        </div>
        <div className={styles.detail_data}>
          <div className="mb-2">
            <h3>{`${t("title.termInThisSet")} (${data?.length})`}</h3>
          </div>
          <div className={styles.detail_data__main}>
            {data?.map((term) => (
              <Card className={styles.detail_data__main_item}>
                <div className="d-flex" style={{ width: "calc(100% - 6rem)" }}>
                  <div
                    style={{
                      width: "40%",
                      paddingRight: "1rem",
                      borderRight: "1px solid #ccc",
                    }}
                  >
                    {term.term}
                  </div>
                  <div style={{ width: "60%", paddingLeft: "1rem" }}>
                    {term.definition}
                  </div>
                </div>
                <div
                  style={{
                    width: "6rem",
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <div className={styles.item}>
                    <Edit2 className={styles.item_icon} size={16} />
                  </div>
                  <div className={styles.item}>
                    <Volume2 className={styles.item_icon} size={16} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
