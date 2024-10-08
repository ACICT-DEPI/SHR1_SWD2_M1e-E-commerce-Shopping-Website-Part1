import React, { useState, useRef } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchComponent from '../Client/SearchComponent';
import ClickOutside from '../Client/ClickOutside';  // Update with the correct path
import { CheckAuth } from "./CheckAuth";

const UserHeader = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const shopButtonRef = useRef(null); // Reference for the Shop button

  // Function to toggle shop window
  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <header className="w-full relative z-[999]">
      {/* First Row */}
      <div className="bg-[#52a2c9] text-white">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <div className="text-sm">Welcome to Our Store!</div>
          <div className="flex space-x-4">
            <a href="#locations" className="hover:underline">
              Our locations
            </a>
            <a href="#contact" className="hover:underline">
              Contact us
            </a>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="bg-white shadow">
        <div className="container mx-auto flex justify-between items-center px-4 py-4">
          {/* Logo and Shop Button */}
          <div className="flex items-center space-x-6">
            {/* Logo */}
            <img
              src={require("../../imgs/logo.png")}
              alt="Logo"
              className="h-12 w-auto"
            />
            {/* Shop Button */}
            <button
              ref={shopButtonRef} // Reference the Shop button
              onClick={toggleShop}
              className="text-gray-700 hover:underline focus:outline-none"
            >
              Shop
            </button>
          </div>

          {/* Right Side - Sign In, Create Account, Search, Cart */}
          <div className="hidden md:flex items-center space-x-6">
            <CheckAuth />

            {/* Search Icon */}
            <FaSearch
              className="text-gray-700 cursor-pointer"
              onClick={toggleSearch}
            />

            {/* Cart Icon with number */}
            <div className="relative">
              <FaShoppingCart className="text-gray-700 text-2xl cursor-pointer" />
              {/* Cart item number badge */}
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="md:hidden bg-white">
        <div className="container mx-auto flex justify-end px-4 py-4">
          <FaSearch
            className="text-gray-700 cursor-pointer mx-4"
            onClick={toggleSearch}
          />
          <FaShoppingCart className="text-gray-700 text-2xl cursor-pointer mx-4" />
        </div>
      </div>

      {/* Shop Window */}
      {isShopOpen && (
        <ClickOutside
          exceptionRef={shopButtonRef} // Ensure clicking on the Shop button doesn't close the window
          onClick={() => setIsShopOpen(false)} // Close the shop window when clicking outside
        >
          <div className="absolute top-[100%] left-0 w-full bg-white shadow-lg z-10">
            <div className="container mx-auto p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Audio Section */}
                <div>
                  <h3 className="font-bold mb-2">/Audio</h3>
                  <ul className="space-y-1">
                    <li>Headphones</li>
                    <li>Earbuds</li>
                    <li>Portable speakers</li>
                    <li>Turntables</li>
                  </ul>
                </div>

                {/* Hifi Section */}
                <div>
                  <h3 className="font-bold mb-2">/Hifi</h3>
                  <ul className="space-y-1">
                    <li>Speakers</li>
                    <li>Subwoofers</li>
                    <li>Soundbars</li>
                    <li>Amplifiers</li>
                  </ul>
                </div>

                {/* TV & Home Cinema Section */}
                <div>
                  <h3 className="font-bold mb-2">/TV & Home Cinema</h3>
                  <ul className="space-y-1">
                    <li>LED TVs</li>
                    <li>OLED TVs</li>
                    <li>Projectors</li>
                    <li>Blu-Ray & DVD players</li>
                  </ul>
                </div>

                {/* Smartphones & Our Selection */}
                <div>
                  <h3 className="font-bold mb-2">/Smartphones</h3>
                  <ul className="space-y-1">
                    <li>Apple</li>
                    <li>LG</li>
                    <li>Samsung</li>
                    <li>Xiaomi</li>
                  </ul>
                  <h3 className="font-bold mt-4 mb-2">/Our Selection</h3>
                </div>
              </div>
            </div>
          </div>
        </ClickOutside>
      )}

      {/* Search Pop-up */}
      {isSearchOpen && (
        <SearchComponent onClose={() => setIsSearchOpen(false)} />
      )}
    </header>
  );
};

export default UserHeader;
