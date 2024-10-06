import React, { Fragment, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "primeicons/primeicons.css";
import { FilterMatchMode } from "primereact/api";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { InputText } from "primereact/inputtext";
import { IconField } from "primereact/iconfield";
import { InputIcon } from "primereact/inputicon";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import { Button } from "primereact/button";
import SingleCustomerDetails from "./SingleCustomerDetails";
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'; 

export const Customers = () => {
  const customers = [
    {
      id: 1, // Added an id for each customer for better handling
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "123-456-7890",
        address: "123 Main St, Cityville, ST 12345",
        image: "path_to_image/john_doe.jpg", // Placeholder for an image
        orders: "3"
      }
    },
    // ... other customers
  ];

  const [filter, setFilter] = useState({
    "customer.name": { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  });
  const [globalFilterValue, setGlobalFilterValue] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showCustomerDetails, setShowCustomerDetails] = useState(false);
  const navigate = useNavigate(); // Use navigate from react-router-dom

  const onGlobalFilterChange = (e) => {
    const value = e.target.value;
    let _filter = { ...filter };

    _filter["customer.name"].value = value; 
    setFilter(_filter);
    setGlobalFilterValue(value);
  };

  const handleCustomerClick = (customer) => {
    navigate(`/admin/customers/${customer.customer.name}`); // Navigate to the customer details page
  };

  const handleDeleteCustomer = (id) => {
    console.log("deleted");
  };

  const handleEditCustomer = (customer) => {
    console.log("edited");
  };

  const confirmDeleteCustomer = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this order?",
      icon: 'pi pi-exclamation-triangle',
      accept: () => handleDeleteCustomer(id),
      reject: () => console.log("Action canceled"),
    });
  };

  const header = () => {
    return (
      <div className="flex flex-col justify-content-end">
        <IconField iconPosition="left" className="relative">
          <InputIcon className="pi pi-search" />
          <InputText
            value={globalFilterValue}
            onChange={onGlobalFilterChange}
            placeholder="Search by Name"
            className="pl-10"
            pt={inputTextStyle}
          />
        </IconField>
      </div>
    );
  };

  const actionBodyTemplate = (rowData) => {
    return (
      <React.Fragment>
        <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => handleEditCustomer(rowData)} />
        <Button icon="pi pi-trash" rounded outlined severity="danger" 
        onClick={(e) => confirmDeleteCustomer(e, rowData.id)} 
        />
      </React.Fragment>
    );
  };

  const totalBodyTemplate = (rowData) => {
    return `$${rowData.total}`; // Ensure `total` is a valid field in your data
  };

  const customerTemplate = (rowData) => {
    return (
      <div className="flex items-center space-x-2">
        <img
          src={rowData.customer.image}
          alt={rowData.customer.name}
          className="w-10 h-10 rounded-full border-2 border-gray-300 dark:border-gray-600"
        />
        <Link
          to={`/admin/customers/${rowData.customer.name}`} // This can still be used for styling
          onClick={(e) => {
            e.preventDefault();
            handleCustomerClick(rowData); // Navigate on click
          }}
          className="text-black dark:text-white font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
        >
          {rowData.customer.name}
        </Link>
      </div>
    );
  };

  useEffect(() => {
    document.querySelector(".nextPageButton").innerHTML =
      "Next <i class='pi pi-angle-double-right ml-1'></i>";
    document.querySelector(".prevPageButton").innerHTML =
      "<i class='pi pi-angle-double-left mr-1'></i> Previous";
  }, []);

  return (
    <div>
      <Fragment>
        <div className="flex flex-nowrap justify-between mb-5">
          <h1 className="text-3xl dark:text-white">Customers</h1>
        </div>
        <div>
          <DataTable
            value={customers}
            rows={5}
            size="small"
            dataKey="id"
            filters={filter}
            filterDisplay="menu"
            globalFilterFields={["customer.name"]}
            header={header}
            paginator
            paginatorTemplate=" CurrentPageReport PrevPageLink NextPageLink "
            currentPageReportTemplate=" Showing {first} to {last} of {totalRecords} results"
            className="custom-paginator"
            pt={dataTabelStyle}
          >
            <Column field="customer" header="Customer" body={customerTemplate} />
            <Column field="customer.orders" header="Orders" style={{ minWidth: "12rem" }} />
            <Column field="total" header="Amount spent" body={totalBodyTemplate} />
            <Column body={actionBodyTemplate} header="Actions" style={{ minWidth: "12rem" }} />
          </DataTable>
        </div>
      </Fragment>
      <ConfirmPopup />
    </div>
  );
};

export default Customers;
