"use client";

import React, { useState, useRef } from "react";

interface CarouselProps {
  children: React.ReactNode;
  gapClass?: string;
}

export default function Carousel({ children, gapClass = "gap-6" }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDown(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDown(false);
  };

  const handleMouseUp = () => {
    setIsDown(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDown || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  return (
    <div
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
      className={`flex overflow-x-auto scrollbar-hide flex-nowrap w-full pb-4 items-stretch select-none ${gapClass} ${
        isDown ? "cursor-grabbing" : "cursor-grab snap-x snap-mandatory scroll-smooth"
      }`}
    >
      {children}
    </div>
  );
}
