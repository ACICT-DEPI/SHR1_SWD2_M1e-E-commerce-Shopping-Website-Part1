import { Button } from "primereact/button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { buttonsStyle } from "../../../layout/buttonsStyle";
import "primeicons/primeicons.css";

const AddButton = ({ path, label }) => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(path);
  };

  return (
    <Fragment>
      <Button
        label={label}
        icon="pi pi-plus"
        onClick={handleButtonClick}
        size="normal"
        className="text-base"
        pt={buttonsStyle}
      />
    </Fragment>
  );
};
export default AddButton;
