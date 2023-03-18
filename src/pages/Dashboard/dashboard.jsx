import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CgProfile } from "react-icons/cg";
import { Link } from "react-router-dom";
import { MdOutlineFilterList } from "react-icons/md";
import { MdOutlineDateRange } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { RiEmotionSadLine } from "react-icons/ri";
// import {FaShoppingCart} from "react-icons/fa";
// import {IoFastFoodSharp} from "react-icons/io";
// import {MdHealthAndSafety} from "react-icons/md";
// import {BsFillBasketFill} from "react-icons/bs";
// import {BsFillFilterSquareFill} from "react-icons/bs";
import { FcBearish } from "react-icons/fc";
import { MdGroupAdd } from "react-icons/md";
import { BsPencilSquare } from "react-icons/bs";
import { MdCancel } from "react-icons/md";
import { BsPlusCircleFill } from "react-icons/bs";
import styles from "./dashboard.module.css";
import Footer from "../.././components/Footer/footer";
import TotalModal from "../../components/TotalModal/TotalModal";
import FriendsList from "../../components/FriendsList/friendsList";
import PersonalTransaction from "../../components/PersonalTransaction/personalTransaction";
import GroupTransaction from "../../components/GroupTransaction/groupTransaction";
import UpdateTransaction from "../../components/UpdateTransaction/updateTransaction";
import { formatDate } from "../Utilis/formatDate";
import Loading from "../../components/Loading/loading";

