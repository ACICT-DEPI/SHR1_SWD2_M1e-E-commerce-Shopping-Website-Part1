import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { useParams, Link } from "react-router-dom";
import axios from "axios"; 
import { Button } from "primereact/button"; 
import { Toast } from "primereact/toast";

const SingleOrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const [order, setOrder] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useRef(null);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(response.data.data);
      } catch (err) {
        setError("Failed to fetch order details.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!order) return <div>No order found for ID: {id}</div>;

  // Status Template
  const statusTemplate = (rowData) => (
    <span
      className={`text-sm font-semibold ${
        rowData.status === "completed" ? "text-green-600" :
        rowData.status === "pending" ? "text-yellow-500" :
        "text-red-500"
      }`}
    >
      {rowData.status.charAt(0).toUpperCase() + rowData.status.slice(1)}
    </span>
  );

  // Product template with link to product update page
  const productBodyTemplate = (rowData) => (
    <div className="flex items-center">
      <img
        src={rowData.product?.gallery[0]?.url || "default-thumbnail.png"}
        alt={rowData.product?.title || "Product"}
        className="w-12 h-12 object-cover rounded mr-4"
      />
      <Link
        to={`/admin/products/update/${rowData.product?._id}`}
        className="text-black dark:text-white font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
      >
        {rowData.product?.title || "Untitled Product"}
      </Link>
    </div>
  );

  const quantityBodyTemplate = (rowData) => (
    <span>{rowData.quantity || 0}</span>
  );

  const priceBodyTemplate = (rowData) => (
    <span>${(rowData.product?.price || 0).toFixed(2)}</span>
  );

  const subtotalBodyTemplate = (rowData) => (
    <span>${(rowData.subTotalPriceAfterDiscount || 0).toFixed(2)}</span>
  );
 
 
  return (
    <div>
      <Toast ref={toast} position="bottom-left" />

      <div className="flex items-center">
          <GoBackButton />
          <h1 className="inline-block ml-4 text-3xl dark:text-white">
            #{order._id}
          </h1>
        </div>

      <div className="mb-4">
        <h3 className="text-xl">Customer Information</h3>
        <p><strong>Name:</strong> {order.user.firstName} {order.user.lastName}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Address:</strong> {order.shippingAddress1}, {order.shippingAddress2}, {order.city}, {order.zip}, {order.country}</p>
      </div>

      <div className="mb-4">
        <h3 className="text-xl">Order Summary</h3>
        <p><strong>Status:</strong> {statusTemplate(order)}</p> 
        <p><strong>Total Price:</strong> ${order.totalPrice.toFixed(2)}</p>
        <p><strong>Total Price After Discount:</strong> ${order.totalPriceAfterDiscount.toFixed(2)}</p>
      </div>

      <DataTable value={order.orderItems} style={dataTabelStyle}>
        <Column field="product.title" header="Product" body={productBodyTemplate} />
        <Column field="quantity" header="Quantity" body={quantityBodyTemplate} />
        <Column field="product.price" header="Price" body={priceBodyTemplate} />
        <Column field="subTotalPriceAfterDiscount" header="Subtotal" body={subtotalBodyTemplate} />
      </DataTable>

    </div>
  );
};

export default SingleOrderDetails;
