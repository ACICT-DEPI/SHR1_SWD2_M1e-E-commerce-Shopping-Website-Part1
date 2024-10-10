
import React, { useEffect } from 'react';

const ProductPrice = ({ product, onNewPrice }) => {
    // حساب السعر الجديد بعد الخصم
    const oldPrice = product.price;
    const discount = product.discount; // الخصم كنسبة مئوية
    const newPrice = (oldPrice * (1 - discount / 100)).toFixed(2); // حساب السعر الجديد

    // تمرير السعر الجديد إلى المكون الرئيسي
    useEffect(() => {
        onNewPrice(newPrice); // تحديث السعر الجديد في المكون الرئيسي
    }, [newPrice, onNewPrice]);

    return (
        <div className="flex items-center pb-5 pl-4">
            {/* السعر القديم */}
            <p className="text-lg text-gray-500 line-through mr-4">{oldPrice} $</p>

            {/* السعر الجديد */}
            <p className="text-xl text-gray font-semibold mr-4">{newPrice} $</p>

            {/* الخصم */}
            <p className="text-lg text-red-500 font-semibold">{discount}% Off</p>
        </div>
    );
};

export default ProductPrice;
