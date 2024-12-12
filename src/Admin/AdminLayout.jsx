import React from "react";
import AdminHeader from "./AdminHeader";

import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className=" h-screen w-full">
      <AdminHeader />
      <div>
        <div className=" flex">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
