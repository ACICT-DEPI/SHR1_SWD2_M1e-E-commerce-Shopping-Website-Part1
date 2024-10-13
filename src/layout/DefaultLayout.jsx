import React, { useState } from "react";
import Sidebar from "../components/Admin/Sidebar/Sidebar";
import Header from "../components/Admin/Header/Header";

const DefaultLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="relative flex h-screen overflow-hidden">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        <div
          className={`${
            sidebarOpen ? "fixed inset-0 bg-black bg-opacity-50 z-40" : ""
          }`}
        ></div>
        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
          <main className="max-w-screen-2xl p-4 md:p-6 2xl:p-10">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
