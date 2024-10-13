import React, { useRef } from "react";
import GoBackButton from "../../components/Admin/Buttons/GoBackButton";
import { Toast } from "primereact/toast"; // Importing the Toast component
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { buttonsStyle } from "../../layout/buttonsStyle";

const UnauthorizedPage = () => {
  const navigate = useNavigate();
  const toast = useRef(null); // Reference for Toast
  const handleGoToUserPage = () => {
    toast.current.show({
      severity: 'info',
      summary: 'Navigating to Home Page',
      detail: 'Redirecting to the home page.',
      life: 3000,
    });

    setTimeout(() => {
      navigate('/');
    }, 2000); // 3 seconds delay before navigating
  };
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Toast ref={toast} position='bottom-left'/> {/* Toast component for notifications */}

      <h1 className="text-6xl font-bold mb-4">401</h1>
      <p className="text-xl mb-8">Unauthorized Page</p>
      <Button
          icon="pi pi-arrow-left"
          onClick={handleGoToUserPage}
          size="small"
          className="shadow-none drop-shadow-none"
          pt={buttonsStyle}
          severity="secondary"
          outlined
        />
    </div>
  );
};
const HomeButton = () => <GoBackButton />;

export default UnauthorizedPage;
