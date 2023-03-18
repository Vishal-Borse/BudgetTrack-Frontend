import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    try{
        const url = "http://localhost:8081/dashboard/logout";
        const response = axios.get(url, { withCredentials: true });
        console.log(response);
        navigate("/");
      } catch (error) {
        toast.error(error.response.data.message);
      }
  }, []);
  return;
};

export default Logout;
