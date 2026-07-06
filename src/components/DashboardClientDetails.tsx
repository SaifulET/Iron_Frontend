"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BellIcon,
  ArrowLeft02Icon,
  PencilEdit02Icon,
  Camera01Icon,
  UserIcon,
  Mail01Icon,
  IdentityCardIcon,
  Home03Icon,
  ArrowDown01Icon,
  Search01Icon
} from "@hugeicons/core-free-icons";
import ClientBookingHistoryCard from "@/components/ClientBookingHistoryCard";

interface DashboardClientDetailsProps {
  clientFirstName: string;
  clientLastName: string;
  clientEmail: string;
  clientGender: string;
  clientDob: string;
  clientPhone: string;
  clientCity: string;
  clientPropertyType: string;
  clientArea: string;
  clientStreetName: string;
  clientStreetNumber: string;
  clientFloor: string;
  clientAptNo: string;
  setIsViewingClient: (val: boolean) => void;
  setEditingClientIndex: (idx: number | null) => void;
}

export default function DashboardClientDetails({
  clientFirstName,
  clientLastName,
  clientEmail,
  clientGender,
  clientDob,
  clientPhone,
  clientCity,
  clientPropertyType,
  clientArea,
  clientStreetName,
  clientStreetNumber,
  clientFloor,
  clientAptNo,
  setIsViewingClient,
  setEditingClientIndex
}: DashboardClientDetailsProps) {
  const [viewClientTab, setViewClientTab] = useState("PROFILE");
  const [historySearch, setHistorySearch] = useState("");

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] relative">
      {/* Client Info Header */}
      <div className="h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 flex items-center justify-between shrink-0 select-none">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A] font-poppins">Client Info</h1>
          <p className="text-[11px] text-neutral-500 font-poppins mt-0.5">View client information in details</p>
        </div>
        {/* Notification bell */}
        <div className="relative">
          <button className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm">
            <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
          </button>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white">
            5
          </span>
        </div>
      </div>

      {/* Scrollable Container */}
      <div className="flex-1 p-6 md:p-8 xl:p-10 flex flex-col gap-6 w-full max-w-[1095px] mx-auto">
        {/* Back / Breadcrumbs */}
        <div
          onClick={() => {
            setIsViewingClient(false);
            setEditingClientIndex(null);
          }}
          className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-500 hover:text-neutral-900 font-poppins select-none"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4 text-neutral-600" />
          <span>Clients</span>
          <span className="text-neutral-300 font-normal">&gt;</span>
          <span className="text-[#0F1E35] font-semibold">View</span>
        </div>

        {/* Tabs Header bar */}
        <div className="flex flex-row items-center border-b border-[#666666] w-full h-[54px] select-none">
          <button
            onClick={() => setViewClientTab("PROFILE")}
            className={`flex flex-row justify-center items-center px-5 h-[54px] gap-2.5 transition-all ${
              viewClientTab === "PROFILE" ? "border-b-4 border-black text-[#111111]" : "text-[#111111]/60"
            }`}
          >
            <span className="font-poppins font-normal text-sm tracking-[0.09em] uppercase">Profile</span>
          </button>
          <button
            onClick={() => setViewClientTab("HISTORY")}
            className={`flex flex-row justify-center items-center px-5 h-[54px] gap-2.5 transition-all ${
              viewClientTab === "HISTORY" ? "border-b-4 border-black text-[#111111]" : "text-[#111111]/60"
            }`}
          >
            <span className="font-poppins font-normal text-sm tracking-[0.09em] uppercase">History</span>
          </button>
        </div>

        {/* Profile Card / Tab Content */}
        {viewClientTab === "PROFILE" ? (
          <div className="flex flex-col w-full bg-[#FFFFFF] border border-[#ECEBEF] rounded-2xl p-6 md:p-8 gap-6 shadow-sm">
            {/* Edit button */}
            <div className="flex justify-end w-full">
              <button
                onClick={() => setIsViewingClient(false)}
                className="bg-[#0D0D0D] hover:bg-neutral-800 text-white rounded-lg px-4 py-2 text-xs font-semibold font-poppins flex items-center justify-center gap-1.5 transition-all shadow-sm"
              >
                <HugeiconsIcon icon={PencilEdit02Icon} className="w-4 h-4 text-white" />
                <span>Edit</span>
              </button>
            </div>

            {/* Profile Avatar section */}
            <div className="flex items-center gap-6">
              <div className="relative w-[120px] h-[120px] rounded-full border border-neutral-200 overflow-hidden shadow-sm shrink-0">
                <img
                  src="/businessDashboard/downLogo.png"
                  alt="Client Avatar"
                  className="w-full h-full object-cover"
                />
                <div className="absolute right-1 bottom-1 w-8 h-8 bg-[#F1F1F4] border border-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:bg-neutral-200 transition-colors">
                  <HugeiconsIcon icon={Camera01Icon} className="w-4 h-4 text-[#454070]" />
                </div>
              </div>
            </div>

            {/* Form fields Grid */}
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6 mt-4">
              {/* NAME */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Name</label>
                <div className="flex items-center gap-3 border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <HugeiconsIcon icon={UserIcon} className="w-5 h-5 text-[#111111]" />
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {`${clientFirstName} ${clientLastName}`.trim() || "John Doe"}
                  </span>
                </div>
              </div>

              {/* EMAIL */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Email</label>
                <div className="flex items-center gap-3 border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <HugeiconsIcon icon={Mail01Icon} className="w-5 h-5 text-[#111111]" />
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientEmail || "example@gmail.com"}
                  </span>
                </div>
              </div>

              {/* GENDER */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Gender</label>
                <div className="flex items-center border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientGender || "Male"}
                  </span>
                </div>
              </div>

              {/* DATE OF BIRTH */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Date of Birth</label>
                <div className="flex items-center gap-3 border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <HugeiconsIcon icon={IdentityCardIcon} className="w-5 h-5 text-[#111111]" />
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientDob || "1/1/2026"}
                  </span>
                </div>
              </div>

              {/* CONTACT */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Contact</label>
                <div className="flex items-center gap-3 border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <img src="/Icons/phone.svg" alt="Phone" className="w-5 h-5 object-contain" />
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientPhone || "+1 265 665 2266"}
                  </span>
                </div>
              </div>

              {/* CITY */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">City</label>
                <div className="flex items-center gap-3 border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <HugeiconsIcon icon={Home03Icon} className="w-5 h-5 text-[#111111]" />
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientCity || "Nicosia"}
                  </span>
                </div>
              </div>

              {/* PROPERTY TYPE */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Property Type</label>
                <div className="flex items-center border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientPropertyType || "Vila"}
                  </span>
                </div>
              </div>

              {/* AREA/NEIGHBOURHOOD */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Area/Neighbourhood</label>
                <div className="flex items-center border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientArea || "Mackenji"}
                  </span>
                </div>
              </div>

              {/* STREET NAME */}
              <div className="md:col-span-3 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Street Name</label>
                <div className="flex items-center border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientStreetName || "Emrou"}
                  </span>
                </div>
              </div>

              {/* STREET ADDRESS */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Street Address</label>
                <div className="flex items-center border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientStreetNumber || "14"}
                  </span>
                </div>
              </div>

              {/* FLOOR/UNIT */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Floor/Unit</label>
                <div className="flex items-center border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientFloor || "4"}
                  </span>
                </div>
              </div>

              {/* APT/ROOM NO */}
              <div className="md:col-span-2 flex flex-col gap-2">
                <label className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-[0.09em]">Apt/Room No</label>
                <div className="flex items-center border border-[#ECEBEF] rounded-xl px-4 bg-[#FFFFFF] h-[60px] w-full select-none">
                  <span className="font-poppins text-sm font-semibold text-[#111111]">
                    {clientAptNo || "5"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {/* Filters Row */}
            <div className="flex flex-wrap items-center justify-end gap-3 w-full animate-fadeIn">
              {/* Month Select */}
              <div className="relative">
                <select className="appearance-none bg-white border border-neutral-900 rounded-xl px-4 py-2 pr-8 text-xs font-poppins font-medium text-[#111111] h-10 focus:outline-none cursor-pointer">
                  <option>Month</option>
                  <option>May</option>
                  <option>June</option>
                </select>
                <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-3 top-3.5 text-neutral-500 pointer-events-none" />
              </div>
              {/* Year Select */}
              <div className="relative">
                <select className="appearance-none bg-white border border-neutral-900 rounded-xl px-3 py-2 pr-7 text-xs font-poppins font-medium text-[#111111] h-10 focus:outline-none cursor-pointer">
                  <option>Year</option>
                  <option>2026</option>
                  <option>2025</option>
                </select>
                <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-3.5 text-neutral-500 pointer-events-none" />
              </div>
              {/* Status Select */}
              <div className="relative">
                <select className="appearance-none bg-white border border-neutral-900 rounded-xl px-4 py-2 pr-8 text-xs font-poppins font-medium text-[#111111] h-10 focus:outline-none cursor-pointer">
                  <option>Status</option>
                  <option>Upcoming</option>
                  <option>Completed</option>
                  <option>No-show - charged</option>
                  <option>No-show - cancelled</option>
                  <option>No-show - waived</option>
                  <option>Cancelled by customer</option>
                  <option>Cancelled by business</option>
                  <option>Late cancellation</option>
                  <option>Pending</option>
                </select>
                <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-3 top-3.5 text-neutral-500 pointer-events-none" />
              </div>
              {/* Search bar */}
              <div className="flex items-center gap-2 bg-[#EBEBEB] rounded-xl px-3.5 py-2 h-10 w-[207px] shrink-0">
                <HugeiconsIcon icon={Search01Icon} className="w-5 h-5 text-[#666666]" />
                <input
                  type="text"
                  value={historySearch}
                  onChange={(e) => setHistorySearch(e.target.value)}
                  placeholder="Search booking ID..."
                  className="bg-transparent text-xs placeholder-[#666666] text-[#111111] focus:outline-none w-full font-poppins"
                />
              </div>
            </div>

            {/* Main History Cards Stream */}
            <div className="flex flex-col gap-4 w-full">
              
              {/* CARD 1: Upcoming Booking #BK-0035 */}
              <ClientBookingHistoryCard
                bookingId="#BK-0035"
                status="Upcoming"
                statusType="upcoming"
                clientName={`${clientFirstName} ${clientLastName}`.trim() || "John Doe"}
                clientGender={clientGender || "Male"}
                clientEmail={clientEmail || "sdf@gmail.com"}
                clientPhone={clientPhone || "+123 566 889"}
                isNewClient={true}
                dateText="Saturday, May 9"
                timeText="10:00 - 11:20 AM"
                durationText="1 hr 20 min"
                staffName="George"
                staffRole="Barber"
                rescheduleText="Reschedule 1 of 2"
                serviceName="YARD Beard Package"
                serviceDetailText="Express Facial · Shave · Wax · 1 hr, 20 min"
                servicePrice="€20"
                addonsName="Add-ons"
                addonsDetailText="Hair wash (flat fee) · Scalp treatment (flat fee)"
                addonsPrice="€20"
                depositedAmount="€8"
                remainingBalance="€32"
                clientNotesText="Please use organic products only, allergic to strong fragrances"
                showClientDetails={true}
                showDateTimeDetails={true}
                showSummaryDetails={true}
                showNotesDetails={true}
              />

              {/* CARD 2: No-show Booking #BK-0034 */}
              <ClientBookingHistoryCard
                bookingId="#BK-0034"
                status="No-show · Charged"
                statusType="noshow"
                clientName={`${clientFirstName} ${clientLastName}`.trim() || "John Doe"}
                clientGender={clientGender || "Male"}
                clientEmail={clientEmail || "sdf@gmail.com"}
                clientPhone={clientPhone || "+123 566 889"}
                isNewClient={true}
                dateText="Saturday, May 9"
                timeText="10:00 - 11:20 AM"
                durationText="1 hr 20 min"
                staffName="George"
                staffRole="Barber"
                rescheduleText="Reschedule 1 of 2"
                serviceName="YARD Beard Package"
                serviceDetailText="Express Facial · Shave · Wax · 1 hr, 20 min"
                servicePrice="€20"
                addonsName="Add-ons"
                addonsDetailText="Hair wash (flat fee) · Scalp treatment (flat fee)"
                addonsPrice="€20"
                depositedAmount="-"
                remainingBalance="€40"
                clientNotesText="Please use organic products only, allergic to strong fragrances"
                businessNotesText="Customer did not attend"
                addressText="Please use organic products only, allergic to strong fragrances"
                showClientDetails={true}
                showDateTimeDetails={true}
                showSummaryDetails={true}
                showNotesDetails={true}
              />

            </div>
          </div>
        )}
      </div>
    </main>
  );
}
