"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Car04Icon, Clock01Icon, DashboardSquare02Icon, FootballIcon, HealtcareIcon, Location01Icon, Location05Icon, PartyIcon, SailboatOffshoreIcon, Search01Icon, StarIcon, WellnessIcon, SquareLock01Icon } from "@hugeicons/core-free-icons";
import ServiceCard, { Recommendation } from "@/components/ServiceCard";
import Carousel from "@/components/Carousel";
import TrustedBusinessCard, { TrustedBusiness } from "@/components/TrustedBusinessCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";
import BusinessMockup from "@/components/BusinessMockup";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";

export default function LandingPage() {
  const router = useRouter();

  // State variables
  const [showBanner, setShowBanner] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Time selector states
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Any Time");
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Mock recommendations data
  const recommendations: Recommendation[] = [
    {
      id: 1,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      rating: 4.9,
      reviews: 299,
      categories: ["Barber", "Salon"],
      lastVisited: "Last visited 2 months ago",
      startingPrice: 12,
      image: "/img/service_demo.jpg",
      travelsToYou: true,
      travelLocations: ["Larnaca", "Limasol", "+4 more"],
      hasDiamond: true,
    },
    {
      id: 2,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      rating: 4.9,
      reviews: 299,
      categories: ["Barber", "Salon"],
      location: "Sheikh Zayed Road, Dubai",
      distance: "3km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 12,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 3,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      rating: 4.9,
      reviews: 299,
      categories: ["Barber", "Salon"],
      lastVisited: "Last visited 2 months ago",
      startingPrice: 12,
      image: "/img/service_demo.jpg",
      travelsToYou: true,
      travelLocations: ["Larnaca", "Limasol", "+4 more"],
      noDeposit: true,
    },
    {
      id: 4,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      rating: 4.9,
      reviews: 299,
      categories: ["Barber", "Salon"],
      location: "Sheikh Zayed Road, Dubai",
      distance: "3km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 12,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
      noDeposit: true,
    },
    {
      id: 5,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      rating: 4.9,
      reviews: 299,
      categories: ["Barber", "Salon"],
      location: "Sheikh Zayed Road, Dubai",
      distance: "3km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 12,
      image: "/img/service_demo.jpg",
    },
    {
      id: 6,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      rating: 4.9,
      reviews: 299,
      categories: ["Barber", "Salon"],
      location: "Sheikh Zayed Road, Dubai",
      distance: "3km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 12,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
      noDeposit: true,
    },
  ];

  // Mock services near you data
  const servicesNearYou: Recommendation[] = [
    {
      id: 11,
      title: "Zara Hair & Beauty Salon | Nicosia Center",
      rating: 4.7,
      reviews: 142,
      categories: ["Salon", "Beauty"],
      location: "Ledra Street, Nicosia",
      distance: "0.8km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 25,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
    },
    {
      id: 12,
      title: "Zen Spa & Massage | Limassol Marina",
      rating: 4.9,
      reviews: 88,
      categories: ["Spa", "Wellness"],
      location: "Marina Road, Limassol",
      distance: "1.5km away",
      lastVisited: "Last visited 3 months ago",
      startingPrice: 60,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 13,
      title: "Elite Barber Studio | Larnaca Bay",
      rating: 4.8,
      reviews: 210,
      categories: ["Barber"],
      travelsToYou: true,
      travelLocations: ["Larnaca", "Dekhelia"],
      lastVisited: "Last visited 2 months ago",
      startingPrice: 18,
      image: "/img/service_demo.jpg",
    },
    {
      id: 14,
      title: "Dynamic Fitness Coach | Paphos District",
      rating: 5.0,
      reviews: 45,
      categories: ["Sports", "Fitness"],
      travelsToYou: true,
      travelLocations: ["Paphos", "Peyia"],
      lastVisited: "Last visited 3 months ago",
      startingPrice: 30,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 15,
      title: "Luxury Nails & Lashes | Limassol",
      rating: 4.6,
      reviews: 95,
      categories: ["Beauty", "Salon"],
      location: "Anexartisias, Limassol",
      distance: "2.1km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 20,
      image: "/img/service_demo.jpg",
    },
    {
      id: 16,
      title: "Pet Care & Grooming | Nicosia",
      rating: 4.9,
      reviews: 120,
      categories: ["Pets"],
      location: "Strovolos, Nicosia",
      distance: "3.5km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 40,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
      noDeposit: true,
    },
  ];

  // Mock trending services data
  const trendingServices: Recommendation[] = [
    {
      id: 21,
      title: "The Classic Barber | Old Town Limassol",
      rating: 4.9,
      reviews: 512,
      categories: ["Barber"],
      location: "Castle Area, Limassol",
      distance: "0.5km away",
      lastVisited: "Last visited 3 months ago",
      startingPrice: 15,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 22,
      title: "Serenity Yoga & Pilates | Nicosia",
      rating: 4.9,
      reviews: 130,
      categories: ["Wellness", "Fitness"],
      location: "Athalassa Ave, Nicosia",
      distance: "1.9km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 12,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
    },
    {
      id: 23,
      title: "Absolute Tattoo Studio | Ayia Napa",
      rating: 4.8,
      reviews: 320,
      categories: ["Beauty", "Experience"],
      location: "Nissi Avenue, Ayia Napa",
      distance: "0.7km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 80,
      image: "/img/service_demo.jpg",
    },
    {
      id: 24,
      title: "Royal Thai Massage | Larnaca Center",
      rating: 4.7,
      reviews: 198,
      categories: ["Spa", "Wellness"],
      location: "Finikoudes, Larnaca",
      distance: "0.2km away",
      lastVisited: "Last visited 3 months ago",
      startingPrice: 45,
      image: "/img/service_demo.jpg",
      travelsToYou: true,
      travelLocations: ["Larnaca"],
      noDeposit: true,
    },
    {
      id: 25,
      title: "Modern Cuts & Fades | Paphos",
      rating: 4.6,
      reviews: 84,
      categories: ["Barber"],
      location: "Tombs of Kings, Paphos",
      distance: "2.4km away",
      lastVisited: "Last visited 2 months ago",
      startingPrice: 10,
      image: "/img/service_demo.jpg",
    },
    {
      id: 26,
      title: "Ultimate Car Detailers | Limassol",
      rating: 4.9,
      reviews: 175,
      categories: ["Automotive"],
      travelsToYou: true,
      travelLocations: ["Limassol", "Larnaca"],
      lastVisited: "Last visited 2 months ago",
      startingPrice: 50,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
      noDeposit: true,
    },
  ];

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

  return (
    <div className="min-h-screen bg-[#FDFBF9] font-poppins relative overflow-x-hidden text-[#1C1B1C]">

      {/* Design Background Blobs */}
      <div className="absolute top-0 left-0 -z-10 w-full pointer-events-none opacity-40">
        <img src="/designImg/topEllipes.svg" alt="" className="absolute top-0 left-0 w-[500px] h-[500px]" />
        <img src="/designImg/middleEllipes.svg" alt="" className="absolute top-[20%] right-0 w-[600px] h-[600px]" />
      </div>

      {/* 1. App Install Banner */}
      {showBanner && (
        <div className="w-full bg-[#96C3CD] text-[#111111] px-3 sm:px-[16px] py-2.5 sm:py-[16px] flex items-center justify-between transition-all duration-300 relative z-50 text-[10px] sm:text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-[17px] h-[20px] flex items-center justify-center shrink-0">
              <img src="/img/smallBLogo.svg" alt="B" className="w-full h-full object-contain" />
            </div>
            <span className="truncate">Book local services in Cyprus — instantly, any time</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <AddToHomeScreenButton size="small" className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs" />
            <button
              onClick={() => setShowBanner(false)}
              className="text-[#1C1B1C] hover:opacity-75 transition-opacity cursor-pointer p-1"
              aria-label="Close Banner"
            >
              {/* Close Cross Icon */}
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 2. Navbar */}
      <header className="w-full px-4 md:px-8 xl:px-[68px] py-4 md:py-[40px] relative z-40">
        <div className="w-full bg-gradient-to-r from-[#E6F3F9] to-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/40 px-4 sm:px-6 py-3 md:py-[16px] flex items-center justify-between gap-4">

          {/* Left Side: Logo */}
          <div className="flex items-center">
            <div className="cursor-pointer shrink-0" onClick={() => router.push("/")}>
              <img src="/img/logo.png" alt="Bookly" className="h-8 md:h-[44px] w-[120px] object-contain" />
            </div>
          </div>

          {/* Nav links (Desktop) */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#" className="text-xs font-semibold tracking-wider text-[#757575] hover:text-[#1C1B1C] transition-colors uppercase">
              Explore
            </a>
            <a href="#" className="text-xs font-semibold tracking-wider text-[#757575] hover:text-[#1C1B1C] transition-colors uppercase">
              How it Works
            </a>
          </nav>

          {/* Right Side Options (Desktop) */}
          <div className="hidden md:flex items-center gap-3 sm:gap-4">
            {/* Login button */}
            <button
              onClick={() => router.push("/customer")}
              className="border-2 border-[#ACAAB4] hover:bg-neutral-50 text-[#1C1B1C] px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer active:scale-95"
            >
              Login
            </button>

            {/* List your business button */}
            <button
              onClick={() => router.push("/professional")}
              className="bg-[#1C1B1C] hover:bg-black text-[#F9FAFB] px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
            >
              List your business
            </button>

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-1 text-xs font-medium text-[#111111] hover:opacity-75 transition-opacity px-2 py-1 rounded cursor-pointer"
              >
                <span>{selectedLanguage}</span>
                <svg className="w-3 h-3 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-32 bg-white border border-[#E8E6FF] rounded-xl shadow-lg z-50 overflow-hidden py-1">
                  {["English", "Bengali", "Greek", "German"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang === "English" ? "ENG" : lang === "Bengali" ? "BEN" : lang.substring(0, 3).toUpperCase());
                        setShowLangDropdown(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-[#1C1B1C] hover:bg-[#F5F3FF] transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Language Selector (Mobile view, simplified) */}
            <div className="relative mr-1">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-0.5 text-xs font-medium text-[#111111] hover:opacity-75 transition-opacity px-2 py-1 rounded cursor-pointer"
              >
                <span>{selectedLanguage}</span>
                <svg className="w-2.5 h-2.5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {showLangDropdown && (
                <div className="absolute right-0 mt-2 w-28 bg-white border border-[#E8E6FF] rounded-xl shadow-lg z-50 overflow-hidden py-1">
                  {["English", "Bengali", "Greek", "German"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => {
                        setSelectedLanguage(lang === "English" ? "ENG" : lang === "Bengali" ? "BEN" : lang.substring(0, 3).toUpperCase());
                        setShowLangDropdown(false);
                      }}
                      className="w-full text-left px-3 py-1.5 text-xs text-[#1C1B1C] hover:bg-[#F5F3FF] transition-colors"
                    >
                      {lang}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="p-2 text-[#1C1B1C] focus:outline-none cursor-pointer"
              aria-label="Toggle Menu"
            >
              {showMobileMenu ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {showMobileMenu && (
          <div className="absolute top-[85px] left-4 right-4 bg-[#FDFBF9] border border-[#E8E6FF] rounded-2xl shadow-xl z-50 p-5 flex flex-col gap-4 animate-in fade-in slide-in-from-top-2 duration-200 md:hidden">
            <a
              href="#"
              onClick={() => setShowMobileMenu(false)}
              className="text-sm font-semibold tracking-wider text-[#757575] hover:text-[#1C1B1C] transition-colors uppercase py-2 border-b border-neutral-100"
            >
              Explore
            </a>
            <a
              href="#"
              onClick={() => setShowMobileMenu(false)}
              className="text-sm font-semibold tracking-wider text-[#757575] hover:text-[#1C1B1C] transition-colors uppercase py-2 border-b border-neutral-100"
            >
              How it Works
            </a>

            <div className="flex flex-col gap-3 pt-2">
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  router.push("/customer");
                }}
                className="w-full text-center border-2 border-[#ACAAB4] hover:bg-neutral-50 text-[#1C1B1C] py-2.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
              >
                Login
              </button>
              <button
                onClick={() => {
                  setShowMobileMenu(false);
                  router.push("/professional");
                }}
                className="w-full text-center bg-[#1C1B1C] hover:bg-black text-[#F9FAFB] py-2.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
              >
                List your business
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 3. Hero Section */}
      <section className="w-full px-4 text-center mt-12 md:mt-16 flex flex-col items-center">
        <h1 className="text-3xl sm:text-4xl md:text-[72px] font-medium leading-[1.1] md:leading-[72px] text-[#1C1B1C] tracking-tight mb-4 md:mb-6">
          Discover and book the <span className="text-[#3586B8] font-bold">best</span> <br className="hidden md:inline" /> local services in Cyprus
        </h1>
        <p className="text-sm sm:text-base md:text-xl text-[#45474B] leading-relaxed max-w-[672px] mb-3">
          Find trusted professionals near you and secure your appointment instantly. No calls. No waiting.
        </p>
        <p className="text-[11px] sm:text-xs md:text-sm text-[#666666] font-medium max-w-[587px] mb-6 md:mb-8">
          First booking? Pay a small deposit to secure your slot. The rest you pay at the venue.
        </p>

        {/* 4. Hero Search Bar */}
        <div className="w-full max-w-[900px] bg-white rounded-2xl md:rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-[#E8E6FF] p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-0 relative z-30">

          {/* Search Input */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 md:py-0 border-b md:border-b-0 md:border-r border-[#EBEBEB]">
            <HugeiconsIcon icon={Search01Icon} className="text-[#9E9E9E]" />
            <input
              type="text"
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#9E9E9E] bg-transparent outline-none"
            />
          </div>

          {/* Location Selector */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 py-2.5 md:py-0 border-b md:border-b-0 md:border-r border-[#EBEBEB]">
            <HugeiconsIcon icon={Location05Icon} className="text-[#9E9E9E]" />
            <input
              type="text"
              placeholder="Anywhere in Cyprus"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#9E9E9E] bg-transparent outline-none"
            />
          </div>

          {/* Time Selector */}
          <div className="relative flex-1 w-full flex items-center justify-between px-4 py-2.5 md:py-0 border-b md:border-b-0 border-[#EBEBEB] md:border-transparent">
            <button
              type="button"
              onClick={() => setShowTimePicker(!showTimePicker)}
              className="w-full flex items-center gap-3 text-left py-2 text-sm text-[#757575] hover:text-[#1C1B1C] transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Clock01Icon} className="text-[#9E9E9E]" />
              <span className="text-[#1C1B1C] truncate">{selectedTime}</span>
            </button>

            {/* Time Picker Popup Dropdown */}
            {showTimePicker && (
              <div className="absolute top-[110%] left-0 right-0 bg-white border border-[#E8E6FF] rounded-2xl shadow-xl z-50 p-4 min-w-[260px] animate-in fade-in slide-in-from-top-2 duration-200">
                <h4 className="text-xs font-semibold text-[#757575] uppercase tracking-wider mb-2">Select Booking Time</h4>
                <div className="grid grid-cols-3 gap-2">
                  {["Morning", "Afternoon", "Evening", "Any Time", "9:00 AM", "12:00 PM", "3:00 PM", "6:00 PM"].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setSelectedTime(t);
                        setShowTimePicker(false);
                      }}
                      className={`text-xs py-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${selectedTime === t
                        ? "bg-[#1C1B1C] text-white border-transparent"
                        : "border-neutral-200 text-[#1C1B1C] hover:bg-neutral-50"
                        }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Search Action Button */}
          <button
            type="button"
            className="w-full md:w-auto bg-[#1C1B1C] hover:bg-black text-white px-6 py-3 rounded-xl md:rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 active:scale-95"
            onClick={() => console.log("Searching for", searchQuery, "in", locationQuery, "at", selectedTime)}
          >
            <span>Search</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        </div>
      </section>

      {/* 5. Category Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-16">
        <div className="flex flex-wrap items-center justify-center lg:justify-between pb-4 gap-4 lg:gap-2 xl:gap-4">

          {/* ALL Category Card */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "all"
              ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <HugeiconsIcon icon={DashboardSquare02Icon} />
            <span className="text-xs font-semibold tracking-wider uppercase">All</span>
          </button>

          {/* BEAUTY & WELLNESS */}
          <button
            onClick={() => setSelectedCategory("wellness")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "wellness"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <HugeiconsIcon icon={WellnessIcon} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Beauty & Wellness</span>
          </button>

          {/* HEALTH & FITNESS */}
          <button
            onClick={() => setSelectedCategory("health")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "health"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <HugeiconsIcon icon={HealtcareIcon} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Health Care</span>
          </button>

          {/* SPORTS & ACTIVITIES */}
          <button
            onClick={() => setSelectedCategory("sports")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "sports"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <HugeiconsIcon icon={FootballIcon} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Sports & Activities</span>
          </button>

          {/* EXPERIENCE & TOURS */}
          <button
            onClick={() => setSelectedCategory("experience")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "experience"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <HugeiconsIcon icon={SailboatOffshoreIcon} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Experience & Tours</span>
          </button>

          {/* ENTERTAINMENT & EVENTS */}
          <button
            onClick={() => setSelectedCategory("entertainment")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "entertainment"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <HugeiconsIcon icon={PartyIcon} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Entertainment & Events</span>
          </button>

          {/* PETS & HOME (FemiIcon / famicon) */}
          <button
            onClick={() => setSelectedCategory("pets")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "pets"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE] flex items-center justify-center">
              <img src="/Icons/famicon.svg" alt="FemiIcon" className="w-6 h-6 object-contain" />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Pets & Home</span>
          </button>

          {/* AUTOMOTIVE */}
          <button
            onClick={() => setSelectedCategory("automotive")}
            className={`flex w-[150px] h-[108px] flex-col items-center justify-center gap-[24px] rounded-xl transition-all duration-200 cursor-pointer shrink-0 ${selectedCategory === "automotive"
              ? "bg-[#111111] text-[#817469] shadow-md scale-105"
              : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
              }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <HugeiconsIcon icon={Car04Icon} />
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Automotive</span>
          </button>

        </div>
      </section>

      {/* 6. Recommended Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-16">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">
            Recommended
          </h2>
          <a href="#" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
            See all
          </a>
        </div>

        {/* Card Grid / Carousel */}
        {recommendations.length > 5 ? (
          <Carousel>
            {recommendations.map((rec) => (
              <div key={rec.id} className="w-[280px] xs:w-[320px] sm:w-[360px] md:w-[406px] shrink-0 snap-start">
                <ServiceCard
                  rec={rec}
                  isFavorite={favorites.includes(rec.id)}
                  onToggleFavorite={toggleFavorite}
                  onBookNow={(id) => console.log("Booking item", id)}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {recommendations.map((rec) => (
              <ServiceCard
                key={rec.id}
                rec={rec}
                isFavorite={favorites.includes(rec.id)}
                onToggleFavorite={toggleFavorite}
                onBookNow={(id) => console.log("Booking item", id)}
              />
            ))}
          </div>
        )}

      </section>

      {/* 7. Services Near You Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-[56px]">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">
            Services near you
          </h2>
          <a href="#" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
            See all
          </a>
        </div>

        {/* Card Grid / Carousel */}
        {servicesNearYou.length > 5 ? (
          <Carousel>
            {servicesNearYou.map((rec) => (
              <div key={rec.id} className="w-[280px] xs:w-[320px] sm:w-[360px] md:w-[406px] shrink-0 snap-start">
                <ServiceCard
                  rec={rec}
                  isFavorite={favorites.includes(rec.id)}
                  onToggleFavorite={toggleFavorite}
                  onBookNow={(id) => console.log("Booking item", id)}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {servicesNearYou.map((rec) => (
              <ServiceCard
                key={rec.id}
                rec={rec}
                isFavorite={favorites.includes(rec.id)}
                onToggleFavorite={toggleFavorite}
                onBookNow={(id) => console.log("Booking item", id)}
              />
            ))}
          </div>
        )}

      </section>

      {/* 8. Trending Services Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-[56px]">

        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">
            Trending services
          </h2>
          <a href="#" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
            See all
          </a>
        </div>

        {/* Card Grid / Carousel */}
        {trendingServices.length > 5 ? (
          <Carousel>
            {trendingServices.map((rec) => (
              <div key={rec.id} className="w-[280px] xs:w-[320px] sm:w-[360px] md:w-[406px] shrink-0 snap-start">
                <ServiceCard
                  rec={rec}
                  isFavorite={favorites.includes(rec.id)}
                  onToggleFavorite={toggleFavorite}
                  onBookNow={(id) => console.log("Booking item", id)}
                />
              </div>
            ))}
          </Carousel>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center">
            {trendingServices.map((rec) => (
              <ServiceCard
                key={rec.id}
                rec={rec}
                isFavorite={favorites.includes(rec.id)}
                onToggleFavorite={toggleFavorite}
                onBookNow={(id) => console.log("Booking item", id)}
              />
            ))}
          </div>
        )}

      </section>

      {/* 9. Trusted Businesses Section */}
      <section className="w-full bg-[#FCFCFD] py-12 md:py-[72px] border-y border-neutral-100 mt-[24px]">
        <div className="w-full px-4 md:px-8 xl:px-[68px] flex flex-col items-center justify-center gap-10 md:gap-[80px]">
          {/* Container */}
          <div className="flex flex-col items-center gap-4 text-center max-w-[1312px] w-full">
            <h2 className="text-3xl md:text-[36px] font-medium leading-[36px] md:leading-[48px] text-[#1F2937] tracking-tight">
              Trusted by local businesses across Cyprus
            </h2>
            <p className="text-lg md:text-[24px] font-normal leading-[24px] text-[#757575]">
              Join the businesses already growing with Bookly.
            </p>
          </div>

          {/* Carousel / Grid Container */}
          <div className="w-full">
            {trustedBusinesses.length > 5 ? (
              <Carousel gapClass="gap-[40px] md:gap-[80px]">
                {trustedBusinesses.map((biz) => (
                  <TrustedBusinessCard key={biz.id} business={biz} />
                ))}
              </Carousel>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
                {trustedBusinesses.map((biz) => (
                  <TrustedBusinessCard key={biz.id} business={biz} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. Book in 3 Simple Steps Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-[120px]">
        <div className="w-full flex flex-col items-center gap-10 md:gap-[40px]">
          {/* Header Container */}
          <div className="flex flex-col items-center gap-5 text-center max-w-[730px]">
            <h2 className="text-3xl md:text-[36px] font-medium leading-tight md:leading-[48px] text-[#16123E] tracking-tight">
              Book in 3 simple steps
            </h2>
            <p className="text-lg md:text-[24px] font-normal leading-[32px] text-[#757575]">
              Simple, transparent, and built for Cyprus
            </p>
          </div>

          {/* Cards Frame */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full items-stretch">
            {/* Step 1 */}
            <div className="flex flex-col items-start p-5 gap-10 bg-white border border-[#E8E6FF] rounded-xl flex-1 hover:shadow-sm transition-shadow duration-200">
              <div className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={Search01Icon} className="w-9 h-9 text-[#111111]" />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-[24px] font-medium leading-[32px] text-[#212121]">
                  Discover
                </h3>
                <p className="text-[16px] font-normal leading-[24px] text-[#757575]">
                  Browse local services and book instantly. Find exactly what you need, when you need it
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-start p-5 gap-10 bg-white border border-[#E8E6FF] rounded-xl flex-1 hover:shadow-sm transition-shadow duration-200">
              <div className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={SquareLock01Icon} className="w-9 h-9 text-[#111111]" />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-[24px] font-medium leading-[32px] text-[#212121]">
                  Secure your spot
                </h3>
                <p className="text-[16px] font-normal leading-[24px] text-[#757575]">
                  Confirm your booking instantly. First visit? A small deposit is required. Returning customer? No deposit — your slot is held automatically
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-start p-5 gap-10 bg-white border border-[#E8E6FF] rounded-xl flex-1 hover:shadow-sm transition-shadow duration-200">
              <div className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
                <img src="/Icons/glasses.svg" alt="Cheers" className="w-9 h-9 object-contain" draggable="false" />
              </div>
              <div className="flex flex-col gap-3 w-full">
                <h3 className="text-[24px] font-medium leading-[32px] text-[#212121]">
                  Show up and enjoy
                </h3>
                <p className="text-[16px] font-normal leading-[24px] text-[#757575]">
                  Pay the remaining balance at the venue by cash or card. That's it!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Why Customers Choose Bookly Section */}
      <WhyChooseUs />

      {/* 12. Add Bookly to Your Home Screen Section */}
      <section className="w-full mt-[204px] py-16 lg:py-0 lg:h-[484px] relative mb-24 flex items-center overflow-hidden lg:overflow-visible">

        {/* Inner Background starting after 38px */}
        <div className="absolute inset-y-0 left-0 top-[38px] right-0 bg-[#2A9CA6] z-0" />

        <div className="w-full max-w-[1312px] mx-auto px-4 md:px-8 xl:px-[68px] flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0 h-full relative z-10">

          {/* Left Side: Content & Button */}
          <div className="flex flex-col items-start gap-[20px] lg:max-w-[636px] text-white z-10 py-6 relative">
            <h2 className="text-3xl sm:text-4xl md:text-[54px] font-medium leading-tight md:leading-[64px] text-[#FCFAF9] tracking-tight">
              Add Bookly to your <br /> home screen
            </h2>

            {/* Subtitle tick frame */}
            <div className="flex items-center gap-2">
              <span className="text-lg md:text-[18px] font-medium leading-[26px] text-[#FCFAF9]">
                Book any local services instantly
              </span>
              <div className="w-6 h-6 border-[1.5px] border-[#FCFAF9] rounded-full flex items-center justify-center shrink-0">
                <svg className="w-3.5 h-3.5 text-[#FCFAF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>

            {/* Arrow & Button Container */}
            <div className="flex items-center mt-8 relative w-full pl-0 lg:pl-[120px]">
              {/* Hand-drawn style curved arrow SVG */}
              <div className="absolute left-0 top-[-30px] lg:top-[-20px] w-24 h-16 pointer-events-none text-[#FCFAF9] opacity-95 hidden lg:block">
                <svg viewBox="0 0 100 60" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
                  <path d="M10,10 C15,45 40,60 85,45" />
                  <path d="M72,35 L85,45 L75,55" />
                </svg>
              </div>

              {/* Install Button */}
              <AddToHomeScreenButton
                className="z-10"
                showTextOnMobile={true}
                size="large"
              />
            </div>
          </div>

          {/* Right Side: Mockup Image with grouped Glow */}
          <div className="relative lg:absolute lg:right-[68px] lg:bottom-0 w-[280px] sm:w-[320px] lg:w-[360px] xl:w-[400px] h-[340px] lg:h-[460px] flex items-end justify-center z-20">
            {/* Figma Ellipse 133 Glow Light (grouped behind the phone) */}
            <div
              className="absolute pointer-events-none -z-10 hidden lg:block opacity-90"
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

            {/* Phone Image */}
            <img
              src="/img/mobile.png"
              alt="Bookly App Mockup"
              className="w-full h-auto object-contain max-h-[380px] lg:max-h-[500px] xl:max-h-[540px] transform lg:translate-y-8"
              draggable="false"
            />
          </div>

        </div>
      </section>

      {/* 13. Bookly for Business Section */}
      <section className="w-full mt-[98px] mb-24 px-4 md:px-8 xl:px-0">
        <div className=" flex flex-col items-center gap-[40px] text-center">

          {/* Header Block (Title and Subtitle) */}
          <div className="flex flex-col items-center gap-[20px] max-w-[607px]">
            <h2 className="text-3xl md:text-[36px] font-medium leading-tight md:leading-[48px] text-[#16123E] tracking-tight font-poppins">
              Bookly for Business
            </h2>
            <p className="text-lg md:text-[24px] font-normal leading-normal md:leading-[32px] text-[#757575] font-poppins">
              Stop losing revenue to no-shows and missed calls.
            </p>
          </div>

          {/* Body Description */}
          <p className="w-full text-lg md:text-[24px] font-normal leading-normal md:leading-[36px] text-black font-sans">
            Bookly fills your calendar, protects your income, and brings you new customers — automatically
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/professional")}
            className="flex flex-row items-center justify-center py-3 px-6 gap-[8px] w-full sm:w-[290px] h-[48px] bg-[#141414] hover:bg-black text-white rounded-full transition-all active:scale-95 cursor-pointer font-inter font-semibold text-[15.7px] leading-[24px]"
          >
            <span>List your Business - It’s free</span>
            {/* White arrow icon */}
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



      <BusinessMockup />
      <FaqSection />
      <Footer />
    </div>
  );
}
