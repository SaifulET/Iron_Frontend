"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";
import { mockVenueDetails, ServiceItem } from "./mockVenue";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon, ArrowLeft02Icon, ArrowRight01Icon, ArrowRight02Icon, Clock04Icon, Location05Icon, SquareLock01Icon, InformationCircleIcon, Location01Icon } from "@hugeicons/core-free-icons";
import ServiceCard, { Recommendation } from "@/components/ServiceCard";
import Carousel from "@/components/Carousel";

export default function VenueDetailsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const venueId = searchParams.get("id") || "1";

  // Tab State
  const [activeTab, setActiveTab] = useState<"services" | "about" | "reviews" | "team" | "gallery">("services");
  const [selectedCategory, setSelectedCategory] = useState("Featured");

  // Dynamic user logged in state toggle (checkbox/button for demo representation)
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const heroImages = [
    "/image/imgOfService.png",
    "/img/authImg.png",
    "/img/authImg2.png",
    "/img/authImg3.png"
  ];

  // Service counters & book state
  const [service1Selected, setService1Selected] = useState(false);
  const [service2Selected, setService2Selected] = useState(false);
  const [service3Selected, setService3Selected] = useState(false);
  const [service4Selected, setService4Selected] = useState(false);
  const [service2Count, setService2Count] = useState(1);
  const [service3Count, setService3Count] = useState(2);
  const [service4Count, setService4Count] = useState(1);

  // Return dynamic price calculation
  const getServicePrice = (service: ServiceItem, count: number) => {
    if (service.type === "hours" && service.ratePerHour) {
      return count * service.ratePerHour;
    }
    if (service.type === "person" && service.ratePerPerson) {
      return count * service.ratePerPerson;
    }
    return service.price;
  };
  // Selected list details calculation
  const selectedList = [];
  if (service1Selected) {
    selectedList.push({
      id: 1,
      name: "Wedding Pic",
      duration: "1 hr 30 min",
      priceVal: 90,
      priceText: "€90",
      onRemove: () => setService1Selected(false)
    });
  }
  if (service2Selected) {
    selectedList.push({
      id: 2,
      name: "Wedding Pic (Hours)",
      duration: `${service2Count} ${service2Count === 1 ? "hour" : "hours"}`,
      priceVal: service2Count * 35,
      priceText: `€${service2Count * 35}`,
      onRemove: () => setService2Selected(false)
    });
  }
  if (service3Selected) {
    selectedList.push({
      id: 3,
      name: "Wedding Pic (Person)",
      duration: `1 hr 30 min • ${service3Count} ${service3Count === 1 ? "person" : "persons"}`,
      priceVal: service3Count * 30,
      priceText: `€${service3Count * 30}`,
      onRemove: () => setService3Selected(false)
    });
  }
  if (service4Selected) {
    selectedList.push({
      id: 4,
      name: "Wedding Pic (Hours 2)",
      duration: `${service4Count} ${service4Count === 1 ? "hour" : "hours"}`,
      priceVal: service4Count * 35,
      priceText: `€${service4Count * 35}`,
      onRemove: () => setService4Selected(false)
    });
  }

  const totalMinutes = (service1Selected ? 90 : 0) + (service2Selected ? service2Count * 60 : 0) + (service3Selected ? 90 : 0) + (service4Selected ? service4Count * 60 : 0);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalMinsRem = totalMinutes % 60;
  const totalDurationText = totalHours > 0 ? `${totalHours} hr ${totalMinsRem > 0 ? `${totalMinsRem} min` : ""}` : `${totalMinsRem} min`;
  const totalPrice = (service1Selected ? 90 : 0) + (service2Selected ? service2Count * 35 : 0) + (service3Selected ? service3Count * 30 : 0) + (service4Selected ? service4Count * 35 : 0);
  const totalPriceText = `€${totalPrice}`;

  return (
    <div className="min-h-screen bg-[#FCFAF9] flex flex-col relative overflow-x-hidden text-[#1C1B1C]">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-16  pb-24 flex flex-col gap-6 font-poppins">



        {/* Back Arrow button */}
        <button
          onClick={() => router.push("/")}
          className="self-start flex items-center justify-start w-8 h-8 rounded-full hover:bg-neutral-100 transition-colors cursor-pointer text-neutral-800"
          aria-label="Go back"
        >
          <HugeiconsIcon icon={ArrowLeft01Icon} size={20} />
        </button>

        {/* 1. Breadcrumbs section */}
        <div className="flex flex-wrap items-center gap-3 text-sm font-medium text-[#000000] -mt-2">
          <span>Home</span>
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-gray-400" />
          <span>Barbers</span>
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-gray-400" />
          <span>Dubai</span>
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-gray-400" />
          <span>Nad Al Sheba 1</span>
          <HugeiconsIcon icon={ArrowRight01Icon} size={14} className="text-gray-400" />
          <span className="font-semibold">{mockVenueDetails.name}</span>
        </div>

        {/* 2. Hero Image Banner Section */}
        <div className="w-full relative group">
          {/* Inner Image Container (rounded and overflow-hidden) */}
          <div className="w-full h-[320px] sm:h-[450px] relative rounded-2xl overflow-hidden shadow-md border border-neutral-100">
            <Image
              src={heroImages[currentHeroIndex]}
              alt={mockVenueDetails.name}
              fill
              className="object-cover transition-all duration-500 ease-in-out"
              priority
            />
            {/* See all images button */}
            <button className="absolute right-4 bottom-4 bg-[#FFFFFF] border border-[#D3D3D3] rounded-xl px-4 py-2 flex items-center justify-center gap-1.5 shadow-md hover:bg-neutral-50 transition-colors cursor-pointer z-10 text-[14.2px] font-medium font-inter text-[#0D0D0D]">
              <span>See all images</span>
            </button>
          </div>

          {/* Left Navigation Arrow (Outside) */}
          <button
            onClick={() => setCurrentHeroIndex((prev) => (prev === 0 ? heroImages.length - 1 : prev - 1))}
            className="absolute -left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer opacity-0 group-hover:opacity-100 z-20 text-neutral-800 border border-neutral-100"
            aria-label="Previous image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          {/* Right Navigation Arrow (Outside) */}
          <button
            onClick={() => setCurrentHeroIndex((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1))}
            className="absolute -right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer opacity-100 sm:opacity-0 group-hover:opacity-100 z-20 text-neutral-800 border border-neutral-100"
            aria-label="Next image"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* 3. Salon Header Info (Title, Rating, Category) */}
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 w-full mt-4">
          <div className="flex flex-col gap-3 max-w-[800px]">
            <h1 className="font-inter font-bold text-[36px] sm:text-[45px] leading-tight text-[#0D0D0D]">
              {mockVenueDetails.name}
            </h1>

            {/* Metadata row */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm sm:text-[15.9px] text-gray-500 font-inter">
              <div className="flex items-center gap-1.5 text-[#0D0D0D] font-semibold">
                <span>{mockVenueDetails.rating.toFixed(1)}</span>
                <img src="/Icons/rattingfull.svg" alt="star" className="w-4 h-4 object-contain" />
                <span className="font-normal text-[#757575]">({mockVenueDetails.reviewsCount} Reviews)</span>
              </div>
              <span className="text-[#0D0D0D] font-bold">•</span>
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={Location05Icon} />
                <span className="text-[#767676]">{mockVenueDetails.location}</span>
              </div>
              <span className="text-[#0D0D0D] font-bold">•</span>
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={Clock04Icon} />
                <span className="text-[#B7570B] font-medium">{mockVenueDetails.openStatus}</span>
              </div>
            </div>

            {/* Category tag */}
            <span className="self-start bg-[#D1D1D1] text-[#111111] rounded-xl px-4 py-1.5 text-sm font-semibold tracking-wide">
              {mockVenueDetails.category}
            </span>
          </div>

          {/* Share (Download) and Favorite buttons */}
          <div className="flex items-center gap-3 self-end sm:self-start">
            <button className="w-12 h-12 rounded-full bg-white border border-[#D3D3D3] flex items-center justify-center shadow-sm hover:bg-neutral-50 transition-colors cursor-pointer">
              <img src="/Icons/downloadIcon.svg" alt="Download/Share" className="w-5 h-5 object-contain" />
            </button>
            <button className="w-12 h-12 rounded-full bg-white border border-[#D3D3D3] flex items-center justify-center shadow-sm hover:bg-neutral-50 transition-colors cursor-pointer">
              <img src="/Icons/favouriteIcon.svg" alt="Favorite" className="w-5 h-5 object-contain" />
            </button>
          </div>
        </div>

        {/* 4. Content Area Layout */}
        <div className="w-full flex flex-col lg:flex-row gap-10 mt-6 relative items-start">

          {/* Left Column (Tabs and Details) */}
          <div className="flex-grow w-full lg:max-w-[868px] flex flex-col gap-8">

            {/* Tabs Navigation */}
            <div className="flex border-b border-[#ACAAB4] w-full">
              {(["services", "about", "reviews", "team", "gallery"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-3 px-6 text-[14.8px] font-inter font-semibold transition-all border-b-[4px] capitalize cursor-pointer ${activeTab === tab
                    ? "border-[#1C1B1C] text-[#0D0D0D] font-bold"
                    : "border-transparent text-[#757575] hover:text-black"
                    }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab content renderer */}
            <div className="w-full">
              {activeTab === "services" && (
                <div className="flex flex-col gap-6">

                  {/* Category Filter Badges */}
                  <div className="flex flex-wrap gap-2 mb-2">
                    {["Featured", "Packages", "Hair", "Beard", "Color", "Hair Treatment", "NAILS", "Facial", "Waxing & Trimming"].map((cat, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider uppercase border transition-all cursor-pointer ${selectedCategory === cat
                          ? "bg-black border-black text-white"
                          : "bg-white border-neutral-200 text-[#4E5F78] hover:bg-neutral-50"
                          }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Services List Card Stack */}
                  <div className="flex flex-col gap-4">

                    {/* Service 1: Wedding Pic (Selected state) */}
                    {(selectedCategory === "Featured" || selectedCategory === "Hair") && (
                      <div className={`w-full bg-white border rounded-xl p-5 flex justify-between items-center shadow-sm transition-all ${service1Selected ? "border-[#2BB54F]" : "border-[#E5E5E5]"}`}>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-inter font-medium text-lg text-[#0D0D0D]">Wedding Pic</h4>
                          <span className="text-sm text-[#767676]">1 hr 30 min</span>
                          <span className="font-semibold text-lg text-[#0D0D0D] mt-1">€90</span>
                        </div>
                        <button
                          onClick={() => setService1Selected(!service1Selected)}
                          className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${service1Selected
                              ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0 rounded-full"
                              : "bg-[#FCFAF9] border-[#B3B3B3] text-[#0D0D0D] hover:bg-neutral-50 px-5 py-2 shrink-0"
                            }`}
                        >
                          {service1Selected ? "✓" : "Book"}
                        </button>
                      </div>
                    )}

                    {/* Service 2: Wedding Pic (Counter variant) */}
                    {(selectedCategory === "Hair Treatment" || selectedCategory === "Hair") && (
                      <div className={`w-full bg-white border rounded-xl p-5 flex justify-between items-center shadow-sm transition-all ${service2Selected ? "border-[#2BB54F]" : "border-[#E5E5E5]"}`}>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-inter font-medium text-lg text-[#0D0D0D]">Wedding Pic</h4>
                          <span className="text-sm text-[#767676]">max 4 hours • €35 per hour</span>

                          {/* Hour Counter components */}
                          {!service2Selected && (
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-sm font-semibold text-[#0d0d0d] font-poppins">Hours</span>
                              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden h-[36px] bg-[#FCFAF9]">
                                <button
                                  onClick={() => setService2Count(prev => Math.max(prev - 1, 1))}
                                  className="px-3 hover:bg-neutral-100 font-bold border-r border-neutral-300 text-lg"
                                >
                                  -
                                </button>
                                <span className="px-4 font-semibold font-poppins text-sm text-[#111111]">{service2Count}</span>
                                <button
                                  onClick={() => setService2Count(prev => prev + 1)}
                                  className="px-3 hover:bg-neutral-100 font-bold border-l border-neutral-300 text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                          {service2Selected && (
                            <span className="font-semibold text-lg text-[#0D0D0D] mt-2">€{service2Count * 35}</span>
                          )}
                        </div>
                        <button
                          onClick={() => setService2Selected(!service2Selected)}
                          className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${service2Selected
                              ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0 rounded-full"
                              : "bg-[#FCFAF9] border-[#B3B3B3] text-[#0D0D0D] hover:bg-neutral-50 px-5 py-2 shrink-0"
                            }`}
                        >
                          {service2Selected ? "✓" : "Book"}
                        </button>
                      </div>
                    )}

                    {/* Service 3: Wedding Pic (Person counter variant) */}
                    {(selectedCategory === "Color" || selectedCategory === "NAILS") && (
                      <div className={`w-full bg-white border rounded-xl p-5 flex justify-between items-center shadow-sm transition-all ${service3Selected ? "border-[#2BB54F]" : "border-[#E5E5E5]"}`}>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-inter font-medium text-lg text-[#0D0D0D]">Wedding Pic</h4>
                          <span className="text-sm text-[#767676]">1 hr 30 min • €30 per person • min 2 person • max 4 person</span>

                          {/* Person Counter Component */}
                          {!service3Selected && (
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-sm font-semibold text-[#0d0d0d] font-poppins">Person</span>
                              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden h-[36px] bg-[#FCFAF9]">
                                <button
                                  onClick={() => setService3Count(prev => Math.max(prev - 1, 2))}
                                  className="px-3 hover:bg-neutral-100 font-bold border-r border-neutral-300 text-lg"
                                >
                                  -
                                </button>
                                <span className="px-4 font-semibold font-poppins text-sm text-[#111111]">{service3Count}</span>
                                <button
                                  onClick={() => setService3Count(prev => Math.min(prev + 1, 4))}
                                  className="px-3 hover:bg-neutral-100 font-bold border-l border-neutral-300 text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                          {service3Selected && (
                            <span className="font-semibold text-lg text-[#0D0D0D] mt-2">€{service3Count * 30}</span>
                          )}
                        </div>
                        <button
                          onClick={() => setService3Selected(!service3Selected)}
                          className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${service3Selected
                              ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0 rounded-full"
                              : "bg-[#FCFAF9] border-[#B3B3B3] text-[#0D0D0D] hover:bg-neutral-50 px-5 py-2 shrink-0"
                            }`}
                        >
                          {service3Selected ? "✓" : "Book"}
                        </button>
                      </div>
                    )}

                    {/* Service 4: Wedding Pic */}
                    {(selectedCategory === "Facial" || selectedCategory === "Waxing & Trimming" || selectedCategory === "Beard") && (
                      <div className={`w-full bg-white border rounded-xl p-5 flex justify-between items-center shadow-sm transition-all ${service4Selected ? "border-[#2BB54F]" : "border-[#E5E5E5]"}`}>
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-inter font-medium text-lg text-[#0D0D0D]">Wedding Pic</h4>
                          <span className="text-sm text-[#767676]">max 4 hours • €35 per hour</span>

                          {!service4Selected && (
                            <div className="flex items-center gap-3 mt-2">
                              <span className="text-sm font-semibold text-[#0d0d0d] font-poppins">Hours</span>
                              <div className="flex items-center border border-neutral-300 rounded-lg overflow-hidden h-[36px] bg-[#FCFAF9]">
                                <button
                                  onClick={() => setService4Count(prev => Math.max(prev - 1, 1))}
                                  className="px-3 hover:bg-neutral-100 font-bold border-r border-neutral-300 text-lg"
                                >
                                  -
                                </button>
                                <span className="px-4 font-semibold font-poppins text-sm text-[#111111]">{service4Count}</span>
                                <button
                                  onClick={() => setService4Count(prev => prev + 1)}
                                  className="px-3 hover:bg-neutral-100 font-bold border-l border-neutral-300 text-lg"
                                >
                                  +
                                </button>
                              </div>
                            </div>
                          )}
                          {service4Selected && (
                            <span className="font-semibold text-lg text-[#0D0D0D] mt-2">€{service4Count * 35}</span>
                          )}
                        </div>
                        <button
                          onClick={() => setService4Selected(!service4Selected)}
                          className={`text-sm font-semibold rounded-full border transition-all cursor-pointer shadow-sm ${service4Selected
                              ? "bg-[#2BB54F] border-[#2BB54F] text-white w-8 h-8 flex items-center justify-center p-0 rounded-full"
                              : "bg-[#FCFAF9] border-[#B3B3B3] text-[#0D0D0D] hover:bg-neutral-50 px-5 py-2 shrink-0"
                            }`}
                        >
                          {service4Selected ? "✓" : "Book"}
                        </button>
                      </div>
                    )}

                    {/* Service 5: Wedding Pic, Video graphy */}
                    {(selectedCategory === "Featured" || selectedCategory === "Packages") && (
                      <div className="w-full bg-white border border-[#E5E5E5] rounded-xl p-5 flex justify-between items-center shadow-sm">
                        <div className="flex flex-col gap-1.5">
                          <h4 className="font-inter font-medium text-lg text-[#0D0D0D]">Wedding Pic, Video graphy</h4>
                          <span className="text-sm text-[#767676]">2 hr 30 min</span>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-lg text-[#0D0D0D]">€390</span>
                            <span className="line-through text-sm text-gray-400">€490</span>
                          </div>
                          {mockVenueDetails.services[4].description && (
                            <p className="text-xs text-gray-500 font-medium mt-1">
                              {mockVenueDetails.services[4].description}
                            </p>
                          )}
                        </div>
                        <button className="bg-[#FCFAF9] border border-[#B3B3B3] rounded-full px-5 py-2 text-sm font-semibold text-[#0D0D0D] hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer">
                          Book
                        </button>
                      </div>
                    )}

                    {/* See all button */}
                    <button className="self-start bg-[#FFFFFF] border border-[#C6C6CB] rounded-full px-6 py-2.5 text-sm font-semibold hover:bg-neutral-50 transition-colors cursor-pointer">
                      See all
                    </button>

                  </div>

                </div>
              )}

              {activeTab === "about" && (
                <div className="flex flex-col gap-8 font-poppins">
                  <div className="flex flex-col gap-4">
                    <h3 className="font-bold text-2xl text-[#0D0D0D]">About</h3>
                    <p className="text-[#4E5F78] leading-relaxed">
                      {mockVenueDetails.aboutText}
                    </p>
                  </div>

                  {/* Static Google Maps mockup */}
                  {/* Static Google Maps mockup */}
                  <div className="w-full h-[320px] bg-[#EAE8E4] rounded-xl relative overflow-hidden shadow-inner border border-neutral-200">
                    <iframe
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      style={{ border: 0 }}
                      src="https://maps.google.com/maps?q=Sobha%20Hartland%20Dubai&t=&z=14&ie=UTF8&iwloc=&output=embed"
                      allowFullScreen
                    />
                    {/* Center Pin overlay */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10 pointer-events-none">
                      <div className="bg-[#1C1B1C] text-white px-3 py-1.5 rounded-lg text-xs font-semibold font-poppins shadow-md whitespace-nowrap">
                        {mockVenueDetails.name} <span className="text-[#FFC00A] ml-1">5.0</span>
                      </div>
                      {/* Down arrow caret */}
                      <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-[#1C1B1C]" />
                    </div>

                    <div className="absolute left-4 bottom-4 bg-[#FFFFFF] border border-[#ACAAB4] rounded-lg p-3 shadow-md">
                      <span className="font-bold text-sm block">{mockVenueDetails.name}</span>
                      <span className="text-xs text-yellow-600 block">★★★★★ 5.0 rating</span>
                    </div>
                  </div>

                  {/* Opening hours & Additional Info grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Opening Times */}
                    <div className="flex flex-col gap-4">
                      <h4 className="font-bold text-lg text-[#0D0D0D]">Opening times</h4>
                      <div className="flex flex-col gap-2.5 text-sm text-[#4E5F78]">
                        {[
                          { day: "Monday", time: "10:30 AM - 1:00 PM, 3:30 PM - 7:00 PM" },
                          { day: "Tuesday", time: "10:30 AM - 1:00 PM, 3:30 PM - 7:00 PM" },
                          { day: "Wednesday", time: "10:30 AM - 1:00 PM, 3:30 PM - 7:00 PM" },
                          { day: "Thursday", time: "10:30 AM - 1:00 PM, 3:30 PM - 7:00 PM" },
                          { day: "Friday", time: "10:30 AM - 1:00 PM, 3:30 PM - 7:00 PM" },
                          { day: "Saturday", time: "10:30 AM - 1:00 PM, 3:30 PM - 7:00 PM" },
                          { day: "Sunday", time: "Closed" }
                        ].map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center py-1 border-b border-neutral-100">
                            <span className="font-semibold text-black">{item.day}</span>
                            <span>{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="flex flex-col gap-4">
                      <h4 className="font-bold text-lg text-[#0D0D0D]">Additional information</h4>
                      <ul className="flex flex-col gap-4 text-sm text-[#4E5F78]">
                        <li className="flex items-start gap-2.5">
                          <span className="text-[#2BB54F] font-bold">✓</span>
                          <span>Instant Confirmation</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="shrink-0 text-neutral-500 mt-0.5">
                            <HugeiconsIcon icon={InformationCircleIcon} size={18} />
                          </span>
                          <span>First visit? A small deposit of 20% secures your booking — deducted from your total at the venue.</span>
                        </li>
                        <li className="flex items-start gap-2.5">
                          <span className="shrink-0 text-neutral-500 mt-0.5">
                            <HugeiconsIcon icon={InformationCircleIcon} size={18} />
                          </span>
                          <span>Returning customer? No deposit needed. Just show up and pay at the venue as normal.</span>
                        </li>
                      </ul>
                    </div>

                  </div>

                </div>
              )}

              {activeTab === "reviews" && (
                <div className="flex flex-col pt-6 w-[862px] font-inter">

                  {/* Reviews Title Row */}
                  <div className="flex justify-between items-baseline w-[862px] h-[36px] mb-3">
                    <h3 className="w-[697px] font-semibold text-[25.2px] leading-[36px] text-[#0D0D0D]">
                      Reviews
                    </h3>

                    {/* Sort Selector */}
                    <div className="flex items-center gap-2 w-[165px] h-[28px]">
                      <div className="flex items-center justify-center px-2 py-0.5 w-[65px] h-6 rounded-full">
                        <span className="font-poppins text-sm text-[#4E5F78]">Sort by</span>
                      </div>
                      <div className="flex items-center justify-center gap-1 px-2 py-0.5 w-[92px] h-7 border border-[#111111] rounded-full bg-white cursor-pointer hover:bg-neutral-50 transition-colors">
                        <span className="font-poppins text-sm text-[#111111]">Latest</span>
                        <svg className="w-4 h-4 text-[#141B34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Rating breakdown details stars row */}
                  <div className="flex items-end gap-5 w-[284px] h-[27px] mb-6">
                    <div className="flex items-center gap-3 w-[188px] h-[27px]">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <img key={s} src="/Icons/rattingfull.svg" alt="star" className="w-[28px] h-[27px] object-contain" />
                      ))}
                    </div>
                    <div className="flex items-start gap-1 w-[76px] h-6 font-semibold">
                      <span className="font-inter text-[17px] leading-6 text-[#0D0D0D]">5.0</span>
                      <span className="font-inter text-[17px] leading-6 text-[#6950F3]">(809)</span>
                    </div>
                  </div>

                  {/* Reviews stack */}
                  <div className="flex flex-col py-3 gap-6 w-[862px]">
                    {mockVenueDetails.reviews.map((review) => (
                      <div key={review.id} className="flex flex-col items-start py-5 gap-2 w-[862px] border-b border-neutral-100">

                        {/* Author info row */}
                        <div className="flex items-center gap-2 w-[236.65px] h-16">

                          {/* Avatar Circle Container */}
                          <div className="box-border flex flex-col justify-center items-start p-[0.0667px] w-16 h-16 bg-[#F0F0FF] border border-[#F0F0FF] rounded-full overflow-hidden shrink-0">
                            <div className="w-[61.87px] h-[61.87px] rounded-full overflow-hidden relative">
                              <Image src={review.avatar} alt={review.author} fill className="object-cover" />
                            </div>
                          </div>

                          {/* Author Name and Date details */}
                          <div className="flex flex-col justify-center items-start gap-2 w-[164.65px] h-16">
                            <div className="w-[164.65px] h-10 relative">
                              <span className="absolute left-0 top-0 font-inter font-medium text-[16.5px] leading-6 text-[#0D0D0D] block">
                                {review.author}
                              </span>
                              <span className="absolute left-0 top-6 font-inter font-normal text-xs leading-4 text-[#767676] block whitespace-nowrap">
                                {review.date}
                              </span>
                            </div>

                            {/* Stars row */}
                            <div className="flex items-start gap-1 w-[108px] h-4">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <img key={s} src="/Icons/rattingfull.svg" alt="star" className="w-4 h-4 object-contain" />
                              ))}
                            </div>
                          </div>

                        </div>

                        {/* Review text comment */}
                        <div className="flex flex-col items-start w-[862px] h-[24px] mt-1.5">
                          <p className="w-[862px] h-[24px] font-inter font-normal text-[16.3px] leading-6 text-[#0D0D0D] truncate">
                            {review.comment} <span className="font-semibold text-black cursor-pointer hover:underline">Read more</span>
                          </p>
                        </div>

                      </div>
                    ))}
                  </div>

                  {/* See all button */}
                  <div className="flex flex-col items-start w-[862px] h-12 mt-6">
                    <button className="box-border flex items-center justify-center px-5 py-2.5 w-[89.8px] h-12 bg-white border border-[#D3D3D3] rounded-full hover:bg-neutral-50 transition-colors shadow-sm cursor-pointer">
                      <span className="font-inter font-semibold text-[16.3px] text-[#0D0D0D] whitespace-nowrap">
                        See all
                      </span>
                    </button>
                  </div>

                </div>
              )}

              {activeTab === "team" && (
                <div className="flex flex-col gap-6 w-[862px] font-inter">
                  <h3 className="w-[862px] font-semibold text-[25.8px] leading-[36px] text-[#0D0D0D]">
                    Team
                  </h3>

                  {/* Employees scroll/flex list wrapper */}
                  <div className="flex flex-wrap items-start gap-8 w-[862px] h-[404px] overflow-y-auto">
                    {mockVenueDetails.team.map((member) => (
                      <div
                        key={member.id}
                        className="flex flex-col items-center gap-4 w-[120px] h-[182px] relative cursor-pointer"
                      >
                        {/* Avatar Image circle with background border */}
                        <div className="relative w-[120px] h-[120px] shrink-0">
                          <div className="box-border flex flex-col justify-center items-start p-[0.0667px] w-[120px] h-[120px] bg-[#F0F0FF] border border-[#F0F0FF] rounded-full overflow-hidden">
                            <div className="w-[117.87px] h-[117.87px] rounded-full overflow-hidden relative">
                              <Image src={member.avatar} alt={member.name} fill className="object-cover" />
                            </div>
                          </div>

                          {/* Rating Badge Overlay absolute positioned bottom-center */}
                          <div className="box-border flex items-center justify-center gap-1 absolute left-1/2 -translate-x-1/2 -bottom-2 w-[62.13px] h-[30.13px] bg-white border border-[#DBDDFF] rounded-full shadow-sm">
                            <img src="/Icons/rattingfull.svg" alt="star" className="w-4 h-4 object-contain" />
                            <span className="font-inter font-semibold text-[15px] leading-5 text-[#0D0D0D]">5.0</span>
                          </div>
                        </div>

                        {/* Name and Description (Role) details */}
                        <div className="flex flex-col items-center gap-0.5 w-[120px] h-[46px] text-center mt-1">
                          <span className="font-inter font-medium text-[17px] leading-6 text-[#0D0D0D]">
                            {member.name}
                          </span>
                          <span className="font-inter font-normal text-[14.4px] leading-5 text-[#767676]">
                            {member.role}
                          </span>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              )}

              {activeTab === "gallery" && (
                <div className="flex flex-col gap-6 w-[862px] font-inter">

                  {/* Gallery Title Row */}
                  <div className="flex justify-between items-baseline w-[862px] h-[40px] mb-2">
                    <h3 className="w-[816px] font-semibold text-[25.8px] leading-[36px] text-[#0D0D0D]">
                      Photos
                    </h3>
                    <button className="w-[46px] h-[36px] font-poppins text-sm leading-[36px] text-[#0D0D0D] hover:underline cursor-pointer">
                      See all
                    </button>
                  </div>

                  {/* Two rows of photo cards */}
                  <div className="flex flex-col gap-5 w-[862px]">

                    {/* Row 1 */}
                    <div className="flex flex-row items-center gap-5 w-[862px] h-[274px]">
                      <div className="w-[274px] h-[274px] bg-[#D9D9D9] rounded-xl flex-grow overflow-hidden relative">
                        <Image src="/image/imgOfService.png" alt="Gallery 1" fill className="object-cover opacity-60 mix-blend-multiply" />
                      </div>
                      <div className="w-[274px] h-[274px] bg-[#D9D9D9] rounded-xl flex-grow overflow-hidden relative">
                        <Image src="/image/imgOfService.png" alt="Gallery 2" fill className="object-cover opacity-60 mix-blend-multiply" />
                      </div>
                      <div className="w-[274px] h-[274px] bg-[#D9D9D9] rounded-xl flex-grow overflow-hidden relative">
                        <Image src="/image/imgOfService.png" alt="Gallery 3" fill className="object-cover opacity-60 mix-blend-multiply" />
                      </div>
                    </div>

                    {/* Row 2 */}
                    <div className="flex flex-row items-center gap-5 w-[862px] h-[274px]">
                      <div className="w-[274px] h-[274px] bg-[#D9D9D9] rounded-xl flex-grow overflow-hidden relative">
                        <Image src="/image/imgOfService.png" alt="Gallery 4" fill className="object-cover opacity-60 mix-blend-multiply" />
                      </div>
                      <div className="w-[274px] h-[274px] bg-[#D9D9D9] rounded-xl flex-grow overflow-hidden relative">
                        <Image src="/image/imgOfService.png" alt="Gallery 5" fill className="object-cover opacity-60 mix-blend-multiply" />
                      </div>
                      <div className="w-[274px] h-[274px] bg-[#D9D9D9] rounded-xl flex-grow overflow-hidden relative">
                        <Image src="/image/imgOfService.png" alt="Gallery 6" fill className="object-cover opacity-60 mix-blend-multiply" />
                      </div>
                    </div>

                  </div>



                </div>
              )}
            </div>

          </div>

          {/* Right Column: Sticky Venue Summary Card */}
          <aside className="w-[422px] bg-[#FFFFFF] shadow-[0px_-1px_4px_rgba(0,0,0,0.25),0px_4px_12px_rgba(0,0,0,0.2)] rounded-[12px] p-12 flex flex-col gap-10 lg:sticky lg:top-24 select-none">

            {isLoggedIn && selectedList.length > 0 ? (
              /* checkout / book a visit state */
              <div className="flex flex-col gap-6 w-full font-inter">

                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <h2 className="font-semibold text-2xl text-[#0D0D0D]">Book a visit</h2>
                  <span className="text-[11px] font-bold text-[#757575] uppercase tracking-wider">YOUR SERVICES</span>
                </div>

                {/* Selected Services Items List */}
                <div className="flex flex-col gap-4">
                  {selectedList.map((item) => (
                    <div key={item.id} className="flex justify-between items-center py-2 border-b border-neutral-100">
                      <div className="flex flex-col gap-1 min-w-0">
                        <span className="font-semibold text-sm text-[#0D0D0D] truncate">{item.name}</span>
                        <span className="text-xs text-[#757575]">{item.duration}</span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="font-semibold text-sm text-[#0D0D0D]">{item.priceText}</span>
                        <button
                          onClick={() => item.onRemove()}
                          className="text-neutral-400 hover:text-neutral-600 p-1 cursor-pointer font-bold text-xs"
                          aria-label="Remove service"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  {/* Divider and Total */}
                  <div className="border-t border-neutral-100 pt-4 flex justify-between items-center">
                    <span className="font-semibold text-sm text-[#757575]">Total ({totalDurationText})</span>
                    <div className="flex items-center gap-3">
                      <span className="font-bold text-sm text-[#0D0D0D]">{totalPriceText}</span>
                      <span className="w-5" /> {/* spacing to match close button */}
                    </div>
                  </div>
                </div>

                {/* Continue Button */}
                <button
                  onClick={() => router.push(`/customer/bookings`)}
                  className="w-full h-12 bg-[#8EBAC5] text-white font-poppins font-semibold text-base rounded-[12px] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-sm mt-2"
                >
                  <span>Continue →</span>
                </button>

                {/* Business Details (re-rendered inside checkout layout at the bottom) */}
                <div className="border-t border-neutral-100 pt-6 flex flex-col gap-5 w-full mt-4">

                  {/* Clock status */}
                  <div className="flex items-center gap-3 w-full h-[24px]">
                    <div className="w-6 h-6 relative shrink-0">
                      <HugeiconsIcon icon={Clock04Icon} className="w-6 h-6 object-contain filter opacity-60" />
                    </div>
                    <span className="font-inter font-normal text-[15.9px] text-[#B7570B] whitespace-nowrap">
                      {mockVenueDetails.openStatus}
                    </span>
                  </div>

                  {/* Address and Get Directions */}
                  <div className="flex items-center gap-2 w-full">
                    <div className="w-6 h-6 relative shrink-0">
                      <HugeiconsIcon icon={Location05Icon} className="w-6 h-6 object-contain filter opacity-60" />
                    </div>
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="font-inter font-normal text-[15.8px] text-[#767676] truncate shrink">
                        {mockVenueDetails.location}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-[#808080] shrink-0" />
                      <a href="#" className="font-inter font-normal text-[15.8px] text-[#2366C5] hover:underline whitespace-nowrap shrink-0">
                        Get Directions
                      </a>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3 w-full h-[24px]">
                    <div className="w-6 h-6 relative shrink-0">
                      <img src="/Icons/phone.svg" alt="Phone" className="w-6 h-6 object-contain filter opacity-60" />
                    </div>
                    <span className="font-inter font-normal text-[15.9px] text-[#767676]">
                      {mockVenueDetails.phone}
                    </span>
                  </div>

                  {/* Social links */}
                  <div className="flex flex-col gap-5 pt-2">
                    <a href={mockVenueDetails.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        <img src="/Icons/FacebookGray.svg" alt="Facebook" className="w-4 h-4 object-contain" />
                      </div>
                      <span className="font-poppins font-normal text-base text-[#767676]">Facebook</span>
                    </a>

                    <a href={mockVenueDetails.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                        <img src="/Icons/instagram.svg" alt="Instagram" className="w-4 h-4 object-contain" />
                      </div>
                      <span className="font-poppins font-normal text-base text-[#767676]">Instagram</span>
                    </a>
                  </div>

                </div>

              </div>
            ) : (
              /* Default layout when no services are selected / logged out */
              <>
                {/* Salon Details Block */}
                <div className="flex flex-col gap-5 w-[316.89px]">
                  <h2 className="font-inter font-semibold text-[37.2px] leading-[44px] text-[#0D0D0D]">
                    {mockVenueDetails.name}
                  </h2>

                  {/* Stars and rating block */}
                  <div className="flex items-center gap-2 w-[253px] h-8">
                    <span className="font-inter font-semibold text-2xl leading-8 text-[#0D0D0D]">5.0</span>
                    <div className="flex items-center gap-1 w-[136px] h-6 justify-center">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <img key={s} src="/Icons/rattingfull.svg" alt="star" className="w-6 h-6 object-contain" />
                      ))}
                    </div>
                    <span className="font-inter font-medium text-[23.8px] leading-8 text-[#4E5F78]">(809)</span>
                  </div>
                </div>

                {/* Dynamic UI based on Authentication (isLoggedIn state) */}
                {isLoggedIn ? (
                  /* SS 1: User Logged In Card State */
                  <>
                    <button
                      onClick={() => router.push(`/customer/bookings`)}
                      className="w-full h-12 bg-[#8EBAC5] border border-[#D5D7DA] text-white font-poppins font-medium text-base rounded-[12px] hover:opacity-90 transition-opacity cursor-pointer flex items-center justify-center shadow-sm"
                    >
                      <span className="w-[78px] h-[24px] flex items-center justify-center">Book now</span>
                    </button>

                    {/* Info block */}
                    <div className="flex flex-col gap-5 w-[338px]">

                      {/* Clock status */}
                      <div className="flex items-center gap-3 w-full h-[24px]">
                        <div className="w-6 h-6 relative shrink-0">
                          <HugeiconsIcon icon={Clock04Icon} className="w-6 h-6 object-contain filter opacity-60" />
                        </div>
                        <span className="font-inter font-normal text-[15.9px] text-[#B7570B] whitespace-nowrap">
                          {mockVenueDetails.openStatus}
                        </span>
                      </div>

                      {/* Address and Get Directions */}
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-6 h-6 relative shrink-0">
                          <HugeiconsIcon icon={Location05Icon} className="w-6 h-6 object-contain filter opacity-60" />
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-inter font-normal text-[15.8px] text-[#767676] truncate shrink">
                            {mockVenueDetails.location}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#808080] shrink-0" />
                          <a href="#" className="font-inter font-normal text-[15.8px] text-[#2366C5] hover:underline whitespace-nowrap shrink-0">
                            Get Directions
                          </a>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="flex items-center gap-3 w-full h-[24px]">
                        <div className="w-6 h-6 relative shrink-0">
                          <img src="/Icons/phone.svg" alt="Phone" className="w-6 h-6 object-contain" />
                        </div>
                        <span className="font-inter font-normal text-[15.9px] text-[#767676]">
                          {mockVenueDetails.phone}
                        </span>
                      </div>

                      {/* Returning Customer / No Deposit indicator */}
                      <div className="flex items-center gap-2 text-sm font-semibold text-[#1C1B1C]">
                        <span className="text-[#2BB54F] font-bold"></span>
                        <span>Returning customer – No deposit required</span>
                      </div>

                      {/* Social links */}
                      <div className="flex flex-col gap-5 pt-2">
                        <a href={mockVenueDetails.facebookUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                            <img src="/Icons/FacebookGray.svg" alt="Facebook" className="w-4 h-4 object-contain" />
                          </div>
                          <span className="font-poppins font-normal text-base text-[#767676]">Facebook</span>
                        </a>

                        <a href={mockVenueDetails.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:opacity-85 transition-opacity">
                          <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0">
                            <img src="/Icons/instagram.svg" alt="Instagram" className="w-4 h-4 object-contain" />
                          </div>
                          <span className="font-poppins font-normal text-base text-[#767676]">Instagram</span>
                        </a>
                      </div>

                    </div>
                  </>
                ) : (
                  /* SS 2: User Not Logged In Card State (With blurred footer & Lock icon overlay) */
                  <>
                    <button
                      onClick={() => router.push(`/customer/bookings`)}
                      className="w-full h-12 bg-[#0D0D0D] border border-[#0D0D0D] text-white font-poppins font-medium text-base rounded-[12px] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                    >
                      <img src="/image/smallBlacklogo.svg" alt="Bookly" className="w-5 h-5 object-contain invert brightness-0" />
                      <span className="w-[78px] h-[24px] flex items-center justify-center">Book now</span>
                    </button>

                    {/* Clock & Address shown unblurred */}
                    <div className="flex flex-col gap-5 w-[338px]">

                      {/* Clock status */}
                      <div className="flex items-center gap-3 w-full h-[24px]">
                        <div className="w-6 h-6 relative shrink-0">
                          <svg className="w-full h-full text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                            <circle cx="12" cy="12" r="10" />
                            <polyline points="12 6 12 12 16 14" />
                          </svg>
                        </div>
                        <span className="font-inter font-normal text-[15.9px] text-[#B7570B] whitespace-nowrap">
                          {mockVenueDetails.openStatus}
                        </span>
                      </div>

                      {/* Address and Get Directions */}
                      <div className="flex items-center gap-2 w-full">
                        <div className="w-6 h-6 relative shrink-0">
                          <img src="/Icons/phone.svg" className="w-6 h-6 object-contain filter opacity-60" alt="Phone" />
                        </div>
                        <div className="flex items-center gap-1.5 min-w-0">
                          <span className="font-inter font-normal text-[15.8px] text-[#767676] truncate shrink">
                            {mockVenueDetails.location}
                          </span>
                          <span className="w-1.5 h-1.5 rounded-full bg-[#808080] shrink-0" />
                          <a href="#" className="font-inter font-normal text-[15.8px] text-[#2366C5] hover:underline whitespace-nowrap shrink-0">
                            Get Directions
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Blurred details and Lock overlay section */}
                    <div className="relative w-[338px] h-[200px] mt-2 border border-neutral-100 rounded-xl bg-white overflow-hidden">

                      {/* Blurred elements under the lock */}
                      <div className="flex flex-col gap-5 w-full p-4 filter blur-[5px] select-none pointer-events-none opacity-50">
                        <div className="flex items-center ">
                          <img src="/Icons/phone.svg" alt="Phone" className="w-5 h-5 object-contain" />
                          <span>{mockVenueDetails.phone}</span>
                        </div>
                        <div className="flex items-center ">
                          <img src="/Icons/FacebookGray.svg" alt="Facebook" className="w-5 h-5 object-contain" />
                          <span>Facebook</span>
                        </div>
                        <div className="flex items-center ">
                          <img src="/Icons/instagram.svg" alt="Instagram" className="w-5 h-5 object-contain" />
                          <span>Instagram</span>
                        </div>
                      </div>

                      {/* Center lock and message overlay */}
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center gap-3 bg-white/70">
                        <div className="w-12 h-12 rounded-full border border-neutral-200 bg-white flex items-center justify-center shadow-md">
                          <HugeiconsIcon icon={SquareLock01Icon} />
                        </div>
                        <p className="text-sm text-[#0D0D0D] font-inter font-medium leading-snug max-w-[200px]">
                          Log in or create an account to contact this business
                        </p>
                      </div>

                    </div>
                  </>
                )}
              </>
            )}

          </aside>

        </div>

        {/* Full-width sections for Other locations and Services nearby */}
        {(() => {
          const mockLocations: Recommendation[] = [
            {
              id: 2001,
              title: "Soho Vintage Barbers | Sheikh Zayed Road",
              rating: 4.9,
              reviews: 120,
              categories: ["Barber", "Salon"],
              travelsToYou: true,
              travelLocations: ["Larnaca"],
              lastVisited: "Last visited 1 week ago",
              startingPrice: 15,
              image: "/image/imgOfService.png",
              hasDiamond: true
            },
            {
              id: 2002,
              title: "Zara Hair & Beauty | Limassol Marina",
              rating: 4.8,
              reviews: 85,
              categories: ["Hair", "Salon"],
              location: "Limassol Marina",
              distance: "2.5km away",
              lastVisited: "Last visited 3 weeks ago",
              startingPrice: 25,
              image: "/image/imgOfService.png",
              noDeposit: true
            },
            {
              id: 2003,
              title: "Gold Gym Spa & Massage | Nicosia",
              rating: 4.7,
              reviews: 310,
              categories: ["Massage", "Wellness"],
              location: "Nicosia",
              distance: "5km away",
              lastVisited: "Last visited 1 month ago",
              startingPrice: 40,
              image: "/image/imgOfService.png",
              hasDiamond: true
            },
            {
              id: 2004,
              title: "Elite Car Detailing | Paphos",
              rating: 4.9,
              reviews: 145,
              categories: ["Automotive"],
              location: "Paphos",
              distance: "8km away",
              lastVisited: "Last visited 2 months ago",
              startingPrice: 50,
              image: "/image/imgOfService.png",
              noDeposit: true
            }
          ];

          const renderFullWidthSection = (title: string) => (
            <div className="flex flex-col gap-6 mt-10 w-full font-poppins">
              <div className="flex justify-between items-baseline w-full">
                <h4 className="font-semibold text-2xl md:text-[28px] tracking-tight text-[#1C1B1C]">
                  {title}
                </h4>
                <span className="text-sm md:text-base font-medium text-[#1C1B1C] cursor-pointer hover:underline">
                  See all
                </span>
              </div>

              {/* Carousel container */}
              <Carousel>
                {mockLocations.map((loc) => (
                  <div key={loc.id} className="w-[calc(50%-7.5px)] sm:w-[360px] md:w-[406px] shrink-0 snap-start">
                    <ServiceCard
                      rec={loc}
                      isFavorite={false}
                      onToggleFavorite={() => { }}
                      onBookNow={(id) => router.push(`/venue?id=${id}`)}
                    />
                  </div>
                ))}
              </Carousel>
            </div>
          );

          return (
            <div className="w-full flex flex-col gap-6 mt-8">
              {renderFullWidthSection("Other locations")}
              {renderFullWidthSection("Services nearby")}
            </div>
          );
        })()}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
