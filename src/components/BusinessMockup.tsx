"use client";

import React from "react";

export default function BusinessMockup() {
  return (
    <section className="w-full mt-[63px] mb-24 px-4 md:px-8 xl:px-0 relative overflow-hidden lg:overflow-visible">
      {/* Container holding both mockups */}
      <div className="max-w-[1100px] mx-auto relative flex items-center justify-center w-full aspect-[1.8/1] sm:aspect-[2.1/1]">

        {/* Mockups Wrapper */}
        <div className="relative w-full h-full flex items-center justify-center">
          
          {/* Big Tablet Mockup (Desktop Calendar View) */}
          <div className="w-[80%] md:w-[78%] h-auto transition-transform duration-500 hover:scale-[1.01] z-10 translate-x-[-6%]">
            <img
              src="/img/bigMobile.svg"
              alt="Bookly Calendar on Tablet"
              className="w-full h-auto object-contain"
              draggable="false"
            />
          </div>

          {/* Small Phone Mockup (Mobile Calendar View) */}
          <div className="absolute right-[5%] bottom-[-8%] w-[23%] md:w-[22%] h-auto z-20 transition-transform duration-500 hover:scale-105">
            <img
              src="/img/smallMobile.png"
              alt="Bookly Calendar on Mobile"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
              draggable="false"
            />
          </div>

          {/* White Light Glow Overlay in front of all (blends the lower portion of devices into page background) */}
          <img
            src="/img/light.svg"
            alt=""
            className="absolute left-[45%] -translate-x-1/2 bottom-[-35%] w-[110%] h-[55%] object-stretch pointer-events-none z-30"
            draggable="false"
          />

        </div>
      </div>

      {/* Cyprus Cities list at the bottom */}
      <div className="w-full max-w-[1100px] mx-auto mt-16 md:mt-30 flex flex-wrap items-center justify-center gap-y-4 gap-x-4 md:gap-x-8 text-[#2E9DA7] font-poppins font-medium text-sm sm:text-base md:text-[20px] tracking-[0.05em] uppercase select-none">
        <span>Larnaca</span>
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2E9DA7] shrink-0"></span>
        <span>Limassol</span>
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2E9DA7] shrink-0"></span>
        <span>Pafos</span>
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2E9DA7] shrink-0"></span>
        <span>Nicosia</span>
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2E9DA7] shrink-0"></span>
        <span>Ayia Napa</span>
        <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#2E9DA7] shrink-0"></span>
        <span>Protaras</span>
      </div>
    </section>
  );
}
