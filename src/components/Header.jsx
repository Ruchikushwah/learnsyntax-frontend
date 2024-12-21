
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";
import {FaXmark,FaBars} from 'react-icons/fa6';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  // const login_token = localStorage.getItem("token");

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);

  //setting togggle menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  }


  useEffect(() => {
    const handleScroll = () => {
      //this is for the header to be bold and to look aesthetic
      if (window.scrollY > 100) {
        setIsSticky(true);
      }
      else {
        setIsSticky(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.addEventListener('scroll', handleScroll);
    }
    // if (login_token) {
    //   setIsLoggedIn(true);
    // }
  }, []);

  useEffect(() => {
    const login_token = localStorage.getItem("login_token"); // Example: Replace with your token logic
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

  //header items
  const navItems = [
    { link: "Home", path: "/" ,type:"route"},
    { link: "Services", path: "service" , type: "scroll"},
    { link: "About", path: "about",type: "scroll" },
    { link: "Courses", path: "course" ,type: "scroll"},
    { link: "Contact Us", path: "/contact", type: "route" },
    // { link: "Testimonial", path: "testimonial" },
    
  ];
  return (
    // <header className="bg-gray-600 text-white shadow-md py-4 px-6 flex justify-between ">
    //   {/* Logo or Title */}
    //   <div className="text-2xl font-bold">LearnSyntax</div>

    //   {/* Navigation Buttons */}
    //   <div className="flex justify-center ">
    //     {isLoggedIn ? (
    //       <div>
    //         {userInfo && (
    //           <div>
    //             <h2 className="text-lg font-medium">
    //               Welcome, {userInfo.name}!
    //             </h2>
    //             <p className="text-sm text-gray-800">{userInfo.email}</p>
    //           </div>
    //         )}
    //         <button
    //           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-white  hover:text-blue-600 transition"
    //           onClick={logout}
    //         >
    //           Logout
    //         </button>
    //       </div>
    //     ) : (
    //       <div className="flex gap-3 ">
    //         <NavLink
    //           to="login"
    //           className=" bg-blue-600 px-6 py-2 font-medium rounded  hover:bg-white hover:text-blue-600 transition-all ease-in"
    //         >
    //           Loginshaique{""}
    //         </NavLink>
    //         <div className="text-white lg:flex gap-4 items-center hidden ">
    //           <NavLink
    //             to="register"
    //             className=" bg-blue-600 px-6 py-2 font-medium rounded  hover:bg-white hover:text-blue-600 transition-all ease-in"
    //           >
    //             Register
    //           </NavLink>
    //         </div>
    //       </div>
    //     )}
    //   </div>
    // </header>
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
  <nav
    className={`py-4 lg:px-14 px-4 ${
      isSticky ? "sticky top-0 left-0 right-0 border bg-white duration-300" : ""
    }`}
  >
    <div className="flex justify-between items-center text-base gap-8">
      {/* Logo */}
      <a
        href="/"
        className="text-2xl font-semibold flex items-center space-x-3"
      >
        {/* <img
          src=""
          alt="Logo"
          className="w-10 inline-block items-center"
        /> */}
        <span className="text-[#263238]">LearnSyntax</span>
      </a>

      {/* Navigation items for large devices */}
      <ul className="md:flex space-x-12 hidden">
        {navItems.map(({ link, path ,type}) =>
        type === "scroll" ? (
          <Link
            to={path}
            spy={true}
            smooth={true}
            offset={-100}
            key={path}
            className="block text-base text-gray900 hover:text-brandPrimary first:font-medium"
          >
            {link}
          </Link>
        ):(
          <NavLink
          to={path}
          key={path}
          className={({ isActive }) =>
            `block text-base ${
              isActive ? "text-brandPrimary" : "text-gray900"
            } hover:text-brandPrimary first:font-medium`
          }
        >
          {link}
        </NavLink>
  
        )
        )}
      </ul>

      {/* Buttons for large devices */}
      <div className="space-x-12 hidden lg:flex items-center">
        {isLoggedIn ? (
          <div className="flex items-center space-x-4">
            {userInfo && (
              <div>
                <h2 className="text-lg font-medium text-gray900">
                  Welcome, {userInfo.name}!
                </h2>
                <p className="text-sm text-gray-600">{userInfo.email}</p>
              </div>
            )}
            <button
              className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-white hover:text-blue-600 transition-all"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <a
              href="/login"
              className="hidden lg:flex items-center text-brandPrimary hover:text-gray900"
            >
              Login
            </a>
            <a
              href="/register"
              className="bg-brandPrimary text-white py-2 px-4 transition-all duration-300 rounded hover:bg-neutralGray"
            >
              Register
            </a>
          </div>
        )}
      </div>

      {/* Menu button for mobile devices */}
      <div className="md:hidden">
        <button
          onClick={toggleMenu}
          className="text-neutralDGrey focus:outline-none focus:text-gray-500"
        >
          {isMenuOpen ? (
            <FaXmark className="h-6 w-6 text-neutralDGrey" />
          ) : (
            <FaBars className="h-6 w-6 text-neutralDGrey" />
          )}
        </button>
      </div>
    </div>

    {/* Navigation items for mobile */}
    <div
      className={`space-y-4 px-4 mt-16 py-7 bg-brandPrimary ${
        isMenuOpen ? "block fixed top-0 right-0 left-0" : "hidden"
      }`}
    >
      {navItems.map(({ link, path,type }) => type ==="scroll" ?(
        <Link
          to={path}
          spy={true}
          smooth={true}
          offset={-100}
          key={path}
          className="block text-base text-white hover:text-brandPrimary first:font-medium"
        >
          {link}
        </Link>
      ):(
        <NavLink
        to={path}
        key={path}
        className="block text-base text-white hover:text-brandPrimary first:font-medium"
      >
        {link}
      </NavLink>
      )  
    )}

      {isLoggedIn ? (
        <div className="text-white">
          {userInfo && (
            <div className="mb-4">
              <h2 className="text-lg font-medium">Welcome, {userInfo.name}!</h2>
              <p className="text-sm">{userInfo.email}</p>
            </div>
          )}
          <button
            className="bg-blue-600 py-2 px-4 rounded hover:bg-white hover:text-blue-600 transition"
            onClick={logout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <a
            href="/login"
            className="block bg-blue-600 py-2 px-4 font-medium text-center rounded hover:bg-white hover:text-blue-600 transition"
          >
            Login
          </a>
          <a
            href="/register"
            className="block bg-blue-600 py-2 px-4 font-medium text-center rounded hover:bg-white hover:text-blue-600 transition"
          >
            Register
          </a>
        </div>
      )}
    </div>
  </nav>
</header>
  );
};

export default Header;
