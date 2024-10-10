
import React from 'react';

const ProductPrice = ({ product }) => {
    // Calculate the new price after discount
    const oldPrice = product.price;
    const discount = product.discount; // Assuming discount is a percentage
    const newPrice = (oldPrice * (1 - discount / 100)).toFixed(2); // Calculate new price

    return (
        <div className="flex items-center pb-5 pl-4">
            {/* Old price */}
            <p className="text-lg text-gray-500 line-through mr-4">{oldPrice} $</p>

            {/* New price */}
            <p className="text-xl text-black font-semibold mr-4">{newPrice} $</p>

            {/* Discount */}
            <p className="text-lg text-red-500 font-semibold">{discount}% Off</p>
        </div>
    );
};

export default ProductPrice;
