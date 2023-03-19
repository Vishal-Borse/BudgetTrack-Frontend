import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../.././pages/Utilis/helper"

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try{
        const url = `${BASE_URL}/dashboard/logout`;
        const response = axios.get(url, { withCredentials: true });
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }, []);
  return;
};

export default Logout;
