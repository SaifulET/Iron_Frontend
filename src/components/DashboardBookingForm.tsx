"use client";
import NotificationBell from "@/components/notifications/NotificationBell";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  Search01Icon,
  ArrowDown01Icon,
  Calendar03Icon,
  Clock01Icon,
  Cancel01Icon,
  UserCircle02Icon,
  Note02Icon,
  UserIcon
} from "@hugeicons/core-free-icons";

interface Booking {
  clientInitials: string;
  clientName: string;
  clientPhone: string;
  isManual?: boolean;
  isNew?: boolean;
  bookingId: string;
  date: string;
  time: string;
  staff: string;
  status: string;
  amount: string;
  paymentType: string;
}

interface DashboardBookingFormProps {
  isEditingBooking: boolean;
  editingBookingIndex: number | null;
  bookingsData: Booking[];
  setBookingsData: React.Dispatch<React.SetStateAction<Booking[]>>;
  setIsCreatingBooking: (val: boolean) => void;
  setIsEditingBooking: (val: boolean) => void;
  setEditingBookingIndex: (idx: number | null) => void;
  
  newBookingName: string;
  setNewBookingName: (val: string) => void;
  newBookingDob: string;
  setNewBookingDob: (val: string) => void;
  newBookingGender: string;
  setNewBookingGender: (val: string) => void;
  newBookingEmail: string;
  setNewBookingEmail: (val: string) => void;
  newBookingPhoneCode: string;
  setNewBookingPhoneCode: (val: string) => void;
  newBookingPhone: string;
  setNewBookingPhone: (val: string) => void;
  newBookingCity: string;
  setNewBookingCity: (val: string) => void;
  newBookingPropertyType: string;
  setNewBookingPropertyType: (val: string) => void;
  newBookingArea: string;
  setNewBookingArea: (val: string) => void;
  newBookingStreetName: string;
  setNewBookingStreetName: (val: string) => void;
  newBookingStreetNumber: string;
  setNewBookingStreetNumber: (val: string) => void;
  newBookingFloor: string;
  setNewBookingFloor: (val: string) => void;
  newBookingApt: string;
  setNewBookingApt: (val: string) => void;
  newBookingDirections: string;
  setNewBookingDirections: (val: string) => void;
  newBookingServices: Array<{name: string, duration: string, price: number}>;
  setNewBookingServices: React.Dispatch<React.SetStateAction<Array<{name: string, duration: string, price: number}>>>;
  newBookingAddons: Array<{name: string, duration: string, price: number}>;
  setNewBookingAddons: React.Dispatch<React.SetStateAction<Array<{name: string, duration: string, price: number}>>>;
  newBookingStaff: string;
  setNewBookingStaff: (val: string) => void;
  newBookingDate: string;
  setNewBookingDate: (val: string) => void;
  newBookingTime: string;
  setNewBookingTime: (val: string) => void;
  newBookingServiceCity: string;
  setNewBookingServiceCity: (val: string) => void;
  newBookingTags: string[];
  setNewBookingTags: React.Dispatch<React.SetStateAction<string[]>>;
  newBookingNotes: string;
  setNewBookingNotes: (val: string) => void;
}

