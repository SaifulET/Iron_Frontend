import React from "react";

interface SettingsInputProps {
  label: string;
  type?: string;
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export const SettingsInput: React.FC<SettingsInputProps> = ({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  disabled = false
}) => (
  <div className="flex flex-col gap-1 w-full">
    <span className="font-poppins font-semibold text-[10px] tracking-[0.8px] uppercase text-[#6B7280]">
      {label}
    </span>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      disabled={disabled}
      className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none disabled:bg-neutral-100"
    />
  </div>
);
