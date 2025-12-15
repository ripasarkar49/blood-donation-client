import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyDonateRequest = () => {
  const [myRequest, setMyRequest] = useState([]);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    axiosSecure.get("/my-donation-requests").then((res) => {
      console.log(res.data);
    });
  }, [axiosSecure]);
  return <div>my-donation-requests</div>;
};

export default MyDonateRequest;
