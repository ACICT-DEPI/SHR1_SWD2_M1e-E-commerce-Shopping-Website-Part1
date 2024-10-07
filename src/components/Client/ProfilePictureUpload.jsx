import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';

const ProfilePictureUpload = () => {
  const [previewUrl, setPreviewUrl] = useState(''); // For image preview
  const [loading, setLoading] = useState(false); // To show loading state
  const [error, setError] = useState(''); // For error messages
  const toastRef = useRef(null); // Reference for the Toast

  const handleFileChange = async (e) => {
    const file = e.target.files[0]; // Get the first file
    if (!file) return;

    // Check if the selected file is an image
    if (!file.type.startsWith('image/')) {
      setError('Please select a valid image file.');
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a valid image file.', life: 3000 });
      return;
    }

    // Preview the selected image before upload
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    const formData = new FormData();
    formData.append('profilePicture', file); // Append the file to FormData

    setLoading(true);
    setError(''); // Reset error state before upload

    try {
      const response = await axios.post(
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
      toastRef.current.show({ severity: 'success', summary: 'Success', detail: 'Profile picture updated successfully!', life: 3000 });

      // Reset states on successful upload
      setPreviewUrl('');
    } catch (err) {
      console.error('Error uploading profile picture:', err);
      const errorMessage = err.response?.data?.message || 'Error updating profile picture. Please try again.';
      setError(errorMessage);
      toastRef.current.show({ severity: 'error', summary: 'Error', detail: errorMessage, life: 3000 });
    } finally {
      setLoading(false); // Ensure loading state is turned off
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-all duration-200">
      <Toast ref={toastRef} /> {/* PrimeReact Toast component */}

      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
        />
        <img
          src={previewUrl || 'https://via.placeholder.com/150'}
          alt="Profile"
          className={`w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-lg ${loading ? 'opacity-50' : ''}`}
          onClick={() => document.querySelector('input[type="file"]').click()} // Open file dialog on image click
        />
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <div className="loader"></div> {/* Loader element, replace with actual loader implementation */}
          </div>
        )}
      </div>
      
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default ProfilePictureUpload;