export default function DashboardBookingForm({
  isEditingBooking,
  editingBookingIndex,
  bookingsData,
  setBookingsData,
  setIsCreatingBooking,
  setIsEditingBooking,
  setEditingBookingIndex,
  newBookingName,
  setNewBookingName,
  newBookingDob,
  setNewBookingDob,
  newBookingGender,
  setNewBookingGender,
  newBookingEmail,
  setNewBookingEmail,
  newBookingPhoneCode,
  setNewBookingPhoneCode,
  newBookingPhone,
  setNewBookingPhone,
  newBookingCity,
  setNewBookingCity,
  newBookingPropertyType,
  setNewBookingPropertyType,
  newBookingArea,
  setNewBookingArea,
  newBookingStreetName,
  setNewBookingStreetName,
  newBookingStreetNumber,
  setNewBookingStreetNumber,
  newBookingFloor,
  setNewBookingFloor,
  newBookingApt,
  setNewBookingApt,
  newBookingDirections,
  setNewBookingDirections,
  newBookingServices,
  setNewBookingServices,
  newBookingAddons,
  setNewBookingAddons,
  newBookingStaff,
  setNewBookingStaff,
  newBookingDate,
  setNewBookingDate,
  newBookingTime,
  setNewBookingTime,
  newBookingServiceCity,
  setNewBookingServiceCity,
  newBookingTags,
  setNewBookingTags,
  newBookingNotes,
  setNewBookingNotes
}: DashboardBookingFormProps) {
  const [isPhoneDropdownOpen, setIsPhoneDropdownOpen] = useState(false);

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] p-6 md:p-8 select-none">
      {/* New/Edit booking Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A] font-poppins">
            {isEditingBooking ? "Edit booking" : "New booking"}
          </h1>
          <p className="text-[11px] text-neutral-500 font-poppins mt-0.5">
            {isEditingBooking ? "Edit booking details for your business" : "Create a new booking for your business"}
          </p>
        </div>
        <NotificationBell />
      </div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-poppins text-neutral-500 mb-6 select-none">
        <button
          onClick={() => {
            setIsCreatingBooking(false);
            setIsEditingBooking(false);
            setEditingBookingIndex(null);
          }}
          className="hover:text-neutral-900 transition-colors flex items-center gap-1"
        >
          <HugeiconsIcon icon={ArrowLeft02Icon} className="w-3 h-3" />
          <span>All Bookings</span>
        </button>
        <span>&gt;</span>
        <span className="text-[#1A1A1A] font-semibold">
          {isEditingBooking ? "Edit Booking" : "New Booking"}
        </span>
      </div>

      {/* Main Form container Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start w-full">
        {/* Left Column - Form */}
        <div className="lg:col-span-8 flex flex-col gap-6 w-full">
          {/* 1. Client Section */}
          <div className="flex flex-col gap-4">
            <span className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-[0.06em] uppercase">
              Client
            </span>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Select client</label>
              <div className="relative w-full h-9">
                <span className="absolute left-3 top-2.5 text-neutral-400">
                  <HugeiconsIcon icon={Search01Icon} className="w-4 h-4 text-[#ABAAA6]" />
                </span>
                <input
                  type="text"
                  placeholder="Type a client name or mobile number or email..."
                  className="w-full h-full pl-9 pr-8 bg-white border border-[#E8E8E6] rounded-lg text-xs font-poppins placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                />
                <span className="absolute right-3 top-2.5">
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 text-[#888780]" />
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Name</label>
              <input
                type="text"
                value={newBookingName}
                onChange={(e) => setNewBookingName(e.target.value)}
                placeholder="John Doe"
                className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Date of birth</label>
                <div className="relative w-full h-9">
                  <span className="absolute left-3 top-2.5">
                    <HugeiconsIcon icon={Calendar03Icon} className="w-4 h-4 text-[#ABAAA6]" />
                  </span>
                  <input
                    type="text"
                    value={newBookingDob}
                    onChange={(e) => setNewBookingDob(e.target.value)}
                    placeholder="1/6/2026"
                    className="w-full h-full pl-9 pr-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Gender</label>
                <div className="relative w-full h-9">
                  <select
                    value={newBookingGender}
                    onChange={(e) => setNewBookingGender(e.target.value)}
                    className="w-full h-full px-3 pr-8 appearance-none bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800 cursor-pointer"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-neutral-500 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* 2. Contact Information Section */}
          <div className="flex flex-col gap-4">
            <span className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-[0.06em] uppercase">
              Contact Information
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Email</label>
                <input
                  type="email"
                  value={newBookingEmail}
                  onChange={(e) => setNewBookingEmail(e.target.value)}
                  placeholder="example@email.com"
                  className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Phone</label>
                <div className="flex items-center">
                  <div className="relative w-24 h-9 shrink-0">
                    <div
                      onClick={() => setIsPhoneDropdownOpen(!isPhoneDropdownOpen)}
                      className="w-full h-full border border-[#E8E8E4] border-r-0 rounded-l-lg bg-white flex items-center justify-between px-2.5 cursor-pointer text-xs font-poppins focus:outline-none select-none"
                    >
                      <div className="flex items-center gap-1.5">
                        <img
                          src={newBookingPhoneCode === "+357" ? "https://flagcdn.com/w20/cy.png" : "https://flagcdn.com/w20/us.png"}
                          alt="flag"
                          className="w-5 h-3.5 object-cover rounded-sm"
                          draggable="false"
                        />
                        <span>{newBookingPhoneCode}</span>
                      </div>
                      <HugeiconsIcon icon={ArrowDown01Icon} className="w-3 h-3 text-neutral-400" />
                    </div>

                    {isPhoneDropdownOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsPhoneDropdownOpen(false)} />
                        <div className="absolute left-0 top-10 z-50 bg-white border border-neutral-200/80 rounded-lg shadow-xl w-36 py-1 flex flex-col text-xs font-poppins animate-fadeIn">
                          <button
                            type="button"
                            onClick={() => {
                              setNewBookingPhoneCode("+357");
                              setIsPhoneDropdownOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-neutral-50 flex items-center gap-2 text-left w-full transition-colors"
                          >
                            <img src="https://flagcdn.com/w20/cy.png" alt="Cyprus flag" className="w-5 h-3.5 object-cover rounded-sm" />
                            <span>Cyprus (+357)</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setNewBookingPhoneCode("+1");
                              setIsPhoneDropdownOpen(false);
                            }}
                            className="px-3 py-2 hover:bg-neutral-50 flex items-center gap-2 text-left w-full transition-colors"
                          >
                            <img src="https://flagcdn.com/w20/us.png" alt="US flag" className="w-5 h-3.5 object-cover rounded-sm" />
                            <span>US (+1)</span>
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                  <input
                    type="text"
                    value={newBookingPhone}
                    onChange={(e) => setNewBookingPhone(e.target.value)}
                    placeholder="1111111111"
                    className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-r-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>
            </div>

            {/* ADDRESS Card */}
            <div className="border border-neutral-200/80 rounded-xl p-5 flex flex-col gap-4 bg-white shadow-sm mt-2">
              <span className="font-poppins text-xs font-bold text-[#5F5E5A] tracking-wider uppercase">ADDRESS</span>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">City *</label>
                <div className="relative w-full h-9">
                  <select
                    value={newBookingCity}
                    onChange={(e) => setNewBookingCity(e.target.value)}
                    className="w-full h-full px-3 pr-8 appearance-none bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800 cursor-pointer"
                  >
                    <option value="Limasol">Limasol</option>
                    <option value="Larnaca">Larnaca</option>
                    <option value="Nicosia">Nicosia</option>
                    <option value="Paphos">Paphos</option>
                  </select>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-neutral-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Property type *</label>
                <div className="relative w-full h-9">
                  <select
                    value={newBookingPropertyType}
                    onChange={(e) => setNewBookingPropertyType(e.target.value)}
                    className="w-full h-full px-3 pr-8 appearance-none bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800 cursor-pointer"
                  >
                    <option value="">Select property type</option>
                    <option value="House">House</option>
                    <option value="Apartment">Apartment</option>
                    <option value="Hotel">Hotel</option>
                    <option value="Office">Office</option>
                  </select>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-neutral-500 pointer-events-none" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Area/neighborhood *</label>
                <input
                  type="text"
                  value={newBookingArea}
                  onChange={(e) => setNewBookingArea(e.target.value)}
                  placeholder="e.g. Mackenzie, finikoudes"
                  className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Street name *</label>
                  <input
                    type="text"
                    value={newBookingStreetName}
                    onChange={(e) => setNewBookingStreetName(e.target.value)}
                    placeholder="e.g. Emrou"
                    className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Street number *</label>
                  <input
                    type="text"
                    value={newBookingStreetNumber}
                    onChange={(e) => setNewBookingStreetNumber(e.target.value)}
                    placeholder="e.g. 14"
                    className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Floor /unit</label>
                  <input
                    type="text"
                    value={newBookingFloor}
                    onChange={(e) => setNewBookingFloor(e.target.value)}
                    placeholder="e.g. 3rd floor"
                    className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Apt/room no.</label>
                  <input
                    type="text"
                    value={newBookingApt}
                    onChange={(e) => setNewBookingApt(e.target.value)}
                    placeholder="e.g. 5"
                    className="w-full h-9 px-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Additional directions</label>
                <textarea
                  value={newBookingDirections}
                  onChange={(e) => setNewBookingDirections(e.target.value)}
                  placeholder="e.g. Blue gate on the left, ring twice. Hotel name if applicable. Parking availale in front."
                  rows={3}
                  className="w-full p-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800 resize-none leading-relaxed text-[#111111]"
                />
              </div>
            </div>
          </div>

          {/* 3. Service Section */}
          <div className={`flex flex-col gap-4 ${isEditingBooking ? "opacity-40 pointer-events-none select-none" : ""}`}>
            <span className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-[0.06em] uppercase">
              Service
            </span>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Select service</label>
              <div className="relative w-full h-9">
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && !newBookingServices.some((s) => s.name === val)) {
                      setNewBookingServices([...newBookingServices, { name: val, duration: "30 min", price: 90 }]);
                    }
                    e.target.value = "";
                  }}
                  defaultValue=""
                  className="w-full h-full px-3 pr-8 appearance-none bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800 cursor-pointer text-[#ABAAA6] font-medium"
                >
                  <option value="">Choose a service...</option>
                  <option value="Haircut">Haircut (€90, 30 min)</option>
                  <option value="Beard Trim">Beard Trim (€30, 15 min)</option>
                  <option value="Shampoo & Style">Shampoo & Style (€45, 20 min)</option>
                </select>
                <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            {/* Added services list */}
            {newBookingServices.map((svc, sIdx) => (
              <div
                key={sIdx}
                className="bg-white border border-neutral-200/50 rounded-xl p-4 flex items-center justify-between shadow-sm select-none"
              >
                <div className="flex flex-col">
                  <span className="font-inter font-medium text-[17px] text-[#0D0D0D]">{svc.name}</span>
                  <span className="font-inter text-xs text-[#767676] mt-0.5">{svc.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-inter font-medium text-lg text-[#0D0D0D]">€ {svc.price}</span>
                  <button
                    onClick={() => setNewBookingServices(newBookingServices.filter((_, i) => i !== sIdx))}
                    className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4 text-[#0C0C0C]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 4. Add-ons Section */}
          <div className={`flex flex-col gap-4 ${isEditingBooking ? "opacity-40 pointer-events-none select-none" : ""}`}>
            <span className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-[0.06em] uppercase">
              Add-ons
            </span>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Select add-ons</label>
              <div className="relative w-full h-9">
                <select
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val && !newBookingAddons.some((a) => a.name === val)) {
                      setNewBookingAddons([...newBookingAddons, { name: val, duration: "30 min", price: 90 }]);
                    }
                    e.target.value = "";
                  }}
                  defaultValue=""
                  className="w-full h-full px-3 pr-8 appearance-none bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800 cursor-pointer text-[#ABAAA6] font-medium"
                >
                  <option value="">Choose add-ons...</option>
                  <option value="Hair Washing">Hair Washing (€15, 10 min)</option>
                  <option value="Scalp Massage">Scalp Massage (€25, 15 min)</option>
                  <option value="Hot Towel Treatment">Hot Towel Treatment (€20, 10 min)</option>
                </select>
                <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 absolute right-2.5 top-2.5 text-neutral-500 pointer-events-none" />
              </div>
            </div>

            {/* Added add-ons list */}
            {newBookingAddons.map((addon, aIdx) => (
              <div
                key={aIdx}
                className="bg-white border border-neutral-200/50 rounded-xl p-4 flex items-center justify-between shadow-sm select-none"
              >
                <div className="flex flex-col">
                  <span className="font-inter font-medium text-[17px] text-[#0D0D0D]">{addon.name}</span>
                  <span className="font-inter text-xs text-[#767676] mt-0.5">{addon.duration}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-inter font-medium text-lg text-[#0D0D0D]">€ {addon.price}</span>
                  <button
                    onClick={() => setNewBookingAddons(newBookingAddons.filter((_, i) => i !== aIdx))}
                    className="w-6 h-6 rounded-full hover:bg-neutral-100 flex items-center justify-center transition-all"
                  >
                    <HugeiconsIcon icon={Cancel01Icon} className="w-4 h-4 text-[#0C0C0C]" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 5. Staff Section */}
          <div className="flex flex-col gap-3">
            <span className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-[0.06em] uppercase">
              Staff
            </span>
            <div className="flex flex-wrap gap-4 select-none">
              {["Basel", "Anna", "George", "Andreas", "Vivi"].map((staffName) => {
                const isSelected = newBookingStaff === staffName;
                return (
                  <button
                    key={staffName}
                    onClick={() => setNewBookingStaff(staffName)}
                    className={`bg-white px-3 py-2 border rounded-xl flex items-center gap-3 transition-all min-w-[120px] shadow-sm ${
                      isSelected ? "border-[#000000] ring-1 ring-black" : "border-neutral-200 hover:border-neutral-400"
                    }`}
                  >
                    <div className="w-6 h-6 rounded-full bg-[#D9D9D9] flex items-center justify-center text-[10px] font-bold text-neutral-600 shrink-0">
                      {staffName.charAt(0)}
                    </div>
                    <div className="flex flex-col items-start leading-none">
                      <span className="text-[13px] font-semibold text-[#0D0D0D]">{staffName}</span>
                      <span className="text-[9px] text-neutral-500 mt-0.5">Hair Stylist</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 6. Date & Time Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Date</label>
              <div className="relative w-full h-9">
                <span className="absolute left-3 top-2.5">
                  <HugeiconsIcon icon={Calendar03Icon} className="w-4 h-4 text-[#ABAAA6]" />
                </span>
                <input
                  type="text"
                  value={newBookingDate}
                  onChange={(e) => setNewBookingDate(e.target.value)}
                  placeholder="Apr 3, 2026"
                  className="w-full h-full pl-9 pr-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Time</label>
              <div className="relative w-full h-9">
                <span className="absolute left-3 top-2.5">
                  <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-[#ABAAA6]" />
                </span>
                <input
                  type="text"
                  value={newBookingTime}
                  onChange={(e) => setNewBookingTime(e.target.value)}
                  placeholder="10:00 AM"
                  className="w-full h-full pl-9 pr-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800"
                />
              </div>
            </div>
          </div>

          {/* 7. City for this Service */}
          <div className="flex flex-col gap-3">
            <span className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-[0.06em] uppercase">
              City for this service
            </span>
            <div className="flex flex-wrap gap-2">
              {["Larnaca", "Limassol", "Nicosia", "Paphos", "Ayia Napa", "Protaras"].map((cName) => {
                const isSelected = newBookingServiceCity === cName;
                return (
                  <button
                    key={cName}
                    onClick={() => setNewBookingServiceCity(cName)}
                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all shadow-sm ${
                      isSelected
                        ? "bg-[#3A97D1] text-white"
                        : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                    }`}
                  >
                    {cName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 8. Client Tags */}
          <div className="flex flex-col gap-3">
            <span className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-[0.06em] uppercase">
              Client tags
            </span>
            <div className="flex flex-wrap gap-2">
              {["VIP", "Regular", "New", "No-show"].map((tagName) => {
                const isSelected = newBookingTags.includes(tagName);
                return (
                  <button
                    key={tagName}
                    onClick={() => {
                      if (isSelected) {
                        setNewBookingTags(newBookingTags.filter((t) => t !== tagName));
                      } else {
                        setNewBookingTags([...newBookingTags, tagName]);
                      }
                    }}
                    className={`px-3.5 py-1 text-xs font-medium rounded-full border transition-all ${
                      isSelected
                        ? "bg-[#FAEEDA] border-[#633806] text-[#633806] font-semibold"
                        : "bg-white border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                    }`}
                  >
                    {tagName}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 9. Notes */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-[#5F5E5A] font-poppins">Notes</label>
            <textarea
              value={newBookingNotes}
              onChange={(e) => setNewBookingNotes(e.target.value)}
              placeholder="Add notes visible to staff only.."
              rows={3}
              className="w-full p-3 bg-white border border-[#E8E8E4] rounded-lg text-xs font-poppins focus:outline-none focus:border-neutral-800 resize-none leading-relaxed text-[#111111]"
            />
          </div>
        </div>

        {/* Right Column - Summary */}
        <div className="lg:col-span-4 flex flex-col gap-6 w-full lg:sticky lg:top-4">
          <div className="bg-white border border-neutral-200/80 rounded-xl p-5 shadow-sm flex flex-col gap-5 select-none">
            <h3 className="text-sm font-semibold text-[#0F1E35] font-poppins">Booking summary</h3>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={UserCircle02Icon} className="w-5 h-5 text-neutral-400 shrink-0" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 font-poppins">
                    Client
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A1A] mt-1">
                    {newBookingName || "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={Note02Icon} className="w-5 h-5 text-neutral-400 shrink-0" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 font-poppins">
                    Service
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A1A] mt-1">
                    {newBookingServices.map((s) => s.name).join(", ") || "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={Calendar03Icon} className="w-5 h-5 text-neutral-400 shrink-0" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 font-poppins">
                    Date
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A1A] mt-1">
                    {newBookingDate || "Mon 18 May"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={Clock01Icon} className="w-5 h-5 text-neutral-400 shrink-0" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 font-poppins">
                    Time
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A1A] mt-1">
                    {newBookingTime || "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={UserIcon} className="w-5 h-5 text-neutral-400 shrink-0" />
                <div className="flex flex-col leading-none">
                  <span className="text-[10px] uppercase font-semibold text-neutral-400 font-poppins">
                    Staff
                  </span>
                  <span className="text-xs font-semibold text-[#1A1A1A] mt-1">
                    {newBookingStaff || "—"}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 pt-4 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-neutral-500 font-poppins">
                <span>Service total</span>
                <span>
                  € {newBookingServices.reduce((sum, s) => sum + s.price, 0) + newBookingAddons.reduce((sum, a) => sum + a.price, 0)}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm font-semibold text-[#1A1A1A] font-poppins">
                <span>Balance due</span>
                <span>
                  € {newBookingServices.reduce((sum, s) => sum + s.price, 0) + newBookingAddons.reduce((sum, a) => sum + a.price, 0)}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2.5 mt-2">
              <button
                onClick={() => {
                  const totalAmount = newBookingServices.reduce((sum, s) => sum + s.price, 0) + newBookingAddons.reduce((sum, a) => sum + a.price, 0);
                  if (isEditingBooking && editingBookingIndex !== null) {
                    const updated = [...bookingsData];
                    updated[editingBookingIndex] = {
                      ...updated[editingBookingIndex],
                      clientName: newBookingName,
                      clientPhone: `${newBookingPhoneCode} ${newBookingPhone}`,
                      clientInitials: newBookingName
                        .split(" ")
                        .map((w) => w.charAt(0))
                        .join("")
                        .toUpperCase()
                        .substring(0, 2) || "NK",
                      date: newBookingDate,
                      time: newBookingTime,
                      staff: newBookingStaff,
                      amount: `€${totalAmount}`,
                    };
                    setBookingsData(updated);
                  } else {
                    const newBooking = {
                      clientName: newBookingName,
                      clientPhone: `${newBookingPhoneCode} ${newBookingPhone}`,
                      clientInitials: newBookingName
                        .split(" ")
                        .map((w) => w.charAt(0))
                        .join("")
                        .toUpperCase()
                        .substring(0, 2) || "NK",
                      isNew: true,
                      bookingId: `#BK-00${Math.floor(Math.random() * 90) + 10}`,
                      date: newBookingDate,
                      time: newBookingTime,
                      staff: newBookingStaff,
                      status: "Upcoming",
                      amount: `€${totalAmount}`,
                      paymentType: "Pay at venue"
                    };
                    setBookingsData([newBooking, ...bookingsData]);
                  }
                  setIsCreatingBooking(false);
                  setIsEditingBooking(false);
                  setEditingBookingIndex(null);
                }}
                className="w-full py-2.5 bg-[#111111] hover:bg-neutral-800 text-white rounded-lg text-xs font-semibold transition-all font-poppins shadow-sm"
              >
                {isEditingBooking ? "Save booking" : "Create booking"}
              </button>
              <button
                onClick={() => {
                  setIsCreatingBooking(false);
                  setIsEditingBooking(false);
                  setEditingBookingIndex(null);
                }}
                className="w-full py-2.5 border border-neutral-300 hover:bg-neutral-50 text-neutral-700 bg-white rounded-lg text-xs font-semibold transition-all font-poppins shadow-sm"
              >
                Cancel
              </button>
            </div>

            <p className="text-[10px] text-neutral-400 text-center leading-normal font-poppins">
              Fill in all required fields to continue
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
