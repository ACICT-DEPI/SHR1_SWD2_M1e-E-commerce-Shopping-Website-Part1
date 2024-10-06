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
      // Replace BASE_URL with your actual base URL
      const response = await axios.post(`http://localhost:5000/api/v1/users/user-photo-upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Handle successful upload response
      console.log('Upload response:', response.data);
      alert('Profile picture uploaded successfully!');
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Error uploading profile picture. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative">
        <img
          src={previewUrl || 'https://via.placeholder.com/150'} // Placeholder for profile picture
          alt="Profile"
          className="w-48 h-48 rounded-full object-cover border-4 border-gray-300 dark:border-gray-700"
        />
        <button
          onClick={handleUpload}
          className="absolute bottom-0 right-0 transform translate-x-1/2 translate-y-1/2 p-2 bg-blue-500 text-white rounded-full shadow hover:bg-blue-600"
        >
          <span className="text-xs">Upload</span>
        </button>
      </div>
      <h2 className="mt-2 text-lg font-semibold text-gray-900 dark:text-white">
        {userName}
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300">{userRole}</p>
      <label className="mt-4 cursor-pointer bg-gray-200 text-gray-700 py-2 px-4 rounded-md shadow hover:bg-gray-300">
        Choose File
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden" // Hide the default file input
        />
      </label>
    </div>
  );
};

export default ProfilePictureUpload;
