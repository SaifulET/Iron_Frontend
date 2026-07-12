"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location05Icon,
  Calendar01Icon,
  ReloadIcon,
  Alert01Icon,
  InformationCircleIcon,
  Car04Icon,
  ArrowDown01Icon,
  Download01Icon,
  Add01Icon,
  ArrowRight02Icon,
  ViewIcon,
  Tick01Icon,
  StarIcon,
} from "@hugeicons/core-free-icons";

interface SuperAdminBusinessDetailProps {
  businessId: string;
  onBack: () => void;
  onSuspend: (id: string) => void;
}

export default function SuperAdminBusinessDetail({
  businessId,
  onBack,
  onSuspend,
}: SuperAdminBusinessDetailProps) {
  const [activeSubTab, setActiveSubTab] = useState("Overview");
  const [isFoundingPartner, setIsFoundingPartner] = useState(true);
  const [adminNotes, setAdminNotes] = useState(
    "Called Maria 12 Jun - wants to expand to Limassol by september. Will follow up in August."
  );
  
  // Collapse states for accordion sections
  const [servicesExpanded, setServicesExpanded] = useState(true);
  const [addonsExpanded, setAddonsExpanded] = useState(true);
  const [staffExpanded, setStaffExpanded] = useState(true);
  const [exemptionsExpanded, setExemptionsExpanded] = useState(true);
  const [newExemptionPhone, setNewExemptionPhone] = useState("");
  const [exemptions, setExemptions] = useState([
    { phone: "+35799112233", hasAccount: true },
    { phone: "+35799223344", hasAccount: false },
    { phone: "+35799334455", hasAccount: true },
  ]);

  const handleAddExemption = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExemptionPhone.trim()) return;
    setExemptions((prev) => [
      ...prev,
      { phone: newExemptionPhone.trim(), hasAccount: false },
    ]);
    setNewExemptionPhone("");
  };

  const handleRemoveExemption = (phone: string) => {
    setExemptions((prev) => prev.filter((item) => item.phone !== phone));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-none pb-12 font-sans text-gray-900">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-[13px] text-[#6B7280]">
        <button onClick={onBack} className="hover:text-gray-900 cursor-pointer bg-transparent border-none p-0">
          Businesses
        </button>
        <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="font-medium text-[#111827]">Glam Studio</span>
      </div>

      {/* Sea Green Protection Banner */}
      <div className="w-full bg-[#2E9DA7] shadow-[0px_1px_2px_rgba(20,30,60,0.08)] rounded-2xl p-6 md:p-8 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative overflow-hidden">
        <div className="flex flex-col gap-2 max-w-[640px]">
          <div className="flex items-center gap-2">
            {/* Shield / Protected Icon */}
            <svg className="w-4 h-4 text-white shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="font-poppins font-semibold text-[10px] sm:text-xs tracking-[1.32px] uppercase">
              Protected by Bookly
            </span>
          </div>
          <h3 className="font-poppins font-semibold text-lg sm:text-xl md:text-2xl leading-snug tracking-tight">
            Total no-show & late-cancellation fees recovered
          </h3>
          <p className="font-poppins font-medium text-xs sm:text-sm text-white/80 leading-relaxed">
            This is money that would have walked out the door for every business on Bookly - recovered automatically since launch, across all 142 clients.
          </p>
        </div>

        {/* Right side metric value */}
        <div className="flex flex-col items-start md:items-end shrink-0">
          <span className="font-poppins font-semibold text-4xl sm:text-5xl text-[#D1F66C] leading-none tracking-tighter">
            €513.50
          </span>
          <span className="font-poppins font-medium text-xs text-white/80 mt-1">
            All time · business-wide
          </span>
        </div>
      </div>

      {/* Business Identity Card */}
      <div className="w-full bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6">
        <div className="flex items-start gap-4 flex-wrap sm:flex-nowrap">
          {/* Avatar GL */}
          <div className="w-16 h-16 rounded-full bg-[#EEF2FF] flex items-center justify-center font-bold text-lg text-[#4338CA] shrink-0 select-none">
            GL
          </div>

          <div className="flex flex-col gap-2 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-sans font-bold text-2xl text-[#111827] tracking-tight">
                Glam Studio
              </h2>
              {/* Active Badge */}
              <div className="flex items-center gap-1 border border-[#148655] bg-[#ECF7F3] text-[#148655] rounded-full text-xs font-semibold py-0.5 px-3">
                <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 shrink-0" />
                <span>Active</span>
              </div>
              {/* Gap Elimination Tag */}
              <div className="border border-[#861464] bg-[#FDF2FA] text-[#861464] rounded-full text-xs font-semibold py-0.5 px-3">
                Gap Elimination
              </div>
              {/* Manual Booking Tag */}
              <div className="border border-[#201486] bg-[#F3F2FD] text-[#201486] rounded-full text-xs font-semibold py-0.5 px-3">
                Manual Booking
              </div>
            </div>

            {/* Sub details row */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs text-[#6B7280]">
              <span>Category</span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={Location05Icon} className="w-3.5 h-3.5 shrink-0" />
                <span>Nicosia</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={Calendar01Icon} className="w-3.5 h-3.5 shrink-0" />
                <span>Member since 12 Jan 2024</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={StarIcon} className="w-3.5 h-3.5 text-[#E49D12] fill-[#E49D12] shrink-0" />
                <span className="font-semibold text-gray-800">4.8</span>
                <span>(124 reviews)</span>
              </div>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span>Last login 2 days ago</span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 w-full sm:w-auto self-end xl:self-auto shrink-0 justify-end">
          <button
            onClick={() => onSuspend(businessId)}
            className="flex items-center justify-center gap-1 px-4 py-2 border border-[#DC2626] text-[#DC2626] rounded-full text-xs font-semibold hover:bg-red-50 cursor-pointer bg-white transition-colors"
          >
            Suspend
          </button>
          
          <button
            onClick={() => setIsFoundingPartner(!isFoundingPartner)}
            className={`flex items-center justify-center gap-1.5 px-4 py-2 border rounded-full text-xs font-semibold cursor-pointer transition-all ${
              isFoundingPartner
                ? "bg-[#2E9DA7]/10 border-[#2E9DA7] text-[#2E9DA7]"
                : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            {isFoundingPartner ? (
              <>
                <svg className="w-3.5 h-3.5 text-[#2E9DA7]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Marked as Founding Partner</span>
              </>
            ) : (
              <span>Mark as Founding Partner</span>
            )}
          </button>
        </div>
      </div>

      {/* Sub-Navigation Tabs */}
      <div className="flex flex-row items-center border-b border-[#E5E7EB] gap-1 w-full overflow-x-auto no-scrollbar shrink-0">
        {["Overview", "Bookings", "Finance", "Issues", "Analytics"].map((tab) => {
          const isActive = activeSubTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveSubTab(tab)}
              className={`h-[38px] px-4 py-2 text-sm font-semibold whitespace-nowrap transition-all border-b border-t-0 border-x-0 cursor-pointer bg-transparent flex items-center justify-center ${
                isActive
                  ? "border-b-2 border-b-[#6366F1] text-[#6366F1]"
                  : "border-b-transparent text-[#6B7280] hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      {activeSubTab === "Overview" && (
        <div className="flex flex-col gap-6 w-full">
          
          {/* Performance Metrics Heading & Filters */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 w-full pt-2">
            <h3 className="font-sans font-semibold text-lg text-[#111827]">
              Performance metrics
            </h3>
            <div className="flex flex-wrap items-center gap-2">
              <select className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1 text-xs font-medium text-[#314158] focus:outline-none">
                <option>Day</option>
              </select>
              <select className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1 text-xs font-medium text-[#314158] focus:outline-none">
                <option>Month</option>
              </select>
              <select className="bg-white border border-[#E2E8F0] rounded-lg px-2.5 py-1 text-xs font-medium text-[#314158] focus:outline-none">
                <option>Year</option>
              </select>
              <div className="bg-[#111111] text-white text-xs font-medium px-3.5 py-1 rounded-md shrink-0">
                All time
              </div>
            </div>
          </div>

          {/* Three Large Cards & Four Smaller Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full">
            {/* Card 1: Total Bookings */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#6B7280]">Total Bookings</span>
              <span className="text-3xl font-bold text-[#195156] mt-1">142</span>
              <span className="text-[11px] text-[#6B7280] mt-1">Jul 2026</span>
            </div>

            {/* Card 2: New Bookings */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#6B7280]">New Bookings</span>
              <span className="text-3xl font-bold text-[#195156] mt-1">4</span>
              <span className="text-[11px] text-[#6B7280] mt-1">First-time customers - activation fee earned</span>
            </div>

            {/* Card 3: Existing Customers */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1">
              <span className="text-xs font-semibold text-[#6B7280]">Total Bookings</span>
              <span className="text-3xl font-bold text-[#195156] mt-1">87</span>
              <span className="text-[11px] text-[#6B7280] mt-1">Existing customers - no Bookly fee</span>
            </div>
          </div>

          {/* Smaller Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
            {/* Return Rate */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-semibold text-[#6B7280]">Return Rate</span>
                <HugeiconsIcon icon={ReloadIcon} className="w-4 h-4 text-gray-400 shrink-0" />
              </div>
              <span className="text-3xl font-bold text-[#195156]">50%</span>
              <span className="text-[11px] text-[#6B7280]">Of new customers who came back</span>
            </div>

            {/* No-shows */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-semibold text-[#6B7280]">No-shows</span>
                <HugeiconsIcon icon={Alert01Icon} className="w-4 h-4 text-gray-400 shrink-0" />
              </div>
              <span className="text-3xl font-bold text-[#195156]">2</span>
              <span className="text-[11px] text-[#6B7280]">Charged 1 - Waived 1</span>
            </div>

            {/* Late Cancellations */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-semibold text-[#6B7280]">Late Cancellations</span>
                <HugeiconsIcon icon={Alert01Icon} className="w-4 h-4 text-gray-400 shrink-0" />
              </div>
              <span className="text-3xl font-bold text-[#195156]">1</span>
              <span className="text-[11px] text-[#6B7280]">1 transaction - fee retained</span>
            </div>

            {/* Free Cancellations */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-1.5">
              <div className="flex justify-between items-center w-full">
                <span className="text-xs font-semibold text-[#6B7280]">Free Cancellations</span>
                <span className="w-4 h-4" />
              </div>
              <span className="text-3xl font-bold text-[#195156]">0</span>
              <span className="text-[11px] text-[#6B7280]">Within free window - no fee</span>
            </div>
          </div>

          {/* Payout Summary Container */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
            {/* Header row */}
            <div className="bg-[#F5F5F5] px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200">
              <h3 className="font-semibold text-base text-[#111111]">Payout Summary</h3>
              <div className="flex items-center gap-2 text-xs">
                <select className="bg-white border border-[#E2E8F0] rounded px-2 py-1 focus:outline-none">
                  <option>Month</option>
                </select>
                <select className="bg-white border border-[#E2E8F0] rounded px-2 py-1 focus:outline-none">
                  <option>Year</option>
                </select>
                <div className="bg-[#111111] text-white px-3 py-1 rounded text-[11px] font-medium cursor-pointer">
                  All time
                </div>
              </div>
            </div>

            {/* Table / 2-Column content */}
            <div className="p-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column: What I owe the business */}
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-sm text-[#111111] pb-2 border-b border-gray-150">What I owe the business</h4>
                <div className="flex flex-col">
                  {/* Row */}
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#1C1B1C]">No-show fees collected</span>
                      <span className="text-xs text-gray-400">1 transaction</span>
                    </div>
                    <span className="font-semibold text-[#1C1B1C]">€20.00</span>
                  </div>
                  {/* Row */}
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#1C1B1C]">Late cancellation fees collected</span>
                      <span className="text-xs text-gray-400">1 transaction</span>
                    </div>
                    <span className="font-semibold text-[#1C1B1C]">€20.00</span>
                  </div>
                  {/* Row */}
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#1C1B1C]">Gross to business</span>
                      <span className="text-xs text-gray-400">2 transactions total</span>
                    </div>
                    <span className="font-semibold text-[#1C1B1C]">€20.00</span>
                  </div>
                  {/* Row */}
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm text-rose-600">
                    <div className="flex flex-col">
                      <span>Stripe fees</span>
                      <span className="text-xs text-rose-400">Actual - pulled from Stripe API</span>
                    </div>
                    <span className="font-semibold">-€0.69</span>
                  </div>
                  {/* Row */}
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm text-rose-600">
                    <div className="flex flex-col">
                      <span>SEPA transfer fee</span>
                      <span className="text-xs text-rose-400">€0.25 flat once per monthly payout</span>
                    </div>
                    <span className="font-semibold">-€0.69</span>
                  </div>
                  {/* Net row */}
                  <div className="flex justify-between py-4 text-base font-bold text-[#195156]">
                    <span>Net to send via SEPA</span>
                    <span>€34.69</span>
                  </div>
                </div>
              </div>

              {/* Right Column: What Bookly earned */}
              <div className="flex flex-col gap-4">
                <h4 className="font-bold text-sm text-[#111111] pb-2 border-b border-gray-150">What Bookly earned</h4>
                <div className="flex flex-col">
                  {/* Row */}
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm">
                    <div className="flex flex-col">
                      <span className="text-[#1C1B1C]">Activation fees collected</span>
                      <span className="text-xs text-gray-400">4 new customers avg €20.00 each</span>
                    </div>
                    <span className="font-semibold text-[#16A34A]">€80.00</span>
                  </div>
                  {/* Row */}
                  <div className="flex justify-between py-2.5 border-b border-gray-100 text-sm text-rose-600">
                    <div className="flex flex-col">
                      <span>Stripe fees</span>
                      <span className="text-xs text-rose-400">Actual - pulled from Stripe API</span>
                    </div>
                    <span className="font-semibold">-€0.69</span>
                  </div>
                  {/* Net revenue */}
                  <div className="flex justify-between py-6 text-xl font-bold text-[#195156] mt-4">
                    <span>Bookly net revenue</span>
                    <span>€34.69</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Information Banner */}
            <div className="mx-6 mb-6 p-4 bg-gray-50 border border-gray-100 rounded-lg flex items-start gap-3">
              <HugeiconsIcon icon={InformationCircleIcon} className="w-5 h-5 text-gray-400 shrink-0 mt-0.5" />
              <p className="text-xs text-gray-500 leading-relaxed">
                Stripe fees vary per transaction based on card origin - EU, UK, international, premium EEA. Exact amounts are pulled from Stripe's API per transaction, never estimated. Total shown here is the sum of actual fees across all transactions in the selected period.
              </p>
            </div>

            {/* Bottom link */}
            <div className="border-t border-gray-100 px-6 py-4 flex justify-end">
              <button className="flex items-center gap-1 text-xs font-semibold text-[#2E9DA7] hover:underline cursor-pointer bg-transparent border-none">
                <span>View full transaction in Finance tab</span>
                <HugeiconsIcon icon={ArrowRight02Icon} className="w-3.5 h-3.5 shrink-0" />
              </button>
            </div>
          </div>

          {/* Integrations & Schedule AND Mobile Coverage row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full">
            {/* Integrations & schedule Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
              <div className="pb-3 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-[#111827]">Integrations & schedule</h3>
              </div>
              <div className="flex flex-col gap-4">
                {/* Opening Hours */}
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#6B7280] uppercase">Opening hours</span>
                  <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                    <span className="text-[#1C1B1C]">Mon - Fri</span>
                    <span className="font-medium text-[#1C1B1C]">09:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                    <span className="text-[#1C1B1C]">Saturday</span>
                    <span className="font-medium text-[#1C1B1C]">09:00 - 19:00</span>
                  </div>
                  <div className="flex justify-between text-sm py-1.5">
                    <span className="text-[#1C1B1C]">Sunday</span>
                    <span className="font-medium text-gray-400">Closed</span>
                  </div>
                </div>

                {/* Google Calendar */}
                <div className="flex flex-col gap-2 pt-2">
                  <span className="text-xs font-semibold text-[#6B7280] uppercase">Google Calendar</span>
                  <div className="flex justify-between items-center py-2.5">
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-[#1C1B1C]">Connected</span>
                      <span className="text-xs text-gray-400">maria@gmail.com - last sync 4 min ago</span>
                    </div>
                    <span className="text-[#16A34A] font-bold text-sm">Connected</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile coverage Card */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
              <div className="pb-3 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <HugeiconsIcon icon={Car04Icon} className="w-5 h-5 text-gray-500 shrink-0" />
                  <h3 className="font-semibold text-lg text-[#111827]">Mobile coverage</h3>
                </div>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <span className="text-xs font-semibold text-[#6B7280] uppercase">Travel fees per city</span>
                  <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                    <span className="text-[#1C1B1C]">Nicosia (Home city)</span>
                    <span className="font-medium text-[#1C1B1C]">€0.00</span>
                  </div>
                  <div className="flex justify-between text-sm py-1.5 border-b border-gray-50">
                    <span className="text-[#1C1B1C]">Larnaca</span>
                    <span className="font-medium text-[#1C1B1C]">€20.00</span>
                  </div>
                  <div className="flex justify-between text-sm py-1.5">
                    <span className="text-[#1C1B1C]">Limassol</span>
                    <span className="font-medium text-[#1C1B1C]">€20.00</span>
                  </div>
                </div>

                <div className="flex justify-between items-center py-4 border-t border-gray-100 mt-2 text-[#195156] font-bold text-lg">
                  <span>Travel fees facilitated</span>
                  <span>€420.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Services Tab Accordion */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
            <button
              onClick={() => setServicesExpanded(!servicesExpanded)}
              className="px-6 py-4 flex justify-between items-center w-full bg-white hover:bg-gray-50 cursor-pointer border-none"
            >
              <span className="font-semibold text-base text-[#111111]">Services - 5 Active</span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                  servicesExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            {servicesExpanded && (
              <div className="border-t border-gray-100 overflow-x-auto w-full">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-gray-55 border-b border-gray-100 font-semibold text-[#6B7280]">
                      <th className="p-4">SERVICE</th>
                      <th className="p-4">DURATION</th>
                      <th className="p-4">PRICE</th>
                      <th className="p-4">BUFFER</th>
                      <th className="p-4">PROCESSING</th>
                      <th className="p-4">PRICING TYPE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50 text-[#111827]">
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-medium">Full colour</td>
                      <td className="p-4">90 min</td>
                      <td className="p-4">€80.00</td>
                      <td className="p-4">10 min</td>
                      <td className="p-4">45 min</td>
                      <td className="p-4"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium">Fixed price</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-medium">Full colour</td>
                      <td className="p-4">90 min</td>
                      <td className="p-4">€80.00</td>
                      <td className="p-4">10 min</td>
                      <td className="p-4">45 min</td>
                      <td className="p-4"><span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded text-[10px] font-medium">Fixed price</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-medium">Full colour</td>
                      <td className="p-4">90 min</td>
                      <td className="p-4">€80.00</td>
                      <td className="p-4">-------</td>
                      <td className="p-4">-------</td>
                      <td className="p-4"><span className="bg-purple-50 text-purple-600 px-2 py-0.5 rounded text-[10px] font-medium">Hourly rate</span></td>
                    </tr>
                    <tr className="hover:bg-gray-50/50">
                      <td className="p-4 font-medium">Full colour</td>
                      <td className="p-4">90 min</td>
                      <td className="p-4">€80.00</td>
                      <td className="p-4">-------</td>
                      <td className="p-4">-------</td>
                      <td className="p-4"><span className="bg-blue-50 text-blue-600 px-2 py-0.5 rounded text-[10px] font-medium">Per person</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Add-ons Tab Accordion */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
            <button
              onClick={() => setAddonsExpanded(!addonsExpanded)}
              className="px-6 py-4 flex justify-between items-center w-full bg-white hover:bg-gray-50 cursor-pointer border-none"
            >
              <span className="font-semibold text-base text-[#111111]">Add-ons - 4 Active</span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                  addonsExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            {addonsExpanded && (
              <div className="border-t border-gray-100 flex flex-col divide-y divide-gray-100">
                {[1, 2, 3, 4].map((item, idx) => (
                  <div key={idx} className="p-4 flex justify-between items-center text-sm hover:bg-gray-50/30">
                    <div className="flex flex-col gap-0.5">
                      <span className="font-medium text-[#111827]">Olaplex treatment</span>
                      <span className="text-xs text-gray-400">
                        {idx === 3 ? "Not assigned to any service" : "Attached to : Full colour - Keratin treatment"}
                      </span>
                    </div>
                    <span className="font-semibold text-[#111827]">€20.00</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Staff Accordion */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
            <button
              onClick={() => setStaffExpanded(!staffExpanded)}
              className="px-6 py-4 flex justify-between items-center w-full bg-white hover:bg-gray-50 cursor-pointer border-none"
            >
              <span className="font-semibold text-base text-[#111111]">Staff - 3 Members</span>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                className={`w-4 h-4 text-gray-500 transition-transform duration-200 shrink-0 ${
                  staffExpanded ? "rotate-180" : ""
                }`}
              />
            </button>
            {staffExpanded && (
              <div className="border-t border-gray-100 flex flex-col divide-y divide-gray-100">
                {[
                  { name: "Maria Stavrou", role: "Owner" },
                  { name: "Maria Stavrou", role: "Supervisor" },
                  { name: "Maria Stavrou", role: "Staff" },
                ].map((member, idx) => (
                  <div key={idx} className="p-4 flex justify-between items-center text-sm hover:bg-gray-50/30">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#EEF2FF] flex items-center justify-center font-bold text-xs text-[#4338CA] shrink-0 select-none">
                        GL
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <span className="font-medium text-[#111827]">{member.name}</span>
                        <span className="text-xs text-gray-400">Attached to : Full colour - Keratin treatment</span>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded text-xs font-semibold ${
                      member.role === "Owner" 
                        ? "bg-sky-50 text-sky-600" 
                        : member.role === "Supervisor" 
                          ? "bg-indigo-50 text-indigo-600" 
                          : "bg-gray-100 text-gray-600"
                    }`}>
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Deposit Exemptions Accordion */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden flex flex-col">
            <div className="px-6 py-4 flex justify-between items-center w-full bg-white border-b border-gray-100">
              <span className="font-semibold text-base text-[#111111]">Deposit Exemptions - {exemptions.length} Numbers</span>
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer bg-white transition-colors">
                  <HugeiconsIcon icon={Download01Icon} className="w-3.5 h-3.5 shrink-0" />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setExemptionsExpanded(!exemptionsExpanded)}
                  className="p-1 hover:bg-gray-50 rounded cursor-pointer bg-transparent border-none"
                >
                  <HugeiconsIcon
                    icon={ArrowDown01Icon}
                    className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
                      exemptionsExpanded ? "rotate-180" : ""
                    }`}
                  />
                </button>
              </div>
            </div>
            {exemptionsExpanded && (
              <div className="flex flex-col p-6 gap-4">
                <p className="text-xs text-gray-400 font-medium">
                  These numbers skip the 20% deposit at this business only. Bookly earns no fee from them.
                </p>

                {/* Exemption list */}
                <div className="flex flex-col gap-3">
                  {exemptions.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center py-2.5 border-b border-gray-50 last:border-b-0">
                      <div className="flex items-center gap-3">
                        <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                          {/* Phone Icon */}
                          <img src="/Icons/phone.svg" className="w-3.5 h-3.5" alt="phone" />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{item.phone}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          item.hasAccount ? "bg-cyan-50 text-cyan-600" : "bg-yellow-50 text-yellow-600"
                        }`}>
                          {item.hasAccount ? "Has Bookly Account" : "No Bookly Account"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleRemoveExemption(item.phone)}
                        className="text-xs font-semibold text-red-500 hover:text-red-700 bg-transparent border-none cursor-pointer"
                      >
                        Remove
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add number form */}
                <form onSubmit={handleAddExemption} className="flex items-center gap-2 mt-2 w-full max-w-md">
                  <input
                    type="text"
                    placeholder="+35656511"
                    value={newExemptionPhone}
                    onChange={(e) => setNewExemptionPhone(e.target.value)}
                    className="flex-grow border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#2E9DA7]"
                  />
                  <button
                    type="submit"
                    className="flex items-center gap-1 bg-[#111111] text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-gray-900 cursor-pointer border-none shrink-0"
                  >
                    <HugeiconsIcon icon={Add01Icon} className="w-3.5 h-3.5 shrink-0" />
                    <span>Add number</span>
                  </button>
                </form>

                <div className="flex justify-end mt-2">
                  <button className="flex items-center gap-1 text-xs font-semibold text-[#2E9DA7] hover:underline cursor-pointer bg-transparent border-none">
                    <span>Show more</span>
                    <HugeiconsIcon icon={ArrowRight02Icon} className="w-3.5 h-3.5 shrink-0" />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cards Grid: Steps Info (Equal height columns) */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
            {/* Step 1 — Business Info */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
              <div className="pb-3 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-[#111827]">Step 1 — Business Info</h3>
              </div>
              <div className="flex flex-col flex-grow justify-between">
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Business name</span>
                  <span className="text-[#111827] font-medium">Glam Studio</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Business Type</span>
                  <span className="text-[#111827] font-medium">Mobile</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Category</span>
                  <span className="text-[#111827] font-medium">Nail Salons</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Sub Category</span>
                  <span className="text-[#111827] font-medium">Nail Salons</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">City</span>
                  <span className="text-[#111827] font-medium">Paphos</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Address</span>
                  <span className="text-[#111827] font-medium">28 Apostolou Pavlou Ave, Paphos 8046</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Reg. number</span>
                  <span className="text-[#111827] font-medium">HE 412859</span>
                </div>
                <div className="flex py-3 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">IBAN</span>
                  <div className="flex items-center gap-1.5">
                    <span className="text-[#111827] font-medium">CY** **** **** **** 3712</span>
                    <HugeiconsIcon icon={ViewIcon} className="w-3.5 h-3.5 text-gray-400 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2 — Owner Info */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
              <div className="pb-3 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-[#111827]">Step 2 — Owner Info</h3>
              </div>
              <div className="flex flex-col">
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Owner name</span>
                  <span className="text-[#111827] font-medium">Elena Georgiou</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Email</span>
                  <span className="text-[#2563EB] font-medium">elena@lunaNails.cy</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Phone</span>
                  <span className="text-[#2563EB] font-medium">+357 99 123456</span>
                </div>
                <div className="flex py-3 border-b border-gray-100 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Last login</span>
                  <span className="text-[#111827] font-medium">2 days ago</span>
                </div>
                <div className="flex py-3 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Verified</span>
                  <span className="text-[#16A34A] font-semibold">✅ Yes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Cards Grid: Steps 3 & 4 */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full items-stretch">
            {/* Step 3 — Additional Info */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
              <div className="pb-3 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-[#111827]">Step 3 — Additional Info</h3>
              </div>
              <div className="flex py-3.5 items-start text-sm">
                <span className="w-[180px] sm:w-[260px] text-[#6B7280] font-medium shrink-0">Brief description</span>
                <span className="text-[#111827] font-medium">Premium nail salon with gel, acrylic & nail art services.</span>
              </div>
            </div>

            {/* Step 4 — T&C Acceptance */}
            <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
              <div className="pb-3 border-b border-gray-200">
                <h3 className="font-semibold text-lg text-[#111827]">Step 4 — T&C Acceptance</h3>
              </div>
              <div className="flex flex-col">
                <div className="flex py-3 border-b border-gray-150 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Accepted</span>
                  <span className="text-[#16A34A] font-bold">✅ Yes</span>
                </div>
                <div className="flex py-3 border-b border-gray-150 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Timestamp</span>
                  <span className="text-[#111827] font-medium">16 May 2026 at 14:31</span>
                </div>
                <div className="flex py-3 text-sm">
                  <span className="w-[160px] sm:w-[200px] text-[#6B7280] font-medium shrink-0">Includes</span>
                  <span className="text-[#111827] font-medium">20% commission clause acknowledged</span>
                </div>
              </div>
            </div>
          </div>

          {/* Admin Notes Section */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center w-full pb-2 border-b border-gray-100">
              <h3 className="font-semibold text-base text-[#111827] uppercase tracking-wider">Admin Notes</h3>
              <span className="text-xs text-gray-400 font-medium">Never visible to the business</span>
            </div>
            <textarea
              value={adminNotes}
              onChange={(e) => setAdminNotes(e.target.value)}
              rows={3}
              className="w-full border border-gray-200 rounded-lg p-3 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] font-sans"
            />
            <div className="flex justify-end gap-2.5">
              <button
                onClick={() => setAdminNotes("Called Maria 12 Jun - wants to expand to Limassol by september. Will follow up in August.")}
                className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-600 border-none cursor-pointer"
              >
                Cancel
              </button>
              <button className="px-4 py-2 rounded-full bg-[#111111] hover:bg-gray-900 text-xs font-semibold text-white border-none cursor-pointer">
                Save
              </button>
            </div>
          </div>

          {/* Activity Log Section */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
            <div className="pb-2 border-b border-gray-100">
              <h3 className="font-semibold text-base text-[#111827] uppercase tracking-wider">Activity Log</h3>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { type: "orange", text: "Booking #BK-0857 confirmed - Sofia Andreou . Full colour . €80.00", time: "2 min ago" },
                { type: "green", text: "Booking #BK-0857 confirmed - Sofia Andreou . Full colour . €80.00", time: "15 min ago" },
                { type: "red", text: "Booking #BK-0857 confirmed - Sofia Andreou . Full colour . €80.00", time: "34 min ago" },
                { type: "orange", text: "Booking #BK-0857 confirmed - Sofia Andreou . Full colour . €80.00", time: "1 hr ago" },
                { type: "green", text: "Booking #BK-0857 confirmed - Sofia Andreou . Full colour . €80.00", time: "2 hr ago" },
              ].map((log, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs sm:text-sm py-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${
                      log.type === "orange" ? "bg-amber-500" : log.type === "green" ? "bg-emerald-500" : "bg-rose-500"
                    }`} />
                    <span className="text-gray-700 font-medium">{log.text}</span>
                  </div>
                  <span className="text-gray-400 shrink-0 ml-4">{log.time}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
