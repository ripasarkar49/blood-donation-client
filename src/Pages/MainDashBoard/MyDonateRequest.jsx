import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { Link } from "react-router";
import { CheckCircle, SquarePen, Trash2, XCircle } from "lucide-react";
import Swal from "sweetalert2";

const MyDonateRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    let url = `/my-donation-requests?page=${
      currentPage - 1
    }&size=${itemsPerPage}`;
    if (statusFilter) url += `&status=${statusFilter}`;

    axiosSecure
      .get(url)
      .then((res) => {
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      })
      .catch((err) => console.error(err));
  }, [axiosSecure, currentPage, itemsPerPage, statusFilter]);

  const numberOfPage = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()].map((e) => e + 1);

  const handlePrev = () => currentPage > 1 && setCurrentPage(currentPage - 1);
  const handleNext = () =>
    currentPage < pages.length && setCurrentPage(currentPage + 1);


  const handleStatusUpdate = (id, status) => {
    axiosSecure
      .patch(`/update-donation-status?id=${id}&status=${status}`)
      .then(() => {
        setMyRequest((prev) =>
          prev.map((req) =>
            req._id === id ? { ...req, donation_status: status } : req
          )
        );

        Swal.fire({
          icon: "success",
          title: `Donation ${status}`,
          timer: 1500,
          showConfirmButton: false,
        });
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This donation request will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/delete/${id}`).then(() => {
          setMyRequest((prev) => prev.filter((req) => req._id !== id));
        });
      }
    });
  };

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
              <th>SL</th>
              <th>Recipient Name</th>
              <th>Recipient Location</th>
              <th> Date</th>
              <th> Time</th>
              <th>Blood</th>
              <th> Status</th>
              <th> Donar Info</th>
              <th>Action</th>
              <th>View</th>
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
                <td>
                  {" "}
                  {request.donation_status === "inprogress" ? (
                    <>
                      <p>{request.req_name}</p>
                      <p>{request.req_email}</p>
                    </>
                  ) : (
                    "-"
                  )}
                </td>
                <td className="flex gap-2">
                  {/* pending → edit + delete */}
                  {request.donation_status === "pending" && (
                    <>
                      <Link to={`/dashboard/edit-request/${request._id}`}>
                        <SquarePen className="text-blue-600" />
                      </Link>
                      <button onClick={() => handleDelete(request._id)}>
                        <Trash2 className="text-red-600" />
                      </button>
                    </>
                  )}

                  {/* inprogress → done + cancel */}
                  {request.donation_status === "inprogress" && (
                    <>
                      <button
                        onClick={() => handleStatusUpdate(request._id, "done")}
                      >
                        <CheckCircle className="text-green-600" />
                      </button>
                      <button
                        onClick={() =>
                          handleStatusUpdate(request._id, "canceled")
                        }
                      >
                        <XCircle className="text-orange-600" />
                      </button>
                    </>
                  )}
                </td>
                <td>
                  <Link
                    to={`/donate-details/${request._id}`}
                    className="btn bg-red-600 text-white font-semibold rounded"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        <button
          onClick={handlePrev}
          className="btn"
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            className={`btn ${
              page === currentPage ? "bg-rose-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button
          onClick={handleNext}
          className="btn"
          disabled={currentPage === pages.length}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonateRequest;
