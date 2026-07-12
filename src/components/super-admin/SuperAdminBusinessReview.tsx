"use client";

import React from "react";

interface BusinessDetail {
  id: string;
  name: string;
  category: string;
  type: "Premises" | "Mobile";
  city: string;
  status: "Approved" | "Pending" | "Warning" | "Suspended";
  address: string;
  ownerName: string;
  email: string;
  phone: string;
  description: string;
  accepted: string;
  timestamp: string;
  includes: string;
}

interface SuperAdminBusinessReviewProps {
  businessId: string;
  onBack: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

// Mock details database for business applications
const businessDetailsDb: Record<string, BusinessDetail> = {
  "3": {
    id: "3",
    name: "Luna Nails Paphos",
    category: "Nail Salons",
    type: "Premises",
    city: "Paphos",
    status: "Pending",
    address: "28 Apostolou Pavlou Ave, Paphos 8046",
    ownerName: "Elena Georgiou",
    email: "elena@lunaNails.cy",
    phone: "+357 99 123456",
    description: "Premium nail salon with gel, acrylic & nail art services.",
    accepted: "✅ Yes",
    timestamp: "16 May 2026 at 14:31",
    includes: "20% commission clause acknowledged",
  },
};

export default function SuperAdminBusinessReview({
  businessId,
  onBack,
  onApprove,
  onReject,
}: SuperAdminBusinessReviewProps) {
  // Fetch details or fallback to Luna Nails Paphos
  const detail = businessDetailsDb[businessId] || {
    id: businessId,
    name: "Luna Nails Paphos",
    category: "Nail Salons",
    type: "Premises",
    city: "Paphos",
    status: "Pending",
    address: "28 Apostolou Pavlou Ave, Paphos 8046",
    ownerName: "Elena Georgiou",
    email: "elena@lunaNails.cy",
    phone: "+357 99 123456",
    description: "Premium nail salon with gel, acrylic & nail art services.",
    accepted: "✅ Yes",
    timestamp: "16 May 2026 at 14:31",
    includes: "20% commission clause acknowledged",
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-none pb-12 font-sans">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
        <button onClick={onBack} className="hover:text-gray-900 cursor-pointer bg-transparent border-none p-0">
          Businesses
        </button>
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-medium text-[#111827]">Application Review</span>
      </div>

      {/* Header / Title Row */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 w-full">
        <h2 className="font-sans font-semibold text-2xl text-[#111827] leading-[32px]">
          Business Application
        </h2>

        {/* Action badges and buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
          {/* Status Badge */}
          <div className="bg-[#D97706]/10 text-[#D97706] font-semibold text-xs py-1.5 px-3.5 rounded-full">
            Pending Review
          </div>

          {/* Reject button */}
          <button
            onClick={() => onReject(detail.id)}
            className="flex items-center gap-2 border border-[#DC2626] bg-[#F5EEEE] text-[#DC2626] rounded-full text-xs font-semibold py-1.5 px-5 cursor-pointer hover:bg-red-50 transition-colors"
          >
            {/* Close Circle Icon */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Reject Application
          </button>

          {/* Approve button */}
          <button
            onClick={() => onApprove(detail.id)}
            className="flex items-center gap-2 bg-[#16A34A] text-white rounded-full text-xs font-semibold py-1.5 px-5 cursor-pointer hover:bg-[#16A34A]/90 transition-colors"
          >
            {/* Check Circle Icon */}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Approve & Create Account
          </button>
        </div>
      </div>

      {/* 2-Column Grid Layout for Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
        {/* Step 1 — Business Info Card */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
          <div className="pb-3 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-[#111827]">Step 1 — Business Info</h3>
          </div>
          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Business name</span>
              <span className="text-sm font-medium text-[#111827]">{detail.name}</span>
            </div>
            {/* Row 2 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Business Type</span>
              <span className="text-sm font-medium text-[#111827]">{detail.type}</span>
            </div>
            {/* Row 3 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Category</span>
              <span className="text-sm font-medium text-[#111827]">{detail.category}</span>
            </div>
            {/* Row 4 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Sub Category</span>
              <span className="text-sm font-medium text-[#111827]">{detail.category} , Sub category, Sub categpru</span>
            </div>
            {/* Row 5 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">City</span>
              <span className="text-sm font-medium text-[#111827]">{detail.city}</span>
            </div>
            {/* Row 6 */}
            <div className="flex py-3.5 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Address</span>
              <span className="text-sm font-medium text-[#111827]">{detail.address}</span>
            </div>
          </div>
        </div>

        {/* Step 2 — Owner Info Card */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
          <div className="pb-3 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-[#111827]">Step 2 — Owner Info</h3>
          </div>
          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Owner name</span>
              <span className="text-sm font-medium text-[#111827]">{detail.ownerName}</span>
            </div>
            {/* Row 2 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Email</span>
              <a href={`mailto:${detail.email}`} className="text-sm font-medium text-[#2563EB] hover:underline">
                {detail.email}
              </a>
            </div>
            {/* Row 3 */}
            <div className="flex py-3.5 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Phone</span>
              <a href={`tel:${detail.phone}`} className="text-sm font-medium text-[#2563EB] hover:underline">
                {detail.phone}
              </a>
            </div>
          </div>
        </div>

        {/* Step 3 — Additional Info Card */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
          <div className="pb-3 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-[#111827]">Step 3 — Additional Info</h3>
          </div>
          <div className="flex flex-col">
            <div className="flex py-3.5 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Brief description</span>
              <span className="text-sm font-medium text-[#111827]">{detail.description}</span>
            </div>
          </div>
        </div>

        {/* Step 4 — T&C Acceptance Card */}
        <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
          <div className="pb-3 border-b border-gray-200">
            <h3 className="font-semibold text-lg text-[#111827]">Step 4 — T&C Acceptance</h3>
          </div>
          <div className="flex flex-col">
            {/* Row 1 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Accepted</span>
              <span className="text-sm font-semibold text-[#16A34A]">{detail.accepted}</span>
            </div>
            {/* Row 2 */}
            <div className="flex py-3.5 border-b border-gray-200 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Timestamp</span>
              <span className="text-sm font-medium text-[#111827]">{detail.timestamp}</span>
            </div>
            {/* Row 3 */}
            <div className="flex py-3.5 items-start">
              <span className="w-[180px] sm:w-[260px] text-sm font-medium text-[#6B7280] shrink-0">Includes</span>
              <span className="text-sm font-medium text-[#111827]">{detail.includes}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
