"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";
import SearchBar from "@/components/SearchBar";

// Hugeicons
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BarCode01Icon,
  Location01Icon,
  Directions01Icon,
  Calendar03Icon,
  Clock01Icon,
  CreditCardPosIcon,
  Car04Icon
} from "@hugeicons/core-free-icons";

interface BookingItem {
  id: string;
  serviceTitle: string;
  bookingCode: string;
  businessName: string;
  phone: string;
  address: string;
  date: string;
  time: string;
  duration: string;
  paymentType: "deposit_paid" | "no_deposit" | "passed_fee" | "passed_not_possible" | "completed" | "noshow" | "canceled";
  depositPaidAmount?: string;
  atVenueAmount: string;
  imageUrl: string;
  reschedulesLeft: number;
  freeCancelUntil?: string;
  bookedOnText?: string;
  policyName: string;
  policyRules: {
    label: string;
    value: string;
    isHighlighted?: boolean;
    isGreen?: boolean;
  }[];
  policyFooter: string;
  // Completed review states
  isReviewed?: boolean;
  reviewStars?: number;
  reviewText?: string;
  reviewDate?: string;
  paymentSummary?: {
    total: string;
    depositPaid: string;
    balancePaid: string;
    noDepositVariant?: boolean;
  };
  // No-show states
  noshowType?: "waived_refund" | "waived_returning" | "charged_retained" | "charged_additional" | "charged_no_deposit";
  noshowDateText?: string;
  noshowSummary?: {
    servicePrice: string;
    noShowFee: string;
    depositPaidText?: string;
    depositRetainedText?: string;
    additionalChargeText?: string;
    chargeInitiatedText?: string;
    totalCharged: string;
    footerNote?: string;
  };
}

