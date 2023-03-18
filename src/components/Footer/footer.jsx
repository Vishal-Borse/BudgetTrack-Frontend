import styles from "./footer.module.css";
import { FcLike } from "react-icons/fc";

const Footer = () => {
  return(
    <div className={styles.footer}>
    <p className={styles.left}>BudgetTrack@2023</p>
    <p className={styles.right}>
      Made with <FcLike /> by Vishal
    </p>
  </div>
  )
  
};

export default Footer;