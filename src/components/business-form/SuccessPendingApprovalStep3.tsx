"use client";

import Link from "next/link";
import React from "react";

export interface SuccessPendingApprovalStep3Props {
  onGoToDashboard: () => void;
}

export default function SuccessPendingApprovalStep3({
  onGoToDashboard,
}: SuccessPendingApprovalStep3Props) {
  return (
    <div className="w-full max-w-[661px] min-h-[338px] flex flex-col items-center justify-center gap-10 px-4 md:px-0">
      {/* Auto layout container */}
      <div className="w-full flex flex-col items-center gap-6">
        {/* Tick Button Wrapper */}
        <div className="w-[76px] h-[76px] bg-[linear-gradient(0deg,rgba(12,192,223,0.2),rgba(12,192,223,0.2)),#8EBAC5]  rounded-full flex items-center justify-center">
          <img
            src="/Icons/acceptBtn.svg"
            alt="Success Tick"
            className="w-12 h-12 object-contain"
          />
        </div>

        {/* Title */}
        <h2 className="w-full text-[24px] sm:text-[28px] font-medium text-[#262626] leading-[36px] text-center">
          Account created — pending approval
        </h2>

        {/* Description */}
        <p className="w-full text-[16px] sm:text-[18px] font-normal text-black leading-[30px] text-center max-w-[661px]">
          Welcome to <a href="https://bookly.cy/" className=" cursor-pointer">Bookly.cy</a>. Your account has been created and is currently under review. We will be in touch within 48 hours to complete your setup and get you live.
        </p>
      </div>

      {/* Action Button */}
      <button
        type="button"
        onClick={onGoToDashboard}
        className="w-[176.13px] h-[48px] bg-[#8EBAC5] rounded-xl flex items-center justify-center text-base font-medium text-[#111111] hover:scale-105 transition-all duration-150 active:scale-95  cursor-pointer"
      >
        Go to Dashboard
      </button>
    </div>
  );
}
