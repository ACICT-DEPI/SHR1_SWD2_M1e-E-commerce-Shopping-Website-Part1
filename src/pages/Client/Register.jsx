import React, { useState } from "react";
import { AiOutlineUser, AiOutlineMail, AiOutlineLock } from "react-icons/ai"; // Icons for inputs
import DarkModeSwitcher from "../../components/Admin/Header/DarkModeSwitcher"; // Adjust the path as necessary

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }

    // Perform registration logic here
    console.log({ firstName, lastName, phone, email, password });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 relative">
      <div className="absolute top-4 right-4">
        <DarkModeSwitcher />
      </div>
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Register to Shopify
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleRegister} className="space-y-4">
          {/* First Name and Last Name Fields */}
          <div className="flex space-x-2">
            {/* First Name Field */}
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
            </div>

            {/* Last Name Field */}
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
            </div>
          </div>

          {/* Email Field */}
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
          </div>

          {/* Password Field */}
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
          </div>

          {/* Confirm Password Field */}
          <div className="relative">
            <label htmlFor="confirm-password" className="sr-only">
              Re-type Password
            </label>
            <input
              id="confirm-password"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Re-enter your password"
              required
              className="w-full px-4 py-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-md bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <AiOutlineLock className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500 dark:text-gray-400" />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create account
          </button>

          {/* Google Sign-up */}
          <button
            type="button"
            className="w-full py-2 mt-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="mr-2 h-5"
            />
            Sign up with Google
          </button>
        </form>

        {/* Sign in Link */}
        <div className="text-center text-gray-500 dark:text-gray-300 mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500 dark:text-blue-400">
            Log in
          </a>
        </div>
      </div>
    </div>
  );
};

export default Register;
