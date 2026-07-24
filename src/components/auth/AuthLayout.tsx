"use client";

import React from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft02Icon } from "@hugeicons/core-free-icons";

interface AuthLayoutProps {
  children: React.ReactNode;
  onBack?: () => void;
  showBack?: boolean;
  imageSrc?: string;
}

export default function AuthLayout({
  children,
  onBack,
  showBack = true,
  imageSrc = "/img/authImg.png",
}: AuthLayoutProps) {
  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FAFAFA] font-poppins antialiased">
      {/* Left side: Content / Form */}
      <div className="flex flex-col justify-between w-full lg:w-[50%] min-h-screen p-6 sm:p-10 md:p-16 bg-[#FAFAFA]">
        {/* Header navigation */}
        <div className="flex items-center justify-between w-full mb-6 min-h-[48px]">
          {showBack ? (
            <button
              onClick={onBack}
              className="flex items-center justify-center w-12 h-12 rounded-full border border-[#EBE8FF] bg-white text-[#1C1B1F] shadow-sm hover:bg-[#F5F3FF] transition duration-200 cursor-pointer"
              aria-label="Go back"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} size={20} className="text-[#1A1A1A]" />
            </button>
          ) : (
            <div className="w-12 h-12" />
          )}

          {/* Top Logo */}
          <div className="flex-1 flex justify-center">
            <Image
              src="/img/logo.png"
              alt="Bookly Logo"
              width={195}
              height={53}
              priority
              className="object-contain"
            />
          </div>
          <div className="w-12 h-12" />
        </div>

        {/* Dynamic content center */}
        <div className="flex-1 flex flex-col items-center justify-center w-full my-auto">
          {children}
        </div>

        {/* Footer padding / indicator */}
        <div className="text-center text-xs text-[#9E9E9E] mt-8">
          &copy; {new Date().getFullYear()} Bookly. All rights reserved.
        </div>
      </div>

      {/* Right side: Splendid background image for desktop */}
      <div className="hidden lg:block lg:w-[50%] relative min-h-screen">
        <Image
          src={imageSrc}
          alt="Bookly Authentication Cover"
          fill
          priority
          sizes="50vw"
          className="object-cover"
        />
        {/* Subtle decorative overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 via-transparent to-transparent pointer-events-none" />
      </div>
    </div>
  );
}
