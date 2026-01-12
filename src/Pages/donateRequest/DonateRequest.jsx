import React, { useEffect, useState } from "react";
import RequestCardDesign from "../../Components/RequestCardDesign";
import useAxios from "../../Hooks/UseAxios";
import { FaSearch, FaFilter, FaSortAmountDown } from "react-icons/fa";

const DonateRequest = () => {
  const axiosInstance = useAxios();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [bloodFilter, setBloodFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");
  const [sortBy, setSortBy] = useState("newest"); // newest | oldest

  // Extract unique districts for dropdown
  const uniqueDistricts = [
    ...new Set(requests.map((item) => item.req_district).filter(Boolean)),
  ].sort();

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await axiosInstance.get("/pending-requests?status=pending");
        setRequests(res.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [axiosInstance]);

  // Derived Filtered Data
  const filteredRequests = requests
    .filter((req) => {
      // Search Logic (Recipient, Location)
      const matchesSearch =
        searchTerm === "" ||
        req.Recipient_Name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.req_district?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        req.req_upazila?.toLowerCase().includes(searchTerm.toLowerCase());

      // Blood Filter
      const matchesBlood = bloodFilter === "" || req.blood === bloodFilter;

      // District Filter
      const matchesDistrict =
        districtFilter === "" || req.req_district === districtFilter;

      return matchesSearch && matchesBlood && matchesDistrict;
    })
    .sort((a, b) => {
      // Sort Logic
      const dateA = new Date(`${a.date} ${a.time}`);
      const dateB = new Date(`${b.date} ${b.time}`);

      return sortBy === "newest" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="w-11/12 max-w-7xl mx-auto py-10">
      {/* Header Section */}
      <div className="text-center space-y-3 mb-12">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
          Pending <span className="text-red-600">Donation Requests</span>
        </h2>
        <p className="text-gray-500 max-w-2xl mx-auto">
          “Be the hope for someone in need. Every second counts, every drop matters.”
        </p>
      </div>

      {/* Controls Section */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or location..."
              className="input input-bordered w-full pl-10 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Blood Group Filter */}
          <select
            className="select select-bordered w-full focus:border-red-500 focus:ring-1 focus:ring-red-500"
            value={bloodFilter}
            onChange={(e) => setBloodFilter(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>

          {/* District Filter */}
          <select
            className="select select-bordered w-full focus:border-red-500 focus:ring-1 focus:ring-red-500"
            value={districtFilter}
            onChange={(e) => setDistrictFilter(e.target.value)}
          >
            <option value="">All Districts</option>
            {uniqueDistricts.map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </select>

          {/* Sort */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSortAmountDown className="text-gray-400" />
            </div>
            <select
              className="select select-bordered w-full pl-10 focus:border-red-500 focus:ring-1 focus:ring-red-500"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, index) => (
            <div
              key={index}
              className="card bg-white border border-gray-100 shadow-sm p-5 space-y-3 animate-pulse rounded-2xl"
            >
              {/* Recipient Name Skeleton */}
              <div className="h-6 bg-gray-200 rounded w-3/4 mb-2"></div>

              {/* Location Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>

              {/* Badge Skeleton */}
              <div className="h-8 w-24 bg-gray-200 rounded-full my-2"></div>

              {/* Date/Time Skeleton */}
              <div className="flex items-center gap-2">
                <div className="h-4 w-4 bg-gray-200 rounded-full"></div>
                <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              </div>

              {/* Button Skeleton */}
              <div className="flex justify-end pt-2">
                <div className="h-9 w-28 bg-gray-200 rounded-lg"></div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Grid Section */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRequests.length > 0 ? (
            filteredRequests.map((request) => (
              <RequestCardDesign key={request._id} data={request} />
            ))
          ) : (
            <div className="col-span-full py-16 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
              <div className="max-w-md mx-auto space-y-4">
                <div className="text-6xl">🔍</div>
                <h3 className="text-xl font-bold text-gray-700">No Requests Found</h3>
                <p className="text-gray-500">
                  We couldn't find any donation requests matching your filters. Try adjusting your search or filters.
                </p>
                <button 
                    onClick={() => {
                        setSearchTerm("");
                        setBloodFilter("");
                        setDistrictFilter("");
                    }}
                    className="btn btn-outline btn-sm border-red-500 text-red-600 hover:bg-red-500 hover:text-white hover:border-red-500"
                >
                    Clear All Filters
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DonateRequest;
