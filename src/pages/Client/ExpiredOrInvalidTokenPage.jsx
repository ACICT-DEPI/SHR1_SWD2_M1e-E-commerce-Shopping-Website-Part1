import React, { useEffect, useRef } from "react";
import GoBackButton from "../../components/Admin/Buttons/GoBackButton";
import { Toast } from "primereact/toast"; // Importing the Toast component
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { buttonsStyle } from "../../layout/buttonsStyle";

const ExpiredOrInvalidTokenPage = () => {
  const navigate = useNavigate();
  const toast = useRef(null); // Reference for Toast

  // Show the toast notification when the page loads
  useEffect(() => {
    toast.current.show({
      severity: 'error', // Error level toast
      summary: 'Reset Link Expired',
      detail: 'The password reset link has expired or is invalid. Please request a new link.',
      life: 5000, // Duration of the toast in milliseconds
    });
  }, []); // Empty dependency array ensures it runs once when the component loads

  const handleRequestNewLink = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Request Sent',
      detail: 'Redirecting to request a new password reset link.',
      life: 3000,
    });

    setTimeout(() => {
      navigate('/forget-password'); // Adjust the path to your reset request page
    }, 2000); // 3 seconds delay before navigating
  };

  const handleGoToLogin = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Navigating to Login',
      detail: 'Redirecting to the login page.',
      life: 3000,
    });

    setTimeout(() => {
      navigate('/login');
    }, 2000); // 3 seconds delay before navigating
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Toast ref={toast} position='bottom-left'/> {/* Toast component for notifications */}
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-center">
        <h1 className="text-2xl md:text-4xl font-bold mb-4 text-red-600">Reset Link Expired</h1>
        <p className="text-gray-700 dark:text-gray-300 mb-8">
          The password reset link has expired or is invalid. Please request a new link.
        </p>
        <button
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full mb-4"
          onClick={handleRequestNewLink}
        >
          Request New Password Reset
        </button>
        <Button
          icon="pi pi-arrow-left"
          onClick={handleGoToLogin}
          size="small"
          className="shadow-none drop-shadow-none"
          pt={buttonsStyle}
          severity="secondary"
          outlined
        />
      </div>
    </div>
  );
};

const HomeButton = () => <GoBackButton />;

export default ExpiredOrInvalidTokenPage;
