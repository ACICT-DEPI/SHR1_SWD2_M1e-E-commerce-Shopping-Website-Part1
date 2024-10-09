import React, { useState, useRef } from "react";
import { SlArrowDown } from "react-icons/sl"; // Arrow icon
import DropdownList from "./DropdownList"; // Import the dropdown list
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from 'primereact/toast'; // Assuming you use PrimeReact for toasts

const UserDropdown = ({ firstname, avatarUrl}) => {
  const [visible, setVisible] = useState(false); // State to control visibility of dropdown
  const navigate = useNavigate(); // To navigate between pages
  const toast = useRef(null); // Reference for toast notifications

  // Function to handle logout
  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/logout", // Your API logout route
        {},
        { withCredentials: true }
      );
      // Show success message
      toast.current.show({
        severity: "success",
        summary: "Success",
        detail: response.data.message,
        life: 3000,
      });

      // Redirect to login page after 1 second
      setTimeout(() => {
        window.location.href = "/login";
      }, 1000);
    } catch (err) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to log out. Please try again.",
        life: 3000,
      });
    }
  };

  // Dropdown items
  const items = [
    { label: 'Profile', icon: 'pi pi-user', command: () => navigate(`/profile/${firstname}`) },
    { label: 'Orders', icon: 'pi pi-shopping-cart', command: () => navigate('/orders') },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => handleLogout() },
  ];

  return (
    <li className="relative">
      {/* Toast Component for Notifications */}
      <Toast ref={toast} />

      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setVisible(!visible)} // Toggle dropdown visibility
      >
        {/* Display user first name and role */}
        <span className="hidden lg:block text-right">
          <span className="block text-sm font-medium text-black dark:text-white">
            {firstname}
          </span>
        </span>

        {/* Display avatar */}
        <span className="h-12 w-12 rounded-full">
          <img src={avatarUrl} alt="User" className="rounded-full" />
        </span>

        {/* Arrow rotation */}
        <SlArrowDown
          className={`fill-body dark:fill-bodydark ${
            visible ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Show DropdownList only if visible */}
      {visible && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-20">
          <DropdownList items={items} /> {/* Pass dropdown items */}
        </div>
      )}
    </li>
  );
};

export default UserDropdown;
