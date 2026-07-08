"use client";
import DashboardHeader from "@/components/DashboardHeader";


import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  Search01Icon, 
  InformationCircleIcon, 
  StarIcon
} from "@hugeicons/core-free-icons";
import { initialReviewsData, Review } from "@/data/reviewsMockData";

export default function DashboardReviewsList() {
  const [reviews, setReviews] = useState<Review[]>(initialReviewsData);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredReviews = reviews.filter(
    (r) =>
      r.bookingId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] md: select-none font-poppins relative">
      
      {/* Header Row */}
      <DashboardHeader title="Reviews" subtitle="Verified reviews from Bookly customers" />
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">

      {/* Main Alignment Wrapper */}
      <div className="flex flex-col gap-5 w-full">
        
        {/* Search row */}
        <div className="flex justify-end items-center w-full h-[37.6px]">
          <div className="relative w-[230px] h-[36px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Booking ID"
              className="w-[230px] h-[36px] bg-white border border-[#D3D1C7] rounded-[8px] pl-[32px] pr-3 text-xs text-[#1A1A1A] placeholder:text-[#1A1A1A]/50 focus:outline-none shadow-sm"
            />
            <div className="absolute left-[10px] top-[11px] w-[14px] h-[14px] flex items-center justify-center pointer-events-none">
              <HugeiconsIcon icon={Search01Icon} className="w-[14px] h-[14px] text-[#B4B2A9]" />
            </div>
          </div>
        </div>

        {/* Ratings Summary Card Row */}
        <div className="flex flex-row items-start gap-[20px] w-full h-[172px]">
          
          {/* Overall Rating card */}
          <div className="box-sizing-border-box flex flex-col items-center justify-center p-5 gap-2 w-[142px] h-[172px] border border-[#111111]/60 rounded-[12px] bg-white">
            <span className="font-poppins font-normal text-[12px] leading-[18px] tracking-[0.5px] uppercase text-[#111111]/60">
              Overall Rating
            </span>
            <span className="font-poppins font-medium text-[28px] leading-[36px] text-[#111111]">
              4.9
            </span>
            <div className="flex flex-row gap-0.5">
              {[...Array(5)].map((_, i) => (
                <HugeiconsIcon key={i} icon={StarIcon} className="w-3 h-3 text-[#E49D12] fill-[#E49D12]" />
              ))}
            </div>
            <span className="font-poppins font-medium text-[12px] leading-[20px] text-[#111111]/60">
              38 reviews
            </span>
          </div>

          {/* Rating distribution progress card */}
          <div className="box-sizing-border-box flex flex-col justify-center p-5 px-10 gap-2 w-full h-[172px] border border-[#111111]/60 rounded-[12px] bg-white">
            
            {/* 5 stars */}
            <div className="flex flex-row items-center gap-2.5 w-full">
              <span className="w-[41px] text-left font-poppins font-normal text-xs text-[#111111]/60">5 stars</span>
              <div className="flex-1 h-1 bg-[#E5E0D8] rounded relative">
                <div className="absolute left-0 top-0 h-full bg-[#2E9DA7] rounded" style={{ width: "85%" }} />
              </div>
            </div>

            {/* 4 stars */}
            <div className="flex flex-row items-center gap-2.5 w-full">
              <span className="w-[41px] text-left font-poppins font-normal text-xs text-[#111111]/60">4 stars</span>
              <div className="flex-1 h-1 bg-[#E5E0D8] rounded relative">
                <div className="absolute left-0 top-0 h-full bg-[#2E9DA7] rounded" style={{ width: "10%" }} />
              </div>
            </div>

            {/* 3 stars */}
            <div className="flex flex-row items-center gap-2.5 w-full">
              <span className="w-[41px] text-left font-poppins font-normal text-xs text-[#111111]/60">3 stars</span>
              <div className="flex-1 h-1 bg-[#E5E0D8] rounded relative">
                <div className="absolute left-0 top-0 h-full bg-[#2E9DA7] rounded" style={{ width: "3%" }} />
              </div>
            </div>

            {/* 2 stars */}
            <div className="flex flex-row items-center gap-2.5 w-full">
              <span className="w-[41px] text-left font-poppins font-normal text-xs text-[#111111]/60">2 stars</span>
              <div className="flex-1 h-1 bg-[#E5E0D8] rounded relative">
                <div className="absolute left-0 top-0 h-full bg-[#2E9DA7] rounded" style={{ width: "1%" }} />
              </div>
            </div>

            {/* 1 star */}
            <div className="flex flex-row items-center gap-2.5 w-full">
              <span className="w-[41px] text-left font-poppins font-normal text-xs text-[#111111]/60">1 stars</span>
              <div className="flex-1 h-1 bg-[#E5E0D8] rounded relative">
                <div className="absolute left-0 top-0 h-full bg-[#2E9DA7] rounded" style={{ width: "1%" }} />
              </div>
            </div>

          </div>

        </div>

        {/* Reviews List */}
        <div className="box-sizing-border-box flex flex-col items-start p-5 gap-5 w-full border border-[#111111]/60 rounded-[12px] bg-white">
          {filteredReviews.length === 0 ? (
            <div className="w-full text-center text-sm text-[#5F5E5A] py-10">No reviews found.</div>
          ) : (
            filteredReviews.map((review, index) => (
              <div key={review.id} className="w-full flex flex-col gap-3">
                
                {/* Header Row */}
                <div className="flex flex-row justify-between items-center w-full">
                  <div className="flex flex-row items-center gap-2 text-[#5F5E5A] text-sm">
                    <HugeiconsIcon icon={InformationCircleIcon} className="w-4 h-4 text-[#111111]/60" />
                    <span className="font-poppins font-normal text-base leading-[18px]">
                      Booking ID: {review.bookingId}
                    </span>
                  </div>
                  <span className="font-poppins font-normal text-[12px] leading-[20px] text-[#111111]/60 text-right">
                    {review.date}
                  </span>
                </div>

                {/* Client Profile details */}
                <div className="flex flex-row items-center gap-5 w-full">
                  <div className="flex flex-row items-center gap-1.5 h-10">
                    <img 
                      src={review.clientAvatar || "/img/dumyUser.jpeg"} 
                      alt={review.clientName} 
                      className="w-7 h-7 rounded-full object-cover" 
                    />
                    <div className="flex flex-col justify-center items-start">
                      <span className="font-poppins font-normal text-[12px] leading-[20px] text-[#111111]">{review.clientName}</span>
                      <span className="font-poppins font-normal text-[12px] leading-[20px] text-[#666666]">{review.clientRole}</span>
                    </div>
                  </div>
                </div>

                {/* Comment Text */}
                <p className="font-poppins font-normal text-sm leading-[20px] text-[#111111]/60 w-full text-left">
                  {review.comment}
                </p>

                {/* Separator line */}
                {index < filteredReviews.length - 1 && (
                  <div className="w-full border-b border-[#111111]/40 my-3" />
                )}

              </div>
            ))
          )}
        </div>

      </div>
    
      </div></main>
  );
}
