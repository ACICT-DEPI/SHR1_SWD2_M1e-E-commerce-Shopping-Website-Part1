import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";

const Cart = () => {
    const navigate = useNavigate(); 
    const cartItems = useSelector((state) => state.cart?.cartItems || []); // Use optional chaining and fallback to an empty array

    const handleContinueShopping = () => {
        navigate("/"); // Redirect to the home page (UserPage)
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <FaShoppingCart className="text-gray-500 text-[10rem] mb-8" />
            <div className="text-center">
                {cartItems.length > 0 ? (
                    cartItems.map((item) => (
                        <div key={item.id}>
                            <h3>{item.name}</h3>
                            <p>Price: {item.price}</p>
                            <p>Quantity: {item.qty}</p>
                        </div>
                    ))
                ) : (
                    <>
                        <p className="text-2xl text-gray-600 mb-2">
                            Your shopping cart is currently empty
                        </p>
                        <p className="text-lg text-gray-500 mb-8 max-w-lg mx-auto">
                            Before you proceed to checkout, you must add some products to your shopping cart.
                        </p>
                    </>
                )}
            </div>
            <button
                onClick={handleContinueShopping}
                className="bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600 focus:outline-none mt-8"
            >
                Continue Shopping
            </button>
        </div>
    );
};

export default Cart;
