"use client";

import React from "react";

interface PhotosSectionProps {
  photos: string[];
}

export default function PhotosSection({ photos }: PhotosSectionProps) {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex justify-between items-center w-full">
        <span className="font-poppins text-xs font-semibold text-[#111111] uppercase tracking-wide">Photos</span>
        <button type="button" className="text-xs font-semibold hover:underline">See all</button>
      </div>

      <div className="flex flex-col gap-4 w-full">
        {/* Upload Button container */}
        <div className="flex justify-end">
          <button type="button" className="h-9 px-4 bg-[#111111] text-white rounded-lg text-xs font-semibold hover:bg-black transition-colors">
            Upload Images
          </button>
        </div>

        {/* Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full relative">
          {photos.map((src, idx) => (
            <div key={idx} className="relative aspect-[4/3] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100 group">
              <img src={src} className="w-full h-full object-cover" alt={`Business photo ${idx + 1}`} />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button type="button" className="p-1.5 bg-white text-[#111111] rounded-lg text-xs font-semibold hover:scale-105 transition-transform">
                  Preview
                </button>
                <button type="button" className="p-1.5 bg-red-600 text-white rounded-lg text-xs font-semibold hover:scale-105 transition-transform">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
