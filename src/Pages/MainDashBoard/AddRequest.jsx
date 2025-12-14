import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Provider/AuthProvider";
import axios from "axios";
import useAxios from "../../Hooks/UseAxios";
import Swal from "sweetalert2";

export default function AddRequest() {
  const { user } = useContext(AuthContext);
  const [districts, setDistricts] = useState([]);
  const [district, setDistrict] = useState("");
  const [upazilas, setUpozilas] = useState([]);
  const [upazila, setUpozila] = useState("");
  const axiosInstance = useAxios();
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

  const handlerequest = (e) => {
    e.preventDefault();
    const form = e.target;
    const req_name = form.req_name.value;
    const req_email = form.req_email.value;
    const Recipient_Name = form.Recipient_Name.value;
    const req_district = district;
    const req_upazila = upazila;
    const hospitsl_name = form.hospitsl_name.value;
    const full_address = form.full_address.value;
    const blood = form.blood.value;
    const time = form.time.value;
    const date = form.date.value;
    const message = form.message.value;

    const formData = {
      req_name,
      req_email,
      Recipient_Name,
      req_district,
      req_upazila,
      hospitsl_name,
      full_address,
      blood,
      time,
      date,
      message,
      donation_status: "pending",
    };
    axiosInstance
      .post("/requests", formData)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: `Request ID: ${res.data.insertedId}`,
          timer: 1500,
          showConfirmButton: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <div className="flex justify-center items-center">
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-8">
          <h2 className="text-2xl font-semibold text-center mb-6">
            Blood Donation Request
          </h2>
          <form onSubmit={handlerequest} className="space-y-4">
            {/* User Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">Your Name</label>
                <input
                  type="text"
                  name="req_name"
                  value={user?.displayName}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Your Email</label>
                <input
                  type="email"
                  name="req_email"
                  value={user?.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
                />
              </div>
            </div>

            {/* Recipient Info */}
            <div>
              <label className="block font-medium mb-1">Recipient Name</label>
              <input
                type="text"
                name="Recipient_Name"
                placeholder="Recipient Name"
                className="input input-bordered w-full"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-medium mb-1">
                  Recipient District
                </label>

                <select
                  value={district}
                  name="req_district"
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
              </div>
              <div>
                <label className="block font-medium mb-1">
                  Recipient Upazila
                </label>
                <select
                  value={upazila}
                  name="req_upazila"
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
              </div>
            </div>

            {/* Hospital & Address */}
            <div>
              <label className="block font-medium mb-1">Hospital Name</label>
              <input
                type="text"
                name="hospitsl_name"
                placeholder="Dhaka Medical College"
                className="input input-bordered w-full"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Full Address</label>
              <input
                type="text"
                name="full_address"
                placeholder="Rahman Road, Dhaka"
                className="input input-bordered w-full"
              />
            </div>

            {/* Blood & Time/Date */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block font-medium mb-1">Blood Group</label>
                <select
                  name="blood"
                  defaultValue=""
                  className="select select-bordered w-full"
                >
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
              </div>
              <div>
                <label className="block font-medium mb-1">Donation Time</label>
                <input
                  name="time"
                  type="time"
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block font-medium mb-1">Donation Date</label>
                <input
                  name="date"
                  type="date"
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Request Message */}
            <div>
              <label className="block font-medium mb-1">Request Message</label>
              <textarea
                rows="4"
                name="message"
                placeholder="Explain why the blood is needed"
                className="textarea textarea-bordered w-full"
              />
            </div>

            {/* Submit Button */}
            <button className="btn btn-primary w-full mt-4">Request</button>
          </form>
        </div>
      </div>
    </div>
  );
}
