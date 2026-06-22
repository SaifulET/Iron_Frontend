"use client";

import React from "react";

interface AuthCardProps {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function AuthCard({
  title,
  subtitle,
  children,
  className = "",
}: AuthCardProps) {
  return (
    <div
      className={`w-full max-w-[600px] bg-white border border-[#E8E6FF] rounded-[24px] p-6 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] ${className}`}
    >
      <div className="flex flex-col mb-8 text-left">
        <h2 className="text-[28px] font-semibold text-[#1A1A1A] tracking-tight leading-tight mb-2">
          {title}
        </h2>
        {subtitle && (
          <p className="text-sm text-[#707070] leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
