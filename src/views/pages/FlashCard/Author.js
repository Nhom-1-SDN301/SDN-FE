// ** Reactstrap
import { Button } from "reactstrap";

// ** Styles
import styles from "./style.module.scss";

// ** Components
import Avatar from "@components/avatar";
import { MoreHorizontal, Share } from "react-feather";

const Author = ({ author }) => {
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
          <Button.Ripple
            className="d-flex align-items-center"
            color="primary"
            outline
            style={{ marginRight: '.5rem' }}
          >
            <Share size={16} />
            <span style={{ marginLeft: ".5rem" }}>Share</span>
          </Button.Ripple>
          <Button.Ripple color="primary" outline>
            <MoreHorizontal size={16} />
          </Button.Ripple>
        </div>
      </div>
    </div>
  );
};

export default Author;
