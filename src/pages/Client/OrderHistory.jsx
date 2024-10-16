import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { FaEye } from 'react-icons/fa'; // Import eye icon from react-icons

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const fetchOrders = async () => {
    try {
      const response = await axios.get('https://server-esw.up.railway.app/api/v1/orders/my-orders', {
        withCredentials: true,
      });

      console.log('API Response:', response.data); // Log the API response for debugging

      if (response.data && response.data.status === 'success' && Array.isArray(response.data.data)) {
        const validOrders = response.data.data.filter(order => 
          order && 
          order._id && 
          Array.isArray(order.orderItems) && // Ensure orderItems is an array
          order.orderItems.length > 0 // Check that orderItems has values
        );
        setOrders(validOrders);
      } else {
        throw new Error('Unexpected response structure');
      }

      setLoading(false);
    } catch (error) {
      if (error.response) {
        console.error('Response error:', error.response);
      } else if (error.request) {
        console.error('Request error:', error.request);
        setError('No response received from the server.');
      } else {
        console.error('General error:', error.message);
        setError('Error occurred while fetching orders.');
      }

      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Handle loading and error states
  if (loading) return <div className="text-center">Loading orders...</div>;
  if (error) return <div className="text-center text-red-600">Error: {error}</div>;

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
        <h1 className="text-3xl font-semibold mb-4 text-gray-900 dark:text-white">Order History</h1>
        <p className="text-gray-500 dark:text-gray-300 mb-8">
          Check the status of recent orders, manage returns, and discover similar products.
        </p>
        
        {orders.length === 0 ? (
          <div className="text-center text-lg text-gray-700 dark:text-gray-300">
            <p>No orders found. Please check back later.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div key={order._id} className="p-6 border border-gray-300 dark:border-gray-700 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="font-medium">Order number</p>
                    <p className="text-lg text-gray-800 dark:text-gray-200">{order._id}</p>
                  </div>
                  {/* Hide the date on mobile */}
                  <div className="hidden md:block">
                    <p className="font-medium">Date placed</p>
                    <p className="text-gray-800 dark:text-gray-200">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="font-medium">Total amount</p>
                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  {/* View Order button for desktop */}
                  <button className="hidden md:block bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => navigate(`/my-orders/${order._id}`)}>
                    View Order
                  </button>
                  {/* View Order icon for mobile */}
                  <button 
                    className="md:hidden text-blue-500 hover:text-blue-600" 
                    onClick={() => navigate(`/my-orders/${order._id}`)} // Navigate to order details
                  >
                    <FaEye /> {/* Eye icon for mobile */}
                  </button>
                </div>
                {/* Payment Status and Shipping Status side by side */}
                <div className="flex gap-4 justify-start mb-4">
                  <div className={`py-1 px-2 rounded-lg text-center text-sm font-semibold shadow ${getStatusColor(order.payment_status)}`}>
                    {order.payment_status}
                  </div>
                  <div className={`py-1 px-2 rounded-lg text-center text-sm font-semibold shadow ${getShippingStatusColor(order.status)}`}>
                    {order.status || 'Unknown'}
                  </div>
                </div>


                {order.orderItems.length > 0 && (
                  <div className="flex flex-col space-y-4">
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
                            {/* Hide the description on mobile */}
                            <p className="hidden md:block text-gray-500 dark:text-gray-400">{item.product.description || 'No description available'}</p>
                            <p className="font-medium text-gray-900 dark:text-white">${item.product.price ? item.product.price.toFixed(2) : '0.00'}</p>
                            <div className="flex gap-4 mt-2">
                              <button 
                                className="text-blue-500 hover:underline" 
                                onClick={() => navigate(`/product/${item.product._id}`)} // Navigate to product details
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
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
