import axios from 'axios';
import React, { useEffect, useState } from 'react';
import UserDropdown from './UserDropDown';
import AuthLinks from './AuthLinks';

export const CheckAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [firstname, setFirstname] = useState(''); // State to store firstname
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to manage any errors
  
    useEffect(() => {
      const checkAuth = async () => {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/v1/users/profile",
            {
              withCredentials: true, // Make sure your server has proper CORS settings for this
            }
          );
          console.log("API Response: ", response.data);
          
          // Check if the expected fields exist in the response
          if (response.data.data.isAuthenticated && response.data.data.firstname) {
            setIsAuthenticated(response.data.data.isAuthenticated);
            setFirstname(response.data.data.firstname);
          } else {
            throw new Error("Invalid response structure");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
          setError(error.response ? error.response.data.message : error.message);
          setIsAuthenticated(false); // Default to false if there's an error
        } finally {
          setLoading(false); // Stop loading once request is complete
        }
      };
      checkAuth();
    }, []);

    if (loading) {
      return <div>Loading...</div>; // You can add a spinner or better loading UI here
    }

    return (
      <div>
        {error && <div>Error: {error}</div>}
        {isAuthenticated ? (
          <UserDropdown username={firstname} /> // Pass firstname as username prop
        ) : (
          <AuthLinks /> // Render AuthLinks if not authenticated
        )}
      </div>
    );
};
