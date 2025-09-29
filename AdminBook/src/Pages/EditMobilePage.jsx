import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PopUp from "../Components/PopUp";
import { motion } from "framer-motion";
import { PencilIcon, TrashIcon } from "@heroicons/react/24/solid";

function EditMobilePage() {
  const [formData, setFormData] = useState({
    brand: "",
    model: "",
    sku: 0,
    releaseDate: "",
    OS: "",
    OsVersion: 0,
    chipSet: "",
    CPU: "",
    GPU: "",
    RAM: 0,
    ROM: 0,
    display: "",
    chargingType: "Wired",
    camera: "",
    connectivity: [],
    sensors: [],
    color: "",
    weight: 0,
    height: 0,
    width: 0,
    price: 0,
    isAvailable: true,
    warrentyMonths: 0,
    image: null,
    isReplaceable: true,
  });

  const [isSuccess, setIsSuccess] = useState(null);
  const [isFetching, setIsFetching] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();
  const apiURL = import.meta.env.VITE_API_URL;
  const { id } = useParams();

  useEffect(() => {
    axios
      .get(`${apiURL}/mobile/getMobile/${id}`)
      .then((res) => {
        const data = res.data.data;
        setFormData({
          brand: data.brand || "",
          model: data.model || "",
          sku: data.sku || 0,
          releaseDate: data.releaseDate || "",
          OS: data.OS || "",
          OsVersion: data.OsVersion || 0,
          chipSet: data.chipSet || "",
          CPU: data.CPU || "",
          GPU: data.GPU || "",
          RAM: data.RAM || 0,
          ROM: data.ROM || 0,
          display: data.display || "",
          chargingType: data.chargingType || "Wired",
          camera: data.camera || "",
          connectivity: data.connectivity || [],
          sensors: data.sensors || [],
          color: data.color || "",
          weight: data.weight || 0,
          height: data.height || 0,
          width: data.width || 0,
          price: data.price || 0,
          isAvailable: !!data.isAvailable,
          warrentyMonths: data.warrentyMonths || 0,
          image: data.image || null,
          isReplaceable: !!data.isReplaceable,
        });
      })
      .catch((err) => console.log(err))
      .finally(() => setIsFetching(false));
  }, [id]);

  function onClose() {
    navigate("/mobileList");
  }

  const handleChange = (e) => {
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

  const editMobile = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    let data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        if (key === "image" && !(formData.image instanceof File)) return;
        data.append(key, formData[key]);
      }
    });

    axios
      .post(`${apiURL}/mobile/editMobile/${id}`, data, {
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
        onSubmit={editMobile}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-xl bg-white/80 shadow-2xl rounded-2xl p-10 w-full max-w-5xl"
      >
        <h2 className="text-3xl font-bold text-center text-purple-600 mb-8">
          📱 Edit Mobile
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="brand"
            placeholder="Brand"
            value={formData.brand || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
            required
          />
          <input
            type="text"
            name="model"
            placeholder="Model"
            value={formData.model || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
            required
          />
          <input
            type="number"
            name="sku"
            placeholder="SKU"
            value={formData.sku}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
          />
          <input
            type="date"
            name="releaseDate"
            value={formData.releaseDate || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
          />
          <input
            type="text"
            name="OS"
            placeholder="Operating System"
            value={formData.OS || ""}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
          />
          <input
            type="number"
            name="OsVersion"
            placeholder="OS Version"
            value={formData.OsVersion}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
          />
          <input
            type="number"
            name="RAM"
            placeholder="RAM (GB)"
            value={formData.RAM}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
          />
          <input
            type="number"
            name="ROM"
            placeholder="ROM (GB)"
            value={formData.ROM}
            onChange={handleChange}
            className="border border-gray-300 rounded-xl p-3 w-full"
          />
          {/* IMAGE UPLOAD */}
          <div className="md:col-span-2">
            <label className="block text-gray-700 font-medium mb-2">
              Upload Mobile Image
            </label>
            <label className="flex items-center justify-center w-full px-4 py-3 bg-white border-2 border-dashed border-purple-400 rounded-xl cursor-pointer hover:bg-purple-50 transition">
              <span className="text-purple-600 font-semibold">
                {formData.image ? "Change Image" : "Choose Image"}
              </span>
              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
              />
            </label>

            {formData.image && (
              <div className="mt-4 relative inline-block">
                <img
                  src={
                    formData.image instanceof File
                      ? URL.createObjectURL(formData.image)
                      : formData.image
                  }
                  alt="Preview"
                  className="h-32 w-auto rounded-lg shadow-md border"
                />
              </div>
            )}
          </div>
        </div>

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

      {isSuccess !== null && (
        <PopUp
          status={isSuccess}
          mgs={isSuccess ? "Mobile Edited successfully 🎉" : "Something went wrong 😢"}
          onClose={onClose}
        />
      )}
    </div>
  );
}

export default EditMobilePage;
