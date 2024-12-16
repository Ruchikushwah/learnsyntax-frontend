import React from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";

const AdminLayout = () => {
  return (
    <>
      <div className=" h-screen w-full">
        <AdminHeader />
        <div>
          <div className=" flex">
            <Sidebar />
            <div className=" flex flex-col w-full">
              <Breadcrumbs />
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
