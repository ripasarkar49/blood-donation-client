import React, { useContext } from "react";
import { NavLink } from "react-router";
import profileIcon from "../../assets/user.png";
import {
  Home,
  Users,
  ShoppingBag,
  Package,
  BarChart3,
  LogOut,
  PackageCheck,
  PlusCircle,
  HeartHandshake,
} from "lucide-react";
import { AuthContext } from "../../Provider/AuthProvider";
import Swal from "sweetalert2";
import { CgProfile } from "react-icons/cg";

const AdminSidebar = () => {
  const { role, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "LogOut Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <aside className="w-64 h-screen bg-gray-900 text-gray-200 flex flex-col p-5 shadow-xl">
      {/* Logo */}
      <div className="text-2xl font-semibold mb-10 text-white tracking-wide">
        Admin Panel
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition relative
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_0_10px_#3b82f6]"
                  : "hover:bg-gray-700"
              }`
          }
        >
          {" "}
          <Home className="h-5 w-5" /> Dashboard
        </NavLink>
        <NavLink
          to="profile"
          className={({ isActive }) =>
            `flex items-center gap-3 p-3 rounded-lg transition relative
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_0_10px_#3b82f6]"
                  : "hover:bg-gray-700"
              }`
          }
        >
          {" "}
          {/* <img className="h-5 w-5" />  */}
          <CgProfile className=" h-5 w-5 bg-red-700" />
          Profile
        </NavLink>
        {role == "donar" && (
          <NavLink
            to="add-request"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition relative
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_0_10px_#3b82f6]"
                  : "hover:bg-gray-700"
              }`
            }
          >
            {" "}
            <PlusCircle className="h-5 w-5 bg-red-700" />
            {/* <Heart size={24} /> */}
            Add Donation Request
          </NavLink>
        )}
        {role == "admin" && (
          <NavLink
            to="all-users"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition relative
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_0_10px_#3b82f6]"
                  : "hover:bg-gray-700"
              }`
            }
          >
            {" "}
            <Users className="h-5 w-5" />
            All Users
          </NavLink>
        )}
        {role == "donar" && (
          <NavLink
            to="my-donation-requests"
            className={({ isActive }) =>
              `flex items-center gap-3 p-3 rounded-lg transition relative
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-[0_0_10px_#3b82f6]"
                  : "hover:bg-gray-700"
              }`
            }
          >
            {" "}
            <HeartHandshake className="h-5 w-5 bg-red-700" />
            My Donation Requests
          </NavLink>
        )}
      </nav>

      {/* Logout */}
      <div className="mt-auto flex items-center justify-between">
        <NavLink
          to="/"
          className=" btn  bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <Home size={18} /> Home
        </NavLink>
        <button
          onClick={handleLogout}
          className="btn bg-red-600 hover:bg-red-700 rounded-lg transition"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
