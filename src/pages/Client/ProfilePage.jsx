import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import DarkModeSwitcher from "../../components/Admin/Header/DarkModeSwitcher";
import ProfilePictureUpload from "../../components/Client/ProfilePictureUpload";
import { Toast } from 'primereact/toast'; // Importing the Toast component

const ProfilePage = () => {
  const { id } = useParams(); // Get the user ID from the URL
  const [user, setUser] = useState(null); // Store user data
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState(""); // NEW STATE FOR PHONE NUMBER
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({});

  const toast = useRef(null); // Reference for Toast

  // Fetch user data based on the ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/profile`, { withCredentials: true });
        const userData = response.data.data;

        // Populate the state with user data
        setUser(userData);
        setFirstName(userData.firstName);
        setLastName(userData.lastName);
        setEmail(userData.email);
        setPhone(userData.phone); // NEW - Set the phone data
      } catch (error) {
        console.error("Error fetching user data:", error);
        toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to fetch user data', life: 3000 });
      }
    };

    fetchUserData();
  }, [id]);

  // Function to handle profile information update
  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setErrorMessages({});

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/update`,
        { firstName, lastName, email, phone },
        { withCredentials: true }
      );
  
      toast.current.show({ severity: 'success', summary: 'Success', detail: response.data.message, life: 3000 });
    } catch (error) {
      const data = error.response?.data || {};
      setErrorMessages((prev) => ({
        ...prev,
        firstName: data.errors?.firstName?.message || "",
        lastName: data.errors?.lastName?.message || "",
        email: data.errors?.email?.message || "",
        phone: data.errors?.phone?.message || "",
      }));

      // Display generic error message
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "An error occurred. Please try again.",
        life: 3000,
      });
    }
  };

  // Function to handle password change
  const handleChangePassword = async (e) => {
    e.preventDefault();
    setErrorMessages({});

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMessages((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }

    try {
      const response = await axios.patch(
        `http://localhost:5000/api/v1/users/change-password`,
        { currentPassword, newPassword },
        { withCredentials: true }
      );

      toast.current.show({ severity: 'success', summary: 'Password Updated', detail: response.data.message, life: 3000 });
    } catch (error) {
      const data = error.response?.data || {};
      setErrorMessages((prev) => ({
        ...prev,
        currentPassword: data.errors?.currentPassword?.message || "",
        newPassword: data.errors?.newPassword?.message || "",
      }));

      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to update password. Please try again.",
        life: 3000,
      });
    }
  };

  const handleFocus = (field) => {
    setErrorMessages((prev) => ({ ...prev, [field]: "" }));
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8 font-inter">
      {/* Toast for Notifications */}
      <Toast ref={toast} position="bottom-left" />

      {/* Dark Mode Switcher */}
      <div className="flex justify-end mb-4">
        <DarkModeSwitcher />
      </div>

      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg flex">
        {/* Profile Picture Upload */}
        <div className="w-1/3 mr-4">
          <ProfilePictureUpload />
        </div>

        {/* Other Content */}
        <div className="w-2/3">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Your Profile
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            Update your account's profile information and password.
          </p>

          {/* Personal Information */}
          <div className="space-y-6 mb-8">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Personal Information
            </h3>
            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* First Name */}
              <div className="relative">
                <label htmlFor="first-name" className="sr-only">First Name</label>
                <input
                  id="first-name"
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onFocus={() => handleFocus("firstName")}
                  placeholder="First Name"
                  className={`w-full px-4 py-3 pl-10 border ${errorMessages.firstName ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorMessages.firstName && <div className="text-red-500 dark:text-red-400">{errorMessages.firstName}</div>}
              </div>

              {/* Last Name */}
              <div className="relative">
                <label htmlFor="last-name" className="sr-only">Last Name</label>
                <input
                  id="last-name"
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onFocus={() => handleFocus("lastName")}
                  placeholder="Last Name"
                  className={`w-full px-4 py-3 pl-10 border ${errorMessages.lastName ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorMessages.lastName && <div className="text-red-500 dark:text-red-400">{errorMessages.lastName}</div>}
              </div>

              {/* Phone Number */}
              <div className="relative">
                <label htmlFor="phone" className="sr-only">Phone Number</label>
                <input
                  id="phone"
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  onFocus={() => handleFocus("phone")}
                  placeholder="Phone Number"
                  className={`w-full px-4 py-3 pl-10 border ${errorMessages.phone ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorMessages.phone && <div className="text-red-500 dark:text-red-400">{errorMessages.phone}</div>}
              </div>

              {/* Email */}
              <div className="relative">
                <label htmlFor="email" className="sr-only">Email</label>
                <input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => handleFocus("email")}
                  placeholder="Enter your email"
                  className={`w-full px-4 py-3 pl-10 border ${errorMessages.email ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorMessages.email && <div className="text-red-500 dark:text-red-400">{errorMessages.email}</div>}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-4 py-3 rounded-md shadow-md focus:outline-none"
              >
                Save Changes
              </button>
            </form>
          </div>

          {/* Update Password */}
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Change Password
            </h3>
            <form onSubmit={handleChangePassword} className="space-y-4">
              {/* Current Password */}
              <div className="relative">
                <label htmlFor="current-password" className="sr-only">Current Password</label>
                <input
                  id="current-password"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  onFocus={() => handleFocus("currentPassword")}
                  placeholder="Current Password"
                  className={`w-full px-4 py-3 pl-10 border ${errorMessages.currentPassword ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorMessages.currentPassword && <div className="text-red-500 dark:text-red-400">{errorMessages.currentPassword}</div>}
              </div>

              {/* New Password */}
              <div className="relative">
                <label htmlFor="new-password" className="sr-only">New Password</label>
                <input
                  id="new-password"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onFocus={() => handleFocus("newPassword")}
                  placeholder="New Password"
                  className={`w-full px-4 py-3 pl-10 border ${errorMessages.newPassword ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorMessages.newPassword && <div className="text-red-500 dark:text-red-400">{errorMessages.newPassword}</div>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <label htmlFor="confirm-password" className="sr-only">Confirm New Password</label>
                <input
                  id="confirm-password"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  onFocus={() => handleFocus("confirmPassword")}
                  placeholder="Confirm New Password"
                  className={`w-full px-4 py-3 pl-10 border ${errorMessages.confirmPassword ? "border-red-500" : "border-gray-300"} dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errorMessages.confirmPassword && <div className="text-red-500 dark:text-red-400">{errorMessages.confirmPassword}</div>}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 dark:bg-blue-500 hover:bg-blue-700 dark:hover:bg-blue-600 px-4 py-3 rounded-md shadow-md focus:outline-none"
              >
                Change Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
