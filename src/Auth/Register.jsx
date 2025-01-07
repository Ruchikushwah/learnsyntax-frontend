import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const APP_URL = import.meta.env.VITE_REACT_APP_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    //Validate Name
    if (!name) {
      formErrors.name = "Name is required";
      isValid = false;
    }
    //Validate Email
    if (!email) {
      formErrors.email = "Email is required";
      isValid = false;
    }
    //Validate Password
    if (!password) {
      formErrors.password = "Password is required";
    }
    setErrors(formErrors);
    return isValid;
  };
  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }
    const data = { name, email, password };

    try {
      let resp = await fetch(`${APP_URL}/api/auth/register`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      resp = await resp.json();
      alert(resp.message);

      if (resp.user) {
        navigate("/login");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 py-8">
      <div className="w-full max-w-md rounded-xl bg-white p-8 shadow-lg gap-5 flex flex-col">
        <h2 className="text-2xl font-bold text-center text-gray-700">
          Register
        </h2>

        <div>
          <label className="block text-sm font-medium text-gray-600">
            Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Enter Your Name"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandPrimary"
            required
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter Your Email"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandPrimary"
            required
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter Password"
            className="w-full px-4 py-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brandPrimary"
            required
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password}</p>
          )}
        </div>
        <button
          onClick={() => handleRegister()}
          type="submit"
          className=" px-4 py-2 font-semibold text-white bg-brandPrimary rounded-xl"
        >
          Sign up
        </button>
        <p className="text-sm text-center text-gray-600">
          Don’t have an account?{" "}
          <a href="login" className="text-brandPrimary hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
