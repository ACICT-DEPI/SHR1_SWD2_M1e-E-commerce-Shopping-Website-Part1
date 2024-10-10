import React, { useState, useEffect, useRef } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import axios from 'axios';  // Import axios
import { Link } from 'react-router-dom';  // Assuming you're using React Router

const SearchComponent = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);

    // Reference for the search container
    const searchRef = useRef(null);

    // Function to fetch products by name using Axios
    const searchItems = async (event) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/products?query=${event.query}`);  // Use search query
            const products = response.data.data.products;  // Adjust based on your API response
            const formattedItems = products.map(product => ({
                id: product._id,
                title: product.title,
                banner: product.category.banner.url,  // Get banner from category
                link: `/products/${product._id}`  // Create a link using the product ID
            }));
            setFilteredItems(formattedItems);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    // Handle click outside and ESC key press
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                onClose(); // Close the search pop-up when clicked outside
            }
        };

        const handleEscKeyPress = (event) => {
            if (event.key === 'Escape') {
                onClose(); // Close the search pop-up when ESC is pressed
            }
        };

        // Add event listeners when the component is mounted
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKeyPress);

        // Clean up event listeners when the component is unmounted
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div 
                ref={searchRef} 
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96"
            >
                <h2 className="text-center text-lg font-bold mb-4 text-black dark:text-white">
                    Search
                </h2>
                <AutoComplete
                    value={searchTerm}
                    suggestions={filteredItems}  // Use the filtered items from the API
                    completeMethod={searchItems}  // Call the function to fetch products
                    field="title"  // Display the title of the products in suggestions
                    onChange={(e) => setSearchTerm(e.value)}
                    placeholder="Search for products"
                    className="w-full dark:bg-gray-700 dark:text-white"
                    itemTemplate={(item) => (
                        <div className="p-2 flex items-center">
                            <img 
                                src={item.banner} 
                                alt={item.title} 
                                className="w-10 h-10 mr-2" 
                            />
                            <Link to={item.link} className="text-blue-500 hover:underline">
                                {item.title}
                            </Link>
                        </div>
                    )}
                />
                <div className="mt-4 flex justify-end">
                    <button 
                        className="bg-blue-500 dark:bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-600 dark:hover:bg-blue-700"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
