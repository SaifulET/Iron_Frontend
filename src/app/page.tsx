"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Car04Icon, Clock01Icon, DashboardSquare02Icon, FootballIcon, HealtcareIcon, Location01Icon, Location05Icon, PartyIcon, SailboatOffshoreIcon, Search01Icon, StarIcon, WellnessIcon, SquareLock01Icon, User02Icon, File01Icon, FavouriteIcon, CreditCardPosIcon, Home01Icon, HeadsetIcon, ProfileIcon, Logout01Icon, ArrowDown01Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";
import ServiceCard, { Recommendation } from "@/components/ServiceCard";
import Carousel from "@/components/Carousel";
import TrustedBusinessCard, { TrustedBusiness } from "@/components/TrustedBusinessCard";
import WhyChooseUs from "@/components/WhyChooseUs";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";
import BusinessMockup from "@/components/BusinessMockup";
import FaqSection from "@/components/FaqSection";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";

export default function LandingPage() {
  const router = useRouter();

  // State variables
  const [showBanner, setShowBanner] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const userDropdownRef = useRef<HTMLDivElement>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [locationQuery, setLocationQuery] = useState("");

  // Time selector states
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [selectedTime, setSelectedTime] = useState("Any Time");
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2026, 7, 17)); // Default to Aug 17, 2026
  const [currentYear, setCurrentYear] = useState(2026);
  const [currentMonth, setCurrentMonth] = useState(7); // August (0-indexed)
  const [selectedTimeOption, setSelectedTimeOption] = useState<"Any time" | "Morning" | "Afternoon" | "Evening" | "Custom">("Any time");
  const [customStartTime, setCustomStartTime] = useState("04:00");
  const [customStartAmPm, setCustomStartAmPm] = useState<"AM" | "PM">("PM");
  const [customEndTime, setCustomEndTime] = useState("04:00");
  const [customEndAmPm, setCustomEndAmPm] = useState<"AM" | "PM">("PM");

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [currentLocationActive, setCurrentLocationActive] = useState(false);

  // Search dropdown states
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [dropdownFilter, setDropdownFilter] = useState("All");
  const [activeSegment, setActiveSegment] = useState<"search" | "location" | "time" | null>(null);
  const [hoveredSegment, setHoveredSegment] = useState<"search" | "location" | "time" | null>(null);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const timeSelectorRef = useRef<HTMLDivElement>(null);
  const [dropdownWidth, setDropdownWidth] = useState<number | null>(null);

  useEffect(() => {
    const updateWidth = () => {
      if (searchBarRef.current && timeSelectorRef.current) {
        const searchRect = searchBarRef.current.getBoundingClientRect();
        const timeRect = timeSelectorRef.current.getBoundingClientRect();
        const width = (timeRect.left + timeRect.width / 2) - searchRect.left;
        setDropdownWidth(width);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    // Also update on a slight delay to ensure browser layout is settled
    const timer = setTimeout(updateWidth, 100);

    return () => {
      window.removeEventListener("resize", updateWidth);
      clearTimeout(timer);
    };
  }, [showSearchDropdown]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
        setShowSearchDropdown(false);
        setShowTimePicker(false);
        setActiveSegment(null);
      } else if (timeSelectorRef.current && !timeSelectorRef.current.contains(event.target as Node)) {
        setShowTimePicker(false);
        setActiveSegment((prev) => (prev === "time" ? null : prev));
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setShowUserDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  // Calendar helper functions
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const getFormattedHeaderDate = (date: Date) => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return `${weekdays[date.getDay()]}, ${monthNames[date.getMonth()]} ${date.getDate()}`;
  };

  const handlePrevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((prev) => prev - 1);
    } else {
      setCurrentMonth((prev) => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((prev) => prev + 1);
    } else {
      setCurrentMonth((prev) => prev + 1);
    }
  };

  const updateSelectedTimeDisplay = (
    date: Date,
    option: "Any time" | "Morning" | "Afternoon" | "Evening" | "Custom",
    startTime?: string,
    startAmPm?: string,
    endTime?: string,
    endAmPm?: string
  ) => {
    const formattedDate = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
    const currentStart = startTime || customStartTime;
    const currentStartAmPm = startAmPm || customStartAmPm;
    const currentEnd = endTime || customEndTime;
    const currentEndAmPm = endAmPm || customEndAmPm;

    if (option === "Custom") {
      setSelectedTime(`${formattedDate}, ${currentStart} ${currentStartAmPm} - ${currentEnd} ${currentEndAmPm}`);
    } else {
      setSelectedTime(`${formattedDate}, ${option}`);
    }
  };

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  // Mock Book Again services data
  const bookAgainServices: Recommendation[] = [
    {
      id: 101,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      rating: 4.9,
      reviews: 120,
      categories: ["Barber", "Salon"],
      lastVisited: "Last visited 1 week ago",
      startingPrice: 15,
      image: "/img/service_demo.jpg",
      travelsToYou: true,
      travelLocations: ["Larnaca"],
      hasDiamond: true,
    },
    {
      id: 102,
      title: "Zara Hair & Beauty | Limassol Marina",
      rating: 4.8,
      reviews: 85,
      categories: ["Hair", "Salon"],
      lastVisited: "Last visited 3 weeks ago",
      startingPrice: 25,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 103,
      title: "Gold Gym Spa & Massage | Nicosia",
      rating: 4.7,
      reviews: 310,
      categories: ["Massage", "Wellness"],
      lastVisited: "Last visited 1 month ago",
      startingPrice: 40,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
    },
    {
      id: 104,
      title: "Elite Car Detailing | Paphos",
      rating: 4.9,
      reviews: 145,
      categories: ["Automotive"],
      lastVisited: "Last visited 2 months ago",
      startingPrice: 50,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 105,
      title: "Precision Men's Grooming | Larnaca",
      rating: 4.6,
      reviews: 92,
      categories: ["Barber"],
      lastVisited: "Last visited 2 weeks ago",
      startingPrice: 18,
      image: "/img/service_demo.jpg",
      travelsToYou: true,
      travelLocations: ["Larnaca", "Nicosia"],
    },
    {
      id: 106,
      title: "Serenity Yoga Studio | Limassol",
      rating: 5.0,
      reviews: 74,
      categories: ["Wellness"],
      lastVisited: "Last visited 3 days ago",
      startingPrice: 30,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    }
  ];

  // Mock Recommended for You services data
  const recommendedForYouServices: Recommendation[] = [
    {
      id: 201,
      title: "Gold Gym Spa & Massage | Nicosia",
      rating: 4.7,
      reviews: 310,
      categories: ["Massage", "Wellness"],
      lastVisited: "Recommended for you",
      startingPrice: 40,
      image: "/img/service_demo.jpg",
      hasDiamond: true,
    },
    {
      id: 202,
      title: "Elite Car Detailing | Paphos",
      rating: 4.9,
      reviews: 145,
      categories: ["Automotive"],
      lastVisited: "98% match for you",
      startingPrice: 50,
      image: "/img/service_demo.jpg",
      noDeposit: true,
    }
  ];

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
    <div className="min-h-screen font-poppins relative overflow-x-hidden text-[#1C1B1C]">
      {/* Root Solid Background Layer */}
      <div className="absolute inset-0 -z-20 bg-[#FDFBF9] pointer-events-none" />

      <EdgeSoftOrbsTop
        size={380}
        duration={56}
        intensity={0.85}
        blend="screen"
        zIndex={-5}
      />

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
        <div className="w-full bg-gradient-to-r from-white/90 via-[rgba(230,243,249,0.65)] to-white/90 backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-white/60 px-4 sm:px-6 py-3 md:py-[16px] flex items-center justify-between gap-4">

          {/* Left Side: Logo */}
          <div className="flex items-center">
            <div className="cursor-pointer shrink-0" onClick={() => router.push("/")}>
              {isLoggedIn ? (
                <img src="/image/smallBlacklogo.svg" alt="Bookly" className="h-8 md:h-[44px] w-9 object-contain" />
              ) : (
                <img src="/img/logoo.svg" alt="Bookly" className="h-8 md:h-[44px] w-[120px] object-contain" />
              )}
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
            {!isLoggedIn ? (
              <>
                {/* Login button */}
                <button
                  onClick={() => setIsLoggedIn(true)}
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
              </>
            ) : (
              <>
                {/* List your business button */}
                <button
                  onClick={() => router.push("/professional")}
                  className="bg-[#1C1B1C] hover:bg-black text-[#F9FAFB] px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer active:scale-95 whitespace-nowrap"
                >
                  List your business
                </button>

                {/* Logged in user avatar and dropdown toggle */}
                <div className="relative" ref={userDropdownRef}>
                  <button
                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                    className="flex items-center gap-2 p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    <img
                      src="/img/authImg.png"
                      alt="User Avatar"
                      className="w-9 h-9 rounded-full object-cover border border-[#ACAAB4]/40"
                    />
                    <svg className="w-3.5 h-3.5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Dropdown Menu */}
                  {showUserDropdown && (
                    <div className="absolute right-0 mt-3 w-[247px] bg-white rounded-xl shadow-[0_4px_24px_rgba(0,0,0,0.08)] border border-[#ACAAB4]/30 p-5 flex flex-col gap-4 z-50 font-['Poppins']">

                      {/* 1. Language selector */}
                      <div className="relative">
                        <button
                          onClick={() => setShowLangDropdown(!showLangDropdown)}
                          className="flex items-center gap-2 cursor-pointer text-[#111111]"
                        >
                          <span className="font-medium text-xs leading-5">{selectedLanguage}</span>
                          <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 text-[#111111]" />
                        </button>

                        {showLangDropdown && (
                          <div className="absolute left-0 mt-2 w-32 bg-white border border-[#E8E6FF] rounded-xl shadow-lg z-50 overflow-hidden py-1">
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

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 2. Profile */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={User02Icon} className="w-5 h-5 text-[#141B34]" />
                        <span className="font-medium text-base text-[#1C1B1C]">Profile</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 3. My Bookings */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={File01Icon} className="w-[18px] h-[18px] text-[#0C0C0C]" />
                        <span className="font-medium text-base text-[#1C1B1C]">My Bookings</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 4. Favorites */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={FavouriteIcon} className="w-5 h-5 text-[#141B34]" />
                        <span className="font-medium text-base text-[#1C1B1C]">Favorites</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 5. Payment card */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={CreditCardPosIcon} className="w-[18px] h-[18px] text-[#111111]" />
                        <span className="font-medium text-base text-[#1C1B1C]">Payment card</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 6. Book again */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={Clock01Icon} className="w-[18px] h-[18px] text-[#111111]" />
                        <span className="font-medium text-base text-[#1C1B1C]">Book again</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 7. Setting */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={Clock01Icon} className="w-[18px] h-[18px] text-[#111111]" />
                        <span className="font-medium text-base text-[#1C1B1C]">Setting</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 8. Add to Home Screen */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={Home01Icon} className="w-5 h-5 text-[#141B34]" />
                        <span className="font-medium text-base text-[#1C1B1C]">Add to Home Screen</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 9. Help & Support */}
                      <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85">
                        <HugeiconsIcon icon={HeadsetIcon} className="w-5 h-5 text-[#141B34]" />
                        <span className="font-medium text-base text-[#1C1B1C]">Help & Support</span>
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 10. List your Business */}
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          router.push("/professional");
                        }}
                        className="flex items-center justify-between cursor-pointer w-full hover:opacity-85"
                      >
                        <div className="flex items-center gap-3">
                          <HugeiconsIcon icon={ProfileIcon} className="w-[18px] h-[18px] text-[#141B34]" />
                          <span className="font-medium text-base text-[#1C1B1C]">List your Business</span>
                        </div>
                        <HugeiconsIcon icon={ArrowRight02Icon} className="w-6 h-6 text-[#111111]" />
                      </button>

                      <div className="border-t border-[#ACAAB4] w-full"></div>

                      {/* 11. Logout */}
                      <button
                        onClick={() => {
                          setIsLoggedIn(false);
                          setShowUserDropdown(false);
                        }}
                        className="flex items-center gap-3 cursor-pointer text-left w-full text-red-600 hover:text-red-700"
                      >
                        <HugeiconsIcon icon={Logout01Icon} className="w-5 h-5 text-[#141B34]" />
                        <span className="font-medium text-base">Logout</span>
                      </button>

                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Hamburger Menu Toggle (Mobile) */}
          <div className="flex md:hidden items-center gap-2">
            {/* Logged in avatar trigger with down arrow */}
            {isLoggedIn && (
              <button
                onClick={() => setShowUserDropdown(!showUserDropdown)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer mr-1 relative z-40"
              >
                <img
                  src="/img/authImg.png"
                  alt="User Avatar"
                  className="w-8 h-8 rounded-full object-cover border border-[#ACAAB4]/40"
                />
                <svg className="w-3.5 h-3.5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            )}

            {/* Language Selector (Mobile view, simplified) */}
            {!isLoggedIn && (
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
            )}

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
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setIsLoggedIn(true);
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
                </>
              ) : (
                <>
                  <div className="flex items-center gap-3 py-2 border-b border-neutral-100">
                    <img
                      src="/img/authImg.png"
                      alt="User Avatar"
                      className="w-10 h-10 rounded-full object-cover border border-[#ACAAB4]/40"
                    />
                    <div>
                      <div className="font-semibold text-sm text-[#1C1B1C]">Logged In User</div>
                      <div className="text-xs text-[#757575]">{selectedLanguage}</div>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      setShowMobileMenu(false);
                      setIsLoggedIn(false);
                    }}
                    className="w-full text-center border-2 border-red-200 text-red-600 hover:bg-red-50 py-2.5 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Mobile Full-Screen User Dropdown Modal */}
        {isLoggedIn && showUserDropdown && (
          <div className="fixed inset-0 bg-white overflow-y-auto p-6 flex flex-col gap-4 z-[100] font-['Poppins'] animate-in fade-in zoom-in-95 duration-200 md:hidden">
            
            {/* Mobile Modal Header */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="font-semibold text-lg text-[#1C1B1C]">Account Menu</span>
              <button
                onClick={() => setShowUserDropdown(false)}
                className="p-1 text-[#1C1B1C] hover:opacity-70 cursor-pointer"
                aria-label="Close Account Menu"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* 1. Language selector */}
            <div className="relative">
              <button
                onClick={() => setShowLangDropdown(!showLangDropdown)}
                className="flex items-center gap-2 cursor-pointer text-[#111111]"
              >
                <span className="font-medium text-xs leading-5">{selectedLanguage}</span>
                <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 text-[#111111]" />
              </button>

              {showLangDropdown && (
                <div className="absolute left-0 mt-2 w-32 bg-white border border-[#E8E6FF] rounded-xl shadow-lg z-50 overflow-hidden py-1">
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

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 2. Profile */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={User02Icon} className="w-5 h-5 text-[#141B34]" />
              <span className="font-medium text-base text-[#1C1B1C]">Profile</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 3. My Bookings */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={File01Icon} className="w-[18px] h-[18px] text-[#0C0C0C]" />
              <span className="font-medium text-base text-[#1C1B1C]">My Bookings</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 4. Favorites */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={FavouriteIcon} className="w-5 h-5 text-[#141B34]" />
              <span className="font-medium text-base text-[#1C1B1C]">Favorites</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 5. Payment card */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={CreditCardPosIcon} className="w-[18px] h-[18px] text-[#111111]" />
              <span className="font-medium text-base text-[#1C1B1C]">Payment card</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 6. Book again */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={Clock01Icon} className="w-[18px] h-[18px] text-[#111111]" />
              <span className="font-medium text-base text-[#1C1B1C]">Book again</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 7. Setting */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={Clock01Icon} className="w-[18px] h-[18px] text-[#111111]" />
              <span className="font-medium text-base text-[#1C1B1C]">Setting</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 8. Add to Home Screen */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={Home01Icon} className="w-5 h-5 text-[#141B34]" />
              <span className="font-medium text-base text-[#1C1B1C]">Add to Home Screen</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 9. Help & Support */}
            <button className="flex items-center gap-3 cursor-pointer text-left w-full hover:opacity-85" onClick={() => setShowUserDropdown(false)}>
              <HugeiconsIcon icon={HeadsetIcon} className="w-5 h-5 text-[#141B34]" />
              <span className="font-medium text-base text-[#1C1B1C]">Help & Support</span>
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 10. List your Business */}
            <button
              onClick={() => {
                setShowUserDropdown(false);
                router.push("/professional");
              }}
              className="flex items-center justify-between cursor-pointer w-full hover:opacity-85"
            >
              <div className="flex items-center gap-3">
                <HugeiconsIcon icon={ProfileIcon} className="w-[18px] h-[18px] text-[#141B34]" />
                <span className="font-medium text-base text-[#1C1B1C]">List your Business</span>
              </div>
              <HugeiconsIcon icon={ArrowRight02Icon} className="w-6 h-6 text-[#111111]" />
            </button>

            <div className="border-t border-[#ACAAB4] w-full"></div>

            {/* 11. Logout */}
            <button
              onClick={() => {
                setIsLoggedIn(false);
                setShowUserDropdown(false);
              }}
              className="flex items-center gap-3 cursor-pointer text-left w-full text-red-600 hover:text-red-700"
            >
              <HugeiconsIcon icon={Logout01Icon} className="w-5 h-5 text-[#141B34]" />
              <span className="font-medium text-base">Logout</span>
            </button>

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
        <div ref={searchBarRef} className={`w-full max-w-[900px] rounded-2xl md:rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-[#E8E6FF] p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-0 relative transition-colors duration-300 ${activeSegment !== null ? "bg-[#F2F2F2]" : "bg-white"
          } ${showSearchDropdown ? "z-[200]" : "z-30"}`}>

          {/* Search Input */}
          <div
            onMouseEnter={() => setHoveredSegment("search")}
            onMouseLeave={() => setHoveredSegment(null)}
            className={`flex-1 w-full flex items-center gap-3 px-6 py-2.5 md:py-1.5 transition-all duration-300 ${activeSegment === "search"
                ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full z-10"
                : activeSegment !== null
                  ? "hover:bg-black/5 rounded-full"
                  : "hover:bg-[#F2F2F2] rounded-full"
              }`}
          >
            <HugeiconsIcon icon={Search01Icon} className="text-[#111111]" />
            <input
              type="text"
              placeholder="All treatments"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => {
                setShowSearchDropdown(true);
                setActiveSegment("search");
                setShowTimePicker(false);
              }}
              className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#757575] bg-transparent outline-none font-medium"
            />
          </div>

          {/* Divider 1 */}
          {activeSegment !== "search" && activeSegment !== "location" && hoveredSegment !== "search" && hoveredSegment !== "location" && (
            <div className="hidden md:block w-[1px] h-8 bg-[#EBEBEB]" />
          )}

          {/* Location Selector */}
          <div
            onMouseEnter={() => setHoveredSegment("location")}
            onMouseLeave={() => setHoveredSegment(null)}
            className={`relative flex-1 w-full flex items-center gap-3 px-6 py-2.5 md:py-1.5 transition-all duration-300 ${activeSegment === "location"
                ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full z-10"
                : activeSegment !== null
                  ? "hover:bg-black/5 rounded-full"
                  : "hover:bg-[#F2F2F2] rounded-full"
              }`}
          >
            <HugeiconsIcon icon={Location05Icon} className="text-[#111111]" />
            <input
              type="text"
              placeholder="Current location"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              onFocus={() => {
                setActiveSegment("location");
                setShowTimePicker(false);
                setShowSearchDropdown(false);
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  setShowSearchDropdown(true);
                }
              }}
              className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#757575] bg-transparent outline-none font-medium"
            />

            {/* Location Dropdown (Desktop) */}
            {activeSegment === "location" && (
              <div className="hidden md:flex absolute top-[110%] left-0 w-[350px] h-[590px] p-5 bg-white rounded-[12px] shadow-2xl z-50 border border-neutral-200/80 flex-col gap-[40px] overflow-y-auto animate-in fade-in slide-in-from-top-2 duration-200 font-poppins text-left">
                {/* Current Location Row - Frame 2147239300 */}
                <div className="flex flex-row justify-between items-center w-[310px] h-10 shrink-0 gap-[83px]">
                  <span className="font-poppins font-medium text-[18px] leading-[26px] text-[#111111] select-none">Current Location</span>
                  <button
                    type="button"
                    onClick={() => {
                      setCurrentLocationActive(!currentLocationActive);
                      if (!currentLocationActive) {
                        setLocationQuery("Current location");
                      } else {
                        setLocationQuery("");
                      }
                    }}
                    className={`w-[78px] h-10 rounded-[20px] flex items-center transition-all duration-300 ${currentLocationActive ? "pl-[40px] pr-[6px] bg-[#3586B8]" : "pl-[6px] pr-[40px] bg-[#D3D3D3]"
                      }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.2)] transition-all duration-200" />
                  </button>
                </div>

                {/* Locations list wrapper - Frame 2147239303 */}
                <div className="flex flex-col items-start gap-[12px] w-[310px] shrink-0">
                  {[
                    "Larnaca, Cyprus",
                    "Limassol, Cyprus",
                    "Pafos, Cyprus",
                    "Nicosia, Cyprus",
                    "Ayia Napa, Cyprus",
                    "Protaras, Cyprus"
                  ].map((loc, index, arr) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => {
                        setLocationQuery(loc);
                        setActiveSegment(null);
                      }}
                      className="w-[310px] flex flex-col items-start gap-[12px] group cursor-pointer"
                    >
                      <div className="flex flex-row items-center gap-[16px] w-[310px] h-[30px]">
                        <HugeiconsIcon icon={Location05Icon} className="text-[#0C0C0C] w-6 h-6 shrink-0" />
                        <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] group-hover:text-neutral-600 transition-colors">
                          {loc}
                        </span>
                      </div>
                      {index < arr.length - 1 && (
                        <div className="w-[310px] h-0 border-t border-[#ACAAB4]" />
                      )}
                    </button>
                  ))}
                </div>

                {/* Recent Section - Frame 2147239305 */}
                <div className="flex flex-col items-start gap-[16px] w-[310px] shrink-0">
                  <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] select-none">Recent</span>

                  {/* Recent List - Frame 2147239304 */}
                  <div className="flex flex-col items-start gap-[12px] w-[310px]">
                    {[
                      "Pafos, Cyprus",
                      "Limassol, Cyprus"
                    ].map((loc, index, arr) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setLocationQuery(loc);
                          setActiveSegment(null);
                        }}
                        className="w-[310px] flex flex-col items-start gap-[12px] group cursor-pointer"
                      >
                        <div className="flex flex-row items-center gap-[16px] w-[310px] h-[30px]">
                          <HugeiconsIcon icon={Location05Icon} className="text-[#0C0C0C] w-6 h-6 shrink-0" />
                          <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] group-hover:text-neutral-600 transition-colors">
                            {loc}
                          </span>
                        </div>
                        {index < arr.length - 1 && (
                          <div className="w-[310px] h-0 border-t border-[#ACAAB4]" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Divider 2 */}
          {activeSegment !== "location" && activeSegment !== "time" && hoveredSegment !== "location" && hoveredSegment !== "time" && (
            <div className="hidden md:block w-[1px] h-8 bg-[#EBEBEB]" />
          )}

          {/* Time Selector */}
          <div
            ref={timeSelectorRef}
            onMouseEnter={() => setHoveredSegment("time")}
            onMouseLeave={() => setHoveredSegment(null)}
            className={`relative flex-1 w-full flex items-center justify-between px-6 py-2.5 md:py-1.5 md:mr-2 transition-all duration-300 ${activeSegment === "time"
                ? "bg-white shadow-[0_4px_12px_rgba(0,0,0,0.08)] rounded-full z-10"
                : activeSegment !== null
                  ? "hover:bg-black/5 rounded-full"
                  : "hover:bg-[#F2F2F2] rounded-full"
              }`}
          >
            <button
              type="button"
              onClick={() => {
                if (typeof window !== "undefined" && window.innerWidth < 768) {
                  setShowSearchDropdown(true);
                  setActiveSegment("time");
                  setShowTimePicker(false);
                } else {
                  const nextVal = !showTimePicker;
                  setShowTimePicker(nextVal);
                  if (nextVal) {
                    setShowSearchDropdown(false);
                    setActiveSegment("time");
                  } else {
                    setActiveSegment(null);
                  }
                }
              }}
              className="w-full flex items-center gap-3 text-left py-2 text-sm text-[#757575] hover:text-[#1C1B1C] transition-colors cursor-pointer"
            >
              <HugeiconsIcon icon={Clock01Icon} className="text-[#111111]" />
              <span className="text-[#1C1B1C] font-medium truncate">{selectedTime === "Any Time" ? "Any time" : selectedTime}</span>
            </button>

            {/* Time Picker Popup Dropdown */}
            {showTimePicker && (
              <div className="hidden md:flex absolute top-[110%] right-[-100px] md:right-[-250px] w-[95vw] max-w-[812px] md:w-[812px] md:h-[704px] p-5 bg-white rounded-[12px] shadow-2xl z-50 border border-neutral-200/80 animate-in fade-in slide-in-from-top-2 duration-200 flex-col gap-10 overflow-y-auto font-roboto">

                {/* Calendar Selection Section */}
                <div className="flex flex-col items-start gap-4 w-full">
                  {/* Month Selection Row */}
                  <div className="flex flex-row justify-between items-center w-full py-1">
                    <div className="flex items-center gap-1 cursor-pointer">
                      <span className="font-roboto font-medium text-sm text-[#111111]">{months[currentMonth]} {currentYear}</span>
                      <svg className="w-4 h-4 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                    {/* Month Nav Buttons */}
                    <div className="flex items-center gap-0">
                      <button
                        type="button"
                        onClick={handlePrevMonth}
                        className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                      >
                        <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        onClick={handleNextMonth}
                        className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-neutral-100 transition-colors"
                      >
                        <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Header: Week day, Day */}
                  <div className="w-full pt-0 pr-3 pb-3 pl-6 border-b border-[#CAC4D0]">
                    <h3 className="font-roboto font-normal text-[32px] leading-10 text-[#111111] text-left">
                      {getFormattedHeaderDate(selectedDate)}
                    </h3>
                  </div>

                  {/* Weekdays Row */}
                  <div className="grid grid-cols-7 w-full text-center px-3">
                    {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
                      <span key={index} className="font-roboto font-normal text-base leading-6 text-[#111111] py-2">{d}</span>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  {(() => {
                    const daysInMonth = getDaysInMonth(currentYear, currentMonth);
                    const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
                    const cells = [];
                    // Empty cells
                    for (let i = 0; i < firstDay; i++) {
                      cells.push(<div key={`empty-${i}`} className="w-10 h-10" />);
                    }
                    // Day cells
                    for (let day = 1; day <= daysInMonth; day++) {
                      const dateObj = new Date(currentYear, currentMonth, day);
                      const isSelected = selectedDate &&
                        selectedDate.getDate() === day &&
                        selectedDate.getMonth() === currentMonth &&
                        selectedDate.getFullYear() === currentYear;

                      cells.push(
                        <div key={`day-${day}`} className="h-10 flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedDate(dateObj);
                              updateSelectedTimeDisplay(dateObj, selectedTimeOption);
                            }}
                            className={`w-10 h-10 flex items-center justify-center rounded-full font-roboto text-base transition-colors ${isSelected
                                ? "bg-[#666666] text-white font-medium"
                                : "text-[#111111] hover:bg-neutral-100"
                              }`}
                          >
                            {day}
                          </button>
                        </div>
                      );
                    }
                    return <div className="grid grid-cols-7 w-full text-center gap-y-1 px-3">{cells}</div>;
                  })()}
                </div>

                {/* Time Selection Section */}
                <div className="flex flex-col items-start gap-4 w-full mt-auto pt-4 border-t border-neutral-100">
                  <div className="flex flex-row items-center justify-between w-full">
                    <span className="font-roboto font-bold text-sm text-[#111111] shrink-0">Select time</span>
                    <div className="flex flex-row items-center justify-between flex-1 ml-10">
                      {[
                        { id: "Any time", label: "Any time", sub: "" },
                        { id: "Morning", label: "Morning", sub: "9am - 12pm" },
                        { id: "Afternoon", label: "Afternoon", sub: "12pm - 5pm" },
                        { id: "Evening", label: "Evening", sub: "5pm - 12am" }
                      ].map((opt) => {
                        const isActive = selectedTimeOption === opt.id;
                        return (
                          <button
                            key={opt.id}
                            type="button"
                            onClick={() => {
                              setSelectedTimeOption(opt.id as any);
                              updateSelectedTimeDisplay(selectedDate, opt.id as any);
                            }}
                            className={`flex flex-col items-center justify-center transition-all ${isActive
                                ? "border border-[#3A506B] rounded-xl px-5 py-2.5 bg-white text-[#111111] font-bold shadow-sm"
                                : "border border-transparent text-[#4A607A] hover:bg-neutral-50 p-2"
                              }`}
                          >
                            <span className="text-sm font-semibold">{opt.label}</span>
                            {opt.sub && <span className={`text-xs ${isActive ? 'text-[#111111] font-semibold' : 'text-[#7A8B9E]'}`}>{opt.sub}</span>}
                          </button>
                        );
                      })}
                      {/* Custom option */}
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedTimeOption("Custom");
                          updateSelectedTimeDisplay(selectedDate, "Custom");
                        }}
                        className={`px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${selectedTimeOption === "Custom"
                            ? "bg-[#666666] text-white"
                            : "bg-[#E8EAEF] text-[#111111] hover:bg-neutral-200"
                          }`}
                      >
                        Custom
                      </button>
                    </div>
                  </div>

                  {/* Custom Time Option Section */}
                  {selectedTimeOption === "Custom" && (
                    <div className="w-full mt-4 flex flex-col gap-4 animate-in fade-in slide-in-from-top-1 duration-200">
                      <h4 className="font-roboto font-bold text-sm text-[#111111]">Custom Time</h4>
                      <div className="flex flex-row gap-6 w-full">
                        {/* Start Time */}
                        <div className="flex-1 flex flex-col gap-2">
                          <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">Start Time</span>
                          <div className="flex items-center gap-3 px-4 py-2.5 border border-neutral-300 rounded-xl bg-white">
                            <HugeiconsIcon icon={Clock01Icon} className="text-neutral-500 w-5 h-5" />
                            <input
                              type="text"
                              value={customStartTime}
                              onChange={(e) => {
                                setCustomStartTime(e.target.value);
                                updateSelectedTimeDisplay(selectedDate, "Custom", e.target.value, customStartAmPm, customEndTime, customEndAmPm);
                              }}
                              className="w-16 text-sm text-[#1C1B1C] bg-transparent outline-none font-medium text-left"
                            />
                            <div className="flex bg-[#E8EAEF] rounded-full p-1 ml-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomStartAmPm("AM");
                                  updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, "AM", customEndTime, customEndAmPm);
                                }}
                                className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customStartAmPm === "AM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"
                                  }`}
                              >
                                AM
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomStartAmPm("PM");
                                  updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, "PM", customEndTime, customEndAmPm);
                                }}
                                className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customStartAmPm === "PM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"
                                  }`}
                              >
                                PM
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* End Time */}
                        <div className="flex-1 flex flex-col gap-2">
                          <span className="text-[10px] font-semibold text-neutral-400 uppercase tracking-wider">End Time</span>
                          <div className="flex items-center gap-3 px-4 py-2.5 border border-neutral-300 rounded-xl bg-white">
                            <HugeiconsIcon icon={Clock01Icon} className="text-neutral-500 w-5 h-5" />
                            <input
                              type="text"
                              value={customEndTime}
                              onChange={(e) => {
                                setCustomEndTime(e.target.value);
                                updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, e.target.value, customEndAmPm);
                              }}
                              className="w-16 text-sm text-[#1C1B1C] bg-transparent outline-none font-medium text-left"
                            />
                            <div className="flex bg-[#E8EAEF] rounded-full p-1 ml-auto">
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomEndAmPm("AM");
                                  updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, customEndTime, "AM");
                                }}
                                className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customEndAmPm === "AM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"
                                  }`}
                              >
                                AM
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  setCustomEndAmPm("PM");
                                  updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, customEndTime, "PM");
                                }}
                                className={`w-9 h-7 flex items-center justify-center text-xs font-semibold rounded-full transition-all ${customEndAmPm === "PM" ? "bg-[#666666] text-white shadow-sm" : "text-neutral-500"
                                  }`}
                              >
                                PM
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Search Action Button */}
          <button
            type="button"
            className="w-full md:w-auto bg-[#1C1B1C] hover:bg-black text-white px-6 py-3 rounded-xl md:rounded-full flex items-center justify-center gap-2 text-sm font-semibold transition-all duration-200 cursor-pointer shrink-0 active:scale-95"
            onClick={() => {
              console.log("Searching for", searchQuery, "in", locationQuery, "at", selectedTime);
              setShowSearchDropdown(false);
              setShowTimePicker(false);
              setActiveSegment(null);
            }}
          >
            <span>Search</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>

          {/* Search Results Dropdown Overlay */}
          {showSearchDropdown && (
            <>
              {/* Desktop Dropdown */}
              <div
                style={dropdownWidth ? { width: `${dropdownWidth}px` } : undefined}
                className="hidden md:flex absolute top-[105%] left-0 w-full md:w-[761px] max-h-[40vh] md:max-h-[500px] overflow-y-auto bg-white rounded-xl shadow-2xl p-6 md:p-10 flex-col items-start gap-10 z-50 text-left border border-neutral-200/80 animate-in fade-in slide-in-from-top-4 duration-300 search-dropdown-scrollbar"
              >

                {/* Frame 2147239451: Filter Pills */}
                <div className="flex flex-row flex-wrap items-center gap-2 w-full pb-2 border-b border-neutral-100">
                  {[
                    { id: "All", label: "All" },
                    { id: "Nearby", label: "Nearby" },
                    { id: "Trending", label: "Trending" },
                    { id: "Recents", label: "Recents" },
                    { id: "Services", label: "Services" },
                    { id: "We come to you", label: "We come to you" }
                  ].map((pill) => {
                    const isActive = dropdownFilter === pill.id;
                    return (
                      <button
                        key={pill.id}
                        type="button"
                        onClick={() => setDropdownFilter(pill.id)}
                        className={`flex flex-row justify-center items-center py-1.5 px-6 gap-2.5 h-8 rounded-full font-poppins font-medium text-xs tracking-[0.7px] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                            ? "bg-[#111111] text-white border-transparent"
                            : "border border-[#111111] text-[#111111] hover:bg-neutral-50"
                          }`}
                      >
                        {pill.label}
                      </button>
                    );
                  })}
                </div>

                {/* Section: Trending searches */}
                {(dropdownFilter === "All" || dropdownFilter === "Trending") && (
                  <div className="flex flex-col items-start p-0 gap-5 w-full">
                    <h3 className="font-poppins font-medium text-lg leading-[22px] tracking-[0.01em] text-[#111111]">
                      Trending searches
                    </h3>
                    <div className="flex flex-row flex-wrap items-start content-start p-0 gap-2 w-full">
                      {[
                        "Hair Salon",
                        "Physiotherapy",
                        "Massage",
                        "Car dealing",
                        "Photography",
                        "Tennis Lesson"
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => {
                            setSearchQuery(item);
                            setShowSearchDropdown(false);
                            setActiveSegment(null);
                          }}
                          className="flex flex-row justify-center items-center py-1.5 px-6 gap-2.5 h-8 border border-[#111111] rounded-full text-[#111111] font-poppins font-medium text-xs tracking-[0.7px] whitespace-nowrap hover:bg-neutral-50 transition-colors cursor-pointer"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Section: Search Suggestions */}
                {(dropdownFilter === "All" || dropdownFilter === "We come to you" || dropdownFilter === "Nearby") && (
                  <div className="flex flex-col items-start p-0 gap-5 w-full">
                    <div className="flex flex-col items-start p-0 gap-4 w-full">

                      {/* Row 1: Search Icon + Hair & styling + Founding Partner */}
                      {dropdownFilter !== "We come to you" && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("Hair & styling");
                            setShowSearchDropdown(false);
                            setActiveSegment(null);
                          }}
                          className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="w-6 h-6 flex items-center justify-center shrink-0">
                            <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                          </div>
                          <div className="flex flex-col justify-center items-start p-0">
                            <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                              Hair & styling
                            </span>
                            <span className="font-poppins font-normal text-[10px] leading-[10px] tracking-[0.01em] text-[#757575]">
                              Founding Partner
                            </span>
                          </div>
                        </button>
                      )}

                      {/* Row 2: Search Icon + Hair & styling */}
                      {dropdownFilter !== "We come to you" && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("Hair & styling");
                            setShowSearchDropdown(false);
                            setActiveSegment(null);
                          }}
                          className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="w-6 h-6 flex items-center justify-center shrink-0">
                            <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                          </div>
                          <div className="flex flex-col justify-center items-start p-0">
                            <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                              Hair & styling
                            </span>
                          </div>
                        </button>
                      )}

                      {/* Row 3: Van Icon + Hair & styling */}
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("Hair & styling");
                          setShowSearchDropdown(false);
                          setActiveSegment(null);
                        }}
                        className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10H8V6c0-1.1-.9-2-2-2H2v13h2" />
                            <circle cx="7" cy="18" r="2" />
                            <circle cx="17" cy="18" r="2" />
                            <path d="M13 6h3l4 4v3h-7V6z" />
                          </svg>
                        </div>
                        <div className="flex flex-col justify-center items-start p-0">
                          <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                            Hair & styling
                          </span>
                        </div>
                      </button>

                      {/* Row 4: Search Icon + Hair & styling */}
                      {dropdownFilter !== "We come to you" && (
                        <button
                          type="button"
                          onClick={() => {
                            setSearchQuery("Hair & styling");
                            setShowSearchDropdown(false);
                            setActiveSegment(null);
                          }}
                          className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                        >
                          <div className="w-6 h-6 flex items-center justify-center shrink-0">
                            <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                          </div>
                          <div className="flex flex-col justify-center items-start p-0">
                            <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                              Hair & styling
                            </span>
                          </div>
                        </button>
                      )}
                    </div>
                  </div>
                )}

                {/* Section: Recents */}
                {(dropdownFilter === "All" || dropdownFilter === "Recents" || dropdownFilter === "Nearby") && (
                  <div className="flex flex-col items-start p-0 gap-5 w-full">
                    <h3 className="font-poppins font-medium text-lg leading-[22px] tracking-[0.01em] text-[#111111]">
                      Recents
                    </h3>
                    <div className="flex flex-col items-start p-0 gap-4 w-full">
                      {/* Recent Item 1 */}
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("Hair & styling");
                          setLocationQuery("Larnaca");
                          setSelectedTime("Any Time");
                          setShowSearchDropdown(false);
                          setActiveSegment(null);
                        }}
                        className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                            Hair & styling
                          </span>
                          <div className="flex items-center gap-1 text-[#757575] text-xs">
                            <span>Larnaca</span>
                            <span className="w-1 h-1 rounded-full bg-[#757575]"></span>
                            <span>Any time</span>
                          </div>
                        </div>
                      </button>

                      {/* Divider */}
                      <div className="w-full h-0 border-t border-[#837C7C]/40"></div>

                      {/* Recent Item 2 */}
                      <button
                        type="button"
                        onClick={() => {
                          setSearchQuery("Hair & styling");
                          setLocationQuery("Larnaca");
                          setSelectedTime("Any Time");
                          setShowSearchDropdown(false);
                          setActiveSegment(null);
                        }}
                        className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                      >
                        <div className="w-6 h-6 flex items-center justify-center shrink-0">
                          <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                        </div>
                        <div className="flex flex-col items-start gap-1">
                          <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                            Hair & styling
                          </span>
                          <div className="flex items-center gap-1 text-[#757575] text-xs">
                            <span>Larnaca</span>
                            <span className="w-1 h-1 rounded-full bg-[#757575]"></span>
                            <span>Any time</span>
                          </div>
                        </div>
                      </button>
                    </div>
                  </div>
                )}

                {/* Section: Services */}
                {(dropdownFilter === "All" || dropdownFilter === "Services") && (
                  <div className="flex flex-col items-start p-0 gap-5 w-full">
                    <h3 className="font-poppins font-medium text-lg leading-[22px] tracking-[0.01em] text-[#111111]">
                      Services
                    </h3>
                    <div className="flex flex-col items-start p-0 gap-3 w-full">
                      <span className="font-poppins font-semibold text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                        Category
                      </span>
                      {["Sub Category 1", "Sub Category 1", "Sub Category 1", "Sub Category 1", "Sub Category 1Subxzzzzzzzza Category 1"].map((subCat, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setSearchQuery(subCat);
                            setShowSearchDropdown(false);
                            setActiveSegment(null);
                          }}
                          className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111] hover:text-neutral-600 pl-4 text-left cursor-pointer"
                        >
                          {subCat}
                        </button>
                      ))}

                      <span className="font-poppins font-semibold text-sm leading-[22px] tracking-[0.01em] text-[#111111] mt-3">
                        Category
                      </span>
                      {["Sub Category 1x", "Sub Category 1"].map((subCat, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setSearchQuery(subCat);
                            setShowSearchDropdown(false);
                            setActiveSegment(null);
                          }}
                          className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111] hover:text-neutral-600 pl-4 text-left cursor-pointer"
                        >
                          {subCat}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile Fullscreen Search Modal Overlay */}
              <div className="md:hidden fixed inset-0 bg-white z-[100] flex flex-col p-5 animate-in fade-in slide-in-from-bottom duration-300">
                {/* Modal Header */}
                <div className="flex items-center gap-4 mb-5 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setShowSearchDropdown(false);
                      setActiveSegment(null);
                    }}
                    className="p-2 hover:bg-neutral-100 rounded-full transition-colors cursor-pointer"
                  >
                    <svg className="w-6 h-6 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                  <h2 className="text-2xl font-bold text-neutral-900 font-poppins">
                    {activeSegment === "location" ? "Location" : activeSegment === "time" ? "Select Time" : "Search"}
                  </h2>
                </div>

                {activeSegment === "location" ? (
                  /* Mobile Location Contents */
                  <div className="flex-1 flex flex-col gap-[40px] overflow-y-auto font-poppins text-left px-1">
                    {/* Search input for mobile location */}
                    <div className="flex items-center gap-[16px] px-4 py-1 border border-neutral-300 rounded-xl mb-1 shrink-0 bg-white">
                      <HugeiconsIcon icon={Location05Icon} className="text-[#0C0C0C] w-6 h-6 shrink-0" />
                      <input
                        type="text"
                        placeholder="Search location"
                        value={locationQuery}
                        onChange={(e) => setLocationQuery(e.target.value)}
                        className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#757575] bg-transparent outline-none font-medium"
                      />
                    </div>

                    {/* Current Location Row - Frame 2147239300 */}
                    <div className="flex flex-row justify-between items-center w-full h-10 shrink-0 border-b border-neutral-100 pb-4">
                      <span className="font-poppins font-medium text-[18px] leading-[26px] text-[#111111] select-none">Current Location</span>
                      <button
                        type="button"
                        onClick={() => {
                          setCurrentLocationActive(!currentLocationActive);
                          if (!currentLocationActive) {
                            setLocationQuery("Current location");
                          } else {
                            setLocationQuery("");
                          }
                        }}
                        className={`w-[78px] h-10 rounded-[20px] flex items-center transition-all duration-300 ${currentLocationActive ? "pl-[40px] pr-[6px] bg-[#3586B8]" : "pl-[6px] pr-[40px] bg-[#D3D3D3]"
                          }`}
                      >
                        <div className="w-8 h-8 rounded-full bg-[rgba(0,0,0,0.2)] transition-all duration-200" />
                      </button>
                    </div>

                    {/* Locations list wrapper - Frame 2147239303 */}
                    <div className="flex flex-col items-start gap-[12px] w-full shrink-0">
                      {[
                        "Larnaca, Cyprus",
                        "Limassol, Cyprus",
                        "Pafos, Cyprus",
                        "Nicosia, Cyprus",
                        "Ayia Napa, Cyprus",
                        "Protaras, Cyprus"
                      ].map((loc, index, arr) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => {
                            setLocationQuery(loc);
                            setShowSearchDropdown(false);
                            setActiveSegment(null);
                          }}
                          className="w-full flex flex-col items-start gap-[12px] group cursor-pointer"
                        >
                          <div className="flex flex-row items-center gap-[16px] w-full h-[30px]">
                            <HugeiconsIcon icon={Location05Icon} className="text-[#0C0C0C] w-6 h-6 shrink-0" />
                            <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] group-hover:text-neutral-600 transition-colors">
                              {loc}
                            </span>
                          </div>
                          {index < arr.length - 1 && (
                            <div className="w-full h-0 border-t border-[#ACAAB4]" />
                          )}
                        </button>
                      ))}
                    </div>

                    {/* Recent Section - Frame 2147239305 */}
                    <div className="flex flex-col items-start gap-[16px] w-full shrink-0">
                      <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] select-none">Recent</span>

                      {/* Recent List - Frame 2147239304 */}
                      <div className="flex flex-col items-start gap-[12px] w-full">
                        {[
                          "Pafos, Cyprus",
                          "Limassol, Cyprus"
                        ].map((loc, index, arr) => (
                          <button
                            key={index}
                            type="button"
                            onClick={() => {
                              setLocationQuery(loc);
                              setShowSearchDropdown(false);
                              setActiveSegment(null);
                            }}
                            className="w-full flex flex-col items-start gap-[12px] group cursor-pointer"
                          >
                            <div className="flex flex-row items-center gap-[16px] w-full h-[30px]">
                              <HugeiconsIcon icon={Location05Icon} className="text-[#0C0C0C] w-6 h-6 shrink-0" />
                              <span className="font-poppins font-medium text-[18px] leading-[30px] text-[#111111] group-hover:text-neutral-600 transition-colors">
                                {loc}
                              </span>
                            </div>
                            {index < arr.length - 1 && (
                              <div className="w-full h-0 border-t border-[#ACAAB4]" />
                            )}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : activeSegment === "time" ? (
                  /* Mobile Time Picker Contents */
                  <div className="flex-1 flex flex-col gap-6 overflow-y-auto font-roboto text-left pb-10">
                    {/* Month selection row */}
                    <div className="flex flex-row justify-between items-center w-full py-1 shrink-0">
                      <div className="flex items-center gap-1 cursor-pointer">
                        <span className="font-roboto font-medium text-sm text-[#111111]">{months[currentMonth]} {currentYear}</span>
                        <svg className="w-4 h-4 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      <div className="flex items-center gap-0">
                        <button
                          type="button"
                          onClick={handlePrevMonth}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100"
                        >
                          <svg className="w-5 h-5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <button
                          type="button"
                          onClick={handleNextMonth}
                          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-neutral-100"
                        >
                          <svg className="w-5 h-5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Weekday indicator */}
                    <div className="w-full py-2 border-b border-[#CAC4D0] shrink-0">
                      <h3 className="font-roboto font-normal text-2xl leading-8 text-[#111111] text-left">
                        {getFormattedHeaderDate(selectedDate)}
                      </h3>
                    </div>

                    {/* Weekdays Grid */}
                    <div className="grid grid-cols-7 w-full text-center shrink-0">
                      {["S", "M", "T", "W", "T", "F", "S"].map((d, index) => (
                        <span key={index} className="font-roboto font-normal text-sm text-[#111111] py-1">{d}</span>
                      ))}
                    </div>

                    {/* Days Grid */}
                    <div className="shrink-0">
                      {(() => {
                        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
                        const firstDay = getFirstDayOfMonth(currentYear, currentMonth);
                        const cells = [];
                        for (let i = 0; i < firstDay; i++) {
                          cells.push(<div key={`empty-${i}`} className="w-9 h-9" />);
                        }
                        for (let day = 1; day <= daysInMonth; day++) {
                          const dateObj = new Date(currentYear, currentMonth, day);
                          const isSelected = selectedDate &&
                            selectedDate.getDate() === day &&
                            selectedDate.getMonth() === currentMonth &&
                            selectedDate.getFullYear() === currentYear;

                          cells.push(
                            <div key={`day-${day}`} className="h-9 flex items-center justify-center">
                              <button
                                type="button"
                                onClick={() => {
                                  setSelectedDate(dateObj);
                                  updateSelectedTimeDisplay(dateObj, selectedTimeOption);
                                }}
                                className={`w-9 h-9 flex items-center justify-center rounded-full font-roboto text-sm transition-colors ${isSelected
                                    ? "bg-[#666666] text-white font-medium"
                                    : "text-[#111111] hover:bg-neutral-100"
                                  }`}
                              >
                                {day}
                              </button>
                            </div>
                          );
                        }
                        return <div className="grid grid-cols-7 w-full text-center gap-y-1">{cells}</div>;
                      })()}
                    </div>

                    {/* Time Selection */}
                    <div className="flex flex-col gap-4 border-t border-neutral-100 pt-4 shrink-0">
                      <span className="font-roboto font-bold text-sm text-[#111111]">Select time</span>
                      <div className="flex flex-row flex-wrap gap-2">
                        {[
                          { id: "Any time", label: "Any time", sub: "" },
                          { id: "Morning", label: "Morning", sub: "9am - 12pm" },
                          { id: "Afternoon", label: "Afternoon", sub: "12pm - 5pm" },
                          { id: "Evening", label: "Evening", sub: "5pm - 12am" }
                        ].map((opt) => {
                          const isActive = selectedTimeOption === opt.id;
                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                setSelectedTimeOption(opt.id as any);
                                updateSelectedTimeDisplay(selectedDate, opt.id as any);
                              }}
                              className={`flex flex-col items-center justify-center p-2 rounded-xl border transition-all ${isActive
                                  ? "border-[#3A506B] bg-white text-[#111111] font-bold shadow-sm"
                                  : "border-transparent text-[#4A607A] hover:bg-neutral-50"
                                }`}
                            >
                              <span className="text-xs font-semibold">{opt.label}</span>
                              {opt.sub && <span className="text-[10px] text-neutral-400">{opt.sub}</span>}
                            </button>
                          );
                        })}
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedTimeOption("Custom");
                            updateSelectedTimeDisplay(selectedDate, "Custom");
                          }}
                          className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all ${selectedTimeOption === "Custom"
                              ? "bg-[#666666] text-white"
                              : "bg-[#E8EAEF] text-[#111111] hover:bg-neutral-200"
                            }`}
                        >
                          Custom
                        </button>
                      </div>
                    </div>

                    {/* Custom Start/End options for mobile */}
                    {selectedTimeOption === "Custom" && (
                      <div className="flex flex-col gap-4 bg-neutral-50 p-4 rounded-xl border border-neutral-100 shrink-0">
                        <span className="font-roboto font-bold text-xs text-neutral-500 uppercase tracking-wider">Custom Time</span>
                        <div className="flex flex-col gap-4">
                          {/* Start Time */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-semibold text-neutral-400">START TIME</span>
                            <div className="flex items-center gap-3 px-3 py-2 border border-neutral-300 rounded-xl bg-white">
                              <HugeiconsIcon icon={Clock01Icon} className="text-neutral-500 w-4 h-4" />
                              <input
                                type="text"
                                value={customStartTime}
                                onChange={(e) => {
                                  setCustomStartTime(e.target.value);
                                  updateSelectedTimeDisplay(selectedDate, "Custom", e.target.value, customStartAmPm, customEndTime, customEndAmPm);
                                }}
                                className="w-14 text-xs text-[#1C1B1C] bg-transparent outline-none font-medium text-left"
                              />
                              <div className="flex bg-[#E8EAEF] rounded-full p-0.5 ml-auto">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCustomStartAmPm("AM");
                                    updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, "AM", customEndTime, customEndAmPm);
                                  }}
                                  className={`px-2 py-1 text-[10px] font-semibold rounded-full transition-all ${customStartAmPm === "AM" ? "bg-[#666666] text-white shadow-sm" : "text-[#4A607A]"
                                    }`}
                                >
                                  AM
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCustomStartAmPm("PM");
                                    updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, "PM", customEndTime, customEndAmPm);
                                  }}
                                  className={`px-2 py-1 text-[10px] font-semibold rounded-full transition-all ${customStartAmPm === "PM" ? "bg-[#666666] text-white shadow-sm" : "text-[#4A607A]"
                                    }`}
                                >
                                  PM
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* End Time */}
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-semibold text-neutral-400">END TIME</span>
                            <div className="flex items-center gap-3 px-3 py-2 border border-neutral-300 rounded-xl bg-white">
                              <HugeiconsIcon icon={Clock01Icon} className="text-neutral-500 w-4 h-4" />
                              <input
                                type="text"
                                value={customEndTime}
                                onChange={(e) => {
                                  setCustomEndTime(e.target.value);
                                  updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, e.target.value, customEndAmPm);
                                }}
                                className="w-14 text-xs text-[#1C1B1C] bg-transparent outline-none font-medium text-left"
                              />
                              <div className="flex bg-[#E8EAEF] rounded-full p-0.5 ml-auto">
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCustomEndAmPm("AM");
                                    updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, customEndTime, "AM");
                                  }}
                                  className={`px-2 py-1 text-[10px] font-semibold rounded-full transition-all ${customEndAmPm === "AM" ? "bg-[#666666] text-white shadow-sm" : "text-[#4A607A]"
                                    }`}
                                >
                                  AM
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setCustomEndAmPm("PM");
                                    updateSelectedTimeDisplay(selectedDate, "Custom", customStartTime, customStartAmPm, customEndTime, "PM");
                                  }}
                                  className={`px-2 py-1 text-[10px] font-semibold rounded-full transition-all ${customEndAmPm === "PM" ? "bg-[#666666] text-white shadow-sm" : "text-[#4A607A]"
                                    }`}
                                >
                                  PM
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Mobile Search Contents (Original) */
                  <>
                    {/* Mobile Search input wrapper */}
                    <div className="flex items-center gap-3 px-4 py-1 border border-neutral-300 rounded-xl mb-5 shrink-0 bg-white">
                      <HugeiconsIcon icon={Search01Icon} className="text-neutral-500 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="All treatments"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#757575] bg-transparent outline-none font-medium"
                        autoFocus
                      />
                    </div>

                    {/* Mobile Scrollable Suggestion List */}
                    <div className="flex-1 overflow-y-auto space-y-8 pb-10 search-dropdown-scrollbar text-left">
                      {/* Pills row */}
                      <div className="flex flex-row flex-wrap items-center gap-2 w-full pb-2 border-b border-neutral-100">
                        {[
                          { id: "All", label: "All" },
                          { id: "Nearby", label: "Nearby" },
                          { id: "Trending", label: "Trending" },
                          { id: "Recents", label: "Recents" },
                          { id: "Services", label: "Services" },
                          { id: "We come to you", label: "We come to you" }
                        ].map((pill) => {
                          const isActive = dropdownFilter === pill.id;
                          return (
                            <button
                              key={pill.id}
                              type="button"
                              onClick={() => setDropdownFilter(pill.id)}
                              className={`flex flex-row justify-center items-center py-1.5 px-6 gap-2.5 h-8 rounded-full font-poppins font-medium text-xs tracking-[0.7px] transition-all duration-200 cursor-pointer whitespace-nowrap shrink-0 ${isActive
                                  ? "bg-[#111111] text-white border-transparent"
                                  : "border border-[#111111] text-[#111111] hover:bg-neutral-50"
                                }`}
                            >
                              {pill.label}
                            </button>
                          );
                        })}
                      </div>

                      {/* Section: Trending searches */}
                      {(dropdownFilter === "All" || dropdownFilter === "Trending") && (
                        <div className="flex flex-col items-start p-0 gap-5 w-full">
                          <h3 className="font-poppins font-medium text-lg leading-[22px] tracking-[0.01em] text-[#111111]">
                            Trending searches
                          </h3>
                          <div className="flex flex-row flex-wrap items-start content-start p-0 gap-2 w-full">
                            {[
                              "Hair Salon",
                              "Physiotherapy",
                              "Massage",
                              "Car dealing",
                              "Photography",
                              "Tennis Lesson"
                            ].map((item) => (
                              <button
                                key={item}
                                type="button"
                                onClick={() => {
                                  setSearchQuery(item);
                                  setShowSearchDropdown(false);
                                  setActiveSegment(null);
                                }}
                                className="flex flex-row justify-center items-center py-1.5 px-6 gap-2.5 h-8 border border-[#111111] rounded-full text-[#111111] font-poppins font-medium text-xs tracking-[0.7px] whitespace-nowrap hover:bg-neutral-50 transition-colors cursor-pointer"
                              >
                                {item}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Section: Suggestions */}
                      {(dropdownFilter === "All" || dropdownFilter === "We come to you" || dropdownFilter === "Nearby") && (
                        <div className="flex flex-col items-start p-0 gap-5 w-full">
                          <div className="flex flex-col items-start p-0 gap-4 w-full">
                            {dropdownFilter !== "We come to you" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery("Hair & styling");
                                  setShowSearchDropdown(false);
                                  setActiveSegment(null);
                                }}
                                className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                              >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                  <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                                </div>
                                <div className="flex flex-col justify-center items-start p-0">
                                  <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                                    Hair & styling
                                  </span>
                                  <span className="font-poppins font-normal text-[10px] leading-[10px] tracking-[0.01em] text-[#757575]">
                                    Founding Partner
                                  </span>
                                </div>
                              </button>
                            )}

                            {dropdownFilter !== "We come to you" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery("Hair & styling");
                                  setShowSearchDropdown(false);
                                  setActiveSegment(null);
                                }}
                                className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                              >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                  <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                                </div>
                                <div className="flex flex-col justify-center items-start p-0">
                                  <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                                    Hair & styling
                                  </span>
                                </div>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery("Hair & styling");
                                setShowSearchDropdown(false);
                                setActiveSegment(null);
                              }}
                              className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                            >
                              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#111111" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                  <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10H8V6c0-1.1-.9-2-2-2H2v13h2" />
                                  <circle cx="7" cy="18" r="2" />
                                  <circle cx="17" cy="18" r="2" />
                                  <path d="M13 6h3l4 4v3h-7V6z" />
                                </svg>
                              </div>
                              <div className="flex flex-col justify-center items-start p-0">
                                <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                                  Hair & styling
                                </span>
                              </div>
                            </button>

                            {dropdownFilter !== "We come to you" && (
                              <button
                                type="button"
                                onClick={() => {
                                  setSearchQuery("Hair & styling");
                                  setShowSearchDropdown(false);
                                  setActiveSegment(null);
                                }}
                                className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                              >
                                <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                  <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                                </div>
                                <div className="flex flex-col justify-center items-start p-0">
                                  <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                                    Hair & styling
                                  </span>
                                </div>
                              </button>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Section: Recents */}
                      {(dropdownFilter === "All" || dropdownFilter === "Recents" || dropdownFilter === "Nearby") && (
                        <div className="flex flex-col items-start p-0 gap-5 w-full">
                          <h3 className="font-poppins font-medium text-lg leading-[22px] tracking-[0.01em] text-[#111111]">
                            Recents
                          </h3>
                          <div className="flex flex-col items-start p-0 gap-4 w-full">
                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery("Hair & styling");
                                setLocationQuery("Larnaca");
                                setSelectedTime("Any Time");
                                setShowSearchDropdown(false);
                                setActiveSegment(null);
                              }}
                              className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                            >
                              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                              </div>
                              <div className="flex flex-col items-start gap-1">
                                <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                                  Hair & styling
                                </span>
                                <div className="flex items-center gap-1 text-[#757575] text-xs">
                                  <span>Larnaca</span>
                                  <span className="w-1 h-1 rounded-full bg-[#757575]"></span>
                                  <span>Any time</span>
                                </div>
                              </div>
                            </button>

                            <div className="w-full h-0 border-t border-[#837C7C]/40"></div>

                            <button
                              type="button"
                              onClick={() => {
                                setSearchQuery("Hair & styling");
                                setLocationQuery("Larnaca");
                                setSelectedTime("Any Time");
                                setShowSearchDropdown(false);
                                setActiveSegment(null);
                              }}
                              className="flex flex-row items-center p-0 gap-6 w-full text-left hover:bg-neutral-50/50 p-2 rounded-lg transition-colors cursor-pointer"
                            >
                              <div className="w-6 h-6 flex items-center justify-center shrink-0">
                                <HugeiconsIcon icon={Search01Icon} className="text-[#111111] w-5 h-5" />
                              </div>
                              <div className="flex flex-col items-start gap-1">
                                <span className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                                  Hair & styling
                                </span>
                                <div className="flex items-center gap-1 text-[#757575] text-xs">
                                  <span>Larnaca</span>
                                  <span className="w-1 h-1 rounded-full bg-[#757575]"></span>
                                  <span>Any time</span>
                                </div>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Section: Services */}
                      {(dropdownFilter === "All" || dropdownFilter === "Services") && (
                        <div className="flex flex-col items-start p-0 gap-5 w-full">
                          <h3 className="font-poppins font-medium text-lg leading-[22px] tracking-[0.01em] text-[#111111]">
                            Services
                          </h3>
                          <div className="flex flex-col items-start p-0 gap-3 w-full">
                            <span className="font-poppins font-semibold text-sm leading-[22px] tracking-[0.01em] text-[#111111]">
                              Category
                            </span>
                            {["Sub Category 1", "Sub Category 1", "Sub Category 1", "Sub Category 1", "Sub Category 1Subxzzzzzzzza Category 1"].map((subCat, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  setSearchQuery(subCat);
                                  setShowSearchDropdown(false);
                                  setActiveSegment(null);
                                }}
                                className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111] hover:text-neutral-600 pl-4 text-left cursor-pointer"
                              >
                                {subCat}
                              </button>
                            ))}

                            <span className="font-poppins font-semibold text-sm leading-[22px] tracking-[0.01em] text-[#111111] mt-3">
                              Category
                            </span>
                            {["Sub Category 1x", "Sub Category 1"].map((subCat, index) => (
                              <button
                                key={index}
                                type="button"
                                onClick={() => {
                                  setSearchQuery(subCat);
                                  setShowSearchDropdown(false);
                                  setActiveSegment(null);
                                }}
                                className="font-poppins font-normal text-sm leading-[22px] tracking-[0.01em] text-[#111111] hover:text-neutral-600 pl-4 text-left cursor-pointer"
                              >
                                {subCat}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </section>

      {/* 5. Category Section */}
      <section className="w-full max-w-[1440px] mx-auto px-4 md:px-[64px] mt-16">
        <div className="grid grid-cols-2 sm:grid-cols-4 xl:grid-cols-8 gap-4 justify-items-center pb-4 w-full">

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

      {/* Book Again Section (Logged In Only) */}
      {isLoggedIn && (
        <section className="w-full px-4 md:px-8 xl:px-[68px] mt-[56px]">
          {/* Section Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">
              Book Again
            </h2>
            <a href="#" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
              See all
            </a>
          </div>

          {/* Card Grid / Carousel */}
          {bookAgainServices.length > 5 ? (
            <Carousel>
              {bookAgainServices.map((rec) => (
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
              {bookAgainServices.map((rec) => (
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
      )}

      {/* 6. Recommended Section */}
      <section className="w-full px-4 md:px-8 xl:px-[68px] mt-16 relative z-10">

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
      <section className="w-full mt-[166px] py-16 lg:py-0 lg:h-[484px] relative mb-24 flex items-center overflow-hidden lg:overflow-visible">

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
