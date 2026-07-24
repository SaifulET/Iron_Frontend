"use client";

import React from "react";

interface Category {
  title: string;
  desc: string;
  image: string;
}

interface ListYourBusinessBuiltForCyprusProps {
  categoriesContainerRef: React.RefObject<HTMLDivElement | null>;
  categoriesVisible: boolean;
  onGetStartedClick: () => void;
  businessCategories: Category[];
}

export default function ListYourBusinessBuiltForCyprus({
  categoriesContainerRef,
  categoriesVisible,
  onGetStartedClick,
  businessCategories
}: ListYourBusinessBuiltForCyprusProps) {
  return (
    <section ref={categoriesContainerRef} className="w-full max-w-[1312px] mx-auto px-4 md:px-8 mt-24">
      <div className="flex flex-col items-center text-center gap-4 mb-12">
        <h2 className="text-3xl md:text-[40px] font-medium tracking-tight text-[#16123E] leading-tight font-poppins">
          Built for Cyprus. Built for your business.
        </h2>
        <p className="text-base md:text-[20px] font-normal leading-relaxed text-[#757575] max-w-[850px] font-poppins">
          Everything you need to take bookings, protect your revenue, and grow — without the monthly fees.
        </p>

        <button
          onClick={onGetStartedClick}
          className="mt-2 flex flex-row items-center justify-center py-2.5 px-6 gap-[8px] bg-[#141414] hover:bg-black text-white rounded-full transition-all active:scale-95 cursor-pointer font-inter font-semibold text-[15px]"
        >
          <span>Get started now</span>
          <svg
            className="w-[16px] h-[16px] text-white shrink-0"
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

      {/* 3x3 responsive grid showing categories */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full items-stretch">
        {businessCategories.map((cat, idx) => (
          <div
            key={idx}
            style={{ transitionDelay: `${idx * 50}ms` }}
            className={`group flex flex-col bg-white border border-[#E8E6FF] rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-2 hover:scale-[1.02] hover:border-[#2E9DA7]/25 transition-all duration-300 ease-in-out ${categoriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="w-full relative h-[200px] overflow-hidden bg-neutral-100">
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                draggable="false"
              />
            </div>
            <div className="p-6 flex flex-col gap-2">
              <h4 className="text-[18px] font-bold text-[#1C1B1C] font-poppins">{cat.title}</h4>
              <p className="text-[14px] leading-relaxed text-[#757575] font-poppins">{cat.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
