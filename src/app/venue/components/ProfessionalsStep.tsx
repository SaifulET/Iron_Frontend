"use client";

import React from "react";
import Image from "next/image";

interface ProfessionalsStepProps {
  selectedProfessional: string | null;
  setSelectedProfessional: (prof: string | null) => void;
}

export default function ProfessionalsStep({ selectedProfessional, setSelectedProfessional }: ProfessionalsStepProps) {
  return (
    <>
      <h1 className="font-semibold text-3xl md:text-4xl text-[#1C1B1C]">Select Professional</h1>
      
      <div className="flex flex-col gap-5 w-full">
        {/* Professional option 1 (No Preference) */}
        <div
          onClick={() => setSelectedProfessional("no-preference")}
          className={`w-full bg-white border rounded-lg p-6 flex justify-between items-center shadow-sm relative transition-all cursor-pointer hover:shadow-md ${selectedProfessional === "no-preference" ? "border-[#2BB54F]" : "border-neutral-200"}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-neutral-100 flex items-center justify-center border border-neutral-200 shrink-0">
              <span className="text-xl">⭐️</span>
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-lg text-[#0D0D0D]">No Preference</h4>
              <span className="text-sm text-neutral-400">Assign automatically to any professional</span>
            </div>
          </div>
          <button
            className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${
              selectedProfessional === "no-preference"
                ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0"
                : "bg-white border-[#D3D3D3] text-[#0D0D0D] px-5 py-2"
            }`}
          >
            {selectedProfessional === "no-preference" ? "✓" : "Select"}
          </button>
        </div>

        {/* Professional option 2 (Loay 1) */}
        <div
          onClick={() => setSelectedProfessional("loay-1")}
          className={`w-full bg-white border rounded-lg p-6 flex justify-between items-center shadow-sm relative transition-all cursor-pointer hover:shadow-md ${selectedProfessional === "loay-1" ? "border-[#2BB54F]" : "border-neutral-200"}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden relative border border-neutral-100 shrink-0">
              <Image src="/image/profile.jpg" alt="Loay" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-lg text-[#0D0D0D]">Loay</h4>
              <span className="text-sm text-neutral-400">Professional</span>
            </div>
          </div>
          <button
            className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${
              selectedProfessional === "loay-1"
                ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0"
                : "bg-white border-[#D3D3D3] text-[#0D0D0D] px-5 py-2"
            }`}
          >
            {selectedProfessional === "loay-1" ? "✓" : "Select"}
          </button>
        </div>

        {/* Professional option 3 (Loay 2) */}
        <div
          onClick={() => setSelectedProfessional("loay-2")}
          className={`w-full bg-white border rounded-lg p-6 flex justify-between items-center shadow-sm relative transition-all cursor-pointer hover:shadow-md ${selectedProfessional === "loay-2" ? "border-[#2BB54F]" : "border-neutral-200"}`}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden relative border border-neutral-100 shrink-0">
              <Image src="/image/profile.jpg" alt="Loay" fill className="object-cover" />
            </div>
            <div className="flex flex-col gap-1">
              <h4 className="font-semibold text-lg text-[#0D0D0D]">Loay</h4>
              <span className="text-sm text-neutral-400">Professional</span>
            </div>
          </div>
          <button
            className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${
              selectedProfessional === "loay-2"
                ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0"
                : "bg-white border-[#D3D3D3] text-[#0D0D0D] px-5 py-2"
            }`}
          >
            {selectedProfessional === "loay-2" ? "✓" : "Select"}
          </button>
        </div>
      </div>
    </>
  );
}
