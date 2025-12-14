import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import useAxios from "../../Hooks/UseAxios";
import { AuthContext } from "../../Provider/AuthProvider";

const ManageProduct = () => {
  const [products, setProducts] = useState([]);
  const axiosInstance = useAxios();
  const { user } = useContext(AuthContext);
  useEffect(() => {
    axiosInstance
      .get(`/manager/products/${user?.email}`)
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [axiosInstance, user?.email]);
  console.log(products);

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Job</th>
              <th>Favorite Color</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {products?.map((product) => (
              <tr key={product._id}>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={product?.image}
                          alt="Avatar Tailwind CSS Component"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{product?.productName}</div>
                      <div className="text-sm opacity-50">
                        {product?.category}
                      </div>
                    </div>
                  </div>
                </td>
                <td>{product?.description}</td>
                <td>{product?.price}</td>
                <th>
                  <button className="btn btn-error btn-xs mr-3">Delete</button>
                  <button className="btn btn-primary btn-xs">Edit</button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageProduct;
