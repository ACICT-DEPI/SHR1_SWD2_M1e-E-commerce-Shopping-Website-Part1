import { Fragment } from "react";
import ProductDataTabel from "../../../components/Admin/DataTabel/ProductDataTabel";
import AddButton from "../../../components/Admin/Buttons/AddButton";

const Product = () => {
  return (
    <Fragment>
      <div className="flex flex-nowrap justify-between mb-5">
        <h1 className="text-3xl dark:text-whiten	">Product</h1>
        <AddButton label={"Add Product"} path={"add"} />
      </div>
      <div>
        <ProductDataTabel />
      </div>
    </Fragment>
  );
};
export default Product;
