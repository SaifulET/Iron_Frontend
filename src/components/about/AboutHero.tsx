import React from "react";

export default function AboutHero() {
  return (
    <section className="w-full flex justify-center px-4 md:px-8 xl:px-[68px] mt-6">
      <div className="w-full max-w-[1280px] h-[716px] min-h-[600px] relative rounded-[24px] overflow-hidden flex flex-col justify-center items-center">
        {/* Hero Image Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ backgroundImage: "url('/designImg/aboutPageHero.png')" }}
        />
        {/* Gradient Overlay */}
        <div 
          className="absolute inset-0 z-10"
          style={{ 
            background: "linear-gradient(0deg, #E5E2E1 0%, rgba(146, 146, 146, 0.4) 50.48%, rgba(252, 248, 248, 0) 100%)" 
          }}
        />

        {/* Hero Content Overlay */}
        <div className="relative z-20 flex flex-col items-center gap-6 max-w-[720px] text-center px-6">
          {/* Blurry glow background */}
          <div className="absolute w-[687px] h-[135px] left-1/2 -translate-x-1/2 top-[200px] bg-[rgba(213,213,213,0.6)] blur-[32px] rounded-full -z-10 pointer-events-none" />

          {/* Badge */}
          <div className="flex flex-row justify-center items-center px-5 h-[32px] bg-white border border-[#E5E2E1] shadow-sm rounded-full w-auto shrink-0 select-none">
            <span className="font-poppins font-medium text-sm text-[#53647D] leading-none">About Bookly.cy</span>
          </div>

          {/* Heading */}
          <h1 className="font-manrope font-extrabold text-5xl md:text-7xl text-[#020305] tracking-[-1.8px] leading-[72px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.05)]">
            Built for Cyprus. <br />Built for you.
          </h1>

          {/* Paragraph */}
          <p className="font-manrope font-normal text-xl md:text-2xl text-[#45474B] leading-8 max-w-[672px] mt-2">
            We are on a mission to make booking local services as easy as sending a message — for every customer, and every business, across the island.
          </p>
        </div>
      </div>
    </section>
  );
}
