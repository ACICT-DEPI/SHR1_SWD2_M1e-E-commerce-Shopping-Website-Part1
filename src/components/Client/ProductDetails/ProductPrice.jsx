

import React from 'react';

const ProductPrice = ({ product, onNewPrice }) => {
    // حساب السعر الجديد بعد الخصم
    const oldPrice = product.price;
    const discount = product.discount; // الخصم كنسبة مئوية
    const newPrice = (oldPrice * (1 - discount / 100)).toFixed(2); // حساب السعر الجديد

    // Invoke onNewPrice if it is a function
    React.useEffect(() => {
        if (typeof onNewPrice === 'function') {
            onNewPrice(newPrice);
        }
    }, [newPrice, onNewPrice]);

    return (
        <div className="flex items-center pb-5 pl-4 dark:text-white">
            {/* السعر الجديد */}
            <p className="text-xl text-gray font-semibold mr-4 dark:text-white">{newPrice} EGP</p>

            {/* السعر القديم */}
            <p className="text-md text-gray-500 line-through mr-4 dark:text-white">{oldPrice}EGP</p>

            {/* الخصم */}
            <p className="text-md text-white bg-red-600 w-16 rounded-md  text-center font-normal dark:text-white">{discount}% Off</p>
        </div>
    );
};

export default ProductPrice;
