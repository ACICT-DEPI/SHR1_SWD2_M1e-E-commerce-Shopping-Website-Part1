
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import ProductTabs from './ProductTap'; 
import ControlledDemo from './ControlledDemo';
import styled from 'styled-components';
import ProductPrice from './ProductPrice';
import axios from 'axios';

const Paragraph = styled.p`
    font-size: 1.4rem;
    line-height: 1.7;
`;

const SectionOne = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(false); 

  const {id} = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  const handleAddToCart = () => {
    setSidebarOpen(true); // فتح الشريط الجانبي عند الضغط على زر "Add to Cart"
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col md:flex-row items-start">
        {/* صورة المنتج الرئيسية */}
        <div className="w-full md:w-1/2 mb-4 md:mb-0">
          <ControlledDemo />
        </div>

        {/* تفاصيل المنتج */}
        <div className="w-full md:w-1/2 md:pl-8">
          <h1 className="text-5xl font-bold mb-4 pl-4 pt-12 pb-5">{product.title}</h1>

          {/* السعر */}
          <ProductPrice product={product} />
          {/* التقييم */}
          <div className="flex items-center mb-4 pb-5 pl-4">
            <Rating value={product.rating} readOnly stars={5} cancel={false} />
            <span className="ml-5 text-gray-600">({product.numReviews} Reviews)</span>
          </div>

          {/* Paragraph */}
          <div className="mb-6 pl-4">
            <Paragraph>{product.excerpt}</Paragraph>
          </div>

          {/* زر الإضافة إلى السلة ومحدد الكمية */}
          <div className="flex items-center space-x-4 mt-6 pl-4">
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              className="w-20 p-3 border border-gray-300 rounded-md text-center"
            />
            <Button
              label="Add to Cart"
              className="p-button-success p-4 text-lg"
              style={{ width: '400px' }}
              onClick={handleAddToCart} // تعيين حدث عند الضغط
            />
          </div>
        </div>
      </div>

      {/* الشريط الجانبي */}
      {isSidebarOpen && (
        <div className="fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg p-4">
          <h2 className="text-xl font-semibold">Product Details</h2>
          <p className="text-lg">{product.title}</p>
          <p className="text-lg">{product.price} $</p>
          {/* زر Checkout */}
          <Link to="/checkout">
            <Button label="Checkout" className="p-button-warning" />
          </Link>
          {/* Continue Shopping */}
          <Button label="Continue Shopping" className="p-button-secondary" onClick={() => setSidebarOpen(false)} />
        </div>
      )}

      {/* ProductTabs */}
      <ProductTabs
        description={product.description}
        reviews={product.reviews || []}
      />
    </div>
  );
};

export default SectionOne;
