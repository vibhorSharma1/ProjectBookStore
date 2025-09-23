import { useState } from "react";
import { motion } from "framer-motion";
import axios from 'axios'
import PopUp from "./PopUp";

export default function BookForm() {
  const [isSuccess, setIsSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    booktitle: "",
    authorName: "",
    shortDiscription: "",
    longDiscription: "",
    language: "Hindi",
    binding: "PaperBinding",
    publisher: "",
    quantity: 0,
    originalPrice: "",
    genre: "Science",
    isBn: "",
    edition: "",
    isUsed: false,
    isNew: true,
    pages: "",
    publishYear: "",
    width: "",
    height: "",
    weight: "",
    imageUrl: null,
    status: "Available",
    isReplaceable: true,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return; // agar already loading hai to dobara submit na ho
    doAddBook();
  };
  const handleChange= (e) => {
  const { name, type, value, checked, files } = e.target;

  setFormData((prev) => ({
    ...prev,
    [name]:
      type === "checkbox"
        ? checked
        : type === "file"
        ? files[0]
        : value,
  }));
};

  function doAddBook() {
    setIsLoading(true); // start loading
    let data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    axios({
      url: 'http://localhost:3000/book/addBook',
      method: 'post',
      data: data,
      headers: { 'content-type': 'multipart/form-data' }
    })
      .then((result) => {
        console.log(result);
        setIsSuccess(result.data.success);
      })
      .catch((error) => {
        console.log(error);
        setIsSuccess(false);
      })
      .finally(() => {
        setIsLoading(false); // request complete hone ke baad
      });
  }


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-300 via-sky-200 to-purple-300 p-6">
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl p-10 w-full max-w-5xl"
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
          📚 Add a New Book
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="booktitle"
            placeholder="Book Title"
            value={formData.booktitle}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            value={formData.authorName}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <textarea
            name="shortDiscription"
            placeholder="Short Description"
            value={formData.shortDiscription}
            onChange={handleChange}
            className="md:col-span-2 border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <textarea
            name="longDiscription"
            placeholder="Long Description"
            value={formData.longDiscription}
            onChange={handleChange}
            className="md:col-span-2 border border-gray-300 rounded-xl p-3 w-full h-28 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          >
            <option>Hindi</option>
            <option>English</option>
            <option>Punjabi</option>
          </select>

          <select
            name="binding"
            value={formData.binding}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          >
            <option>PaperBinding</option>
            <option>HardCover</option>
            <option>SpiralBinding</option>
          </select>

          <input
            type="text"
            name="publisher"
            placeholder="Publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={formData.originalPrice}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
            required
          />

          <select
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          >
            <option>Science</option>
            <option>Fiction</option>
            <option>Motivational</option>
            <option>Fantasy</option>
            <option>Biography</option>
            <option>Comic</option>
            <option>Horror</option>
          </select>

          <input
            type="text"
            name="isBn"
            placeholder="ISBN"
            value={formData.isBn}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="text"
            name="edition"
            placeholder="Edition"
            value={formData.edition}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
            required
          />

          <div className="flex gap-6">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isUsed"
                checked={formData.isUsed}
                onChange={handleChange}
                className="accent-purple-500"
              />
              Used
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isNew"
                checked={formData.isNew}
                onChange={handleChange}
                className="accent-purple-500"
              />
              New
            </label>
          </div>

          <input
            type="number"
            name="pages"
            placeholder="Pages"
            value={formData.pages}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            name="publishYear"
            placeholder="Publish Year"
            value={formData.publishYear}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            name="width"
            placeholder="Width"
            value={formData.width}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            name="height"
            placeholder="Height"
            value={formData.height}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            name="weight"
            placeholder="Weight"
            value={formData.weight}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          />

          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Book Image
            </label>

            {/* Custom file input */}
            <label className="flex items-center justify-center w-full px-4 py-3 bg-white border-2 border-dashed border-purple-400 rounded-xl cursor-pointer hover:bg-purple-50 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-purple-500 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1M12 12v9m0 0l-3-3m3 3l3-3M12 3v9"
                />
              </svg>
              <span className="text-purple-600 font-semibold">
                {formData.imageUrl ? "Change Image" : "Choose Image"}
              </span>
              <input
                type="file"
                name="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    imageUrl: e.target.files[0],
                  })
                }
                className="hidden"
              />
            </label>

            {/* Image preview with remove button */}
            {formData.imageUrl && (
              <div className="mt-4 relative inline-block">
                <img
                  src={URL.createObjectURL(formData.imageUrl)}
                  alt="Preview"
                  className="h-32 w-auto rounded-lg shadow-md border"
                />
                <button
                  type="button"
                  onClick={() =>
                    setFormData({
                      ...formData,
                      imageUrl: null,
                    })
                  }
                  className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow"
                >
                  ✕ Remove
                </button>
              </div>
            )}
          </div>



          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          >
            <option>Available</option>
            <option>Out of Stock</option>
            <option>Discontinued</option>
          </select>

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isReplaceable"
              checked={formData.isReplaceable}
              onChange={handleChange}
              className="accent-purple-500"
            />
            Replaceable
          </label>
        </div>

        <div className="mt-8 flex gap-4">
          {/* Submit Button */}
          
          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={!isLoading ? { scale: 1.05 } : {}}
            whileTap={!isLoading ? { scale: 0.95 } : {}}
            className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl shadow-md 
    ${isLoading
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-gradient-to-r from-teal-500 to-purple-500 text-white"}`}
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
                <span>Submitting...</span>
              </>
            ) : (
              "Submit"
            )}
          </motion.button>



          {/* Cancel / Back Button */}
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.history.back()} // ya useNavigate() agar React Router use kar rahe ho
            className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl shadow-md hover:bg-gray-300 transition"
          >
            Cancel
          </motion.button>
        </div>

      </motion.form>
      {isSuccess !== null && (
        <PopUp
          status={isSuccess}
          mgs={isSuccess ? "Book added successfully 🎉" : "Something went wrong 😢"}
          onClose={() => setIsSuccess(null)} // close karega
        />
      )}

    </div>
  );
}
