"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

export default function SuperAdminAttentionSection() {
  const cards = [
    {
      title: "Pending Applications",
      value: "5",
      sub: "Glam Studio Nicosia +5 more awaiting review",
      linkText: "Review",
      bg: "bg-[#FFF2EB]",
      textColor: "text-[#E05E2B]"
    },
    {
      title: "Flagged Businesses",
      value: "3",
      sub: "TopCut Barbers +5 more Businesses flagged",
      linkText: "Review",
      bg: "bg-[#FFEBEB]",
      textColor: "text-[#E24B4A]"
    },
    {
      title: "Unread Support Messages",
      value: "12",
      sub: "You have messages that needs attention",
      linkText: "Open inbox",
      bg: "bg-[#EEF2FF]",
      textColor: "text-[#4338CA]"
    },
    {
      title: "Pending Payouts",
      value: "8",
      sub: "18 Business due 1 July 2026",
      linkText: "Process",
      bg: "bg-[#FEF9C3]/70",
      textColor: "text-[#854D0E]"
    }
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      <h3 className="font-sans font-semibold text-2xl text-[#111827] leading-[32px]">
        Needs your attention
      </h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 w-full">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`${card.bg} rounded-xl p-5 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] flex flex-col justify-between min-h-[177px]`}
          >
            <div className="flex flex-col gap-2">
              <span className="font-sans font-medium text-[13px] text-gray-500 leading-4">{card.title}</span>
              <span className={`font-sans font-bold text-32px leading-[35px] ${card.textColor}`}>{card.value}</span>
              <span className="font-sans font-normal text-xs text-gray-500 leading-4">{card.sub}</span>
            </div>

            <button className="flex items-center gap-1.5 text-xs font-semibold text-[#195156] mt-4 hover:underline self-start">
              <span>{card.linkText}</span>
              <HugeiconsIcon icon={ArrowRight02Icon} className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
