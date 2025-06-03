import React from "react";

export default function Footer() {
  return (
    <>
      {/* Top connection bar - inline content width with dot */}
        <div className="fixed bottom-16 right-4 z-50 bg-green-100 rounded">
        <div className="text-green-700 text-sm font-semibold flex items-center gap-2 p-1">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
          Connected
        </div>
      </div>

      {/* Main footer section */}
      <footer className="bg-gray-800 text-gray-200 py-4 px-4 ">
        <div className="text-center text-sm">
          Powered by{" "}
          <a
            href="https://ordinal.in"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-indigo-300 hover:text-indigo-500 transition-colors"
          >
            Ordinal Technology Solutions Pvt Ltd.
          </a>
        </div>
      </footer>
    </>
  );
}
