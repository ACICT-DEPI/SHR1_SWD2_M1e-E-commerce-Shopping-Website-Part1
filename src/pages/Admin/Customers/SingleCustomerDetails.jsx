import React, { useEffect, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import ActionButton from '../../../components/Admin/Buttons/ActionButton';
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { useParams } from 'react-router-dom'; // Import useParams to get URL parameters
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import EditButton from "../../../components/Admin/Buttons/EditButton";

const SingleCustomerDetails = () => {
  const { name } = useParams(); // Get the customer name from the URL
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    // Fetch customer data based on the name
    const fetchCustomerData = async () => {
      // Simulate fetching data (replace this with actual fetch logic)
      const customerData = {
        customer: {
          name: "John Doe",
          email: "john@example.com",
          phone: "123-456-7890",
          address: "123 Main St, Cityville, ST 12345",
          image: "path_to_image/john_doe.jpg", // Placeholder for an image
        },
        orders: [
          { orderId: "001", status: "Completed", total: 20.5 },
          { orderId: "002", status: "Pending", total: 15.0 },
        ]
      };

      // This would typically be an API call
      setCustomer(customerData);
    };

    fetchCustomerData();
  }, [name]); // Fetch data when the name changes

  if (!customer) {
    return <div className="text-center text-red-500">No customer details available.</div>;
  }

  const orderBodyTemplate = (rowData) => <span>{rowData.orderId}</span>;

  const statusBodyTemplate = (rowData) => (
    <span className={`px-2 py-1 rounded-lg ${rowData.status === 'Completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
      {rowData.status}
    </span>
  );

  const totalBodyTemplate = (rowData) => <span>${rowData.total.toFixed(2)}</span>;

  const handleDelete = () => {
    console.log("Deleting customer:", customer.customer.name);
    // Logic to delete the customer goes here
    
  };

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
      <div className="flex items-center justify-between mb-6">
        {/* Go Back Button and Order Title */}
        <div className="flex items-center">
            <GoBackButton />
            <h1 className="inline-block ml-4 text-3xl dark:text-white">
              {customer.customer.name}
            </h1>
          </div>
        <div className="flex space-x-4">
        <EditButton label={"Edit"} path={`/admin/customers/edit/${customer.customer.name}`} />
        <ActionButton 
            type="delete" 
            label="Delete" 
            onClick={handleConfirmClick} 
          />
        </div>
      </div>

      <ConfirmPopup />

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Customer Information</h3>
        <p><strong>Email:</strong> {customer.customer.email}</p>
        <p><strong>Phone:</strong> {customer.customer.phone}</p>
        <p><strong>Address:</strong> {customer.customer.address}</p>
      </div>

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
