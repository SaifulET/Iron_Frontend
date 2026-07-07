"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Settings01Icon as LockIcon } from "@hugeicons/core-free-icons";

interface PayoutsBannerProps {
  protectedEarnings: string;
}

export default function PayoutsBanner({ protectedEarnings }: PayoutsBannerProps) {
  return (
    <div className="w-full bg-[#2E9DA7] shadow-[0px_1px_2px_rgba(20,30,60,0.08)] rounded-[16px] p-[28px] text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
      <div className="flex flex-col gap-2 max-w-[640px]">
        <div className="flex items-center gap-2 bg-[#FFFFFF]/15 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-[1.32px] uppercase w-fit">
          <HugeiconsIcon icon={LockIcon} className="w-4 h-4 text-white" />
          <span>Protected by Bookly</span>
        </div>
        <h2 className="text-xl md:text-[20px] font-semibold tracking-[-0.4px] leading-[30px] mt-1">
          Money you would have lost without us
        </h2>
        <p className="text-xs md:text-[13px] text-white/60 leading-[20px] font-medium max-w-[640px]">
          No-show and cancellation fees collected on your behalf since you joined. Without Bookly, this money would never have been recovered.
        </p>
      </div>

      <div className="flex flex-col items-start md:items-end text-white shrink-0">
        <span className="text-3xl md:text-[42px] font-semibold tracking-[-2.1px] leading-[42px] text-[#D1F66C]">
          {protectedEarnings}
        </span>
        <span className="text-[12px] text-white/85 mt-1 font-medium leading-[18px]">
          All time · protected earnings
        </span>
      </div>
    </div>
  );
}
