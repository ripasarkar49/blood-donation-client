import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router";
import { AuthContext } from "../../Provider/AuthProvider";
import image from "../../assets/logo.png";
import axiosInstance from "../../Hooks/AxiosInstance";
import Swal from "sweetalert2";

const DonarDetails = () => {
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const [donation, setDonation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchDonation = async () => {
      try {
        const res = await axiosInstance.get(`/donation/${id}`);
        setDonation(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonation();
  }, [id, user]);

  const handleConfirmDonation = async () => {
    try {
      await axiosInstance.patch("/update-donation-status", null, {
        params: {
          id: donation._id,
          status: "inprogress",
        },
      });

      setDonation((prev) => ({ ...prev, donation_status: "inprogress" }));

      document.getElementById("my_modal_3").close();
      Swal.fire({
                icon: "success",
                title: "Donation Inprogress!",
                timer: 1500,
                showConfirmButton: false,
              });
     
    } catch (error) {
      console.error(error);
      alert("Failed to update donation");
    }
  };

  if (loading)
    return <p className="text-center mt-10">Loading donation details...</p>;

  const isOwnRequest = user?.email === donation?.req_email;
  const isInProgress = donation?.donation_status === "inprogress";

  return (
    <div className="max-w-4xl mx-auto shadow-lg rounded-lg overflow-hidden flex flex-col md:flex-row gap-5 my-10">
      <div className="md:w-1/3 flex justify-center items-center bg-gray-100 p-4">
        <img src={image} className="object-contain h-70 w-full" />
      </div>

      <div className="md:w-2/3 p-6 flex flex-col justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-red-500">
            Donation Request Details
          </h2>
          <p>
            <b>Requester Name:</b> {donation?.req_name}
          </p>
          <p>
            <b>Requester Email:</b> {donation?.req_email}
          </p>
          <p>
            <b>Recipient Name:</b> {donation?.Recipient_Name}
          </p>
          <p>
            <b>Upazila:</b> {donation?.req_upazila}
          </p>
          <p>
            <b>District:</b> {donation?.req_district}
          </p>
          <p>
            <b>Full Address:</b> {donation?.full_address}
          </p>
          <p>
            <b>Blood:</b> {donation?.blood}
          </p>
          <p>
            <b>Hospital:</b> {donation?.hospital_name}
          </p>
          <p>
            <b>Date:</b> {donation?.date}
          </p>
          <p>
            <b>Time:</b> {donation?.time}
          </p>
          <p>
            <b>Message:</b> {donation?.message}
          </p>
          <p>
            <b>Status:</b>{" "}
            <span
              className={`font-bold ${
                isInProgress ? "text-green-600" : "text-orange-500"
              }`}
            >
              {donation?.donation_status}
            </span>
          </p>
        </div>

        <button
          disabled={isOwnRequest || isInProgress}
          onClick={() => document.getElementById("my_modal_3").showModal()}
          className={`btn mt-4 ${
            isOwnRequest || isInProgress
              ? "btn-disabled"
              : "bg-red-200 text-red-700"
          }`}
        >
          {isOwnRequest
            ? "You can't donate your own request"
            : isInProgress
            ? "Already In Progress"
            : "Donate Now"}
        </button>

        <dialog id="my_modal_3" className="modal">
          <div className="modal-box">
            <button
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={() => document.getElementById("my_modal_3").close()}
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-red-500 text-center">
              Confirm Donation
            </h2>
            <div className="space-y-2 mb-2">
              <input
                type="text"
                name="buyerName"
                value={user?.displayName}
                readOnly
                className="w-full border px-3 py-2 rounded "
              />
              <input
                type="email"
                name="buyerEmail"
                value={user?.email}
                readOnly
                className="w-full border px-3 py-2 rounded "
              />
            </div>
            <button
              onClick={handleConfirmDonation}
              className="w-full bg-red-500 text-white py-2 rounded"
            >
              Confirm
            </button>
          </div>
        </dialog>
      </div>
    </div>
  );
};

export default DonarDetails;
