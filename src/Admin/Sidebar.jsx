import React, { useState } from "react";
import { FaHome, FaUsers, FaCogs, FaSignOutAlt } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { name: "Dashboard", icon: <MdDashboard />, link: "#dashboard" },
    { name: "Users", icon: <FaUsers />, link: "#users" },
    { name: "Settings", icon: <FaCogs />, link: "#settings" },
    { name: "Logout", icon: <FaSignOutAlt />, link: "#logout" },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white h-screen p-4 ${
          isOpen ? "w-64" : "w-16"
        } transition-all duration-300`}
      >
        <div className="flex justify-between items-center mb-6">
          <h1 className={`text-2xl font-bold ${isOpen ? "block" : "hidden"}`}>
            Admin
          </h1>
          <button
            onClick={toggleSidebar}
            className="text-xl focus:outline-none"
          >
            {isOpen ? "✖" : "☰"}
          </button>
        </div>
        <ul className="space-y-4">
          {menuItems.map((item, index) => (
            <li key={index}>
              <a
                href={item.link}
                className="flex items-center space-x-3 p-2 hover:bg-gray-700 rounded-md"
              >
                <span className="text-2xl">{item.icon}</span>
                <span className={`${isOpen ? "block" : "hidden"}`}>
                  {item.name}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Main Content */}
      
    </div>
  );
};

export default Sidebar;
