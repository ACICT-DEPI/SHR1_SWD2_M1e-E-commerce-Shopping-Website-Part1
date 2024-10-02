import React from 'react';
import { useNavigate } from 'react-router-dom';

const AddProductButton = () => {
const navigate = useNavigate();

const handleButtonClick = () => {
navigate('/add-product');
};

return (
<button
    onClick={handleButtonClick}
    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
>
    Add New Product
</button>
);
};

export default AddProductButton;
