import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import {
  FaBookOpen,
  FaUser,
  FaSignOutAlt,
  FaBars,
} from "react-icons/fa";
import { FiX } from "react-icons/fi";

export default function Header({
  selectedSidebar,
  onSelectSidebar,
  selectedSubmenu,
  onSelectSubmenu,
}) {
  const navigate = useNavigate(); 
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { title: "Authentication", submenu: [] },
    { title: "Devices", submenu: [] },
    { title: "Settings", submenu: [] },
  ];

  const handleMenuClick = (title, submenu) => {
    onSelectSidebar(title);
    if (title === "Authentication") {
      // Force submenu "Authentication" on click
      onSelectSubmenu("Authentication");
    } else {
      onSelectSubmenu(null);
    }
    setMenuOpen(false);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    // Clear auth if needed
    navigate("/"); 
  };

  return (
    <header className="bg-gray-800 text-yellow-200 relative">
      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white text-gray-800 shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-50`}
      >
        <div className="flex justify-between items-center px-4 py-3 border-b">
          <span className="font-bold text-indigo-700"></span>
          <button onClick={toggleMenu} className="text-xl text-gray-600 hover:text-black">
            <FiX />
          </button>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          {menuItems.map(({ title, submenu }) => (
            <div key={title}>
              <button
                onClick={() => handleMenuClick(title, submenu)}
                className={`w-full text-left font-medium px-3 py-2 rounded transition ${
                  selectedSidebar === title
                    ? "bg-black text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                {title}
              </button>
            </div>
          ))}
        </nav>
      </div>

      {/* Desktop Navbar */}
      <nav className="flex justify-between items-center px-6 py-4">
        <div className="flex items-center gap-4">
          <img
            src="/logo1.png"
            alt="Logo"
            className="h-10 w-auto bg-indigo-100 p-1 rounded shadow"
          />
          <div className="hidden md:flex gap-4 ml-6">
            {menuItems.map(({ title, submenu }) => (
              <button
                key={title}
                onClick={() => handleMenuClick(title, submenu)}
                className={`px-4 py-2 rounded font-medium transition ${
                  selectedSidebar === title
                    ? "bg-black text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Right Side Buttons */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 bg-violet-600 text-white rounded-full hover:bg-violet-700">
              <FaUser /> Admin
            </button>
            <button className="flex items-center gap-2 bg-indigo-500 text-white rounded-full px-3 py-2 hover:bg-indigo-600">
              <FaBookOpen /> User Guide
            </button>
            <button
              onClick={handleLogout} 
              className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-full hover:bg-red-700"
            >
              <FaSignOutAlt /> Logout
            </button>
          </div>
          <button className="text-white text-2xl md:hidden" onClick={toggleMenu}>
            {menuOpen ? <FiX /> : <FaBars />}
          </button>
        </div>
      </nav>
    </header>
  );
}