const Dashboard = () => {
  // const transactionLogoArray = [FaShoppingCart,IoFastFoodSharp,MdHealthAndSafety,BsFillBasketFill,BsFillFilterSquareFill];
  const navigate = useNavigate();
  const [user, setUserData] = useState(null);
  const [userTransactions, setUserTransactions] = useState(null);
  const [userPayRequests, setUserPayRequests] = useState(null);
  // const [transactionsforFilter, setTransactionsforFilter] = useState(null);

  const [isTotalModalOpen, setIsTotalModalOpen] = useState(false);
  const [isFriendsListOpen, setIsFriendsListOpen] = useState(false);
  const [isAddPersonalTransactionOpen, setIsAddPersonalTransactionOpen] =
    useState(false);
  const [isAddGroupTransactionOpen, setIsAddGroupTransactionOpen] =
    useState(false);
  const [isUpdateTransactionOpen, setIsUpdateTransactionOpen] = useState(false);

  var [filters, setFilters] = useState({});
  const [filter, setFilter] = useState("");

  const handleToggleTotalModal = () => {
    setIsTotalModalOpen(!isTotalModalOpen);
  };

  const handleToggleFriendsList = () => {
    setIsFriendsListOpen(!isFriendsListOpen);
  };

  const handleTogglePersonalTransaction = () => {
    setIsAddPersonalTransactionOpen(!isAddPersonalTransactionOpen);
  };

  const handleToggleGroupTransaction = () => {
    setIsAddGroupTransactionOpen(!isAddGroupTransactionOpen);
  };
  const handleToggleUpdateTransaction = () => {
    setIsUpdateTransactionOpen(!isUpdateTransactionOpen);
  };

  const deleteTransaction = async (ID, amount) => {
    const formData = {
      transactionId: ID,
      transactionAmount: amount,
    };
    console.log(formData);
    try {
      const url = "https://budget-track-backend.onrender.com/dashboard/deletetransaction";
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };
  const clearPayRequest = async (ID) => {
    const formData = {
      payrequestId: ID,
    };
    console.log(formData);
    try {
      const url = "https://budget-track-backend.onrender.com/dashboard/clearpayrequest";
      const response = await axios.post(url, formData, {
        withCredentials: true,
      });
      window.location.reload();
      console.log(response);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const getDashboard = async () => {
      try {
        const url1 = "https://budget-track-backend.onrender.com/dashboard";
        const response1 = await axios.get(url1, { withCredentials: true });
        const userDetails = response1.data;
        console.log(userDetails);

        const url2 = "https://budget-track-backend.onrender.com/dashboard/gettransactions";
        const response2 = await axios.get(url2, { withCredentials: true });
        const transactions = response2.data;
        console.log(transactions);

        const url3 = "https://budget-track-backend.onrender.com/dashboard/getpayrequests";
        const response3 = await axios.get(url3, { withCredentials: true });
        const payRequests = response3.data;
        console.log(payRequests);

        setUserData(userDetails);
        setUserTransactions(transactions);
        // setTransactionsforFilter(transactions);
        setUserPayRequests(payRequests);
      } catch (error) {
        console.log(error);
        navigate("/signin");
      }
    };
    getDashboard();
  }, [navigate]);

  console.log(user);
  console.log(userTransactions);
  console.log(userPayRequests);

  if (!user) {
    return <Loading />;
  }

  const filterClicked = (filterParams) => {
    setFilters(filterParams);
  };

  const removeFilter = (key) => {
    const newFilters = { ...filters, [key]: undefined };
    setFilters(newFilters);
  };

  const transactionsforFilter = userTransactions.filter((transaction) => {
    if (Object.keys(filters).length === 0) {
      return true;
    }
    return Object.keys(filters).every((key) => {
      if (!filters[key]) {
        return true;
      }
      return transaction[key] === filters[key];
    });
  });
  return (
    <div>
      <div clasName={styles.dashboard}>
        <div className={styles.navbar}>
          <div className={styles.logo}>
            <h1>
              <strong>Budget</strong>Track
            </h1>
          </div>
          <div className={styles.buttons}>
            <button
              onClick={handleToggleFriendsList}
              className={styles.friends}
            >
              Friends
            </button>
            {isFriendsListOpen ? (
              <FriendsList closeCallback={handleToggleFriendsList} />
            ) : null}
            <Link to={"/dashboard/logout"} className={styles.logout}>
              Log out
            </Link>
          </div>
          <div className={styles.profile}>
            <CgProfile className={styles.profile_img} />
            <p>Hii {user.firstName} !</p>
          </div>
        </div>

        <div className={styles.mid_content}>
          <div className={styles.left_transactions}>
            <div className={styles.transactions}>
              <div className={styles.budget}>
                <div>
                  <h4>Income</h4>
                  <p>${user.budget}.00</p>
                </div>
                <div className={styles.addIncome}>
                  <BsPlusCircleFill
                    className={styles.add_income_btn}
                    onClick={handleToggleTotalModal}
                  />
                  {isTotalModalOpen ? (
                    <TotalModal closeCallback={handleToggleTotalModal} />
                  ) : null}
                </div>
              </div>
              <div className={styles.expense}>
                <h4>Expense</h4>
                <p>${user.expenses}.00</p>
              </div>
              <div className={styles.remaining}>
                <h4>Remaining</h4>
                <p>${user.budget - user.expenses}.00</p>
              </div>
            </div>
            <div className={styles.filters}>
              <div className={styles.groupby}>
                <select
                  value={filter}
                  onChange={(e) => {
                    filterClicked({ ...filters, type: e.target.value });
                    // setFilters({ ...filters, type: e.target.value });
                  }}
                  className={styles.select_groupby}
                >
                  <option value="">Sort By</option>
                  <option value="group">Group</option>
                  <option value="personal">Personal</option>
                </select>
                {/* <button>Group By</button>
                <MdOutlineFilterList /> */}
              </div>
              <div className={styles.categories}>
                {/* <button>Categories</button>
                <IoMdArrowDropdown /> */}
                <select
                  className={styles.select_categories}
                  
                  value={filter}
                  onChange={(e) => {
                    filterClicked({ ...filters, category: e.target.value });
                    // setFilters({ ...filters, category: e.target.value });
                  }}
                >
                  <option>Categories</option>
                  <option value="shopping">Shopping</option>
                  <option value="essentials">Essentials</option>
                  <option value="health">Health</option>
                  <option value="food">Food</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className={styles.searchby}>
                {/* <button>Search By</button>
                <MdOutlineDateRange /> */}
                <input
                  className={styles.searchby_date}
                  value={filter}
                  onChange={(e) => {
                    filterClicked({ ...filters, date: e.target.value });
                    // setFilters({ ...filters, date: e.target.value });
                  }}
                  placeholder="Search by"
                  type="date"
                />
              </div>

              <div
                onClick={handleTogglePersonalTransaction}
                className={styles.personal}
              >
                <BsFillPersonPlusFill />
                <button>Personal</button>
              </div>
              {isAddPersonalTransactionOpen ? (
                <PersonalTransaction
                  closeCallback={handleTogglePersonalTransaction}
                />
              ) : null}

              <div
                onClick={handleToggleGroupTransaction}
                className={styles.group_trans}
              >
                <MdGroupAdd />
                <button>Group</button>
              </div>
              {isAddGroupTransactionOpen ? (
                <GroupTransaction
                  closeCallback={handleToggleGroupTransaction}
                />
              ) : null}
            </div>
            <div className={styles.content}>
              <h1>Transactions</h1>
              <p>Number of transactions :{transactionsforFilter.length}</p>
            </div>
            <div className={styles.filter_added}>
              {Object.keys(filters).map((key) => {
                return (
                  filters[key] && (
                    <div className={styles.filter_box}>
                      <p>{filters[key]}</p>
                      <MdCancel
                        onClick={() => removeFilter(key)}
                        className={styles.filter_cancel}
                      />
                    </div>
                  )
                );
              })}
            </div>
            <div className={styles.trans_list}>
              {transactionsforFilter.length > 0 ? (
                transactionsforFilter?.map((transaction) => {
                  return (
                    <div className={styles.trans_item}>
                      <div className={styles.transItem_left}>
                        <div>
                          <FcBearish className={styles.transaction_logo} />
                        </div>
                        <div className={styles.type}>
                          <h1>{transaction.purpose}</h1>
                          <p>{transaction.date}</p>
                        </div>
                      </div>
                      <div className={styles.transItem_right}>
                        <div className={styles.amount}>
                          <h1>${transaction.amount}.00</h1>
                          <p>{transaction.type}</p>
                        </div>
                        <div>
                          <BsPencilSquare
                            onClick={handleToggleUpdateTransaction}
                            className={styles.update}
                          />
                        </div>
                        {isUpdateTransactionOpen ? (
                          <UpdateTransaction
                            closeCallback={handleToggleUpdateTransaction}
                          />
                        ) : null}
                        <div>
                          <MdCancel
                            onClick={() =>
                              deleteTransaction(
                                transaction._id,
                                transaction.amount
                              )
                            }
                            className={styles.cancel}
                          />
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className={styles.nothing_to_show}>
                  <RiEmotionSadLine className={styles.sad_emoji} />
                  <h1>Nothing to Show</h1>
                </div>
              )}
            </div>
          </div>
          <div className={styles.requests}>
            <h1>Pay Requests</h1>
            <hr />
            <ul>
              {userPayRequests.length > 0 ? (
                userPayRequests?.map((payRequests) => {
                  return (
                    <li>
                      <div className={styles.split_info}>
                        <div className={styles.start}>
                          <h1>{payRequests.purpose}</h1>
                          <p>${payRequests.amount}.00</p>
                        </div>
                        <div className={styles.end}>
                          <h2>Created By</h2>
                          <p>{payRequests.createdBy}</p>
                          <p>{payRequests.totalMembers}Members</p>
                        </div>
                      </div>
                      <div>
                        <button
                          type="button"
                          onClick={() => clearPayRequest(payRequests._id)}
                          className={styles.pay_btn}
                        >
                          Pay Now
                        </button>
                      </div>
                    </li>
                  );
                })
              ) : (
                <div className={styles.nothing_to_display}>
                  <RiEmotionSadLine />
                  <h1>Nothing to Display</h1>
                </div>
              )}
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;
