import React, { useEffect, useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch } from "react-redux";
import { confirmPopup, ConfirmPopup } from "primereact/confirmpopup";
import GoBackButton from "../../../components/Admin/Buttons/GoBackButton";
import { dataTabelStyle } from "../../../layout/dataTabelStyle";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios"; 
import { Button } from "primereact/button"; // Button for delete action
import { Toast } from "primereact/toast";


const SingleOrderDetails = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); 
  const navigate = useNavigate();
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
        src={rowData.product.gallery[0]?.url || "default-thumbnail.png"}
        alt={rowData.product.title || "Product"}
        className="w-12 h-12 object-cover rounded mr-4"
      />
      <Link
        to={`/admin/products/update/${rowData.product._id}`}
        className="text-black dark:text-white font-semibold hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
      >
        {rowData.product.title || "Untitled Product"}
      </Link>
    </div>
  );

  const quantityBodyTemplate = (rowData) => (
    <span>{rowData.quantity || 0}</span>
  );

  const priceBodyTemplate = (rowData) => (
    <span>${(rowData.product.price || 0).toFixed(2)}</span>
  );

  const subtotalBodyTemplate = (rowData) => (
    <span>${(rowData.subTotalPriceAfterDiscount || 0).toFixed(2)}</span>
  );
  const handleDeleteProduct = async (id) => {
    try {
      console.log(`Attempting to delete product with ID: ${id}`); // Log the ID
  
      // Sending delete request to the backend
      const response = await axios.delete(`http://localhost:5000/api/v1/products/${id}`, {
        withCredentials: true, // Include credentials
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      // Check if the response indicates success
      if (response.status === 200) {
        console.log("Product deleted successfully."); // Success log
  
        // Show success toast notification
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Product deleted successfully",
          life: 2000,
        });
  
        // Reload the page or refresh the product list
        setTimeout(() => {
          window.location.reload(); // Option to refresh the page
        }, 2000);
      } else {
        console.error('Failed to delete the Product'); // Log if deletion failed
        throw new Error('Failed to delete the Product');
      }
    } catch (error) {
      console.error("Error during deletion:", error.response || error.message); // Log the actual error
  
      // Show error toast notification
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: error.response?.data.message || 'An error occurred while deleting the Product.',
        life: 2000,
      });
    }
  };
  
  
  const confirmDeleteProduct = (event, id) => {
    confirmPopup({
      target: event.currentTarget,
      message: "Are you sure you want to delete this order?",
      icon: "pi pi-exclamation-triangle",
      accept: () => handleDeleteProduct(id),
      reject: () =>
        toast.current.show({
          severity: "warn",
          summary: "Canceled",
          detail: "Product deletion was canceled",
          life: 2000,
        }),
    });
  };

  // Delete button template for each order item
  const deleteButtonTemplate = (rowData) => (
    <Button
    icon="pi pi-trash"
    rounded
    outlined
    severity="danger"
    aria-label="Delete order"
    onClick={(e) => confirmDeleteProduct(e, rowData.product_id)}
    className="dark:border-red-600"
  />
  );

  return (
    <div>
      <Toast ref={toast} position="bottom-left" />

      <GoBackButton />
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

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
        <Column body={deleteButtonTemplate} header="Actions" /> {/* Delete action column */}
      </DataTable>

      <ConfirmPopup />
    </div>
  );
};

export default SingleOrderDetails;
