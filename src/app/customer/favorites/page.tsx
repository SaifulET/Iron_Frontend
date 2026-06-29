"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon, ArrowLeft02Icon } from "@hugeicons/core-free-icons";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";
import ServiceCard, { Recommendation } from "@/components/ServiceCard";
import SearchBar from "@/components/SearchBar";

export default function FavoritesPage() {
  const router = useRouter();

  // Shared Navbar State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // Favorites state (initially pre-populated with IDs 1 to 24)
  const [favorites, setFavorites] = useState<number[]>(
    Array.from({ length: 24 }, (_, i) => i + 1)
  );

  // Sync login & favorites status with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLogin = localStorage.getItem("isLoggedIn");
      if (savedLogin === "false") {
        setIsLoggedIn(false);
      }

      const savedFavorites = localStorage.getItem("favorites");
      if (savedFavorites) {
        try {
          setFavorites(JSON.parse(savedFavorites));
        } catch (e) {
          console.error("Error parsing favorites", e);
        }
      } else {
        localStorage.setItem("favorites", JSON.stringify(favorites));
      }
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((favId) => favId !== id)
        : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Mock Diverse Favorite Services (24 items)
  const favoriteServices: Recommendation[] = Array.from({ length: 24 }, (_, i) => {
    const titles = [
      "Soho Vintage Barbers | Sheikh Zayed Road",
      "Gold Gym Spa & Massage | Nicosia Center",
      "Zara Hair & Beauty Salon | Ledra Street",
      "Zen Spa & Wellness | Limassol Marina",
      "Elite Auto Detailing & Polish | Paphos",
      "Precision Men's Grooming | Larnaca",
      "Serenity Yoga & Pilates | Limassol",
      "Luxury Nails, Lash & Beauty | Strovolos"
    ];
    const categoriesList = [
      ["Barber", "Salon"],
      ["Massage", "Wellness"],
      ["Salon", "Beauty"],
      ["Spa", "Wellness"],
      ["Automotive"],
      ["Barber"],
      ["Wellness"],
      ["Beauty", "Salon"]
    ];
    const locations = [
      "Sheikh Zayed Road, Dubai",
      "Nicosia Center, Nicosia",
      "Ledra Street, Nicosia",
      "Limassol Marina, Limassol",
      "Peyia Road, Paphos",
      "Finikoudes, Larnaca",
      "Seafront, Limassol",
      "Strovolos, Nicosia"
    ];
    const images = [
      "/img/service_demo.jpg",
      "/img/service_demo.jpg",
      "/img/service_demo.jpg",
      "/img/service_demo.jpg"
    ];

    const idx = i % 8;
    return {
      id: i + 1,
      title: titles[idx],
      rating: 4.6 + (i % 5) * 0.1,
      reviews: 80 + (i * 12) % 300,
      categories: categoriesList[idx],
      location: locations[idx],
      distance: `${1 + (i % 6)}km away`,
      lastVisited: `Last visited ${1 + (i % 4)} months ago`,
      startingPrice: 12 + (i % 7) * 8,
      image: images[i % 4],
      noDeposit: i % 3 === 0,
      hasDiamond: i % 5 === 0,
      travelsToYou: idx === 5 || idx === 6,
      travelLocations: idx === 5 ? ["Larnaca", "Dekhelia"] : idx === 6 ? ["Limassol"] : undefined
    };
  });

  // Filtering based on favorite IDs
  const activeFavorites = favoriteServices.filter((item) => favorites.includes(item.id));

  // Pagination Logic
  const [itemsPerPage, setItemsPerPage] = useState(12);
  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1280) {
        setItemsPerPage(12);
      } else if (width >= 768) {
        setItemsPerPage(9);
      } else {
        setItemsPerPage(6);
      }
    };
    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(activeFavorites.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = activeFavorites.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col relative overflow-x-hidden font-poppins">
      {/* Background Soft Orbs */}
      <EdgeSoftOrbsTop size={380} duration={56} intensity={0.85} blend="screen" zIndex={-5} />

      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 md:px-8 xl:px-[65px] mt-[8px] flex flex-col z-10 relative">
        
        {/* Reusable Search Bar with same dropdown behavior and styling */}
        <div className="w-full flex justify-center mb-[72px]">
          <SearchBar onSearch={(sq, lq, st) => console.log("Searching favorites:", sq, lq, st)} />
        </div>

        {/* Title and Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="font-manrope font-bold text-2xl sm:text-[32px] sm:leading-[40px] text-[#1C1B1C]">
            My favorites
          </h1>
          <p className="font-poppins font-normal text-sm text-[#757575]">
            My saved businesses and service provider
          </p>
        </div>

        {/* Grid Layout of Favorite items */}
        {currentItems.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-[20px] justify-items-start w-full mt-8">
            {currentItems.map((item) => (
              <ServiceCard
                key={item.id}
                rec={item}
                isFavorite={true}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        ) : (
          <div className="w-full text-center py-20">
            <p className="text-[#757575] text-lg font-medium">You don't have any favorites saved yet.</p>
          </div>
        )}

        {/* Pagination Section */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8 mb-12">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                currentPage === 1
                  ? "border-[#E8E6FF] text-neutral-300 cursor-not-allowed"
                  : "border-[#ACAAB4]/40 hover:bg-neutral-100 text-[#1C1B1C]"
              }`}
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`w-9 h-9 rounded-lg border text-sm font-semibold transition-all cursor-pointer ${
                  currentPage === page
                    ? "bg-[#131313] border-[#131313] text-white"
                    : "border-[#ACAAB4]/40 hover:bg-neutral-100 text-[#1C1B1C]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`p-2 rounded-lg border transition-all cursor-pointer ${
                currentPage === totalPages
                  ? "border-[#E8E6FF] text-neutral-300 cursor-not-allowed"
                  : "border-[#ACAAB4]/40 hover:bg-neutral-100 text-[#1C1B1C]"
              }`}
            >
              <HugeiconsIcon icon={ArrowRight02Icon} size={18} />
            </button>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
