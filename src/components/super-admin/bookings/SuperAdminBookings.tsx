"use client";

import React, { useState } from "react";
import SuperAdminBookingsFilter from "./SuperAdminBookingsFilter";
import SuperAdminBookingsTabs from "./SuperAdminBookingsTabs";
import SuperAdminBookingsTable from "./SuperAdminBookingsTable";
import SuperAdminBookingDrawer from "./SuperAdminBookingDrawer";
import { HugeiconsIcon } from "@hugeicons/react";
import { Download01Icon } from "@hugeicons/core-free-icons";

interface BookingItem {
  id: string;
  bookingCode: string;
  customerName: string;
  customerTag: "New" | "Manual" | "Returning";
  serviceName: string;
  staffName: string;
  extraDetails?: string;
  travelInfo?: string;
  dateTime: string;
  amount: string;
  businessName: string;
  businessCity: string;
  status: "Upcoming" | "Completed" | "Cancelled" | "No-Shows";
}

export default function SuperAdminBookings() {
  const [activeStatusFilter, setActiveStatusFilter] = useState<"All" | "Upcoming" | "Completed" | "Cancelled" | "No-Shows">("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [appliedFromDate, setAppliedFromDate] = useState("");
  const [appliedToDate, setAppliedToDate] = useState("");
  const [selectedStaff, setSelectedStaff] = useState("All");
  const [selectedBusinessType, setSelectedBusinessType] = useState("All");
  const [selectedCustomerType, setSelectedCustomerType] = useState("All");
  const [selectedBooking, setSelectedBooking] = useState<BookingItem | null>(null);

  const [bookings, setBookings] = useState<BookingItem[]>([
    {
      id: "1",
      bookingCode: "BK-2831",
      customerName: "Nikos Ioannidis",
      customerTag: "New",
      serviceName: "Full Colour",
      staffName: "Maria",
      extraDetails: "+ Olaplex treatment",
      dateTime: "16 May 2026 - 14:30",
      amount: "€35",
      businessName: "Glam Studio",
      businessCity: "Larnaca",
      status: "Completed"
    },
    {
      id: "2",
      bookingCode: "BK-2847",
      customerName: "Nikos Ioannidis",
      customerTag: "Manual",
      serviceName: "Full Colour",
      staffName: "Maria",
      extraDetails: "+ Olaplex treatment",
      dateTime: "17 May 2026 - 10:00",
      amount: "€80",
      businessName: "Different business",
      businessCity: "Larnaca",
      status: "Upcoming"
    },
    {
      id: "3",
      bookingCode: "BK-2847",
      customerName: "Nikos Ioannidis",
      customerTag: "Returning",
      serviceName: "Full Colour",
      staffName: "Maria",
      extraDetails: "+ Olaplex treatment",
      dateTime: "17 May 2026 - 10:00",
      amount: "€80",
      businessName: "Different business",
      businessCity: "Larnaca",
      status: "Upcoming"
    },
    {
      id: "4",
      bookingCode: "BK-2831",
      customerName: "Nikos Ioannidis",
      customerTag: "New",
      serviceName: "Full Colour",
      staffName: "Maria",
      travelInfo: "€15 travel - Larnaca",
      dateTime: "16 May 2026 - 14:30",
      amount: "€35",
      businessName: "Different business",
      businessCity: "Larnaca",
      status: "Completed"
    }
  ]);

  // Counts for status-based filter tabs
  const counts = {
    All: bookings.length,
    Upcoming: bookings.filter((b) => b.status === "Upcoming").length,
    Completed: bookings.filter((b) => b.status === "Completed").length,
    Cancelled: bookings.filter((b) => b.status === "Cancelled").length,
    "No-Shows": bookings.filter((b) => b.status === "No-Shows").length
  };

  // Filter bookings based on selected dates and dropdown properties
  const filteredBookings = bookings.filter((b) => {
    // Keep tab filter and dropdown status filter in sync
    const tabFilter = activeStatusFilter;
    const dropFilter = selectedStatus;

    if (tabFilter !== "All" && b.status !== tabFilter) return false;
    if (dropFilter !== "All" && b.status !== dropFilter) return false;
    if (selectedStaff !== "All" && b.staffName !== selectedStaff) return false;
    if (selectedCustomerType !== "All" && b.customerTag !== selectedCustomerType) return false;
    
    // Business Type filter
    if (selectedBusinessType !== "All") {
      const isMobile = b.travelInfo !== undefined;
      if (selectedBusinessType === "Mobile" && !isMobile) return false;
      if (selectedBusinessType === "Premises" && isMobile) return false;
    }

    // Date range filter
    if (appliedFromDate || appliedToDate) {
      const datePart = b.dateTime.split(" - ")[0]; // e.g. "16 May 2026"
      const bookingDate = new Date(datePart);
      
      if (appliedFromDate) {
        const fromLimit = new Date(appliedFromDate);
        fromLimit.setHours(0, 0, 0, 0);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate < fromLimit) return false;
      }
      
      if (appliedToDate) {
        const toLimit = new Date(appliedToDate);
        toLimit.setHours(23, 59, 59, 999);
        bookingDate.setHours(0, 0, 0, 0);
        if (bookingDate > toLimit) return false;
      }
    }

    return true;
  });

  const toggleStatus = (id: string, newStatus: "Upcoming" | "Completed" | "Cancelled" | "No-Shows") => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  const handleApplyFilters = () => {
    setAppliedFromDate(fromDate);
    setAppliedToDate(toDate);
  };

  const handleExport = () => {
    // Generate CSV content
    const headers = ["Booking ID", "Customer Name", "Customer Tag", "Service Name", "Staff Name", "Extra Details", "Travel Info", "Date/Time", "Amount", "Business", "City", "Status"];
    const rows = bookings.map((b) => [
      `"${b.bookingCode}"`,
      `"${b.customerName}"`,
      `"${b.customerTag}"`,
      `"${b.serviceName}"`,
      `"${b.staffName}"`,
      `"${b.extraDetails || ""}"`,
      `"${b.travelInfo || ""}"`,
      `"${b.dateTime}"`,
      `"${b.amount}"`,
      `"${b.businessName}"`,
      `"${b.businessCity}"`,
      `"${b.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Initiate client-side download trigger
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `bookings_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-12 font-sans">
      {/* Title & Top controls row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <h2 className="font-semibold text-2xl text-[#111827] leading-[32px]">
          Bookings
        </h2>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
          >
            <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Sub-Tabs Status Badges Component */}
      <SuperAdminBookingsTabs
        activeStatusFilter={activeStatusFilter}
        setActiveStatusFilter={setActiveStatusFilter}
        counts={counts}
      />

      {/* Date Range and Dropdowns Filter Component */}
      <SuperAdminBookingsFilter
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
        selectedStatus={selectedStatus}
        setSelectedStatus={setSelectedStatus}
        selectedStaff={selectedStaff}
        setSelectedStaff={setSelectedStaff}
        selectedBusinessType={selectedBusinessType}
        setSelectedBusinessType={setSelectedBusinessType}
        selectedCustomerType={selectedCustomerType}
        setSelectedCustomerType={setSelectedCustomerType}
        onApplyFilters={handleApplyFilters}
      />

      {/* Bookings Table Component */}
      <SuperAdminBookingsTable
        filteredBookings={filteredBookings}
        toggleStatus={toggleStatus}
        onSelectBooking={setSelectedBooking}
      />

      {/* Booking Detail Slide-out Drawer */}
      <SuperAdminBookingDrawer
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}
