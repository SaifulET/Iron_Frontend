"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
// Hugeicons
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location05Icon,
  Calendar01Icon,
  Tick01Icon,
} from "@hugeicons/core-free-icons";

// Mock Data
import { bookingsList } from "./mockBookings";

interface RescheduleModalProps {
  bookingId: string;
  onClose: () => void;
  onSave: () => void;
}

export default function RescheduleModal({
  bookingId,
  onClose,
  onSave
}: RescheduleModalProps) {
  // Lock screen body scroll when modal is active
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  // Find booking details
  const booking = bookingsList.find((b) => b.id === bookingId) || bookingsList[0];

  // States for date/time selection
  const [selectedDate, setSelectedDate] = useState<number>(18); // default selected day is 18 (Tue)
  const [selectedTime, setSelectedTime] = useState<string>("14:00"); // default selected time
  const [newNote, setNewNote] = useState<string>("");

  const isDepositType = !!booking.depositPaidAmount || booking.paymentType === "deposit_paid" || booking.paymentType === "passed_fee";
  const depositValue = booking.depositPaidAmount || "€16.00";
  const balanceValue = booking.atVenueAmount || "€34.00";

  // Days in August 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Time Slot Options
  const morningSlots = [
    { time: "09:00", disabled: true },
    { time: "09:30", disabled: false },
    { time: "10:00", disabled: false },
    { time: "10:30", disabled: true },
    { time: "11:00", disabled: false },
    { time: "11:30", disabled: true },
    { time: "12:00", disabled: false },
    { time: "12:30", disabled: true }
  ];
  
  const afternoonSlots = [
    { time: "13:00", disabled: true },
    { time: "13:30", disabled: false },
    { time: "14:00", disabled: false },
    { time: "14:30", disabled: true },
    { time: "15:00", disabled: false },
    { time: "15:30", disabled: true },
    { time: "16:00", disabled: false },
    { time: "16:30", disabled: true },
    { time: "17:00", disabled: false },
    { time: "17:30", disabled: true },
    { time: "18:00", disabled: false },
    { time: "18:30", disabled: true },
    { time: "19:00", disabled: false }
  ];

  // Helper to format the large selected date display
  const getSelectedDateHeader = () => {
    // August 2026: Aug 1 is Saturday
    // Day 17 is Monday, Day 18 is Tuesday, etc.
    const dateObj = new Date(2026, 7, selectedDate);
    const options: Intl.DateTimeFormatOptions = { weekday: 'short', month: 'short', day: 'numeric' };
    return dateObj.toLocaleDateString('en-US', options);
  };

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50 sm:p-4 p-0 md:py-10">
      
      {/* Frame 2147239609: Main Content Card */}
      <div className="w-full max-w-[794px] bg-[#FFFFFF] sm:rounded-xl rounded-none border-x-0 sm:border-x border-y sm:border-y border-[#C6C6CB] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] p-6 md:p-10 flex flex-col gap-6 relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Header Title: Reschedule booking */}
        <div className="w-full text-center pb-2">
          <h1 className="font-poppins font-medium text-3xl leading-[40px] text-[#111111]">
            Reschedule booking
          </h1>
        </div>

        {/* SELECT DATE & TIME Section Header */}
        <div className="w-full">
          <p className="text-xs font-poppins text-[#111111] uppercase tracking-wider font-bold">
            Select Date & Time
          </p>
        </div>

        {/* Salon Details Section */}
        <div className="flex flex-row items-start gap-4 w-full">
          
          {/* Salon Profile Picture */}
          <div className="w-[80px] h-[80px] rounded-lg overflow-hidden border border-[#C6C6CB] flex-shrink-0 relative">
            <Image
              src="/image/profile.jpg"
              alt="Uncle SAM Gents Salon"
              fill
              className="object-cover"
            />
          </div>

          {/* Salon Info */}
          <div className="flex-1 flex flex-col gap-1 font-poppins">
            <h2 className="font-semibold text-lg text-black leading-tight">
              {booking.businessName}
            </h2>
            
            {/* Rating Row */}
            <div className="flex items-center gap-1.5 text-xs text-black">
              <span className="font-semibold">5.0</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <img
                    key={idx}
                    src="/Icons/rattingfull.svg"
                    className="w-3.5 h-3.5 object-contain"
                    alt="star"
                  />
                ))}
              </div>
              <span className="font-medium">(589)</span>
              <span className="text-gray-400">•</span>
              <span className="font-medium">Reschedule 1 of 2</span>
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-1 text-xs text-[#4E5F78] font-medium">
              <HugeiconsIcon icon={Location05Icon} className="w-3.5 h-3.5 text-[#4E5F78]" />
              <span>Marasi Drive, Marquise Square Tower, Ground</span>
            </div>

            {/* Booking Reference ID */}
            <div className="text-xs text-[#3A97D1] font-semibold">
              Booking ID: {booking.bookingCode}
            </div>

          </div>

        </div>

        {/* Horizontal Line separating sections */}
        <hr className="border-t border-[#EBEBEB] w-full" />

        {/* Appointment details comparison */}
        <div className="flex flex-col gap-3 w-full font-poppins">
          <h3 className="text-[#111111] font-semibold text-base">
            {booking.serviceTitle}
          </h3>

          {/* Date Comparison Row */}
          <div className="flex items-center gap-2 text-sm font-medium">
            <HugeiconsIcon icon={Calendar01Icon} className="w-4 h-4 text-gray-500" />
            <span className="line-through text-gray-500">
              Fri, 16 Aug • 10:00 AM
            </span>
            <span className="text-gray-500">→</span>
            <span className="text-[#1F8900] font-semibold">
              Mon, {selectedDate} Aug • {selectedTime}
            </span>
          </div>

          {/* Clean row-based payment comparison */}
          <div className="flex flex-col gap-2 mt-1">
            {isDepositType ? (
              <>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#111111]">Deposit</span>
                  <span className="text-gray-500">{depositValue}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#111111]">Balance due at venue</span>
                  <span className="text-[#111111] font-semibold">{balanceValue}</span>
                </div>

                {/* Tick Alert Banner Type 1 */}
                <div className="flex items-center gap-2 bg-[#E5F5EF] border border-[#2A6D16]/10 rounded-xl p-3.5 mt-1 text-[#2A6D16] text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full border border-[#2A6D16] flex items-center justify-center flex-shrink-0">
                    <HugeiconsIcon icon={Tick01Icon} className="w-2.5 h-2.5 text-[#2A6D16]" />
                  </div>
                  <span>
                    Rescheduling is free. Your deposit of {depositValue} carries forward to your new appointment.
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#111111]">Deposit</span>
                  <span className="text-[#1F8900] font-semibold">None - returning customer</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium">
                  <span className="text-[#111111]">Full amount due at venue</span>
                  <span className="text-[#111111] font-semibold">{booking.atVenueAmount}</span>
                </div>

                {/* Tick Alert Banner Type 2 */}
                <div className="flex items-center gap-2 bg-[#E5F5EF] border border-[#2A6D16]/10 rounded-xl p-3.5 mt-1 text-[#2A6D16] text-xs font-semibold">
                  <div className="w-4 h-4 rounded-full border border-[#2A6D16] flex items-center justify-center flex-shrink-0 animate-pulse">
                    <span className="text-[10px] text-[#2A6D16] font-bold">✓</span>
                  </div>
                  <span>
                    Rescheduling is free. No deposit required - you pay the full amount at the venue as usual.
                  </span>
                </div>
              </>
            )}
          </div>

        </div>

        {/* Calendar Picker Section */}
        <div className="w-full flex flex-col gap-3 font-poppins mt-2">
          
          {/* Calendar Header matching screenshot */}
          <div className="flex justify-between items-center w-full">
            <button className="flex items-center gap-1 font-semibold text-sm text-[#111111] hover:opacity-80">
              August 2026 <span className="text-[10px]">▼</span>
            </button>
            <div className="flex gap-4">
              <button className="text-gray-400 hover:text-black font-semibold">‹</button>
              <button className="text-gray-400 hover:text-black font-semibold">›</button>
            </div>
          </div>

          {/* Large display of selected date */}
          <div className="text-3xl font-normal text-black my-1">
            {getSelectedDateHeader()}
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 pb-1">
            <span>S</span>
            <span>M</span>
            <span>T</span>
            <span>W</span>
            <span>T</span>
            <span>F</span>
            <span>S</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-y-3 gap-x-1 text-center">
            {/* Aug 2026 starts on Saturday */}
            {Array.from({ length: 6 }).map((_, i) => (
              <span key={`empty-${i}`} />
            ))}

            {daysInMonth.map((day) => {
              const isSelected = selectedDate === day;
              const isPreviousDate = day === 17; // mock highlight from screenshot
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDate(day)}
                  className={`mx-auto w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    isSelected
                      ? "bg-black text-white"
                      : isPreviousDate
                      ? "bg-gray-200 text-black"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {day}
                </button>
              );
            })}
          </div>

        </div>

        {/* Time Picker Section */}
        <div className="w-full flex flex-col gap-4 font-poppins">
          
          {/* Morning */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Morning</h4>
            <div className="grid grid-cols-4 gap-2">
              {morningSlots.map((slot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={slot.disabled}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-2 px-3 border rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : slot.disabled
                        ? "border-transparent text-gray-300 line-through cursor-not-allowed"
                        : "border-gray-200 text-[#111111] hover:bg-gray-50"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Afternoon */}
          <div className="flex flex-col gap-2">
            <h4 className="text-[10px] uppercase font-bold tracking-wider text-gray-400">Afternoon</h4>
            <div className="grid grid-cols-4 gap-2">
              {afternoonSlots.map((slot) => {
                const isSelected = selectedTime === slot.time;
                return (
                  <button
                    key={slot.time}
                    type="button"
                    disabled={slot.disabled}
                    onClick={() => setSelectedTime(slot.time)}
                    className={`py-2 px-3 border rounded-lg text-xs font-semibold transition-all ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : slot.disabled
                        ? "border-transparent text-gray-300 line-through cursor-not-allowed"
                        : "border-gray-200 text-[#111111] hover:bg-gray-50"
                    }`}
                  >
                    {slot.time}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Appointment Notes section */}
        <div className="w-full flex flex-col gap-3 font-poppins border border-[#C6C6CB]/80 rounded-xl p-4">
          <div className="flex justify-between items-center text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
            <span>Notes for your appointment</span>
            <span>Update if anything changed</span>
          </div>

          <div className="bg-[#F5F4EE] p-4 rounded-lg flex flex-col gap-1 text-xs text-[#111111] font-medium leading-relaxed border-l-2 border-gray-300">
            <span className="text-[9px] text-gray-400 uppercase tracking-widest block font-bold">Your previous note</span>
            <span>Please use organic products only, allergic to strong fragrances</span>
          </div>

          <textarea
            placeholder="Leave a new note or leave blank to keep your previous note . . ."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-3 border border-[#C6C6CB]/80 rounded-lg text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-500 resize-none h-16"
          />
        </div>

        {/* Footer Action buttons */}
        <div className="flex gap-4 justify-end font-poppins mt-2">
          <button
            onClick={onClose}
            className="py-2 px-6 border border-[#C6C6CB] rounded-lg text-xs font-semibold text-[#020305] hover:bg-neutral-50 transition-colors bg-white"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="py-2 px-6 rounded-lg text-xs font-semibold bg-[#67B2C5] text-white hover:bg-[#57a1b4] transition-colors"
          >
            Save changes
          </button>
        </div>

      </div>

    </div>
  );
}
