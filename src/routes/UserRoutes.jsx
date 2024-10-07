import { Route, Routes } from "react-router-dom";

import UserPage from "../pages/Client/UserPage";
import Register from "../pages/Client/Register";
import Login from "../pages/Client/Login";
import ProductDetails from "../pages/Client/ProductDetails";
import ForgetPassword from "../pages/Client/ForgetPassword";
import NotFoundPage from "../pages/Client/NotFoundPage";
import ContactPage from "../pages/Client/ContactPage";
import AllCollectionsPage from "../pages/Client/AllCollectionsPage";
import ProfilePage from "../pages/Client/ProfilePage";
import ResetPassword from "../pages/Client/ResetPassword";
import LogoutPage from "../pages/Client/LogoutPage";
import CollectionProducts from "../pages/Client/CollectionProducts";
function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<UserPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<LogoutPage />} />
      <Route path="/forget-passwrd" element={<ForgetPassword />} />
      <Route path="/reset-passwrd" element={<ResetPassword />} />
      <Route path="/profile" element={<ProfilePage />} />
      <Route path="/product/:id" element={<ProductDetails />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/collections" element={<AllCollectionsPage />} />
      <Route path="/collections/:param" element={<CollectionProducts />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default UserRoutes;
