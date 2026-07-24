"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/landing-page/SearchBar";

// Imports
import { bookingsList } from "./mockBookings";
import BookingCard from "./BookingCard";
import RescheduleModal from "./RescheduleModal";

export default function BookingsPage() {
  // Shared Navbar State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // Stateful Bookings List
  const [localBookings, setLocalBookings] = useState(bookingsList);

  // Tab State
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "noshow" | "canceled">("upcoming");

  // Reschedule Modal State
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);
  const [cancelBookingId, setCancelBookingId] = useState<string | null>(null);
  const [showCancelSuccessMsg, setShowCancelSuccessMsg] = useState(false);

  // Collapsible Policy State (stores boolean for each booking ID)
  const [openPolicies, setOpenPolicies] = useState<Record<string, boolean>>({});

  // Local state for review form submission simulation
  const [submittedReviews, setSubmittedReviews] = useState<Record<string, { stars: number; text: string; date: string }>>({});
  const [ratingHover, setRatingHover] = useState<Record<string, number>>({});
  const [ratingInput, setRatingInput] = useState<Record<string, number>>({});
  const [reviewInput, setReviewInput] = useState<Record<string, string>>({});

  // Sync login status with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLogin = localStorage.getItem("isLoggedIn");
      if (savedLogin === "false") {
        setIsLoggedIn(false);
      }
    }
  }, []);

  const togglePolicy = (id: string) => {
    setOpenPolicies((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleReviewSubmit = (id: string) => {
    const stars = ratingInput[id] || 0;
    const text = reviewInput[id] || "";
    if (stars === 0) return;

    setSubmittedReviews((prev) => ({
      ...prev,
      [id]: {
        stars,
        text: text ? `“${text}”` : "“Excellent service!”",
        date: `Posted Today`
      }
    }));
  };

  const handleConfirmCancel = (id: string) => {
    setLocalBookings(prev => 
      prev.map(b => {
        if (b.id === id) {
          const isOutsideWindow = b.paymentType === "passed_fee" || b.paymentType === "passed_not_possible";
          return {
            ...b,
            paymentType: "canceled" as const,
            canceledType: isOutsideWindow ? ("by_you_fee_50" as const) : ("by_you_free" as const),
            canceledDateText: `Cancelled on Fri 17 Apr 2026 at 4:30 PM`,
            canceledSummary: {
              servicePrice: "€500.00",
              depositPaid: b.depositPaidAmount || "€0.00",
              cancellationFee: isOutsideWindow ? "€250.00" : undefined,
              refundedToCard: isOutsideWindow ? undefined : (b.depositPaidAmount || "€0.00"),
              depositRetainedText: isOutsideWindow ? (b.depositPaidAmount || "€0.00") : undefined,
              additionalChargeText: isOutsideWindow ? "€215.00" : undefined,
              totalFee: isOutsideWindow ? "€250.00" : "€0.00",
              footerNote: isOutsideWindow 
                ? "Cancellation fees are set independently by Uncle SAM Gents Salon, not by Bookly." 
                : "Allow 3-5 business days for your refund"
            }
          };
        }
        return b;
      })
    );
    setCancelBookingId(null);
    setShowCancelSuccessMsg(true);
  };

  const getCancelFees = (booking: any) => {
    if (booking.id === "booking-3") {
      return {
        depositPaid: "€35.00",
        retained: "€35.00",
        cancellationFee: "€250.00",
        additionalCharge: "€215.00"
      };
    }
    return {
      depositPaid: booking.depositPaidAmount || "€0.00",
      retained: booking.depositPaidAmount || "€0.00",
      cancellationFee: booking.depositPaidAmount || "€35.00",
      additionalCharge: "€0.00"
    };
  };

  // Filter bookings based on activeTab
  const filteredBookings = localBookings.filter((item) => {
    if (activeTab === "upcoming") {
      return ["deposit_paid", "no_deposit", "passed_fee", "passed_not_possible"].includes(item.paymentType);
    }
    return item.paymentType === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col relative overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 md:px-8 xl:px-[65px] flex flex-col z-10 relative items-center">
        
        {/* Reusable Search Bar */}
        <div className="w-full flex justify-center mb-[72px]">
          <SearchBar onSearch={(sq, lq, st) => console.log("Searching bookings:", sq, lq, st)} />
        </div>

        {/* Center alignment container matching Figma 1005px layout */}
        <div className="max-w-[1005px] w-full flex flex-col items-start gap-8 pb-20">
          
          {/* Header title */}
          <div className="w-full flex flex-col items-start gap-6">
            <h1 className="font-manrope font-bold text-[30px] leading-[36px] tracking-[-0.75px] text-[#020305] flex items-center">
              My Bookings
            </h1>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-row items-start p-0 gap-8 w-full border-b border-[#C6C6CB]">
            
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`flex flex-col justify-center items-center pb-3 border-b-2 cursor-pointer transition-all duration-200 w-auto px-1 whitespace-nowrap ${
                activeTab === "upcoming"
                  ? "border-[#020305] text-[#020305]"
                  : "border-transparent text-[#45474B] hover:text-[#020305]"
              }`}
            >
              <span className={`font-manrope text-base leading-6 flex items-center text-center ${activeTab === "upcoming" ? "font-bold" : "font-normal"}`}>
                Upcoming
              </span>
            </button>

            <button
              onClick={() => setActiveTab("completed")}
              className={`flex flex-col justify-center items-center pb-3 border-b-2 cursor-pointer transition-all duration-200 w-auto px-1 whitespace-nowrap ${
                activeTab === "completed"
                  ? "border-[#020305] text-[#020305]"
                  : "border-transparent text-[#45474B] hover:text-[#020305]"
              }`}
            >
              <span className={`font-manrope text-base leading-6 flex items-center text-center ${activeTab === "completed" ? "font-bold" : "font-normal"}`}>
                Completed
              </span>
            </button>

            <button
              onClick={() => setActiveTab("noshow")}
              className={`flex flex-col justify-center items-center pb-3 border-b-2 cursor-pointer transition-all duration-200 w-auto px-1 whitespace-nowrap ${
                activeTab === "noshow"
                  ? "border-[#020305] text-[#020305]"
                  : "border-transparent text-[#45474B] hover:text-[#020305]"
              }`}
            >
              <span className={`font-manrope text-base leading-6 flex items-center text-center ${activeTab === "noshow" ? "font-bold" : "font-normal"}`}>
                No-show
              </span>
            </button>

            <button
              onClick={() => setActiveTab("canceled")}
              className={`flex flex-col justify-center items-center pb-3 border-b-2 cursor-pointer transition-all duration-200 w-auto px-1 whitespace-nowrap ${
                activeTab === "canceled"
                  ? "border-[#020305] text-[#020305]"
                  : "border-transparent text-[#45474B] hover:text-[#020305]"
              }`}
            >
              <span className={`font-manrope text-base leading-6 flex items-center text-center ${activeTab === "canceled" ? "font-bold" : "font-normal"}`}>
                Canceled
              </span>
            </button>

          </div>

          {/* Bookings List */}
          <div className="flex flex-col items-start gap-6 w-full mt-2">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  openPolicies={openPolicies}
                  togglePolicy={togglePolicy}
                  submittedReviews={submittedReviews}
                  ratingHover={ratingHover}
                  setRatingHover={setRatingHover}
                  ratingInput={ratingInput}
                  setRatingInput={setRatingInput}
                  reviewInput={reviewInput}
                  setReviewInput={setReviewInput}
                  handleReviewSubmit={handleReviewSubmit}
                  onReschedule={(id) => setRescheduleBookingId(id)}
                  onCancel={(id) => setCancelBookingId(id)}
                />
              ))
            ) : (
              <div className="w-full text-center py-20 bg-white border border-[#C6C6CB] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <p className="text-[#45474B] text-lg font-medium">No bookings found in this category.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />

      {/* Reschedule Booking Modal Overlay */}
      {rescheduleBookingId && (
        <RescheduleModal
          bookingId={rescheduleBookingId}
          onClose={() => setRescheduleBookingId(null)}
          onSave={() => setRescheduleBookingId(null)}
        />
      )}

      {/* Cancellation Modal Overlay */}
      {cancelBookingId && (() => {
        const booking = localBookings.find(b => b.id === cancelBookingId);
        if (!booking) return null;
        const isOutsideWindow = booking.paymentType === "passed_fee" || booking.paymentType === "passed_not_possible";
        const fees = getCancelFees(booking);

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-manrope">
            <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[480px] w-full flex flex-col items-center select-none text-center">
              <h2 className="font-bold text-[32px] leading-10 text-[#020305] mb-2">
                Cancel your booking?
              </h2>
              
              <div className="text-lg font-medium text-[#111111] mb-1">
                {booking.businessName}
              </div>
              
              <div className="text-sm text-[#4E5F78] mb-6">
                Booking ID: {booking.bookingCode} &bull; {booking.date} | {booking.time}
              </div>

              <div className="text-[17px] font-semibold text-[#020305] mb-2">
                {booking.serviceTitle}
              </div>

              <div className="text-[17px] font-bold text-[#020305] mb-6">
                Deposit Paid: {fees.depositPaid}
              </div>

              <p className="text-sm text-[#4E5F78] leading-6 mb-8 px-2">
                {isOutsideWindow ? (
                  <>
                    You are outside the free cancellation window. {booking.businessName} charges a cancellation fee of {fees.cancellationFee} for cancellations at this time. Your deposit of {fees.retained} will be retained and an additional {fees.additionalCharge} will be charged to your saved card. Total cancellation fee: {fees.cancellationFee}. Cancellation fees are set independently by {booking.businessName}, not by Bookly.
                  </>
                ) : (
                  <>
                    You are within the free cancellation window set by {booking.businessName}. No charge applies. Your deposit of {fees.depositPaid} will be refunded to your card within 3-5 business days.
                  </>
                )}
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3 sm:gap-4 w-full">
                <button
                  type="button"
                  onClick={() => setCancelBookingId(null)}
                  className="w-full sm:flex-1 py-3 sm:py-3.5 border border-[#C6C6CB] rounded-full text-sm sm:text-base font-semibold text-[#020305] hover:bg-neutral-50 transition-colors"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => handleConfirmCancel(booking.id)}
                  className="w-full sm:flex-1 py-3 sm:py-3.5 bg-[#0D0D0D] hover:bg-black text-white rounded-full text-xs xs:text-sm sm:text-base font-semibold transition-colors whitespace-nowrap px-4"
                >
                  {isOutsideWindow ? `Cancel & pay ${fees.additionalCharge}` : "Yes"}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Cancellation Success Modal Overlay */}
      {showCancelSuccessMsg && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 font-manrope">
          <div className="bg-white rounded-[24px] shadow-2xl p-8 max-w-[440px] w-full flex flex-col items-center select-none text-center">
            {/* Green check circle */}
            <div className="w-16 h-16 bg-[#EEFDF4] rounded-full flex items-center justify-center mb-6">
              <svg className="w-8 h-8 text-[#30AE5A]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="font-bold text-[28px] leading-9 text-[#020305] mb-2">
              Cancellation Confirmed
            </h2>
            
            <p className="text-sm text-[#4E5F78] leading-6 mb-8 px-2">
              Your booking has been successfully cancelled. The changes are updated in your bookings list.
            </p>
            
            <button
              type="button"
              onClick={() => setShowCancelSuccessMsg(false)}
              className="w-full py-3.5 bg-[#0D0D0D] hover:bg-black text-white rounded-full text-base font-semibold transition-colors cursor-pointer"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
