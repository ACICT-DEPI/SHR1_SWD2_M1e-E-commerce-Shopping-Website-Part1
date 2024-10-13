import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "primereact/button";
import { FaChevronRight } from "react-icons/fa";
import ProductPrice from '../ProductDetails/ProductPrice';

const CartPage = () => {
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
      const oldPrice = product.price;
      const newPrice = oldPrice * (1 - discount / 100);
      return acc + (newPrice * product.quantity);
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
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-900 p-6">
      <h2 className="text-4xl font-bold mb-8 dark:text-white">Shopping Cart</h2>

      {cartProducts.length > 0 ? (
        cartProducts.map((product) => (
          <div key={product._id} className="w-full max-w-4xl flex justify-between items-center mb-6 dark:text-white">
            <img src={product.gallery[0].url} alt={product.title} className="w-24 h-24" />
            <div className="flex-1 ml-4">
              <p>{product.title}</p>
              <p>Quantity: {product.quantity}</p>
              <ProductPrice product={product} onNewPrice={() => {}} />
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

      <div className="w-full max-w-4xl mt-10">
        <hr className="w-full bg-gray-300 dark:text-white" />
        <p className="text-2xl font-bold pt-10 dark:text-white">
          Subtotal: {subtotal.toFixed(2)} $
        </p>
        <p>Shipping and taxes will be calculated at checkout.</p>

        <Link to="/checkOut">
          <Button label="Checkout" className="p-button-warning w-full mt-4 text-lg dark:text-white" />
        </Link>

        <div className="flex justify-center items-center my-4 dark:text-white">
          <span>Or</span>
        </div>

        <Link
          to="/"
          className="flex items-center text-blue-500 hover:underline text-xl w-full justify-center dark:text-white"
        >
          Continue Shopping
          <FaChevronRight className="ml-2" />
        </Link>
      </div>
    </div>
  );
};

export default CartPage;
