import { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { Link } from "react-router-dom";

const NewOrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/v1/orders", {
          withCredentials: true,
        });
        const fetchedOrders = response.data.data.orders;

        // Sort orders by createdAt (newest to oldest)
        const sortedOrders = fetchedOrders.sort((a, b) =>
          new Date(b.createdAt) - new Date(a.createdAt)
        );

        // Set the first 5 orders
        setOrders(sortedOrders.slice(0, 5));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  // Format the date and time
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString("en-GB", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  // Custom cell renderer for user info (name + image)
  const renderUserCell = (rowData) => {
    const { firstName, lastName } = rowData.user; // Assuming 'avatarUrl' is the user's image URL
    return (
      <div className="flex items-center space-x-2">
        <Link to={`customers/${rowData.user._id}`}>  <span className="hover:text-primary">{`${firstName} ${lastName}`}</span></Link>
      </div>
    );
  };
  const renderOrderId = (rowData) => {
    return (
      <div className="hover:text-primary"><Link to={`/orders/${rowData._id}`}>{rowData._id}</Link></div>
    )
  }

  const renderStatusCell = (rowData) => {
    const status = rowData.status;
    let statusColor = "";

    switch (status) {
      case "Pending":
        statusColor = "text-yellow-500"; // Tailwind color for pending
        break;
      case "Shipped":
        statusColor = "text-blue-500"; // Tailwind color for shipped
        break;
      case "Completed":
        statusColor = "text-green-500"; // Tailwind color for completed
        break;
      case "Cancelled":
        statusColor = "text-red-500"; // Tailwind color for cancelled
        break;
      default:
        statusColor = "text-gray-500"; // Default color for unknown status
        break;
    }

    return <span className={statusColor}>{status}</span>;
  };
  // Render the table
  return (
    <Fragment>
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <DataTable
          value={orders}
          rows={5}
          size="large"
          dataKey="_id"
          pt={dataTabelStyle} // Assuming you have a style object
        >
          <Column
            field="_id"
            header="OrderID"
            body={renderOrderId} // Render the user info (name + image)
            style={{ minWidth: "15rem" }}
          />
          <Column
            header="User"
            body={renderUserCell} // Render the user info (name + image)
            style={{ minWidth: "15rem" }}
          />
          <Column
            field="totalPrice"
            header="Total Price"
            style={{ minWidth: "10rem" }}
          />
          <Column
            field="status"
            header="Status"
            style={{ minWidth: "10rem" }}
            body={renderStatusCell}
          />
          <Column
            field="createdAt"
            header="Order Date"
            body={(rowData) => formatDate(rowData.createdAt)} // Format the date
            style={{ minWidth: "15rem" }}
          />
        </DataTable>
      )}
    </Fragment>
  );
};

export default NewOrderTable;
