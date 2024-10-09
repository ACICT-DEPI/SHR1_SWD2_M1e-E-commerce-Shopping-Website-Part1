import React, { useState, useRef, useEffect } from "react";
import { FaSearch, FaShoppingCart, FaBars, FaUser, FaSignInAlt, FaSignOutAlt, FaRegEnvelope } from "react-icons/fa"; // Import icons
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

            {/* Mobile Menu Button next to Shop button */}
            <div className="md:hidden flex items-center">
              <FaBars
                onClick={toggleMobileMenu}
                className="text-gray-700 dark:text-gray-300 cursor-pointer"
              />
            </div>
          </div>

          {/* Right Side - Sign In, Create Account, Dark Mode Toggle */}
          {!isMobileMenuOpen && (  // Hide other elements when mobile menu is open
            <div className="user-interactions">
              <ul className="flex gap-4 items-center lg:gap-9">
                <DarkModeSwitcher />

                {isAuthenticated ? (
                  <UserDropdown firstname={firstname} avatarUrl={avatarUrl} />
                ) : (
                  <AuthLinks />
                )}

                {/* Search Icon (Hidden in mobile view) */}
                <FaSearch
                  className="hidden md:block text-gray-700 dark:text-gray-300 cursor-pointer"
                  onClick={toggleSearch}
                />

                {/* Cart Icon with number (Hidden in mobile view) */}
                <div className="relative hidden md:block">
                  <FaShoppingCart className="text-gray-700 dark:text-gray-300 text-2xl cursor-pointer" />
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    3
                  </span>
                </div>
              </ul>
            </div>
          )}
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
                  className="flex items-center mt-2 text-gray-700 dark:text-gray-300 hover:underline"
                >
                  <FaUser className="mr-2" /> Personal Profile
                </Link>
                <Link to="/orders" className="flex items-center mt-2 text-gray-700 dark:text-gray-300 hover:underline">
                  <FaShoppingCart className="mr-2" /> Orders
                </Link>
                <Link to="/logout" className="flex items-center mt-2 text-gray-700 dark:text-gray-300 hover:underline">
                  <FaSignOutAlt className="mr-2" /> Logout
                </Link>
              </>
            ) : (
              <>
                <Link to="/login" className="flex items-center mt-2 text-gray-700 dark:text-gray-300 hover:underline">
                  <FaSignInAlt className="mr-2" /> Login
                </Link>
                <Link to="/register" className="flex items-center mt-2 text-gray-700 dark:text-gray-300 hover:underline">
                  <FaUser className="mr-2" /> Create Account
                </Link>
              </>
            )}
            <Link to="/contact" className="flex items-center mt-2 text-gray-700 dark:text-gray-300 hover:underline">
              <FaRegEnvelope className="mr-2" /> Contact Us
            </Link>
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
                  <ul className="space-y-1">
                    <li>Top Picks</li>
                    <li>New Arrivals</li>
                    <li>Best Sellers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </ClickOutside>
      )}

      {/* Search Component */}
      {isSearchOpen && <SearchComponent onClose={toggleSearch} />}
    </header>
  );
};

export default UserHeader;
