"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Refresh01Icon, ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";

interface VisitedService {
  id: number;
  title: string;
  price: number;
  category: string;
  lastVisited: string;
  distance: string;
  image: string;
  noDeposit?: boolean;
}

export default function BookAgainPage() {
  const router = useRouter();

  // App Install Banner State
  const [showBanner, setShowBanner] = useState(true);

  // Shared Navbar State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // Favorites state
  const [favorites, setFavorites] = useState<number[]>([1, 3, 5]);

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
      }
    }
  }, []);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id];
      if (typeof window !== "undefined") {
        localStorage.setItem("favorites", JSON.stringify(updated));
      }
      return updated;
    });
  };

  // Mock Visited services data matching the screenshot
  const visitedServices: VisitedService[] = [
    {
      id: 1,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 2,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 3,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 4,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 5,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 6,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 7,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 8,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 9,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 10,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 11,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
    {
      id: 12,
      title: "Soho Vintage Barbers | Sheikh Zayed Road",
      price: 12,
      category: "Hair Cut",
      lastVisited: "Last visited 2 months ago",
      distance: "3 km away",
      image: "/img/service_demo.jpg",
      noDeposit: true,
    },
  ];

  // Pagination Logic
  const [itemsPerPage, setItemsPerPage] = useState(12);

  useEffect(() => {
    const updateItemsPerPage = () => {
      const width = window.innerWidth;
      if (width >= 1280) { // xl
        setItemsPerPage(12); // 4 columns * 3 rows
      } else if (width >= 768) { // md-lg
        setItemsPerPage(9);  // 3 columns * 3 rows
      } else { // below md
        setItemsPerPage(6);  // 2 columns * 3 rows
      }
    };

    updateItemsPerPage();
    window.addEventListener("resize", updateItemsPerPage);
    return () => window.removeEventListener("resize", updateItemsPerPage);
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(visitedServices.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = visitedServices.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col relative overflow-x-hidden font-poppins">
    
      {/* 2. Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Breadcrumbs Section */}
      <div className="w-full px-4 md:px-8 xl:px-[65px] ">
        <nav className="flex flex-row items-center p-0 gap-3 h-6">
          <button 
            onClick={() => router.push("/")} 
            className="font-poppins font-normal text-xs sm:text-sm leading-5 tracking-[0.075em] uppercase text-[#757575] hover:text-black transition-colors cursor-pointer"
          >
            Home
          </button>
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 7L14.5 12L9.5 17" stroke="#757575" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <span className="font-poppins font-normal text-xs sm:text-sm leading-5 tracking-[0.075em] uppercase text-black font-semibold">
            Book Again
          </span>
        </nav>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full px-4 md:px-8 xl:px-[65px] mt-[40px] flex flex-col gap-8 z-10 relative">
        {/* Title and Subtitle */}
        <div className="flex flex-col gap-1">
          <h1 className="font-manrope font-bold text-2xl sm:text-[32px] sm:leading-[40px] text-[#1C1B1C]">
            Book again
          </h1>
          <p className="font-poppins font-normal text-sm text-[#757575]">
            Businesses that you have already visited
          </p>
        </div>

        {/* Grid Layout of Book Again items */}
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-[20px] justify-items-start w-full mt-4">
          {currentItems.map((item) => {
            const isFav = favorites.includes(item.id);
            return (
              <div 
                key={item.id} 
                className="w-full max-w-[360px] md:max-w-[406px] h-full bg-white border border-[#E8E6FF] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group font-poppins shrink-0"
              >
                {/* Image Section */}
                <div className="relative w-full h-[140px] xs:h-[180px] sm:h-[220px] md:h-[241px] p-[4px] bg-transparent overflow-hidden shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-[132px] xs:h-[172px] sm:h-[212px] md:h-[233px] rounded-[8px] object-cover group-hover:scale-105 transition-transform duration-300"
                    draggable="false"
                  />

                  {/* Favorite Heart Icon Overlay */}
                  <button
                    className="absolute top-[10px] sm:top-[14px] right-[10px] sm:right-[14px] rounded-full backdrop-blur-sm flex items-center justify-center text-[#E49D12] hover:bg-white active:scale-90 transition-all cursor-pointer z-10"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(item.id);
                    }}
                  >
                    <img
                      src={isFav ? "/Icons/whiteHeart.svg" : "/Icons/whiteHeartwithoutfill.svg"}
                      alt="Heart"
                      className="w-4 h-4 sm:w-[24px] sm:h-[24px]"
                      draggable="false"
                    />
                  </button>

                  {/* No Deposit Needed Badge Overlay */}
                  {item.noDeposit && (
                    <div className="absolute bottom-[8px] sm:bottom-[12px] left-[8px] sm:left-[12px] px-2 py-0.5 sm:w-[152px] sm:h-[22px] bg-[#2E9DA7] text-white flex items-center justify-center gap-0.5 rounded-full text-[9px] sm:text-xs font-medium shadow-sm z-10 whitespace-nowrap">
                      <span>No deposit</span>
                      <span className="hidden sm:inline"> needed</span>
                      <svg className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-white shrink-0 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Details Section */}
                <div className="px-3 pb-3 pt-3 sm:px-5 sm:pb-5 sm:pt-[20px] flex-1 flex flex-col gap-2 sm:gap-3">
                  <h3 className="text-sm md:text-base font-semibold leading-tight text-[#1C1B1C] line-clamp-2">
                    {item.title}
                  </h3>

                  {/* Price & Category */}
                  <div className="text-xs sm:text-sm font-semibold text-[#1C1B1C]">
                    ${item.price} <span className="text-[#757575] font-normal mx-1">•</span> <span className="text-[#757575] font-normal">{item.category}</span>
                  </div>

                  {/* Last Visited and Distance */}
                  <div className="text-[11px] sm:text-xs font-normal text-[#757575] flex items-center gap-1.5">
                    <span>{item.lastVisited}</span>
                    <span>•</span>
                    <span>{item.distance}</span>
                  </div>

                  {/* Rebook Button */}
                  <button
                    onClick={() => console.log("Rebooking item", item.id)}
                    className="w-full mt-3 bg-[#131313] hover:bg-black text-white py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 tracking-wide transition-all active:scale-95 cursor-pointer"
                  >
                    <HugeiconsIcon icon={Refresh01Icon} size={16} />
                    <span>Rebook</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

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
