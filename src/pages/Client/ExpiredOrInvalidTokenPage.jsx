import React, { useRef } from "react";
import GoBackButton from "../../components/Admin/Buttons/GoBackButton";
import { Toast } from "primereact/toast"; // Importing the Toast component

const ExpiredOrInvalidTokenPage = () => {
  const toast = useRef(null);
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Toast ref={toast} />
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Token expired or invalid</p>
      <HomeButton />
    </div>
  );
};

const HomeButton = () => <GoBackButton />;

export default ExpiredOrInvalidTokenPage;
