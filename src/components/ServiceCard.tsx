import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Location01Icon } from "@hugeicons/core-free-icons";

export interface Recommendation {
  id: number;
  title: string;
  rating: number;
  reviews: number;
  categories: string[];
  location?: string;
  distance?: string;
  lastVisited?: string;
  startingPrice: number;
  image: string;
  travelsToYou?: boolean;
  travelLocations?: string[];
  hasDiamond?: boolean;
  noDeposit?: boolean;
}

interface ServiceCardProps {
  rec: Recommendation;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onBookNow?: (id: number) => void;
  hasDiamond?: boolean;
  noDeposit?: boolean;
  travelsToYou?: boolean;
}

export default function ServiceCard({
  rec,
  isFavorite,
  onToggleFavorite,
  onBookNow,
  hasDiamond = rec.hasDiamond,
  noDeposit = rec.noDeposit,
  travelsToYou = rec.travelsToYou,
}: ServiceCardProps) {
  return (
    <div className="w-full md:w-[406px] h-auto md:h-[507px] bg-white border border-[#E8E6FF] rounded-2xl overflow-hidden hover:shadow-md transition-all duration-200 flex flex-col group font-poppins shrink-0">
      {/* Card Image Area */}
      <div className="relative w-full h-[241px] p-[4px] bg-transparent overflow-hidden shrink-0">
        <img
          src={rec.image}
          alt={rec.title}
          className="w-full h-[233px] rounded-[8px] object-cover group-hover:scale-105 transition-transform duration-300"
          draggable="false"
        />

        {/* Premium Diamond Badge Overlay (Top Left) */}
        {hasDiamond && (
          <div className="absolute top-[12px] left-[12px] w-9 h-9 rounded-full bg-[#2E9DA7] flex items-center justify-center shadow-sm z-10">
            <img src="/Icons/diamond.svg" alt="Premium" className="w-4 h-4 object-contain" draggable="false" />
          </div>
        )}

        {/* Favorite Heart Icon Overlay */}
        <button
          className="absolute top-[14px] right-[14px] rounded-full backdrop-blur-sm flex items-center justify-center text-[#E49D12] hover:bg-white active:scale-90 transition-all cursor-pointer z-10"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(rec.id);
          }}
        >
          <img
            src={isFavorite ? "/Icons/whiteHeart.svg" : "/Icons/whiteHeartwithoutfill.svg"}
            alt="Heart"
            className="w-[24px] h-[24px]"
            draggable="false"
          />
        </button>

        {/* No Deposit Needed Badge Overlay (Bottom Left) */}
        {noDeposit && (
          <div className="absolute bottom-[12px] left-[12px] w-[152px] h-[22px] bg-[#2E9DA7] text-white flex items-center justify-center gap-0.5 rounded-full text-xs font-medium shadow-sm z-10 whitespace-nowrap">
            <span>No deposit needed</span>
            <svg className="w-3 h-3 text-white shrink-0 ml-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}

        {/* Travels to You Badge Overlay (Bottom Right) */}
        {travelsToYou && (
          <div className="absolute bottom-[11px] right-[11px] w-[130px] h-[24px] bg-[#2E9DA7] text-white flex items-center justify-center gap-1.5 rounded-full text-xs font-medium shadow-sm z-10 whitespace-nowrap">
            <img src="/Icons/van.svg" alt="Van" className="w-4 h-3.5 object-contain inline-block" draggable="false" />
            <span>Travels to you</span>
          </div>
        )}
      </div>

      {/* Card Details Area */}
      <div className="px-5 pb-5 pt-[20px] flex-1 flex flex-col gap-[16px]">
        {/* Title & Star Rating */}
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-base font-semibold leading-tight text-[#1C1B1C] line-clamp-2">
            {rec.title}
          </h3>
          <div className="flex items-center gap-1 shrink-0">
            <img src="/icons/star.svg" alt="star" className="w-[16px] h-[16px]" draggable="false" />
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
        {travelsToYou ? (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-[8px] flex-nowrap w-full">
              <div className="flex items-center gap-[8px] shrink-0">
                <img src="/Icons/colorfulVan.svg" alt="Van" className="w-[16px] h-[16px] object-contain" draggable="false" />
                <span className="font-poppins font-medium text-[12px] leading-[20px] tracking-[0.01em] text-[#2E9DA7] block">
                  Travels to you
                </span>
              </div>
              {rec.travelLocations?.map((loc, i) => (
                <span
                  key={i}
                  className="text-[12px] font-normal leading-[20px] text-[#757575] bg-white border border-neutral-100 px-[8px] py-[2px] rounded-[99px] shrink-0"
                >
                  {loc}
                </span>
              ))}
            </div>
            {rec.lastVisited && (
              <span className="text-[11px] text-[#757575] font-medium pl-6">{rec.lastVisited}</span>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-1.5 text-xs text-[#757575] font-medium">
              <HugeiconsIcon icon={Location01Icon} size={16} />
              <span>{rec.location}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 mx-1"></span>
              <span>{rec.distance}</span>
            </div>
            {rec.lastVisited && (
              <span className="text-[11px] text-[#757575] font-medium pl-5">{rec.lastVisited}</span>
            )}
          </div>
        )}

        {/* Divider */}
        <div className="border-t border-neutral-100 pt-4 mt-auto flex justify-between items-center gap-4">
          <div className="flex flex-col">
            <span className="text-[10px] font-semibold text-[#757575] uppercase tracking-wider">Starting Price</span>
            <span className="text-xl font-bold text-[#1C1B1C]">${rec.startingPrice}</span>
          </div>
          <button
            onClick={() => onBookNow?.(rec.id)}
            className="bg-[#131313] hover:bg-black text-white px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all active:scale-95 cursor-pointer"
          >
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
}
