import React, { useState, useEffect } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import Devices from "./Devices";
import Server from "./Server";
import Settings from "./Settings";
import backgroundImage from "/src/assets/grid_background.svg";

export default function Layout() {
  // Start with header Authentication selected and sidebar selection "Authentication"
  const [selectedSidebar, setSelectedSidebar] = useState("Authentication");
  const [selectedSubmenu, setSelectedSubmenu] = useState("Authentication");

  // When header menu changes:
  const handleSelectSidebar = (menu) => {
    setSelectedSidebar(menu);
    // For Authentication header, default sidebar selection is "Authentication"
    if (menu === "Authentication") {
      setSelectedSubmenu("Authentication");
    } else {
      setSelectedSubmenu(null);
    }
  };

  // When sidebar menu item clicked:
  const handleSelectSubmenu = (submenu) => {
    setSelectedSubmenu(submenu);
  };

  // Render content based on sidebar submenu selected
  const renderContent = () => {
    if (selectedSidebar === "Devices") {
      return <Devices />;
    }
    if (selectedSidebar === "Authentication" && selectedSubmenu === "Authentication") {
      return <Server />;
    }
    if (selectedSidebar === "Settings") {
      return <Settings />;
    }

    return <p className="text-center text-gray-600 mt-10">Please select a menu item.</p>;
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        selectedSidebar={selectedSidebar}
        onSelectSidebar={handleSelectSidebar}
        selectedSubmenu={selectedSubmenu}
        onSelectSubmenu={handleSelectSubmenu}
      />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          selected={selectedSidebar}
          selectedSubmenu={selectedSubmenu}
          onSelectSubmenu={handleSelectSubmenu}
        />

        <main
          className="flex-1 p-6 overflow-auto relative"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-white opacity-60 pointer-events-none z-0" />
          <div className="relative z-10">{renderContent()}</div>
        </main>
      </div>

      <Footer />
    </div>
  );
}
