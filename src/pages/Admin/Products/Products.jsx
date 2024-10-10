import { Fragment } from "react";
import AddProductButton from "../../../components/Admin/AddProductButton";
import ProductDataTabel from "../../../components/Admin/DataTabel/ProductDataTabel";

const Product = () => {
  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <h1 className="text-3xl dark:text-whiten	">Product</h1>
        <AddProductButton label={"Add Product"} path={"add"} />
      </div>
      <div>
        <ProductDataTabel />
      </div>
    </Fragment>
  );
};
export default Product;
