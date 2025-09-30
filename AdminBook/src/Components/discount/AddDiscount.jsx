import React, { useEffect, useState } from "react";
import Select from "react-select";
import axios from "axios";

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

  const apiUrl = import.meta.env.VITE_API_URL;

  // First load → fetch all book names
  useEffect(() => {
    axios
      .get(`${apiUrl}/book/getBookNames`)
      .then((result) => {
        const formatted = result.data.data.map((book) => ({
          value: book._id, // unique id
          label: book.booktitle, // jo text dikhana hai
        }));
        setOptions(formatted);
      })
      .catch((err) => {
        console.log("Error aa gya re", err);
      });
  }, []);

  // Search input ke sath API call
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
        .catch((err) => {
          console.log("Error aa gya re", err);
        });
    }
  }

  function handleChange(selected) {
    setSelectedOption(selected);
    console.log("Selected book:", selected?.value);
  }

  // Form input handle
  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedOption) {
      alert("Please select a book first!");
      return;
    }
    const payload = { book: selectedOption.value, ...formData };
    console.log("Payload:", payload);
    try {
      await axios.post(`${apiUrl}/discount/getDiscount`, payload);
      alert("✅ Discount Added Successfully!");
    } catch (err) {
      console.log("Error submitting:", err);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gradient-to-br from-teal-300 via-sky-200 to-purple-300 p-8">
      <div className="w-full h-full md:w-1/2 lg:w-1/3 bg-white/30 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/40 p-6">
        <h1 className="text-2xl font-bold text-purple-900 mb-6 text-center">
          🎯 Add Discount
        </h1>

        {/* Book Select */}
        <Select
          options={options}
          value={selectedOption}
          onChange={handleChange}
          placeholder="🔍 Search or Select a Book..."
          isSearchable={true}
          onInputChange={handleInputChange}
          className="text-purple-900 mb-6"
        />

        {/* Discount Form → Only if book is selected */}
        {selectedOption && (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Discount Name */}
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

            {/* Discount Type */}
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

            {/* Discount Value */}
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

            {/* Valid From / To */}
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

            {/* Status */}
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

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-purple-600 text-white font-semibold py-2 rounded-xl hover:bg-purple-700 transition"
            >
              Add Discount
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default AddDiscount;
