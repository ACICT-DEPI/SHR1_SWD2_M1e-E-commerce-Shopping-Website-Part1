import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup"; // PrimeReact confirm popup
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import EditButton from "../../../components/Admin/Buttons/EditButton";
import ActionButton from "../../../components/Admin/Buttons/ActionButton";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import { buttonsStyle } from "../../../layout/buttonsStyle";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { useParams } from "react-router-dom";

const EditCustomerForm = ({ onSave }) => {
  const { name } = useParams(); // Get customer name from URL
  const [customer, setCustomer] = useState(null); // Initial state for customer
  const [updatedCustomer, setUpdatedCustomer] = useState(null); // State to manage updates

  // Fetch customer details when the component mounts
  useEffect(() => {
    const fetchCustomerData = async () => {
      // Simulate fetching customer data
      const customerData = {
        customer: {
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          address: "123 Main St, Cityville, ST 12345",
        },
        orders: [
          { orderId: "001", status: "Completed", total: 20.5 },
          { orderId: "002", status: "Pending", total: 15.0 },
        ],
      };
      setCustomer(customerData);
      setUpdatedCustomer(customerData.customer); // Populate the edit form
    };

    fetchCustomerData();
  }, [name]);

  if (!customer) {
    return <div className="text-center text-red-500">No customer details available.</div>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleDropdownChange = (name, value) => {
    setUpdatedCustomer({ ...updatedCustomer, [name]: value });
  };

  const handleSave = () => {
    onSave(updatedCustomer);
  };

  const handleDelete = () => {
    console.log("Deleting customer:", customer.customer.name);
    // Add delete logic
  };

  const handleConfirmClick = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this customer?",
      icon: "pi pi-exclamation-triangle",
      accept: handleDelete,
      reject: () => alert("Action canceled"),
    });
  };

  const orderBodyTemplate = (rowData) => <span>{rowData.orderId}</span>;

  const statusBodyTemplate = (rowData) => (
    <span
      className={`px-2 py-1 rounded-lg ${
        rowData.status === "Completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
      }`}
    >
      {rowData.status}
    </span>
  );

  const totalBodyTemplate = (rowData) => <span>${rowData.total.toFixed(2)}</span>;

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <GoBackButton />
          <h1 className="inline-block ml-4 text-3xl dark:text-white">{updatedCustomer?.name}</h1>
        </div>
        <div className="flex space-x-4">
          <ActionButton type="delete" label="Delete" onClick={handleConfirmClick} />
        </div>
      </div>

      <ConfirmPopup />

      <div className="mb-4">
        <label className="block mb-1">Customer Name:</label>
        <InputText
          name="name"
          value={updatedCustomer?.name || ""}
          onChange={handleInputChange}
          placeholder="Enter customer name"
          className="w-full"
          pt={inputTextStyle}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Customer Email:</label>
        <InputText
          name="email"
          value={updatedCustomer?.email || ""}
          onChange={handleInputChange}
          placeholder="Enter customer email"
          className="w-full"
          pt={inputTextStyle}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Phone:</label>
        <InputText
          name="phone"
          value={updatedCustomer?.phone || ""}
          onChange={handleInputChange}
          placeholder="Enter customer phone"
          className="w-full"
          pt={inputTextStyle}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Address:</label>
        <InputText
          name="address"
          value={updatedCustomer?.address || ""}
          onChange={handleInputChange}
          placeholder="Enter customer address"
          className="w-full"
          pt={inputTextStyle}
        />
      </div>

      <Button
        label="Save"
        icon="pi pi-check"
        onClick={handleSave}
        className="mr-2"
        pt={buttonsStyle}
      />
      <Button label="Cancel" icon="pi pi-times" className="mr-2" pt={buttonsStyle} />

      <h3 className="mt-6 text-lg font-semibold">Order History</h3>
      <DataTable value={customer.orders} responsiveLayout="scroll" pt={dataTabelStyle}>
        <Column field="orderId" header="Order ID" body={orderBodyTemplate} />
        <Column field="status" header="Status" body={statusBodyTemplate} />
        <Column field="total" header="Total Amount" body={totalBodyTemplate} />
      </DataTable>
    </div>
  );
};

export default EditCustomerForm;
