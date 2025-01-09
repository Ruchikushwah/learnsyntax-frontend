import React, { useState } from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import { FaDiscourse } from "react-icons/fa6";
import { GrChapterAdd } from "react-icons/gr";
import { MdOutlineTopic } from "react-icons/md";
import { MdOutlinePostAdd } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { NavLink } from "react-router-dom";


const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">
      <div
        className={`${
          isOpen ? "w-64" : "w-20"
        } bg-gray-900 h-screen p-5 pt-8  duration-300 relative `}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute  top-9 w-7 h-7 bg-white border border-gray-700 rounded-full flex justify-center
           items-center cursor-pointer"
        >
          {isOpen ? "-" : "+"}
        </button>

        <ul className="mt-10 items-center">
          <NavLink to="/admin">
            <li
              className={`text-gray-300 text-sm flex items-center gap-x-4 p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                isOpen && "pl-5"
              }`}
            >
              <span className="material-icons">
                <LuLayoutDashboard className=" size-6" />
              </span>
              <span className={`${!isOpen && "hidden"} duration-300`}>
                Dashboard
              </span>
            </li>
          </NavLink>

          <NavLink to="managecourse">
            <li
              className={`text-gray-300 text-sm flex items-center gap-x-4 p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                isOpen && "pl-4"
              }`}
            >
              <span className="material-icons">
                <FaDiscourse className=" size-6" />
              </span>
              <span className={`${!isOpen && "hidden"} duration-300`}>
                Manage Course
              </span>
            </li>
          </NavLink>
         
         
          
         
          <NavLink to="setting">
            <li
              className={`text-gray-300 text-sm flex items-center gap-x-4 p-2 rounded-md cursor-pointer hover:bg-gray-700 ${
                isOpen && "pl-4"
              }`}
            >
              <span className="material-icons">
                <MdOutlinePostAdd className=" size-6" />
              </span>
              <span className={`${!isOpen && "hidden"} duration-300`}>
                Setting
              </span>
            </li>
          </NavLink>
        </ul>
      </div>

      {/* Main Content */}
    </div>
  );
};

export default Sidebar;
