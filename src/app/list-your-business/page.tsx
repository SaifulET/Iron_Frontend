"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Search01Icon,
  Tick01Icon,
  SaveMoneyDollarIcon,
  Clock01Icon,
  Analytics01Icon,
  Calendar03Icon,
  UserGroup03Icon,
  ZapIcon
} from "@hugeicons/core-free-icons";

// Reused components
import Navbar from "@/components/Navbar";
import BusinessMockup from "@/components/BusinessMockup";
import TrustedBusinessCard, { TrustedBusiness } from "@/components/TrustedBusinessCard";
import Carousel from "@/components/Carousel";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";

export default function ListYourBusinessPage() {
  const router = useRouter();

  // Banner State
  const [showBanner, setShowBanner] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isLoggedIn");
      if (saved === "true") {
        setIsLoggedIn(true);
      }
    }
  }, []);

  // Intersection observer for animation triggers
  const cardsContainerRef = useRef<HTMLDivElement | null>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  const featuresContainerRef = useRef<HTMLDivElement | null>(null);
  const [featuresVisible, setFeaturesVisible] = useState(false);

  const categoriesContainerRef = useRef<HTMLDivElement | null>(null);
  const [categoriesVisible, setCategoriesVisible] = useState(false);

  useEffect(() => {
    const observerOptions = { threshold: 0.1 };

    const cardsObserver = new IntersectionObserver(([entry]) => {
      setCardsVisible(entry.isIntersecting);
    }, observerOptions);

    const featuresObserver = new IntersectionObserver(([entry]) => {
      setFeaturesVisible(entry.isIntersecting);
    }, observerOptions);

    const categoriesObserver = new IntersectionObserver(([entry]) => {
      setCategoriesVisible(entry.isIntersecting);
    }, observerOptions);

    if (cardsContainerRef.current) cardsObserver.observe(cardsContainerRef.current);
    if (featuresContainerRef.current) featuresObserver.observe(featuresContainerRef.current);
    if (categoriesContainerRef.current) categoriesObserver.observe(categoriesContainerRef.current);

    return () => {
      cardsObserver.disconnect();
      featuresObserver.disconnect();
      categoriesObserver.disconnect();
    };
  }, []);

  // Mock trusted businesses data
  const trustedBusinesses: TrustedBusiness[] = [
    { id: 1, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 2, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 3, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 4, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 5, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 6, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 7, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 8, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 9, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
    { id: 10, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 11, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedTwo.svg" },
    { id: 12, name: "PhysioPlus", location: "Larnaca", role: "Founding Partners", image: "/Icons/trustedOne.svg" },
  ];

  // Business Category Grid list
  const businessCategories = [
    {
      title: "Beauty & Wellness",
      desc: "Hair salons, barbers, nails, spa, massage, aesthetics, makeup and more.",
      image: "/img/beauty_wellness.png"
    },
    {
      title: "Health & Fitness",
      desc: "Physiotherapy, personal trainers, yoga, pilates, swimming coaches.",
      image: "/img/health_fitness.png"
    },
    {
      title: "Sports & Activities",
      desc: "Tennis, padel, squash, go-karting, escape rooms, archery, paintball.",
      image: "/img/sports_activities.png"
    },
    {
      title: "Entertainment & Events",
      desc: "DJs, magicians, children's entertainers, face painters, balloon artists.",
      image: "/img/entertainment_events.png"
    },
    {
      title: "Experiences & Tours",
      desc: "Jeep safaris, boat trips, wine tasting, cooking classes, scuba diving.",
      image: "/img/experiences_tours.png"
    },
    {
      title: "Creative & Education",
      desc: "Photographers, videographers, music lessons, dance classes, language tutors.",
      image: "/img/creative_education.png"
    },
    {
      title: "Pets & Home",
      desc: "Pet grooming, dog trainers, pet sitters, mobile groomers, pet walkers.",
      image: "/img/pets_home.png"
    },
    {
      title: "Automotive",
      desc: "Car detailing, window tinting, vehicle wrapping, mobile mechanics.",
      image: "/img/automotive.png"
    },
    {
      title: "Consulting & Coaching",
      desc: "Life coaches, business consultants, career advisors, tutors.",
      image: "/img/consulting_coaching.png"
    }
  ];

  return (
    <div className="min-h-screen font-poppins relative overflow-x-hidden text-[#1C1B1C]">
      {/* Root Solid Background Layer */}
      <div className="absolute inset-0 -z-20 bg-[#FCFAF9] pointer-events-none" />

      {/* Background Soft Orbs */}
      <EdgeSoftOrbsTop
        size={380}
        duration={56}
        intensity={0.85}
        blend="screen"
        zIndex={-5}
      />

      {/* Decorative Ellipse Blobs */}
      <div className="absolute top-0 left-0 -z-10 w-full pointer-events-none opacity-40">
        <img src="/designImg/topEllipes.svg" alt="" className="absolute top-0 left-0 w-[500px] h-[500px]" />
        <img src="/designImg/middleEllipes.svg" alt="" className="absolute top-[20%] right-0 w-[600px] h-[600px]" />
      </div>

      {/* 1. Top Section - Replacement for App Banner */}
      {showBanner && (
        <div className="w-full bg-[#96C3CD] text-[#111111] px-4 md:px-[64px] py-2.5 sm:py-[16px] flex items-center justify-between transition-all duration-300 relative z-50 text-[10px] sm:text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-[17px] h-[20px] flex items-center justify-center shrink-0">
              <img src="/img/smallBLogo.svg" alt="B" className="w-full h-full object-contain" />
            </div>
            <span className="truncate">Reach new customers across Cyprus. Zero monthly fees. No risk</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <button
              onClick={() => router.push("/")}
              className="bg-white hover:bg-neutral-50 text-[#1C1B1C] px-4 py-1.5 rounded-full font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5 whitespace-nowrap text-[10px] sm:text-xs md:text-sm"
            >
              <span>List Your Business</span>
              <svg className="w-3.5 h-3.5 text-[#111111] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button
              onClick={() => setShowBanner(false)}
              className="text-[#1C1B1C] hover:opacity-75 transition-opacity cursor-pointer p-1"
              aria-label="Close Banner"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 2. Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
        isBusinessPage={true}
      />

      {/* 3. Hero Section */}
      <section className="w-full px-4 text-center mt-12 md:mt-16 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-[72px] font-medium leading-[1.1] md:leading-[72px] text-[#1C1B1C] tracking-tight mb-4 md:mb-6">
          The smarter way to grow <br className="hidden md:inline" /> your <span className="text-[#2E9DA7] font-bold">business</span> in Cyprus
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-[#45474B] leading-relaxed max-w-[672px] mb-5">
          No monthly fees right now. No commission on returning customers. Just new clients finding you — and showing up.
        </p>

        {/* Notice/Alert Below Subheader */}
        <div className="w-full max-w-[849px] border-l-4 border-[#8EBAC5] bg-[#FFFFFF] shadow-sm px-4 py-3 flex items-center justify-center text-xs md:text-sm font-medium text-[#111111] mb-8 leading-relaxed rounded-r-lg">
          <span>💳 First booking? A small deposit secures the slot — deducted from the total at your venue. Every return visit is 100% yours.</span>
        </div>

        {/* Hero image mockup (Tablet + Mobile Calendar view) */}
        <BusinessMockup showCities={false} />

        {/* One platform to book them all section */}
        <div className="relative w-full max-w-[1100px] mx-auto z-30 -mt-20 sm:-mt-32 md:-mt-[160px] flex flex-col items-center justify-end pt-24 pb-8 gap-4 text-center">
          {/* Fading Shadow overlay blending the lower mockup portion */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#FCFAF9] via-[#FCFAF9]/95 via-70% to-transparent pointer-events-none -z-10" />

          <h2 className="text-2xl md:text-[36px] font-bold text-[#1C1B1C] leading-[1.2] font-poppins relative z-10">
            One platform to book them all
          </h2>
          <button
            onClick={() => router.push("/professional")}
            className="relative z-10 flex flex-row items-center justify-center py-3 px-6 gap-[8px] w-full sm:w-[290px] h-[48px] bg-[#141414] hover:bg-black text-white rounded-full transition-all active:scale-95 cursor-pointer font-inter font-semibold text-[15.7px] leading-[24px]"
          >
            <span>List your Business - It’s free</span>
            <svg
              className="w-[18px] h-[18px] text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </section>

      {/* 4. Cards Section (One fee. One time.) */}
      <section ref={cardsContainerRef} className="w-full max-w-[1312px] mx-auto px-4 md:px-8 mt-24">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-[40px] font-medium tracking-tight text-[#16123E] leading-tight">
            One fee. One time. Then yours forever.
          </h2>
          <p className="text-base md:text-[20px] font-normal leading-relaxed text-[#757575] max-w-[850px]">
            We only make money when we bring you a brand new customer — and only once. Every return visit after that costs you nothing. No surprises, no monthly bills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
          {/* Card 1 */}
          <div className={`group flex flex-col items-start p-6 gap-8 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-xl hover:-translate-y-3 hover:scale-[1.02] hover:border-[#2E9DA7]/40 transition-all duration-300 ease-in-out ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="w-[60px] h-[60px] bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={Search01Icon} className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-[20px] font-medium text-[#212121]">
                Get Discovered
              </h3>
              <p className="text-[15px] font-normal leading-relaxed text-[#757575]">
                New customers in Cyprus search Bookly and find your business. No advertising needed on your end. We do the discovery work for you.
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div style={{ transitionDelay: '150ms' }} className={`group flex flex-col items-start p-6 gap-8 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-xl hover:-translate-y-3 hover:scale-[1.02] hover:border-[#2E9DA7]/40 transition-all duration-300 ease-in-out ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="w-[60px] h-[60px] bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={Tick01Icon} className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-[20px] font-medium text-[#212121]">
                Get Booked
              </h3>
              <p className="text-[15px] font-normal leading-relaxed text-[#757575]">
                Customers book and pay a small deposit online. You get an instant SMS notification. Your calendar updates automatically. No phone tag.
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div style={{ transitionDelay: '300ms' }} className={`group flex flex-col items-start p-6 gap-8 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-xl hover:-translate-y-3 hover:scale-[1.02] hover:border-[#2E9DA7]/40 transition-all duration-300 ease-in-out ${cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}>
            <div className="w-[60px] h-[60px] bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={SaveMoneyDollarIcon} className="w-7 h-7" />
            </div>
            <div className="flex flex-col gap-3 w-full">
              <h3 className="text-[20px] font-medium text-[#212121]">
                Get Paid
              </h3>
              <p className="text-[15px] font-normal leading-relaxed text-[#757575]">
                Collect the remaining balance at your venue. No-show? The customer's card is already saved — charge the fee with one tap. You keep 100%.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Features Grid Section (Everything you need to run your business) */}
      <section ref={featuresContainerRef} className="w-full max-w-[1312px] mx-auto px-4 md:px-8 mt-24">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-[40px] font-medium tracking-tight text-[#16123E] leading-tight">
            Everything you need to run your business
          </h2>
          <p className="text-base md:text-[20px] font-normal leading-relaxed text-[#757575] max-w-[850px]">
            Bookly offers innovative features that bring convenience, efficiency, and an improved experience for both your team members and clients.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
          {/* Feature 1 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={Clock01Icon} className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">24/7 Online Booking</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                Never miss a booking because you were busy or asleep. Customers book anytime, from anywhere.
              </p>
            </div>
          </div>

          {/* Feature 2 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <img src="/Icons/businessIcon/Chield_check.svg" alt="" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">No-Show Protection</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                Customers save a card at booking. If they don't show, you charge the fee instantly — one tap. You set the amount, you decide every time.
              </p>
            </div>
          </div>

          {/* Feature 3 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <img src="/Icons/businessIcon/Bell_pin.svg" alt="" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">Automatic Reminders</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                SMS and email reminders sent automatically before every appointment. Fewer no-shows, less chasing.
              </p>
            </div>
          </div>

          {/* Feature 4 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={Analytics01Icon} className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">Analytics Dashboard</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                See your busiest slots, top services, and revenue — all in one place. Make smarter decisions with real data.
              </p>
            </div>
          </div>

          {/* Feature 5 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={Calendar03Icon} className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">Google Calendar Sync</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                Two-way sync with Google Calendar. Bookly appointments appear automatically, and calendar blocks prevent double bookings.
              </p>
            </div>
          </div>

          {/* Feature 6 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={UserGroup03Icon} className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">Multi-Staff Calendars</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                Separate calendar columns per staff member. Log in on multiple devices. Owner, supervisor and staff permission levels built in.
              </p>
            </div>
          </div>

          {/* Feature 7 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <img src="/Icons/businessIcon/star-light.svg" alt="" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">Verified Reviews</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                Only real customers who booked through Bookly can leave reviews. Genuine ratings that build your reputation.
              </p>
            </div>
          </div>

          {/* Feature 8 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <HugeiconsIcon icon={ZapIcon} className="w-6 h-6" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">Instant Notifications</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                Get an SMS the moment a new booking lands. Know immediately so you can prepare — no delays, no surprises.
              </p>
            </div>
          </div>

          {/* Feature 9 */}
          <div className={`group flex flex-col items-start p-6 gap-6 bg-white border border-[#E8E6FF] rounded-2xl hover:shadow-lg hover:-translate-y-2 hover:scale-[1.01] hover:border-[#2E9DA7]/30 transition-all duration-300 ease-in-out ${featuresVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="w-12 h-12 bg-[#2E9DA7] text-[#111111] rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
              <img src="/Icons/businessIcon/security-check.svg" alt="" className="w-6 h-6 object-contain" />
            </div>
            <div className="flex flex-col gap-2 w-full">
              <h4 className="text-[18px] font-semibold text-[#212121]">Secure Payments</h4>
              <p className="text-[14px] leading-relaxed text-[#757575]">
                Deposits processed via Stripe — the same technology used by millions of businesses worldwide. Safe, fast and reliable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Built for Cyprus Section */}
      <section ref={categoriesContainerRef} className="w-full max-w-[1312px] mx-auto px-4 md:px-8 mt-24">
        <div className="flex flex-col items-center text-center gap-4 mb-12">
          <h2 className="text-3xl md:text-[40px] font-medium tracking-tight text-[#16123E] leading-tight">
            Built for Cyprus. Built for your business.
          </h2>
          <p className="text-base md:text-[20px] font-normal leading-relaxed text-[#757575] max-w-[850px]">
            Everything you need to take bookings, protect your revenue, and grow — without the monthly fees.
          </p>

          <button
            onClick={() => router.push("/professional")}
            className="mt-2 flex flex-row items-center justify-center py-2.5 px-6 gap-[8px] bg-[#141414] hover:bg-black text-white rounded-full transition-all active:scale-95 cursor-pointer font-inter font-semibold text-[15px]"
          >
            <span>Get started now</span>
            <svg
              className="w-[16px] h-[16px] text-white shrink-0"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>

        {/* 3x3 responsive grid showing categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
          {businessCategories.map((cat, idx) => (
            <div
              key={idx}
              style={{ transitionDelay: `${idx * 50}ms` }}
              className={`group flex flex-col bg-white border border-[#E8E6FF] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] hover:border-[#2E9DA7]/25 transition-all duration-300 ease-in-out ${categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <div className="w-full relative h-[200px] overflow-hidden bg-neutral-100">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  draggable="false"
                />
              </div>
              <div className="p-6 flex flex-col gap-2">
                <h4 className="text-[18px] font-bold text-[#1C1B1C]">{cat.title}</h4>
                <p className="text-[14px] leading-relaxed text-[#757575]">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. Trusted by local businesses across Cyprus Section */}
      <section className="w-full bg-[#FCFCFD] py-12 md:py-[72px] border-y border-neutral-100 mt-24">
        <div className="w-full px-4 md:px-8 xl:px-[68px] flex flex-col items-center justify-center gap-10 md:gap-[80px]">
          <div className="flex flex-col items-center gap-4 text-center max-w-[1312px] w-full">
            <h2 className="text-3xl md:text-[36px] font-medium leading-[36px] md:leading-[48px] text-[#1F2937] tracking-tight">
              Trusted by local businesses across Cyprus
            </h2>
            <p className="text-lg md:text-[24px] font-normal leading-[24px] text-[#757575]">
              Join the businesses already growing with Bookly.
            </p>
          </div>

          <div className="w-full">
            {trustedBusinesses.length > 5 ? (
              <Carousel gapClass="gap-[40px] md:gap-[80px]">
                {trustedBusinesses.map((biz, idx) => (
                  <TrustedBusinessCard key={`${biz.id}-${idx}`} business={biz} />
                ))}
              </Carousel>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                {trustedBusinesses.map((biz, idx) => (
                  <TrustedBusinessCard key={`${biz.id}-${idx}`} business={biz} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 8. Add Bookly to Your Home Screen Section */}
      <section className="w-full mt-[166px] mb-24 flex justify-center">
        <div className="w-full h-[320px] md:h-[400px] lg:h-[449px] xl:h-[484px] bg-[#2E9DA7] relative overflow-visible z-10">

          {/* Left Side: Content */}
          <div className="absolute left-[37px] top-[38px] xl:left-[141px] text-white z-10 flex flex-col items-start gap-2.5 sm:gap-4 md:gap-5 max-w-[calc(100%-140px)] lg:max-w-[636px] add-home-screen-content-wrapper">
            <h2 className="add-home-screen-title sm:text-[32px] lg:text-[54px] lg:leading-[64px] font-poppins font-medium text-[#FCFAF9] tracking-tight">
              Add Bookly to your <br /> home screen
            </h2>

            {/* Subtitle tick frame */}
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="add-home-screen-subtitle sm:text-base md:text-[18px] md:leading-[26px] font-poppins font-medium text-[#FCFAF9]">
                Book any local services instantly
              </span>
              <div className="w-6 h-6 border-[1.5px] border-[#FCFAF9] rounded-full flex items-center justify-center shrink-0 add-home-screen-check-icon">
                <svg className="w-3.5 h-3.5 text-[#FCFAF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Install Button Container */}
          <div className="absolute left-[150px] xl:left-[378px] top-[250px] xl:top-[347px] z-20 add-home-screen-btn-container">
            <AddToHomeScreenButton
              className="z-10 scale-75 xl:scale-100 origin-left add-home-screen-btn"
              showTextOnMobile={true}
              size="large"
            />
          </div>

          {/* Curved Arrow Image */}
          <div className="absolute left-[60px] xl:left-[209px] top-[186px] xl:top-[278px] w-[80px] xl:w-[114px] h-[90px] xl:h-[151px] pointer-events-none opacity-95 z-20 add-home-screen-arrow-icon">
            <img
              src="/Icons/direction.png"
              alt="Direction Arrow"
              className="w-full h-full object-contain"
              draggable="false"
            />
          </div>

          {/* Right Side: Phone Image mockup (Desktop) */}
          <div className="absolute right-[16px] md:right-[20px] lg:right-[100px] z-0 sm:z-20 pointer-events-none mockup-container-fixed">
            <div className="relative w-full h-full flex items-center justify-center">
              <div
                className="absolute pointer-events-none -z-10 opacity-90"
                style={{
                  width: "244.85px",
                  height: "478.55px",
                  left: "50%",
                  top: "50%",
                  transform: "translate(-50%, -50%) rotate(6.83deg)",
                  background: "rgba(255, 255, 255, 0.8)",
                  filter: "blur(100px)",
                }}
              />

              <img
                src="/img/mobile.png"
                alt="Bookly App Mockup"
                style={{
                  transform: "rotate(6.83deg)"
                }}
                className="object-fill z-10 max-w-none mockup-image-fixed"
                draggable="false"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. FAQ Section */}
      <FaqSection />

      {/* 10. Footer */}
      <Footer />
    </div>
  );
}
