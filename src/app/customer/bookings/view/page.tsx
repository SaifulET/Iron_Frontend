"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Hugeicons
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Mail01Icon,
  Location05Icon,
  Calendar01Icon,
  Clock01Icon,
  Share05Icon,
  MapsIcon
} from "@hugeicons/core-free-icons";

// Mock Data
import { bookingsList } from "../mockBookings";
import RescheduleModal from "../RescheduleModal";

export default function BookingViewPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("id") || "booking-1";

  // Find booking details
  const booking = bookingsList.find((b) => b.id === bookingId) || bookingsList[0];

  // Modal trigger for rescheduling directly from view details page
  const [isRescheduleOpen, setIsRescheduleOpen] = useState(false);

  // Map preview active toggle state
  const [showMap, setShowMap] = useState(false);

  // Dynamic values
  const hasDeposit = booking.paymentType === "deposit_paid" || booking.depositPaidAmount;

  return (
    <div className="min-h-screen bg-[#FCFAF9] flex flex-col relative overflow-x-hidden">
      <Navbar isLoggedIn={true} setIsLoggedIn={() => {}} selectedLanguage="ENG" setSelectedLanguage={() => {}} />

      {/* Breadcrumbs */}
      <div className="w-full lg:max-w-none lg:mx-0 lg:pl-[200px] px-4 md:px-0 pt-[22px] flex items-center gap-2 text-xs font-poppins font-medium text-gray-500 uppercase tracking-wider">
        <a href="#" className="hover:text-black">Home</a>
        <span>&gt;</span>
        <a href="/customer/bookings" className="hover:text-black">My Bookings</a>
        <span>&gt;</span>
        <span className="text-[#111111] font-bold">View Booking</span>
      </div>

      <main className="flex-1 w-full px-4 md:px-8 py-8 flex justify-center items-center">
        
        {/* Main Details Card Layout */}
        <div className="w-full max-w-[1005px] flex flex-col gap-6 pb-20 font-poppins">
          
          {/* CLIENT card */}
          <div className="w-full bg-[#FFFFFF] border border-[#ACAAB4] rounded-xl p-6 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-wider text-[#888780] uppercase">
              Client
            </span>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden border border-[#C6C6CB] relative flex-shrink-0">
                <Image
                  src="/image/profile1.png"
                  alt="Client Profile"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <span className="font-semibold text-lg text-[#111111]">John Doe</span>
                  <span className="bg-[#3A97D1] text-[#FFFFFF] text-[10px] font-bold tracking-widest px-3 py-0.5 rounded-full uppercase">
                    New
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm text-[#5F5E5A]">
                  <div className="flex items-center gap-2">
                    <HugeiconsIcon icon={Mail01Icon} className="w-4 h-4 text-gray-500" />
                    <span>sdf@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img src="/Icons/phone.svg" className="w-4 h-4 object-contain" alt="phone" />
                    <span>+123 566 889</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Salon Details card */}
          <div className="w-full bg-[#FFFFFF] border border-[#ACAAB4] rounded-xl p-6 flex flex-col gap-6">
            
            {/* Header info row */}
            <div className="flex flex-col md:flex-row items-start gap-4 w-full">
              <div className="w-[106px] h-[106px] rounded-lg overflow-hidden border border-[#C6C6CB] flex-shrink-0 relative">
                <Image
                  src="/image/profile.jpg"
                  alt={booking.businessName}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <h2 className="font-semibold text-2xl text-black">
                  {booking.businessName}
                </h2>
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
                <div className="flex items-center gap-1.5 text-sm text-[#4E5F78] font-medium">
                  <HugeiconsIcon icon={Location05Icon} className="w-4 h-4 text-[#4E5F78]" />
                  <span>Marasi Drive, Marquise Square Tower, Ground</span>
                </div>
                <div className="text-sm text-[#4E5F78] font-medium mt-1">
                  Booking ID: {booking.bookingCode}
                </div>
              </div>
            </div>

            <hr className="border-t border-[rgba(17,17,17,0.2)] w-full" />

            {/* Date & Time parameters */}
            <div className="flex flex-col md:flex-row gap-6 w-full">
              <div className="flex items-start gap-3">
                <HugeiconsIcon icon={Calendar01Icon} className="w-6 h-6 text-gray-500 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Date</span>
                  <span className="text-base font-semibold text-[#111111]">{booking.date}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <HugeiconsIcon icon={Clock01Icon} className="w-6 h-6 text-gray-500 mt-0.5" />
                <div className="flex flex-col">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Time</span>
                  <span className="text-base font-semibold text-[#111111]">{booking.time} • {booking.duration}</span>
                </div>
              </div>
            </div>

            {/* Staff / Professional */}
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full overflow-hidden border border-[#C6C6CB] relative flex-shrink-0">
                <Image
                  src="/image/profile.jpg"
                  alt="George"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="text-sm font-semibold text-gray-500">
                with George • Barber
              </span>
            </div>

          </div>

          {/* BOOKING SUMMARY card */}
          <div className="w-full bg-[#FFFFFF] border border-[#ACAAB4] rounded-xl p-6 flex flex-col gap-6">
            <span className="text-xs font-semibold tracking-wider text-[#888780] uppercase">
              Booking Summary
            </span>

            <div className="flex flex-col gap-4">
              
              {/* Primary service row */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base text-[#1C1B1C]">YARD Beard Package</span>
                  <span className="text-sm text-[#4E5F78]">Express Facial • Shave • Wax • 1 hr, 20 min</span>
                </div>
                <span className="font-semibold text-base text-[#1C1B1C]">€20</span>
              </div>

              {/* Add-ons row */}
              <div className="flex justify-between items-start gap-4">
                <div className="flex flex-col gap-1">
                  <span className="font-semibold text-base text-[#1C1B1C]">Add-ons</span>
                  <span className="text-sm text-[#4E5F78]">Hair wash (flat fee) • Scalp treatment (flat fee)</span>
                </div>
                <span className="font-semibold text-base text-[#1C1B1C]">€20</span>
              </div>

              <hr className="border-t border-[#757575] w-full my-1" />

              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="font-semibold text-base text-[#1C1B1C]">Subtotal</span>
                <span className="font-semibold text-base text-[#1C1B1C]">€40</span>
              </div>

              {/* Deposited amount */}
              <div className="w-full bg-[#F5F4EE] rounded-lg p-4 flex justify-between items-center text-sm font-medium">
                <span className="text-[#1C1B1C]">Deposited</span>
                <span className="text-[#1C1B1C] font-semibold">{hasDeposit ? "€8" : "—"}</span>
              </div>

              {/* Remaining balance */}
              <div className="w-full bg-[#F5F4EE] rounded-lg p-4 flex justify-between items-center text-sm font-medium">
                <span className="text-[#1C1B1C]">Remaining balance due at appointment</span>
                <span className="text-[#1C1B1C] font-bold text-lg">€32</span>
              </div>

            </div>
          </div>

          {/* WHERE TO GO card */}
          <div className="w-full bg-[#FFFFFF] border border-[#ACAAB4] rounded-xl p-6 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-wider text-[#888780] uppercase">
              Where to go
            </span>

            <div className="flex flex-col gap-4">
              <div className="flex items-start gap-2.5">
                <HugeiconsIcon icon={Location05Icon} className="w-5 h-5 text-[#111111] mt-0.5" />
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-[#111111]">Marasi Drive, Marquise Square Tower, Ground Floor</span>
                  <span className="text-sm text-gray-500">Larnaca • Near the old port</span>
                </div>
              </div>

              {/* Open in maps trigger link */}
              {/* Open in maps trigger link */}
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(booking.address || "Marasi Drive, Marquise Square Tower, Ground Floor, Larnaca")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-[#2E9DA7] font-semibold hover:underline"
              >
                <HugeiconsIcon icon={Share05Icon} className="w-4 h-4 text-[#2E9DA7]" />
                <span>Open in maps</span>
              </a>

              {/* Map Preview placeholder box */}
              {showMap ? (
                <div className="w-full h-44 rounded-lg overflow-hidden border border-[#ACAAB4]">
                  <iframe
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    style={{ border: 0 }}
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(booking.address || "Marasi Drive, Marquise Square Tower, Ground Floor, Larnaca")}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
                    allowFullScreen
                  />
                </div>
              ) : (
                <div
                  onClick={() => setShowMap(true)}
                  className="w-full h-44 bg-[#F5F4EE] rounded-lg flex flex-col justify-center items-center gap-2 border border-[#ACAAB4] cursor-pointer hover:bg-neutral-100 transition-colors"
                >
                  <HugeiconsIcon icon={MapsIcon} className="w-8 h-8 text-gray-400" />
                  <span className="text-sm text-gray-400 font-semibold uppercase tracking-wider">Map preview</span>
                </div>
              )}
            </div>
          </div>

          {/* NOTES FOR YOUR APPOINTMENT card */}
          <div className="w-full bg-[#FFFFFF] border border-[#ACAAB4] rounded-xl p-6 flex flex-col gap-4">
            <span className="text-xs font-semibold tracking-wider text-[#888780] uppercase">
              Notes for your appointment
            </span>

            <div className="bg-[#F5F4EE] p-4 rounded-lg flex flex-col gap-1.5 text-sm text-[#111111] font-medium leading-relaxed">
              <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-bold">Your previous note</span>
              <span>Please use organic products only, allergic to strong fragrances</span>
            </div>
          </div>

          {/* Footer Action buttons */}
          <div className="flex gap-4 justify-end mt-4">
            <button
              onClick={() => router.push("/customer/bookings")}
              className="py-2.5 px-6 rounded-lg text-sm font-semibold bg-[#BA1A1A] text-white hover:bg-red-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsRescheduleOpen(true)}
              className="py-2.5 px-6 border border-[#C6C6CB] rounded-lg text-sm font-semibold text-[#111111] hover:bg-neutral-100 transition-colors bg-white"
            >
              Reschedule
            </button>
          </div>

        </div>

      </main>

      <Footer />

      {/* Reschedule Modal Overlay */}
      {isRescheduleOpen && (
        <RescheduleModal
          bookingId={bookingId}
          onClose={() => setIsRescheduleOpen(false)}
          onSave={() => setIsRescheduleOpen(false)}
        />
      )}
    </div>
  );
}
