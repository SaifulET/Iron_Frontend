"use client";

import React from "react";

export default function StaffRolePermissions() {
  return (
    <div className="w-full bg-white border border-[#E1DED6] rounded-[16px] flex flex-col items-start p-0 mb-8 ">
      {/* Card Header */}
      <div className="w-full border-b border-[#E1DED6] px-6 py-5 flex flex-col items-start">
        <h2 className="font-poppins font-semibold text-[20px] leading-[30px] tracking-[-0.6px] text-[#2D2F2B]">
          Role permissions
        </h2>
      </div>

      {/* Grid Content */}
      <div className="w-full grid grid-cols-1 md:grid-cols-3">
        {/* Business Owner */}
        <div className="flex flex-col items-start px-6 py-7 w-full border-b md:border-b-0 md:border-r border-[#E8E5DE] min-h-[342.5px]">
          <div className="flex flex-row items-start">
            <span className="px-3 py-1 bg-[#E0F3F5] text-[#2E9DA7] font-poppins font-medium text-[13px] leading-[20px] rounded-full">
              Owner
            </span>
          </div>
          <h3 className="pt-3 font-poppins font-semibold text-[20px] leading-[30px] tracking-[-0.6px] text-[#2D2F2B]">
            Business owner
          </h3>
          <div className="pt-2">
            <p className="font-poppins font-medium text-base leading-6 text-[#555751] max-w-[275px] min-h-[66px]">
              Full control over everything — settings, staff, financials, and all bookings.
            </p>
          </div>
          <ul className="pt-3 flex flex-col gap-1.5 w-full">
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>View all bookings</span>
            </li>
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>Manage staff</span>
            </li>
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>View payouts & finance</span>
            </li>
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>Edit services & add-ons</span>
            </li>
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>Edit business profile</span>
            </li>
          </ul>
        </div>

        {/* Supervisor */}
        <div className="flex flex-col items-start px-6 py-7 w-full border-b md:border-b-0 md:border-r border-[#E8E5DE] min-h-[342.5px]">
          <div className="flex flex-row items-start">
            <span className="px-3 py-1 bg-[#E6F1FB] text-[#3760B7] font-poppins font-medium text-[13px] leading-[20px] rounded-full">
              Supervisor
            </span>
          </div>
          <h3 className="pt-3 font-poppins font-semibold text-[20px] leading-[30px] tracking-[-0.6px] text-[#2D2F2B]">
            Supervisor
          </h3>
          <div className="pt-2">
            <p className="font-poppins font-medium text-base leading-6 text-[#555751] max-w-[275px] min-h-[66px]">
              Manages day-to-day operations and all staff bookings but cannot access financial data.
            </p>
          </div>
          <ul className="pt-3 flex flex-col gap-1.5 w-full">
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>View all bookings</span>
            </li>
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>Manage staff schedules</span>
            </li>
            <li className="flex items-center gap-2 text-[#4F514C] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">×</span>
              <span>View payouts & finance</span>
            </li>
            <li className="flex items-center gap-2 text-[#3D8F72] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">✓</span>
              <span>Edit services & add-ons</span>
            </li>
            <li className="flex items-center gap-2 text-[#4F514C] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">×</span>
              <span>Edit business profile</span>
            </li>
          </ul>
        </div>

        {/* Staff */}
        <div className="flex flex-col items-start px-6 py-7 w-full min-h-[342.5px]">
          <div className="flex flex-row items-start">
            <span className="px-3 py-1 bg-[#F5F4EE] text-[#5F5E5A] font-poppins font-medium text-[13px] leading-[20px] rounded-full">
              Staff
            </span>
          </div>
          <h3 className="pt-3 font-poppins font-semibold text-[20px] leading-[30px] tracking-[-0.6px] text-[#2D2F2B]">
            Staff member
          </h3>
          <div className="pt-2">
            <p className="font-poppins font-medium text-base leading-6 text-[#555751] max-w-[275px] min-h-[66px]">
              Sees only their own bookings and schedule. No access to business settings or financials.
            </p>
          </div>
          <ul className="pt-3 flex flex-col gap-1.5 w-full">
            <li className="flex items-center gap-2 text-[#4F514C] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">×</span>
              <span>View all bookings</span>
            </li>
            <li className="flex items-center gap-2 text-[#4F514C] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">×</span>
              <span>Manage staff schedules</span>
            </li>
            <li className="flex items-center gap-2 text-[#4F514C] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">×</span>
              <span>View payouts & finance</span>
            </li>
            <li className="flex items-center gap-2 text-[#4F514C] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">×</span>
              <span>Edit services & add-ons</span>
            </li>
            <li className="flex items-center gap-2 text-[#4F514C] font-poppins font-medium text-sm leading-[21px]">
              <span className="text-[17px] leading-[17px] w-4 text-center">×</span>
              <span>Edit business profile</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
