import React, { Fragment } from "react";
import OurCollectionSection from "../../components/Client/Collections/OurCollectionSection";

import ImageSlider from "../../components/Client/Gallary/ImageSlider";
import AllCollectionsTopProducts from "../../components/Client/Collections/AllCollectionsTopProducts";
import FeaturedItems from "../../components/Client/FeaturedItems";

const UserPage = () => {
  return (
    <Fragment>
      <ImageSlider/>
      <OurCollectionSection />
      <AllCollectionsTopProducts />
      <FeaturedItems
        title={"Feature Products"}
        productCount={8}
        topRating={false}
      />
    </Fragment>
  );
};

export default UserPage;
