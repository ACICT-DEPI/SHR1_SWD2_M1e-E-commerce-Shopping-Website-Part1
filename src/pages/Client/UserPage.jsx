import React, { Fragment } from "react";
import OurCollectionSection from "../../components/Client/Collections/OurCollectionSection";
import ImageSlider from "../../components/Client/Gallary/ImageSlider";
const UserPage = () => {
  return (
    <Fragment>
      <ImageSlider/>
      <OurCollectionSection />
    </Fragment>
  );
};

export default UserPage;
