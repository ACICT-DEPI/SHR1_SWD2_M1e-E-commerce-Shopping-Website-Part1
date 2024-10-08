import React, { useState } from "react";

import Header from "../components/Admin/Header/Header";
import UserHeader from "../components/Client/UserHeader";

const UserLayout = ({ children }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark bg-white">
      <UserHeader />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
