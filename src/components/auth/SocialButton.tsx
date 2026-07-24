"use client";

import React from "react";
import Image from "next/image";

interface SocialButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  provider: "google" | "apple" | "facebook";
  label: string;
}

const providerConfig = {
  google: {
    icon: "/Icons/Google.svg",
    alt: "Google Icon",
  },
  apple: {
    icon: "/Icons/apple.svg",
    alt: "Apple Icon",
  },
  facebook: {
    icon: "/Icons/Facebook.svg",
    alt: "Facebook Icon",
  },
};

export default function SocialButton({
  provider,
  label,
  className = "",
  ...props
}: SocialButtonProps) {
  const { icon, alt } = providerConfig[provider];

  return (
    <button
      type="button"
      className={`flex items-center justify-center gap-3 w-full max-w-[520px] h-12 bg-[#F5F5F7] hover:bg-[#EBE8FF]/20 border border-transparent hover:border-[#DAD6FF] active:bg-[#EBE8FF]/50 rounded-xl text-sm font-medium text-[#1A1A1A] transition-all duration-200 cursor-pointer ${className}`}
      {...props}
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <Image
          src={icon}
          alt={alt}
          width={20}
          height={20}
          className="object-contain"
        />
      </div>
      <span>{label}</span>
    </button>
  );
}
