import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';

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
  <a
    href="/"
    className="flex items-center px-4 py-2 bg-gray-300 dark:bg-gray-600 text-gray-700 dark:text-gray-100 font-semibold rounded-md hover:bg-gray-400 dark:hover:bg-gray-500 transition duration-150"
  >
    <FiArrowLeft className="mr-2" /> Go Back Home
  </a>
);

export default NotFoundPage;
