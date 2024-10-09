import React, { useState, useEffect, useRef } from 'react';
import { AutoComplete } from 'primereact/autocomplete';

const SearchComponent = ({ onClose }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredItems, setFilteredItems] = useState([]);
    const items = [
        'Headphones',
        'Earbuds',
        'Portable speakers',
        'Turntables',
        'Speakers',
        'Subwoofers',
        'Soundbars',
        'Amplifiers',
        'LED TVs',
        'OLED TVs',
        'Projectors',
        'Smartphones',
        'Apple',
        'LG',
        'Samsung',
        'Xiaomi'
    ];

    const searchItems = (event) => {
        let filtered = items.filter(item => item.toLowerCase().includes(event.query.toLowerCase()));
        setFilteredItems(filtered);
    };

    // Reference for the search container
    const searchRef = useRef(null);

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
            <div ref={searchRef} className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-center text-lg font-bold mb-4">Search</h2>
                <AutoComplete
                    value={searchTerm}
                    suggestions={filteredItems}
                    completeMethod={searchItems}
                    onChange={(e) => setSearchTerm(e.value)}
                    placeholder="Search for products"
                    className="w-full"
                />
                <div className="mt-4 flex justify-end">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded" onClick={onClose}>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchComponent;
