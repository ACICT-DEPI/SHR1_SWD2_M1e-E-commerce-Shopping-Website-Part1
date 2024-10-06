import React, { useState } from 'react';
import axios from 'axios';

const ProfilePictureUpload = ({ userName, userRole }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('profilePicture', selectedFile);

    try {
      const response = await axios.post(`http://localhost:5000/api/v1/users/user-photo-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('Upload response:', response.data);
      alert('Profile picture uploaded successfully!');
      // Reset the preview URL and selected file after successful upload
      setPreviewUrl('');
      setSelectedFile(null);
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center mb-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 transition-all duration-200">
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" // Hide the default file input
          onClick={(e) => { e.target.value = null; }} // Clear file input on re-click
          onBlur={handleUpload} // Trigger upload on blur
        />
        <img
          src={previewUrl || 'https://via.placeholder.com/150'} // Placeholder for profile picture
          alt="Profile"
          className="w-32 h-32 md:w-48 md:h-48 rounded-full object-cover border-4 border-gray-300 dark:border-gray-600 transition-transform duration-200 cursor-pointer hover:scale-105 hover:shadow-lg"
          onClick={() => document.querySelector('input[type="file"]').click()} // Trigger file input click
        />
      </div>
      <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">{userName}</h2>
      <p className="text-sm text-gray-600 dark:text-gray-400">{userRole}</p>
    </div>
  );
};

export default ProfilePictureUpload;
