"use client";

import React from "react";
import BusinessMockup from "@/components/BusinessMockup";

interface ListYourBusinessHeroProps {
  onListBusinessClick: () => void;
}

export default function ListYourBusinessHero({ onListBusinessClick }: ListYourBusinessHeroProps) {
  return (
    <section className="w-full px-4 text-center mt-12 md:mt-16 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl md:text-[72px] font-medium leading-[1.1] md:leading-[72px] text-[#1C1B1C] tracking-tight mb-4 md:mb-6 font-poppins">
        The smarter way to grow <br className="hidden md:inline" /> your <span className="text-[#2E9DA7] font-bold">business</span> in Cyprus
      </h1>
      <p className="text-sm sm:text-base md:text-xl text-[#45474B] leading-relaxed max-w-[672px] mb-5 font-poppins">
        No monthly fees right now. No commission on returning customers. Just new clients finding you — and showing up.
      </p>

      {/* Notice/Alert Below Subheader */}
      <div className="w-full max-w-[849px] border-l-4 border-[#8EBAC5] bg-[#FFFFFF] shadow-sm px-4 py-3 flex items-center justify-center text-xs md:text-sm font-medium text-[#111111] mb-8 leading-relaxed rounded-r-lg font-poppins">
        <span>💳 First booking? A small deposit secures the slot — deducted from the total at your venue. Every return visit is 100% yours.</span>
      </div>

      {/* Hero image mockup (Tablet + Mobile Calendar view) */}
      <BusinessMockup showCities={false} />

      {/* One platform to book them all section */}
      <div className="relative w-full max-w-[1100px] mx-auto z-30 -mt-20 sm:-mt-32 md:-mt-[160px] flex flex-col items-center justify-end pt-24 pb-8 gap-4 text-center">
        {/* Fading Shadow overlay blending the lower mockup portion */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF9] via-[#FCFAF9]/95 via-70% to-transparent pointer-events-none -z-10" />

        <h2 className="text-2xl md:text-[36px] font-bold text-[#1C1B1C] leading-[1.2] font-poppins relative z-10">
          One platform to book them all
        </h2>
        <button
          onClick={onListBusinessClick}
          className="relative z-10 flex flex-row items-center justify-center py-3 px-6 gap-[8px] w-full sm:w-[290px] h-[48px] bg-[#141414] hover:bg-black text-white rounded-full transition-all active:scale-95 cursor-pointer font-inter font-semibold text-[15.7px] leading-[24px]"
        >
          <span>List your Business - It’s free</span>
          <svg
            className="w-[18px] h-[18px] text-white shrink-0"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
}
