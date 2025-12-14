import React, { use, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
const Login = () => {
  const [error, setError] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, googleLogin } = use(AuthContext);
  const location = useLocation();
  const Navigate = useNavigate();
  //   console.log(location);

  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    // console.log({ email, password });
    signIn(email, password)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        Navigate(`${location.state ? location.state : "/"}`);
      })
      .catch((error) => {
        const errorCode = error.code;
        setError(errorCode);
      });
  };

  const handleGoogleLogin = () => {
    googleLogin()
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Login Successful!",
          timer: 1500,
          showConfirmButton: false,
        });
        Navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        setError(error.message);
      });
  };
  const handleTogglePass = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-4">
        <h2 className="font-semibold text-2xl text-center">
          Login Your Account
        </h2>
        <form onSubmit={handleLogin} className="card-body">
          <fieldset className="fieldset">
            {/* email  */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
              onChange={(e) => setUserEmail(e.target.value)}
            />
            {/* password */}
            <label className="label">Password</label>
            <div className="relative">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                className="input"
                placeholder="Password"
                required
              />
              <button
                onClick={handleTogglePass}
                className="btn btn-xs top-2 right-5 absolute"
              >
                {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
              </button>
            </div>
            <div>
              <Link to="/forget-password" state={userEmail} className="link link-hover">
                Forgot password?
              </Link>
            </div>
            <button type="submit" className="btn btn-neutral mt-4">
              Login
            </button>
            {error && <p className="text-red-600 text-xs">{error}</p>}
            <p className="font-bold text-center py-1 ">OR</p>
            <button
              onClick={handleGoogleLogin}
              className="btn btn-secondary btn-outline w-full"
            >
              <FaGoogle size={24} /> Login With Google
            </button>
          </fieldset>
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="text-secondary font-semibold">
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
