import { Link } from "react-router";
import { CheckCircle, SquarePen, Trash2, XCircle } from "lucide-react";

const DonationRequestTable = ({
  requests,
  currentPage,
  itemsPerPage,
  onDelete,
  onStatusUpdate,
  showAction = true, 
}) => {
  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table w-full">
        <thead>
          <tr className="bg-red-200">
            <th>SL</th>
            <th>Recipient Name</th>
            <th>Recipient Location</th>
            <th>Date</th>
            <th>Time</th>
            <th>Blood</th>
            <th>Status</th>
            <th>Donor Info</th>
            {showAction && <th>Action</th>}
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {requests.map((request, index) => (
            <tr key={request._id}>
              <th>
                {(currentPage - 1) * itemsPerPage + index + 1}
              </th>

              <td>{request.Recipient_Name}</td>
              <td>{request.full_address}</td>
              <td>{request.date}</td>
              <td>{request.time}</td>
              <td>{request.blood}</td>
              <td>{request.donation_status}</td>

              {/* Donor Info */}
              <td>
                {request.donation_status === "inprogress" ? (
                  <>
                    <p>{request.req_name}</p>
                    <p>{request.req_email}</p>
                  </>
                ) : (
                  "-"
                )}
              </td>

              {/* Action */}
              {showAction && (
                <td className="flex gap-2">
                  {request.donation_status === "pending" && (
                    <>
                      <Link
                        to={`/dashboard/edit-request/${request._id}`}
                      >
                        <SquarePen className="text-blue-600" />
                      </Link>

                      <button
                        onClick={() => onDelete(request._id)}
                      >
                        <Trash2 className="text-red-600" />
                      </button>
                    </>
                  )}

                  {request.donation_status === "inprogress" && (
                    <>
                      <button
                        onClick={() =>
                          onStatusUpdate(request._id, "done")
                        }
                      >
                        <CheckCircle className="text-green-600" />
                      </button>

                      <button
                        onClick={() =>
                          onStatusUpdate(request._id, "canceled")
                        }
                      >
                        <XCircle className="text-orange-600" />
                      </button>
                    </>
                  )}
                </td>
              )}

              {/* View */}
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
  );
};

export default DonationRequestTable;
