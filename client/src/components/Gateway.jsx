import React, { useState } from "react";
import Swal from "sweetalert2";
import { FaCheckCircle, FaUser, FaLock, FaSignInAlt } from "react-icons/fa";

export default function Gateway() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isConnected, setIsConnected] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Please enter both Username and Password.",
      });
      return;
    }

    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Gateway Authentication Successful!",
    }).then(() => {
      setIsConnected(true);
    });
  };

  return (
    <div className="max-w-md mx-auto my-20 p-6 bg-white rounded-xl shadow-lg border border-indigo-100">
      <h2
        className="text-3xl font-bold mb-6 text-center text-indigo-700"
        style={{ fontFamily: "math" }}
      >
        Gateway Authentication
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col text-gray-700 font-medium">
          <span className="flex items-center gap-2 mb-1">
            <FaUser className="text-gray-600" /> Username
          </span>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter username"
          />
        </label>

        <label className="flex flex-col text-gray-700 font-medium">
          <span className="flex items-center gap-2 mb-1">
            <FaLock className="text-gray-600" /> Password
          </span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="p-2 border border-gray-300 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            placeholder="Enter password"
          />
        </label>

        <button
          type="submit"
          className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition w-1/2 mx-auto shadow"
        >
          <FaSignInAlt />
          Submit
        </button>
      </form>

      {isConnected && (
        <div className="mt-6 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-green-800 bg-green-100 rounded-full shadow-sm">
            <FaCheckCircle className="text-green-600" />
            Gateway Status: <span className="text-green-700">Connected</span>
          </div>
        </div>
      )}
    </div>
  );
}