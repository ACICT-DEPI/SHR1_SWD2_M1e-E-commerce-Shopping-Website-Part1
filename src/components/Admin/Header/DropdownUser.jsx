import React, { useState } from "react";
import { SlArrowDown } from "react-icons/sl"; // Arrow icon
import DropdownList from "./DropdownList"; // Import the dropdown list

const DropdownUser = () => {
  const [visible, setVisible] = useState(false); // State to control visibility of dropdown

  // Function to handle sign out (Optional)
  const handleSignOut = () => {
    console.log("User signed out");
    setVisible(false); // Close the dropdown after sign out
  };

  return (
    <li className="relative">
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setVisible(!visible)} // Toggle dropdown visibility
      >
        <span className="hidden lg:block text-right">
          <span className="block text-sm font-medium text-black dark:text-white">
            Thomas Anree
          </span>
          <span className="block text-xs">admin</span>
        </span>
        <span className="h-12 w-12 rounded-full">
          <img src={require("./../../../imgs/test_image.png")} alt="User" />
        </span>
        <SlArrowDown
          className={`fill-body dark:fill-bodydark ${
            visible ? "rotate-180" : ""
          }`}
        />{" "}
        {/* Arrow rotation */}
      </div>

      {/* Show DropdownList only if visible */}
      {visible && (
        <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg z-20">
          <DropdownList handleSignOut={handleSignOut} />
        </div>
      )}
    </li>
  );
};

export default DropdownUser;
