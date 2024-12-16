import { Outlet } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";

const Dashboard = () => {
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

export default Dashboard;
