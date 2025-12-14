import React from "react";
import { Outlet } from "react-router";
import AdminSidebar from "../Components/DashBoard/AdminSidebar";

const DashBoardLayOut = () => {
  return (
    <div className="flex">
      <AdminSidebar></AdminSidebar>
      <div className="flex-1 p-5">
        <Outlet></Outlet>
      </div>
    </div>
  );
};

export default DashBoardLayOut;
