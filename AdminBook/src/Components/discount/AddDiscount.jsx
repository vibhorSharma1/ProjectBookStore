import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import PopUp from "../PopUp";

function AddDiscount() {
  let [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [formData, setFormData] = useState({
    discountName: "",
    discountType: "fixed",
    discountValue: null,
    validFrom: "",
    validTo: "",
    status: "Active",
  });
  const [popup, setPopup] = useState({ show: false, status: null, msg: "" });

  const navigate = useNavigate();
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/book/getBookNames`)
      .then((result) => {
        const formatted = result.data.data.map((book) => ({
          value: book._id,
          label: book.booktitle,
        }));
        setOptions(formatted);
      })
      .catch((err) => console.log(err));
  }, []);

  function handleInputChange(input) {
    if (input.length > 0) {
      axios
        .get(`${apiUrl}/book/getBookNames/${input}`)
        .then((result) => {
          const formatted = result.data.data.map((book) => ({
            value: book._id,
            label: book.booktitle,
          }));
          setOptions(formatted);
        })
        .catch((err) => console.log(err));
    }
  }

  function handleChange(selected) {
    setSelectedOption(selected);
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert("Please select a book first!");
      return;
    }

    const payload = { book: selectedOption.value, ...formData };

    try {
      await axios.post(`${apiUrl}/discount/addDiscount`, payload);
      setPopup({
        show: true,
        status: true,
        msg: "Discount Added Successfully! 🎉",
      });
    } catch (err) {
      console.log(err);
      setPopup({
        show: true,
        status: false,
        msg: "Failed to Add Discount 😢",
      });
    }
  };

  const closePopup = () => {
    setPopup({ show: false, status: null, msg: "" });
    if (popup.status) navigate("/discounts"); // redirect on success
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-teal-300 via-sky-200 to-purple-300 p-8">
      <div className="w-full h-full md:w-1/2 lg:w-1/3 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-6">
        <h1 className="text-2xl font-bold text-purple-900 mb-6 text-center">
          🎯 Add Discount
        </h1>

        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="🔍 Search or Select a Book..."
          isSearchable={true}
          onInputChange={handleInputChange}
          className="text-purple-900 mb-6"
        />

        {selectedOption && (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-purple-800 font-semibold mb-1">
                Discount Name
              </label>
              <input
                type="text"
                name="discountName"
                value={formData.discountName}
                onChange={handleFormChange}
                className="w-full p-2 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Enter discount name"
                required
              />
            </div>

            <div>
              <label className="block text-purple-800 font-semibold mb-1">
                Discount Type
              </label>
              <select
                name="discountType"
                value={formData.discountType}
                onChange={handleFormChange}
                className="w-full p-2 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="fixed">Fixed</option>
                <option value="Percentage">Percentage</option>
              </select>
            </div>

            <div>
              <label className="block text-purple-800 font-semibold mb-1">
                Discount Value
              </label>
              <input
                type="number"
                name="discountValue"
                value={formData.discountValue}
                onChange={handleFormChange}
                className="w-full p-2 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                placeholder="Enter value"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-purple-800 font-semibold mb-1">
                  Valid From
                </label>
                <input
                  type="date"
                  name="validFrom"
                  value={formData.validFrom}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
              <div>
                <label className="block text-purple-800 font-semibold mb-1">
                  Valid To
                </label>
                <input
                  type="date"
                  name="validTo"
                  value={formData.validTo}
                  onChange={handleFormChange}
                  className="w-full p-2 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-purple-800 font-semibold mb-1">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleFormChange}
                className="w-full p-2 border border-purple-400 rounded-lg focus:ring-2 focus:ring-purple-500 outline-none"
              >
                <option value="Active">Active</option>
                <option value="InActive">InActive</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Add Discount
            </button>
          </form>
        )}

        {popup.show && (
          <PopUp status={popup.status} msg={popup.msg} onClose={closePopup} />
        )}
      </div>
    </div>
  );
}

export default AddDiscount;
