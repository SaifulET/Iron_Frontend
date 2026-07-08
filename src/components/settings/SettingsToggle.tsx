import React from "react";

interface SettingsToggleProps {
  title: string;
  subtitle: string;
  checked: boolean;
  onChange: (val: boolean) => void;
}

export const SettingsToggle: React.FC<SettingsToggleProps> = ({
  title,
  subtitle,
  checked,
  onChange
}) => (
  <div className="flex items-center justify-between py-2.5 border-b border-neutral-100 last:border-b-0">
    <div className="flex flex-col">
      <span className="font-semibold text-sm text-[#111111]">{title}</span>
      <span className="text-xs text-neutral-400">{subtitle}</span>
    </div>
    <button
      onClick={() => onChange(!checked)}
      className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
        checked ? "bg-[#2E9DA7]" : "bg-neutral-300"
      }`}
    >
      <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
        checked ? "translate-x-5" : ""
      }`} />
    </button>
  </div>
);
