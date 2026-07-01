"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import { mockExploreServices } from "@/components/explore/mockData";
import FilterSidebar from "@/components/explore/FilterSidebar";
import MobileFilterDrawer from "@/components/explore/MobileFilterDrawer";
import ResultsList from "@/components/explore/ResultsList";

const ExploreMap = dynamic(() => import("@/components/ExploreMap"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[500px] bg-neutral-100 rounded-2xl flex items-center justify-center border border-[#E5E5E5]/50">
      <span className="text-sm text-gray-500 animate-pulse font-medium">Loading Map Engine...</span>
    </div>
  ),
});

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
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("Most relevant");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);

  // Favorites state
  const [favorites, setFavorites] = useState<number[]>([1, 3]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

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
    setSelectedAvailability([]);
  };

  const toggleCategory = (cat: string) => {
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
  };

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

  const toggleAvailability = (avail: string) => {
    setSelectedAvailability(prev =>
      prev.includes(avail) ? prev.filter(a => a !== avail) : [...prev, avail]
    );
  };

  // Filter Services Logic
  const filteredServices = mockExploreServices.filter((service) => {
    // Search Query Match
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      const matchTitle = service.title.toLowerCase().includes(query);
      const matchCategories = service.categories.some(cat => cat.toLowerCase().includes(query));
      if (!matchTitle && !matchCategories) return false;
    }

    // Travels to You Toggle
    if (travelsToYou && !service.travelsToYou) {
      return false;
    }

    // Categories filter
    if (selectedCategories.length > 0) {
      const match = service.categories.some(cat => selectedCategories.includes(cat));
      if (!match) return false;
    }

    // Quick Actions filter
    if (selectedQuickActions.length > 0) {
      if (selectedQuickActions.includes("Recommended") && service.rating < 4.8) {
        return false;
      }
      if (selectedQuickActions.includes("Trending services") && service.reviews < 100) {
        return false;
      }
    }

    // Locations filter
    if (selectedLocations.length > 0) {
      if (service.travelsToYou && service.travelLocations) {
        const match = service.travelLocations.some(loc => selectedLocations.includes(loc));
        if (!match) return false;
      } else if (service.location) {
        const match = selectedLocations.some(loc => service.location?.includes(loc));
        if (!match) return false;
      } else {
        return false;
      }
    }

    // Rating filter
    if (selectedRatings.length > 0) {
      const match = selectedRatings.some(rate => service.rating >= rate);
      if (!match) return false;
    }

    // Availability filter (Mocked logic)
    if (selectedAvailability.length > 0) {
      // Mock: Service 4 isn't available "Today", Service 6 is "Evenings" only, etc.
      if (selectedAvailability.includes("Today") && service.id === 4) return false;
      if (selectedAvailability.includes("Evenings") && service.id === 2) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === "Rating (High to Low)") {
      return b.rating - a.rating;
    }
    if (sortBy === "Price (Low to High)") {
      return a.startingPrice - b.startingPrice;
    }
    if (sortBy === "Price (High to Low)") {
      return b.startingPrice - a.startingPrice;
    }
    return 0; // Most relevant default
  });

  return (
    <div className="min-h-screen bg-[#FCFAF9] flex flex-col relative text-[#1C1B1C] font-poppins ">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Container */}
      <main className="flex-1 w-full px-4 md:px-16 flex flex-col gap-6 mb-[149px]">

        {/* Explore Columns layout */}
        <div className="w-full flex flex-col lg:flex-row gap-10 items-start relative mt-4 min-h-[950px]">
          
          {/* LEFT SIDEBAR FILTERS (Desktop/Lg devices) */}
          {!showMap && (
            <FilterSidebar
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              travelsToYou={travelsToYou}
              setTravelsToYou={setTravelsToYou}
              selectedCategories={selectedCategories}
              toggleCategory={toggleCategory}
              expandedCategories={expandedCategories}
              toggleExpandCategory={toggleExpandCategory}
              selectedLocations={selectedLocations}
              toggleLocation={toggleLocation}
              selectedRatings={selectedRatings}
              toggleRating={toggleRating}
              selectedQuickActions={selectedQuickActions}
              toggleQuickAction={toggleQuickAction}
              distanceLimit={distanceLimit}
              setDistanceLimit={setDistanceLimit}
              selectedAvailability={selectedAvailability}
              toggleAvailability={toggleAvailability}
              handleClearAll={handleClearAll}
              showMap={showMap}
              setShowMap={setShowMap}
            />
          )}
<div >

  {/* RIGHT SIDE CONTENT CONTAINER (Contains list & map split container) */}
          <ResultsList
            filteredServices={filteredServices}
            favorites={favorites}
            handleToggleFavorite={handleToggleFavorite}
            viewMode={viewMode}
            setViewMode={setViewMode}
            sortBy={sortBy}
            setSortBy={setSortBy}
            showMap={showMap}
            setShowMap={setShowMap}
            setShowMobileFilters={setShowMobileFilters}
          />

 {/* Footer Business Banner Section */}
         {/* Footer Business Banner Section */}
        <section className="w-full max-w-[704px] mx-auto mt-[72px]  p-8 sm:p-12 bg-white border border-neutral-100 rounded-[20px] flex flex-col items-center text-center gap-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)]">
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
</div>
        

        </div>

       
      </main>

      {/* MOBILE DRAWERS OVERLAY FILTER (Collapsible on mobile) */}
      <MobileFilterDrawer
        showMobileFilters={showMobileFilters}
        setShowMobileFilters={setShowMobileFilters}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        travelsToYou={travelsToYou}
        setTravelsToYou={setTravelsToYou}
        selectedCategories={selectedCategories}
        toggleCategory={toggleCategory}
        expandedCategories={expandedCategories}
        toggleExpandCategory={toggleExpandCategory}
        selectedLocations={selectedLocations}
        toggleLocation={toggleLocation}
        selectedRatings={selectedRatings}
        toggleRating={toggleRating}
        selectedQuickActions={selectedQuickActions}
        toggleQuickAction={toggleQuickAction}
        distanceLimit={distanceLimit}
        setDistanceLimit={setDistanceLimit}
        selectedAvailability={selectedAvailability}
        toggleAvailability={toggleAvailability}
        handleClearAll={handleClearAll}
      />

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
