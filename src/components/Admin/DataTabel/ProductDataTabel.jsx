import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "primeicons/primeicons.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import { useNavigate } from "react-router-dom";
import SingleProductPage from "../../../pages/Admin/SingleProductPage";

const ProductDataTabel = () => {
  const Navigate = useNavigate();
  const allProducts = useSelector((state) => state.allProducts);

  // For filtering data on the table
  const [filter, setFilter] = useState({
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filter = { ...filter };
    _filter["title"].value = value;
    setFilter(_filter);
    setGlobalFilterValue(value);
  };

  const handleProductClick = (product) => {
    console.log("Selected Product:", product);
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const header = () => {
    return (
      <div className="flex justify-content-end focus:shadow-none ">
        <IconField iconPosition="left" className="relative">
          <InputIcon className="pi pi-search absolute top-4 left-3" />
          <InputText
            value={globalFilterValue}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="Filter products"
            className="pl-10 "
            pt={inputTextStyle}
          />
        </IconField>
      </div>
    );
  };

  // useEffect to change content for paginator next and prev buttons
  useEffect(() => {
    document.querySelector(".nextPageButton").innerHTML =
      "Next <i class='pi pi-angle-double-right ml-1'></i>";
    document.querySelector(".prevPageButton").innerHTML =
      " <i class='pi pi-angle-double-left mr-1'></i> Previous";
  }, []);

  // Product body template
  const productBodyTemplate = (rowData) => {
    return (
      <Fragment>
        <img
          src={rowData.thumbnail}
          alt={rowData.title}
          className="h-12.5 w-15 rounded-md inline-block mr-5"
          style={{ width: "64px" }}
        />
        <Link
          to={`/admin/products/${rowData.title}`} // Link updated to include product ID
          className="text-black dark:text-white font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
          onClick={(e) => {
            e.preventDefault(); // Prevent default link behavior
            handleProductClick(rowData); // Call your click handler
          }}
        >
          {rowData.title}
        </Link>
      </Fragment>
    );
  };

  return (
    <div>
      {showProductDetails && selectedProduct ? (
        <SingleProductPage
          Product={selectedProduct}
          onBack={handleProductClick}
        />
      ) : (
        <DataTable
          value={allProducts}
          rows={5}
          size="small"
          dataKey="id"
          filters={filter}
          filterDisplay="menu"
          globalFilterFields={["title"]}
          header={header}
          paginator
          paginatorTemplate=" CurrentPageReport PrevPageLink  NextPageLink "
          currentPageReportTemplate=" Showing {first} to {last} of {totalRecords} results"
          className="custom-paginator"
          pt={dataTabelStyle}
        >
          <Column
            field="title"
            header="Product"
            style={{ minWidth: "12rem" }}
            body={productBodyTemplate}
          />
          <Column
            field="availabilityStatus"
            header="Available"
            style={{ minWidth: "12rem" }}
          />
          <Column
            field="stock"
            header="Inventory"
            style={{ minWidth: "12rem" }}
          />
        </DataTable>
      )}
    </div>
  );
};

export default ProductDataTabel;
