import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaBars } from "react-icons/fa";
import { Link } from "react-router-dom";
import SearchComponent from "./SearchComponent";
import ClickOutside from "../ClickOutside"; // Update with the correct path
import axios from "axios";
import AuthLinks from "./AuthLinks";
import UserDropdown from "./UserDropDown";
import DarkModeSwitcher from "../../Admin/Header/DarkModeSwitcher";

const UserHeader = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState(null);
  const shopButtonRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleShop = () => {
    setIsShopOpen(!isShopOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/profile",
          {
            withCredentials: true,
          }
        );
        setIsAuthenticated(true);

        if (response.data && response.data.data) {
          const fullName = `${response.data.data.firstName} ${response.data.data.lastName}`;
          setFirstname(fullName);
        }

        if (response.data.data.avatar) {
          setAvatarUrl(response.data.data.avatar.url);
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  return (
    <header className="w-full relative z-[999] bg-white dark:bg-gray-900">
      {/* First Row */}
      <div className="bg-[#52a2c9] text-white hidden md:block">
        <div className="container mx-auto flex justify-between items-center px-4 py-2">
          <div className="text-sm">Welcome to Our Store!</div>
          <div className="flex space-x-4">
            <a href="#locations" className="hover:underline">Our locations</a>
            <a href="/contact" className="hover:underline">Contact us</a>
          </div>
        </div>
      </div>

      {/* Second Row */}
      <div className="bg-white dark:bg-gray-800 shadow">
        <div className="container mx-auto flex flex-wrap justify-between items-center px-4 py-4">
          {/* Logo and Shop Button */}
          <div className="flex items-center space-x-6">
            <Link to="/" className="flex items-center">
              <img
                src={require("../../../imgs/logo.png")} // Ensure the path is correct
                alt="Logo"
                className="h-12 w-auto"
              />
            </Link>
            <button
              ref={shopButtonRef}
              onClick={toggleShop}
              className="text-gray-700 dark:text-gray-300 hover:underline focus:outline-none"
            >
              Shop
            </button>
          </div>

          {/* Right Side - Sign In, Create Account, Search, Cart, Dark Mode Toggle */}
          <div className="hidden md:flex items-center space-x-6">
            {isAuthenticated ? (
              <UserDropdown firstname={firstname} avatarUrl={avatarUrl} />
            ) : (
              <AuthLinks />
            )}

            {/* Search Icon */}
            <FaSearch
              className="text-gray-700 dark:text-gray-300 cursor-pointer"
              onClick={toggleSearch}
            />

            {/* Cart Icon with number */}
            <div className="relative">
              <FaShoppingCart className="text-gray-700 dark:text-gray-300 text-2xl cursor-pointer" />
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <DarkModeSwitcher />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <FaBars onClick={toggleMobileMenu} className="text-gray-700 dark:text-gray-300 cursor-pointer" />
            <DarkModeSwitcher className="ml-2" />
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow absolute top-[100%] left-0 w-full z-10">
          <div className="container mx-auto px-4 py-4">
            {isAuthenticated ? (
              <>
          <Link
            to={`/profile/${firstname}`} // Use the firstname state for the dynamic route
            className="block mt-2 text-gray-700 dark:text-gray-300 hover:underline"
          >
            Personal Profile
          </Link>                <Link to="/orders" className="block mt-2 text-gray-700 dark:text-gray-300 hover:underline">Orders</Link>
                <Link to="/logout" className="block mt-2 text-gray-700 dark:text-gray-300 hover:underline">Logout</Link>
              </>
            ) : (
              <>
                <Link to="/login" className="block mt-2 text-gray-700 dark:text-gray-300 hover:underline">Login</Link>
                <Link to="/register" className="block mt-2 text-gray-700 dark:text-gray-300 hover:underline">Create Account</Link>
              </>
            )}
            <Link to="/contact" className="block mt-2 text-gray-700 dark:text-gray-300 hover:underline">Contact Us</Link>
          </div>
        </div>
      )}

      {/* Shop Window */}
      {isShopOpen && (
        <ClickOutside
          exceptionRef={shopButtonRef}
          onClick={() => setIsShopOpen(false)}
        >
          <div className="absolute top-[100%] left-0 w-full bg-white dark:bg-gray-800 shadow-lg z-10">
            <div className="container mx-auto p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Audio Section */}
                <div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-200">/Audio</h3>
                  <ul className="space-y-1">
                    <li>Headphones</li>
                    <li>Earbuds</li>
                    <li>Portable speakers</li>
                    <li>Turntables</li>
                  </ul>
                </div>

                {/* Hifi Section */}
                <div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-200">/Hifi</h3>
                  <ul className="space-y-1">
                    <li>Speakers</li>
                    <li>Subwoofers</li>
                    <li>Soundbars</li>
                    <li>Amplifiers</li>
                  </ul>
                </div>

                {/* TV & Home Cinema Section */}
                <div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-200">/TV & Home Cinema</h3>
                  <ul className="space-y-1">
                    <li>LED TVs</li>
                    <li>OLED TVs</li>
                    <li>Projectors</li>
                    <li>Blu-Ray & DVD players</li>
                  </ul>
                </div>

                {/* Smartphones & Our Selection */}
                <div>
                  <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-200">/Smartphones</h3>
                  <ul className="space-y-1">
                    <li>Apple</li>
                    <li>LG</li>
                    <li>Samsung</li>
                    <li>Xiaomi</li>
                  </ul>
                  <h3 className="font-bold mt-4 mb-2 text-gray-900 dark:text-gray-200">/Our Selection</h3>
                </div>
              </div>
            </div>
          </div>
        </ClickOutside>
      )}

      {/* Search Component */}
      {isSearchOpen && <SearchComponent onClose={() => setIsSearchOpen(false)} />}
    </header>
  );
};

export default UserHeader;
