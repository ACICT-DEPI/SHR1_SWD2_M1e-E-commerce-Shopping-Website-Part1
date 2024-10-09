// ContactPage.js
import React from "react";
import DarkModeSwitcher from "../../components/Admin/Header/DarkModeSwitcher";

const ContactPage = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., sending data to an API)
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 min-h-screen py-10 px-4 sm:px-6 lg:px-8">
      
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-900 shadow-md rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gray-800 p-6">
          <h1 className="text-white text-3xl font-bold">Contact Us</h1>
          <p className="mt-2 text-blue-200">We'd love to hear from you!</p>
        </div>

        {/* Contact Information */}
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Contact Information
          </h2>
          <p className="mb-2 text-gray-800 dark:text-gray-300">
            <strong>Email:</strong> shopify@example.com
          </p>
          <p className="mb-2 text-gray-800 dark:text-gray-300">
            <strong>Phone:</strong> (123) 456-7890
          </p>
          <p className="mb-2 text-gray-800 dark:text-gray-300">
            <strong>Address:</strong> Zagazig, As Sharqia, Egypt
          </p>
        </div>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
            Send Us a Message
          </h2>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              required
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              placeholder="Your Name"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              required
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              placeholder="Your Email"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 dark:text-gray-300"
            >
              Message
            </label>
            <textarea
              id="message"
              required
              className="mt-1 block w-full p-2 border border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 rounded-md"
              rows="4"
              placeholder="Your Message"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-2 rounded hover:bg-blue-700 transition duration-200"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
