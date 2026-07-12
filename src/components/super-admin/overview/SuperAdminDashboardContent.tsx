"use client";

import React, { useState } from "react";
import SuperAdminOverviewBanner from "./SuperAdminOverviewBanner";
import SuperAdminStatsGrid from "./SuperAdminStatsGrid";
import SuperAdminAttentionSection from "./SuperAdminAttentionSection";
import SuperAdminCityCoverage from "../analytics/SuperAdminCityCoverage";
import SuperAdminTopServices from "./SuperAdminTopServices";
import SuperAdminRecentActivity from "./SuperAdminRecentActivity";

export default function SuperAdminDashboardContent() {
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedDay, setSelectedDay] = useState("All");
  const [selectedPeriod, setSelectedPeriod] = useState("Month");
  const [selectedYear, setSelectedYear] = useState("2026");
  const [isAllTime, setIsAllTime] = useState(true);

  return (
    <div className="flex flex-col gap-6 w-full max-w-none pb-12">
      {/* Dashboard Sub-Header Filters Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <h2 className="font-sans font-semibold text-2xl text-[#111827] leading-[32px]">
          Dashboard
        </h2>

        {/* Filters buttons */}
        <div className="flex flex-wrap items-center gap-3">
          {/* City select dropdown */}
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7]"
          >
            <option value="All">City</option>
            <option value="Larnaca">Larnaca</option>
            <option value="Limassol">Limassol</option>
            <option value="Nicosia">Nicosia</option>
          </select>

          {/* Day select dropdown */}
          <select 
            value={selectedDay} 
            onChange={(e) => setSelectedDay(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7]"
          >
            <option value="All">Day</option>
            <option value="Monday">Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
          </select>

          {/* Month/Period select dropdown */}
          <select 
            value={selectedPeriod} 
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7]"
          >
            <option value="Month">Month</option>
            <option value="Week">Week</option>
            <option value="Quarter">Quarter</option>
          </select>

          {/* Year select dropdown */}
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            className="bg-white border border-[#E2E8F0] rounded-lg px-3 py-1.5 text-[13px] font-medium text-[#314158] focus:outline-none focus:ring-1 focus:ring-[#2E9DA7]"
          >
            <option value="2026">Year</option>
            <option value="2025">2025</option>
            <option value="2026">2026</option>
          </select>

          {/* All time button */}
          <button 
            onClick={() => setIsAllTime(!isAllTime)}
            className={`rounded-lg px-4 py-1.5 text-[13px] font-medium transition-all duration-150 ${
              isAllTime 
                ? "bg-[#111111] text-white border border-transparent" 
                : "bg-white text-[#314158] border border-[#E2E8F0] hover:bg-gray-50"
            }`}
          >
            All time
          </button>
        </div>
      </div>

      {/* 1. Sea Green Recovery Banner */}
      <SuperAdminOverviewBanner />

      {/* 2. Stats Grid */}
      <SuperAdminStatsGrid />

      {/* 3. Needs your attention */}
      <SuperAdminAttentionSection />

      {/* 4. Two columns split */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 w-full">
        {/* City Coverage table */}
        <SuperAdminCityCoverage />

        {/* Top Services chart */}
        <SuperAdminTopServices />
      </div>

      {/* 5. Recent Activity */}
      <SuperAdminRecentActivity />
    </div>
  );
}
