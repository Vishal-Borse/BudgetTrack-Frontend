import styles from "./loading.module.css";
// import { FcLike } from "react-icons/fc";
// import { Link } from "react-router-dom";
import classnames from "classnames";

const Loading = () => {
  return (
    <div>
      <div className={styles.middle}>
        <div className={classnames(styles.bar, styles.bar1)}></div>
        <div className={classnames(styles.bar, styles.bar2)}></div>
        <div className={classnames(styles.bar, styles.bar3)}></div>
        <div className={classnames(styles.bar, styles.bar4)}></div>
        <div className={classnames(styles.bar, styles.bar5)}></div>
        <div className={classnames(styles.bar, styles.bar6)}></div>
        <div className={classnames(styles.bar, styles.bar7)}></div>
        <div className={classnames(styles.bar, styles.bar8)}></div>
      </div>
    </div>
  );
};

export default Loading;
