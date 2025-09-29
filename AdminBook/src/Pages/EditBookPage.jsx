import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../Components/PopUp";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function EditBookPage() {
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

  const [isSuccess, setIsSuccess] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // data load state
  const [isSubmitting, setIsSubmitting] = useState(false); // submit state

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiURL}/book/getBook/${id}`)
      .then((res) => {
        const data = res.data.data;
        setFormData({
          booktitle: data.booktitle || "",
          authorName: data.authorName || "",
          shortDiscription: data.shortDiscription || "",
          longDiscription: data.longDiscription || "",
          language: data.language || "Hindi",
          binding: data.binding || "PaperBinding",
          publisher: data.publisher || "",
          quantity: data.quantity ?? 0,
          originalPrice: data.originalPrice ?? "",
          genre: data.genre || "Science",
          isBn: data.isBn || "",
          edition: data.edition || "",
          isUsed: !!data.isUsed,
          isNew: !!data.isNew,
          pages: data.pages ?? "",
          publishYear: data.publishYear ?? "",
          width: data.width ?? "",
          height: data.height ?? "",
          weight: data.weight ?? "",
          imageUrl: data.imageUrl || null,
          status: data.status || "Available",
          isReplaceable: !!data.isReplaceable,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFetching(false));
  }, [id]);

  function onClose() {
    navigate("/bookList");
  }

  const handleChange = (e) => {
    const { name, type, value, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "file" ? files[0] : value,
    }));
  };

  const editBook = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        // IMAGE optimization: upload only if changed
        if (key === "imageUrl" && !(formData.imageUrl instanceof File)) {
          return;
        }
        data.append(key, formData[key]);
      }
    });

    axios
      .post(`${apiURL}/book/editBook/${id}`, data, {
        headers: { "content-type": "multipart/form-data" },
      })
      .then((res) => setIsSuccess(res.data.success))
      .catch(() => setIsSuccess(false))
      .finally(() => setIsSubmitting(false));
  };

  if (isFetching) return <h2 className="text-center mt-10">Loading...</h2>;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-300 via-sky-200 to-purple-300 p-6">
      <motion.form
        onSubmit={editBook}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl p-10 w-full max-w-5xl"
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
          📚 Edit Book
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="booktitle"
            placeholder="Book Title"
            value={formData.booktitle || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="text"
            name="authorName"
            placeholder="Author Name"
            value={formData.authorName || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <textarea
            name="shortDiscription"
            placeholder="Short Description"
            value={formData.shortDiscription || ""}
            onChange={handleChange}
            className="md:col-span-2 border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <textarea
            name="longDiscription"
            placeholder="Long Description"
            value={formData.longDiscription || ""}
            onChange={handleChange}
            className="md:col-span-2 border border-gray-300 rounded-xl p-3 w-full h-28 focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <select
            name="language"
            value={formData.language || "Hindi"}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          >
            <option>Hindi</option>
            <option>English</option>
            <option>Punjabi</option>
          </select>

          <select
            name="binding"
            value={formData.binding || "PaperBinding"}
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
            value={formData.publisher || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
            required
          />

          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            value={formData.quantity ?? 0}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
          />

          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={formData.originalPrice ?? ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
            required
          />

          {/* IMAGE UPLOAD */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">Upload Book Image</label>
            <label className="flex items-center justify-center w-full px-4 py-3 bg-white border-2 border-dashed border-purple-400 rounded-xl cursor-pointer hover:bg-purple-50 transition">
              <span className="text-purple-600 font-semibold">
                {formData.imageUrl ? "Change Image" : "Choose Image"}
              </span>
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            {formData.imageUrl && (
              <div className="mt-4 relative inline-block">
                <img
                  src={
                    formData.imageUrl instanceof File
                      ? URL.createObjectURL(formData.imageUrl)
                      : formData.imageUrl
                  }
                  alt="Preview"
                  className="h-32 w-auto rounded-lg shadow-md border"
                />
              </div>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex gap-4">
      {/* Edit Button */}
      <motion.button
        type="submit"
        disabled={isSubmitting}
        whileHover={!isSubmitting ? { scale: 1.05 } : {}}
        whileTap={!isSubmitting ? { scale: 0.95 } : {}}
        className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl shadow-md ${
          isSubmitting
            ? "bg-gray-400 cursor-not-allowed text-white"
            : "bg-gradient-to-r from-blue-500 to-blue-700 text-white hover:opacity-90"
        }`}
      >
        <PencilSquareIcon className="w-5 h-5" />
        {isSubmitting ? "Editing..." : "Edit"}
      </motion.button>

      {/* Cancel Button */}
      <motion.button
        type="button"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate("/mobileList")}
        className="flex-1 flex items-center justify-center gap-2 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl shadow-md hover:bg-gray-300 transition"
      >
        <XMarkIcon className="w-5 h-5" />
        Cancel
      </motion.button>
    </div>
      </motion.form>

      {/* PopUp */}
      {isSuccess !== null && (
        <PopUp
          status={isSuccess}
          mgs={isSuccess ? "Book Edited successfully 🎉" : "Something went wrong 😢"}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default EditBookPage;
