import React, { useContext } from "react";
import useAxios from "../../Hooks/UseAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const Funding = () => {
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  const handleCheckOut = (e) => {
    e.preventDefault();
    const donateAmount = e.target.donateAmount.value;
    const donorEmail = user?.email;
    const donorName = user?.displayName;
    const formData = {
      donateAmount,
      donorEmail,
      donorName,
    };
    axiosInstance.post("/create-payment-checkout", formData).then((res) => {
      console.log(res.data);
      window.location.href = res.data.url;
    });
  };
  return (
    <div>
      <form
        onSubmit={handleCheckOut}
        action=""
        className="flex justify-center items-center min-h-screen gap-3"
      >
        <input
          type="text"
          name="donateAmount"
          placeholder="Type here"
          className="input"
        />
        <button className="btn btn-primary" type="submit">
          Donate
        </button>
      </form>
    </div>
  );
};

export default Funding;
