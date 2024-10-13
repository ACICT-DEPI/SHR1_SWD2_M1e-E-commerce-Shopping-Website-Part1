import { Button } from "primereact/button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { buttonsStyle } from "../../../layout/buttonsStyle";
import { FiEdit } from "react-icons/fi"; // Import FiEdit icon
import "primeicons/primeicons.css";

const EditButton = ({ path, label }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(path);
  };

  return (
    <Fragment>
      <Button
        label={label}
        icon={<FiEdit className="mr-2" />} // Set the icon to FiEdit
        onClick={handleButtonClick}
        className={`text-white bg-blue-600 hover:bg-blue-500 dark:bg-blue-700 dark:hover:bg-blue-600 ${buttonsStyle} px-4 py-2`} // Apply the desired styles
        size="normal"
      />
    </Fragment>
  );
};

export default EditButton;
