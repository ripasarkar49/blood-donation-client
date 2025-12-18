import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const AllUsers = () => {
  const axiosSecure = useAxiosSecure();
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("All");

  const fetchUsers = async () => {
    try {
      const statusQuery = filter === "All" ? "all" : filter.toLowerCase(); // convert to backend expected format
      const res = await axiosSecure.get(`/users?status=${statusQuery}`);
      setUsers(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [axiosSecure, filter]);

  const handleStatusChange = async (email, status) => {
    try {
      await axiosSecure.patch(
        `/update/user/status?email=${email}&status=${status}`
      );
      fetchUsers();
    } catch (err) {
      console.error(err);
    }
  };

  // Filter users based on the select dropdown
  const filteredUsers = users.filter((user) => {
    if (filter === "All") return true;
    if (filter === "Active") return user.status === "active";
    if (filter === "Blocked") return user.status === "Blocked";
    return true;
  });

  return (
    <div>
      <div className="p-6 bg-white rounded-lg shadow">
        <h2 className="text-2xl font-bold mb-4">All Users</h2>

        {/* Filter */}
        <div className="mb-4 flex justify-between items-center">
          <select
            className="select select-bordered max-w-xs"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Blocked">Blocked</option>
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
              {filteredUsers.map((user) => (
                <tr key={user._id}>
                  <td>
                    <img
                      src={user.mainPhotoUrl}
                      className="w-10 h-10 rounded-full"
                    />
                  </td>
                  <td className="font-medium">{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td>
                    <span className="btn btn-ghost">{user.status}</span>
                  </td>
                  <th>
                    {user.status === "active" ? (
                      <button
                        onClick={() =>
                          handleStatusChange(user.email, "Blocked")
                        }
                        className="btn btn-ghost btn-xs"
                      >
                        Block
                      </button>
                    ) : (
                      <button
                        onClick={() => handleStatusChange(user.email, "active")}
                        className="btn btn-ghost btn-xs"
                      >
                        Activate
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
