import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const OrderSummary = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartProducts(storedCartProducts);
    calculateSubtotal(storedCartProducts);
  }, []);

  const calculateSubtotal = (products) => {
    const total = products.reduce((acc, product) => {
      const discount = product.discount || 0;
      const newPrice = product.price * (1 - discount / 100);
      return acc + (newPrice * product.quantity);
    }, 0);
    setSubtotal(total);
  };

  return (
    <div className="p-4 md:p-8 lg:p-12 border border-gray-200 rounded-lg shadow-xl bg-gray-50 w-full lg:w-7/8 xl:w-10/14 lg:sticky top-16 h-auto min-h-[700px] dark:bg-gray-900 mx-auto"> {/* Adjusted width classes */}


      <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Summary</h2>
      {cartProducts.length > 0 ? (
        <>
          {cartProducts.map((product) => (
            <div key={product._id} className="flex flex-col md:flex-row justify-between items-center mb-6">
              {/* Product Image */}
              <div className="flex items-center space-x-4">
                <img
                  src={product.gallery[0].url}
                  alt={product.title}
                  className="w-24 h-24 md:w-28 md:h-28 object-cover rounded-lg dark:text-white"
                />
                <div>
                  <p className="text-lg font-semibold dark:text-white">{product.title}</p>
                  <p className="text-gray-500 dark:text-white">Quantity: {product.quantity}</p>
                </div>
              </div>

              {/* Product Price */}
              <div className="text-lg font-bold text-gray-800 dark:text-white mt-4 md:mt-0">
                ${(product.price * (1 - (product.discount || 0) / 100)).toFixed(2)}
              </div>
            </div>
          ))}
          <div className="mt-6 border-t border-gray-300 pt-6 dark:text-white">
            <p className="text-xl font-bold text-gray-800 dark:text-white">Subtotal: ${subtotal.toFixed(2)}</p>
            <p className="text-sm text-gray-500 mt-2 dark:text-white">Shipping and taxes calculated at checkout.</p>
          </div>
        </>
      ) : (
        <p className="text-lg font-medium dark:text-white">Your cart is empty.</p>
      )}

      <Link
        to="/"
        className="text-white hover:underline text-base font-medium mt-8 block text-center bg-blue-500 py-3 rounded-md mt-20 dark:text-black"
      >
        Confirm order
      </Link>
      <div className="flex justify-center mt-8"> {/* Center the link under the button */}
        <Link
          to="/cart"
          className="flex items-center text-black hover:underline text-lg font-medium block text-center dark:text-white"
        >
          <FaArrowLeft className="mr-2" /> {/* Arrow Icon */}
          Modify Cart
        </Link>
      </div>
    </div>
  );
};

export default OrderSummary;
