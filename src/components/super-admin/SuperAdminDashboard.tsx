"use client";

import React, { useState, useEffect } from "react";
import SuperAdminSidebar from "./SuperAdminSidebar";
import SuperAdminHeader from "./SuperAdminHeader";
import SuperAdminDashboardContent from "./SuperAdminDashboardContent";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [isCollapsed, setIsCollapsed] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsCollapsed(true);
      } else {
        setIsCollapsed(false);
      }
    };
    
    // Check width on client-side mount
    handleResize();
    
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative min-h-[950px] w-full bg-[#F9FAFB] overflow-x-hidden">
      {/* Sidebar */}
      <SuperAdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
      />

      {/* Header */}
      <SuperAdminHeader isCollapsed={isCollapsed} />

      {/* Main Content Area */}
      <main
        className={`pr-6 pt-[94px] min-h-[900px] w-full transition-all duration-300 ${
          isCollapsed ? "pl-[96px]" : "pl-[264px]"
        }`}
      >
        {activeTab === "Dashboard" ? (
          <SuperAdminDashboardContent />
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[600px] bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
            <h3 className="font-sans font-semibold text-xl text-gray-800">{activeTab} Page</h3>
            <p className="font-sans text-sm text-gray-500 mt-2">This section is currently under active development.</p>
          </div>
        )}
      </main>
    </div>
  );
}
