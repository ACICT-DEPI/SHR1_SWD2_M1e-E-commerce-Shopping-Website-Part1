import React, { useEffect, useRef } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { RiShoppingBagLine } from "react-icons/ri";
import { BsTags } from "react-icons/bs";
import { CiStar } from "react-icons/ci";
import { GoArrowLeft } from "react-icons/go";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { HiOutlineCollection } from "react-icons/hi";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const location = useLocation();
  const { pathname } = location;
  const sidebar = useRef(null);

  // close on click outside
  useEffect(() => {
    const clickHandler = (event) => {
      if (!sidebar.current) return;
      if (!sidebarOpen || sidebar.current.contains(event.target)) return;
      setSidebarOpen(false);
    };

    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  return (
    <aside
      ref={sidebar}
      className={`sidebar absolute bg-black dark:bg-boxdark top-0 left-0 z-50 flex flex-col overflow-y-hidden h-screen w-72 duration-300 ease-linear lg:static lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="sidebar-header pt-7 pb-10 px-9 flex justify-between items-center text-3xl font-bold text-bodydark1 gap-2">
        <NavLink to="/admin" className=" ">
          Shopify
        </NavLink>
        <button
          onClick={() => setSidebarOpen(false)}
          className="block lg:hidden"
        >
          <GoArrowLeft />
        </button>
      </div>
      <div className="sidebar-menu overflow-auto no-scrollbar duration-300 ease-in-out">
        <nav className="py-4 px-4">
          <ul className="">
            <li>
              <NavLink
                to="/admin"
                className="flex items-center gap-4 text-lg text-bodydark1 mb-2 py-2 px-4 font-semibold hover:bg-graydark rounded-sm duration-300 ease-in-out"
              >
                <RxDashboard />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/products"
                className="flex items-center gap-4 text-lg text-bodydark1 mb-2 py-2 px-4 font-semibold hover:bg-graydark rounded-sm duration-300 ease-in-out"
              >
                <BsTags />
                Products
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/orders"
                className="flex items-center gap-4 text-lg text-bodydark1 mb-2 py-2 px-4 font-semibold hover:bg-graydark rounded-sm duration-300 ease-in-out"
              >
                <RiShoppingBagLine />
                Orders
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/customers"
                className="flex items-center gap-4 text-lg text-bodydark1 py-2 px-4 font-semibold hover:bg-graydark rounded-sm duration-300 ease-in-out"
              >
                <MdOutlinePeopleAlt />
                Customers
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/reviews"
                className="flex items-center gap-4 text-lg text-bodydark1 mb-2 py-2 px-4 font-semibold hover:bg-graydark rounded-sm duration-300 ease-in-out"
              >
                <CiStar />
                Reviews
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/collections"
                className="flex items-center gap-4 text-lg text-bodydark1 mb-2 py-2 px-4 font-semibold hover:bg-graydark rounded-sm duration-300 ease-in-out"
              >
                <HiOutlineCollection />
                Collections
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
