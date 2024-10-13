import { Fragment } from "react";
import { LuUsers } from "react-icons/lu";
import { LuScrollText } from "react-icons/lu";
import { LuBoxes } from "react-icons/lu";

const CardSection = ({ productCount, ordersCount, customersCount }) => {
  return (
    <Fragment>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-1 md:gap-6 xl:grid-cols-3 2xl:gap-7.5">
          <div className="rounded-sm border border-stroke bg-white py-4 px-7 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full items-center justify-between  ">
              <h1 className="text-2xl font-bold">Customers</h1>
              <span className=" rounded-full inline-block align-middle text-center 	">
                <LuUsers className="text-green-500 dark:stext-white text-6xl stroke-1" />
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
              <h4 className=" text-lg text-slate dark:text-white">{customersCount}</h4>
                <span className="text-sm font-medium">Total users</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white py-4 px-7 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full items-center justify-between  ">
              <h1 className="text-2xl font-bold">Orders</h1>
              <span className=" rounded-full inline-block align-middle text-center 	">
                <LuScrollText className="text-yellow-500 dark:stext-white text-6xl stroke-1" />
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
              <h4 className=" text-lg text-slate dark:text-white">{ordersCount}</h4>
                <span className="text-sm font-medium">Total Orders</span>
              </div>
            </div>
          </div>
          <div className="rounded-sm border border-stroke bg-white py-4 px-7 shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex w-full items-center justify-between  ">
              <h1 className="text-2xl font-bold">Products</h1>
              <span className=" rounded-full inline-block align-middle text-center 	">
                <LuBoxes className="text-green-500 dark:stext-white text-6xl stroke-1" />
              </span>
            </div>
            <div className="flex items-end justify-between">
              <div>
              <h4 className=" text-lg text-slate dark:text-white">{productCount}</h4>
              <span className="text-sm font-medium">Total Products</span>
              </div>
            </div>
          </div>
        </div>

    </Fragment>
  );
};
export default CardSection;
