import { Fragment } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { Link } from "react-router-dom";

const NewOrderTable = ({ data }) => { // نقوم بتمرير البيانات هنا
  const orders = data; // البيانات التي تم تمريرها من TabelSection

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
    // استخراج الاسم الأول واسم العائلة من بيانات المستخدم
    const { firstName, lastName, _id } = rowData.user;

    return (
      <div className="truncate overflow-hidden w-full  inline-block">
        {/* رابط لتحويل المستخدم إلى صفحة العميل */}
        <Link to={`customers/${_id}`}>
          <span className="hover:text-primary ">{`${firstName} ${lastName}`}</span>
        </Link>
      </div>
    );
  };

  const renderOrderId = (rowData) => {
    return (
      <div className="hover:text-primary truncate overflow-hidden w-full  inline-block">
        <Link to={`orders/${rowData._id}`}>{rowData._id}</Link>
      </div>
    );
  };
  const totalBodyTemplate = (rowData) => `${rowData.totalPrice.toFixed(2)} EGP`;

  const renderStatusCell = (rowData) => {
    const status = rowData.status;
    let statusColor = "";

    switch (status) {
      case "Pending":
        statusColor = "text-yellow-500"; 
        break;
      case "Shipped":
        statusColor = "text-blue-500"; 
        break;
      case "Completed":
        statusColor = "text-green-500"; 
        break;
      case "Cancelled":
        statusColor = "text-red-500"; 
        break;
      default:
        statusColor = "text-gray-500"; 
        break;
    }

    return <span className={statusColor}>{status}</span>;
  };

  // Render the table
  return (
    <Fragment>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <DataTable
          value={orders}
          rows={5}
            size="normal"
          dataKey="_id"
            pt={dataTabelStyle} 
        >
          <Column
            field="_id"
            header="OrderID"
              body={renderOrderId}
              style={{ minWidth: "10rem" }}
              sortable
          />
          <Column
            header="User"
              body={renderUserCell}
            style={{ minWidth: "15rem" }}
              sortable
          />
          <Column
            field="totalPrice"
            header="Total Price"
              body={totalBodyTemplate}
            style={{ minWidth: "10rem" }}
              sortable
          />
          <Column
            field="status"
            header="Status"
            style={{ minWidth: "10rem" }}
            body={renderStatusCell}
              sortable
          />
          <Column
            field="createdAt"
            header="Order Date"
              body={(rowData) => formatDate(rowData.createdAt)}
            style={{ minWidth: "15rem" }}
              sortable
          />
        </DataTable>
      )}
    </Fragment>
  );
};

export default NewOrderTable;
