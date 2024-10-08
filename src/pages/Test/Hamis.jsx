import React, { useEffect, useState } from "react";
import DefaultLayout from "../../layout/DefaultLayout";
import { useSelector } from "react-redux";
import Login from "../Client/Login";
import Register from "../Client/Register";
import Orders from "../Admin/Orders/Orders";
import ContactPage from "../Client/ContactPage";
import ForgotPassword from "../Client/ForgetPassword";
import NotFoundPage from "../Client/NotFoundPage";
import ProfilePage from "../Client/ProfilePage";
import ResetPassword from "../Client/ResetPassword";
import AuthLinks from "../../components/Client/AuthLinks";
import UserDropdown from "../../components/Client/UserDropDown";
import axios from "axios";

const Hamis = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState(''); // State to store firstname

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/profile",
          {
            withCredentials: true,
          }
        );
        console.log(response);
        setIsAuthenticated(response.data.isAuthenticated);
        setFirstname(response.data.firstname); // Assuming API returns the firstname
      } catch (error) {
        console.log(error.response);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <div>
      {isAuthenticated ? (
        <UserDropdown username={firstname} /> // Pass firstname as username prop
      ) : (
        <AuthLinks /> // Render AuthLinks if not authenticated
      )}
    </div>
  );
};

export default Hamis;
