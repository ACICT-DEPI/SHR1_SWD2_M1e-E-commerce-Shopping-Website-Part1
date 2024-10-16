import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaEye } from 'react-icons/fa';

const OrderDetails = () => {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchOrderDetails = async () => {
    try {
      const response = await axios.get(`https://server-esw.up.railway.app/api/v1/orders/${id}`, {
        withCredentials: true,
      });

      if (response.data && response.data.status === 'success') {
        setOrder(response.data.data);
      } else {
        throw new Error('Unexpected response structure');
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching order details:', error);
      setError('Error occurred while fetching order details.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  if (loading) return <div className="text-center">Loading order details...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

  if (!order) return <div className="text-center">No order details found.</div>;

  const getStatusColor = (status) => {
    switch (status) {
      case 'Paid':
        return 'bg-green-500 text-white';
      case 'Unpaid':
        return 'bg-yellow-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  const getShippingStatusColor = (status) => {
    switch (status) {
      case 'Shipped':
        return 'bg-blue-500 text-white';
      case 'Pending':
        return 'bg-purple-500 text-white';
      case 'Completed':
        return 'bg-green-500 text-white';
      case 'Cancelled':
        return 'bg-red-500 text-white';
      default:
        return 'bg-gray-300 text-black';
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-4xl p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Thank you for your order!</h1>
        <p className="text-gray-500 dark:text-gray-300 mb-8">
        To finalize your order, we kindly ask you to make the payment. Please proceed to the payment section below to complete your purchase.
        </p>

        <div className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg">
          <div className="flex justify-between items-center mb-4">
            <div>
              <p className="font-medium">Order number</p>
              <p className="text-lg text-gray-800 dark:text-gray-200">{order._id}</p>
            </div>
            <div className="hidden md:block"> {/* Hide in mobile view */}
              <p className="font-medium">Date placed</p>
              <p className="text-gray-800 dark:text-gray-200">{new Date(order.createdAt).toLocaleDateString()}</p>
            </div>
            <div>
              <p className="font-medium">Total amount</p>
              <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">${order.totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Payment and shipping status */}
          <div className="flex gap-4 justify-start mb-4">
            <div className={`py-1 px-2 rounded-lg text-center text-sm font-semibold shadow ${getStatusColor(order.payment_status)}`}>
              {order.payment_status}
            </div>
            <div className={`py-1 px-2 rounded-lg text-center text-sm font-semibold shadow ${getShippingStatusColor(order.status)}`}>
              {order.status || 'Unknown'}
            </div>
          </div>

          {/* Order items */}
          {order.orderItems && order.orderItems.length > 0 && (
            <div className="space-y-4 mb-4">
              {order.orderItems.map((item, index) => (
                item.product ? (
                  <div key={index} className="flex gap-4 p-4 border rounded-lg border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-700">
                    {item.product.gallery && Array.isArray(item.product.gallery) && item.product.gallery.length > 0 ? (
                      <img 
                        src={item.product.gallery[0].url} 
                        alt={item.product.title} 
                        className="w-24 h-24 object-cover rounded" 
                      />
                    ) : (
                      <div className="w-24 h-24 bg-gray-300 rounded" /> // Placeholder for missing image
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 dark:text-white">{item.product.title || 'Unknown Product'}</p>
                      <p className="hidden md:block text-gray-500 dark:text-gray-400">{item.product.description || 'No description available'}</p>
                      <p className="font-medium text-gray-900 dark:text-white">${item.product.price ? item.product.price.toFixed(2) : '0.00'}</p>
                      <div className="flex gap-4 mt-2">
                        <button 
                          className="text-blue-500 hover:underline" 
                          onClick={() => navigate(`/product/${item.product._id}`)}
                        >
                          View product
                        </button>
                        <a href="#" className="text-blue-500 hover:underline">Write a review</a>
                      </div>
                    </div>
                  </div>
                ) : null
              ))}
            </div>
          )}

          {/* Shipping and Billing Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Shipping Address:</h3>
              <p>{order.shippingAddress1}, {order.shippingAddress2}</p>
              <p>{order.city}, {order.zip}, {order.country}</p>
              <p>Phone: {order.phone}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">User Information:</h3>
              <p>{order.user.firstName} {order.user.lastName}</p>
            </div>
          </div>

          {/* Payment and Shipping Method */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <h3 className="text-lg font-semibold">Payment Method:</h3>
              <p>{order.paymentMethod || 'Not specified'}</p>
            </div>
            <div>
              <h3 className="text-lg font-semibold">Shipping Method:</h3>
              <p>{order.shippingMethod || 'Not specified'}</p>
            </div>
          </div>

          {/* Order Summary */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Summary:</h3>
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>${order.totalPriceAfterDiscount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold">
              <span>Total:</span>
              <span>${order.totalPrice.toFixed(2)}</span>
            </div>
          </div>

          {/* Back to Orders Button */}
          <button 
            className="mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            onClick={() => navigate('/my-orders')}
          >
            Back to Orders
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
