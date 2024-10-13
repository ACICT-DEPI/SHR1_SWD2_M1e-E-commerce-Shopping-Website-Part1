import React, { useEffect, useState } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { inputTextStyle } from "../../layout/inputTextStyle";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import axios from "axios"; // تأكد من استيراد axios

const CheckoutPage = () => {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [paymentType, setPaymentType] = useState("cod");
  const [cartProducts, setCartProducts] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const [email, setEmail] = useState(""); // حالة لحفظ البريد الإلكتروني

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

  const handlePayment = async () => {
    const orderData = {
      orderItems: cartProducts.map(product => ({
        product: product._id, // استخدم معرف المنتج من سلة التسوق
        quantity: product.quantity,
      })),
      shippingAddress1: "address 1",
      shippingAddress2: "address 2",
      city: "Nasr",
      zip: "452",
      country: "Alex",
      phone: "12313313333",
    };

    try {
      // إرسال الطلب لإنشاء الطلب
      const response = await axios.post(
        "https://server-esw.up.railway.app/api/v1/orders/make-order",
        orderData,
        { withCredentials: true }
      );

      // استخراج مفاتيح الدفع
      const { paymentKey, frame_id } = response.data.data;

      // إعادة توجيه إلى iframe الدفع
      if (paymentKey) {
        window.location.href = `https://accept.paymob.com/api/acceptance/iframes/${frame_id}?payment_token=${paymentKey}`;
      }
    } catch (error) {
      console.error("Payment initiation failed:", error.response.data);
    }
  };

  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row justify-between">
      {/* Form Section */}
      <div className="w-full lg:w-2/3">
        <div className="flex flex-col lg:flex-row justify-center items-start p-8">
          {/* Left Section */}
          <div className="w-full lg:w-2/3">
            <h2 className="text-4xl font-bold mb-6 dark:text-white">Checkout</h2>


            {/* Shipping Information */}
            <section className="mb-8">
              <h3 className="text-2xl font-semibold mb-4 dark:text-white">Shipping Information</h3>

              <div className="mb-4">
                <label htmlFor="address" className="block mb-2 dark:text-white">Address</label>
                <InputText id="address" className="w-full" pt={inputTextStyle} />
              </div>
              <div className="mb-4">
                <label htmlFor="city" className="block mb-2 dark:text-white">City</label>
                <InputText id="city" className="w-full" pt={inputTextStyle} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="country" className="block mb-2 dark:text-white">Country</label>
                  <InputText id="country" className="w-full" pt={inputTextStyle} />
                </div>
                <div>
                  <label htmlFor="zip" className="block mb-2 dark:text-white">ZIP / Postal code</label>
                  <InputText id="zip" className="w-full" pt={inputTextStyle} />
                </div>
              </div>
              <div className="mb-4">
                <label htmlFor="phone" className="block mb-2 dark:text-white">Phone</label>
                <InputText id="phone" className="w-full" pt={inputTextStyle} />
              </div>
            </section>

            <section>
              <Link
                className="text-white hover:underline text-base font-medium mt-8 block text-center bg-blue-500 py-3 rounded-md mt-20 dark:text-black"
                onClick={handlePayment} // تأكد من استخدام دالة المعالجة الصحيحة
              >
                Confirm order
              </Link>
            </section>
          </div>

          {/* Confirm Order Button */}

        </div>
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
        <div className="p-4 md:p-8 lg:p-12 border border-gray-200 rounded-lg shadow-xl bg-gray-50 w-full lg:w-7/8 xl:w-10/14 lg:sticky top-16 h-auto min-h-[700px] dark:bg-gray-900 mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Order Summary</h2>
          {cartProducts.length > 0 ? (
            <>
              {cartProducts.map((product) => (
                <div key={product._id} className="flex flex-col md:flex-row justify-between items-center mb-6">
                  {/* Product Image */}
                  <img
                    src={product.gallery[0].url}
                    alt={product.title}
                    className="w-16 h-16 object-cover rounded-md mr-4"
                  /> 
                  <div className="flex flex-col md:flex-grow">
                    <h3 className="font-semibold dark:text-white">{product.title}</h3>
                    <p className="text-gray-800 dark:text-gray-300">
                      ${product.price} x {product.quantity} = ${(product.price * product.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
              <div className="border-t border-gray-300 mt-4 pt-4">
                <div className="flex justify-between">
                  <span className="font-semibold dark:text-white">Subtotal:</span>
                  <span className="font-semibold dark:text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-semibold dark:text-white">Shipping:</span>
                  <span className="font-semibold dark:text-white">$0.00</span>
                </div>
                <div className="flex justify-between font-bold text-lg">
                  <span>Total:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
              </div>
            </>
          ) : (
            <p className="text-gray-600 dark:text-gray-400">Your cart is empty.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
