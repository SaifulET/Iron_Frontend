"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon, Clock04Icon, InformationCircleIcon, Calendar01Icon } from "@hugeicons/core-free-icons";

interface TimeStepProps {
  selectedDate: string;
  setSelectedDate: (date: string) => void;
  selectedTimeSlot: string;
  setSelectedTimeSlot: (slot: string) => void;
  selectedDayNum: number;
  setSelectedDayNum: (day: number) => void;
}

export default function TimeStep({
  selectedDate,
  setSelectedDate,
  selectedTimeSlot,
  setSelectedTimeSlot,
  selectedDayNum,
  setSelectedDayNum,
}: TimeStepProps) {
  return (
    <div className="flex flex-col w-full lg:w-[714px]">
      {/* Title */}
      <h1 className="font-semibold text-3xl md:text-4xl text-[#1C1B1C]">Select Time</h1>
      
      {/* Status Indicators */}
      <div className="flex flex-wrap items-center gap-5 mt-10">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#D88888] rounded-full shrink-0" />
          <span className="text-sm font-medium text-[#111111] font-poppins tracking-wider">Holiday/Weekend</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#D1D1D1] rounded-full shrink-0" />
          <span className="text-sm font-medium text-[#111111] font-poppins tracking-wider">Current date</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-[#E5E5E5] rounded-full shrink-0" />
          <span className="text-sm font-medium text-[#111111] font-poppins tracking-wider">Booked slot</span>
        </div>
      </div>

      {/* Date Picker Section */}
      <div className="w-full bg-white border border-[#EBEAE6] rounded-2xl p-6 mt-[60px] shadow-sm">
        {/* Month Selector header */}
        <div className="flex justify-between items-center w-full mb-6 px-1">
          <span className="font-semibold text-[17.5px] text-[#0A0D14] font-poppins">August 2026</span>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 border border-[#E0DED9] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-50 text-[#141B34]">
              <HugeiconsIcon icon={ArrowLeft02Icon} size={20} />
            </button>
            <button className="w-10 h-10 border border-[#E0DED9] rounded-lg flex items-center justify-center cursor-pointer hover:bg-neutral-50 text-[#141B34]">
              <HugeiconsIcon icon={ArrowRight02Icon} size={20} />
            </button>
          </div>
        </div>

        {/* Days grid container */}
        <div className="grid grid-cols-7 gap-3 w-full text-center">
          {/* Weekday headers */}
          {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map(day => (
            <span key={day} className="text-xs font-semibold text-[#8C8A85] tracking-widest py-1 font-poppins uppercase">
              {day}
            </span>
          ))}

          {/* Dummy Days of previous month spacer */}
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={`prev-${i}`} className="aspect-square flex items-center justify-center text-neutral-300 font-medium text-sm">
              {25 + i}
            </div>
          ))}

          {/* Days list */}
          {[
            { num: 1, label: "Mon, Aug 1", weekend: false },
            { num: 2, label: "Tue, Aug 2", weekend: false },
            { num: 3, label: "Wed, Aug 3", weekend: false },
            { num: 4, label: "Thu, Aug 4", weekend: false },
            { num: 5, label: "Fri, Aug 5", weekend: false },
            { num: 6, label: "Sat, Aug 6", weekend: true },
            { num: 7, label: "Sun, Aug 7", weekend: true },
            { num: 8, label: "Mon, Aug 8", weekend: false },
            { num: 9, label: "Tue, Aug 9", weekend: false },
            { num: 10, label: "Wed, Aug 10", weekend: false },
            { num: 11, label: "Thu, Aug 11", weekend: false },
            { num: 12, label: "Fri, Aug 12", weekend: false },
            { num: 13, label: "Sat, Aug 13", weekend: true },
            { num: 14, label: "Sun, Aug 14", weekend: true },
            { num: 15, label: "Mon, Aug 15", weekend: false },
            { num: 16, label: "Tue, Aug 16", weekend: false },
            { num: 17, label: "Wed, Aug 17", weekend: false },
            { num: 18, label: "Thu, Aug 18", weekend: false },
            { num: 19, label: "Fri, Aug 19", weekend: false },
            { num: 20, label: "Sat, Aug 20", weekend: true },
            { num: 21, label: "Sun, Aug 21", weekend: true },
            { num: 22, label: "Mon, Aug 22", weekend: false },
            { num: 23, label: "Tue, Aug 23", weekend: false },
            { num: 24, label: "Wed, Aug 24", weekend: false },
            { num: 25, label: "Thu, Aug 25", weekend: false },
            { num: 26, label: "Fri, Aug 26", weekend: false },
            { num: 27, label: "Sat, Aug 27", weekend: true },
            { num: 28, label: "Sun, Aug 28", weekend: true },
            { num: 29, label: "Mon, Aug 29", weekend: false },
            { num: 30, label: "Tue, Aug 30", weekend: false },
            { num: 31, label: "Wed, Aug 31", weekend: false },
          ].map(day => {
            const isSelected = selectedDayNum === day.num;
            const isToday = day.num === 18;

            return (
              <button
                key={day.num}
                onClick={() => {
                  setSelectedDayNum(day.num);
                  setSelectedDate(day.label);
                }}
                className={`aspect-square flex flex-col items-center justify-center rounded-xl text-sm font-semibold transition-all cursor-pointer border ${
                  isSelected
                    ? "bg-[#2E9DA7] border-[#2E9DA7] text-white"
                    : isToday
                    ? "bg-[#D1D1D1] border-neutral-300 text-black hover:bg-neutral-200"
                    : day.weekend
                    ? "bg-[#D88888] border-[#D88888] text-white hover:opacity-90"
                    : "bg-transparent border-transparent text-[#0A0D14] hover:bg-neutral-50"
                }`}
              >
                <span>{day.num}</span>
                {day.num === 18 && (
                  <span className="text-[9px] mt-0.5 font-bold uppercase tracking-tighter opacity-80">TODAY</span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Time Slots Section */}
      <div className="w-full flex flex-col gap-8 mt-[65px]">
        <h3 className="font-semibold text-[22px] text-[#111111] font-poppins">Select Time Slot</h3>
        
        <div className="flex flex-col gap-7 w-full">
          {/* Morning Slots */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-400 font-poppins uppercase tracking-widest">
              <HugeiconsIcon icon={Clock04Icon} size={18} />
              <span>Morning</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full font-inter">
              <button
                onClick={() => setSelectedTimeSlot("10:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "10:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                10:00
              </button>
              <button className="py-3 border border-neutral-200 rounded-lg text-sm font-semibold text-[#111111] hover:bg-[#E5E5E5] transition-colors cursor-pointer bg-neutral-50/50 opacity-50">
                10:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("11:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "11:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                11:00
              </button>
              <button
                onClick={() => setSelectedTimeSlot("11:30")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "11:30" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                11:30
              </button>
            </div>
          </div>

          {/* Afternoon Slots */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex items-center gap-2 text-sm font-bold text-neutral-400 font-poppins uppercase tracking-widest">
              <HugeiconsIcon icon={Clock04Icon} size={18} />
              <span>Afternoon</span>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 w-full font-inter">
              <button
                onClick={() => setSelectedTimeSlot("12:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "12:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                12:00
              </button>
              <button
                onClick={() => setSelectedTimeSlot("12:30")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "12:30" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                12:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("13:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "13:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                13:00
              </button>
              <button
                onClick={() => setSelectedTimeSlot("13:30")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "13:30" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                13:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("14:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "14:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                14:00
              </button>
              <button
                onClick={() => setSelectedTimeSlot("14:30")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "14:30" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                14:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("15:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "15:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                15:00
              </button>
              <button
                onClick={() => setSelectedTimeSlot("15:30")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "15:30" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                15:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("16:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "16:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                16:00
              </button>
              <button
                onClick={() => setSelectedTimeSlot("16:30")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "16:30" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                16:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("17:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "17:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                17:00
              </button>
              <button
                onClick={() => setSelectedTimeSlot("17:30")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "17:30" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                17:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("18:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "18:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                18:00
              </button>
              <button className="py-3 border border-neutral-200 rounded-lg text-sm font-semibold text-[#111111] hover:bg-[#E5E5E5] transition-colors cursor-pointer bg-neutral-50/50 opacity-50">
                18:30
              </button>
              <button
                onClick={() => setSelectedTimeSlot("19:00")}
                className={`py-3 border rounded-lg text-sm font-semibold transition-all cursor-pointer ${
                  selectedTimeSlot === "19:00" ? "bg-black border-black text-white" : "border-neutral-200 text-[#111111] hover:bg-neutral-50"
                }`}
              >
                19:00
              </button>
            </div>
          </div>
        </div>

        {/* Group Size Warning banner */}
        <div className="w-full bg-[#F0F0FF] border border-neutral-200 rounded-xl p-5 flex gap-3.5 items-start mt-10">
          <HugeiconsIcon icon={InformationCircleIcon} size={24} className="text-black shrink-0" />
          <div className="flex flex-col gap-1 text-[14.5px] leading-relaxed text-[#666666] font-inter">
            <span>Your selected group size exceeds the remaining capacity for this time slot.</span>
            <span>Only 2 spots are available. Please choose another time or date.</span>
          </div>
        </div>

        {/* Fully booked calendar section helper */}
        <div className="w-full flex flex-col items-center justify-center gap-4 mt-[60px]">
          <span className="text-sm text-neutral-500">Available from Tue, Jun 3</span>
          <button className="bg-black hover:bg-neutral-800 text-white rounded-full px-6 py-3 font-semibold text-sm flex items-center gap-2 cursor-pointer transition-all">
            <span>Go to next available time</span>
            <HugeiconsIcon icon={Calendar01Icon} size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
