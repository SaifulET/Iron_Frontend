"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import ServiceCard, { Recommendation } from "@/components/ServiceCard";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  FilterHorizontalIcon,
  MapsCircle01Icon,
  Search01Icon,
  VanIcon,
  DashboardSquare01Icon,
  ListChevronsDownUpIcon,
  StarIcon,
  ArrowRight02Icon,
  ArrowLeft01Icon,
  InformationCircleIcon,
  ArrowDown01Icon,
  MapsCircleIcon,
  MapsIcon
} from "@hugeicons/core-free-icons";

const ExploreMap = dynamic(() => import("@/components/ExploreMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-neutral-100 rounded-2xl flex items-center justify-center border border-neutral-200">
      <span className="text-sm text-gray-500 animate-pulse font-medium">Loading Map Engine...</span>
    </div>
  ),
});

// Mock explore results database matching landing page styles
const mockExploreServices: Recommendation[] = [
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
    travelLocations: ["Larnaca", "Limassol", "+4 more"],
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
    travelLocations: ["Larnaca", "Limassol", "+4 more"],
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
  },
  {
    id: 5,
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
    id: 6,
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

export default function ExplorePage() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState("");
  const [travelsToYou, setTravelsToYou] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLocations, setSelectedLocations] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [selectedQuickActions, setSelectedQuickActions] = useState<string[]>([]);
  const [distanceLimit, setDistanceLimit] = useState(15);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Most relevant");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState<number[]>([1, 3]);

  const handleToggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fId => fId !== id) : [...prev, id]
    );
  };

  const handleClearAll = () => {
    setSearchQuery("");
    setTravelsToYou(false);
    setSelectedCategories([]);
    setSelectedLocations([]);
    setSelectedRatings([]);
    setSelectedQuickActions([]);
    setDistanceLimit(15);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  const toggleExpandCategory = (name: string) => {
    setExpandedCategories(prev =>
      prev.includes(name) ? prev.filter(n => n !== name) : [...prev, name]
    );
  };

  const toggleLocation = (loc: string) => {
    setSelectedLocations(prev =>
      prev.includes(loc) ? prev.filter(l => l !== loc) : [...prev, loc]
    );
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings(prev =>
      prev.includes(rating) ? prev.filter(r => r !== rating) : [...prev, rating]
    );
  };

  const toggleQuickAction = (action: string) => {
    setSelectedQuickActions(prev =>
      prev.includes(action) ? prev.filter(a => a !== action) : [...prev, action]
    );
  };

  // Filtered Services List
  const filteredServices = mockExploreServices.filter(service => {
    // Search Query filter
    if (searchQuery && !service.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    // Travels to You filter
    if (travelsToYou && !service.travelsToYou) {
      return false;
    }
    // Categories filter
    if (selectedCategories.length > 0) {
      const hasMatchingCategory = service.categories.some(cat => 
        selectedCategories.some(sel => cat.toLowerCase().includes(sel.toLowerCase()))
      );
      if (!hasMatchingCategory) return false;
    }
    // Location filter
    if (selectedLocations.length > 0) {
      // If service travels to you, check travel locations
      if (service.travelsToYou && service.travelLocations) {
        const matchesTravel = service.travelLocations.some(loc => selectedLocations.includes(loc));
        if (!matchesTravel) return false;
      } else if (service.location) {
        const matchesLocation = selectedLocations.some(loc => service.location?.includes(loc));
        if (!matchesLocation) return false;
      } else {
        return false;
      }
    }
    // Ratings filter
    if (selectedRatings.length > 0) {
      const minRating = Math.min(...selectedRatings);
      if (service.rating < minRating) return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-[#FCFAF9] flex flex-col relative text-[#1C1B1C] font-poppins">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 w-full  px-4 md:px-16  flex flex-col gap-6">

        {/* Explore Columns layout */}
        <div className="w-full flex flex-col lg:flex-row gap-10 items-start relative mt-4 min-h-[950px]">
          
          {/* LEFT SIDEBAR FILTERS (Desktop/Lg devices) */}
          {!showMap && (
            <aside className="hidden lg:flex flex-col items-start px-3 gap-6 w-[284px] bg-white border border-[#E5E5E5]/50 rounded-2xl py-6 shrink-0 shadow-sm sticky top-24 h-fit">
            
            {/* Filter & View Map Row */}
            <div className="flex flex-row items-center gap-3 w-full self-stretch">
              <button 
                onClick={() => {}}
                className="flex flex-row items-center justify-center py-2 px-4 gap-2 h-10 bg-[#000000] text-white rounded-xl text-sm font-semibold cursor-pointer shrink-0 transition-colors hover:bg-neutral-800 whitespace-nowrap"
              >
                <HugeiconsIcon icon={FilterHorizontalIcon} size={18} className="text-white" />
                <span>Filter</span>
              </button>
              <button 
                onClick={() => setShowMap(!showMap)}
                className={`box-border flex flex-row items-center justify-center py-2 px-4 gap-2 h-10 border rounded-xl text-sm font-semibold cursor-pointer shrink-0 transition-colors whitespace-nowrap ${showMap ? "bg-black text-white border-black" : "border-[#000000] text-[#111111] bg-white hover:bg-neutral-50"}`}
              >
                <HugeiconsIcon icon={MapsIcon} />
                <span>View Map</span>
              </button>
            </div>

            {/* Search Input Box */}
            <div className="flex items-center border border-[#ACAAB4] rounded-full h-[52px] w-full pl-4 pr-[2px] bg-white justify-between shadow-sm">
              <HugeiconsIcon icon={Search01Icon} size={24} className="text-[#4E5F78] mr-3 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="flex-1 w-0 bg-transparent border-none outline-none text-base placeholder-[#ACAAB4] text-[#1C1B1C]"
              />
              <button 
                onClick={() => {}} // Search submit
                className="w-12 h-12 rounded-full bg-[#111111] hover:bg-black flex items-center justify-center text-white shrink-0 cursor-pointer transition-colors"
                aria-label="Submit search"
              >
                <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="text-white" />
              </button>
            </div>

            {/* Toggle switch: We Cam to you */}
            <div className="flex items-center justify-between w-full py-1">
              <div className="flex flex-col">
                <span className="font-semibold text-[14px] text-[#1C1B1C]">We Came to you</span>
                <span className="text-[10px] text-[#757575]">Show businesses that come to you</span>
              </div>
              <button 
                onClick={() => setTravelsToYou(!travelsToYou)}
                className={`w-[52px] h-[28px] rounded-full p-0.5 flex items-center transition-colors cursor-pointer ${travelsToYou ? "bg-[#2BB54F] justify-end" : "bg-[#EDEDED] justify-start"}`}
              >
                <div className="w-[24px] h-[24px] rounded-full bg-white shadow-sm" />
              </button>
            </div>

            <hr className="w-full border-t border-neutral-100" />

            {/* Categories filter */}
            <div className="flex flex-col gap-3.5 w-full">
              <span className="font-semibold text-sm text-[#1C1B1C] uppercase tracking-wider">Category</span>
              <div className="flex flex-col gap-3">
                {[
                  { name: "Beauty & Wellness", count: 1, subs: ["Sub category", "Sub category"] },
                  { name: "Health & Fitness", count: 1 },
                  { name: "Sports & Activities", count: 1 },
                  { name: "Experiences & Tours", count: 1 },
                  { name: "Entertainment & Events", count: 1 },
                  { name: "Pets & Home", count: 1 },
                  { name: "Automotive", count: 1 }
                ].map((cat, idx) => (
                  <div key={idx} className="flex flex-col gap-2">
                    <div className="flex items-center justify-between w-full">
                      <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat.name)}
                          onChange={() => toggleCategory(cat.name)}
                          className="w-4 h-4 border border-neutral-300 rounded cursor-pointer accent-black"
                        />
                        <span className="text-[#4E5F78] hover:text-black transition-colors">{cat.name}</span>
                        <span className="text-xs text-[#8693A8]">({cat.count})</span>
                      </label>
                      <button 
                        onClick={() => toggleExpandCategory(cat.name)}
                        className="text-[#141B34] cursor-pointer hover:opacity-75 transition-opacity"
                        aria-label="Toggle subcategories"
                      >
                        <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                      </button>
                    </div>
                    {/* Render subcategories if expanded */}
                    {expandedCategories.includes(cat.name) && cat.subs && (
                      <div className="pl-6 flex flex-col gap-2.5 py-1">
                        {cat.subs.map((sub, sIdx) => (
                          <label key={sIdx} className="flex items-center gap-2.5 cursor-pointer text-xs">
                            <input
                              type="checkbox"
                              className="w-3.5 h-3.5 border border-neutral-300 rounded accent-black cursor-pointer"
                            />
                            <span className="text-[#757575]">{sub}</span>
                            <span className="text-[#8693A8]">(1)</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <hr className="w-full border-t border-neutral-100" />

            {/* Quick Actions filter */}
            <div className="flex flex-col gap-3.5 w-full">
              <span className="font-semibold text-sm text-[#1C1B1C] uppercase tracking-wider">Quick Actions</span>
              <div className="flex flex-col gap-3">
                {["Recommended", "Services near you", "Trending services"].map((action, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedQuickActions.includes(action)}
                      onChange={() => toggleQuickAction(action)}
                      className="w-4 h-4 border border-neutral-300 rounded cursor-pointer accent-black"
                    />
                    <span className="text-[#4E5F78]">{action}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="w-full border-t border-neutral-100" />

            {/* Business Location filter */}
            <div className="flex flex-col gap-3.5 w-full">
              <span className="font-semibold text-sm text-[#1C1B1C] uppercase tracking-wider">Business Location</span>
              <div className="flex flex-col gap-3">
                {["Larnaca", "Limassol", "Nicosia", "Paphos", "Protaros", "Aya Napa"].map((loc, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedLocations.includes(loc)}
                      onChange={() => toggleLocation(loc)}
                      className="w-4 h-4 border border-neutral-300 rounded cursor-pointer accent-black"
                    />
                    <span className="text-[#4E5F78]">{loc}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="w-full border-t border-neutral-100" />

            {/* Ratings Filter */}
            <div className="flex flex-col gap-3.5 w-full">
              <span className="font-semibold text-sm text-[#1C1B1C] uppercase tracking-wider">Rating</span>
              <div className="flex flex-col gap-3">
                {[4.9, 4.8, 4.5, 4.0].map((rating, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedRatings.includes(rating)}
                      onChange={() => toggleRating(rating)}
                      className="w-4 h-4 border border-neutral-300 rounded cursor-pointer accent-black"
                    />
                    <div className="flex items-center gap-1">
                      <HugeiconsIcon icon={StarIcon} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />
                      <span className="text-[#4E5F78] font-medium">{rating} & up</span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            <hr className="w-full border-t border-neutral-100" />

            {/* Distance Slider */}
            <div className="flex flex-col gap-3.5 w-full">
              <div className="flex justify-between items-center text-sm font-semibold">
                <span className="text-[#1C1B1C] uppercase tracking-wider">Distance</span>
                <span className="text-[#6950F3]">{distanceLimit} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="30"
                value={distanceLimit}
                onChange={(e) => setDistanceLimit(Number(e.target.value))}
                className="w-full h-1.5 bg-neutral-200 rounded-lg appearance-none cursor-pointer accent-[#111111]"
              />
              <div className="flex justify-between text-[10px] text-gray-400 font-medium">
                <span>1 km</span>
                <span>15 km</span>
                <span>30 km</span>
              </div>
            </div>

            <hr className="w-full border-t border-neutral-100" />

            {/* Availability filter */}
            <div className="flex flex-col gap-3.5 w-full">
              <span className="font-semibold text-sm text-[#1C1B1C] uppercase tracking-wider">Availability</span>
              <div className="flex flex-col gap-3">
                {["Today", "This week", "This weekend", "Weekends", "Evenings"].map((avail, idx) => (
                  <label key={idx} className="flex items-center gap-2.5 text-sm cursor-pointer">
                    <input
                      type="checkbox"
                      className="w-4 h-4 border border-neutral-300 rounded cursor-pointer accent-black"
                    />
                    <span className="text-[#4E5F78]">{avail}</span>
                  </label>
                ))}
              </div>
            </div>

            <hr className="w-full border-t border-neutral-100" />

            {/* Clear All button */}
            <button
              onClick={handleClearAll}
              className="w-full py-2.5 border border-neutral-200 hover:border-black text-[#1C1B1C] font-semibold text-xs rounded-xl shadow-sm hover:shadow transition-all cursor-pointer flex items-center justify-center bg-white"
            >
              Clear all
            </button>

            </aside>
          )}

          {/* RIGHT SIDE CONTENT CONTAINER */}
          <div className={`flex-grow w-full flex ${showMap ? "xl:flex-row gap-[22px] items-start" : "flex-col gap-6"} bg-white p-6 rounded-2xl border border-[#E5E5E5]/50 shadow-sm`}>
            
            {/* Results list area */}
            <div className={`flex flex-col gap-6 ${showMap ? "w-full xl:w-[644px] shrink-0" : "w-full"}`}>
              
              {/* Filter & View Map buttons */}
              <div className={`flex flex-row items-center gap-3 w-full mb-2 ${showMap ? "" : "lg:hidden"}`}>
                <button 
                  onClick={() => {
                    if (showMap) {
                      setShowMap(false);
                      if (window.innerWidth < 1024) {
                        setShowMobileFilters(true);
                      }
                    } else {
                      setShowMobileFilters(true);
                    }
                  }}
                  className={`box-border flex flex-row items-center justify-center py-2 px-4 gap-2 h-10 border rounded-xl text-sm font-semibold cursor-pointer shrink-0 transition-colors whitespace-nowrap ${showMap ? "border-[#000000] text-[#111111] bg-white hover:bg-neutral-50" : "bg-[#000000] text-white border-black hover:bg-neutral-800"}`}
                >
                  <HugeiconsIcon icon={FilterHorizontalIcon} size={18} className={showMap ? "text-black" : "text-white"} />
                  <span>Filter</span>
                </button>
                <button 
                  onClick={() => setShowMap(!showMap)}
                  className={`box-border flex flex-row items-center justify-center py-2 px-4 gap-2 h-10 border rounded-xl text-sm font-semibold cursor-pointer shrink-0 transition-colors whitespace-nowrap ${showMap ? "bg-[#000000] text-white border-black" : "border-[#000000] text-[#111111] bg-white hover:bg-neutral-50"}`}
                >
                  <HugeiconsIcon icon={MapsIcon} />
                  <span>View Map</span>
                </button>
              </div>

              {/* Top Toolbar: Results count & sorting & view switchers */}
              <div className="flex flex-col gap-3 w-full mb-2">
                <div className="flex flex-row items-center justify-between w-full">
                  <span className="text-xs sm:text-sm font-medium text-[#757575] font-poppins">
                    Show results of <strong className="text-black font-semibold">{filteredServices.length} businesses</strong>
                  </span>

                  {/* View switcher buttons (Grid / List) */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button 
                      onClick={() => setViewMode("grid")}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${viewMode === "grid" ? "bg-[#E2F0F9] text-black" : "text-gray-400 hover:text-black"}`}
                      aria-label="Grid View"
                    >
                      <HugeiconsIcon icon={DashboardSquare01Icon} size={20} className="stroke-2" />
                    </button>
                    <button 
                      onClick={() => setViewMode("list")}
                      className={`w-9 h-9 rounded-lg flex items-center justify-center cursor-pointer transition-colors ${viewMode === "list" ? "bg-[#E2F0F9] text-black" : "text-gray-400 hover:text-black"}`}
                      aria-label="List View"
                    >
                      <HugeiconsIcon icon={ListChevronsDownUpIcon} size={20} className="stroke-2" />
                    </button>
                  </div>
                </div>

                {/* Sort selector row */}
                <div className="flex justify-start">
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="border border-[#111111]/15 rounded-xl px-3.5 h-[38px] bg-white text-xs font-semibold outline-none cursor-pointer hover:border-black transition-colors"
                  >
                    <option>Most relevant</option>
                    <option>Rating (High to Low)</option>
                    <option>Price (Low to High)</option>
                    <option>Price (High to Low)</option>
                  </select>
                </div>
              </div>

              {/* Grid/List of Results */}
              {filteredServices.length > 0 ? (
                <div className={viewMode === "grid" 
                  ? (showMap 
                      ? "grid grid-cols-1 sm:grid-cols-2 gap-5 w-full justify-items-center"
                      : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5 w-full justify-items-center")
                  : "flex flex-col gap-5 w-full"
                }>
                  {filteredServices.map((service) => (
                    <div key={service.id} className={viewMode === "list" ? "w-full max-w-[860px]" : "w-full"}>
                      <ServiceCard
                        rec={service}
                        isFavorite={favorites.includes(service.id)}
                        onToggleFavorite={handleToggleFavorite}
                        onBookNow={(id) => router.push(`/venue?id=${id}`)}
                        className="w-full"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-full flex flex-col items-center justify-center py-20 bg-white border border-neutral-100 rounded-2xl shadow-sm text-center px-4">
                  <HugeiconsIcon icon={Search01Icon} size={48} className="text-gray-300 mb-4" />
                  <h3 className="font-semibold text-lg text-black mb-1">No services found</h3>
                  <p className="text-sm text-gray-500 max-w-sm">We couldn't find any results matching your filter criteria. Try expanding your search queries or resetting filters.</p>
                  <button 
                    onClick={handleClearAll}
                    className="mt-5 px-6 py-2.5 bg-black text-white text-xs font-semibold rounded-full hover:bg-neutral-800 transition-colors shadow-sm cursor-pointer"
                  >
                    Reset all filters
                  </button>
                </div>
              )}

              {/* Pagination */}
              {filteredServices.length > 0 && (
                <div className="flex items-center justify-center gap-2 mt-8 py-4">
                  <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors cursor-pointer">
                    <HugeiconsIcon icon={ArrowLeft01Icon} size={16} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center font-semibold text-xs cursor-pointer">
                    1
                  </button>
                  <button className="w-8 h-8 rounded-full border border-neutral-200 text-gray-700 flex items-center justify-center font-semibold text-xs hover:text-black hover:border-black transition-colors cursor-pointer">
                    2
                  </button>
                  <button className="w-8 h-8 rounded-full border border-neutral-200 flex items-center justify-center text-gray-400 hover:text-black hover:border-black transition-colors cursor-pointer">
                    <HugeiconsIcon icon={ArrowRight02Icon} size={16} />
                  </button>
                </div>
              )}

            </div>

            {/* Desktop Map (right side) */}
            {showMap && (
              <div className="hidden xl:block w-full xl:flex-1 h-[988px] sticky top-24 shrink-0 rounded-2xl overflow-hidden border border-[#E5E5E5]/50 shadow-sm">
                <ExploreMap services={filteredServices} />
              </div>
            )}

          </div>

        </div>

        {/* Footer Business Banner Section */}
        <section className="w-full max-w-[704px] mx-auto mt-16 p-8 sm:p-12 bg-white border border-neutral-100 rounded-[20px] flex flex-col items-center text-center gap-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col gap-3 items-center">
            <h3 className="font-bold text-xl sm:text-2xl text-[#1C1B1C]">Is your business not listed?</h3>
            <p className="text-sm sm:text-base text-[#4E5F78] leading-relaxed max-w-md">
              Join Bookly and start receiving online bookings. Zero monthly fees. No-show protection from day one.
            </p>
          </div>
          <button 
            onClick={() => router.push("/professional/signup")}
            className="bg-[#2E9DA7] hover:bg-[#238189] text-white font-semibold text-sm px-8 py-3 rounded-lg shadow-sm transition-all cursor-pointer"
          >
            List your business - it's free
          </button>
        </section>

      </main>

      {/* MOBILE DRAWERS OVERLAY FILTER (Collapsible on mobile) */}
      <div className={`fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex justify-start transition-opacity duration-300 ease-out xl:hidden ${showMobileFilters ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}>
        <div className={`w-full sm:max-w-[400px] bg-[#FCFAF9] h-full flex flex-col transition-transform duration-300 ease-out shadow-2xl relative ${showMobileFilters ? "translate-x-0" : "-translate-x-full"}`}>
            
            {/* Header */}
            <div className="flex items-center justify-between w-full px-6 py-5 border-b border-neutral-100 bg-white">
              <span className="font-bold text-xl text-black">Filters</span>
              <div className="flex items-center gap-4">
                <button 
                  onClick={handleClearAll} 
                  className="text-sm text-[#6950F3] font-semibold hover:underline cursor-pointer"
                >
                  Clear all
                </button>
                <button 
                  onClick={() => setShowMobileFilters(false)} 
                  className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
                  aria-label="Close filters"
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Scrollable Filters Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6 scrollbar-hide pb-28">
              
              {/* Mobile Search input */}
              <div className="flex items-center border border-[#ACAAB4] rounded-full h-[52px] w-full pl-4 pr-[2px] bg-white justify-between shadow-sm">
                <HugeiconsIcon icon={Search01Icon} size={24} className="text-[#4E5F78] mr-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="flex-1 w-0 bg-transparent border-none outline-none text-base placeholder-[#ACAAB4] text-[#1C1B1C]"
                />
                <button 
                  onClick={() => setShowMobileFilters(false)}
                  className="w-12 h-12 rounded-full bg-[#111111] hover:bg-black flex items-center justify-center text-white shrink-0 cursor-pointer transition-colors"
                >
                  <HugeiconsIcon icon={ArrowRight02Icon} size={16} className="text-white" />
                </button>
              </div>

              {/* Travels to you mobile */}
              <div className="flex items-center justify-between w-full bg-white p-4 rounded-xl border border-neutral-100">
                <div className="flex flex-col">
                  <span className="font-semibold text-sm text-[#1C1B1C]">We Came to you</span>
                  <span className="text-xs text-[#757575]">Show businesses that come to you</span>
                </div>
                <button 
                  onClick={() => setTravelsToYou(!travelsToYou)}
                  className={`w-[60px] h-[30px] rounded-full p-1 flex items-center transition-colors cursor-pointer ${travelsToYou ? "bg-[#2BB54F] justify-end" : "bg-[#EDEDED] justify-start"}`}
                >
                  <div className="w-[22px] h-[22px] rounded-full bg-white shadow-sm" />
                </button>
              </div>

              {/* Categories filter mobile */}
              <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-neutral-100">
                <span className="font-semibold text-xs text-black uppercase tracking-wider">Category</span>
                <div className="flex flex-col gap-3.5">
                  {[
                    { name: "Beauty & Wellness", count: 1, subs: ["Sub category", "Sub category"] },
                    { name: "Health & Fitness", count: 1 },
                    { name: "Sports & Activities", count: 1 },
                    { name: "Experiences & Tours", count: 1 },
                    { name: "Entertainment & Events", count: 1 },
                    { name: "Pets & Home", count: 1 },
                    { name: "Automotive", count: 1 }
                  ].map((cat, idx) => (
                    <div key={idx} className="flex flex-col gap-2">
                      <div className="flex items-center justify-between w-full">
                        <label className="flex items-center gap-2.5 cursor-pointer text-sm">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(cat.name)}
                            onChange={() => toggleCategory(cat.name)}
                            className="w-4 h-4 border border-neutral-300 rounded cursor-pointer accent-black"
                          />
                          <span className="text-[#4E5F78]">{cat.name}</span>
                        </label>
                        <button 
                          onClick={() => toggleExpandCategory(cat.name)}
                          className="text-[#141B34] cursor-pointer"
                        >
                          <HugeiconsIcon icon={ArrowDown01Icon} size={16} />
                        </button>
                      </div>
                      {expandedCategories.includes(cat.name) && cat.subs && (
                        <div className="pl-6 flex flex-col gap-2.5 py-1">
                          {cat.subs.map((sub, sIdx) => (
                            <label key={sIdx} className="flex items-center gap-2.5 cursor-pointer text-xs">
                              <input
                                type="checkbox"
                                className="w-3.5 h-3.5 border border-neutral-300 rounded accent-black cursor-pointer"
                              />
                              <span className="text-[#757575]">{sub}</span>
                              <span className="text-[#8693A8]">(1)</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Locations filter mobile */}
              <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-neutral-100">
                <span className="font-semibold text-xs text-black uppercase tracking-wider">Business Location</span>
                <div className="flex flex-col gap-2.5">
                  {["Larnaca", "Limassol", "Nicosia", "Paphos", "Protaros", "Aya Napa"].map((loc, idx) => (
                    <label key={idx} className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedLocations.includes(loc)}
                        onChange={() => toggleLocation(loc)}
                        className="w-4 h-4 border border-neutral-300 rounded accent-black"
                      />
                      <span className="text-[#4E5F78]">{loc}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Ratings Filter mobile */}
              <div className="flex flex-col gap-4 bg-white p-4 rounded-xl border border-neutral-100">
                <span className="font-semibold text-xs text-black uppercase tracking-wider">Rating</span>
                <div className="flex flex-col gap-2.5">
                  {[4.9, 4.8, 4.5, 4.0].map((rating, idx) => (
                    <label key={idx} className="flex items-center gap-2.5 text-sm cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedRatings.includes(rating)}
                        onChange={() => toggleRating(rating)}
                        className="w-4 h-4 border border-neutral-300 rounded accent-black"
                      />
                      <div className="flex items-center gap-1">
                        <HugeiconsIcon icon={StarIcon} size={14} className="text-[#FBBC05] fill-[#FBBC05]" />
                        <span className="text-[#4E5F78]">{rating} & up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

            </div>

            {/* Sticky Action Footer */}
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-white/90 border-t border-neutral-100 flex items-center justify-center z-10">
              <button 
                onClick={() => setShowMobileFilters(false)}
                className="w-full max-w-md py-3.5 bg-black hover:bg-neutral-800 text-white text-sm font-semibold rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Apply Filters
              </button>
            </div>

          </div>
      </div>

      {/* MOBILE MAP OVERLAY MODAL (Full screen on mobile) */}
      {showMap && (
        <div className="fixed inset-0 bg-white z-50 flex flex-col xl:hidden animate-in slide-in-from-bottom duration-500 ease-out">
          
          {/* Header */}
          <div className="flex items-center justify-between w-full px-6 py-4 border-b border-neutral-100 bg-white">
            <span className="font-bold text-lg text-black">Business Locations Map</span>
            <button 
              onClick={() => setShowMap(false)} 
              className="w-8 h-8 rounded-full bg-neutral-100 hover:bg-neutral-200 flex items-center justify-center text-gray-600 cursor-pointer transition-colors"
              aria-label="Close Map"
            >
              ✕
            </button>
          </div>

          {/* Map Container */}
          <div className="flex-1 w-full bg-neutral-50 relative">
            <ExploreMap services={filteredServices} />
          </div>

        </div>
      )}

    </div>
  );
}
