"use client";

import React from "react";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";

export default function ListYourBusinessAddHome() {
  return (
    <section className="w-full mt-[166px] mb-24 flex justify-center">
      <div className="w-full h-[320px] md:h-[400px] lg:h-[449px] xl:h-[484px] bg-[#2E9DA7] relative overflow-visible z-10">

        {/* Left Side: Content */}
        <div className="absolute left-[37px] top-[38px] xl:left-[141px] text-white z-10 flex flex-col items-start gap-2.5 sm:gap-4 md:gap-5 max-w-[calc(100%-140px)] lg:max-w-[636px] add-home-screen-content-wrapper">
          <h2 className="add-home-screen-title sm:text-[32px] lg:text-[54px] lg:leading-[64px] font-poppins font-medium text-[#FCFAF9] tracking-tight">
            Add Bookly to your <br /> home screen
          </h2>

          {/* Subtitle tick frame */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="add-home-screen-subtitle sm:text-base md:text-[18px] md:leading-[26px] font-poppins font-medium text-[#FCFAF9]">
              Book any local services instantly
            </span>
            <div className="w-6 h-6 border-[1.5px] border-[#FCFAF9] rounded-full flex items-center justify-center shrink-0 add-home-screen-check-icon">
              <svg className="w-3.5 h-3.5 text-[#FCFAF9]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Install Button Container */}
        <div className="absolute left-[150px] xl:left-[378px] top-[250px] xl:top-[347px] z-20 add-home-screen-btn-container">
          <AddToHomeScreenButton
            className="z-10 scale-75 xl:scale-100 origin-left add-home-screen-btn"
            showTextOnMobile={true}
            size="large"
          />
        </div>

        {/* Curved Arrow Image */}
        <div className="absolute left-[120px] xl:left-[256px] top-[215px] xl:top-[245px] w-[36px] xl:w-[114px] h-[40px] xl:h-[151px] pointer-events-none opacity-95 z-20 add-home-screen-arrow-icon">
          <img
            src="/Icons/direction.png"
            alt="Direction Arrow"
            className="w-full h-full object-contain"
            draggable="false"
          />
        </div>

        {/* Right Side: Phone Image mockup (Desktop) */}
        <div className="absolute right-[16px] md:right-[20px] lg:right-[100px] z-0 sm:z-20 pointer-events-none mockup-container-fixed">
          <div className="relative w-full h-full flex items-center justify-center">
            <div
              className="absolute pointer-events-none -z-10 opacity-90"
              style={{
                width: "244.85px",
                height: "478.55px",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%) rotate(6.83deg)",
                background: "rgba(255, 255, 255, 0.8)",
                filter: "blur(100px)",
              }}
            />

            <img
              src="/img/mobile.png"
              alt="Bookly App Mockup"
              style={{
                transform: "rotate(6.83deg)"
              }}
              className="object-fill z-10 max-w-none mockup-image-fixed"
              draggable="false"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
