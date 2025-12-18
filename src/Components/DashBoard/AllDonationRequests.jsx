import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import DonationRequestTable from "../../Components/DonationRequestTable";

const AllDonationRequests = () => {
  const axiosSecure = useAxiosSecure();

  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [totalRequest, setTotalRequest] = useState(0);

  useEffect(() => {
    let url = `/all-donation-requests?page=${currentPage - 1}&size=${itemsPerPage}`;
    if (statusFilter) url += `&status=${statusFilter}`;

    axiosSecure.get(url)
      .then((res) => {
        setRequests(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((err) => console.error(err));
  }, [currentPage, itemsPerPage, statusFilter, axiosSecure]);

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
      <DonationRequestTable
        requests={requests}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
      />

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

export default AllDonationRequests;
