import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Footer from "../.././components/Footer/footer";
import Navbar from "../.././components/Navbar/navbar";
import styles from "./signup.module.css";
import { isValidEmail } from "../Utilis/isValidEmail";
import axios from "axios";

const SignUp = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formLoading, setFormLoading] = useState(false);

  const submissionHandler = async () => {
    if (!firstName) {
      toast.error("Enter First Name");
      return;
    }
    if (!lastName) {
      toast.error("Enter Last Name");
      return;
    }
    if (!isValidEmail(email)) {
      toast.error("Enter Valid Email");
      return;
    }
    if (!password) {
      toast.error("Enter Password");
      return;
    }
    setFormLoading(true);

    const formData = {
      userFirstName: firstName,
      userLastName: lastName,
      userEmail: email,
      userPassword: password,
    };

    try {
      const url = `${process.env.BASE_URL}/signup`;
      const response = await axios.post(url, formData);

      if (response.status === 201) {
        navigate("/signin");
        return;
      }
    } catch (error) {
      console.log(error);
      if (error.response.status === 400) {
        toast.success("user already registered");
        navigate("/signin");
      }
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      }
    }

    setFormLoading(false);
  };
  return (
    <div>
      <Navbar />
      <div className={styles.UserRegistration}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>User Registration</h2>

          <form className={styles.form}>
            <div className={styles.inputField}>
              <label>First Name</label>
              <input
                type="text"
                placeholder="First Name"
                className={styles.input}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className={styles.inputField}>
              <label>Last Name</label>
              <input
                type="text"
                placeholder="Last Name"
                className={styles.input}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
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
                value="Register"
                className={styles.btn}
                onClick={submissionHandler}
                disabled={formLoading}
                // onClick={notify}
              />
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
