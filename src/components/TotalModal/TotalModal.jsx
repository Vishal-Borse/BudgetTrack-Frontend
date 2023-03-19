import styles from "./TotalModal.module.css";
import { useState } from "react";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const TotalModal = ({ closeCallback }) => {
  const navigate = useNavigate();
  const [amount, setAmount] = useState();
  const [formLoading, setFormLoading] = useState(false);

  const addAmount = async () => {
    if (!amount) {
      toast.error("Enter Amount");
      return;
    }
    setFormLoading(true);

    const data = {
      amount: amount,
    };
    try {
      const url = `${process.env.BASE_URL}/dashboard/addamount`;
      const response = await axios.post(url, data, { withCredentials: true });
      navigate(0);
      
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setFormLoading(false);
  };
  return (
    <div className={styles.TotalModal}>
      <div className={styles.container}>
        <div className={styles.cancel_btn_div}>
          <ImCancelCircle
            className={styles.cancel_btn}
            onClick={closeCallback}
          />
        </div>
        <div className={styles.heading}>
          <h1>Add Income</h1>
        </div>

        <div className={styles.inputs_btn}>
          <form>
            <input
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="$0.00"
              type="number"
              className={styles.amount_input}
            ></input>
            <button onClick={addAmount} disabled={formLoading}>
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TotalModal;
