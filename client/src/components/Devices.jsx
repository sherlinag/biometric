import React from "react";
import { FaCircle, FaClipboardList, FaUser } from "react-icons/fa";

export default function Devices() {
  const deviceData = [
    {
      serialNo: "SN-00123",
      name: "Device 01",
      persons: 5,
      personLog: "Last log: 2025-05-29 10:15 AM",
      status: "online",
      events: 12,
      eventLog: "Last event: 2025-05-29 10:00 AM",
    },
    {
      serialNo: "SN-00456",
      name: "Device 02",
      persons: 0,
      personLog: "Last log: 2025-05-29 9:05 AM",
      status: "offline",
      events: 0,
      eventLog: "No events recorded",
    },
    {
      serialNo: "SN-00789",
      name: "Device 03",
      persons: 3,
      personLog: "Last log: 2025-05-28 5:45 PM",
      status: "online",
      events: 5,
      eventLog: "Last event: 2025-05-28 5:30 PM",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto mt-24 px-6 font-sans antialiased">
      <h1
        className="text-4xl font-extrabold text-gray-900 mb-10 border-b-4 border-indigo-700 pb-3 text-center tracking-wide"
        style={{
          fontFamily: "'STIX Two Math', 'Cambria Math', Georgia, serif",
        }}
      >
        Devices
      </h1>

      <div className="overflow-x-auto rounded-xl shadow-lg border border-gray-300 bg-white">
        <table className="min-w-full border-collapse">
          <thead className="bg-indigo-100 sticky top-0 shadow-sm z-20">
            <tr>
              <th className="text-left font-semibold text-indigo-900 px-6 py-3 border-b border-gray-300 whitespace-nowrap">
                SI No
              </th>
              <th className="text-left font-semibold text-indigo-900 px-6 py-3 border-b border-gray-300 whitespace-nowrap">
                Device Serial No.
              </th>
              <th className="text-left font-semibold text-indigo-900 px-6 py-3 border-b border-gray-300 whitespace-nowrap">
                Device Name
              </th>
              <th className="text-left font-semibold text-indigo-900 px-6 py-3 border-b border-gray-300 whitespace-nowrap">
                Persons
              </th>
              <th className="text-left font-semibold text-indigo-900 px-6 py-3 border-b border-gray-300 whitespace-nowrap">
                Events
              </th>
              <th className="text-left font-semibold text-indigo-900 px-6 py-3 border-b border-gray-300 whitespace-nowrap">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {deviceData.map((device, index) => (
              <tr
                key={index}
                className="even:bg-gray-50 odd:bg-white hover:bg-indigo-50 transition-colors cursor-default"
              >
                <td className="px-6 py-4 text-gray-700 font-medium whitespace-nowrap align-middle">
                  {index + 1}
                </td>
                <td className="px-6 py-4 text-gray-800 font-semibold whitespace-nowrap align-middle">
                  {device.serialNo || "\u00A0"}
                </td>
                <td className="px-6 py-4 text-gray-900 font-semibold whitespace-nowrap align-middle">
                  {device.name || "\u00A0"}
                </td>
                <td className="px-6 py-4 whitespace-normal text-gray-700 align-middle">
                  <div className="flex items-center gap-2 font-semibold">
                    <FaUser className="text-indigo-600" size={18} />
                    <span>{device.persons ?? 0}</span>
                  </div>
                  <div className="text-xs text-gray-500 mt-0.5 italic">{device.personLog || "\u00A0"}</div>
                </td>
                <td className="px-6 py-4 whitespace-normal text-indigo-700 font-medium align-middle">
                  <div className="flex items-center gap-2">
                    <FaClipboardList className="text-indigo-500" size={18} />
                    <span>{device.events} Event{device.events !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="text-xs text-indigo-500 italic mt-0.5">{device.eventLog || "\u00A0"}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap align-middle">
                  <span
                    className={`inline-flex items-center gap-2 px-4 py-1 rounded-full text-sm font-semibold shadow-sm ${
                      device.status === "online"
                        ? "bg-green-200 text-green-900"
                        : "bg-red-200 text-red-900"
                    }`}
                  >
                    <FaCircle
                      className={
                        device.status === "online"
                          ? "text-green-700"
                          : "text-red-700"
                      }
                      size={12}
                    />
                    {device.status.charAt(0).toUpperCase() + device.status.slice(1)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
