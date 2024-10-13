import React from 'react';
import { FiEdit, FiTrash2, FiArrowLeft, FiX } from 'react-icons/fi';

// Button configuration based on type
const buttonConfig = {
  edit: {
    icon: <FiEdit className="mr-2" />,
    bgColor: 'bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600',
    textColor: 'text-white',
    additionalClasses: 'px-4 py-2',
  },
  delete: {
    icon: <FiTrash2 className="mr-2" />,
    bgColor: 'bg-red-600 hover:bg-red-500 dark:bg-red-700 dark:hover:bg-red-600',
    textColor: 'text-white',
    additionalClasses: 'px-4 py-2',
  },
  back: {
    icon: <FiArrowLeft className="mr-2" />,
    bgColor: 'bg-gray-300 hover:bg-gray-400 dark:bg-gray-600 dark:hover:bg-gray-500',
    textColor: 'text-gray-700 dark:text-gray-100',
    additionalClasses: 'px-4 py-2 mb-4',
  },
  viewDetails: {
    icon: null,
    bgColor: 'bg-gradient-to-r from-indigo-600 to-indigo-500 dark:from-indigo-500 dark:to-indigo-400',
    textColor: 'text-white',
    additionalClasses: 'px-6 py-3 mt-4 transform hover:scale-105 shadow-lg hover:shadow-xl transition-transform duration-200 ease-in-out',
  },
  cancel: {
    icon: <FiX className="mr-2" />,
    bgColor: 'bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600',
    textColor: 'text-white',
    additionalClasses: 'px-4 py-2',
  },
  default: {
    icon: null,
    bgColor: 'bg-gray-600 hover:bg-gray-500 dark:bg-gray-700 dark:hover:bg-gray-600',
    textColor: 'text-white',
    additionalClasses: 'px-4 py-2',
  }
};

const ActionButton = ({ type = 'default', label, onClick }) => {
  const { icon, bgColor, textColor, additionalClasses } = buttonConfig[type] || buttonConfig.default;

  return (
    <button
      onClick={onClick} // Directly call the onClick function
      className={`flex items-center ${bgColor} ${textColor} rounded-md transition duration-150 ease-in-out ${additionalClasses}`}
    >
      {icon}
      {label}
    </button>
  );
};

export default ActionButton;
