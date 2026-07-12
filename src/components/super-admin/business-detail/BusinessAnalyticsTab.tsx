"use client";

import React, { useState } from "react";
import AnalyticsBarChart from "./AnalyticsBarChart";
import AnalyticsStatusesList from "./AnalyticsStatusesList";

interface BusinessAnalyticsTabProps {
  businessId: string;
}

export default function BusinessAnalyticsTab({ businessId }: BusinessAnalyticsTabProps) {
  const [selectedMonth, setSelectedMonth] = useState<string | null>("May");
  const [selectedYear, setSelectedYear] = useState("Year");

  // Mock bar chart heights (normalized as percentages or max height of 160px)
  const monthlyData = [
    { month: "Jan", height: 64 },
    { month: "Feb", height: 88 },
    { month: "Mar", height: 112 },
    { month: "Apr", height: 136 },
    { month: "May", height: 160 },
    { month: "Jun", height: 95 },
    { month: "Jul", height: 22 },
    { month: "Aug", height: 76 },
    { month: "Sep", height: 41 },
    { month: "Oct", height: 76 },
    { month: "Nov", height: 41 },
    { month: "Dec", height: 22 },
  ];

  // Mock data for Statuses progress bars
  const statusData = [
    { label: "New customers", value: 28, percent: 72 },
    { label: "Returning customers", value: 28, percent: 48 },
    { label: "No-shows charged", value: 28, percent: 28 },
    { label: "No-shows waived", value: 28, percent: 28 },
    { label: "No-shows cancelled", value: 28, percent: 28 },
    { label: "Late cancellation", value: 28, percent: 28 },
    { label: "Completed", value: 28, percent: 28 },
    { label: "Cancelled by customer", value: 28, percent: 28 },
    { label: "Cancelled by business", value: 28, percent: 28 },
  ];

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-gray-900 animate-fadeIn">
      <AnalyticsBarChart
        selectedYear={selectedYear}
        setSelectedYear={setSelectedYear}
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        monthlyData={monthlyData}
      />
      <AnalyticsStatusesList statusData={statusData} />
    </div>
  );
}
