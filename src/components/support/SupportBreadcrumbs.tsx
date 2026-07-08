"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon, ArrowRight02Icon } from "@hugeicons/core-free-icons";

interface SupportBreadcrumbsProps {
  setActiveTab: (tab: string) => void;
}

export default function SupportBreadcrumbs({ setActiveTab }: SupportBreadcrumbsProps) {
  return (
    <div className="flex items-center gap-3 select-none">
      <button 
        type="button"
        onClick={() => setActiveTab("Dashboard")}
        className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-neutral-500 hover:text-neutral-900 font-poppins"
      >
        <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4 text-neutral-600 shrink-0" />
        <span>Dashboard</span>
      </button>
      <span className="text-neutral-400 font-poppins text-xs font-semibold select-none">&gt;</span>
      <span className="text-xs font-semibold text-[#1C1C1A] font-poppins">Contact Support</span>
    </div>
  );
}
