import { motion, AnimatePresence } from "framer-motion";

function PopUp({ status, mgs, onClose }) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50"
        onClick={onClose} // backdrop pe click karne se band
      >
        <motion.div
          initial={{ scale: 0.7, opacity: 0, y: 30 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.7, opacity: 0, y: 30 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="bg-white rounded-2xl shadow-2xl px-10 py-8 text-center relative"
          onClick={(e) => e.stopPropagation()} // andar click pe backdrop na band ho
        >
          <h2
            className={`text-2xl font-bold mb-4 ${
              status ? "text-green-600" : "text-red-600"
            }`}
          >
            {status ? "✅ Success" : "❌ Failed"}
          </h2>
          <p className="text-gray-700 text-lg mb-6">{mgs}</p>

          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold shadow hover:scale-105 transition"
          >
            OK
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default PopUp;
