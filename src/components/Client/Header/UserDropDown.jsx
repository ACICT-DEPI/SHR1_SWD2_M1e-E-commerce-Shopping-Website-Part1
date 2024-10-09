import React, { useRef, useState } from 'react';
import { Avatar } from 'primereact/avatar';
import { Menu } from 'primereact/menu';
import { useNavigate } from 'react-router-dom';
import { Toast } from "primereact/toast"; // PrimeReact Toast
import { SlArrowDown } from 'react-icons/sl'; // Import arrow icon
import axios from 'axios';

const UserDropdown = ({ firstname, avatarUrl }) => {
  const navigate = useNavigate();
  const toast = useRef(null); // Toast reference
  const menuRef = useRef(null);
  const [visible, setVisible] = useState(false); // State to manage visibility of menu

  // Dropdown items
  const items = [
    { label: 'Profile', icon: 'pi pi-user', command: () => navigate(`/profile/:${firstname}`) },
    { label: 'Orders', icon: 'pi pi-shopping-cart', command: () => navigate('/orders') },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => handleLogout() },
  ];

  // Custom template for the user section (avatar + firstname)
  const selectedTemplate = () => (
    <div className="flex items-center space-x-2">
      <Avatar image={avatarUrl} shape="circle" size="large" className="mr-2" />
      <div className="text-left">
        <span className="font-bold text-gray-800 dark:text-gray-200">{firstname}</span> {/* Show firstname */}
      </div>
      <SlArrowDown className={`transition-transform duration-300 ${visible ? 'rotate-180' : ''}`} /> {/* Arrow icon */}
    </div>
  );

  const handleMenuToggle = (e) => {
    menuRef.current.toggle(e);
    setVisible(!visible); // Toggle visibility state
  };

  const handleLogout = async () => {
    try {
      // Make an API call to logout
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

  return (
    <div className="user-dropdown relative">
      <Toast ref={toast} position="bottom-left" />

      {/* Button to show the menu */}
      <button
        type="button"
        className="flex items-center bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 border rounded-md px-4 py-2 shadow-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200"
        onClick={handleMenuToggle}
      >
        {selectedTemplate()}
      </button>

      {/* PrimeReact Menu */}
      <Menu
        model={items}
        popup
        ref={menuRef}
        onHide={() => {
          menuRef.current.hide();
          setVisible(false); // Reset visibility when hidden
        }}
        className="p-menu-overlay bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg"
        // Style adjustments for the menu
      />
    </div>
  );
};

export default UserDropdown;
