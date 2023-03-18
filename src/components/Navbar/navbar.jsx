import styles from "./navbar.module.css";
// import { FcLike } from "react-icons/fc";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <h1>
          <strong>Budget</strong>Track
        </h1>
      </div>
      <div className={styles.buttons}>
      <Link to={"/"} className={styles.signin}>
          Home
        </Link>
        <Link to={"/signin"} className={styles.signin}>
          Sign in
        </Link>
        <Link to={"/signup"} className={styles.signup}>
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
