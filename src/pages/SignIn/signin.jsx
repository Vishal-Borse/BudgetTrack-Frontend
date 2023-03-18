import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../.././components/Footer/footer";
import Navbar from "../.././components/Navbar/navbar";
import styles from "./signin.module.css";
import axios from "axios";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const loginUser = async () => {
    if (!email) {
      toast.error("Enter Email");
      return;
    }
    if (!password) {
      toast.error("Enter Password");
      return;
    }
    setFormLoading(true);

    const formData = {
      userEmail: email,
      userPassword: password,
    };

    console.log(formData);
    try {
      const url = "http://localhost:8081/signin";
      const response = await axios.post(url, formData, {withCredentials: true});
      console.log(response);
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/signup")
    }
    setFormLoading(false);
  };
  return (
    <div>
      <Navbar />
      <div className={styles.UserRegistration}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>User Login</h2>

          <form className={styles.form}>
            <div className={styles.inputField}>
              <label>Email</label>
              <input
                type="email"
                placeholder="Email"
                className={styles.input}
                required={true}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <label>Password</label>
              <input
                type="Password"
                placeholder="Password"
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <input
                type="submit"
                value="Login"
                className={styles.btn}
                onClick={loginUser}
                disabled={formLoading}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Signin;
