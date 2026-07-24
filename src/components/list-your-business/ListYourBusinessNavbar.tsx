"use client";

import React from "react";
import Navbar from "@/components/Navbar";

interface ListYourBusinessNavbarProps {
  showBanner: boolean;
  setShowBanner: (show: boolean) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (login: boolean) => void;
  selectedLanguage: string;
  setSelectedLanguage: (lang: string) => void;
  onListBusinessClick: () => void;
}

export default function ListYourBusinessNavbar({
  showBanner,
  setShowBanner,
  isLoggedIn,
  setIsLoggedIn,
  selectedLanguage,
  setSelectedLanguage,
  onListBusinessClick
}: ListYourBusinessNavbarProps) {
  return (
    <>
      {/* Top Section - App Banner */}
      {showBanner && (
        <div className="w-full bg-[#96C3CD] text-[#111111] px-4 md:px-[64px] py-2.5 sm:py-[16px] flex items-center justify-between transition-all duration-300 relative z-50 text-[10px] sm:text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-[17px] h-[20px] flex items-center justify-center shrink-0">
              <img src="/img/smallBLogo.svg" alt="B" className="w-full h-full object-contain" />
            </div>
            <span className="truncate">Reach new customers across Cyprus. Zero monthly fees. No risk</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={onListBusinessClick}
              className="bg-white hover:bg-neutral-50 text-[#1C1B1C] px-4 py-1.5 rounded-full font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
            >
              <span>List Your Business</span>
              <svg className="w-3.5 h-3.5 text-[#111111] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="text-[#1C1B1C] hover:opacity-75 transition-opacity cursor-pointer p-1"
              aria-label="Close Banner"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        isBusinessPage={true}
      />
    </>
  );
}
