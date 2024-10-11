import React, { useEffect, useState, useRef } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom"; 
import SearchComponent from "./SearchComponent";
import ClickOutside from "../ClickOutside";
import axios from "axios";
import AuthLinks from "./AuthLinks";
import UserDropdown from "./UserDropDown";
import DarkModeSwitcher from "../../Admin/Header/DarkModeSwitcher";

const UserHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [firstname, setFirstname] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [error, setError] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0); // State for cart count
  const navigate = useNavigate();

  const searchButtonRef = useRef(null);
  const dropdownRef = useRef(null);

  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  // Check authentication status
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/users/profile",
          { withCredentials: true }
        );
        setIsAuthenticated(true);

        if (response.data && response.data.data) {
          const fullName = `${response.data.data.firstName} ${response.data.data.lastName}`;
          setFirstname(fullName);
          if (response.data.data.avatar) {
            setAvatarUrl(response.data.data.avatar.url);
          }
        }
      } catch (error) {
        setError(error.response ? error.response.data.message : error.message);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  // Update cart count
  useEffect(() => {
    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const totalCount = storedCartProducts.reduce((acc, product) => acc + product.quantity, 0);
    setCartCount(totalCount);
  }, []);

  const handleCartClick = () => {
    navigate("/Cart");
  };

  return (
    <header className="bg-white dark:bg-gray-900 w-full z-[999]">
      <div className="shadow-lg">
        <div className="container mx-auto flex justify-between items-center px-4 py-3 lg:px-[6rem] xl:px-[8rem] font-sans">
          {/* Logo and Shop Button */}
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center">
              <img
                src={require("../../../imgs/2.png")}
                alt="Logo"
                className="h-16 w-auto"
              />
            </Link>

            <Link
              to="/collections"
              className="text-gray-700 dark:text-gray-300 hover:underline focus:outline-none"
            >
              Shop
            </Link>

            <Link
              to="/contact"
              className="text-gray-700 dark:text-gray-300 hover:underline focus:outline-none"
            >
              Contact us
            </Link>
          </div>

          {/* Right Side */}
          <div className="user-interactions flex items-center">
            <ul className="flex gap-4 items-center lg:gap-8">
              <DarkModeSwitcher />
              {isAuthenticated ? (
                <div>
                  <UserDropdown firstname={firstname} avatarUrl={avatarUrl} />
                </div>
              ) : (
                <AuthLinks />
              )}
              {/* Search Icon */}
              <FaSearch
                className="text-gray-700 dark:text-gray-300 cursor-pointer"
                onClick={toggleSearch}
              />
              {/* Cart Icon */}
              <div className="relative" onClick={handleCartClick}>
                <FaShoppingCart className="text-gray-700 dark:text-gray-300 text-2xl cursor-pointer" />
                {cartCount > 0 && ( // Show cart count if greater than 0
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {cartCount}
                  </span>
                )}
              </div>
            </ul>
          </div>
        </div>
      </div>

      {/* Search Component */}
      {isSearchOpen && (
        <ClickOutside
          exceptionRef={searchButtonRef}
          onClick={() => {
            setIsSearchOpen(false);
            setIsDropdownOpen(false); // Close dropdown when search is closed
          }}
        >
          <SearchComponent onClose={() => setIsSearchOpen(false)} />
        </ClickOutside>
      )}

      {/* User Dropdown */}
      {isDropdownOpen && (
        <ClickOutside
          exceptionRef={dropdownRef}
          onClick={() => {
            setIsDropdownOpen(false); // Close dropdown when clicking outside
            setIsSearchOpen(false);   // Also close search if it was open
          }}
        >
          <UserDropdown
            firstname={firstname}
            avatarUrl={avatarUrl}
            onClose={() => setIsDropdownOpen(false)}
          />
        </ClickOutside>
      )}
    </header>
  );
};

export default UserHeader;
