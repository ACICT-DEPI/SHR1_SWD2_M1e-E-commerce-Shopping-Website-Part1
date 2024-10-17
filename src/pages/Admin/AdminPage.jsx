import React, { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import DefaultLayout from "../../layout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import Products from "./Products/Products";
import Orders from "./Orders/Orders";
import Customers from "./Customers/Customers";
import Reviews from "./Reviews/Reviews";
import Dashboard from "./Dashboard";
import Collections from "./collections/Collections";
import AddCollection from "./collections/AddCollection";
import UpdateCollection from "./collections/UpdateCollection";
import SingleOrderDetails from "./Orders/SingleOrderDetails";
import SingleCustomerDetails from "./Customers/SingleCustomerDetails";
import { AdminProfile } from "./AdminProfile";
import { ChangePassword } from "./ChangePassword";
import  AddProduct  from "./Products/AddProduct";
import { CarouselsPage } from "./Carousels/CarouselsPage";
import  UpdateCarousels  from "./Carousels/UpdateCarousels";
import  AddCarousels  from "./Carousels/AddCarousels";
import SingleProductPage from "./Products/SingleProductPage";
import  ReviewDetails from "./Reviews/ReviewDetails";

const AdminPage = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <DefaultLayout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="profile/:fullname" element={<AdminProfile />} />
        <Route path="changepassword" element={<ChangePassword />} />
        <Route path="products" element={<Products />} />
        <Route path="products/add" element={<AddProduct />} />
        <Route path="products/:id" element={<SingleProductPage />} />

        <Route path="orders" element={<Orders />} />
        <Route path="/orders/:id" element={<SingleOrderDetails />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:id" element={<SingleCustomerDetails />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="reviews/:id" element={<ReviewDetails />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/add" element={<AddCollection />} />
        <Route path="collections/:id" element={<UpdateCollection />} />
        <Route path="carousels" element={<CarouselsPage />} />
        <Route path="carousels/:id" element={<UpdateCarousels />} />
        <Route path="carousels/add" element={<AddCarousels />} />


      </Routes>
    </DefaultLayout>
  );
};

export default AdminPage;
