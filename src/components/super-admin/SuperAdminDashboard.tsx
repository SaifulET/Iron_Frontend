"use client";

import React, { useState, useEffect } from "react";
import SuperAdminSidebar from "./SuperAdminSidebar";
import SuperAdminHeader from "./SuperAdminHeader";
import SuperAdminDashboardContent from "./SuperAdminDashboardContent";
import SuperAdminBusinesses from "./SuperAdminBusinesses";
import SuperAdminCustomers from "./SuperAdminCustomers";
import SuperAdminBookings from "./SuperAdminBookings";
import SuperAdminFinance from "./SuperAdminFinance";
import SuperAdminAnalytics from "./SuperAdminAnalytics";
import SuperAdminSupport from "./SuperAdminSupport";
import SuperAdminSettings from "./SuperAdminSettings";
import SuperAdminContent from "./content/SuperAdminContent";

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
    <div className="fixed inset-0 bg-[#F9FAFB] overflow-hidden flex flex-col">
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
        className={`pr-2 pt-[78px] flex-grow transition-all duration-300 overflow-hidden min-w-0 ${
          isCollapsed ? "pl-[88px]" : "pl-[256px]"
        }`}
      >
        {activeTab === "Dashboard" ? (
          <SuperAdminDashboardContent />
        ) : activeTab === "Businesses" ? (
          <SuperAdminBusinesses />
        ) : activeTab === "Customers" ? (
          <SuperAdminCustomers />
        ) : activeTab === "Bookings" ? (
          <SuperAdminBookings />
        ) : activeTab === "Finance" ? (
          <SuperAdminFinance />
        ) : activeTab === "Analytics" ? (
          <SuperAdminAnalytics />
        ) : activeTab === "Support" ? (
          <SuperAdminSupport />
        ) : activeTab === "Settings" ? (
          <SuperAdminSettings />
        ) : activeTab === "Content" ? (
          <SuperAdminContent />
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
