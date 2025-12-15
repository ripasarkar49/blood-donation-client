import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyDonateRequest = () => {
  const [totalRequest, setTotalRequest] = useState(0);
  const [myRequest, setMyRequest] = useState([]);
  const [itemsPerPage, seItemPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure
      .get(`/my-donation-requests?page=${currentPage - 1}&size=${itemsPerPage}`)
      .then((res) => {
        //   console.log(res.data);
        setMyRequest(res.data.request);
        setTotalRequest(res.data.totalRequest);
      });
  }, [axiosSecure, currentPage, itemsPerPage]);

  const numberOfPage = Math.ceil(totalRequest / itemsPerPage);
  const pages = [...Array(numberOfPage).keys()].map((e) => e + 1);
  //   console.log(myRequest);
  //   console.log(totalRequest);
  //   console.log(numberOfPage);
  //   console.log(pages);
  const handlePrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage < pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div>
      <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
        <table className="table ">
          <thead>
            <tr>
              <th></th>
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
              <tr key={request?._id}>
                <th>{(currentPage*10)+(index + 1)-10}</th>
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
      <div className="flex justify-center mt-12 gap-4">
        <button onClick={handlePrev} className="btn">
          Prev
        </button>
        {pages.map((page) => (
          <button
            className={`btn ${
              page === currentPage ? "bg-rose-500 text-white" : ""
            }`}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </button>
        ))}
        <button onClick={handleNext} className="btn">
          Next
        </button>
      </div>
    </div>
  );
};

export default MyDonateRequest;
