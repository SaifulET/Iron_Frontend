"use client";

import React, { useState, useRef, useEffect } from "react";

interface CarouselProps {
  children: React.ReactNode;
  gapClass?: string;
}

export default function Carousel({ children, gapClass = "gap-6" }: CarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkArrowsVisibility = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    // Show left arrow if scrolled more than 10px
    setShowLeftArrow(scrollLeft > 10);
    // Show right arrow if there is more content to scroll to the right
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 10);
  };

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    
    // Check initial visibility
    checkArrowsVisibility();
    
    // Event listener for scroll
    el.addEventListener("scroll", checkArrowsVisibility);
    // Also check on resize
    window.addEventListener("resize", checkArrowsVisibility);
    
    // Set a timer to check again after render cycles have completed
    const timer = setTimeout(checkArrowsVisibility, 500);
    
    return () => {
      el.removeEventListener("scroll", checkArrowsVisibility);
      window.removeEventListener("resize", checkArrowsVisibility);
      clearTimeout(timer);
    };
  }, [children]);

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

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const offset = direction === "left" ? -380 : 380;
    scrollRef.current.scrollBy({ left: offset, behavior: "smooth" });
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow Button */}
      {showLeftArrow && (
        <button
          type="button"
          onClick={() => scroll("left")}
          className="absolute left-[-20px] md:left-[-24px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Previous slide"
        >
          <svg className="w-5 h-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Right Arrow Button */}
      {showRightArrow && (
        <button
          type="button"
          onClick={() => scroll("right")}
          className="absolute right-[-20px] md:right-[-24px] top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white shadow-[0_4px_12px_rgba(0,0,0,0.12)] border border-neutral-100 flex items-center justify-center hover:bg-neutral-50 hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer"
          aria-label="Next slide"
        >
          <svg className="w-5 h-5 text-neutral-800" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Scrollable Container */}
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
    </div>
  );
}
