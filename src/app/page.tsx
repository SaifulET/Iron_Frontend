"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Car04Icon, Clock01Icon, DashboardSquare02Icon, FootballIcon, HealtcareIcon, Location01Icon, Location05Icon, PartyIcon, SailboatOffshoreIcon, Search01Icon, StarIcon, WellnessIcon } from "@hugeicons/core-free-icons";
import ServiceCard, { Recommendation } from "@/components/ServiceCard";

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

  // Carousel Drag to Scroll Ref & States
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
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
            <button
              onClick={() => console.log("Add to Home Screen clicked")}
              className="bg-white hover:bg-neutral-100 text-[#1C1B1C] px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1 sm:gap-1.5"
            >
              <span className="hidden sm:inline">Add to Home Screen</span>
              <span className="inline sm:hidden">Install</span>
              <img src="/Icons/appleSmall.svg" alt="Apple" className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
              <img src="/Icons/android.svg" alt="Android" className="w-3.5 h-3.5" />
            </button>
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
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-16 mb-24">

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
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
            className={`flex overflow-x-auto scrollbar-hide gap-6 flex-nowrap w-full pb-4 items-stretch select-none ${
              isDown ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory scroll-smooth"
            }`}
          >
            {recommendations.map((rec) => (
              <div key={rec.id} className="w-[406px] shrink-0 snap-start">
                <ServiceCard
                  rec={rec}
                  isFavorite={favorites.includes(rec.id)}
                  onToggleFavorite={toggleFavorite}
                  onBookNow={(id) => console.log("Booking item", id)}
                />
              </div>
            ))}
          </div>
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

    </div>
  );
}
