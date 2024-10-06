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
  
  const toast = useRef(null); // Reference for Toast

  // Fetch user data based on the ID
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/users/profile`,{ withCredentials: true });
        console.log(response.data.data);
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

  const handleSaveProfile = async (e) => {
    e.preventDefault(); // Prevent page refresh
    // Logic to save updated profile information goes here
    try {
      await axios.put(
        `http://localhost:5000/api/v1/users/update`,
        {
          firstName,
          lastName,
          email,
          phone,
          currentPassword,
          newPassword,
        }
      );
      toast.current.show({ severity: 'success', summary: 'Success', detail: 'Profile updated successfully!', life: 3000 });
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.current.show({ severity: 'error', summary: 'Error', detail: 'Failed to update profile.', life: 3000 });
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen p-8 font-inter">
      {/* Toast for Notifications */}
      <Toast ref={toast} />

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
            <form className="space-y-4" onSubmit={handleSaveProfile}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">
                    First name
                  </label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300">
                    Last name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300">
                    Phone number
                  </label>
                  <input
                    type="text"
                    value={phone} // Bind phone value to state
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </div>

                <div className="col-span-2">
                  <label className="block text-gray-700 dark:text-gray-300">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>

          <hr className="border-gray-300 dark:border-gray-700" />

          {/* Change Password */}
          <div className="space-y-6 mt-8">
            <h3 className="font-bold text-lg text-gray-900 dark:text-white">
              Change Password
            </h3>
            <form className="space-y-4">
              <div className="grid grid-cols-1 gap-6">
                <div>
                  <label className="block text-gray-700 dark:text-gray-300">
                    Current password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300">
                    New password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 dark:text-gray-300">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full p-3 rounded-md border dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="mt-4 px-6 py-3 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
