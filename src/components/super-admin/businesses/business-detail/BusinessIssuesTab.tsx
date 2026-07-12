"use client";

import React, { useState } from "react";
import IssuesFilters from "./IssuesFilters";
import IssuesTable from "./IssuesTable";

interface BusinessIssuesTabProps {
  businessId: string;
}

export default function BusinessIssuesTab({ businessId }: BusinessIssuesTabProps) {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("Status");
  const [selectedStaff, setSelectedStaff] = useState("Staff");
  const [selectedCustomerType, setSelectedCustomerType] = useState("Customer type");

  // Mock Issues list
  const issues = [
    {
      dateTime: "16 May 2026 · 14:30",
      bookingId: "BK-2831",
      customerName: "Nikos Ioannidis",
      customerType: "New",
      serviceName: "Full Colour",
      staffName: "Maria",
      addon: "+ Olaplex treatment",
      booklyFee: "€35",
      reason: "Staff unavailability",
      status: "Cancelled by business",
      statusBg: "bg-[#94EEFF] text-[#075E6F]",
    },
    {
      dateTime: "16 May 2026 · 14:30",
      bookingId: "BK-2831",
      customerName: "Nikos Ioannidis",
      customerType: "New",
      serviceName: "Full Colour",
      staffName: "Maria",
      addon: "+ Olaplex treatment",
      booklyFee: "€35",
      reason: "Staff unavailability",
      status: "Cancelled by business",
      statusBg: "bg-[#94EEFF] text-[#075E6F]",
    },
  ];

  // Filtering implementation
  const filteredIssues = issues.filter((issue) => {
    if (selectedStatus !== "Status" && issue.status.toLowerCase() !== selectedStatus.toLowerCase()) return false;
    if (selectedStaff !== "Staff" && issue.staffName.toLowerCase() !== selectedStaff.toLowerCase()) return false;
    if (selectedCustomerType !== "Customer type" && issue.customerType.toLowerCase() !== selectedCustomerType.toLowerCase()) return false;

    if (appliedFromDate || appliedToDate) {
      const datePart = issue.dateTime.split(" · ")[0];
      const issueDate = new Date(datePart);
      if (appliedFromDate && issueDate < new Date(appliedFromDate)) return false;
      if (appliedToDate && issueDate > new Date(appliedToDate)) return false;
    }
    return true;
  });

  const handleApplyFilters = () => {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
  };

  return (
    <div className="flex flex-col gap-6 w-full font-sans text-gray-900">
      <IssuesFilters
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        selectedCustomerType={selectedCustomerType}
        setSelectedCustomerType={setSelectedCustomerType}
        onApply={handleApplyFilters}
      />
      <IssuesTable filteredIssues={filteredIssues} />
    </div>
  );
}
