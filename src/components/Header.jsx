
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const login_token = localStorage.getItem("token");

  

  useEffect(() => {
    if (login_token) {
      setIsLoggedIn(true);
    }
  }, []);
  const logout = () => {
    localStorage.removeItem("token"); // Clear the token from storage
    setIsLoggedIn(false); // Update state to logged out
    console.log("Logged out successfully");
  };
  const fetchUserInfo = async (token) => {
    try {
      const response = await fetch("http://127.0.0.1:8000/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`, // Send the token as a bearer token
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch user info");
      }

      const data = await response.json();
      setUserInfo(data); // Update user info state
    } catch (error) {
      console.error("Error fetching user info:", error);
      logout(); // Logout if the token is invalid
    }
  };
  

  return (
    <header className="bg-gray-600 text-white shadow-md py-4 px-6 flex justify-between ">
      {/* Logo or Title */}
      <div className="text-2xl font-bold">LearnSyntax</div>

      {/* Navigation Buttons */}
      <div className="flex justify-center ">
        {isLoggedIn ? (
          <div>
             {userInfo && (
              <div>
                <h2 className="text-lg font-medium">
                  Welcome, {userInfo.name}!
                </h2>
                <p className="text-sm text-gray-800">{userInfo.email}</p>
              </div>
            )}
            <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500 transition" onClick={logout}>
          Logout
        </button></div>
        
          
        ) : (
          <div className="flex gap-3 ">
            <NavLink
                to="login"
                className=" bg-orange-500 px-6 py-2 font-medium rounded  hover:bg-white hover:text-orange-500 transition-all ease-in"
              >
                Login{""}
              </NavLink>
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
