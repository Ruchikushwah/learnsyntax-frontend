import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    subject: "",
    message: "",
  });

  const [responseMessage, setResponseMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track loading state

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };
    //added this for spinner
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Start loading spinner

    try {
      const response = await fetch("http://localhost:8000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "An error occurred. Please try again.");
      }
  
      const responseData = await response.json();
  
      setTimeout(() => {
        setResponseMessage(responseData.message);
        setErrorMessage(null);
        setFormData({ email: "", subject: "", message: "" }); // Reset form fields
      }, 2000); // 2-second delay for message display
    } catch (error) {
      setTimeout(() => {
        setErrorMessage(error.message);
        setResponseMessage(null);
      }, 2000); // 2-second delay for error display
    } finally {
      setTimeout(() => {
        setIsLoading(false); // Hide spinner
      }, 2000); // Match the delay duration
    }
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <Helmet>
        <title>LearnSyntax - Contact Us</title>
        <meta name="description" content="Connect with LearnSyntax Team" />
      </Helmet>
      <div className="pt-16 md:pt-20 lg:pt-24 pb-8 lg:pb-16 px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-md">
        <h2 className="mb-6 text-2xl sm:text-3xl lg:text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact <span className="text-brandPrimary">Us</span>
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              placeholder="john@example.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              value={formData.subject}
              onChange={handleChange}
              className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              placeholder="Subject"
              required
            />
          </div>
          <div>
            <label
              htmlFor="message"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Your message
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              rows="6"
              className="block w-full p-3 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100"
              placeholder="Write your message here..."
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-brandPrimary text-white p-3 rounded-lg font-medium flex items-center justify-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <svg
                className="w-5 h-5 mr-2 text-white animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                ></path>
              </svg>
            ) : (
              "Submit"
            )}
          </button>
        </form>
        {responseMessage && (
          <p className="text-green-500 mt-4 text-center">{responseMessage}</p>
        )}
        {errorMessage && (
          <p className="text-red-500 mt-4 text-center">{errorMessage}</p>
        )}
      </div>
    </section>
  );
};

export default ContactForm;
