import styles from "./groupTransaction.module.css";
import { ImCancelCircle } from "react-icons/im";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const GroupTransaction = ({ closeCallback }) => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("");
  const [purpose, setPurpose] = useState("");
  const [amount, setAmount] = useState();

  const [members, setMembers] = useState([]);
  const [member, setMember] = useState("");
  const [friends, setFriends] = useState([]);
  const [formLoading, setFormLoading] = useState(false);

  const addGroupTransaction = async () => {
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
      allMembers : members,
    };

    console.log(formData);

    try {
      const url = "http://localhost:8081/dashboard/grouptransaction";
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      console.log(response);
      navigate(0);
    } catch (error) {
      toast.error(error.response.data.message);
    }
    setFormLoading(false);
  };

  const memberAddHandler = async () => {
    setMember("");
    if (!member) {
      toast.error("Enter Member Email");
      return;
    }
    const isPresent = members.some((item) => item === member);

    if (isPresent) {
      toast.error("Member already added");
      return;
    }

    const isFriend = friends.some((item) => item === member);

    if (!isFriend) {
      toast.error("This person is not your friend");
      return;
    }
    const newmembers = [...members, member];
    setMembers(newmembers);
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8081/dashboard/getfriends",
          {
            withCredentials: true,
          }
        );
        console.log("request response :" + response.data);
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [navigate]);

  console.log(friends);

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
          <h1>Create Group Transaction</h1>
        </div>
        <div className={styles.data_fields}>
          <div className={styles.upper_input}>
            <div className={styles.inputField}>
              <label>Purpose</label>
              <input
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                type="text"
                placeholder="eg. Dinner at Restaurant"
                className={styles.input}
                required={true}
              />
            </div>
          </div>
          <div className={styles.lower_inputs}>
            <div className={styles.inputField}>
              <label>Total Amount</label>
              <input
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
                placeholder="$0.00"
                className={styles.input}
                required={true}
              />
            </div>
            <div className={styles.inputField}>
              <label>Choose Category</label>
              <div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={styles.select_categories}
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
        <div className={styles.members_add}>
          <div className={styles.members_head}>
            <div>
              <label>Memebers</label>
            </div>
            <div className={styles.memebrs_input}>
              <input
                type="text"
                placeholder="eg. abc@gmail.com"
                className={styles.input}
                required={true}
                value={member}
                onChange={(e) => setMember(e.target.value)}
              />
              <button
                onClick={memberAddHandler}
                type="button"
                className={styles.members_btn}
              >
                Add
              </button>
            </div>
          </div>
          <div className={styles.members_list}>
            {members?.map((email) => {
              return <li>{email}</li>;
            })}
          </div>
        </div>
        <div className={styles.inputs_btn}>
          <button onClick={addGroupTransaction} disabled={formLoading}>
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default GroupTransaction;
