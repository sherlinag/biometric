import React, { useState } from "react";
import { FaCheckCircle, FaClock } from "react-icons/fa";

export default function Settings() {
  const [syncInterval, setSyncInterval] = useState("");
  const [isVerified, setIsVerified] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!syncInterval.trim()) {
      setIsVerified(false);
      return;
    }

    setIsVerified(true);
  };

  return (
    <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-xl shadow-lg border border-indigo-100 font-sans">
      <h2
        className="text-3xl font-bold mb-8 text-center text-indigo-700"
        style={{ fontFamily: "'STIX Two Math', 'Cambria Math', Georgia, serif" }}
      >
        Settings
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Sync Interval */}
        <div>
          <h3 className="text-xl font-semibold text-indigo-700 mb-4 flex items-center gap-2">
            Sync & Network
          </h3>

          <label className="flex flex-col font-medium text-gray-700 mb-4">
            <span className="flex items-center gap-2 mb-1">
              <FaClock /> Sync Interval (minutes)
            </span>
            <input
              type="number"
              min="1"
              value={syncInterval}
              onChange={(e) => setSyncInterval(e.target.value)}
              className="p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="Enter sync interval"
            />
          </label>
        </div>

        <button
          type="submit"
          className="bg-indigo-600 text-white font-semibold py-3 rounded hover:bg-indigo-700 transition shadow w-1/2 mx-auto"
        >
          Update
        </button>
      </form>

      {/* Verified Status */}
      {isVerified && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2 px-5 py-3 font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
            <FaCheckCircle className="text-green-600" />
            Settings Status: <span className="text-green-700">Updated</span>
          </div>
        </div>
      )}
    </div>
  );
}
