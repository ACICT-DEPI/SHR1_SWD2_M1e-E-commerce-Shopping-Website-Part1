import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup'; // Import confirmPopup and ConfirmPopup
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ActionButton from '../../../components/Admin/Buttons/ActionButton'; // Adjust the path as necessary
import { dataTabelStyle } from "../../../layout/dataTabelStyle";

const SingleCustomerDetails = ({ customer, onBack }) => {
  if (!customer) {
    return <div className="text-center text-red-500">No customer details available.</div>;
  }

  // Body templates for orders
  const orderBodyTemplate = (rowData) => <span>{rowData.orderId}</span>;

  const statusBodyTemplate = (rowData) => (
    <span className={`px-2 py-1 rounded-lg ${rowData.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
      {rowData.status}
    </span>
  );

  const totalBodyTemplate = (rowData) => <span>${rowData.total.toFixed(2)}</span>;

  // Handle delete action
  const handleDelete = () => {
    console.log("Deleting order:", customer.id); // Check order id
    // Logic to delete the customer goes here
    onBack();
  };

  // Handle confirm click for deletion
  const handleConfirmClick = (event) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this customer?",
      icon: 'pi pi-exclamation-triangle',
      accept: handleDelete,
      reject: () => alert('Action canceled'),
    });
  };

  return (
    <div className="p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      {/* Header Section */}
      <div className="flex items-center justify-between mb-6">
        <ActionButton type="back" label="Back" onClick={onBack} />
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white">
          Customer: {customer.customer.name}
        </h2>
        <div className="flex space-x-4">
          <ActionButton type="edit" label="Edit" onClick={() => alert('Edit customer')} />
          <ActionButton 
            type="delete" 
            label="Delete" 
            onClick={handleConfirmClick} // Trigger confirmPopup here
          />
        </div>
      </div>

      {/* ConfirmPopup component */}
      <ConfirmPopup />

      {/* Customer Information */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Customer Information</h3>
        <p><strong>Email:</strong> {customer.customer.email}</p>
        <p><strong>Phone:</strong> {customer.customer.phone}</p>
        <p><strong>Address:</strong> {customer.customer.address}</p>
      </div>

      {/* Order History Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Order History</h3>
        <DataTable value={customer.orders} responsiveLayout="scroll" pt={dataTabelStyle}>
          <Column field="orderId" header="Order ID" body={orderBodyTemplate} />
          <Column field="status" header="Status" body={statusBodyTemplate} />
          <Column field="total" header="Total Amount" body={totalBodyTemplate} />
        </DataTable>
      </div>
    </div>
  );
};

export default SingleCustomerDetails;
