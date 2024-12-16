import React, { useState } from "react";
import { NavLink } from "react-router-dom";



const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

const handleLogin = () => {
  setIsLoggedIn(true);
};

const handleLogout = () => {
  setIsLoggedIn(false);
};
  return (
    <header className="bg-gray-600 text-white shadow-md py-4 px-6 flex justify-between ">
      {/* Logo or Title */}
      <div className="text-2xl font-bold">LearnSyntax</div>

      {/* Navigation Buttons */}
      <div className="flex justify-center ">
        {isLoggedIn ? (
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition"
          >
            Logout
          </button>
        ) : (
          <div className="flex gap-3 ">
            <button
              onClick={handleLogin}
              className="bg-white text-gray-600 px-4 py-2 rounded hover:bg-gray-100 transition"
            >
              Login
            </button>
            <div className="text-white lg:flex gap-4 items-center hidden ">
          <NavLink
            to="register"
            className=" bg-orange-500 px-6 py-2 font-medium rounded  hover:bg-white hover:text-orange-500 transition-all ease-in"
          >
            Register
          </NavLink>
        </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
