import React, { useState, useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import axios from "axios";

const Register = () => {
  const { createUser, setUser, updateUser, googleLogin } =
    useContext(AuthContext);
  const [nameError, setNameError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpozilas] = useState([]);
  const [upazila, setUpozila] = useState("");
  useEffect(() => {
    axios
      .get("/districts.json")
      .then((res) => {
        // console.log("Districts:", res.data.districts);
        setDistricts(res.data.districts);
      })
      .catch((err) => console.log(err));

    axios
      .get("/upazila.json")
      .then((res) => {
        // console.log("Upazilas:", res.data.upazilas);
        setUpozilas(res.data.upazilas);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value.trim();

    if (name.length < 5) {
      setNameError("Name should be more than 5 characters");
      return;
    } else {
      setNameError("");
    }

    const photo = form.photo;
    const email = form.email.value.trim();
    const password = form.password.value;
    const file = photo.files[0];
    // console.log(file);
    const blood = form.blood.value;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return Swal.fire({
        icon: "error",
        title: "Weak Password",
        text: "Password must have an uppercase, lowercase & at least 6 characters",
      });
    }
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=4951fc09b999088ad5352346f9bd8bec`,
      { image: file },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    const mainPhotoUrl = res.data.data.display_url;
    const formData = {
      name,
      email,
      password,
      mainPhotoUrl,
      blood,
      district,
      upazila,
    };

    

    if (res.data.success == true) {
      createUser(email, password)
        .then((result) => {
          const user = result.user;
          updateUser({ displayName: name, photoURL: mainPhotoUrl })
            .then(() => {
              Swal.fire({
                icon: "success",
                title: "Account Created Successfully!",
                timer: 1500,
                showConfirmButton: false,
              });
              setUser({ ...user, displayName: name, photoURL: mainPhotoUrl });
              axios
                .post("http://localhost:5000/users", formData)
                .then((res) => {
                  console.log(res.data);
                })
                .catch((err) => {
                  console.log(err);
                });
              navigate(location.state ? location.state : "/");
            })
            .catch((err) => {
              console.log(err);
              setUser(user);
            });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: error.message,
          });
        });
    }
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
        navigate(location.state ? location.state : "/");
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Google Login Failed",
          text: error.message,
        });
      });
  };

  const handleTogglePass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-4">
        <h2 className="font-semibold text-2xl text-center">
          Register Your Account
        </h2>
        <form onSubmit={handleRegister} className="card-body">
          <fieldset>
            {/* Name */}
            <label className="label">Name</label>
            <input
              name="name"
              type="text"
              className="input"
              placeholder="Name"
              required
            />
            {nameError && <p className="text-red-500 text-sm">{nameError}</p>}

            {/* Photo URL */}
            <label className="label">Photo URL</label>
            <input
              name="photo"
              type="file"
              className="input"
              placeholder="Photo URL"
              required
            />
            {/* choose a blood*/}
            <select name="blood" defaultValue="" className="select my-3">
              <option value="" disabled={true}>
                Select blood group
              </option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="unknown">Unknown</option>
            </select>
            {/* districts */}
            <select
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              className="select"
            >
              <option value="" disabled>
                Select Your District
              </option>
              {districts.map((d) => (
                <option value={d?.name} key={d.id}>
                  {d?.name}
                </option>
              ))}
            </select>
            {/* upazila */}
            <select
              value={upazila}
              onChange={(e) => setUpozila(e.target.value)}
              className="select"
            >
              <option value="" disabled>
                Select Your Upazila
              </option>
              {upazilas.map((u) => (
                <option value={u?.name} key={u.id}>
                  {u?.name}
                </option>
              ))}
            </select>
            {/* Email */}
            <label className="label">Email</label>
            <input
              name="email"
              type="email"
              className="input"
              placeholder="Email"
              required
            />

            {/* Password */}
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

            {/* Register Button */}
            <button type="submit" className="btn btn-neutral mt-4 w-full">
              Register
            </button>

            <p className="font-bold text-center py-1">OR</p>

            {/* Google Login */}
            <button
              onClick={handleGoogleLogin}
              className="btn btn-secondary btn-outline w-full"
            >
              <FaGoogle size={24} /> Login With Google
            </button>

            <p className="pt-4 text-center">
              Already have an account?{" "}
              <Link to="/auth/login" className="text-secondary font-semibold">
                Login
              </Link>
            </p>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
