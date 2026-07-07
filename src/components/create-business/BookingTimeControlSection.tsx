"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { InformationCircleIcon, Delete02Icon } from "@hugeicons/core-free-icons";

interface BookingTimeControlSectionProps {
  bookingMode: "Manual" | "Auto";
  setBookingMode: (v: "Manual" | "Auto") => void;
  durationIncrement: string;
  setDurationIncrement: (v: string) => void;
  manualTimes: string[];
  newManualTime: string;
  setNewManualTime: (v: string) => void;
  newManualPeriod: "AM" | "PM";
  setNewManualPeriod: (v: "AM" | "PM") => void;
  addManualTime: () => void;
  removeManualTime: (t: string) => void;
}

export default function BookingTimeControlSection({
  bookingMode,
  setBookingMode,
  durationIncrement,
  setDurationIncrement,
  manualTimes,
  newManualTime,
  setNewManualTime,
  newManualPeriod,
  setNewManualPeriod,
  addManualTime,
  removeManualTime
}: BookingTimeControlSectionProps) {
  return (
    <div className="flex flex-col gap-6 w-full font-poppins">
      <div className="flex justify-between items-center border-b border-neutral-100 pb-4">
        <h3 className="text-sm font-semibold text-[#111111]">Booking time control</h3>

        {/* Toggle Switch */}
        <div className="flex bg-neutral-100 rounded-lg p-0.5 select-none">
          <button
            type="button"
            onClick={() => setBookingMode("Manual")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
              bookingMode === "Manual"
                ? "bg-[#8EBAC5] text-white shadow-sm"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Manual
          </button>
          <button
            type="button"
            onClick={() => setBookingMode("Auto")}
            className={`px-4 py-1.5 rounded-md text-xs font-medium transition-all ${
              bookingMode === "Auto"
                ? "bg-[#8EBAC5] text-white shadow-sm"
                : "text-neutral-500 hover:text-black"
            }`}
          >
            Auto
          </button>
        </div>
      </div>

      <div className="text-xs text-neutral-500 flex flex-col gap-3 leading-relaxed">
        <p>
          <strong className="text-neutral-800">Auto</strong> — Slots are generated automatically based on your opening hours and a fixed increment you choose, such as every 15 or 30 minutes. This is the standard setup for services like haircuts, massages, and consultations.
        </p>
        <p>
          <strong className="text-neutral-800">Manual</strong> — You define the exact times customers can book, such as 10:00, 14:00, and 18:00 only. No other times will be shown. Use this for services that run at fixed times, such as tours, classes, or scheduled sessions.
        </p>
        <p className="italic text-[11px]">
          *You can only choose one mode per service. Selecting Manual overrides your business's general opening hours for this service — only the times you set here will be available.
        </p>
      </div>

      {/* Grid layout for times configuration */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-2 pt-4 border-t border-neutral-100">
        {/* Manual Times configurator */}
        <div className={`p-4 rounded-xl border border-neutral-200 ${bookingMode === "Manual" ? "bg-white" : "bg-neutral-50 opacity-50 pointer-events-none"}`}>
          <span className="text-xs font-semibold text-[#111111] flex items-center gap-1.5 mb-3">
            <HugeiconsIcon icon={InformationCircleIcon} className="w-4 h-4 text-neutral-500" />
            Set manual booking times
          </span>
          <p className="text-[10px] text-neutral-400 mb-4">Define custom start times for appointments.</p>

          <div className="flex items-center gap-2 mb-4">
            <input
              type="text"
              placeholder="e.g. 10:00"
              value={newManualTime}
              onChange={(e) => setNewManualTime(e.target.value)}
              className="h-8 border border-[#D3D1C7] rounded-lg px-3 text-xs w-24 focus:outline-none"
            />

            {/* AM/PM Switcher */}
            <div className="flex bg-neutral-100 rounded-lg p-0.5 select-none h-8 items-center">
              <button
                type="button"
                onClick={() => setNewManualPeriod("AM")}
                className={`px-2.5 h-7 rounded-md text-[10px] font-semibold transition-all ${
                  newManualPeriod === "AM" ? "bg-white text-black shadow-sm" : "text-neutral-500"
                }`}
              >
                AM
              </button>
              <button
                type="button"
                onClick={() => setNewManualPeriod("PM")}
                className={`px-2.5 h-7 rounded-md text-[10px] font-semibold transition-all ${
                  newManualPeriod === "PM" ? "bg-white text-black shadow-sm" : "text-neutral-500"
                }`}
              >
                PM
              </button>
            </div>

            <button
              type="button"
              onClick={addManualTime}
              className="h-8 px-3 bg-[#8EBAC5] hover:bg-[#78aab6] text-white text-xs font-semibold rounded-lg"
            >
              Add
            </button>
          </div>

          {/* Added times list */}
          <div className="flex flex-wrap gap-2">
            {manualTimes.map((time) => (
              <div key={time} className="flex items-center gap-1.5 px-3 py-1 bg-[#DDF4F8] text-[#0C5866] border border-[#8EBAC5]/30 rounded-lg text-xs font-medium">
                <span>{time}</span>
                <button type="button" onClick={() => removeManualTime(time)} className="hover:text-red-500 ml-1">×</button>
              </div>
            ))}
          </div>
        </div>

        {/* Auto Generated Slots configurator */}
        <div className={`p-4 rounded-xl border border-neutral-200 ${bookingMode === "Auto" ? "bg-white" : "bg-neutral-50 opacity-50 pointer-events-none"}`}>
          <span className="text-xs font-semibold text-[#111111] flex items-center gap-1.5 mb-3">
            <HugeiconsIcon icon={InformationCircleIcon} className="w-4 h-4 text-neutral-500" />
            Auto-generated slots
          </span>
          <p className="text-[10px] text-neutral-400 mb-4">The system dynamically creates and checks slots from your increment.</p>

          <label className="text-[10px] font-semibold text-neutral-500 block mb-1">Duration increment</label>
          <select
            value={durationIncrement}
            onChange={(e) => setDurationIncrement(e.target.value)}
            className="h-8 w-full max-w-[200px] border border-[#D3D1C7] rounded-lg px-2 text-xs font-poppins focus:outline-none"
          >
            <option value="15 minutes">15 minutes</option>
            <option value="30 minutes">30 minutes</option>
            <option value="45 minutes">45 minutes</option>
            <option value="60 minutes">60 minutes</option>
          </select>
        </div>
      </div>

      <div className="bg-[#F5F4EE] rounded-xl p-3 text-[11px] text-neutral-500 flex items-center gap-2">
        <HugeiconsIcon icon={InformationCircleIcon} className="w-4 h-4 text-neutral-600 shrink-0" />
        <span>Current mode: <strong className="text-neutral-700">{bookingMode === "Manual" ? "Manual exact booking times" : "Auto-generated slots"}</strong>. Only this mode is active, so the business controls availability one way at a time.</span>
      </div>
    </div>
  );
}
