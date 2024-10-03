import React, { useState, useRef } from "react";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import DarkModeSwitcher from "../../components/Admin/Header/DarkModeSwitcher";
import { Toast } from "primereact/toast"; // PrimeReact Toast
import { useNavigate } from "react-router-dom"; // For redirection

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useRef(null); // Toast reference
  const navigate = useNavigate(); // Navigate for redirection

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill out all fields.");
      toast.current.show({ severity: "error", summary: "Error", detail: "Please fill out all fields", life: 3000 });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      setLoading(false);

      if (response.ok) {
        // Login successful
        localStorage.setItem("authToken", data.token);
        toast.current.show({ severity: "success", summary: "Success", detail: "Login successful", life: 3000 });
        
        // Redirect to home page after successful login
        setTimeout(() => {
          navigate("/"); // Change '/' to your home page route
        }, 2000);
      } else {
        // Login failed
        setError(data.message || "Login failed. Please check your credentials.");
        toast.current.show({ severity: "error", summary: "Error", detail: data.message || "Login failed", life: 3000 });
      }
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again later.");
      toast.current.show({ severity: "error", summary: "Error", detail: "An error occurred. Please try again.", life: 3000 });
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 dark:bg-gray-900 relative">
      <div className="absolute top-4 right-4">
        <DarkModeSwitcher />
      </div>
      <Toast ref={toast} /> {/* PrimeReact Toast component */}
      <div className="w-full max-w-md p-8 space-y-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white">
          Log In to Shopfiy
        </h2>
        {error && <div className="text-red-500 text-center">{error}</div>}
        <form onSubmit={handleLogin} className="space-y-4">
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

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white rounded-md bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Google Login */}
          <button
            type="button"
            className="w-full py-2 mt-4 flex items-center justify-center bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-300 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <img
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
              alt="Google"
              className="mr-2 h-5"
            />
            Login with Google
          </button>
        </form>

        {/* Sign up Link */}
        <div className="text-center text-gray-500 dark:text-gray-300 mt-4">
          Don’t have an account?{" "}
          <a href="/register" className="text-blue-500 dark:text-blue-400">
            Register
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
