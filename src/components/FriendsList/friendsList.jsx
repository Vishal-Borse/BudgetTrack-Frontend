import styles from "./friendsList.module.css";
import { ImCancelCircle } from "react-icons/im";
import { CgProfile } from "react-icons/cg";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const FriendsList = ({ closeCallback }) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [friend, setFriend] = useState("");
  const [users, setUsers] = useState([]);

  const addFriend = async () => {
    setFriend("");

    if (!friend) {
      toast.error("Enter friend Email");
      return;
    }
    const isPresent = friends.some((item) => item === friend);

    if (isPresent) {
      toast.error("Friend already present");
      return;
    }

    const formData = {
      friendEmail: friend,
    };
    try {
      const url = `${process.env.BASE_URL}/dashboard/addfriend`;

      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
      return;
    }
    const newmembers = [...friends, friend];
    setFriends(newmembers);
  };
  useEffect(() => {
    const getFriends = async () => {
      try {
        const response = await axios.get(
          "https://budget-track-backend.onrender.com/dashboard/getfriends",
          {
            withCredentials: true,
          }
        );
        setFriends(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [navigate]);

  return (
    <div className={styles.background_container}>
      <div className={styles.card}>
        <div className={styles.cancel_btn_div}>
          <ImCancelCircle
            className={styles.cancel_btn}
            onClick={closeCallback}
          />
        </div>
        <div className={styles.heading}>
          <h1>Your Friends</h1>
        </div>
        <div className={styles.list}>
          {friends?.map((friend) => {
            return (
              <li>
                <CgProfile className={styles.profile_icon} />
                {friend}
              </li>
            );
          })}
        </div>
        <div className={styles.inputs_btn}>
          <input
            placeholder="Enter Friend Email"
            type="text"
            className={styles.friend_input}
            value={friend}
            onChange={(e) => setFriend(e.target.value)}
          ></input>
          <button type="button" onClick={addFriend}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
};
export default FriendsList;
