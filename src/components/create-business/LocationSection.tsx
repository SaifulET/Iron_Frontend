"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Search01Icon } from "@hugeicons/core-free-icons";

interface LocationSectionProps {
  searchLocation: string;
  setSearchLocation: (v: string) => void;
  mapUrl: string;
  handleLocationSearch: (e: React.FormEvent) => void;
}

export default function LocationSection({
  searchLocation,
  setSearchLocation,
  mapUrl,
  handleLocationSearch
}: LocationSectionProps) {
  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="font-poppins font-medium text-xs text-[#111111] tracking-[0.05em] uppercase">
        Location
      </span>

      <div className="flex flex-col gap-4 w-full">
        {/* Map Search input */}
        <form onSubmit={handleLocationSearch} className="flex justify-between items-center gap-4 w-full border border-[#D3D1C7] rounded-lg px-3 h-9 bg-white">
          <HugeiconsIcon icon={Search01Icon} className="w-[18px] h-[18px] text-neutral-400 shrink-0" />
          <input
            type="text"
            placeholder="Search location to update map..."
            value={searchLocation}
            onChange={(e) => setSearchLocation(e.target.value)}
            className="flex-grow h-full bg-transparent text-xs font-poppins focus:outline-none"
          />
          <button type="submit" className="text-xs font-semibold hover:text-[#0F6E56]">Search</button>
        </form>

        {/* Real Map Iframe (embedded dynamically based on search) */}
        <div className="relative w-full h-[450px] rounded-xl overflow-hidden border border-neutral-200">
          <iframe
            src={mapUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Larnaca, Cyprus Map"
            className="absolute inset-0"
          />
        </div>
      </div>
    </div>
  );
}
