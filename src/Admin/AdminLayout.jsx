import React, { Suspense } from "react";
import { Outlet } from "react-router-dom";
import Breadcrumbs from "../components/Breadcrumbs";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";
import { BounceLoader } from "react-spinners";

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

              <Suspense
                fallback={
                  <BounceLoader
                    color="#2ba6bf"
                    className=" flex justify-center items-center flex-1 "
                  />
                }
              >
                <Outlet />
              </Suspense>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
