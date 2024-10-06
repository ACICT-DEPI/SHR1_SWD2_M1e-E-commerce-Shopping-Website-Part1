import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import GoBackButton from '../../components/Admin/Buttons/GoBackButton';

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
      <h1 className="text-6xl font-bold mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <HomeButton />
    </div>
  );
};

const HomeButton = () => (
 <GoBackButton />
);

export default NotFoundPage;
