"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ZapIcon, HeartIcon, StarIcon, Wallet03Icon } from "@hugeicons/core-free-icons";

export default function WhyChooseUs() {
  const steps = [
    {
      icon: ZapIcon,
      title: "Instant Confirmation",
      description: "No phone calls, no waiting. Your slot is secured the moment you book.",
    },
    {
      icon: HeartIcon,
      title: "Welcome Back Perks",
      description: "Returning to a business you love? No deposit needed. Your loyalty is rewarded from your very second visit.",
    },
    {
      icon: StarIcon,
      title: "Real Businesses, Real Reviews",
      description: "Only customers who actually booked through Bookly can leave a review. Every rating is earned, not given.",
    },
    {
      icon: Wallet03Icon,
      title: "Always Free to Use",
      description: "No subscription, no hidden fees. The small deposit you pay on your first booking at each business? It comes straight off your final bill. You never pay more than the service price.",
    },
  ];

  return (
    <section className="w-full px-4 md:px-8 xl:px-[68px] mt-[120px] mb-0">
      <div className="w-full flex flex-col items-center gap-10 md:gap-[40px]">
        {/* Header Container */}
        <div className="flex flex-col items-center gap-5 text-center max-w-[553px]">
          <h2 className="text-3xl md:text-[36px] font-medium leading-tight md:leading-[48px] text-[#16123E] tracking-tight">
            Why customers choose Bookly
          </h2>
          <p className="text-lg md:text-[24px] font-normal leading-[32px] text-[#757575]">
            Built around your experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full items-stretch">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex flex-col items-start p-5 gap-10 bg-white rounded-xl hover:shadow-sm transition-shadow duration-200"
            >
              {/* Icon Container */}
              <div className="w-[68px] h-[68px] bg-[#2E9DA7] rounded-xl flex items-center justify-center shrink-0">
                <HugeiconsIcon icon={step.icon} className="w-9 h-9 text-[#111111]" />
              </div>

              {/* Text Area */}
              <div className="flex flex-col gap-5 flex-1 w-full">
                <h3 className="text-[24px] font-medium leading-[32px] text-[#212121] tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[14px] font-normal leading-[22px] text-[#757575]">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
