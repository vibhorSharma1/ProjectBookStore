import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../PopUp";

function DiscountList() {
  const [discounts, setDiscounts] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  const goToAddDiscount = () => {
    navigate("/addDiscount");
  };
  function calculateDaysLeft(validTo) {
    const today = new Date();
    const expiryDate = new Date(validTo);
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  }

  const handleDelete = (id) => {
    axios({
      url: `${import.meta.env.VITE_API_URL}/discount/deleteDiscount`,
      method: "delete",
      data: { id },
    })
      .then((res) => {
        if (res.data.success) {
          setIsSuccess(true);
          setDiscounts(discounts.filter((d) => d._id !== id));
        }
      })
      .catch((err) => {
        console.error(err);
        setIsSuccess(false);
      });
  };

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/discount/getAllDiscounts`)
      .then((res) => {
        if (res.data.success) setDiscounts(res.data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-teal-300 via-sky-200 to-purple-300 flex flex-col justify-center items-center p-8">
      <div className="w-11/12 md:w-4/5 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden">
        <div className="flex justify-between items-center p-6">
          <h1 className="text-3xl font-bold text-purple-900">💸 Discount List</h1>
          <button
            onClick={goToAddDiscount}
            className="px-3 py-2 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
          >
            ➕ Add Discount
          </button>
        </div>

        <table className="w-full table-auto border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 text-white text-lg">
              <th className="p-4 text-left">Discount Name</th>
              <th className="p-4 text-left">Applied On</th>
              <th className="p-4 text-left">Author Name</th>
              <th className="p-4 text-left">Original Price</th>
              <th className="p-4 text-left">Type</th>
              <th className="p-4 text-left">Discount Value</th>
              <th className="p-4 text-left">Final Price</th>
               <th className="p-3">Days Left</th>
              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {discounts.length > 0 ? (
              discounts.map((item, index) => {
                const finalPrice =
                  item.discountType === "fixed"
                    ? item.originalPrice - item.discountValue
                    : item.originalPrice - (item.originalPrice * item.discountValue) / 100;

                return (
                  <tr
                    key={item._id}
                    className={`${
                      index % 2 === 0 ? "bg-white/40" : "bg-white/20"
                    } hover:bg-purple-100 transition-all`}
                  >
                    <td className="p-4 font-semibold text-purple-900">{item.discountName}</td>
                    <td className="p-4 text-purple-800">{item.book.booktitle}</td>
                    <td className="p-4 text-purple-800">{item.book.authorName}</td>
                    <td className="p-4 font-bold text-green-600">₹{item.book.originalPrice}</td>
                    <td className="p-4 text-purple-700">{item.discountType}</td>
                    <td className="p-4 text-purple-700">
                      {item.discountType === "percentage"
                        ? item.discountValue + "%"
                        : "₹" + item.discountValue}
                    </td>
                    <td className="p-4 font-bold text-green-700">₹{item.finalPrice}</td>
                    <td className="p-3">{calculateDaysLeft(item.validTo)} days</td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-medium shadow-md hover:scale-105 transform transition"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-6 text-purple-800 font-medium">
                  No discounts found 😶
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {isSuccess !== null && (
        <PopUp
          status={isSuccess}
          mgs={isSuccess ? "Discount deleted successfully 🎉" : "Something went wrong 😢"}
        />
      )}
    </div>
  );
}

export default DiscountList;
