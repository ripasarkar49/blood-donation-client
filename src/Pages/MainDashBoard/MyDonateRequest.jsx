import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyDonateRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let url = `/my-donation-requests?page=${currentPage - 1}&size=${itemsPerPage}`;
    if (statusFilter) url += `&status=${statusFilter}`;

    axiosSecure.get(url)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure, currentPage, itemsPerPage, statusFilter]);

  const numberOfPage = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()].map((e) => e + 1);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () => currentPage < pages.length && setCurrentPage(currentPage + 1);

  return (
    <div className="p-4">
      {/* Filter */}
      <div className="mb-4 flex items-center gap-4">
        <label className="font-medium">Filter by Status:</label>
        <select
          className="select select-bordered w-52"
          value={statusFilter}
          onChange={(e) => {
            setCurrentPage(1);
            setStatusFilter(e.target.value);
          }}
        >
          <option value="">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table w-full">
          <thead>
            <tr className="bg-red-200">
              <th>#</th>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th>Donation Date</th>
              <th>Donation Time</th>
              <th>Blood Group</th>
              <th>Donation Status</th>
            </tr>
          </thead>
          <tbody>
            {myRequest.map((request, index) => (
              <tr key={request._id || `${request.Recipient_Name}-${index}`}>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{request?.Recipient_Name}</td>
                <td>{request?.full_address}</td>
                <td>{request?.date}</td>
                <td>{request?.time}</td>
                <td>{request?.blood}</td>
                <td>{request?.donation_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button onClick={handlePrev} className="btn" disabled={currentPage === 1}>
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${page === currentPage ? "bg-rose-500 text-white" : ""}`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="btn" disabled={currentPage === pages.length}>
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonateRequest;
