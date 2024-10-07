import React from "react";
import GoBackButton from "../../components/Admin/Buttons/GoBackButton";

const UnauthorizedPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-6xl font-bold mb-4">401</h1>
      <p className="text-xl mb-8">Unauthorized Page</p>
      <HomeButton />
    </div>
  );
};
const HomeButton = () => <GoBackButton />;

export default UnauthorizedPage;
