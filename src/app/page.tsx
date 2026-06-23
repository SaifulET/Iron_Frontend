"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

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

  // Mock recommendations data
  const recommendations = [
    {
      id: 1,
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
    },
    {
      id: 3,
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
        <div className="w-full bg-[#96C3CD] text-[#111111] px-4 py-2.5 flex items-center justify-between transition-all duration-300 relative z-50 text-xs sm:text-sm font-medium">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg bg-white flex items-center justify-center shadow-sm overflow-hidden p-1">
              <img src="/img/smallBLogo.svg" alt="B" className="w-full h-full object-contain" />
            </div>
            <span>Book local services in Cyprus — instantly, any time</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <button 
              onClick={() => console.log("Add to Home Screen clicked")}
              className="bg-white hover:bg-neutral-100 text-[#1C1B1C] px-3 py-1.5 rounded-full text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Add to Home Screen</span>
              <img src="/Icons/appleSmall.svg" alt="Apple" className="w-3.5 h-3.5" />
              <img src="/Icons/android.svg" alt="Android" className="w-3.5 h-3.5" />
            </button>
            <button 
              onClick={() => setShowBanner(false)}
              className="text-[#1C1B1C] hover:opacity-75 transition-opacity cursor-pointer p-1"
              aria-label="Close Banner"
            >
              {/* Close Cross Icon */}
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 2. Navbar */}
      <header className="w-full max-w-[1310px] mx-auto px-4 sm:px-6 py-4">
        <div className="w-full bg-gradient-to-r from-[#E6F3F9] to-[rgba(255,255,255,0.5)] backdrop-blur-md rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-white/40 px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          
          {/* Left Side: Logo */}
          <div className="flex items-center gap-8">
            <div className="cursor-pointer" onClick={() => router.push("/")}>
              <img src="/img/logo.png" alt="Bookly" className="h-8 object-contain" />
            </div>
            
            {/* Nav links */}
            <nav className="hidden md:flex items-center gap-6">
              <a href="#" className="text-xs font-semibold tracking-wider text-[#757575] hover:text-[#1C1B1C] transition-colors uppercase">
                Explore
              </a>
              <a href="#" className="text-xs font-semibold tracking-wider text-[#757575] hover:text-[#1C1B1C] transition-colors uppercase">
                How it Works
              </a>
            </nav>
          </div>

          {/* Right Side Options */}
          <div className="flex items-center gap-3 sm:gap-4">
            
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
        </div>
      </header>

      {/* 3. Hero Section */}
      <section className="w-full max-w-[1030px] mx-auto px-4 text-center mt-12 md:mt-16 flex flex-col items-center">
        <h1 className="text-4xl md:text-[72px] font-medium leading-[1.1] md:leading-[72px] text-[#1C1B1C] tracking-tight max-w-[1030px] mb-6">
          Discover and book the <span className="text-[#3586B8] font-bold">best</span> local services in Cyprus
        </h1>
        <p className="text-base md:text-xl text-[#45474B] leading-relaxed max-w-[672px] mb-3">
          Find trusted professionals near you and secure your appointment instantly. No calls. No waiting.
        </p>
        <p className="text-xs md:text-sm text-[#666666] font-medium max-w-[587px] mb-8">
          First booking? Pay a small deposit to secure your slot. The rest you pay at the venue.
        </p>

        {/* 4. Hero Search Bar */}
        <div className="w-full max-w-[900px] bg-white rounded-2xl md:rounded-full shadow-[0_8px_30px_rgba(0,0,0,0.05)] border border-[#E8E6FF] p-2 md:p-3 flex flex-col md:flex-row items-center gap-2 md:gap-0 relative z-30">
          
          {/* Search Input */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 border-r-0 md:border-r border-[#EBEBEB]">
            <svg className="w-5 h-5 text-[#9E9E9E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="What are you looking for?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#9E9E9E] bg-transparent outline-none"
            />
          </div>

          {/* Location Selector */}
          <div className="flex-1 w-full flex items-center gap-3 px-4 border-r-0 md:border-r border-[#EBEBEB]">
            <svg className="w-5 h-5 text-[#9E9E9E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <input 
              type="text" 
              placeholder="Anywhere in Cyprus"
              value={locationQuery}
              onChange={(e) => setLocationQuery(e.target.value)}
              className="w-full h-10 text-sm text-[#1C1B1C] placeholder-[#9E9E9E] bg-transparent outline-none"
            />
          </div>

          {/* Time Selector */}
          <div className="relative flex-1 w-full flex items-center justify-between px-4">
            <button 
              type="button"
              onClick={() => setShowTimePicker(!showTimePicker)}
              className="w-full flex items-center gap-3 text-left py-2 text-sm text-[#757575] hover:text-[#1C1B1C] transition-colors cursor-pointer"
            >
              <svg className="w-5 h-5 text-[#9E9E9E] shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
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
                      className={`text-xs py-2 rounded-lg font-medium border text-center transition-all cursor-pointer ${
                        selectedTime === t 
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
      <section className="w-full max-w-[1312px] mx-auto px-4 mt-16">
        <div className="flex items-center gap-4 overflow-x-auto pb-4 scrollbar-hide">
          
          {/* ALL Category Card */}
          <button
            onClick={() => setSelectedCategory("all")}
            className={`flex flex-col items-center justify-center gap-2 min-w-[150px] flex-1 h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "all"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
                : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
            }`}
          >
            <svg className={`w-9 h-9 ${selectedCategory === "all" ? "text-white" : "text-[#817469]"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="text-xs font-semibold tracking-wider uppercase">All</span>
          </button>

          {/* BEAUTY & WELLNESS */}
          <button
            onClick={() => setSelectedCategory("wellness")}
            className={`flex flex-col items-center justify-center gap-3 min-w-[150px] flex-1 h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "wellness"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
                : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
            }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Beauty & Wellness</span>
          </button>

          {/* HEALTH & FITNESS */}
          <button
            onClick={() => setSelectedCategory("health")}
            className={`flex flex-col items-center justify-center gap-3 min-w-[150px] flex-1 h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "health"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
                : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
            }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Health Care</span>
          </button>

          {/* SPORTS & ACTIVITIES */}
          <button
            onClick={() => setSelectedCategory("sports")}
            className={`flex flex-col items-center justify-center gap-3 min-w-[150px] flex-1 h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "sports"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
                : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
            }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 22a10 10 0 100-20 10 10 0 000 20z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V2M12 22v-4M6 12H2M22 12h-4" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Sports & Activities</span>
          </button>

          {/* EXPERIENCE & TOURS */}
          <button
            onClick={() => setSelectedCategory("experience")}
            className={`flex flex-col items-center justify-center gap-3 min-w-[150px] flex-1 h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "experience"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
                : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
            }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 21a9 9 0 0118 0M12 3v15" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Experience & Tours</span>
          </button>

          {/* ENTERTAINMENT & EVENTS */}
          <button
            onClick={() => setSelectedCategory("entertainment")}
            className={`flex flex-col items-center justify-center gap-3 min-w-[150px] flex-1 h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "entertainment"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
                : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
            }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Entertainment & Events</span>
          </button>

          {/* PETS & HOME (FemiIcon / famicon) */}
          <button
            onClick={() => setSelectedCategory("pets")}
            className={`flex flex-col items-center justify-center gap-3 min-w-[120px] h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "pets"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
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
            className={`flex flex-col items-center justify-center gap-3 min-w-[120px] h-[108px] rounded-xl transition-all duration-200 cursor-pointer ${
              selectedCategory === "automotive"
                ? "bg-[#111111] text-[#FCFAF9] shadow-md scale-105"
                : "bg-white text-[#817469] border border-neutral-100 hover:shadow-sm"
            }`}
          >
            <div className="p-1 rounded bg-[#EDE3DE]">
              <svg className="w-6 h-6 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <span className="text-xs font-semibold tracking-wider uppercase text-center">Automotive</span>
          </button>

        </div>
      </section>

      {/* 6. Recommended Section */}
      <section className="w-full max-w-[1312px] mx-auto px-4 mt-16 mb-24">
        
        {/* Section Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl md:text-[28px] font-medium tracking-tight text-[#1C1B1C]">
            Recommended
          </h2>
          <a href="#" className="text-sm md:text-base font-medium text-[#1C1B1C] hover:underline transition-all">
            See all
          </a>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendations.map((rec, index) => (
            <div 
              key={index}
              className="bg-white border border-[#E8E6FF] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group"
            >
              {/* Card Image Area */}
              <div className="relative w-full h-[233px] bg-neutral-200 overflow-hidden">
                <img 
                  src={rec.image} 
                  alt={rec.title} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Favorite Heart Icon Overlay */}
                <button 
                  className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-[#E49D12] hover:bg-white active:scale-90 transition-all cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    console.log("Favorite clicked");
                  }}
                >
                  <svg className="w-5 h-5 text-red-500 fill-current" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </button>
              </div>

              {/* Card Details Area */}
              <div className="p-5 flex-1 flex flex-col gap-4">
                
                {/* Title & Star Rating */}
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-base font-semibold leading-tight text-[#1C1B1C] line-clamp-2">
                    {rec.title}
                  </h3>
                  <div className="flex items-center gap-1 shrink-0">
                    <svg className="w-4 h-4 text-[#E49D12] fill-current" viewBox="0 0 24 24">
                      <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                    </svg>
                    <span className="text-xs font-semibold text-[#1C1B1C]">{rec.rating}</span>
                    <span className="text-xs font-medium text-[#757575]">({rec.reviews})</span>
                  </div>
                </div>

                {/* Categories/Tags */}
                <div className="flex flex-wrap gap-2">
                  {rec.categories.map((cat, i) => (
                    <span 
                      key={i} 
                      className="text-[10px] font-semibold text-[#4E5F78] border border-[#4E5F78] px-2.5 py-0.5 rounded-full uppercase tracking-wider"
                    >
                      {cat}
                    </span>
                  ))}
                </div>

                {/* Location details */}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-1.5 text-xs text-[#757575] font-medium">
                    <svg className="w-3.5 h-3.5 text-[#666666]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{rec.location}</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mx-1"></span>
                    <span>{rec.distance}</span>
                  </div>
                  <span className="text-[11px] text-[#757575] font-medium pl-5">{rec.lastVisited}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-neutral-100 pt-4 mt-auto flex justify-between items-center gap-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-semibold text-[#757575] uppercase tracking-wider">Starting Price</span>
                    <span className="text-xl font-bold text-[#1C1B1C]">${rec.startingPrice}</span>
                  </div>
                  <button 
                    onClick={() => console.log("Booking item", rec.id)}
                    className="bg-[#131313] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
                  >
                    Book Now
                  </button>
                </div>

              </div>
            </div>
          ))}
        </div>

      </section>

    </div>
  );
}
