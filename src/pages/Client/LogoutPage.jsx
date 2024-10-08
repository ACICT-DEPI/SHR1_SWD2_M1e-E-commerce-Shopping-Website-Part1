import React from "react";
import { Toast } from "primereact/toast"; // PrimeReact Toast
import { useNavigate } from "react-router-dom"; // For redirection and linking
import axios from "axios"; // Importing axios
import DarkModeSwitcher from "../../components/Admin/Header/DarkModeSwitcher"; // Dark mode switcher

const LogoutPage = () => {
  const toast = React.useRef(null); // Toast reference
  const navigate = useNavigate(); // Navigate for redirection

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

  const handleCancel = () => {
    // Redirect back to home page if user cancels logout
    navigate("/");
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 relative">
      <div className="absolute top-4 right-4">
        <DarkModeSwitcher />
      </div>
      <Toast ref={toast} position="bottom-left" />{" "}
      {/* PrimeReact Toast component */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Are you sure you want to log out?
        </h2>
        <div className="space-y-4">
          {/* Confirm Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full py-2 mt-4 text-white rounded-md bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirm Logout
          </button>

          {/* Cancel Button */}
          <button
            onClick={handleCancel}
            className="w-full py-2 mt-4 text-white rounded-md bg-gray-500 hover:bg-gray-600 dark:bg-gray-600 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
