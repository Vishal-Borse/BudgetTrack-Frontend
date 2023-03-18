import { Link } from "react-router-dom";
import styles from "./home.module.css";
import Photo from "./images/budget.png";
import Footer from "../.././components/Footer/footer.jsx";
import Navbar from "../.././components/Navbar/navbar.jsx";

const Home = () => {
  return (
    <div className={styles.Home}>
      <Navbar />
      <div className={styles.content}>
        <div className={styles.info}>
          <h1>
            <strong>Save</strong> Money,
          </h1>
          <h1>without thinking</h1>
          <h1>about it.</h1>
          <p>
            BudgetTrack analyzes your spending and automatically saves the
            perfect amount everyday. so you don't have to think about it
          </p>
          <button className={styles.info_signup}>Sign up</button>
        </div>
        <div className={styles.image}>
          <img src={Photo} alt="image"></img>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
