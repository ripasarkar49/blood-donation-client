import React, { useState, useContext, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import logo from "../assets/logo.png";
import userIcon from "../assets/user.png";
import Swal from "sweetalert2";
import { gsap } from "gsap";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const navRef = useRef(null);
  const linksRef = useRef(null);

  // Logo Animation & Scroll Effect
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".logo-anim", {
        y: -30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        clearProps: "all"
      });

      gsap.from(".nav-link-item", {
        y: -20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        clearProps: "all"
      });

      gsap.from(".auth-buttons", {
        x: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        clearProps: "all"
      });
    }, navRef);

    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      ctx.revert();
    };
  }, []);

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

  const navItemClass = ({ isActive }) =>
    `nav-link-item px-4 py-2 rounded-full transition-all duration-300 font-medium ${
      isActive
        ? "bg-red-50 text-red-600 shadow-sm"
        : "text-gray-600 hover:text-red-500 hover:bg-red-50/50"
    }`;

  return (
    <>
      {/* ================= Navbar ================= */}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          scrolled
            ? "glass shadow-md py-2"
            : "bg-transparent py-4"
        }`}
      >
        <div className="w-11/12 max-w-7xl mx-auto flex justify-between items-center ">
          {/* Left: Logo */}
          <div className="navbar-start w-auto flex items-center gap-3">
            <button className="lg:hidden text-2xl text-gray-700" onClick={() => setOpen(true)}>
              ☰
            </button>

            <Link to="/" className="flex items-center gap-2 logo-anim">
              <img src={logo} className="w-10 h-10 drop-shadow-sm" alt="logo" />
              <span className="text-2xl font-bold tracking-tight text-secondary">
                Blood<span className="text-red-600">Care</span>
              </span>
            </Link>
          </div>

          {/* Center (Desktop) */}
          <div className="navbar-center hidden lg:flex">
            <ul ref={linksRef} className="flex gap-2">
              <NavLink to="/" className={navItemClass}>
                Home
              </NavLink>
              <NavLink to="/donate-request" className={navItemClass}>
                Donation Requests
              </NavLink>
              <NavLink to="/search-page" className={navItemClass}>
                Search Donors
              </NavLink>
              {user && (
                <NavLink to="/funding" className={navItemClass}>
                  Funding
                </NavLink>
              )}
               <NavLink to="/contact-us" className={navItemClass}>
                Contact Us
              </NavLink>
            </ul>
          </div>

          {/* Right (Desktop) */}
          <div className="navbar-end w-auto hidden lg:flex gap-3 auth-buttons">
            {!user ? (
              <>
                <Link to="/login" className="btn btn-ghost hover:bg-red-50 text-red-600 font-semibold">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary-custom rounded-full px-6 border-none text-white shadow-red-200 shadow-lg">
                  Register
                </Link>
              </>
            ) : (
              <div className="dropdown dropdown-end">
                <label tabIndex={0} className="cursor-pointer transition-transform hover:scale-105 active:scale-95">
                  <div className="avatar online">
                    <div className="w-11 rounded-full ring ring-red-600 ring-offset-base-100 ring-offset-2">
                      <img src={user?.photoURL || userIcon} alt="user" />
                    </div>
                  </div>
                </label>

                <ul
                  tabIndex={0}
                  className="dropdown-content menu p-2 shadow-xl bg-white rounded-box w-52 mt-4 border border-gray-100"
                >
                  <li className="mb-2 px-2 text-sm text-gray-500">
                    Hello, {user.displayName?.split(" ")[0] || "User"}
                  </li>
                  <li>
                    <Link to="/dashboard" className="hover:bg-red-50 hover:text-red-600">Dashboard</Link>
                  </li>
                  <div className="divider my-1"></div>
                  <li>
                    <button onClick={handleLogout} className="text-red-600 hover:bg-red-50">
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
<div className="h-16 lg:h-16"></div>
      {/* ================= Mobile Overlay ================= */}
      <div
        className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
            open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setOpen(false)}
      ></div>

      {/* ================= Mobile Drawer ================= */}
      <div
        className={`fixed top-0 left-0 h-full w-4/5 max-w-sm bg-white z-[60] shadow-2xl transform transition-transform duration-300 ease-in-out ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="p-5 border-b flex items-center justify-between bg-red-50/50">
            <div className="flex items-center gap-3">
                 {user ? (
                    <img
                        src={user?.photoURL || userIcon}
                        alt="user"
                        className="w-10 h-10 rounded-full border-2 border-red-200"
                    />
                 ) : (
                    <img src={logo} className="w-8 h-8" alt="logo" />
                 )}
                 <span className="font-bold text-lg text-secondary">Menu</span>
            </div>
          <button onClick={() => setOpen(false)} className="btn btn-circle btn-ghost btn-sm text-gray-500">
            ✕
          </button>
        </div>

        {/* Links */}
        <ul className="p-4 flex flex-col gap-2">
          <Link to="/" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-3 font-medium text-gray-700">
            Home
          </Link>
          <Link to="/donate-request" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-3 font-medium text-gray-700">
            Donation Requests
          </Link>
          <Link  to="/search-page" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-3 font-medium text-gray-700">
             Search Donors
          </Link>
          <Link  to="/contact-us" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-3 font-medium text-gray-700">
             Contact Us
          </Link>
          {user && (
            <>
              <Link to="/funding" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-3 font-medium text-gray-700">
                Funding
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="px-4 py-3 rounded-xl hover:bg-red-50 hover:text-red-600 flex items-center gap-3 font-medium text-gray-700">
                Dashboard
              </Link>
            </>
          )}
        </ul>

        {/* Auth Buttons */}
        <div className="absolute bottom-0 left-0 w-full p-6 border-t bg-gray-50">
          {!user ? (
            <div className="flex flex-col gap-3">
              <Link to="/login" className="btn btn-outline text-red-600 border-red-600 hover:bg-red-600 hover:text-white w-full">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary-custom w-full border-none shadow-lg shadow-red-200">
                Register
              </Link>
            </div>
          ) : (
            <button
              onClick={handleLogout}
              className="btn w-full bg-red-100 text-red-600 hover:bg-red-200 border-none"
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