export default function BookingsPage() {
  const router = useRouter();

  // Shared Navbar State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // Tab State
  const [activeTab, setActiveTab] = useState<"upcoming" | "completed" | "noshow" | "canceled">("upcoming");

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

  // Mock Bookings Data
  const bookingsList: BookingItem[] = [
    {
      id: "booking-1",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "deposit_paid",
      depositPaidAmount: "€35.00",
      atVenueAmount: "€35.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 2,
      freeCancelUntil: "Wed 28 May at 10:30 AM",
      policyName: "Mario London Barber - cancellation & no show policy",
      policyRules: [
        { label: "More than 24 hours before", value: "Free", isGreen: true },
        { label: "12-24 hours before", value: "20% of service price" },
        { label: "2-12 hours before", value: "30% of service price" },
        { label: "Under 2 hours before", value: "50% of service price" },
        { label: "No-show", value: "50% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    },
    {
      id: "booking-2",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "no_deposit",
      atVenueAmount: "€35.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 2,
      freeCancelUntil: "Wed 28 May at 10:30 AM",
      policyName: "Mario London Barber - cancellation & no show policy",
      policyRules: [
        { label: "More than 24 hours before", value: "Free", isGreen: true },
        { label: "12-24 hours before", value: "20% of service price" },
        { label: "2-12 hours before", value: "30% of service price" },
        { label: "Under 2 hours before", value: "50% of service price" },
        { label: "No-show", value: "50% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    },
    {
      id: "booking-3",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Archangelou, 5 Larnaca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "passed_fee",
      depositPaidAmount: "€35.00",
      atVenueAmount: "€35.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 2,
      policyName: "LCA Studios -- cancellation & no-show policy",
      policyRules: [
        { label: "More than 7 day before", value: "Free", isGreen: true },
        { label: "3-7 days before", value: "30% of service price" },
        { label: "Under 3 days - applies now", value: "50% of service price = €250", isHighlighted: true },
        { label: "No-show", value: "100% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    },
    {
      id: "booking-4",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Archangelou, 5 Larnaca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "passed_not_possible",
      depositPaidAmount: "€35.00",
      atVenueAmount: "€35.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 2,
      policyName: "LCA Studios -- cancellation & no-show policy",
      policyRules: [
        { label: "More than 7 day before", value: "Free", isGreen: true },
        { label: "3-7 days before", value: "30% of service price" },
        { label: "Under 3 days - applies now", value: "50% of service price = €250" },
        { label: "No-show", value: "100% of service price", isHighlighted: true },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
    },
    // Completed state mocks matching Completed screenshot
    {
      id: "booking-5",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "completed",
      atVenueAmount: "€35.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
      policyName: "Payment summary",
      policyRules: [],
      policyFooter: "",
      isReviewed: true,
      reviewStars: 4,
      reviewText: "“Great cut and friendly service. Will be back.”",
      reviewDate: "Posted Fri 11 Apr 2026",
      paymentSummary: {
        total: "€35.00",
        depositPaid: "€35.00",
        balancePaid: "€35.00"
      }
    },
    {
      id: "booking-6",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "completed",
      atVenueAmount: "€35.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
      policyName: "Payment summary",
      policyRules: [],
      policyFooter: "",
      isReviewed: false,
      paymentSummary: {
        total: "€35.00",
        depositPaid: "€0.00",
        balancePaid: "€35.00",
        noDepositVariant: true
      }
    },
    // No-show state mocks matching the requested card types
    {
      id: "booking-noshow-1",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "noshow",
      atVenueAmount: "€50.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
      noshowType: "waived_refund",
      noshowDateText: "No-show fee waived on Fri 17 Apr 2026 at 4:30 PM",
      policyName: "Mario London Barber - cancellation & no show policy",
      policyRules: [
        { label: "More than 24 hours before", value: "Free", isGreen: true },
        { label: "12-24 hours before", value: "20% of service price" },
        { label: "2-12 hours before", value: "30% of service price" },
        { label: "Under 2 hours before", value: "50% of service price" },
        { label: "No-show", value: "50% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
      noshowSummary: {
        servicePrice: "€50.00",
        depositPaidText: "€10.00",
        noShowFee: "€0.00 charged",
        depositRetainedText: "€10.00",
        totalCharged: "€0.00",
        footerNote: "Uncle SAM Gents Salon chose to waive the fee for this appointment. Your next booking at Uncle SAM Gents Salon will require no deposit."
      }
    },
    {
      id: "booking-noshow-2",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "noshow",
      atVenueAmount: "€50.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
      noshowType: "waived_returning",
      noshowDateText: "No-show fee waived on Fri 17 Apr 2026 at 4:30 PM",
      policyName: "Mario London Barber - cancellation & no show policy",
      policyRules: [
        { label: "More than 24 hours before", value: "Free", isGreen: true },
        { label: "12-24 hours before", value: "20% of service price" },
        { label: "2-12 hours before", value: "30% of service price" },
        { label: "Under 2 hours before", value: "50% of service price" },
        { label: "No-show", value: "50% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
      noshowSummary: {
        servicePrice: "€50.00",
        depositPaidText: "Deposit not needed - returning customer",
        noShowFee: "€0.00 charged",
        totalCharged: "€0.00",
        footerNote: "Uncle SAM Gents Salon chose to waive the fee for this appointment."
      }
    },
    {
      id: "booking-noshow-3",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "noshow",
      atVenueAmount: "€80.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
      noshowType: "charged_retained",
      noshowDateText: "No-show fee charged on Fri 17 Apr 2026 at 4:30 PM",
      policyName: "Mario London Barber - cancellation & no show policy",
      policyRules: [
        { label: "More than 24 hours before", value: "Free", isGreen: true },
        { label: "12-24 hours before", value: "20% of service price" },
        { label: "2-12 hours before", value: "30% of service price" },
        { label: "Under 2 hours before", value: "50% of service price" },
        { label: "No-show", value: "50% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
      noshowSummary: {
        servicePrice: "€80.00",
        noShowFee: "€16.00 (20% - set by Business name)",
        depositRetainedText: "€16.00",
        additionalChargeText: "€0.00",
        chargeInitiatedText: "Charge initiated by Uncle SAM Gents Salon on Mon 7 Apr 2026 at 10:00 AM",
        totalCharged: "€16.00"
      }
    },
    {
      id: "booking-noshow-4",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "noshow",
      atVenueAmount: "€80.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
      noshowType: "charged_additional",
      noshowDateText: "No-show fee charged on Fri 17 Apr 2026 at 4:30 PM",
      policyName: "Mario London Barber - cancellation & no show policy",
      policyRules: [
        { label: "More than 24 hours before", value: "Free", isGreen: true },
        { label: "12-24 hours before", value: "20% of service price" },
        { label: "2-12 hours before", value: "30% of service price" },
        { label: "Under 2 hours before", value: "50% of service price" },
        { label: "No-show", value: "50% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
      noshowSummary: {
        servicePrice: "€80.00",
        noShowFee: "€40.00 (50% - set by Business name)",
        depositRetainedText: "€16.00",
        additionalChargeText: "€24.00",
        chargeInitiatedText: "Charge initiated by Uncle SAM Gents Salon on Mon 7 Apr 2026 at 10:00 AM",
        totalCharged: "€40.00"
      }
    },
    {
      id: "booking-noshow-5",
      serviceTitle: "Men's Haircut & Beard Trim",
      bookingCode: "123456",
      businessName: "Uncle SAM Gents Salon",
      phone: "+8566666",
      address: "Ermou 14, Larnacca",
      date: "Thu, 24 Oct",
      time: "10:30 AM",
      duration: "45min",
      paymentType: "noshow",
      atVenueAmount: "€80.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      bookedOnText: "Booked on Mon 7 Apr 2026 at 2:15 PM",
      noshowType: "charged_no_deposit",
      noshowDateText: "No-show fee charged on Fri 17 Apr 2026 at 4:30 PM",
      policyName: "Mario London Barber - cancellation & no show policy",
      policyRules: [
        { label: "More than 24 hours before", value: "Free", isGreen: true },
        { label: "12-24 hours before", value: "20% of service price" },
        { label: "2-12 hours before", value: "30% of service price" },
        { label: "Under 2 hours before", value: "50% of service price" },
        { label: "No-show", value: "50% of service price" },
      ],
      policyFooter: "Fees set by Mario London Barber, not by Bookly. Based on full service price.",
      noshowSummary: {
        servicePrice: "€80.00",
        noShowFee: "€40.00 (50% - set by Business name)",
        depositPaidText: "Deposit not needed - returning customer",
        chargeInitiatedText: "Charge initiated by Uncle SAM Gents Salon on Mon 7 Apr 2026 at 10:00 AM",
        totalCharged: "€40.00"
      }
    },
    // Canceled state mock
    {
      id: "booking-8",
      serviceTitle: "Nail Styling & Buffing",
      bookingCode: "112131",
      businessName: "Zara Beauty Salon",
      phone: "+8566611",
      address: "Ledra Street, Nicosia",
      date: "Mon, 1 Jul",
      time: "09:30 AM",
      duration: "50min",
      paymentType: "canceled",
      atVenueAmount: "€30.00",
      imageUrl: "/image/profile.jpg",
      reschedulesLeft: 0,
      policyName: "Standard Booking Policy",
      policyRules: [],
      policyFooter: "",
    },
  ];

  // Filter bookings based on activeTab
  const filteredBookings = bookingsList.filter((item) => {
    if (activeTab === "upcoming") {
      return ["deposit_paid", "no_deposit", "passed_fee", "passed_not_possible"].includes(item.paymentType);
    }
    return item.paymentType === activeTab;
  });

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col relative overflow-x-hidden">
      {/* Background Soft Orbs */}
      {/* <EdgeSoftOrbsTop size={380} duration={56} intensity={0.85} blend="screen" zIndex={-5} /> */}

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
              filteredBookings.map((booking) => {
                const isPolicyOpen = !!openPolicies[booking.id];
                const submitted = submittedReviews[booking.id];
                const hasReviewLeft = booking.isReviewed || !!submitted;
                const activeStars = submitted ? submitted.stars : (booking.reviewStars || 0);
                const activeReviewText = submitted ? submitted.text : (booking.reviewText || "");
                const activeReviewDate = submitted ? submitted.date : (booking.reviewDate || "");

                // No-show statuses check
                const isWaived = booking.noshowType === "waived_refund" || booking.noshowType === "waived_returning";

                return (
                  <div
                    key={booking.id}
                    className="w-full bg-[#FFFFFF] border border-[#C6C6CB] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col p-6 gap-6"
                  >
                    
                    {/* Top Content Row */}
                    <div className="flex flex-col md:flex-row gap-6 w-full items-start">
                      
                      {/* Image Block */}
                      <div className="w-[80px] h-[80px] border border-[#C6C6CB] rounded-lg overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={booking.imageUrl}
                          alt={booking.businessName}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      {/* Main Booking Details */}
                      <div className="flex-1 flex flex-col gap-3 min-w-0">
                        
                        {/* Title and Badge */}
                        <div className="flex flex-wrap items-center gap-2">
                          <h2 className="font-manrope font-bold text-lg leading-7 text-[#020305]">
                            {booking.serviceTitle}
                          </h2>
                          <span className={`px-2.5 py-0.5 rounded-full font-manrope font-semibold text-xs leading-4 ${
                            booking.paymentType === "completed"
                              ? "bg-[#CFFED6] text-[#093213]"
                              : booking.paymentType === "noshow" && isWaived
                              ? "bg-[#EBFFEE] text-[#093213]"
                              : booking.paymentType === "noshow" && !isWaived
                              ? "bg-red-50 text-red-700"
                              : "bg-[#CFE1FE] text-[#091C32]"
                          }`}>
                            {booking.paymentType === "completed" 
                              ? "Completed" 
                              : booking.paymentType === "noshow" && isWaived
                              ? "No-show - fee waived"
                              : booking.paymentType === "noshow" && !isWaived
                              ? "No-show"
                              : "Confirmed"}
                          </span>
                        </div>

                        {/* Barcode / Reference number using Hugeicons */}
                        <div className="flex items-center gap-1.5 text-sm text-[#111111] font-manrope">
                          <HugeiconsIcon icon={BarCode01Icon} className="w-4 h-4 text-[#141B34]" />
                          <span>{booking.bookingCode}</span>
                        </div>

                        {/* Business Name and Phone */}
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope">
                          <div className="flex items-center gap-1">
                            <img src="/Icons/salonNameIcon.svg" className="w-[13.4px] h-[12px] object-contain" alt="salon" />
                            <span className="font-normal">{booking.businessName}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center gap-1.5">
                            <img src="/Icons/phone.svg" className="w-3 h-3 object-contain" alt="phone" />
                            <span className="font-normal">{booking.phone}</span>
                          </div>
                        </div>

                        {/* Location and Directions */}
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope">
                          <div className="flex items-center gap-1.5">
                            {booking.address.includes("Archangelou") ? (
                              <>
                                <HugeiconsIcon icon={Car04Icon} className="w-4 h-4 text-[#111111]" />
                                <span className="font-normal">Traveling to you</span>
                              </>
                            ) : (
                              <>
                                <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-[#111111]" />
                                <span className="font-normal">{booking.address}</span>
                              </>
                            )}
                          </div>
                          {booking.address.includes("Archangelou") && (
                            <>
                              <span className="text-gray-400">•</span>
                              <span className="font-normal text-gray-600">{booking.address}</span>
                            </>
                          )}
                          {!booking.address.includes("Archangelou") && (
                            <>
                              <span className="text-gray-400">•</span>
                              <a href="#" className="text-[#2E9DA7] font-normal hover:underline flex items-center gap-1">
                                <HugeiconsIcon icon={Directions01Icon} className="w-4 h-4 text-[#2E9DA7]" />
                                <span className="text-[#2E9DA7]">Get Directions</span>
                              </a>
                            </>
                          )}
                        </div>

                        {/* Date and Time Details */}
                        <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope font-medium">
                          <div className="flex items-center gap-1">
                            <HugeiconsIcon icon={Calendar03Icon} className="w-4 h-4 text-[#111111]" />
                            <span>{booking.date} at 10:30 AM</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center gap-1">
                            <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-[#111111]" />
                            <span>{booking.time}</span>
                          </div>
                          <span className="text-gray-400">•</span>
                          <div className="flex items-center gap-1">
                            <span>{booking.duration}</span>
                          </div>
                        </div>

                        {/* Extra bookedOn and No-show logs */}
                        {booking.bookedOnText && (
                          <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope font-medium mt-1">
                            <div className="flex items-center gap-1">
                              <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-[#111111]" />
                              <span>{booking.bookedOnText}</span>
                            </div>
                            {booking.noshowDateText && (
                              <>
                                <span className="text-gray-400">•</span>
                                <div className="flex items-center gap-1">
                                  <span className="text-sm font-semibold">✕</span>
                                  <span>{booking.noshowDateText}</span>
                                </div>
                              </>
                            )}
                          </div>
                        )}

                      </div>

                      {/* Right Side Buttons Layout */}
                      <div className="w-full md:w-[209px] flex flex-col gap-3 flex-shrink-0">
                        <button className="w-full py-2 bg-[#FCF8F8] border border-[#C6C6CB] rounded-lg text-sm font-medium text-[#020305] hover:bg-neutral-100 transition-colors">
                          View
                        </button>
                        
                        {["completed", "noshow", "canceled"].includes(booking.paymentType) ? (
                          <button className="w-full py-2 border rounded-lg text-sm font-medium transition-colors bg-[#8EBAC5] bg-opacity-40 border-[#C6C6CB] text-[#020305] hover:bg-opacity-60">
                            Rebook
                          </button>
                        ) : (
                          <>
                            <button
                              disabled={["passed_fee", "passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)}
                              className={`w-full py-2 border rounded-lg text-sm font-medium transition-colors ${
                                ["passed_fee", "passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)
                                  ? "bg-neutral-50 border-neutral-200 text-neutral-300 cursor-not-allowed"
                                  : "bg-[#FCF8F8] border-[#C6C6CB] text-[#020305] hover:bg-neutral-100"
                              }`}
                            >
                              Reschedule (2 left)
                            </button>

                            <button
                              disabled={["passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)}
                              className={`w-full py-2 border rounded-lg text-sm font-medium transition-colors ${
                                ["passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)
                                  ? "bg-red-50/30 border-red-100/50 text-red-300 cursor-not-allowed"
                                  : "bg-[#FCF8F8] border-[rgba(186,26,26,0.2)] text-[#BA1A1A] hover:bg-red-50"
                              }`}
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>

                    </div>

                    {/* Payment Summary (Completed state only) */}
                    {booking.paymentType === "completed" && booking.paymentSummary && (
                      <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
                        <div
                          className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-[#FCFAF9] hover:bg-neutral-50 transition-colors"
                          onClick={() => togglePolicy(booking.id)}
                        >
                          <span className="font-poppins font-medium text-base text-[#1C1B1C]">
                            Payment summary
                          </span>
                          <span className={`text-xs transform transition-transform duration-200 ${isPolicyOpen ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </div>

                        {isPolicyOpen && (
                          <div className="p-4 flex flex-col gap-3 bg-[#FCFAF9] border-t border-[#EBEBEB] text-sm font-poppins">
                            <div className="flex justify-between items-center text-[#4E5F78]">
                              <span>Service total</span>
                              <span className="font-manrope font-normal text-[#4E5F78]">{booking.paymentSummary.total}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#4E5F78]">
                              <span>{booking.paymentSummary.noDepositVariant ? "Returning customer - no deposit" : "Deposit paid online"}</span>
                              <span className="font-manrope font-normal text-[#4E5F78]">{booking.paymentSummary.depositPaid}</span>
                            </div>
                            <div className="flex justify-between items-center text-[#4E5F78]">
                              <span>Balance paid at venue</span>
                              <span className="font-manrope font-normal text-[#4E5F78]">{booking.paymentSummary.balancePaid}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* No-show details expander (Waived / Charged summaries) */}
                    {booking.paymentType === "noshow" && booking.noshowSummary && (
                      <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
                        
                        {/* Header banner */}
                        <div
                          className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors ${
                            isWaived ? "bg-[#EBFFEE] hover:bg-[#D6FEDD]" : "bg-red-50 hover:bg-red-100/70"
                          }`}
                          onClick={() => togglePolicy(booking.id)}
                        >
                          <div className="flex items-center gap-2">
                            {isWaived ? (
                              <>
                                <span className="font-poppins font-semibold text-base text-[#1F8900]">
                                  No-show fee waived
                                </span>
                              </>
                            ) : (
                              <>
                                <span className="font-poppins font-semibold text-base text-red-800">
                                  No-show fee charged • {booking.noshowSummary.totalCharged} total
                                </span>
                              </>
                            )}
                          </div>
                          <span className={`text-xs transform transition-transform duration-200 ${isPolicyOpen ? "rotate-180" : ""}`}>
                            ▼
                          </span>
                        </div>

                        {/* Collapsible panel body */}
                        {isPolicyOpen && (
                          <div className={`p-5 flex flex-col gap-4 border-t text-sm font-poppins ${isWaived ? "bg-[#EBFFEE] border-[#D6FEDD]" : "bg-red-50 border-red-100"}`}>
                            
                            <div className="flex flex-col gap-3 w-full">
                              <div className="flex justify-between items-center text-[#4E5F78]">
                                <span>Service price</span>
                                <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.servicePrice}</span>
                              </div>

                              {booking.noshowSummary.depositPaidText && (
                                <div className="flex justify-between items-center text-[#4E5F78]">
                                  <span>{booking.noshowSummary.depositPaidText.includes("returning") ? "Deposit not needed - returning customer" : "Deposit paid"}</span>
                                  <span className="font-manrope text-[#4E5F78]">
                                    {booking.noshowSummary.depositPaidText.includes("returning") ? "-" : booking.noshowSummary.depositPaidText}
                                  </span>
                                </div>
                              )}

                              <div className="flex justify-between items-center text-[#4E5F78]">
                                <span>{isWaived ? "No-show fee waived by Business name" : "No-show fee"}</span>
                                <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.noShowFee}</span>
                              </div>

                              {booking.noshowSummary.depositRetainedText && (
                                <div className="flex justify-between items-center text-[#4E5F78]">
                                  <span>Deposit retained as no show fee</span>
                                  <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.depositRetainedText}</span>
                                </div>
                              )}

                              {booking.noshowSummary.additionalChargeText && (
                                <div className="flex justify-between items-center text-[#4E5F78]">
                                  <span>Additional charge to your card</span>
                                  <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.additionalChargeText}</span>
                                </div>
                              )}

                              {booking.noshowSummary.chargeInitiatedText && (
                                <div className="flex justify-between items-center text-xs text-gray-500 italic pt-1 border-t border-dashed border-gray-200">
                                  <span>{booking.noshowSummary.chargeInitiatedText}</span>
                                  <span>-</span>
                                </div>
                              )}
                            </div>

                            {/* Waived specific info note */}
                            {booking.noshowSummary.footerNote && (
                              <>
                                <div className="border-t border-gray-200/60 my-1 w-full" />
                                <p className="font-poppins font-normal text-sm text-[#4E5F78] leading-5 text-left">
                                  {booking.noshowSummary.footerNote}
                                </p>
                              </>
                            )}

                            {/* Charged total summary row */}
                            {!isWaived && (
                              <>
                                <div className="border-t border-gray-300 my-1 w-full" />
                                <div className="flex justify-between items-center font-bold text-red-800 text-base">
                                  <span>Total no-show fee charged</span>
                                  <span className="font-manrope">{booking.noshowSummary.totalCharged}</span>
                                </div>
                              </>
                            )}

                          </div>
                        )}

                      </div>
                    )}

                    {/* Cancellation & No-Show Policy Accordion (For Completed and No-show cards) */}
                    {["completed", "noshow"].includes(booking.paymentType) && booking.policyRules && booking.policyRules.length > 0 && (
                      <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
                        
                        <div
                          className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-white hover:bg-neutral-50 transition-colors"
                          onClick={() => togglePolicy(booking.id + "-policy-collapse")}
                        >
                          <span className="font-poppins font-medium text-sm text-[#4E5F78]">
                            View Cancellation & no-show policy
                          </span>
                          <div className="flex items-center gap-1 text-[#4E5F78]">
                            <span className="font-poppins font-medium text-sm leading-5">Cancellation policy</span>
                            <span className={`text-xs transform transition-transform duration-200 ${openPolicies[booking.id + "-policy-collapse"] ? "rotate-180" : ""}`}>
                              ▼
                            </span>
                          </div>
                        </div>

                        {openPolicies[booking.id + "-policy-collapse"] && (
                          <div className="p-5 flex flex-col gap-4 bg-white border-t border-[#EBEBEB] text-xs font-poppins">
                            <h4 className="font-normal text-[#4E5F78]">
                              {booking.policyName}
                            </h4>
                            <div className="flex flex-col gap-3 w-full">
                              {booking.policyRules.map((rule, index) => (
                                <div key={index} className="flex justify-between items-center text-xs font-poppins">
                                  <span className={`font-normal ${rule.isHighlighted ? "text-[#BA1A1A] font-medium" : "text-[#4E5F78]"}`}>
                                    {rule.label}
                                  </span>
                                  <span className={`font-semibold ${
                                    rule.isGreen 
                                      ? "text-[#30AE5A]" 
                                      : rule.isHighlighted
                                      ? "text-[#BA1A1A] font-bold"
                                      : "text-[#4E5F78]"
                                  }`}>
                                    {rule.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                            <div className="border-t border-[#B3B3B3] my-1 w-full" />
                            <p className="font-normal text-[#4E5F78]">
                              {booking.policyFooter}
                            </p>
                          </div>
                        )}

                      </div>
                    )}

                    {/* Review Section (Completed tab only) */}
                    {booking.paymentType === "completed" && (
                      <div className="w-full">
                        {hasReviewLeft ? (
                          <div className="w-full p-4 border border-black rounded-xl flex flex-col gap-3 bg-white font-poppins">
                            <div className="flex items-center justify-between">
                              <span className="font-poppins font-medium text-base text-[#4E5F78]">Your review</span>
                            </div>
                            <div className="flex flex-col gap-2">
                              <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: 5 }).map((_, idx) => (
                                    <img
                                      key={idx}
                                      src={idx < activeStars ? "/Icons/rattingfull.svg" : "/Icons/ratting.svg"}
                                      className="w-4 h-4 object-contain"
                                      alt="star"
                                    />
                                  ))}
                                </div>
                                <span className="text-sm font-medium text-[#4E5F78]">{activeStars} out of 5</span>
                              </div>
                              <p className="text-base font-semibold italic text-[#4E5F78] mt-1">
                                {activeReviewText}
                              </p>
                              <p className="text-sm text-[#4E5F78] font-medium mt-1">
                                {activeReviewDate}
                              </p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full p-4 border border-[#C6C6CB] rounded-xl flex flex-col gap-4 bg-white font-poppins">
                            <h4 className="font-poppins font-medium text-sm text-[#4E5F78]">
                              How was your experience? Leave a review for Uncle Sam Gents Salon
                            </h4>
                            <div className="flex items-center gap-1">
                              {Array.from({ length: 5 }).map((_, idx) => {
                                const starValue = idx + 1;
                                const isFilled = starValue <= (ratingHover[booking.id] || ratingInput[booking.id] || 0);
                                return (
                                  <button
                                    key={idx}
                                    type="button"
                                    onMouseEnter={() => setRatingHover((prev) => ({ ...prev, [booking.id]: starValue }))}
                                    onMouseLeave={() => setRatingHover((prev) => ({ ...prev, [booking.id]: 0 }))}
                                    onClick={() => setRatingInput((prev) => ({ ...prev, [booking.id]: starValue }))}
                                    className="cursor-pointer transition-transform hover:scale-110"
                                  >
                                    <img
                                      src={isFilled ? "/Icons/rattingfull.svg" : "/Icons/ratting.svg"}
                                      className="w-4 h-4 object-contain"
                                      alt="star"
                                    />
                                  </button>
                                );
                              })}
                            </div>
                            <textarea
                              placeholder="share your experience (optional)"
                              value={reviewInput[booking.id] || ""}
                              onChange={(e) => setReviewInput((prev) => ({ ...prev, [booking.id]: e.target.value }))}
                              className="w-full p-3 border border-[#C6C6CB] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-600 resize-none h-20"
                            />
                            <div className="flex justify-start">
                              <button
                                onClick={() => handleReviewSubmit(booking.id)}
                                disabled={!(ratingInput[booking.id] > 0)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                  ratingInput[booking.id] > 0
                                    ? "bg-[#8EBAC5] bg-opacity-80 text-[#020305] hover:bg-opacity-100 cursor-pointer"
                                    : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                                }`}
                              >
                                Submit review
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Cancellation Policy Banner Section (For active/upcoming reservations) */}
                    {booking.policyRules && booking.policyRules.length > 0 && booking.paymentType !== "completed" && booking.paymentType !== "noshow" && (
                      <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
                        
                        {/* Banner header row */}
                        <div
                          className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors ${
                            booking.paymentType === "passed_fee" || booking.paymentType === "passed_not_possible"
                              ? "bg-[#FDF2E2] hover:bg-[#FBE9D4]"
                              : "bg-[#FCFAF9] hover:bg-neutral-50"
                          }`}
                          onClick={() => togglePolicy(booking.id)}
                        >
                          
                          {/* Alert info text */}
                          <div className="flex items-center gap-2">
                            {booking.paymentType === "passed_fee" || booking.paymentType === "passed_not_possible" ? (
                              <>
                                <img src="/Icons/danger-outilne.svg" className="w-4 h-4 object-contain" alt="warning" />
                                <span className="font-poppins font-medium text-sm text-[#8A4B08] leading-5">
                                  {booking.paymentType === "passed_fee" 
                                    ? "Free cancellation window has passed - a fee applies if you cancel now"
                                    : "Free cancellation window has passed - cancellation is not possible at this time"
                                  }
                                </span>
                              </>
                            ) : (
                              <>
                                <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-[#2B8739]" />
                                <span className="font-poppins font-medium text-sm text-[#2B8739] leading-5">
                                  Free cancellation until Wed 28 May at 10:30 AM
                                </span>
                              </>
                            )}
                          </div>

                          {/* Cancellation toggle trigger */}
                          <div className="flex items-center gap-1.5 text-[#4E5F78]">
                            <span className="font-poppins font-medium text-sm leading-5">Cancellation policy</span>
                            <span className={`text-xs transform transition-transform duration-200 ${isPolicyOpen ? "rotate-180" : ""}`}>
                              ▼
                            </span>
                          </div>

                        </div>

                        {/* Collapsible body */}
                        {isPolicyOpen && (
                          <div className="p-5 flex flex-col gap-4 bg-white border-t border-[#EBEBEB]">
                            
                            <h4 className="font-poppins font-normal text-xs text-[#4E5F78] leading-5">
                              {booking.policyName}
                            </h4>

                            <div className="flex flex-col gap-3 w-full">
                              {booking.policyRules.map((rule, index) => (
                                <div key={index} className="flex justify-between items-center text-xs font-poppins">
                                  <span className={`font-normal ${rule.isHighlighted ? "text-[#BA1A1A] font-medium" : "text-[#4E5F78]"}`}>
                                    {rule.label}
                                  </span>
                                  <span className={`font-semibold ${
                                    rule.isGreen 
                                      ? "text-[#30AE5A]" 
                                      : rule.isHighlighted
                                      ? "text-[#BA1A1A] font-bold"
                                      : "text-[#4E5F78]"
                                  }`}>
                                    {rule.value}
                                  </span>
                                </div>
                              ))}
                            </div>

                            {booking.policyFooter && (
                              <>
                                <div className="border-t border-[#B3B3B3] my-1 w-full" />
                                <p className="font-poppins font-normal text-xs text-[#4E5F78] leading-5">
                                  {booking.policyFooter}
                                </p>
                              </>
                            )}

                          </div>
                        )}

                      </div>
                    )}

                  </div>
                );
              })
            ) : (
              <div className="w-full text-center py-20 bg-white border border-[#C6C6CB] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <p className="text-[#45474B] text-lg font-medium">No bookings found in this category.</p>
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
