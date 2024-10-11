import React, { Fragment, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import axios from "axios"; // Import axios for API requests
import { useSelector } from "react-redux"; // Redux for state management
import "primeicons/primeicons.css"; // PrimeReact icons
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { dataTabelStyle } from "../../../layout/dataTabelStyle"; // Custom styles
import { inputTextStyle } from "../../../layout/inputTextStyle";

const ProductDataTabel = () => {
  const [allProducts, setAllProducts] = useState([]); // State to store fetched products
  const navigate = useNavigate(); // Initialize useNavigate for routing

  // Fetch products from the API with credentials
  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/v1/products", {
        withCredentials: true, // Send credentials with the request
      });
      const products = response.data.data.products;
      setAllProducts(products); // Set fetched products
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // Fetch products on component mount
  }, []);

  // For filtering data on table
  const [filter, setFilter] = useState({
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filter = { ...filter };

    _filter["title"].value = value;

    setFilter(_filter);
    setGlobalFilterValue(value);
  };

  // Table header section
  const header = () => {
    return (
      <div className="flex flex-col justify-content-end">
        <IconField iconPosition="left" className="relative">
          <InputIcon className="pi pi-search absolute top-4 mt-0 left-3" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by title"
            className="pl-10"
            pt={inputTextStyle}
          />
        </IconField>
      </div>
    );
  };

  // Update paginator content
  useEffect(() => {
    document.querySelector(".nextPageButton").innerHTML =
      "Next <i class='pi pi-angle-double-right ml-1'></i>";
    document.querySelector(".prevPageButton").innerHTML =
      " <i class='pi pi-angle-double-left mr-1'></i> Previous";
  }, []);

  // First row body template for product details
  const ProductBodyTemplate = (rowData) => {
    const handleTitleClick = () => {
      navigate(`/admin/products/update/${rowData._id}`); // Navigate to product update page
    };

    return (
      <Fragment>
        <img
          src={rowData.gallery[0]?.url}
          alt={rowData.title}
          className="h-12.5 w-15 rounded-md inline-block mr-5"
          style={{ width: "64px" }}
        />
        <span
          onClick={handleTitleClick}
          className="hover:text-primary cursor-pointer"
        >
          {rowData.title}
        </span>
      </Fragment>
    );
  };

  return (
    <div>
      <DataTable
        value={allProducts}
        rows={5}
        size="small"
        dataKey="_id"
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
          body={ProductBodyTemplate}
          sortable
        />
        <Column
          field="quantity"
          header="Inventory"
          style={{ minWidth: "12rem" }}
          sortable
        />
        <Column
          field="price"
          header="Price"
          style={{ minWidth: "12rem" }}
          sortable
        />
      </DataTable>
    </div>
  );
};

export default ProductDataTabel;
