import React, { Fragment } from "react";
import DataTabel from "../../components/Admin/DataTabel/DataTabel";
import DefaultLayout from "../../layout/DefaultLayout";
import OurCollectionSection from "../../components/Client/Collections/OurCollectionSection";
import { useSelector } from "react-redux";
import AllCollections from "../Client/AllCollectionsPage";
import CollectionProduct from "../../components/Client/Collections/CollectionProduct";
import Card from "../../components/Client/Card/Card";
import FeaturedItems from "../../components/Client/FeaturedItems";
import UserLayout from "../../layout/UserLayout";
const Ahmed = () => {
  return (
    <Fragment>
      <UserLayout>
        <main className="bg-white">
          <OurCollectionSection />
          {/* <AllCollections /> */}
          {/* <CollectionProduct /> */}
          <FeaturedItems
            title={"Feature Products"}
            productCount={8}
            topRating={false}
          />
        </main>
      </UserLayout>
    </Fragment>
  );
};

export default Ahmed;
