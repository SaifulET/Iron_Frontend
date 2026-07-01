"use client";

import React, { useRef, useState, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Clock01Icon,
  File01Icon,
  ReloadIcon,
  Store01Icon,
  Chat01Icon,
  Location05Icon,
  Tick01Icon
} from "@hugeicons/core-free-icons";

export default function AboutPromise() {
  const promiseRef = useRef<HTMLDivElement | null>(null);
  const [promiseVisible, setPromiseVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setPromiseVisible(entry.isIntersecting);
    }, { threshold: 0.1 });

    if (promiseRef.current) observer.observe(promiseRef.current);
    return () => {
      if (promiseRef.current) observer.unobserve(promiseRef.current);
    };
  }, []);

  return (
    <section ref={promiseRef} className="w-full py-24 px-4 md:px-8 xl:px-[68px] bg-transparent flex flex-col items-center">
      {/* Badge */}
      <div className={`flex flex-row items-center justify-center px-[15px] h-[31px] bg-[#E9F7F2] rounded-full gap-2 mb-4 transition-all duration-700 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <HugeiconsIcon icon={Tick01Icon} className="w-[14px] h-[14px] text-[#3D6259] shrink-0" />
        <span className="font-poppins font-normal text-sm text-[#3D6259] leading-none select-none">Our promise</span>
      </div>

      {/* Section Header */}
      <div className={`flex flex-col items-center text-center gap-4 max-w-[672px] mb-16 transition-all duration-700 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <h2 className="font-poppins font-medium text-[30px] leading-[34px] text-[#111111]">
          What you can always count on
        </h2>
        <p className="font-poppins font-normal text-base text-[#555555] leading-[25px]">
          Whether you are a customer or a business, here is what Bookly.cy promises to you.
        </p>
      </div>

      {/* Grid Layout: 3 columns on lg, animated cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-[1280px] items-stretch">
        {/* Card 1: Instant confirmation */}
        <div 
          style={{ transitionDelay: promiseVisible ? "0ms" : "0ms" }}
          className={`flex flex-col items-start p-6 gap-4 bg-white border border-[#E5E2E1] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:border-[#2E9DA7]/30 hover:duration-300 transition-all duration-1000 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="w-[76px] h-[76px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={Clock01Icon} className="w-9 h-9 text-[#0C0C0C]" />
          </div>
          <h3 className="font-manrope font-bold text-2xl text-[#020305]">
            Instant confirmation
          </h3>
          <p className="font-manrope font-normal text-[16px] leading-[26px] text-[#45474B]">
            No phone calls, no waiting. Your slot is secured the moment you book.
          </p>
        </div>

        {/* Card 2: Transparent pricing */}
        <div 
          style={{ transitionDelay: promiseVisible ? "150ms" : "0ms" }}
          className={`flex flex-col items-start p-6 gap-4 bg-white border border-[#E5E2E1] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:border-[#2E9DA7]/30 hover:duration-300 transition-all duration-1000 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="w-[76px] h-[76px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={File01Icon} className="w-9 h-9 text-[#0C0C0C]" />
          </div>
          <h3 className="font-manrope font-bold text-2xl text-[#020305]">
            Transparent pricing
          </h3>
          <p className="font-manrope font-normal text-[16px] leading-[26px] text-[#45474B]">
            What you pay is the service price. Cancellation and deposit policies are set by each business, and clearly shown before you confirm.
          </p>
        </div>

        {/* Card 3: Return visits, zero deposit */}
        <div 
          style={{ transitionDelay: promiseVisible ? "300ms" : "0ms" }}
          className={`flex flex-col items-start p-6 gap-4 bg-white border border-[#E5E2E1] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:border-[#2E9DA7]/30 hover:duration-300 transition-all duration-1000 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="w-[76px] h-[76px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={ReloadIcon} className="w-9 h-9 text-[#141B34]" />
          </div>
          <h3 className="font-manrope font-bold text-2xl text-[#020305]">
            Return visits, zero deposit
          </h3>
          <p className="font-manrope font-normal text-[16px] leading-[26px] text-[#45474B]">
            Come back to a business you love? No deposit needed. Your loyalty is rewarded from your very second visit.
          </p>
        </div>

        {/* Card 4: Free to list your business */}
        <div 
          style={{ transitionDelay: promiseVisible ? "100ms" : "0ms" }}
          className={`flex flex-col items-start p-6 gap-4 bg-white border border-[#E5E2E1] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:border-[#2E9DA7]/30 hover:duration-300 transition-all duration-1000 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={Store01Icon} className="w-9 h-9 text-[#141B34]" />
          </div>
          <h3 className="font-manrope font-bold text-2xl text-[#020305]">
            Free to list your business
          </h3>
          <p className="font-manrope font-normal text-[16px] leading-[26px] text-[#45474B]">
            No upfront cost to get started. We take a small on-platform transaction fee, or you can opt for flat pricing once you grow.
          </p>
        </div>

        {/* Card 5: Real reviews only */}
        <div 
          style={{ transitionDelay: promiseVisible ? "250ms" : "0ms" }}
          className={`flex flex-col items-start p-6 gap-4 bg-white border border-[#E5E2E1] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:border-[#2E9DA7]/30 hover:duration-300 transition-all duration-1000 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={Chat01Icon} className="w-9 h-9 text-[#141B34]" />
          </div>
          <h3 className="font-manrope font-bold text-2xl text-[#020305]">
            Real reviews only
          </h3>
          <p className="font-manrope font-normal text-[16px] leading-[26px] text-[#45474B]">
            Only customers who actually booked through Bookly can leave a review. Every rating is earned, not given.
          </p>
        </div>

        {/* Card 6: Proudly local */}
        <div 
          style={{ transitionDelay: promiseVisible ? "400ms" : "0ms" }}
          className={`flex flex-col items-start p-6 gap-4 bg-white border border-[#E5E2E1] rounded-2xl shadow-sm hover:shadow-md hover:-translate-y-1.5 hover:border-[#2E9DA7]/30 hover:duration-300 transition-all duration-1000 ease-out ${promiseVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        >
          <div className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
            <HugeiconsIcon icon={Location05Icon} className="w-9 h-9 text-[#0C0C0C]" />
          </div>
          <h3 className="font-manrope font-bold text-2xl text-[#020305]">
            Proudly local
          </h3>
          <p className="font-manrope font-normal text-[16px] leading-[26px] text-[#45474B]">
            Built exclusively for Cyprus. Every feature, every decision is made with the Cyprus market in mind.
          </p>
        </div>
      </div>
    </section>
  );
}
