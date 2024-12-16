

import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

const AdminHeader = () => {
    const [isOpen, setIsOpen] = useState(false);
     

  return (
    <>
      <header className="flex items-center justify-between p-4 bg-gray-900">
        <NavLink to={"/"}>
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-white">Learn Syntax</span>
          </div>
        </NavLink>

        <button>
          <Link href="" className=" px-3 py-2 text-white bg-gray-700 rounded">
            Logout
          </Link>
        </button>
      </header>
    </>
  );
};

export default AdminHeader;
