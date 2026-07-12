"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Calendar01Icon,
  User02Icon,
  Mail01Icon,
  MarketingIcon,
  Location05Icon,
  CreditCardPosIcon,
  ArrowRight02Icon,
  Download01Icon
} from "@hugeicons/core-free-icons";

interface SuperAdminCustomerDetailProps {
  customerId: string;
  onBack: () => void;
}

export default function SuperAdminCustomerDetail({
  customerId,
  onBack
}: SuperAdminCustomerDetailProps) {
  // Mock data for Andri Petrou profile
  const customer = {
    id: customerId,
    name: "Andri Petrou",
    initials: "AP",
    email: "example@gmail.com",
    phone: "+357 99 876543",
    gender: "Male",
    memberSince: "12 Jan 2024",
    marketingOptIn: true,
    city: "Nicosia",
    fullAddress: "Full Address",
    cardSaved: "Visa •••• 4242 (exp 09/27) — Stripe managed, full details never shown",
    stats: {
      totalBookings: 14,
      completed: 13,
      noShows: 1,
      upcoming: 2
    },
    relationships: [
      {
        business: "Glam Studio",
        status: "Returning",
        lastBooking: "17 May 2026",
        notes: "Attended"
      },
      {
        business: "Zen Spa Larnaca",
        status: "Returning",
        lastBooking: "2 May 2026",
        notes: "Attended"
      },
      {
        business: "Nails By Maria",
        status: "Returning",
        lastBooking: "20 Apr 2026",
        notes: "No-show (charged)"
      },
      {
        business: "Lara Beauty Bar",
        status: "New",
        lastBooking: "—",
        notes: "No bookings yet"
      }
    ],
    bookingHistory: [
      {
        date: "17 May 2026",
        time: "10:00 AM",
        business: "Glam Studio",
        service: "Full Colour +3 more",
        amount: "€80",
        deposit: "€16",
        status: "Upcoming"
      },
      {
        date: "17 May 2026",
        time: "10:00 AM",
        business: "Zen Spa Larnaca",
        service: "Relaxation Massage",
        amount: "€65",
        deposit: "—",
        status: "Completed"
      },
      {
        date: "17 May 2026",
        time: "10:00 AM",
        business: "Nails By Maria",
        service: "Gel Manicure",
        amount: "€35",
        deposit: "€7",
        status: "No-show"
      },
      {
        date: "17 May 2026",
        time: "10:00 AM",
        business: "Glam Studio",
        service: "Blow Dry",
        amount: "€35",
        deposit: "—",
        status: "Canceled by business"
      },
      {
        date: "17 May 2026",
        time: "10:00 AM",
        business: "Glam Studio",
        service: "Blow Dry",
        amount: "€35",
        deposit: "—",
        status: "Canceled by customer"
      }
    ]
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Upcoming":
        return "bg-indigo-50 text-indigo-600";
      case "Completed":
        return "bg-emerald-50 text-emerald-600";
      case "No-show":
        return "bg-rose-50 text-rose-600";
      case "Canceled by business":
      case "Canceled by customer":
        return "bg-amber-50 text-amber-600 border border-amber-200";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const handleExportHistory = () => {
    // Generate CSV content for booking history
    const headers = ["Date", "Time", "Business", "Service", "Amount", "Deposit", "Status"];
    const rows = customer.bookingHistory.map((hist) => [
      `"${hist.date}"`,
      `"${hist.time}"`,
      `"${hist.business.replace(/"/g, '""')}"`,
      `"${hist.service.replace(/"/g, '""')}"`,
      `"${hist.amount}"`,
      `"${hist.deposit}"`,
      `"${hist.status}"`
    ]);

    const csvContent = [headers.join(","), ...rows.map((row) => row.join(","))].join("\n");

    // Trigger client-side file download
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `booking_history_${customer.name.toLowerCase().replace(/\s+/g, "_")}_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col gap-6 w-full pb-12 font-sans">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
        <button onClick={onBack} className="hover:text-gray-900 transition-colors">
          Customers
        </button>
        <span className="text-gray-300">›</span>
        <span className="text-[#111827]">{customer.name}</span>
      </div>

      {/* Main Profile Header Card */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col md:flex-row items-start gap-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg text-[#4338CA] bg-[#EEF2FF] shrink-0">
          GL
        </div>

        {/* Info Grid */}
        <div className="flex-1 w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full border-b border-gray-100 pb-4 mb-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h2 className="font-bold text-xl text-[#111827]">{customer.name}</h2>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <HugeiconsIcon icon={Calendar01Icon} className="w-3.5 h-3.5" />
                <span>Member since {customer.memberSince}</span>
              </div>
            </div>

            {/* Suspend Button */}
            <button className="px-4 py-1.5 border border-rose-600 rounded-full text-xs font-semibold text-rose-600 hover:bg-rose-50 transition-colors">
              Suspend
            </button>
          </div>

          {/* Details Row */}
          <div className="flex flex-col gap-3 text-xs text-gray-500">
            {/* Inline attributes row */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {/* Gender */}
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={User02Icon} className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{customer.gender}</span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-1.5">
                <img src="/Icons/phone.svg" alt="phone" className="w-3.5 h-3.5 text-gray-400 shrink-0" onError={(e) => {
                  e.currentTarget.style.display = "none";
                }} />
                <span>{customer.phone}</span>
              </div>

              {/* Email */}
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={Mail01Icon} className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{customer.email}</span>
              </div>

              {/* Marketing opt-in */}
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={MarketingIcon} className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>Marketing opt-in: {customer.marketingOptIn ? "✅ Yes" : "❌ No"}</span>
              </div>

              {/* Location */}
              <div className="flex items-center gap-1.5">
                <HugeiconsIcon icon={Location05Icon} className="w-3.5 h-3.5 text-gray-400 shrink-0" />
                <span>{customer.city} • {customer.fullAddress}</span>
              </div>
            </div>

            {/* Credit Card Saved info row */}
            <div className="flex items-center gap-1.5">
              <HugeiconsIcon icon={CreditCardPosIcon} className="w-3.5 h-3.5 text-gray-400 shrink-0" />
              <span className="flex items-center gap-1">
                Card saved: <span className="text-gray-400 mx-1">→</span> {customer.cardSaved}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 w-full">
        {/* Total Bookings */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-500">Total Bookings</span>
          <span className="text-3xl font-bold text-[#6366F1]">{customer.stats.totalBookings}</span>
        </div>

        {/* Completed */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-500">Completed</span>
          <span className="text-3xl font-bold text-[#16A34A]">{customer.stats.completed}</span>
        </div>

        {/* No-Shows */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-500">No-Shows</span>
          <span className="text-3xl font-bold text-[#DC2626]">{customer.stats.noShows}</span>
        </div>

        {/* Upcoming */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-1">
          <span className="text-[13px] font-medium text-gray-500">Upcoming</span>
          <span className="text-3xl font-bold text-[#6366F1]">{customer.stats.upcoming}</span>
        </div>
      </div>

      {/* Customer–Business Relationships */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4 w-full">
        <h3 className="font-semibold text-lg text-[#111827]">Customer–Business Relationships</h3>
        <div className="overflow-x-auto w-full">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-200 text-gray-700 font-semibold">
                <th className="p-4 whitespace-nowrap">Business</th>
                <th className="p-4 text-center whitespace-nowrap">Status</th>
                <th className="p-4 whitespace-nowrap">Last Booking</th>
                <th className="p-4 whitespace-nowrap">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customer.relationships.map((rel, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 font-semibold text-[#6366F1] whitespace-nowrap">{rel.business}</td>
                  <td className="p-4 text-center whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-[11px] font-semibold whitespace-nowrap ${
                      rel.status === "Returning" ? "bg-emerald-50 text-[#16A34A]" : "bg-gray-100 text-gray-600"
                    }`}>
                      {rel.status}
                    </span>
                  </td>
                  <td className="p-4 text-gray-900 font-normal whitespace-nowrap">{rel.lastBooking}</td>
                  <td className="p-4 text-gray-500 font-normal whitespace-nowrap">{rel.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Booking History Section */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4 w-full">
        <div className="flex justify-between items-center w-full">
          <h3 className="font-semibold text-lg text-[#111827]">Booking History</h3>
          <button
            onClick={handleExportHistory}
            className="flex items-center gap-2 bg-[#111111] hover:bg-black text-white px-3 py-1.5 rounded-lg text-[13px] font-medium transition-colors"
          >
            <HugeiconsIcon icon={Download01Icon} className="w-4 h-4" />
            <span>Export CSV</span>
          </button>
        </div>

        <div className="overflow-x-auto w-full">
          <table className="w-full text-left font-sans text-xs border-collapse">
            <thead>
              <tr className="bg-[#F9FAFB] border-b border-gray-200 text-gray-700 font-semibold">
                <th className="p-4 whitespace-nowrap">Date & Time</th>
                <th className="p-4 whitespace-nowrap">Business</th>
                <th className="p-4 whitespace-nowrap">Service</th>
                <th className="p-4 whitespace-nowrap text-center">Amount</th>
                <th className="p-4 whitespace-nowrap text-center">Deposit</th>
                <th className="p-4 whitespace-nowrap text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {customer.bookingHistory.map((hist, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                  <td className="p-4 whitespace-nowrap">
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900 whitespace-nowrap">{hist.date}</span>
                      <span className="text-gray-500 text-[11px] whitespace-nowrap">{hist.time}</span>
                    </div>
                  </td>
                  <td className="p-4 font-semibold text-[#6366F1] whitespace-nowrap">{hist.business}</td>
                  <td className="p-4 text-gray-900 font-normal whitespace-nowrap">{hist.service}</td>
                  <td className="p-4 text-gray-900 font-normal whitespace-nowrap text-center">{hist.amount}</td>
                  <td className="p-4 text-gray-900 font-normal whitespace-nowrap text-center">{hist.deposit}</td>
                  <td className="p-4 whitespace-nowrap text-center">
                    <span className={`inline-block px-2.5 py-1 text-[11px] font-semibold rounded-full whitespace-nowrap ${getStatusBadgeStyle(hist.status)}`}>
                      {hist.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
          <span>Showing 1–5 of 14</span>
          <div className="flex items-center gap-2">
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Previous
            </button>
            <button className="px-3 py-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
