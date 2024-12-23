import { GoogleLogin } from "@react-oauth/google";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Check if the user is already logged in when the component mounts
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // If the token exists, redirect to the dashboard or home page
      navigate("/admin");
    }
  }, [navigate]);

  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    // Validate Email
    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    }

    // Validate Password
    if (!password) {
      formErrors.password = "Password is required";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    const data = { email: email, password: password };
    try {
      let resp = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      resp = await resp.json();
      console.log(resp);

      if (resp.access_token) {
        // Ensure token and user data are correct
        localStorage.setItem("token", resp.access_token);
        localStorage.setItem("user", JSON.stringify(resp.user)); // Store user info

        // Debug: Log the role to verify it's set correctly
        console.log("User Role:", resp.user.role);

        // Redirect based on role
        if (resp.user.is_admin) {
          navigate("/admin"); // Admin goes to dashboard
        } else {
          navigate("/"); // Regular user goes to homepage
        }
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg gap-5 flex flex-col">
        <div className="flex flex-col">
          <p className="mb-2 text-center text-lg font-semibold text-gray-600 flex flex-col ">
            Please log in to continue
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </p>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            id="email"
            className="w-full mt-1 rounded-lg border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-brandPrimary focus:ring-brandPrimary"
            placeholder="Enter your email"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            id="password"
            className="w-full mt-1 rounded-lg border-gray-300 px-4 py-2 text-gray-700 shadow-sm focus:border-brandPrimary focus:ring-brandPrimary"
            placeholder="Enter your password"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          onClick={handleLogin}
          className="w-full rounded-lg  px-4 py-2 text-lg font-semibold text-white shadow-lg transition-transform duration-300 ease-in-out hover:scale-105   bg-brandPrimary"
        >
          Log In
        </button>
        <p className="mt-6 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <a
            href="register"
            className="font-medium text-brandPrimary hover:underline rounded-xl"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
