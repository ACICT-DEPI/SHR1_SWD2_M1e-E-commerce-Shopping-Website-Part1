import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import ProductTabs from './ProductTap'; 
import ControlledDemo from './ControlledDemo';
import styled from 'styled-components';
import ProductPrice from './ProductPrice';
import ShoppingCartSidebar from '../SideBar/ShoppingCartSidebar'; // Import the Sidebar component
import axios from 'axios';

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

const SectionOne = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isSidebarOpen, setSidebarOpen] = useState(false); 
  const [newPrice, setNewPrice] = useState(0); 
  const [subtotal, setSubtotal] = useState(0); 
  const { id } = useParams();

  // Fetch product data based on the product ID
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

  useEffect(() => {
    if (product) {
      setNewPrice(product.newPrice); // Update newPrice from the fetched product data
    }
  }, [product]);

  useEffect(() => {
    setSubtotal(newPrice * quantity); // Update subtotal when newPrice or quantity changes
  }, [newPrice, quantity]);

  const handleAddToCart = () => {
    setSidebarOpen(true); // Open sidebar
  };

  const handleNewPriceUpdate = (calculatedPrice) => {
    setNewPrice(calculatedPrice);
  };

  const handleQuantityChange = (newQuantity) => {
    setQuantity(Number(newQuantity)); // Update local quantity
    // Call the sidebar's method to update quantity
    updateProductQuantity(product._id, Number(newQuantity));
  };

  const updateProductQuantity = (productId, newQuantity) => {
    const updatedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const updatedProducts = updatedCartProducts.map(product => 
      product._id === productId ? { ...product, quantity: newQuantity } : product
    );
    localStorage.setItem("cartProducts", JSON.stringify(updatedProducts));
    // If you want to also update the cart in the sidebar directly, 
    // you would have to pass a function to do that or use context/global state
  };

  const handleClickOutside = () => {
    setSidebarOpen(false); // Close sidebar on outside click
  };

  if (!product) {
    return <p>Product not found</p>;
  }

  return (
    <div className="relative">
      {isSidebarOpen && <Overlay onClick={handleClickOutside} />} {/* Blur background on sidebar open */}

      <div className={isSidebarOpen ? 'blur-lg' : ''}> {/* Apply blur effect */}
        <div className="container mx-auto p-4">
          <div className="flex flex-col md:flex-row items-start">
            {/* Product Image */}
            <div className="w-full md:w-1/2 mb-4 md:mb-0 dark:text-white">
              <ControlledDemo />
            </div>

            {/* Product Details */}
            <div className="w-full md:w-1/2 md:pl-8">
              <h1 className="text-5xl font-bold mb-4 pl-4 pt-12 pb-5 dark:text-white">{product.title}</h1>

              {/* Price */}
              <ProductPrice product={product} onNewPrice={handleNewPriceUpdate} />
              
              {/* Rating */}
              <div className="flex items-center mb-4 pb-5 pl-4 dark:text-white">
                <Rating value={product.rating} readOnly stars={5} cancel={false} />
                <span className="ml-5 text-gray-600 dark:text-white">({product.numReviews} Reviews)</span>
              </div>

              {/* Description */}
              <div className="mb-6 pl-4 dark:text-white">
                <Paragraph>{product.excerpt}</Paragraph>
              </div>

              {/* Quantity Selector and Add to Cart Button */}
              <div className="flex items-center space-x-4 mt-6 pl-4 dark:text-white">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => handleQuantityChange(e.target.value)} // Use the new handler
                  min="1"
                  className="w-20 p-3 border border-gray-900 rounded-md text-center text-gray-900" 
                />
                <Button
                  label="Add to Cart"
                  className="p-button-success p-4 text-lg dark:text-white"
                  style={{ width: '400px' }}
                  onClick={handleAddToCart} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      <ShoppingCartSidebar 
    isSidebarOpen={isSidebarOpen} 
    setSidebarOpen={setSidebarOpen} 
    productId={id} 
    newPrice={newPrice} // Add this line
/>
      
      {/* Product Tabs */}
      <ProductTabs
         description={product.description}
         reviews={product.reviews || []}
      />
    </div>
  );
};

export default SectionOne;  
