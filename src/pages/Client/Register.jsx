import React, { useState, useRef } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlinePhone, AiOutlineLock } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import DarkModeSwitcher from "../../components/Admin/Header/DarkModeSwitcher";
import { Toast } from "primereact/toast"; // Import Toast from PrimeReact

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // New state for confirm password
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({}); // State for errors
  const navigate = useNavigate();
  const toast = useRef(null); // Reference for Toast

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({}); // Reset errors on new submit

    // Check if passwords match
    if (password !== confirmPassword) {
      toast.current.show({ severity: "warn", summary: "Warning", detail: "Passwords do not match.", life: 3000 });
      setLoading(false);
      return;
    }

    const userData = { firstName, lastName, email, password, phone };

    try {
      const response = await fetch("http://localhost:5000/users/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      // Handle successful response
      if (response.status === 200) {
        toast.current.show({ severity: "success", summary: "Success", detail: data.message, life: 3000 });
        setFirstName("");
        setLastName("");
        setPhone("");
        setEmail("");
        setPassword("");
        setConfirmPassword(""); // Clear confirm password
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } 
      // Handle validation errors (400 Bad Request)
      else if (response.status === 400) {
        if (data.errors) {
          setErrors(data.errors); // Set error messages for each field
        } else {
          toast.current.show({
            severity: "warn",
            summary: "Warning",
            detail: data.message || "Bad Request. Please check your inputs.",
            life: 3000,
          });
        }
      } else if (response.status === 500) {
        toast.current.show({ severity: "error", summary: "Error", detail: data.message || "Internal Server Error. Please try again later.", life: 3000 });
      }
    } catch (err) {
      toast.current.show({ severity: "error", summary: "Error", detail: "An error occurred. Please try again.", life: 3000 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 relative">
      <Toast ref={toast} position="bottom-left"/>
      <div className="absolute top-4 right-4">
        <DarkModeSwitcher />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Register to Shopify
        </h2>
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="flex space-x-2">
            <div className="relative w-1/2">
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                placeholder="First Name"
                required
                className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <AiOutlineUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              {errors.firstName && <span className="text-red-500 text-sm">{errors.firstName.message}</span>}
            </div>

            <div className="relative w-1/2">
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                placeholder="Last Name"
                required
                className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <AiOutlineUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
              {errors.lastName && <span className="text-red-500 text-sm">{errors.lastName.message}</span>}
            </div>
          </div>

          <div className="relative">
            <label htmlFor="phone" className="sr-only">
              Phone Number
            </label>
            <input
              id="phone"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone Number"
              required
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlinePhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            {errors.phone && <span className="text-red-500 text-sm">{errors.phone.message}</span>}
          </div>

          <div className="relative">
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlineMail className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
          </div>

          <div className="relative">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
          </div>

          <div className="relative">
            <label htmlFor="confirm-password" className="sr-only">
              Confirm Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              required
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            {errors.confirmPassword && <span className="text-red-500 text-sm">{errors.confirmPassword.message}</span>}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
