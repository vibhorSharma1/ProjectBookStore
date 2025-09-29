import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import PopUp from "../Components/PopUp";
import { useNavigate } from "react-router-dom";

export default function AddMobile() {
    const [isSuccess, setIsSuccess] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    let navigate = useNavigate();
    const apiURL = import.meta.env.VITE_API_URL;

    const [formData, setFormData] = useState({
        brand: "",
        model: "",
        sku: null,
        description: "",
        releaseDate: "",
        OS: "",
        OsVersion: null,
        chipSet: "",
        CPU: "",
        GPU: "",
        RAM: null,
        ROM: null,
        display: "",
        chargingType: "Wired",
        camera: "",
        connectivity: [],
        sensors: [],
        color: "",
        weight: null,
        height: null,
        width: null,
        price: null,
        isAvailable: true,
        warrentyMonths: null,
        image: "",
        isReplaceable: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoading) return;
        doAddMobile();
    };

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

    function onClose() {
        navigate("/mobileList");
    }

    function doAddMobile() {
        setIsLoading(true);
        let data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        axios({
            url: `${apiURL}/mobile/addMobile`,
            method: "post",
            data: data,
            headers: { "content-type": "multipart/form-data" },
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
                setIsLoading(false);
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
                    📱 Add a New Mobile
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Text Inputs */}
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name="model"
                        placeholder="Model"
                        value={formData.model}
                        onChange={handleChange}
                        required
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        name="sku"
                        placeholder="SKU Number"
                        value={formData.sku}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <div className="flex items-center gap-4">
                        <label htmlFor="releaseDate" className="font-medium text-gray-700">
                            Enter Date:
                        </label>
                        <input
                            type="date"
                            id="releaseDate"
                            name="releaseDate"
                            value={formData.releaseDate}
                            onChange={handleChange}
                            className="border border-gray-300 rounded-xl p-2 w-90 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        />
                    </div>

                    <textarea
                        name="description"
                        placeholder=" Description"
                        value={formData.description}
                        onChange={handleChange}
                        className="md:col-span-2 border border-gray-300 rounded-xl p-3 w-full h-28 focus:outline-none focus:ring-2 focus:ring-purple-400"
                        required
                    />
                    <input
                        type="text"
                        name="OS"
                        placeholder="Operating System"
                        value={formData.OS}

                        
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        name="OsVersion"
                        placeholder="OS Version"
                        value={formData.OsVersion}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name="chipSet"
                        placeholder="Chipset"
                        value={formData.chipSet}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name="CPU"
                        placeholder="CPU"
                        value={formData.CPU}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name="GPU"
                        placeholder="GPU"
                        value={formData.GPU}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    {/* Number Inputs with Placeholders */}
                    <input
                        type="number"
                        name="RAM"
                        placeholder="RAM (GB)"
                        value={formData.RAM}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        name="ROM"
                        placeholder="ROM (GB)"
                        value={formData.ROM}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="text"
                        name="display"
                        placeholder="Display"
                        value={formData.display}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    {/* Charging Type */}
                    <select
                        name="chargingType"
                        value={formData.chargingType}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:ring-2 focus:ring-purple-400"
                    >
                        <option>Wired</option>
                        <option>WireLess</option>
                    </select>

                    <input
                        type="text"
                        name="camera"
                        placeholder="Camera Specs"
                        value={formData.camera}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    {/* Connectivity Checkboxes */}

                    <div className="md:col-span-2 grid grid-cols-2 gap-4">
                        {/* Connectivity */}
                        <div>
                            <label className="block font-semibold mb-2">Connectivity</label>
                            {["WiFi", "Bluetooth", "5G", "NFC", "USB-C"].map((conn) => (
                                <label key={conn} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="connectivity"
                                        value={conn}
                                        checked={formData.connectivity.includes(conn)}
                                        onChange={() => {
                                            const newList = formData.connectivity.includes(conn)
                                                ? formData.connectivity.filter((c) => c !== conn)
                                                : [...formData.connectivity, conn];
                                            setFormData({ ...formData, connectivity: newList });
                                        }}
                                        className="accent-purple-500"
                                    />
                                    {conn}
                                </label>
                            ))}
                        </div>

                        {/* Sensors */}
                        <div>
                            <label className="block font-semibold mb-2">Sensors</label>
                            {["Fingerprint", "Accelerometer", "Gyroscope", "Proximity", "Compass"].map((sensor) => (
                                <label key={sensor} className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        name="sensors"
                                        value={sensor}
                                        checked={formData.sensors.includes(sensor)}
                                        onChange={() => {
                                            const newList = formData.sensors.includes(sensor)
                                                ? formData.sensors.filter((s) => s !== sensor)
                                                : [...formData.sensors, sensor];
                                            setFormData({ ...formData, sensors: newList });
                                        }}
                                        className="accent-purple-500"
                                    />
                                    {sensor}
                                </label>
                            ))}
                        </div>
                    </div>


                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={formData.color}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    {/* Number Inputs */}
                    <input
                        type="number"
                        name="weight"
                        placeholder="Weight (grams)"
                        value={formData.weight}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        name="height"
                        placeholder="Height (mm)"
                        value={formData.height}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        name="width"
                        placeholder="Width (mm)"
                        value={formData.width}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={formData.price}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />
                    <input
                        type="number"
                        name="warrentyMonths"
                        placeholder="Warranty (Months)"
                        value={formData.warrentyMonths}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-xl p-3 w-full focus:outline-none focus:ring-2 focus:ring-purple-400"
                    />

                    {/* Image Upload */}
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
                                name="file"
                                accept="image/*"
                                onChange={(e) =>
                                    setFormData({
                                        ...formData,
                                        image: e.target.files[0],
                                    })
                                }
                                className="hidden"
                            />
                        </label>

                        {formData.image && (
                            <div className="mt-4 relative inline-block">
                                <img
                                    src={URL.createObjectURL(formData.image)}
                                    alt="Preview"
                                    className="h-32 w-auto rounded-lg shadow-md border"
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setFormData({
                                            ...formData,
                                            image: "",
                                        })
                                    }
                                    className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white text-xs px-2 py-1 rounded-md shadow"
                                >
                                    ✕ Remove
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Checkboxes */}
                    <label className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            name="isAvailable"
                            checked={formData.isAvailable}
                            onChange={handleChange}
                            className="accent-purple-500"
                        />
                        Available
                    </label>
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

                {/* Buttons */}
                <div className="mt-8 flex gap-4">
                    <motion.button
                        type="submit"
                        disabled={isLoading}
                        whileHover={!isLoading ? { scale: 1.05 } : {}}
                        whileTap={!isLoading ? { scale: 0.95 } : {}}
                        className={`flex-1 flex items-center justify-center gap-2 font-semibold py-3 rounded-xl shadow-md ${isLoading
                            ? "bg-gray-400 cursor-not-allowed text-white"
                            : "bg-gradient-to-r from-teal-500 to-purple-500 text-white"
                            }`}
                    >
                        {isLoading ? "Submitting..." : "Submit"}
                    </motion.button>

                    <motion.button
                        type="button"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.history.back()}
                        className="flex-1 bg-gray-200 text-gray-700 font-semibold py-3 rounded-xl shadow-md hover:bg-gray-300 transition"
                    >
                        Cancel
                    </motion.button>
                </div>
            </motion.form>

            {isSuccess !== null && (
                <PopUp
                    status={isSuccess}
                    mgs={
                        isSuccess
                            ? "Mobile added successfully 🎉"
                            : "Something went wrong 😢"
                    }
                    onClose={() => onClose()}
                />
            )}
        </div>
    );
}
