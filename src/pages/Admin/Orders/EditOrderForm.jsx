import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Dropdown } from "primereact/dropdown"; // Import Dropdown
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { inputTextStyle } from "../../../layout/inputTextStyle";
import { buttonsStyle } from "../../../layout/buttonsStyle";

const EditOrderForm = ({ order, onSave}) => {
  const [updatedOrder, setUpdatedOrder] = useState(order);

  // Check if order is undefined
  if (!order) {
    return (
      <div className="text-center text-red-500">
        No order details available.
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedOrder({ ...updatedOrder, [name]: value });
  };

  const handleDropdownChange = (name, value) => {
    setUpdatedOrder({ ...updatedOrder, [name]: value });
  };

  // Payment and Shipping Status Options
  const paymentOptions = [
    { label: "Paid", value: "Paid" },
    { label: "Unpaid", value: "Unpaid" },
  ];

  const shippingOptions = [
    { label: "Shipped", value: "Shipped" },
    { label: "Pending", value: "Pending" },
  ];

  const handleSave = () => {
    onSave(updatedOrder);
  };

  return (
    <div className="p-5">
      <GoBackButton />
      <h2 className="text-2xl font-bold mb-4">Edit Order #{order.id}</h2>

      <div className="mb-4">
        <label className="block mb-1">Customer Name:</label>
        <InputText
          name="customer"
          value={updatedOrder.customer}
          onChange={handleChange}
          placeholder="Enter customer name"
          className="w-full"
          pt={inputTextStyle}
        />
      </div>
      <div className="mb-4">
        <label className="block mb-1">Customer Email:</label>
        <InputText
          name="customerEmail" // Add customer email field
          value={updatedOrder.customerEmail} // Update to the correct field
          onChange={handleChange}
          placeholder="Enter customer email"
          className="w-full"
          pt={inputTextStyle}
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Payment Status:</label>
        <Dropdown
          name="paymentStatus"
          value={updatedOrder.paymentStatus}
          options={paymentOptions}
          onChange={(e) => handleDropdownChange('paymentStatus', e.value)} // Use handleDropdownChange
          placeholder="Select payment status"
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Shipping Status:</label>
        <Dropdown
          name="shippingStatus"
          value={updatedOrder.shippingStatus}
          options={shippingOptions}
          onChange={(e) => handleDropdownChange('shippingStatus', e.value)} // Use handleDropdownChange
          placeholder="Select shipping status"
          className="w-full"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1">Total Amount:</label>
        <InputText
          name="total"
          value={updatedOrder.total}
          onChange={handleChange}
          placeholder="Enter total amount"
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
      <Button
        label="Cancel"
        icon="pi pi-times"
       // onClick={onCancel}
        pt={buttonsStyle}
      />

      <h3 className="mt-4">Order Items:</h3>
      <DataTable value={updatedOrder.items} dataKey="id" className="mt-2">
        <Column field="name" header="Product Name" />
        <Column field="quantity" header="Quantity" />
        <Column field="price" header="Price" />
      </DataTable>
    </div>
  );
};

export default EditOrderForm;
