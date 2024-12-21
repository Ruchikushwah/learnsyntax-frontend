import React from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";

import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Header />
      {/* <div className="mx-auto px-4 py-6"> */}
        
        <Outlet />
      {/* </div> */}
      <Footer />
    </>
  );
};

export default Layout;
