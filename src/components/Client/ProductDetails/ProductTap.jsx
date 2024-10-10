

import React, { useState } from 'react';

const ProductTabs = ({ description, reviews }) => {
  const [activeTab, setActiveTab] = useState('description');

  return (
    <div className="mt-6">
      <div className="flex border-b">
        <button
          className={`py-2 px-4 text-lg ${activeTab === 'description' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-600'}`} // زيادة حجم الخط وإضافة نمط عند التفعيل
          onClick={() => setActiveTab('description')}
        >
          Description
        </button>
        <button
          className={`py-2 px-4 text-lg ${activeTab === 'reviews' ? 'border-b-2 border-blue-600 font-bold text-blue-600' : 'text-gray-600'}`} // زيادة حجم الخط وإضافة نمط عند التفعيل
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      {activeTab === 'description' && (
        <div className="mt-4">
          <p className="text-lg">{description}</p>
        </div>
      )}

      {activeTab === 'reviews' && (
        <div className="mt-4">
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <div key={index} className="border-b pb-2 mb-2">
                <h4 className="font-semibold">{review.username}</h4>
                <p>{review.comment}</p>
                <p className="text-gray-500">{review.rating} Stars</p>
              </div>
            ))
          ) : (
            <p>No reviews available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductTabs;
