import { Fragment } from "react";
import OrderDataTabel from "../../../components/Admin/DataTabel/OrderDataTabel";

const Product = () => {
  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <h1 className="text-3xl dark:text-whiten	">Order</h1>
      </div>
      <div>
        <OrderDataTabel />
      </div>
    </Fragment>
  );
};
export default Product;
