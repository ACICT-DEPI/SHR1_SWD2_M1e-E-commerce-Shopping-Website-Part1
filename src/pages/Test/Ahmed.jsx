import React, { Fragment } from "react";
import DataTabel from "../../components/Admin/DataTabel/DataTabel";
import DefaultLayout from "../../layout/DefaultLayout";
import OurCollectionSection from "../../components/Client/Collections/OurCollectionSection";
import { useSelector } from "react-redux";
import AllCollections from "../Client/AllCollectionsPage";
import CollectionProduct from "../../components/Client/Collections/CollectionProduct";
import Card from "../../components/Client/Card/Card";

const Ahmed = () => {
  return (
    <Fragment>
      <main className="bg-white">
        <OurCollectionSection />
        {/* <AllCollections /> */}
        <CollectionProduct />
      </main>
    </Fragment>
  );
};

export default Ahmed;
