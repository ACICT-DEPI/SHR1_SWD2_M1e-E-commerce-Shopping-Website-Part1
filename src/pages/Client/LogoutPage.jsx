import React, { useRef } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { Toast } from 'primereact/toast';  // Import Toast from PrimeReact
import 'primereact/resources/primereact.min.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primeicons/primeicons.css';
import DarkModeSwitcher from "../../components/Admin/Header/DarkModeSwitcher";

const LogoutPage = () => {
  const toast = useRef(null); // Create a reference for the Toast component

  const handleLogout = async () => {
    try {
      await axios.post(`http://localhost:5000/api/v1/users/logout`, {}, { withCredentials: true });
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'You have been logged out successfully.', life: 3000 });
    
    } catch (error) {
      console.error("Error logging out:", error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to log out. Please try again.', life: 3000 });
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8 font-inter">
      <Toast ref={toast} /> {/* Add Toast component */}
      
      {/* Dark Mode Switcher */}
      <div className="flex justify-end mb-4">
        <DarkModeSwitcher />
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex">
        <div className="w-full text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Logout
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Are you sure you want to log out of your account?
          </p>

          <div className="flex justify-center space-x-4">
            <button
              onClick={handleLogout}
              className="px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
            >
              Confirm Logout
            </button>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogoutPage;
