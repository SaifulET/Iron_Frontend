"use client";

import React, { useState } from "react";
import SuperAdminCustomersFilter from "./SuperAdminCustomersFilter";
import SuperAdminCustomersTabs from "./SuperAdminCustomersTabs";
import SuperAdminCustomersTable from "./SuperAdminCustomersTable";
import SuperAdminCustomerDetail from "./SuperAdminCustomerDetail";

interface CustomerItem {
  id: string;
  name: string;
  email: string;
  phone: string;
  registered: string;
  businessesCount: number;
  cardSaved: boolean;
  marketingConsent: boolean;
  status: "Active" | "Doormat" | "Suspended";
}

export default function SuperAdminCustomers() {
  const [activeStatusFilter, setActiveStatusFilter] = useState<"All" | "Active" | "Doormat" | "Suspended">("All");
  const [selectedStatusDropdown, setSelectedStatusDropdown] = useState("All");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  const [customers, setCustomers] = useState<CustomerItem[]>([
    {
      id: "1",
      name: "Andri Petrou",
      email: "example@gmail.com",
      phone: "+6552895485",
      registered: "16 May 2026 · 14:30",
      businessesCount: 14,
      cardSaved: true,
      marketingConsent: true,
      status: "Active"
    },
    {
      id: "2",
      name: "Andri Petrou",
      email: "example@gmail.com",
      phone: "+6552895485",
      registered: "16 May 2026 · 14:30",
      businessesCount: 14,
      cardSaved: true,
      marketingConsent: true,
      status: "Active"
    },
    {
      id: "3",
      name: "Andri Petrou",
      email: "example@gmail.com",
      phone: "+6552895485",
      registered: "16 May 2026 · 14:30",
      businessesCount: 14,
      cardSaved: false,
      marketingConsent: true,
      status: "Doormat"
    },
    {
      id: "4",
      name: "Andri Petrou",
      email: "example@gmail.com",
      phone: "+6552895485",
      registered: "16 May 2026 · 14:30",
      businessesCount: 14,
      cardSaved: true,
      marketingConsent: false,
      status: "Suspended"
    }
  ]);

  // Counts for tabs filter
  const counts = {
    All: customers.length,
    Active: customers.filter((c) => c.status === "Active").length,
    Doormat: customers.filter((c) => c.status === "Doormat").length,
    Suspended: customers.filter((c) => c.status === "Suspended").length
  };

  // Filter list by selected dropdown and status tab
  const filteredCustomers = customers.filter((c) => {
    // Sync the tab selection and dropdown selection to keep filters aligned
    const tabFilter = activeStatusFilter;
    const dropdownFilter = selectedStatusDropdown;

    if (tabFilter !== "All" && c.status !== tabFilter) return false;
    if (dropdownFilter !== "All" && c.status !== dropdownFilter) return false;
    return true;
  });

  const toggleStatus = (id: string, newStatus: "Active" | "Suspended") => {
    setCustomers((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
    );
  };

  const handleExport = () => {
    // Generate CSV content
    const headers = ["ID", "Name", "Email", "Phone", "Registered", "Businesses Count", "Card Saved", "Marketing Consent", "Status"];
    const rows = customers.map((c) => [
      `"${c.id}"`,
      `"${c.name.replace(/"/g, '""')}"`,
      `"${c.email.replace(/"/g, '""')}"`,
      `"${c.phone}"`,
      `"${c.registered.replace("·", "-")}"`,
      c.businessesCount,
      c.cardSaved ? "Yes" : "No",
      c.marketingConsent ? "Yes" : "No",
      `"${c.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Create a client-side Blob and initiate a download trigger
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `customers_export_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (selectedCustomerId !== null) {
    return (
      <SuperAdminCustomerDetail
        customerId={selectedCustomerId}
        onBack={() => setSelectedCustomerId(null)}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-12">
      {/* Title & Dropdowns Filter Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <h2 className="font-sans font-semibold text-2xl text-[#111827] leading-[32px]">
          Customers
        </h2>

        {/* Dropdown Filters Component */}
        <SuperAdminCustomersFilter
          selectedStatus={selectedStatusDropdown}
          setSelectedStatus={setSelectedStatusDropdown}
          onExport={handleExport}
        />
      </div>

      {/* Sub-Tabs Status Badges Component */}
      <SuperAdminCustomersTabs
        activeStatusFilter={activeStatusFilter}
        setActiveStatusFilter={setActiveStatusFilter}
        counts={counts}
      />

      {/* Customers Table List Component */}
      <SuperAdminCustomersTable
        filteredCustomers={filteredCustomers}
        toggleStatus={toggleStatus}
        onSelectCustomer={setSelectedCustomerId}
      />
    </div>
  );
}
