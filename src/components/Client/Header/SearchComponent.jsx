import React, { useState, useEffect, useRef } from 'react';
import { AutoComplete } from 'primereact/autocomplete';
import axios from 'axios';  
import { Link } from 'react-router-dom';  

const SearchComponent = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const [allProducts, setAllProducts] = useState([]); // Store all products
    const searchRef = useRef(null);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/v1/products');
            const products = response.data.data.products;
            const formattedItems = products.map(product => ({
                id: product._id,
                title: product.title,
                banner: product.category.banner.url,
                price: product.price,
                link: `/product/${product._id}` // Store the link as a string
            }));
            setAllProducts(formattedItems); // Save all products
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts(); // Fetch products on component mount
    }, []);

    useEffect(() => {
        const handleClickOutside = (event) => {
            // Check if the click is outside the search component
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                onClose();
            }
        };

        const handleEscKeyPress = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        // Listen for click and keydown events
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscKeyPress);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscKeyPress);
        };
    }, [onClose]);

    const searchItems = (event) => {
        const query = event.query.toLowerCase();
        const filtered = allProducts.filter(item => 
            item.title.toLowerCase().startsWith(query) // Filter by title starts with
        );
        setFilteredItems(filtered);
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
            <div ref={searchRef} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-lg font-bold mb-4 text-black dark:text-white">
                    Search
                </h2>
                <AutoComplete
                    value={searchTerm}
                    suggestions={filteredItems}
                    completeMethod={searchItems}
                    field="title"
                    onChange={(e) => setSearchTerm(e.value)}
                    placeholder="Search for products"
                    className="w-full dark:bg-gray-700 dark:text-white"
                    itemTemplate={(item) => (
                        <div className="p-2 flex items-center">
                            <img 
                                src={item.banner} 
                                alt={item.title} 
                                className="w-10 h-10 mr-4 rounded" 
                            />
                            <div>
                                <Link to={item.link} className="text-blue-500 hover:underline font-bold" onClick={onClose}>
                                    {item.title}
                                </Link>
                                <div className="text-gray-500 dark:text-gray-400">
                                    ${item.price}  {/* Display the price */}
                                </div>
                            </div>
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
