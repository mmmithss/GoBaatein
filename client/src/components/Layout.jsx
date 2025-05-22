import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

const Layout = ({ showSidebar = false, children }) => {
  return (
    <div className=" min-h-screen">
      <div className=" flex">
        {showSidebar && <SideBar />}
        <div className=" flex-1 flex flex-col">
          <NavBar showSidebar={showSidebar} />
          <main className=" flex-1 overflow-auto">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
