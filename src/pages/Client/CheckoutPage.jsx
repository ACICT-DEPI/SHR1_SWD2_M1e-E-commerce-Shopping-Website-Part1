

import React from "react";
import Checkout from "../../components/Client/ChackOut/Checkout";
import OrderSummary from "../../components/Client/ChackOut/SammaryOrder";

const CheckoutPage = () => {
  return (
    <div className="container mx-auto p-8 flex flex-col lg:flex-row justify-between">
      {/* Form Section */}
      <div className="w-full lg:w-2/3">
        <Checkout />
      </div>

      {/* Order Summary Section */}
      <div className="w-full lg:w-1/3 lg:ml-8 mt-8 lg:mt-0">
        <OrderSummary />
      </div>
    </div>
  );
};

export default CheckoutPage;