import styles from "./personalTransaction.module.css";
import { ImCancelCircle } from "react-icons/im";
import { useState } from "react";
// import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const PersonalTransaction = ({ closeCallback }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState();
  const [purpose, setPurpose] = useState();
  const [amount, setAmount] = useState();
  const [formLoading, setFormLoading] = useState(false);

  const addTransaction = async () => {
    if (!category) {
      toast.error("Select Category");
      return;
    }
    if (!purpose) {
      toast.error("Enter Purpose");
      return;
    }
    if (!amount) {
      toast.error("Enter Amount");
      return;
    }
    setFormLoading(true);

    const formData = {
      transactionPurpose: purpose,
      transactionAmount: amount,
      transactionCategory: category,
    };

    console.log(formData);

    try {
      const url = "http://localhost:8081/dashboard/personaltransaction";
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      console.log(response);
      navigate(0);
    } catch (error) {
      toast.error(error.response.data.message);
      navigate("/dashboard");
    }
    setFormLoading(false);
  };

  return (
    <div className={styles.background_container}>
      <form className={styles.card}>
        <div className={styles.cancel_btn_div}>
          <ImCancelCircle
            className={styles.cancel_btn}
            onClick={closeCallback}
          />
        </div>
        <div className={styles.heading}>
          <h1>Create Personal Transaction</h1>
        </div>
        <div className={styles.data_fields}>
          <div className={styles.upper_input}>
            <div className={styles.inputField}>
              <label>Purpose</label>
              <input
                type="text"
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                placeholder="eg. Dinner at Restaurant"
                className={styles.input}
                required={true}
              />
            </div>
          </div>
          <div className={styles.lower_inputs}>
            <div className={styles.inputField}>
              <label>Amount</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="$0.00"
                className={styles.input}
                required={true}
              />
            </div>
            <div className={styles.inputField}>
              <label>Choose Category</label>
              <div>
                <select
                  className={styles.select_categories}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option>Categories</option>
                  <option value="shopping">Shopping</option>
                  <option value="essentials">Essentials</option>
                  <option value="health">Health</option>
                  <option value="food">Food</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.inputs_btn}>
          <button onClick={addTransaction} disabled={formLoading}>
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalTransaction;
