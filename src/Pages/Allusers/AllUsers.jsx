import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { AuthContext } from "../../Provider/AuthProvider";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);

  const fetchUsers = () => {
    axiosSecure.get("/users").then((res) => {
      setUsers(res.data);
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure]);
  //   console.log(users);
  const handleStatusChange = (email, status) => {
    axiosSecure
      .patch(`/update/user/status?email=${email}&status=${status}`)
      .then((res) => {
        // console.log(res.data);
        fetchUsers();
      });
  };

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>

        {/* Filter */}
        <div className="mb-4 flex justify-between items-center">
          <select className="select select-bordered max-w-xs">
            <option>All</option>
            <option>Active</option>
            <option>Blocked</option>
          </select>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th>Avatar</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Status</th>
                <th className="text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {/* Row 1 */}
              {users?.map((user) => (
                <tr key={user?._id}>
                  <td>
                    <img
                      src={user?.mainPhotoUrl}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="font-medium">{user?.name}</td>
                  <td>{user?.email}</td>
                  <td className="capitalize">{user?.role}</td>
                  <td>
                    <span className="btn btn-ghost">{user?.status}</span>
                  </td>
                  <th>
                    {user?.status == "active" ? (
                      <button
                        onClick={() =>
                          handleStatusChange(user?.email, "Blocked")
                        }
                        className="btn btn-ghost btn-xs"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() =>
                          handleStatusChange(user?.email, "active")
                        }
                        className="btn btn-ghost btn-xs"
                      >
                        Active
                      </button>
                    )}
                  </th>
                 
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AllUsers;
