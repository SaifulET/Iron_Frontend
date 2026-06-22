"use client";

import React from "react";
import dynamic from "next/dynamic";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

// Dynamically import the map to avoid SSR issues with Leaflet
const BusinessMap = dynamic(() => import("./BusinessMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[320px] sm:h-[400px] md:h-[485px] bg-[#FCFAF9] border border-[#E8E8E4] rounded-2xl flex items-center justify-center">
      <div className="text-center">
        <div className="w-10 h-10 border-4 border-[#8EBAC5] border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
        <p className="text-sm text-[#4D4D4D]">Loading map engine...</p>
      </div>
    </div>
  ),
});

export interface BusinessFormStep1Props {
  emailParam: string;
  businessName: string;
  setBusinessName: (val: string) => void;
  ownerName: string;
  setOwnerName: (val: string) => void;
  city: string;
  setCity: (val: string) => void;
  countryCode: string;
  setCountryCode: (val: string) => void;
  mobileNumber: string;
  setMobileNumber: (val: string) => void;
  area: string;
  setArea: (val: string) => void;
  streetName: string;
  setStreetName: (val: string) => void;
  streetNumber: string;
  setStreetNumber: (val: string) => void;
  floorUnit: string;
  setFloorUnit: (val: string) => void;
  aptRoom: string;
  setAptRoom: (val: string) => void;
  briefDesc: string;
  setBriefDesc: (val: string) => void;
  coordinates: { lat: number; lng: number };
  setCoordinates: (coords: { lat: number; lng: number }) => void;
  searchQuery: string;
  setSearchQuery: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function BusinessFormStep1({
  emailParam,
  businessName,
  setBusinessName,
  ownerName,
  setOwnerName,
  city,
  setCity,
  countryCode,
  setCountryCode,
  mobileNumber,
  setMobileNumber,
  area,
  setArea,
  streetName,
  setStreetName,
  streetNumber,
  setStreetNumber,
  floorUnit,
  setFloorUnit,
  aptRoom,
  setAptRoom,
  briefDesc,
  setBriefDesc,
  coordinates,
  setCoordinates,
  searchQuery,
  setSearchQuery,
  onSubmit,
}: BusinessFormStep1Props) {
  return (
    <div className="w-full max-w-[973px] flex flex-col items-center gap-[72px]">
      {/* Header */}
      <div className="flex flex-col items-center text-center gap-2">
        <h1 className="text-[28px] font-medium text-[#262626] tracking-tight leading-9">
          Business Form
        </h1>
        <p className="text-sm font-normal text-[#4D4D4D] leading-5 tracking-wide">
          Fill up this information so that you can set up your business
        </p>
      </div>

      {/* Form Fields */}
      <form onSubmit={onSubmit} className="w-full flex flex-col gap-10">

        {/* Business & Owner Names */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-normal text-[#111111]">Business Name *</label>
            <input
              type="text"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              required
              placeholder="Business Name"
              className="w-full h-[52px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-1.5 text-base text-[#212121] placeholder-[#212121]/50 focus:outline-none focus:border-[#8EBAC5]"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-normal text-[#111111]">Owner Name *</label>
            <input
              type="text"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              required
              placeholder="Owner Name"
              className="w-full h-[52px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-1.5 text-base text-[#212121] placeholder-[#212121]/50 focus:outline-none focus:border-[#8EBAC5]"
            />
          </div>
        </div>

        {/* Email & City */}
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="flex-1 flex flex-col gap-2">
            <label className="text-sm font-normal text-[#111111]">Email *</label>
            <input
              type="email"
              value={emailParam}
              disabled
              className="w-full h-12 bg-[#E0E0E0] rounded-xl px-4 py-3.5 text-sm text-[#808080] font-normal cursor-not-allowed border-none focus:outline-none"
            />
          </div>
          <div className="flex-1 flex flex-col gap-2 relative">
            <label className="text-sm font-normal text-[#111111]">City *</label>
            <div className="relative">
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full h-[52px] bg-white border border-[#E8E8E4] rounded-lg pl-3 pr-10 text-base text-[#212121] focus:outline-none focus:border-[#8EBAC5] appearance-none cursor-pointer"
              >
                <option value="Larnaca">Larnaca</option>
                <option value="Limassol">Limassol</option>
                <option value="Nicosia">Nicosia</option>
                <option value="Paphos">Paphos</option>
              </select>
              <HugeiconsIcon
                icon={ArrowDown01Icon}
                size={24}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#141B34] pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* Mobile Number */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-sm font-medium text-[#262626] tracking-tight">Mobile number *</label>
          <div className="flex w-full h-12">
            {/* Selector */}
            <div className="relative flex items-center bg-[#E0E0E0] rounded-l-xl px-4 py-3.5 border-r border-[#D2D2D2] gap-1.5 min-w-[141px]">
              <span className="text-2xl">🇺🇸</span>
              <span className="text-sm text-[#808080] font-normal">{countryCode}</span>
              <HugeiconsIcon icon={ArrowDown01Icon} size={20} className="text-[#666666] ml-auto cursor-pointer" />
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
              >
                <option value="+880">Bangladesh (+880)</option>
                <option value="+1">United States (+1)</option>
                <option value="+357">Cyprus (+357)</option>
              </select>
            </div>
            {/* Input */}
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              required
              placeholder="1234556666"
              className="flex-1 bg-[#E0E0E0] rounded-r-xl px-4 text-sm text-[#808080] font-normal focus:outline-none"
            />
          </div>
        </div>

        {/* Address Sections */}
        <div className="flex flex-col gap-3 w-full">
          <span className="text-xs font-medium text-[#111111] tracking-wider uppercase">ADDRESS</span>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-normal text-[#111111] flex gap-0.5">
              Area/neighborhood <span className="text-xs text-[#E24B4A]">*</span>
            </label>
            <input
              type="text"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
              placeholder="e.g. Mackenzie, finikoudes"
              className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm text-[#212121] placeholder-[#1C1C1A]/50 focus:outline-none focus:border-[#8EBAC5]"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-normal text-[#111111] flex gap-0.5">
                Street name <span className="text-xs text-[#E24B4A]">*</span>
              </label>
              <input
                type="text"
                value={streetName}
                onChange={(e) => setStreetName(e.target.value)}
                required
                placeholder="e.g. Emrou"
                className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm text-[#212121] placeholder-[#1C1C1A]/50 focus:outline-none focus:border-[#8EBAC5]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-normal text-[#111111] flex gap-0.5">
                Street number <span className="text-xs text-[#E24B4A]">*</span>
              </label>
              <input
                type="text"
                value={streetNumber}
                onChange={(e) => setStreetNumber(e.target.value)}
                required
                placeholder="e.g. 14"
                className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm text-[#212121] placeholder-[#1C1C1A]/50 focus:outline-none focus:border-[#8EBAC5]"
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row gap-4 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-normal text-[#111111]">Floor /unit</label>
              <input
                type="text"
                value={floorUnit}
                onChange={(e) => setFloorUnit(e.target.value)}
                placeholder="e.g. 3rd floor"
                className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm text-[#212121] placeholder-[#1C1C1A]/50 focus:outline-none focus:border-[#8EBAC5]"
              />
            </div>
            <div className="flex-1 flex flex-col gap-2">
              <label className="text-sm font-normal text-[#111111]">Apt/room no.</label>
              <input
                type="text"
                value={aptRoom}
                onChange={(e) => setAptRoom(e.target.value)}
                placeholder="e.g. 5"
                className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-2 text-sm text-[#212121] placeholder-[#1C1C1A]/50 focus:outline-none focus:border-[#8EBAC5]"
              />
            </div>
          </div>
        </div>

        {/* Map Section */}
        <div className="flex flex-col gap-3 w-full">
          <span className="text-xs font-medium text-[#111111] uppercase tracking-wider">LOCATION</span>

          <BusinessMap
            lat={coordinates.lat}
            lng={coordinates.lng}
            onChange={(lat, lng) => setCoordinates({ lat, lng })}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* Brief Description */}
        <div className="flex flex-col gap-2 w-full">
          <label className="text-xs font-normal text-[#111111]">Brief description *</label>
          <input
            type="text"
            value={briefDesc}
            onChange={(e) => setBriefDesc(e.target.value)}
            required
            placeholder="write about your business"
            className="w-full h-[52px] bg-white border border-[#E8E8E4] rounded-lg px-3 py-1.5 text-base text-[#212121] placeholder-[#212121]/50 focus:outline-none focus:border-[#8EBAC5]"
          />
        </div>

        {/* Next Button Row */}
        <div className="flex justify-end mt-4">
          <button
            type="submit"
            className="w-[78.13px] h-[48px] bg-gradient-to-r from-[#8EBAC5] to-[#8EBAC5]/80 hover:scale-105 transition-all duration-150 rounded-xl flex items-center justify-center text-lg font-medium text-[#111111] shadow-md border border-[#8EBAC5]/25 cursor-pointer active:scale-95"
          >
            Next
          </button>
        </div>

      </form>
    </div>
  );
}
