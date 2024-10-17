import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import { FaChevronRight } from "react-icons/fa";
import axios from "axios"; 
import ProductPrice from '../../../components/Client/ProductDetails/ProductPrice';

const ShoppingCartSidebar = ({ isSidebarOpen, setSidebarOpen }) => {
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // جلب بيانات السلة من localStorage عند فتح الـ Sidebar
  useEffect(() => {
    if (isSidebarOpen) {
      const storedCartProducts = JSON.parse(localStorage.getItem("cartItems")) || [];
      console.log("Stored Cart Products:", storedCartProducts);

      setCartProducts(storedCartProducts);
      console.log(" Cart Products:", cartProducts);

      calculateSubtotal(storedCartProducts);
    }
  }, [isSidebarOpen]);

  const calculateSubtotal = (products) => {
    const total = products.reduce((acc, product) => {
      const discount = product.discount || 0; // القيمة الافتراضية 0 إذا لم يكن هناك خصم
      const newPrice = product.price * (1 - discount / 100); // حساب السعر الجديد
      return acc + (newPrice * product.quantity); // ضرب في الكمية
    }, 0);
    setSubtotal(total);
  };

  const handleRemoveProduct = (productId) => {
    const updatedProducts = cartProducts.filter(product => product._id !== productId);
    setCartProducts(updatedProducts);
    localStorage.setItem("cartItems", JSON.stringify(updatedProducts));
    calculateSubtotal(updatedProducts);
  };

  return (
    <Sidebar 
      visible={isSidebarOpen} 
      onHide={() => setSidebarOpen(false)} 
      className="dark:bg-gray-900 relative" 
      style={{ width: '600px', height: '100vh', right: 0 }}
      position="right" 
    >
      <h2 className="text-3xl font-bold mb-4 pb-5 dark:text-white">Shopping Cart</h2>

      {cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <div key={product._id} className="text-lg font-bold pb-5 dark:text-white">
            <img src={product.gallery[0].url} alt={product.title} className="w-24 h-24" />
            <div>
              <p>{product.title}</p>
              <p>Quantity: {product.quantity}</p>
              <ProductPrice product={product} onNewPrice={() => { }} />
            </div>
            <button
              className="text-blue-500 border-none dark:text-white"
              onClick={() => handleRemoveProduct(product._id)}
            >
              Remove
            </button>
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500 dark:text-white">No items in the cart</p>
      )}

      <div className="mt-auto pt-80 dark:text-white">
        <hr className="w-full bg-gray-300 dark:text-white" />
        <p className="text-2xl font-bold pt-10 dark:text-white">
          Subtotal: {subtotal.toFixed(2)} EGP
        </p>
        <p>Shipping and taxes will be calculated at checkout.</p>

        <Link to="/checkOut">
          <Button label="Checkout" className="p-button-warning w-full mt-4 text-lg dark:text-white" />
        </Link>

        <div className="flex justify-center items-center my-2 dark:text-white">
          <span>Or</span>
        </div>

        <Link
          to="/"
          className="flex items-center text-blue-500 hover:underline text-xl w-full justify-center dark:text-white"
          onClick={(e) => {
            e.preventDefault();
            setSidebarOpen(false);
          }}
        >
          Continue Shopping
          <FaChevronRight className="ml-2" />
        </Link>
      </div>
    </Sidebar>
  );
};

export default ShoppingCartSidebar;
