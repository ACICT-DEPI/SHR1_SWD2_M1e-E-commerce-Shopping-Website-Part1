import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";
import { inputTextStyle } from "../../../layout/inputTextStyle";

const Checkout = () => {
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
  const [paymentType, setPaymentType] = useState("cod");

  return (
    <div className="flex flex-col lg:flex-row justify-center items-start p-8">
      {/* Left Section */}
      <div className="w-full lg:w-2/3">
        <h2 className="text-4xl font-bold mb-6 dark:text-white">Checkout</h2>

        {/* Contact Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">Contact Information</h3>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 dark:text-white">Email address</label>
            <InputText id="email" keyfilter="email" className="w-full" pt={inputTextStyle} />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Already have an account? <a href="/signin" className="text-blue-600">Sign in</a></p>
        </section>

        {/* Shipping Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">Shipping Information</h3>
            <div>
              <label htmlFor="name" className="block mb-2 dark:text-white">Your name</label>
              <InputText id="name" className="w-full" pt={inputTextStyle} />
          </div>

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
        {/* Billing Information */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">Billing Information</h3>
          <div className="flex items-center mb-4">
            <Checkbox
              inputId="sameAsShipping"
              checked={billingSameAsShipping}
              onChange={(e) => setBillingSameAsShipping(e.checked)}
            />
            <label htmlFor="sameAsShipping" className="ml-2 dark:text-white">Billing address is the same as shipping address</label>
          </div>
        </section>

        {/* Payment */}
        <section className="mb-8">
          <h3 className="text-2xl font-semibold mb-4 dark:text-white">Payment</h3>
          <div className="flex items-center mb-4">
            <RadioButton
              inputId="cod"
              name="payment"
              value="cod"
              onChange={(e) => setPaymentType(e.value)}
              checked={paymentType === "cod"}
            />
            <label htmlFor="cod" className="ml-2 dark:text-white">Cash on Delivery</label>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">Pay with cash on delivery</p>

          <div className="mb-4">
            <label htmlFor="orderNotes" className="block mb-2 dark:text-white">Order notes (optional)</label>
            <textarea id="orderNotes" className="w-full border border-gray-300 p-2 rounded-md dark:bg-gray-800 dark:text-white" />
          </div>
        </section>
      </div>

      {/* Optional right section (for order summary or any additional info) */}
      <div className="hidden lg:block w-1/3 p-8 border-l border-gray-300">
        {/* Add any additional information or summary here */}
      </div>
    </div>
  );
};

export default Checkout;
