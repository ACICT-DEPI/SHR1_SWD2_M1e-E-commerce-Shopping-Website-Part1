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
import CollectionTopProducts from "../../components/Client/Collections/CollectionTopProducts";
import AllCollectionsTopProducts from "../../components/Client/Collections/AllCollectionsTopProducts";
import CardSection from "../../components/Admin/Dashboard/CardSection";
import ChartSection from "../../components/Admin/Dashboard/ChartSection";
import TabelSection from "../../components/Admin/Dashboard/TabelSection";

const Ahmed = () => {
  return (
    <Fragment>
      {/* <UserLayout>
        <OurCollectionSection />
        <AllCollections />
        <CollectionProduct />
        <FeaturedItems
          title={"Feature Products"}
          productCount={8}
          topRating={false}
        />
        <CollectionTopProducts productCount={8} topRating={true} />
        <AllCollectionsTopProducts />
      </UserLayout> */}
      <DefaultLayout>
        <CardSection />
        <ChartSection />
        <TabelSection />
      </DefaultLayout>
    </Fragment>
  );
};

export default Ahmed;
