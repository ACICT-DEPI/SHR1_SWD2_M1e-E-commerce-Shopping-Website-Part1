import { Button } from "primereact/button";
import { Fragment } from "react";
import { useNavigate } from "react-router-dom";
import { buttonsStyle } from "../../../layout/buttonsStyle";
import "primeicons/primeicons.css";

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(-1);
  };

  return (
    <Fragment>
      <Button
        icon="pi pi-arrow-left"
        onClick={handleButtonClick}
        size="small"
        className="shadow-none drop-shadow-none"
        pt={buttonsStyle}
        severity="secondary"
        outlined
      />
    </Fragment>
  );
};
export default GoBackButton;
