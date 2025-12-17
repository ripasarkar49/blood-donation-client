import React from "react";
import { Link } from "react-router";
import { FaTint, FaMapMarkerAlt, FaClock } from "react-icons/fa";
const RequestCardDesign = ({ data }) => {
  const { Recipient_Name, blood, req_district, req_upazila, date, time } = data;
  return (
    // <div className="grid w-11/12 mx-auto py-7 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
    <div className="card bg-base-100 border border-red-500  shadow-sm hover:scale-105 transition">
      <div className="card-body space-y-2">
        <h2 className="text-lg font-semibold">
          Recipient Name :{Recipient_Name}
        </h2>

        <p className="flex items-center gap-2 text-sm text-gray-600">
          <FaMapMarkerAlt />
          {req_upazila}, {req_district}
        </p>

        <span className="badge badge-error w-fit text-white flex gap-1">
          <FaTint /> {blood}
        </span>

        <p className="flex items-center gap-2 text-sm">
          <FaClock />
          {date} at {time}
        </p>

        <div className="card-actions justify-end">
          <Link className="btn btn-sm btn-outline bg-red-500 text-white ">
            View Details
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default RequestCardDesign;
