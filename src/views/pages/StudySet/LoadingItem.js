// ** Mui
import { Skeleton } from "@mui/material";

// ** Reacstrap
import { Row } from "reactstrap";

// ** Styles
import styles from './style.module.scss';

const LoadingItem = () => {
  return (
    <Row style={{ padding: '0 1rem' }}>
      <Skeleton
        className={styles.card_skeleton}
        variant="rounded"
        height={110}
      />
      <Skeleton
        className={styles.card_skeleton}
        variant="rounded"
        height={110}
      />
      <Skeleton
        className={styles.card_skeleton}
        variant="rounded"
        height={110}
      />
      <Skeleton
        className={styles.card_skeleton}
        variant="rounded"
        height={110}
      />
      <Skeleton
        className={styles.card_skeleton}
        variant="rounded"
        height={110}
      />
    </Row>
  );
};

export default LoadingItem;
