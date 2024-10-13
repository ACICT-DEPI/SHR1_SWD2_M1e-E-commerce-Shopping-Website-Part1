import React, { useState } from "react";

import UserHeader from "../components/Client/Header/UserHeader";
import Footer from "../components/Client/Footer/Footer";
const UserLayout = ({ children }) => {
  return (
    <div className="dark:bg-gray-900 dark:text-bodydark bg-white">
      <UserHeader />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default UserLayout;
