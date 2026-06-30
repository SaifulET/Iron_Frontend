"use client";

import React from "react";

interface AddonsStepProps {
  selectedAddons: number[];
  setSelectedAddons: React.Dispatch<React.SetStateAction<number[]>>;
}

export default function AddonsStep({ selectedAddons, setSelectedAddons }: AddonsStepProps) {
  return (
    <>
      <h1 className="font-semibold text-3xl md:text-4xl text-[#1C1B1C]">Select Add-ons</h1>
      
      <div className="flex flex-col gap-5 w-full">
        {/* Add-on 1 */}
        <div className={`w-full bg-white border rounded-lg p-6 flex justify-between items-center shadow-sm relative transition-all ${selectedAddons.includes(1) ? "border-[#2BB54F] shadow-md" : "border-neutral-200"}`}>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-lg text-[#0D0D0D]">Wedding Pic</h4>
            <p className="text-sm text-[#767676]">2 suimsuite will be provided in this add-ons</p>
            <span className="font-semibold text-lg text-[#0D0D0D]">€90</span>
          </div>
          <button
            onClick={() => setSelectedAddons(prev => prev.includes(1) ? prev.filter(id => id !== 1) : [...prev, 1])}
            className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${
              selectedAddons.includes(1)
                ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0"
                : "bg-white border-[#D3D3D3] text-[#0D0D0D] hover:bg-neutral-50 px-5 py-2"
            }`}
          >
            {selectedAddons.includes(1) ? "✓" : "Add"}
          </button>
        </div>

        {/* Add-on 2 */}
        <div className={`w-full bg-white border rounded-lg p-6 flex justify-between items-center shadow-sm relative transition-all ${selectedAddons.includes(2) ? "border-[#2BB54F] shadow-md" : "border-neutral-200"}`}>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-lg text-[#0D0D0D]">Wedding Pic</h4>
            <p className="text-sm text-[#767676]">2 suimsuite will be provided in this add-ons</p>
            <span className="font-semibold text-lg text-[#0D0D0D]">€90</span>
          </div>
          <button
            onClick={() => setSelectedAddons(prev => prev.includes(2) ? prev.filter(id => id !== 2) : [...prev, 2])}
            className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${
              selectedAddons.includes(2)
                ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0"
                : "bg-white border-[#D3D3D3] text-[#0D0D0D] hover:bg-neutral-50 px-5 py-2"
            }`}
          >
            {selectedAddons.includes(2) ? "✓" : "Add"}
          </button>
        </div>

        {/* Add-on 3 */}
        <div className={`w-full bg-white border rounded-lg p-6 flex justify-between items-center shadow-sm relative transition-all ${selectedAddons.includes(3) ? "border-[#2BB54F] shadow-md" : "border-neutral-200"}`}>
          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-lg text-[#0D0D0D]">Wedding Pic</h4>
            <p className="text-sm text-[#767676]">2 suimsuite will be provided in this add-ons</p>
            <span className="font-semibold text-lg text-[#0D0D0D]">€90</span>
          </div>
          <button
            onClick={() => setSelectedAddons(prev => prev.includes(3) ? prev.filter(id => id !== 3) : [...prev, 3])}
            className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${
              selectedAddons.includes(3)
                ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0"
                : "bg-white border-[#D3D3D3] text-[#0D0D0D] hover:bg-neutral-50 px-5 py-2"
            }`}
          >
            {selectedAddons.includes(3) ? "✓" : "Add"}
          </button>
        </div>
      </div>
    </>
  );
}
