import React from "react";
import { FaAngleRight } from "react-icons/fa";

export default function Sidebar({ selected, selectedSubmenu, onSelectSubmenu }) {
  // Updated menu: "Server Authentication" is the main menu item now, with no submenus
  const menuItems = {
    "Server Authentication": [], // no submenu
    Devices: [],
    Settings: [],
  };

  // Get submenus for current main menu selection (will be empty for Server Authentication)
  const submenus = menuItems[selected] || [];

  return (
    <aside className="bg-indigo-100 p-4 min-h-full w-60 flex flex-col gap-2 shadow-inner">
      <div className="flex items-center justify-between px-3 py-2 bg-white text-indigo-800 font-semibold rounded shadow">
        <span>{selected || "Select Menu"}</span>
        <FaAngleRight />
      </div>

      {submenus.length > 0 && (
        <div className="ml-2 mt-2 flex flex-col gap-1">
          {submenus.map((sub) => (
            <button
              key={sub}
              onClick={() => onSelectSubmenu(sub)}
              className={`text-left px-3 py-2 rounded text-indigo-700 bg-indigo-200 transition ${
                selectedSubmenu === sub ? "bg-white shadow font-semibold" : ""
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      )}
    </aside>
  );
}
