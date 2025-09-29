import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PopUp from "../Components/PopUp";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function MobileList() {
  const [Mobiles, setMobiles] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  let navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;

  function handleDelete(id) {
    console.log("Deleting mobile:", id);
    axios({
      url: `${apiURL}/mobile/deleteMobile`,
      method: "delete",
      data: { id: id },
    })
      .then((result) => {
        if (result.data.success) {
          console.log(result.data.message);
          setIsSuccess(result.data.success);
          axios.get(`${apiURL}/mobile/mobiles`).then((res) =>
            setMobiles(res.data.data)
          );
        }
      })
      .catch((err) => {
        console.error(err);
        setIsSuccess(false);
      });
  }

  function handleAddMobile() {
    console.log("Redirect to Add Mobile form...");
    navigate("/addMobile");
  }

  function handleEdit(id) {
    navigate(`/editMobile/${id}`);
  }

  function onClose() {
    setIsSuccess(null);
  }

  useEffect(() => {
    axios({
      url: `${apiURL}/mobile/mobiles`,
      method: "get",
    })
      .then((result) => {
        if (result.data.success) {
          setMobiles(result.data.data);
          console.log(result.data.data);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  return (
    <>
      <div className="min-h-screen w-full bg-gradient-to-br from-teal-300 via-sky-200 to-purple-300 flex flex-col justify-center items-center p-8">
        <div className="w-11/12 md:w-3/4 bg-white/20 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/30 overflow-hidden ">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl ml-2 font-bold text-center text-purple-900 py-6">
              📱 Mobile List
            </h1>
            <button
              onClick={handleAddMobile}
              className="px-3 py-2 mr-7.5 rounded-xl bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold shadow-lg hover:scale-105 transition-transform"
            >
              ➕ Add Mobile
            </button>
          </div>

          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300 text-white text-lg">
                <th className="p-4 text-left">Mobile Image</th>
                <th className="p-4 text-left">Brand</th>
                <th className="p-4 text-left">Model</th>
                <th className="p-4 text-left">OS</th>
                <th className="p-4 text-left">Price</th>
                <th className="p-4 text-center">Action</th>
              </tr>
            </thead>

            <tbody>
              {Mobiles.length > 0 ? (
                Mobiles.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`transition-all duration-300 ${
                      index % 2 === 0 ? "bg-white/40" : "bg-white/20"
                    } hover:bg-purple-100`}
                  >
                    <td className="p-4">
                      <img
                        src={item.image}
                        className="w-12 h-12 rounded-lg shadow-md object-cover border border-purple-200"
                        alt={item.model}
                      />
                    </td>
                    <td className="p-4 font-semibold text-purple-900">
                      {item.brand}
                    </td>
                    <td className="p-4 text-purple-800">{item.model}</td>
                    <td className="p-4 text-purple-700">{item.OS}</td>
                    <td className="p-4 font-bold text-green-600">
                      ₹{item.price}
                    </td>
                    <td className="p-4 text-center">
                      <button
                        onClick={() => handleDelete(item._id)}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-700 text-white font-medium shadow-md hover:scale-105 transform transition"
                      >
                        <TrashIcon className="h-5 w-5" />
                      </button>
                      <button
                        onClick={() => handleEdit(item._id)}
                        className="px-4 py-2 ml-3 rounded-xl bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium shadow-md hover:scale-105 transform transition"
                      >
                        <PencilIcon className="h-5 w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-purple-800 font-medium"
                  >
                    No mobiles found 😶
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {isSuccess !== null && (
        <PopUp
          status={isSuccess}
          mgs={
            isSuccess
              ? "Mobile Deleted successfully 🎉"
              : "Something went wrong 😢"
          }
          onClose={() => onClose()}
        />
      )}
    </>
  );
}

export default MobileList;
