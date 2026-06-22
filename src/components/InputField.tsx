"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { EyeIcon, ViewOffIcon, ArrowDown01Icon } from "@hugeicons/core-free-icons";
import Image from "next/image";

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon?: React.ReactNode;
  isPassword?: boolean;
  error?: string;
  helperText?: string;
}

export function InputField({
  label,
  icon,
  isPassword = false,
  error,
  helperText,
  className = "",
  ...props
}: InputFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className={`flex flex-col gap-2 w-full max-w-[520px] ${className}`}>
      <label className="text-[13px] font-semibold text-[#1A1A1A] tracking-wide">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        {icon && (
          <div className="absolute left-4 text-[#707070] flex items-center justify-center pointer-events-none">
            {icon}
          </div>
        )}
        <input
          type={isPassword ? (showPassword ? "text" : "password") : props.type}
          className={`w-full h-12 bg-[#F5F5F7] text-sm text-[#1A1A1A] placeholder-[#9E9E9E] rounded-xl px-4 transition-all duration-200 border border-transparent focus:bg-white focus:border-[#240183] focus:outline-none disabled:bg-[#EAEAEA] disabled:text-[#8E8E8E] ${
            icon ? "pl-12" : ""
          } ${isPassword ? "pr-12" : ""}`}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 text-[#707070] hover:text-[#240183] transition-colors focus:outline-none cursor-pointer"
          >
            {showPassword ? (
              <HugeiconsIcon icon={EyeIcon} size={20} />
            ) : (
              <HugeiconsIcon icon={ViewOffIcon} size={20} />
            )}
          </button>
        )}
      </div>
      {helperText && !error && (
        <span className="text-[11px] text-[#707070] pl-1">{helperText}</span>
      )}
      {error && <span className="text-xs text-red-500 pl-1">{error}</span>}
    </div>
  );
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: { value: string; label: string }[];
  error?: string;
}

export function SelectField({
  label,
  options,
  error,
  className = "",
  ...props
}: SelectFieldProps) {
  return (
    <div className={`flex flex-col gap-2 w-full max-w-[520px] ${className}`}>
      <label className="text-[13px] font-semibold text-[#1A1A1A] tracking-wide">
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <select
          className="w-full h-12 bg-[#F5F5F7] text-sm text-[#1A1A1A] rounded-xl px-4 pr-10 border border-transparent focus:bg-white focus:border-[#240183] focus:outline-none appearance-none transition-all duration-200 cursor-pointer"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 text-[#707070] pointer-events-none flex items-center justify-center">
          <HugeiconsIcon icon={ArrowDown01Icon} size={18} />
        </div>
      </div>
      {error && <span className="text-xs text-red-500 pl-1">{error}</span>}
    </div>
  );
}

interface PhoneInputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  countryCode: string;
  onCountryCodeChange?: (code: string) => void;
  error?: string;
}

export function PhoneInputField({
  label,
  countryCode,
  onCountryCodeChange,
  error,
  className = "",
  ...props
}: PhoneInputFieldProps) {
  return (
    <div className={`flex flex-col gap-2 w-full max-w-[520px] ${className}`}>
      <label className="text-[13px] font-semibold text-[#1A1A1A] tracking-wide">
        {label}
      </label>
      <div className="flex gap-2 w-full">
        {/* Country selector */}
        <div className="relative flex items-center bg-[#F5F5F7] rounded-xl border border-transparent focus-within:bg-white focus-within:border-[#240183] px-3 h-12 transition-all duration-200">
          <div className="flex items-center gap-1.5 cursor-pointer">
            <Image
              src={countryCode === "+880" ? "https://flagcdn.com/w20/bd.png" : "https://flagcdn.com/w20/us.png"}
              loader={({ src }) => src}
              unoptimized
              alt="Country Flag"
              width={20}
              height={15}
              className="rounded-sm object-cover w-5 h-3.5"
            />
            <span className="text-sm font-medium text-[#1A1A1A]">{countryCode}</span>
            <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="text-[#707070]" />
          </div>
          {/* Transparent select element overlay */}
          <select
            value={countryCode}
            onChange={(e) => onCountryCodeChange?.(e.target.value)}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
          >
            <option value="+880">Bangladesh (+880)</option>
            <option value="+1">United States (+1)</option>
            <option value="+44">United Kingdom (+44)</option>
            <option value="+357">Cyprus (+357)</option>
          </select>
        </div>

        {/* Input number field */}
        <input
          type="tel"
          className="flex-1 h-12 bg-[#F5F5F7] text-sm text-[#1A1A1A] placeholder-[#9E9E9E] rounded-xl px-4 transition-all duration-200 border border-transparent focus:bg-white focus:border-[#240183] focus:outline-none"
          {...props}
        />
      </div>
      {error && <span className="text-xs text-red-500 pl-1">{error}</span>}
    </div>
  );
}
