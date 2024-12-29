import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-scroll";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  const fetchUserInfo = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const response = await fetch("http://127.0.0.1:8000/api/user", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Failed to fetch user info");

      const data = await response.json();
      setUserInfo(data.user || data.adminData);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Error fetching user info:", error);
      logout();
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserInfo(null);
    console.log("Logged out successfully");
  };

  const navItems = [
    { link: "Home", path: "/", type: "route" },
    { link: "Services", path: "service", type: "scroll" },
    { link: "About", path: "about", type: "scroll" },
    { link: "Courses", path: "course", type: "scroll" },
    { link: "Contact Us", path: "/contact", type: "route" },
    { link: "Online Compiler", path: "/online-compiler", type: "route" },
  ];

  return (
    <header className="w-full bg-white md:bg-transparent fixed top-0 left-0 right-0">
      <nav
        className={`py-4 lg:px-14 px-4 ${
          isSticky ? "sticky top-0 border bg-white duration-300" : ""
        }`}
      >
        <div className="flex justify-between items-center text-base gap-8">
          <a href="/" className="text-2xl font-semibold text-gray-900">
            LearnSyntax
          </a>

          <ul className="md:flex space-x-12 hidden">
            {navItems.map(({ link, path, type }) =>
              type === "scroll" ? (
                <Link
                  key={path}
                  to={path}
                  spy={true}
                  smooth={true}
                  offset={-100}
                  className="block text-base text-gray-900 hover:text-brandPrimary first:font-medium cursor-pointer"
                >
                  {link}
                </Link>
              ) : (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) =>
                    `block text-base ${
                      isActive ? "text-brandPrimary" : "text-gray-900"
                    } hover:text-brandPrimary first:font-medium`
                  }
                >
                  {link}
                </NavLink>
              )
            )}
          </ul>

          <div className="space-x-12 hidden lg:flex items-center">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleDropdown}
                  className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-200  rounded-full dark:bg-gray-600"
                  aria-expanded={isDropdownOpen}
                >
                  <span className="font-medium text-brandPrimary text-xl dark:text-gray-300">
                    {userInfo?.name?.charAt(0).toUpperCase() || "U"}
                  </span>
                </button>
                {isDropdownOpen && (
                  <div
                    id="userDropdown"
                    className="absolute right-0 mt-2 w-44 bg-white divide-y divide-gray-100 rounded-lg shadow z-10"
                  >
                    <div className="px-4 py-3 text-sm text-gray-900">
                      <div>{userInfo?.name}</div>
                      <div className="font-medium truncate">
                        {userInfo?.email}
                      </div>
                    </div>
                    <ul className="py-2 text-sm text-gray-700">
                      <li>
                        <a
                          href="/admin"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Dashboard
                        </a>
                      </li>
                      <li>
                        <a
                          href="/admin/settings"
                          className="block px-4 py-2 hover:bg-gray-100"
                        >
                          Settings
                        </a>
                      </li>
                    </ul>
                    <div className="py-1">
                      <button
                        onClick={logout}
                        className="block w-full px-4 py-2 text-left text-sm text-white bg-brandPrimary"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex gap-3 items-center">
                <a
                  href="/login"
                  className="bg-brandPrimary text-white py-2 px-4 rounded hover:bg-gray-300"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="bg-brandPrimary text-white py-2 px-4 rounded hover:bg-gray-300"
                >
                  Register
                </a>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
