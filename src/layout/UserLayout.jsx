import React, { useState } from "react";

import UserHeader from "../components/Client//Header/UserHeader";

const UserLayout = ({ children }) => {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark bg-white">
      <UserHeader />
      <main>{children}</main>
    </div>
  );
};

export default UserLayout;
