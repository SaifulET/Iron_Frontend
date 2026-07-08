"use client";
import NotificationBell from "@/components/notifications/NotificationBell";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { BellIcon } from "@hugeicons/core-free-icons";
import {
  mockMetricCardsTop,
  mockMetricCardsBottom,
  mockTopServices,
  mockBookingsByStatus,
  heatmapData
} from "@/data/analyticsMockData";

export default function DashboardAnalytics() {
  const [selectedYear, setSelectedYear] = useState("2026");
  const [selectedMonth, setSelectedMonth] = useState("May");

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] pl-[25px] pr-4 md:pr-[129px] pt-[37px] pb-24 select-none font-poppins relative">
      
      {/* Header Row */}
      <div className="flex items-center justify-between mb-[30px] select-none w-full">
        <div className="flex flex-col gap-[2px]">
          <h1 className="font-poppins font-semibold text-[28px] leading-[28px] tracking-[-0.84px] text-[#484946]">
            Analytics
          </h1>
          <p className="font-poppins font-medium text-[14px] leading-[21px] text-[#686B64]">
            Performance, revenue, and booking trends
          </p>
        </div>

        <NotificationBell />
      </div>

      {/* Main Content Alignment Wrapper */}
      <div className="flex flex-col gap-6 w-full">
        
        {/* Filters Row */}
        <div className="flex flex-row items-center gap-3 w-full h-[48px]">
          <div className="relative flex-grow max-w-[200px]">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none h-[48px] w-full bg-white border border-[#B7D2C8] rounded-[12px] px-4 font-poppins font-semibold text-[14px] leading-[16px] text-center text-black focus:outline-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '16px'
              }}
            >
              <option value="2026">2026</option>
              <option value="2025">2025</option>
            </select>
          </div>

          <div className="relative flex-grow max-w-[200px]">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="appearance-none h-[48px] w-full bg-white border border-[#B7D2C8] rounded-[12px] px-4 font-poppins font-semibold text-[14px] leading-[16px] text-center text-black focus:outline-none cursor-pointer"
              style={{
                backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'right 16px center',
                backgroundSize: '16px'
              }}
            >
              <option value="May">May</option>
              <option value="April">April</option>
              <option value="March">March</option>
              <option value="February">February</option>
            </select>
          </div>

          <button className="flex flex-row justify-center items-center px-[14px] py-[8px] bg-[#111111] hover:bg-black text-[#FFFFFF] font-poppins font-semibold text-[14px] leading-[16px] w-[82px] h-[48px] rounded-[12px] transition-colors cursor-pointer shrink-0">
            All time
          </button>
        </div>

        {/* Top Metric Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-[14px] w-full mt-2">
          {mockMetricCardsTop.map((card, idx) => (
            <div
              key={idx}
              className="flex flex-col justify-between p-5 bg-[#F1F0EA] rounded-[14px] h-[129px] w-full"
            >
              <span className="font-poppins font-semibold text-[15px] leading-[22px] tracking-[1.2px] uppercase text-[#61635D]">
                {card.title}
              </span>
              <div className="flex flex-col mt-1">
                <span className={`font-poppins font-semibold text-[32px] leading-[32px] tracking-[-1.44px] ${card.valueColor || "text-[#15171C]"}`}>
                  {card.value}
                </span>
                <span className={`font-poppins font-semibold text-[14px] leading-[18px] mt-1.5 ${card.infoColor}`}>
                  {card.info}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Metric Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] w-full">
          {mockMetricCardsBottom.map((card, idx) => (
            <div
              key={idx}
              className={`flex flex-col justify-between p-5 rounded-[14px] h-[146px] w-full ${
                card.bgColor || "bg-[#F1F0EA]"
              } ${card.borderColor ? `border ${card.borderColor}` : ""}`}
            >
              <span className="font-poppins font-semibold text-[15px] leading-[22px] tracking-[1.2px] uppercase text-[#61635D]">
                {card.title}
              </span>
              <div className="flex flex-col mt-1">
                <span className={`font-poppins font-semibold text-[30px] leading-[30px] tracking-[-1.35px] ${card.valueColor || "text-[#15171C]"}`}>
                  {card.value}
                </span>
                <span className={`font-poppins font-semibold text-[14px] leading-[18px] mt-2 ${card.infoColor}`}>
                  {card.info}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Breakdown Panels Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 w-full mt-2">
          {/* Top Services Panel */}
          <div className="bg-white border border-[#E1DED6] rounded-[16px] overflow-hidden flex flex-col h-[330px]">
            <div className="box-sizing-border-box flex flex-col justify-center px-5 py-3.5 bg-[#F1F0EA] border-b border-[#E1DED6] w-full h-[52px]">
              <h3 className="font-poppins font-semibold text-[18px] leading-[27px] tracking-[-0.54px] text-[#282A27]">
                Top services by bookings
              </h3>
            </div>
            
            <div className="flex flex-col justify-center p-6 gap-3.5 w-full h-[278px]">
              {mockTopServices.map((service, idx) => {
                const percentage = (service.count / service.maxCount) * 100;
                return (
                  <div key={idx} className="flex flex-row items-center justify-between w-full gap-4">
                    <span className="w-[140px] text-right font-poppins font-medium text-[16px] leading-[24px] text-[#5B5D58] truncate">
                      {service.name}
                    </span>
                    <div className="flex-1 bg-[#F1F0EA] h-[10px] rounded-full overflow-hidden">
                      <div
                        className="bg-[#0F141A] h-full rounded-full"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="w-[34px] text-left font-poppins font-semibold text-[16px] leading-[24px] text-[#31332F]">
                      {service.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bookings by Status Panel */}
          <div className="bg-white border border-[#E1DED6] rounded-[16px] overflow-hidden flex flex-col h-[330px]">
            <div className="box-sizing-border-box flex flex-row justify-between items-center px-5 py-3.5 bg-[#F1F0EA] border-b border-[#E1DED6] w-full h-[52px]">
              <h3 className="font-poppins font-semibold text-[18px] leading-[27px] tracking-[-0.54px] text-[#282A27]">
                Bookings by status
              </h3>
              <span className="font-poppins font-normal text-[11px] leading-[16px] text-[#1C1B1C] cursor-pointer hover:underline">
                Booking State &gt;
              </span>
            </div>
            
            <div className="flex flex-col justify-center p-6 gap-[8px] w-full h-[278px] overflow-y-auto">
              {mockBookingsByStatus.map((statusItem, idx) => {
                const percentage = (statusItem.count / statusItem.maxCount) * 100;
                return (
                  <div key={idx} className="flex flex-row items-center justify-between w-full gap-4 text-xs">
                    <span className="w-[170px] text-right font-poppins font-medium text-[14px] leading-[20px] text-[#5B5D58] truncate">
                      {statusItem.status}
                    </span>
                    <div className="flex-1 bg-[#F1F0EA] h-[10px] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${percentage}%`,
                          backgroundColor: statusItem.color
                        }}
                      />
                    </div>
                    <span className="w-[34px] text-left font-poppins font-semibold text-[14px] leading-[20px] text-[#31332F]">
                      {statusItem.count}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Busiest Days Heatmap Panel */}
        <div className="w-full bg-white border border-[#E1DED6] rounded-[16px] overflow-hidden flex flex-col">
          <div className="box-sizing-border-box flex flex-col justify-center px-5 py-3.5 bg-[#F1F0EA] border-b border-[#E1DED6] w-full h-[52px]">
            <h3 className="font-poppins font-semibold text-[18px] leading-[27px] tracking-[-0.54px] text-[#282A27]">
              Busiest days — heatmap · updates with selected period
            </h3>
          </div>

          <div className="p-5 flex flex-col gap-4 w-full">
            
            {/* Weekday headers */}
            <div className="grid grid-cols-7 gap-3 text-center">
              {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
                <span key={day} className="font-poppins font-medium text-[15px] leading-[22px] text-[#5B5D58]">
                  {day}
                </span>
              ))}
            </div>

            {/* Grid rows */}
            <div className="flex flex-col gap-[6px]">
              {heatmapData.map((row, rowIdx) => (
                <div key={rowIdx} className="grid grid-cols-7 gap-3 h-[34px]">
                  {row.map((cellColor, colIdx) => (
                    <div
                      key={colIdx}
                      className="w-full h-full rounded-[5px] border border-neutral-100"
                      style={{ backgroundColor: cellColor }}
                    />
                  ))}
                </div>
              ))}
            </div>

            {/* Legend row */}
            <div className="flex flex-wrap items-center gap-4 mt-2 text-sm font-medium text-[#5B5D58]">
              {/* None */}
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-[#F4F2ED] border border-[#DEDBD3] rounded-[3px]" />
                <span>None</span>
              </div>
              {/* Low */}
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-[#DEEFF2] rounded-[3px]" />
                <span>Low</span>
              </div>
              {/* Medium */}
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-[#A7D5DD] rounded-[3px]" />
                <span>Medium</span>
              </div>
              {/* High */}
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-[#4F95A1] rounded-[3px]" />
                <span>High</span>
              </div>
              {/* Busiest */}
              <div className="flex items-center gap-1.5">
                <div className="w-3.5 h-3.5 bg-[#0F141A] rounded-[3px]" />
                <span>Busiest</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </main>
  );
}
