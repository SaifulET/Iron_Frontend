"use client";

import React from "react";
import NotificationBell from "@/components/notifications/NotificationBell";

export default function SupportHeader() {
  return (
    <div className="h-20 bg-[#FCF8F8] px-6 md:px-8 flex items-center justify-between shrink-0 select-none">
      <div className="flex flex-col gap-0.5 self-stretch justify-center">
        <h1 className="font-poppins font-medium text-base leading-6 text-[#0F1E35] self-stretch grow-0">
          Contact Supppoert
        </h1>
        <p className="font-poppins font-normal text-xs leading-[18px] text-[#6B7280] grow-0">
          Wednesday, 27 May 2026 · Good morning, Elena
        </p>
      </div>
      <NotificationBell />
    </div>
  );
}
