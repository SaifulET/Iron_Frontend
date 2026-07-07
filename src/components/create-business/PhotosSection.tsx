"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { MoreVerticalIcon, ViewIcon, Delete02Icon } from "@hugeicons/core-free-icons";

interface PhotosSectionProps {
  photos: string[];
  setPhotos: React.Dispatch<React.SetStateAction<string[]>>;
  onSeeAll: () => void;
}

export default function PhotosSection({ photos, setPhotos, onSeeAll }: PhotosSectionProps) {
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Close dropdown on click outside
  React.useEffect(() => {
    const handleOutsideClick = () => setActiveMenuIdx(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <div className="flex flex-col gap-3 w-full font-poppins">
      <div className="flex justify-between items-center w-full">
        <span className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-wide">Photos</span>
        <button 
          type="button" 
          onClick={onSeeAll}
          className="text-xs font-semibold hover:underline cursor-pointer"
        >
          See all
        </button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {/* Upload Button container */}
        <div className="flex justify-end">
          <button type="button" className="h-9 px-4 bg-[#111111] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors cursor-pointer">
            Upload Images
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full relative">
          {photos.map((src, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-visible border border-neutral-200 bg-neutral-100 group">
              <img src={src} className="w-full h-full object-cover rounded-xl" alt={`Business photo ${idx + 1}`} />
              
              {/* Circular 3-dot overlay button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveMenuIdx(activeMenuIdx === idx ? null : idx);
                }}
                className="absolute right-3 top-3 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md hover:bg-neutral-50 transition-all cursor-pointer z-10"
              >
                <HugeiconsIcon icon={MoreVerticalIcon} className="w-3.5 h-3.5 text-[#0C0C0C]" />
              </button>

              {/* Action Dropdown Menu */}
              {activeMenuIdx === idx && (
                <div 
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-3 top-10 bg-white border border-neutral-100 rounded-lg shadow-xl py-1 w-[140px] z-20"
                >
                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...photos];
                      const item = updated.splice(idx, 1)[0];
                      updated.unshift(item);
                      setPhotos(updated);
                      setActiveMenuIdx(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-50 border-b border-neutral-100/50 cursor-pointer block"
                  >
                    Make profile pic
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewImage(src);
                      setActiveMenuIdx(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-neutral-800 hover:bg-neutral-50 border-b border-neutral-100/50 flex items-center gap-2 cursor-pointer"
                  >
                    <HugeiconsIcon icon={ViewIcon} className="w-3.5 h-3.5 text-neutral-600" />
                    <span>View</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setPhotos(photos.filter((_, i) => i !== idx));
                      setActiveMenuIdx(null);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-medium text-red-600 hover:bg-red-50 flex items-center gap-2 cursor-pointer"
                  >
                    <HugeiconsIcon icon={Delete02Icon} className="w-3.5 h-3.5 text-red-600" />
                    <span>Delete</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Image Preview Lightbox */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 cursor-pointer" 
          onClick={() => setPreviewImage(null)}
        >
          <div className="relative max-w-3xl max-h-[80vh] bg-white p-2 rounded-xl" onClick={(e) => e.stopPropagation()}>
            <img src={previewImage} className="max-w-full max-h-[75vh] rounded-lg object-contain" />
            <button 
              type="button"
              onClick={() => setPreviewImage(null)}
              className="absolute -top-3 -right-3 w-8 h-8 bg-white hover:bg-neutral-100 rounded-full flex items-center justify-center shadow-lg font-bold text-sm text-neutral-800 cursor-pointer focus:outline-none"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
