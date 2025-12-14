import React, { useState, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import Swal from "sweetalert2";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Logout Successful",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/login");
      })
      .catch(console.log);
  };

  const navItemClass =
    "px-3 py-2 rounded hover:bg-blue-600 hover:text-white transition";

  return (
    <>
      {/* ================= Navbar ================= */}
      <div className="navbar bg-white shadow-md px-4 lg:px-10">
        {/* Left */}
        <div className="navbar-start">
          <button className="lg:hidden mr-2" onClick={() => setOpen(true)}>
            ☰
          </button>

          <Link to="/" className="flex items-center gap-0">
            <img src={logo} className="w-10 h-10" alt="logo" />
            <span className="text-2xl font-bold text-red-600">BloodCare</span>
          </Link>
        </div>

        {/* Center (Desktop) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="flex gap-3 font-medium">
            <NavLink to="/donation-requests" className={navItemClass}>
              Donation Requests
            </NavLink>

            {user && (
              <NavLink to="/funding" className={navItemClass}>
                Funding
              </NavLink>
            )}
          </ul>
        </div>

        {/* Right */}
        <div className="navbar-end hidden lg:flex gap-3">
          {!user ? (
            <Link to="/login" className="btn btn-sm bg-blue-600 text-white">
              Login
            </Link>
          ) : (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="cursor-pointer">
                <img
                  src={user?.photoURL || userIcon}
                  className="w-10 h-10 rounded-full border-2 border-red-700"
                  alt="user"
                />
              </label>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow bg-base-100 rounded w-40"
              >
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="text-red-600">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* ================= Mobile Drawer ================= */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center gap-3">
          {user ? (
            <>
              <img
                src={user?.photoURL || userIcon}
                alt="user"
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <p className="font-semibold">{user.displayName || "User"}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </>
          ) : (
            <span className="text-xl font-bold text-red-600">BloodCare</span>
          )}

          <button onClick={() => setOpen(false)} className="ml-auto text-xl">
            ✕
          </button>
        </div>

        <ul className="p-4 flex flex-col gap-3 text-lg">
          <Link to="/donation-requests" onClick={() => setOpen(false)}>
            Donation Requests
          </Link>

          {user && (
            <>
              <Link to="/funding" onClick={() => setOpen(false)}>
                Funding
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                Dashboard
              </Link>
            </>
          )}
        </ul>

        <div className="p-4 border-t">
          {!user ? (
            <Link
              to="/login"
              className="btn btn-sm w-full bg-blue-600 text-white"
            >
              Login
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="btn btn-sm w-full bg-red-600 text-white"
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
