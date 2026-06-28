"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// Hugeicons
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Location05Icon,
  Calendar01Icon,
  Tick01Icon,
  ArrowRight02Icon
} from "@hugeicons/core-free-icons";

// Mock Data
import { bookingsList, BookingItem } from "./mockBookings";

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
  const [selectedDate, setSelectedDate] = useState<number>(17); // default selected day
  const [selectedTime, setSelectedTime] = useState<string>("14:00"); // default selected time
  const [newNote, setNewNote] = useState<string>("");

  const isDepositType = !!booking.depositPaidAmount || booking.paymentType === "deposit_paid" || booking.paymentType === "passed_fee";
  const depositValue = booking.depositPaidAmount || "€16.00";
  const balanceValue = booking.atVenueAmount || "€34.00";

  // Days in August 2026
  const daysInMonth = Array.from({ length: 31 }, (_, i) => i + 1);

  // Time Slot Options
  const morningSlots = ["09:00", "09:30", "10:00", "10:30", "11:00", "11:30", "12:00", "12:30"];
  const afternoonSlots = ["13:00", "13:30", "14:00", "14:30", "15:00", "15:30", "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00"];

  return (
    <div className="fixed inset-0 bg-black/55 backdrop-blur-sm flex justify-center items-start overflow-y-auto z-50 sm:p-4 p-0 md:py-10">
      
      {/* Frame 2147239609: Main Content Card */}
      <div className="w-full max-w-[794px] bg-[#FFFFFF] sm:rounded-xl rounded-none border-x-0 sm:border-x border-y sm:border-y border-[#C6C6CB] shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] p-6 md:p-10 flex flex-col gap-8 relative my-auto animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close button top right */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold text-xl cursor-pointer z-10"
        >
          ✕
        </button>

        {/* Header Title: Reschedule booking */}
        <div className="w-full border-b border-gray-100 pb-4">
          <h1 className="font-poppins font-medium text-3xl leading-[40px] text-[#111111] flex items-center">
            Reschedule booking
          </h1>
          <p className="text-xs font-poppins text-[#4E5F78] mt-2 uppercase tracking-wider font-semibold">
            Select Date & Time
          </p>
        </div>

        {/* Salon Details Section */}
        <div className="flex flex-col md:flex-row items-start gap-4 w-full">
          
          {/* Salon Profile Picture */}
          <div className="w-[106px] h-[106px] rounded-lg overflow-hidden border border-[#C6C6CB] flex-shrink-0 relative">
            <Image
              src="/image/profile.jpg"
              alt="Uncle SAM Gents Salon"
              fill
              className="object-cover"
            />
          </div>

          {/* Salon Info */}
          <div className="flex-1 flex flex-col gap-1.5 font-poppins">
            <h2 className="font-semibold text-2xl text-black">
              {booking.businessName}
            </h2>
            
            {/* Rating Row */}
            <div className="flex items-center gap-2">
              <span className="font-semibold text-sm text-black">5.0</span>
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <img
                    key={idx}
                    src="/Icons/rattingfull.svg"
                    className="w-4 h-4 object-contain"
                    alt="star"
                  />
                ))}
              </div>
              <span className="text-sm text-black font-medium">(589)</span>
              <span className="text-gray-400">•</span>
              <span className="text-sm text-black font-medium">Reschedule 1 of 2</span>
            </div>

            {/* Location Badge */}
            <div className="flex items-center gap-1.5 text-sm text-[#4E5F78] font-medium">
              <HugeiconsIcon icon={Location05Icon} className="w-4 h-4 text-[#4E5F78]" />
              <span>Marasi Drive, Marquise Square Tower, Ground</span>
            </div>

            {/* Booking Reference ID */}
            <div className="text-sm text-[#4E5F78] font-medium mt-1">
              Booking ID: {booking.bookingCode}
            </div>

          </div>

        </div>

        {/* Horizontal Line separating sections */}
        <hr className="border-t border-[rgba(17,17,17,0.2)] w-full" />

        {/* Appointment Comparison block */}
        <div className="flex flex-col gap-4 w-full font-poppins">
          <h3 className="text-[#111111] font-medium text-lg">
            {booking.serviceTitle}
          </h3>

          {/* Date Comparison Grid */}
          <div className="flex flex-wrap items-center gap-3 text-sm font-medium">
            <HugeiconsIcon icon={Calendar01Icon} className="w-5 h-5 text-[#141B34]" />
            
            {/* Old date-time (Strikethrough) */}
            <span className="line-through text-[#111111]">
              {booking.date} • {booking.time}
            </span>

            <HugeiconsIcon icon={ArrowRight02Icon} className="w-5 h-5 text-[#141B34]" />

            {/* New selected date-time */}
            <span className="text-[#1F8900] font-semibold">
              Mon, {selectedDate} Aug • {selectedTime}
            </span>
          </div>

          {/* Payment breakdowns (Type 1 and Type 2) */}
          <div className="flex flex-col gap-3 border border-gray-100 rounded-lg p-4 bg-gray-50/50 mt-2">
            {isDepositType ? (
              // Type 1: Deposit Paid
              <>
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Deposit paid</span>
                  <span>{depositValue}</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Balance due at venue</span>
                  <span>{balanceValue}</span>
                </div>

                {/* Tick Alert Banner Type 1 */}
                <div className="flex items-center gap-3 bg-[#E5F5EF] border border-[#2A6D16]/20 rounded-xl p-3 mt-1 text-[#2A6D16] text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full border border-[#2A6D16] flex items-center justify-center flex-shrink-0">
                    <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 text-[#2A6D16]" />
                  </div>
                  <span>
                    Rescheduling is free. Your deposit of {depositValue} carries forward to your new appointment.
                  </span>
                </div>
              </>
            ) : (
              // Type 2: Returning Customer / No Deposit
              <>
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Deposit</span>
                  <span className="text-[#1F8900] font-semibold">None - returning customer</span>
                </div>
                <div className="flex justify-between items-center text-sm font-medium text-[#111111]">
                  <span>Full amount due at venue</span>
                  <span>{booking.atVenueAmount}</span>
                </div>

                {/* Tick Alert Banner Type 2 */}
                <div className="flex items-center gap-3 bg-[#E5F5EF] border border-[#2A6D16]/20 rounded-xl p-3 mt-1 text-[#2A6D16] text-sm font-semibold">
                  <div className="w-5 h-5 rounded-full border border-[#2A6D16] flex items-center justify-center flex-shrink-0">
                    <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 text-[#2A6D16]" />
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
        <div className="w-full flex flex-col gap-4 font-poppins">
          <div className="flex justify-between items-center w-full">
            <span className="font-semibold text-base text-[#111111]">August 2026</span>
            <div className="flex gap-2">
              <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">◀</button>
              <button className="p-1.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700">▶</button>
            </div>
          </div>

          {/* Weekdays */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-semibold text-gray-400 pb-2 border-b border-gray-100">
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
              const isPreviousDate = day === 17; // mock highlight
              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(day)}
                  className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
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
        <div className="w-full flex flex-col gap-6 font-poppins">
          
          {/* Morning */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400">Morning</h4>
            <div className="grid grid-cols-4 gap-2">
              {morningSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Afternoon */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase font-bold tracking-wider text-gray-400">Afternoon</h4>
            <div className="grid grid-cols-4 gap-2">
              {afternoonSlots.map((time) => {
                const isSelected = selectedTime === time;
                return (
                  <button
                    key={time}
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-3 border rounded-lg text-sm font-medium transition-all ${
                      isSelected
                        ? "bg-black border-black text-white"
                        : "border-gray-200 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

        {/* Appointment Notes section */}
        <div className="w-full flex flex-col gap-3 font-poppins border border-[#C6C6CB] rounded-xl p-4">
          <div className="flex justify-between items-center text-xs text-gray-500 font-medium uppercase tracking-wider">
            <span>Notes for your appointment</span>
            <span>Update if anything changed</span>
          </div>

          <div className="bg-[#F6F5F3] p-3 rounded-lg flex flex-col gap-1.5 text-sm text-[#111111] font-medium leading-relaxed">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Your previous note</span>
            <span>Please use organic products only, allergic to strong fragrances</span>
          </div>

          <textarea
            placeholder="Leave a new note or leave blank to keep your previous note ..."
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="w-full p-3 border border-[#C6C6CB] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-600 resize-none h-20"
          />
        </div>

        {/* Footer Action buttons */}
        <div className="flex gap-4 justify-end font-poppins">
          <button
            onClick={onClose}
            className="py-2.5 px-6 border border-[#C6C6CB] rounded-lg text-sm font-semibold text-[#020305] hover:bg-neutral-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="py-2.5 px-6 rounded-lg text-sm font-semibold bg-[#8EBAC5] text-[#020305] hover:bg-[#7ba9b4] transition-colors"
          >
            Save changes
          </button>
        </div>

      </div>

    </div>
  );
}
