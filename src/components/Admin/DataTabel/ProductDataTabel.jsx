import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios"; // Import axios for API requests
import { useNavigate } from "react-router-dom";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { FilterMatchMode } from "primereact/api";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import SingleProductPage from "../../../pages/Admin/Products/SingleProductPage";

const ProductDataTable = () => {
  const navigate = useNavigate();
  const [allProducts, setAllProducts] = useState([]); // State to store fetched products
  const [filter, setFilter] = useState({
    title: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showProductDetails, setShowProductDetails] = useState(false);

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

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filter = { ...filter };
    _filter["title"].value = value;
    setFilter(_filter);
    setGlobalFilterValue(value);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowProductDetails(true);
  };

  const header = () => (
    <div className="flex justify-content-end">
      <IconField iconPosition="left" className="relative">
      <InputIcon className="pi pi-search absolute top-4 mt-0 left-3" />
      <InputText
          value={globalFilterValue}
          onChange={(e) => onGlobalFilterChange(e)}
          placeholder="Filter products"
          className="pl-10"
          pt={inputTextStyle}
        />
      </IconField>
    </div>
  );

  // Product body template for each row
  const productBodyTemplate = (rowData) => (
    <Fragment>
      <img
        src={rowData.gallery[0]?.url}
        alt={rowData.title}
        className="h-12.5 w-15 rounded-md inline-block mr-5"
        style={{ width: "64px" }}
      />
      <Link
        to={`/admin/products/${rowData._id}`} // Update link to product page using _id
        className="text-black dark:text-white font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
        onClick={(e) => {
          e.preventDefault();
          handleProductClick(rowData); // Show product details
        }}
      >
        {rowData.title}
      </Link>
    </Fragment>
  );

  return (
    <div>
      {showProductDetails && selectedProduct ? (
        <SingleProductPage
          product={selectedProduct} // Pass the selected product to the details page
          onBack={() => setShowProductDetails(false)} // Back to product list
        />
      ) : (
        <DataTable
          value={allProducts} // Use fetched products
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
            body={productBodyTemplate}
          />
          <Column
            field="quantity"
            header="Inventory"
            style={{ minWidth: "8rem" }}
          />
          <Column
            field="price"
            header="Price"
            style={{ minWidth: "8rem" }}
          />
        </DataTable>
      )}
    </div>
  );
};

export default ProductDataTable;
