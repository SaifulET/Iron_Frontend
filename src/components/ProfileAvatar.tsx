"use client";

import React, { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Camera01Icon } from "@hugeicons/core-free-icons";

interface ProfileAvatarProps {
  avatarUrl: string;
  onAvatarChange: (newAvatar: string) => void;
  size?: number; // size in pixels (default 120)
  editable?: boolean;
}

export default function ProfileAvatar({
  avatarUrl,
  onAvatarChange,
  size = 120,
  editable = true,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        onAvatarChange(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col items-center p-0 gap-4 w-full md:w-[128px] shrink-0 font-poppins">
      {/* Overlay+Border+Shadow */}
      <div 
        className="box-border flex flex-col justify-center items-center p-0 bg-[rgba(255,255,255,0.002)] border-4 border-[#EBE7E7] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-full overflow-hidden"
        style={{ width: `${size + 8}px`, height: `${size + 8}px` }}
      >
        <img
          src={avatarUrl || "/img/authImg.png"}
          alt="Profile Avatar"
          className="rounded-full object-cover shrink-0"
          style={{ width: `${size}px`, height: `${size}px` }}
        />
      </div>

      {editable && (
        <>
          {/* Hidden File Input */}
          <input
            type="file"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            accept="image/*"
            className="hidden"
          />

          {/* Change Photo Button */}
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-row items-center justify-center p-0 gap-1 w-full hover:opacity-80 active:scale-95 transition-all cursor-pointer bg-transparent border-0 outline-none"
          >
            <HugeiconsIcon icon={Camera01Icon} size={14} className="text-[#111111]" />
            <span className="font-manrope font-medium text-sm leading-5 text-[#111111] whitespace-nowrap">
              Change Photo
            </span>
          </button>
        </>
      )}
    </div>
  );
}
