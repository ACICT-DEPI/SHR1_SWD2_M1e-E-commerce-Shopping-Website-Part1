import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import ProductTabs from './ProductTap'; 
import ControlledDemo from './ControlledDemo';
import styled from 'styled-components';
import ProductPrice from './ProductPrice';
import axios from 'axios';
import { FaChevronRight } from 'react-icons/fa';

const Paragraph = styled.p`
  font-size: 1.4rem;
  line-height: 1.7;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
   height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
  backdrop-filter: blur(5px);
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  width: 600px;
  height: 100vh;
  background-color: white;
  z-index: 1000;
  box-shadow: -2px 0px 8px rgba(0, 0, 0, 0.2);
  transform: ${(props) => (props.isOpen ? 'translateX(0)' : 'translateX(100%)')};
  transition: transform 0.3s ease;
  padding: 20px;
`;

const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  img {
    width: 60px;
    height: 60px;
  }
  p {
    margin: 0;
  }
`;

const SectionOne = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const [newPrice, setNewPrice] = useState(0); // لحفظ السعر الجديد
  const [subtotal, setSubtotal] = useState(0); // لحساب المجموع الفرعي
  const [isProductInCart, setIsProductInCart] = useState(true); // لإدارة حالة المنتج في السلة
  const {id} = useParams();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/products/${id}`);
        if (response.status === 200) {
          setProduct(response.data.data);
          setSubtotal(response.data.data.newPrice * quantity); // حساب المجموع الفرعي
        }
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProductData();
  }, [id]);

  useEffect(() => {
    setSubtotal(newPrice * quantity);
 }, [newPrice, quantity]);
 


  const handleAddToCart = () => {
    setSidebarOpen(true);
    setIsProductInCart(true); // عند إضافة المنتج للسلة
  };


  const handleNewPriceUpdate = (calculatedPrice) => {
    setNewPrice(calculatedPrice); // تحديث السعر الجديد
  };

  const handleClickOutside = () => {
    setSidebarOpen(false);
  };

  const handleRemoveProduct = () => {
    setIsProductInCart(false); // إزالة المنتج من السلة
    setSubtotal(0); // تصفير المجموع الفرعي
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="relative  ">
      {isSidebarOpen && <Overlay onClick={handleClickOutside} />}

      <div className={isSidebarOpen ? 'blur-lg' : ''}>
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
              <ProductPrice product={product} onNewPrice={handleNewPriceUpdate} />
              
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
                  className="w-20 p-3 border border-gray-900 rounded-md text-center text-gray-900"
                />
                <Button
                  label="Add to Cart"
                  className="p-button-success p-4 text-lg"
                  style={{ width: '400px' }}
                  onClick={handleAddToCart} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* الشريط الجانبي */}
      <Sidebar isOpen={isSidebarOpen}  className="dark:bg-gray-900 relative ">
        <h2 className="text-3xl font-bold mb-4 pb-5 ">Shopping Cart</h2>

        {isProductInCart ? (
          <CartItem 
           className="text-lg font-bold pb-5"
          >
            <img src={product.image} alt={product.title} />
            <div>
              <p>{product.title}</p>
              <p>Quantity: {quantity}</p>
              <p>Price: {newPrice} $</p>
            </div>
            <button
              className="text-blue-500 border-none"
              onClick={handleRemoveProduct} 
            >
              Remove
            </button>
          </CartItem>
        ) : (
          <p className="text-center text-gray-500">No items in the cart</p> 
        )}
         
        <div className="mt-auto pt-80">
        <hr className="w-full  bg-gray-300" />
          <p className="text-2xl font-bold pt-10">Subtotal: {subtotal.toFixed(2)} $</p>
          <p>Shipping and taxes will be calculated at checkout.</p>

          <Link to="/checkout">
            <Button
              label="Checkout"
              className="p-button-warning w-full mt-4 text-lg"
            />
          </Link>

          <div className="flex justify-center items-center my-2">
            <span>Or</span>
          </div>

          <Link to="#"
  className="flex items-center text-blue-500 hover:underline text-xl w-full justify-center"
  onClick={(e) => {
    e.preventDefault(); // منع الانتقال إلى الصفحة
    setSidebarOpen(false); // أغلق الشريط الجانبي إذا كان مفتوحًا
  }}
>
  Continue Shopping
  <FaChevronRight className="ml-2" /> {/* سهم يشير إلى اليمين */}
</Link>
        </div>
      </Sidebar>
      {/* ProductTabs */}
      <ProductTabs
         description={product.description}
        reviews={product.reviews || []}
        />
    </div>
  );
};

export default SectionOne;


