import React from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { deleteOrder, editOrder } from "../../../redux/Action"; // Add markAsPaid action
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ActionButton from "../../../components/Admin/Buttons/ActionButton";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup"; // Import confirmPopup and ConfirmPopup
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton"; // Ensure GoBackButton is imported
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { useParams } from "react-router-dom";

const SingleOrderDetails = ({ onBack }) => {
  const dispatch = useDispatch();
  const { id } = useParams(); // Get the order ID from URL

  // Fetch order details from Redux state or API using the ID
  const order = useSelector((state) =>
    state.allOrders.find((order) => order.id === id)
  );


  // Check if order is valid
  if (!order) {
    return (
      <div className="text-center text-red-500">
        No order details available.
      </div>
    );
  }

  // Table templates for product
  const productBodyTemplate = (rowData) => (
    <div className="flex items-center">
      <img
        src={rowData.thumbnail || "default-thumbnail.png"}
        alt={rowData.title || "Product"}
        className="w-12 h-12 object-cover rounded mr-4"
      />
      <span>{rowData.title || "Untitled Product"}</span>
    </div>
  );

  const quantityBodyTemplate = (rowData) => (
    <span>{rowData.quantity || 0}</span>
  );
  const priceBodyTemplate = (rowData) => (
    <span>${(rowData.price || 0).toFixed(2)}</span>
  );
  const subtotalBodyTemplate = (rowData) => (
    <span>${(rowData.total || 0).toFixed(2)}</span>
  );

  // Payment data for the DataTable
  const paymentData = [
    { key: "Subtotal", value: `$${(order.subtotal || 0).toFixed(2)}` },
    { key: "Shipping", value: `$${(order.shippingCost || 0).toFixed(2)}` },
    { key: "Total", value: `$${(order.total || 0).toFixed(2)}` },
  ];

  // Customer data for the DataTable
  const customerData = [
    { key: "Name", value: order.customer?.name || "N/A" },
    { key: "Email", value: order.customer?.email || "N/A" },
    { key: "Phone", value: order.customer?.phone || "N/A" },
    {
      key: "Address",
      value: order.customer?.address || "N/A",
    },
  ];

  const keyTemplate = (rowData) => (
    <span className="font-semibold">{rowData.key}</span>
  );
  const valueTemplate = (rowData) => <span>{rowData.value}</span>;

  // Handle edit action
  const handleEdit = () => {
    dispatch(editOrder(order));
    alert("Edit initiated");
  };

  // Handle delete action
  const handleDelete = () => {
    console.log("Deleting order:", order.id); // Check order id
    dispatch(deleteOrder(order.id));
    onBack();
  };

  // Handle confirm click for deletion
  const handleConfirmClick = (event) => {
    console.log("Confirm Clicked"); // Check if this logs when you click
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this order?",
      icon: "pi pi-exclamation-triangle",
      accept: handleDelete,
      reject: () => console.log("Action canceled"),
    });
  };

  // Handle Mark as Paid
  const handleMarkAsPaid = () => {
    alert("Order marked as paid");
  };

  return (
    <div className="flex flex-col">
      {/* Header with Back, Edit, Delete, and Mark as Paid Buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex justify-between w-full">
          {/* Go Back Button and Order Title */}
          <div className="flex items-center">
            <GoBackButton />
            <h1 className="inline-block ml-4 text-3xl dark:text-white">
              Order #{order.id}
            </h1>
          </div>

          {/* Edit, Delete, and Mark as Paid Buttons next to the title */}
          <div className="flex space-x-4">
            <ActionButton type="edit" label="Edit" onClick={handleEdit} />
            <ActionButton
              type="delete"
              label="Delete"
              onClick={handleConfirmClick} // Trigger confirmPopup here
            />
            <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg">
              Mark as Paid
            </button>
          </div>
        </div>
      </div>

      {/* ConfirmPopup component */}
      <ConfirmPopup />

      {/* Paid and Shipped Labels */}
      <div className="flex space-x-2 mb-4">
        <span className="bg-blue-100 text-blue-800 text-sm font-bold px-3 py-1 rounded-lg text-lg">
          Paid
        </span>
        <span className="bg-green-100 text-green-800 text-sm font-bold px-3 py-1 rounded-lg text-lg">
          Shipped
        </span>
      </div>

      {/* DataTable for Products */}
      <div className="mb-6">
        <DataTable
          value={order.products || []}
          responsiveLayout="scroll"
          className="mt-4"
          pt={dataTabelStyle}
        >
          <Column field="product" header="Product" body={productBodyTemplate} />
          <Column field="quantity" header="QTY" body={quantityBodyTemplate} />
          <Column field="price" header="Price" body={priceBodyTemplate} />
          <Column field="total" header="Subtotal" body={subtotalBodyTemplate} />
        </DataTable>
      </div>

      {/* Payment Section as DataTable */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold mb-4">Payment</h3>
        <DataTable
          value={paymentData}
          responsiveLayout="scroll"
          className="mt-4"
          pt={dataTabelStyle}
        >
          <Column field="key" header="Description" body={keyTemplate} />
          <Column field="value" header="Amount" body={valueTemplate} />
        </DataTable>
      </div>

      {/* Customer Section as DataTable */}
      <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Customer</h3>
        <DataTable
          value={customerData}
          responsiveLayout="scroll"
          className="mt-4"
          pt={dataTabelStyle}
        >
          <Column field="key" header="Details" body={keyTemplate} />
          <Column field="value" header="Information" body={valueTemplate} />
        </DataTable>
      </div>
    </div>
  );
};

export default SingleOrderDetails;
