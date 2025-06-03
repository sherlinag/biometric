import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaNetworkWired,
  FaSignInAlt,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaBook,
} from "react-icons/fa";
import illustration from "./assets/homeimg.jpg";

export default function Home() {
  const [ip, setIp] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const saved = localStorage.getItem("gateway-info");
    const fromLogout = location.state?.fromLogout;

    if (saved && !fromLogout) {
      try {
        const data = JSON.parse(saved);
        if (data.ip) setIp(data.ip);
        if (data.username) setUsername(data.username);
        setIsConnected(true);
      } catch {
        localStorage.removeItem("gateway-info");
      }
    } else if (saved && fromLogout) {
      try {
        const data = JSON.parse(saved);
        if (data.ip) setIp(data.ip);
        if (data.username) setUsername(data.username);
        setIsConnected(false);
      } catch {
        localStorage.removeItem("gateway-info");
      }
    } else {
      setIp("");
      setUsername("");
      setPassword("");
      setIsConnected(false);
    }

    setPassword("");
  }, [location]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!ip || !username || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/fetch", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: `http://${ip}/ISAPI/System/deviceInfo`,
          username,
          password,
          body: {}, // Empty POST body for Hikvision
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      localStorage.setItem("gateway-info", JSON.stringify({ ip, username }));
      localStorage.setItem("device-info", JSON.stringify(data));
      setIsConnected(true);

      setTimeout(() => {
        navigate("/dashboard");
      }, 700);
    } catch (err) {
      setError(err.message || "Connection or authentication failed.");
      setIsConnected(false);
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-white">
      <header className="flex justify-between items-center p-4 shadow-sm border-b shrink-0">
        <div className="flex items-center gap-2">
          <img src="/logo1.png" alt="Logo" className="w-10 h-8" />
        </div>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <button className="flex items-center gap-2 bg-violet-500 hover:bg-violet-600 text-white px-4 py-2 rounded">
            <FaBook />
            User Guide
          </button>
        </nav>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <div className="w-1/2 flex items-center justify-center p-8 overflow-hidden">
          <img
            src={illustration}
            alt="Login Illustration"
            className="w-3/4 max-h-full object-contain"
          />
        </div>

        <div className="w-1/2 flex flex-col items-center justify-center bg-gray-50 overflow-hidden">
          <h2 className="text-gray-800 mb-6 font-semibold text-2xl">Welcome</h2>
          <h1 className="text-2xl font-bold text-indigo-600 mb-6">
            Ordinal Biometric Gateway
          </h1>

          <div className="w-full py-6 bg-white border border-indigo-100 rounded max-w-md px-6">
            <h2 className="text-gray-900 mb-1 font-extrabold text-3xl">
              Gateway Authentication
            </h2>
            <p className="text-gray-500 text-sm mb-6">
              Enter IP Address, Username, and Password to log in.
            </p>

            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <label className="flex flex-col text-gray-700 font-medium">
                <span className="flex items-center gap-2 mb-1">
                  <FaNetworkWired className="text-gray-600" /> IP Address
                </span>
                <input
                  type="text"
                  value={ip}
                  onChange={(e) => setIp(e.target.value)}
                  className="p-2 border border-gray-300 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="127.0.0.1"
                  required
                />
              </label>

              <label className="flex flex-col text-gray-700 font-medium">
                <span className="flex items-center gap-2 mb-1">
                  <FaUser className="text-gray-600" /> Username
                </span>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="p-2 border border-gray-300 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  placeholder="username"
                  required
                />
              </label>

              <label className="flex flex-col text-gray-700 font-medium relative">
                <span className="flex items-center gap-2 mb-1">
                  <FaLock className="text-gray-600" /> Password
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="p-2 border border-gray-300 rounded bg-blue-50 focus:outline-none focus:ring-2 focus:ring-indigo-400 pr-10"
                  placeholder="••••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 right-3 transform text-gray-600 hover:text-indigo-600 focus:outline-none mt-1"
                  tabIndex={-1}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </label>

              {error && (
                <p className="text-red-600 text-sm font-semibold">{error}</p>
              )}

              <button
                type="submit"
                className="mt-4 flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-2 rounded hover:bg-indigo-700 transition shadow"
              >
                <FaSignInAlt />
                Submit
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-gray-600">
              Need help? Contact support or refer to the user guide.
            </p>
            <p className="mt-1 text-center text-xs text-gray-500 italic">
              Ensure secure access to your devices.
            </p>
          </div>
        </div>
      </div>

      <footer className="text-center text-sm py-3">
        Powered by{" "}
        <a
          href="https://ordinal.in"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-indigo-700 hover:text-indigo-500 transition-colors"
        >
          Ordinal Technology Solutions Pvt Ltd.
        </a>
      </footer>
    </div>
  );
}
