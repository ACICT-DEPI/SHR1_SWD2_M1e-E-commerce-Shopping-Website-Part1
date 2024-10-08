import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const ProfilePictureUpload = () => {
  const [previewUrl, setPreviewUrl] = useState(''); // For image preview
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(''); // For error messages
  const toastRef = useRef(null); // Reference for the Toast
  const fileInputRef = useRef(null); // Reference for the file input

  // Fetch user's current profile picture when the component mounts
  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/users/profile', {
          withCredentials: true, // Include credentials if needed
        });
        // Assuming the response contains the profile picture URL
        setPreviewUrl(
          response.data.data.avatar.url 
        );
      } catch (err) {
        console.error('Error fetching profile picture:', err);
        toastRef.current.show({
          severity: 'error',
          summary: 'Error',
          detail: err.response.error.message,
          life: 3000,
        });
      }
    };

    fetchProfilePicture();
  }, []); // Empty dependency array ensures this runs only once when the component mounts
  
  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the first file
    if (!file) return;

    // Preview the selected image before upload
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const formData = new FormData();
    formData.append('avatar', file); // Append the file to FormData

    setLoading(true);
    setError(''); // Reset error state before upload

    try {
      const response = await axios.patch(
        'http://localhost:5000/api/v1/users/user-photo-upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          withCredentials: true, // To support cross-site credentials if needed
        }
      );

      console.log('Upload response:', response.data);

      // Check if the response indicates a successful upload
      if (response.data.data && response.data.data.url) {
        setPreviewUrl(response.data.data.url); // Use the uploaded image URL from the response
      }

      toastRef.current.show({
        severity: 'success',
        summary: 'Success',
        detail: response.data.message || 'Profile picture updated successfully!',
        life: 3000,
      });

    } catch (err) {
      console.error('Error uploading profile picture:', err);
      const errorMessage = err.response?.data?.message || 'Error updating profile picture. Please try again.';

      // Check if the error message is related to file validation
      if (errorMessage.includes('Invalid file type')) {
        setError('Invalid file type. Only JPEG, PNG, and JPG images are allowed.');
      } else {
        setError(errorMessage);
      }

      toastRef.current.show({
        severity: 'error',
        summary: 'Error',
        detail: errorMessage,
        life: 3000,
      });
    } finally {
      setLoading(false); // Ensure loading state is turned off
    }
  };

  const openFileDialog = () => {
    // Trigger the file input click programmatically
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-all duration-200">
      <Toast ref={toastRef} position="bottom-left" /> {/* PrimeReact Toast component */}

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef} // Use the useRef hook for file input
          onChange={handleFileChange}
          className="hidden"
        />
        <img
          src={previewUrl || 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} // Default avatar image
          alt="Profile"
          className={`w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-lg ${loading ? 'opacity-50' : ''}`}
          onClick={openFileDialog} // Open file dialog on image click
        />
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="loader"></div> {/* Loader element, replace with actual loader */}
          </div>
        )}
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ProfilePictureUpload;
