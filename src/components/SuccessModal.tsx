"use client";

import React from "react";
import Image from "next/image";

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  onContinue?: () => void;
}

export default function SuccessModal({
  isOpen,
  onClose,
  onContinue,
}: SuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#FAFAFA]/90 backdrop-blur-[6px] transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="w-full max-w-[480px] bg-white border border-[#E8E6FF] rounded-[24px] p-8 sm:p-10 shadow-[0_16px_40px_rgba(36,1,131,0.06)] relative z-10 flex flex-col items-center text-center">
        {/* Success Icon */}
        <div className="relative w-20 h-20 mb-6 flex items-center justify-center rounded-full bg-[#EBF8FF] overflow-hidden">
          <Image
            src="/Icons/acceptBtn.svg"
            alt="Success Icon"
            width={80}
            height={80}
            className="object-contain"
          />
        </div>

        {/* Text Details */}
        <h2 className="text-2xl font-bold text-[#1A1A1A] mb-2">
          Successfully Created
        </h2>
        <p className="text-sm text-[#707070] leading-relaxed mb-8 max-w-[320px]">
          Welcome to Bookly! Discover, book, and enjoy local services!
        </p>

        {/* Go to Dashboard or Close button */}
        <button
          onClick={onContinue || onClose}
          className="w-full h-12 bg-[#1A1A1A] hover:bg-black text-white font-semibold rounded-xl text-sm transition-all duration-200 cursor-pointer"
        >
          Let&apos;s get started
        </button>
      </div>
    </div>
  );
}
