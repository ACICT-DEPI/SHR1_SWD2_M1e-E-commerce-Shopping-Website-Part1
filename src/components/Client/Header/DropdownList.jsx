import React from "react";

const DropdownList = ({ items }) => {
  return (
    <ul className="py-1">
      {items.map((item, index) => (
        <li
          key={index}
          className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={item.command} // Trigger the command for each item
        >
          <i className={`${item.icon} mr-2`}></i> {/* Render icon */}
          {item.label} {/* Render label */}
        </li>
      ))}
    </ul>
  );
};

export default DropdownList;
