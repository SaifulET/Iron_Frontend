"use client";

import React, { useState } from "react";
import SuperAdminBusinessesFilter from "./SuperAdminBusinessesFilter";
import SuperAdminBusinessesTabs from "./SuperAdminBusinessesTabs";
import SuperAdminBusinessesTable from "./SuperAdminBusinessesTable";
import SuperAdminBusinessReview from "./SuperAdminBusinessReview";

interface BusinessItem {
  id: string;
  name: string;
  category: string;
  type: "Premises" | "Mobile";
  city: string;
  status: "Approved" | "Pending" | "Warning" | "Suspended";
  bookings: number | null;
  newBookings: number | null;
  rating: number | null;
  reviewsCount: number | null;
  memberSince: string;
}

export default function SuperAdminBusinesses() {
  const [activeStatusFilter, setActiveStatusFilter] = useState<"All" | "Approved" | "Pending" | "Warning" | "Suspended">("All");
  const [selectedCity, setSelectedCity] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [viewingBusinessId, setViewingBusinessId] = useState<string | null>(null);

  const [businesses, setBusinesses] = useState<BusinessItem[]>([
    {
      id: "1",
      name: "Glam Studio",
      category: "Beauty & Wellness",
      type: "Mobile",
      city: "Nicosia",
      status: "Approved",
      bookings: 847,
      newBookings: 847,
      rating: 4.3,
      reviewsCount: 211,
      memberSince: "12 Jan 2024"
    },
    {
      id: "2",
      name: "TopCut Barbers",
      category: "Hair Styling",
      type: "Premises",
      city: "Limassol",
      status: "Approved",
      bookings: 532,
      newBookings: 532,
      rating: 4.3,
      reviewsCount: 211,
      memberSince: "3 Mar 2024"
    },
    {
      id: "3",
      name: "Luna Nails Paphos",
      category: "Nail Care",
      type: "Premises",
      city: "Paphos",
      status: "Pending",
      bookings: null,
      newBookings: null,
      rating: null,
      reviewsCount: null,
      memberSince: "16 May 2026"
    },
    {
      id: "4",
      name: "Glam Studio",
      category: "Beauty & Wellness",
      type: "Mobile",
      city: "Larnaca",
      status: "Approved",
      bookings: 1204,
      newBookings: 1204,
      rating: 4.3,
      reviewsCount: 211,
      memberSince: "20 Nov 2023"
    },
    {
      id: "5",
      name: "TopCut Barbers",
      category: "Hair Styling",
      type: "Premises",
      city: "Limassol",
      status: "Warning",
      bookings: 320,
      newBookings: 320,
      rating: 4.3,
      reviewsCount: 211,
      memberSince: "5 Jun 2024"
    },
    {
      id: "6",
      name: "TopCut Barbers",
      category: "Hair Styling",
      type: "Premises",
      city: "Nicosia",
      status: "Warning",
      bookings: 61,
      newBookings: 61,
      rating: 4.3,
      reviewsCount: 211,
      memberSince: "2 May 2026"
    },
    {
      id: "7",
      name: "Glam Studio",
      category: "Beauty & Wellness",
      type: "Mobile",
      city: "Nicosia",
      status: "Suspended",
      bookings: 412,
      newBookings: 412,
      rating: 4.3,
      reviewsCount: 211,
      memberSince: "14 Aug 2024"
    }
  ]);

  // Counts for status-based filters
  const counts = {
    All: businesses.length,
    Approved: businesses.filter((b) => b.status === "Approved").length,
    Pending: businesses.filter((b) => b.status === "Pending").length,
    Warning: businesses.filter((b) => b.status === "Warning").length,
    Suspended: businesses.filter((b) => b.status === "Suspended").length
  };

  // Filter list by selected dropdown properties and status tab
  const filteredBusinesses = businesses.filter((b) => {
    if (activeStatusFilter !== "All" && b.status !== activeStatusFilter) return false;
    if (selectedCity !== "All" && b.city !== selectedCity) return false;
    if (selectedType !== "All" && b.type !== selectedType) return false;
    if (selectedCategory !== "All" && b.category !== selectedCategory) return false;
    return true;
  });

  const toggleStatus = (id: string, newStatus: "Approved" | "Suspended") => {
    setBusinesses((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
    );
  };

  if (viewingBusinessId) {
    return (
      <SuperAdminBusinessReview
        businessId={viewingBusinessId}
        onBack={() => setViewingBusinessId(null)}
        onApprove={(id) => {
          toggleStatus(id, "Approved");
          setViewingBusinessId(null);
        }}
        onReject={(id) => {
          toggleStatus(id, "Suspended");
          setViewingBusinessId(null);
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full pb-12">
      {/* Title & Top Dropdown Filters Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full">
        <h2 className="font-sans font-semibold text-2xl text-[#111827] leading-[32px]">
          Business
        </h2>

        {/* Dropdown Filters Component */}
        <SuperAdminBusinessesFilter
          selectedCity={selectedCity}
          setSelectedCity={setSelectedCity}
          selectedType={selectedType}
          setSelectedType={setSelectedType}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Sub-Tabs Status Badges Component */}
      <SuperAdminBusinessesTabs
        activeStatusFilter={activeStatusFilter}
        setActiveStatusFilter={setActiveStatusFilter}
        counts={counts}
      />

      {/* Business Table List Component */}
      <SuperAdminBusinessesTable
        filteredBusinesses={filteredBusinesses}
        toggleStatus={toggleStatus}
        onView={(id) => setViewingBusinessId(id)}
      />
    </div>
  );
}
