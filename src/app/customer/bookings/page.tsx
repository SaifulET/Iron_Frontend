"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";

// Imports
import { bookingsList } from "./mockBookings";
import BookingCard from "./BookingCard";
import RescheduleModal from "./RescheduleModal";

export default function BookingsPage() {
  // Shared Navbar State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // Tab State
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "noshow" | "canceled">("upcoming");

  // Reschedule Modal State
  const [rescheduleBookingId, setRescheduleBookingId] = useState<string | null>(null);

  // Collapsible Policy State (stores boolean for each booking ID)
  const [openPolicies, setOpenPolicies] = useState<Record<string, boolean>>({
    "booking-1": true,
    "booking-2": true,
    "booking-3": true,
    "booking-4": true,
    "booking-5": true,
    "booking-6": true,
    "booking-noshow-1": true,
    "booking-noshow-2": true,
    "booking-noshow-3": true,
    "booking-noshow-4": true,
    "booking-noshow-5": true,
    "booking-canceled-1": true,
    "booking-canceled-2": true,
    "booking-canceled-3": true,
    "booking-canceled-4": true,
    "booking-canceled-5": true,
    "booking-canceled-6": true,
  });

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

  // Filter bookings based on activeTab
  const filteredBookings = bookingsList.filter((item) => {
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
    </div>
  );
}
