import React, { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import DefaultLayout from "../../layout/DefaultLayout";
import { Route, Routes } from "react-router-dom";
import Products from "./Products";
import Orders from "./Orders/Orders";
import Customers from "./Customers/Customers";
import Reviews from "./Reviews";
import Dashboard from "./Dashboard";
import Collections from "./collections/Collections";
import AddCollection from "./collections/AddCollection";
import UpdateCollection from "./collections/UpdateCollection";
import SingleOrderDetails from "./Orders/SingleOrderDetails";
import SingleCustomerDetails from "./Customers/SingleCustomerDetails";
import EditOrderForm from "./Orders/EditOrderForm";
import EditCustomerForm from "./Customers/EditCustomerForm";
import ProfilePage from "../Client/ProfilePage";
import UnauthorizedPage from "../Client/UnauthorizedPage";

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
        <Route path="products" element={<Products />} />
        <Route path="orders" element={<Orders />} />
        <Route path="orders/edit/:id" element={<EditOrderForm />} />
        <Route path="/orders/:id" element={<SingleOrderDetails />} />
        <Route path="customers" element={<Customers />} />
        <Route path="customers/:name" element={<SingleCustomerDetails />} />
        <Route path="customers/edit/:name" element={<EditCustomerForm />} />
        <Route path="reviews" element={<Reviews />} />
        <Route path="collections" element={<Collections />} />
        <Route path="collections/add" element={<AddCollection />} />
        <Route path="collections/:id" element={<UpdateCollection />} />
      </Routes>
    </DefaultLayout>
  );
};

export default AdminPage;
