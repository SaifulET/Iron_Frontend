"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowRight02Icon } from "@hugeicons/core-free-icons";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  selected: boolean;
  onClick: () => void;
}

export default function RoleCard({
  title,
  description,
  icon,
  selected,
  onClick,
}: RoleCardProps) {
  return (
    <div
      onClick={onClick}
      className={`flex items-center justify-between w-full max-w-[818px] p-6 rounded-2xl border-2 transition-all duration-300 cursor-pointer ${
        selected
          ? "border-[#1A1A1A] bg-white shadow-sm"
          : "border-[#EBE8FF] bg-[#FCFCFD] hover:border-[#DAD6FF] hover:bg-white"
      }`}
    >
      <div className="flex items-center gap-5">
        <div
          className={`flex items-center justify-center w-14 h-14 rounded-xl transition-colors duration-300 ${
            selected ? "bg-[#F5F3FF] text-[#240183]" : "bg-[#F5F5F7] text-[#9E9E9E]"
          }`}
        >
          {icon}
        </div>
        <div className="flex flex-col text-left">
          <h3
            className={`text-lg font-semibold transition-colors duration-300 ${
              selected ? "text-[#1A1A1A]" : "text-[#707070]"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-sm transition-colors duration-300 ${
              selected ? "text-[#707070]" : "text-[#9E9E9E]"
            }`}
          >
            {description}
          </p>
        </div>
      </div>
      <HugeiconsIcon
        icon={ArrowRight02Icon}
        size={24}
        className={`transition-colors duration-300 ${
          selected ? "text-[#1A1A1A]" : "text-[#C2C2C2]"
        }`}
      />
    </div>
  );
}
