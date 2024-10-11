import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { RadioButton } from "primereact/radiobutton";
import { Checkbox } from "primereact/checkbox";
import { Button } from "primereact/button";

const Checkout = () => {
const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
const [paymentType, setPaymentType] = useState("cod");

return (
<div className="flex flex-col lg:flex-row justify-center items-start p-8">
    {/* Left Section */}
    <div className="w-full lg:w-2/3">
    <h2 className="text-2xl mb-6">Checkout</h2>

    {/* Contact Information */}
    <section className="mb-8">
        <h3 className="text-xl mb-4">Contact information</h3>
        <div className="mb-4">
        <label htmlFor="email" className="block mb-2">Email address</label>
        <InputText id="email" className="w-full" />
        </div>
        <p className="text-sm text-gray-600">Already have an account? <a href="/signin" className="text-blue-600">Sign in</a></p>
    </section>

    {/* Shipping Information */}
    <section className="mb-8">
        <h3 className="text-xl mb-4">Shipping information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="name" className="block mb-2">Your name</label>
            <InputText id="name" className="w-full" />
        </div>
        <div>
            <label htmlFor="company" className="block mb-2">Company (optional)</label>
            <InputText id="company" className="w-full" />
        </div>
        </div>

        <div className="mb-4">
        <label htmlFor="address" className="block mb-2">Address</label>
        <InputText id="address" className="w-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="apartment" className="block mb-2">Apartment, suite, etc.</label>
            <InputText id="apartment" className="w-full" />
        </div>
        <div>
            <label htmlFor="city" className="block mb-2">City</label>
            <InputText id="city" className="w-full" />
        </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
            <label htmlFor="country" className="block mb-2">Country</label>
            <InputText id="country" className="w-full" />
        </div>
        <div>
            <label htmlFor="state" className="block mb-2">State / Province</label>
            <InputText id="state" className="w-full" />
        </div>
        <div>
            <label htmlFor="zip" className="block mb-2">ZIP / Postal code</label>
            <InputText id="zip" className="w-full" />
        </div>
        </div>

        <div>
        <label htmlFor="phone" className="block mb-2">Phone</label>
        <InputText id="phone" className="w-full" />
        </div>
    </section>

    {/* Delivery Method */}
    <section className="mb-8">
        <h3 className="text-xl mb-4">Delivery method</h3>
        <div className="flex items-center mb-4">
        <RadioButton inputId="standard" name="delivery" value="standard" />
        <label htmlFor="standard" className="ml-2">Standard (7-10 business days) - $30.00</label>
        </div>
        <div className="flex items-center mb-4">
        <RadioButton inputId="express" name="delivery" value="express" />
        <label htmlFor="express" className="ml-2">Express (3-5 business days) - $40.00</label>
        </div>
    </section>

    {/* Billing Information */}
    <section className="mb-8">
        <h3 className="text-xl mb-4">Billing information</h3>
        <div className="flex items-center mb-4">
        <Checkbox
            inputId="sameAsShipping"
            checked={billingSameAsShipping}
            onChange={(e) => setBillingSameAsShipping(e.checked)}
        />
        <label htmlFor="sameAsShipping" className="ml-2">Billing address is the same as shipping address</label>
        </div>
    </section>

    {/* Payment */}
    <section className="mb-8">
        <h3 className="text-xl mb-4">Payment</h3>
        <div className="flex items-center mb-4">
        <RadioButton
            inputId="cod"
            name="payment"
            value="cod"
            onChange={(e) => setPaymentType(e.value)}
            checked={paymentType === "cod"}
        />
        <label htmlFor="cod" className="ml-2">Cash on Delivery</label>
        </div>
        <p className="text-sm text-gray-600">Pay with cash on delivery</p>

        <div className="mb-4">
        <label htmlFor="orderNotes" className="block mb-2">Order notes (optional)</label>
        <textarea id="orderNotes" className="w-full border border-gray-300 p-2 rounded-md" />
        </div>

        <Button label="Place Order" className="bg-blue-500 text-white px-4 py-2 rounded" />
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
