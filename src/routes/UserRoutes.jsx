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
import CollectionProducts from "../pages/Client/CollectionProducts";
import UnauthorizedPage from "../pages/Client/UnauthorizedPage";
import ExpiredOrInvalidTokenPage from "../pages/Client/ExpiredOrInvalidTokenPage";
import TokenValidation from "../pages/Client/TokenValidation";
import UserLayout from "../layout/UserLayout";
import Cart from "../pages/Client/Cart";
import CheckoutPage from "../pages/Client/CheckoutPage";
function UserRoutes() {
  return (
    <UserLayout>
      <Routes>
        <Route path="/" element={<UserPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route
          path="/password/reset-password/:userId/:token"
          element={<TokenValidation />}
        />
        <Route
          path="/password/get-reset-password-form/:userId/:token"
          element={<ResetPassword />}
        />
        <Route path="/profile/:fullname" element={<ProfilePage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/collections" element={<AllCollectionsPage />} />
        <Route path="/collections/:param" element={<CollectionProducts />} />

        <Route path="/unauthorized-page" element={<UnauthorizedPage />} />
        <Route
          path="/expired-invalid-token-page"
          element={<ExpiredOrInvalidTokenPage />}
        />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/Cart" element={<Cart/>} />
        <Route path="/ChackOut" element={<CheckoutPage/>} />
      </Routes>
    </UserLayout> 
  );
}

export default UserRoutes;
