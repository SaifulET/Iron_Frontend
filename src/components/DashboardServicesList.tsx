"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Plus as PlusIcon,
  Clock01Icon,
  UserGroup03Icon as UsersIcon,
  Car04Icon,
  PuzzleIcon,
  AlertCircleIcon,
  BellIcon
} from "@hugeicons/core-free-icons";

// Simple edit dots icon
const EditDotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

interface Service {
  id: number;
  title: string;
  category: string;
  price: string;
  priceSuffix?: string;
  duration: string;
  staff: string;
  minMax?: string;
  travelTo: string;
  travelSuffix?: string;
  addons?: string;
  noShow: string;
  isFeatured?: boolean;
  discount?: string;
  isActive: boolean;
  isDraft?: boolean;
}

export default function DashboardServicesList() {
  // Toggle states
  const [gapElimination, setGapElimination] = useState(true);
  const [allowDoubleBooking, setAllowDoubleBooking] = useState(false);

  // Initial mock services matching the screenshot
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      duration: "90 min",
      staff: "Elena, Vivi",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 2,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      priceSuffix: "/per person",
      duration: "90 min",
      staff: "Elena, Vivi",
      minMax: "2-4 person",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 3,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      duration: "90 min",
      staff: "Elena, Vivi",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 4,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      priceSuffix: "/per hour",
      duration: "90 min",
      staff: "Elena, Vivi",
      minMax: "2-8 hours",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 5,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      priceSuffix: "/per hour",
      duration: "90 min",
      staff: "Elena, Vivi",
      minMax: "2-8 hours",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 6,
      title: "Eyebrow shaping",
      category: "Service Category",
      price: "€120",
      duration: "30 min",
      staff: "Not assigned",
      travelTo: "Larnaca",
      noShow: "100%",
      isActive: false,
      isDraft: true
    }
  ]);

  const toggleServiceActive = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const activeCount = services.filter(s => !s.isDraft).length;
  const draftCount = services.filter(s => s.isDraft).length;

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] pl-[25px] pr-4 md:pr-[129px] pt-[37px] pb-24 select-none font-poppins relative">
      
      {/* Header Row */}
      <div className="flex items-center justify-between mb-[40px] select-none w-full">
        <div className="flex flex-col gap-[2px]">
          <h1 className="text-base font-medium text-[#0F1E35] leading-6">Services</h1>
          <p className="text-xs text-[#6B7280] leading-[18px]">Manage your service catalogue</p>
        </div>

        {/* Notification bell (custom dimensions from CSS) */}
        <div className="relative">
          <button className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm cursor-pointer">
            <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
          </button>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white">
            5
          </span>
        </div>
      </div>

      {/* Control row: Stats pill & Create Service button */}
      <div className="flex justify-between items-center w-full mb-5 gap-4">
        {/* Active / Draft Stats pill */}
        <div className="bg-white border border-[#F5F5F4] rounded-full py-2 px-4 shadow-sm flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full" />
            <span className="text-[#1F8900]">{activeCount} Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#BCB8B5] rounded-full" />
            <span className="text-[#79716B]">{draftCount} Draft</span>
          </div>
        </div>

        {/* Create Service button */}
        <button className="bg-[#111111] hover:bg-black text-white text-[13px] font-medium px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow transition-all cursor-pointer">
          <HugeiconsIcon icon={PlusIcon} className="w-3.5 h-3.5" />
          <span>Create Service</span>
        </button>
      </div>

      {/* Gap Elimination Section */}
      <div className="bg-white rounded-xl p-[18px] px-5 w-full flex flex-col gap-4 shadow-sm border border-[#F5F5F4] mb-5">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm text-[#111111]">Gap Elimination</span>
            <span className="text-xs text-neutral-500">Fill your day like Tetris. No useless gaps between appointments.</span>
          </div>
          {/* Toggle Switch */}
          <button
            onClick={() => setGapElimination(!gapElimination)}
            className={`w-[38px] h-[21px] rounded-full p-[3px] transition-colors duration-200 focus:outline-none flex items-center ${gapElimination ? "bg-[#0F6E56]" : "bg-neutral-300"}`}
          >
            <div className={`w-[15px] h-[15px] bg-white rounded-full transition-transform duration-200 ${gapElimination ? "translate-x-[17px]" : "translate-x-0"}`} />
          </button>
        </div>
      </div>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white border border-[#F5F5F4] rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-[456px] ${service.isDraft ? "bg-opacity-95" : ""}`}
          >
            <div>
              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-neutral-100 pb-3 mb-4">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg text-[#1C1917] leading-7">{service.title}</h3>
                  <span className="text-xs font-light text-[#757575] mt-0.5">{service.category}</span>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-neutral-50 flex items-center justify-center text-neutral-400 cursor-pointer">
                  <EditDotsIcon />
                </button>
              </div>

              {/* Price row */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-bold text-[#1C1917] tracking-tight">{service.price}</span>
                {service.priceSuffix && (
                  <span className="text-xs text-[#757575] font-normal">{service.priceSuffix}</span>
                )}
              </div>

              {/* Detail Rows */}
              <div className="flex flex-col gap-3">
                {/* Duration Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium text-[#111111]">{service.duration}</span>
                </div>

                {/* Staff Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <HugeiconsIcon icon={UsersIcon} className="w-4 h-4" />
                    <span>Staff</span>
                  </div>
                  <span className="font-medium text-[#111111]">{service.staff}</span>
                </div>

                {/* Min/Max (Optional) */}
                {service.minMax && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-neutral-500">
                      <HugeiconsIcon icon={UsersIcon} className="w-4 h-4" />
                      <span>Min/Max</span>
                    </div>
                    <span className="font-medium text-[#111111]">{service.minMax}</span>
                  </div>
                )}

                {/* Travel to Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <HugeiconsIcon icon={Car04Icon} className="w-4 h-4" />
                    <span>Travel to</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-[#111111]">
                    <span>{service.travelTo}</span>
                    {service.travelSuffix && (
                      <>
                        <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                        <span>{service.travelSuffix}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Add-ons Row (Optional) */}
                {service.addons && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-neutral-500">
                      <HugeiconsIcon icon={PuzzleIcon} className="w-4 h-4" />
                      <span>Add-ons</span>
                    </div>
                    <span className="bg-[#F9EAB9] text-[#824E1B] text-xs font-normal px-2.5 py-0.5 rounded-full">
                      {service.addons}
                    </span>
                  </div>
                )}

                {/* No-show Row */}
                {service.noShow && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-neutral-500">
                      <HugeiconsIcon icon={AlertCircleIcon} className="w-4 h-4" />
                      <span>No-show</span>
                    </div>
                    <span className="font-medium text-[#111111]">{service.noShow}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Badges block: rendered above the border divider */}
            <div className="flex gap-2 mt-5 mb-4 shrink-0">
              {service.isFeatured && (
                <span className="bg-[#E9F2FF] text-[#2D47C8] text-xs font-normal px-2.5 py-1 rounded-full">
                  Featured
                </span>
              )}
              {service.discount && (
                <span className="bg-[#DFFDDF] text-[#176117] text-xs font-normal px-2.5 py-1 rounded-full">
                  {service.discount}
                </span>
              )}
            </div>

            {/* Bottom Row: with border-t and Currently Active/Draft Mode toggle */}
            <div className="border-t border-[#F5F5F4] pt-4 shrink-0">
              <div className="flex justify-between items-center w-full">
                <span className="text-[13px] font-medium text-[#57534D]">
                  {service.isDraft ? "Draft Mode" : "Currently Active"}
                </span>
                <button
                  type="button"
                  onClick={() => !service.isDraft && toggleServiceActive(service.id)}
                  className={`w-[36px] h-[20px] rounded-full p-[2px] transition-colors duration-200 focus:outline-none flex items-center ${
                    (!service.isDraft && service.isActive) ? "bg-[#8EBAC5]" : "bg-neutral-300"
                  } ${service.isDraft ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                >
                  <div
                    className={`w-[16px] h-[16px] bg-white rounded-full transition-transform duration-200 ${
                      (!service.isDraft && service.isActive) ? "translate-x-[16px]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    </main>
  );
}
