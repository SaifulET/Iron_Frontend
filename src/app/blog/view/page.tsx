"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

export default function BlogDetailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "post-featured";

  // States for Navbar
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  return (
    <div className="min-h-screen bg-[#FCFAF9] flex flex-col relative overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Blog Detail View */}
      <main className="flex-1 w-full max-w-[730px] mx-auto px-4 pt-[17px] pb-24 flex flex-col gap-8 font-poppins">
        
        {/* Back button */}
        <button
          onClick={() => router.push("/blog")}
          className="self-start flex items-center justify-center gap-2 h-[48px] px-6 bg-[#FFFFFF] border border-[#D3D3D3] rounded-full shadow-sm hover:bg-neutral-50 transition-colors cursor-pointer"
        >
          {/* Back Arrow SVG */}
          <svg 
            className="w-4 h-4 text-[#141414]" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="font-inter font-semibold text-[16.2px] text-[#141414]">
            Back to Blog
          </span>
        </button>

        {/* Heading */}
        <h1 className="w-full text-[#141414] font-medium text-[32px] sm:text-[44.6px] leading-[42px] sm:leading-[58px]">
          Meet the Partners: Why The Whitening Clinic chose Bookly as the software to run their business
        </h1>

        {/* socialSharing widget */}
        <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-y border-neutral-100 gap-4">
          
          {/* Author Profile */}
          <div className="flex items-center gap-3">
            <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-tr from-[#985FF9] to-[#0CC0DF] flex-shrink-0 relative overflow-hidden" />
            <div className="flex flex-col gap-[1px]">
              <span className="font-inter font-normal text-[14.8px] leading-[24px] text-[#0CC0DF]">
                Bookly
              </span>
              <span className="font-inter font-normal text-[13.9px] leading-[20px] text-[#878C93]">
                Last updated on June 26, 2024 Published June 21, 2024
              </span>
            </div>
          </div>

          {/* Sharing Social Buttons */}
          <div className="flex items-center gap-3">
            {/* Facebook */}
            <button className="w-[58px] h-[58px] bg-[#8EBAC5]/20 border border-[#D5D7DA] shadow-md rounded-[16px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
              <img src="/Icons/Facebook.svg" alt="Facebook" className="w-6 h-6 object-contain" />
            </button>
            
            {/* Instagram */}
            <button className="w-[58px] h-[58px] bg-[#8EBAC5]/20 border border-[#D5D7DA] shadow-md rounded-[16px] flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer">
              <img src="/Icons/instagram1.svg" alt="Instagram" className="w-6 h-6 object-contain" />
            </button>
          </div>

        </div>

        {/* Article Content Body */}
        <div className="w-full flex flex-col gap-6 text-[15.3px] font-inter text-[#000000] leading-[22px]">
          <p>
            In the suburbs of Waverley in New South Wales, Australia, sits The Whitening Clinic. Owned by Alissa Brandtman, it’s been around for three years and has quickly become the go-to place for a brighter and healthier smile.
          </p>
          
          <p className="font-semibold text-lg">
            The Whitening Clinic does more than just aesthetic teeth whitening
          </p>
          
          <p>
            They make sure they always talk to their clients about maintaining oral health, microbiome and how to whiten teeth “from the inside”.
          </p>
          
          <p>
            We sat down with Alissa to find out more about her clinic, and learn more about how she has used Bookly to build her business from the ground up, and grow it into what it is today. On why Alissa started The Whitening Clinic, she said “I really felt the dental industry needed something that was a little more in the beauty space. So I developed a business that looks at wellness, and not just teeth whitening, and we really tried to create a space that feels like a salon.”
          </p>

          {/* Image 1 */}
          <div className="w-full h-[380px] sm:h-[480px] relative rounded-xl overflow-hidden my-4 border border-neutral-100 shadow-sm">
            <Image
              src="/image/blogProfile.png"
              alt="Teeth whitening session"
              fill
              className="object-cover"
            />
          </div>

          <p>
            “Teeth whitening is our core service, but we also have an oral health therapist who comes and does dental cleans. We offer oral microbiome testing, as well as a range of oral care products that we recommend to our clients.”
          </p>

          <p>
            “When the client first comes in, we do a whole education session about how the whitening works, how the actual process works, how teeth work, and so give people a full understanding of what to expect, what their expectations will be, not just guarantee them 14 shades lighter.”
          </p>

          <p className="font-semibold text-lg">
            A space calm enough for clients to fall asleep
          </p>

          <p>
            While many clients might think of sterile chairs, bright lights and pain when they think about the dental industry, The Whitening Clinic could not be any more different. “It’s not like the dentist. There’s a lot of anxiety around what’s going to happen at the dentist, but here that doesn’t happen. Clients come in and comment on how calm it feels.”
          </p>

          {/* Image 2 */}
          <div className="w-full h-[380px] sm:h-[480px] relative rounded-xl overflow-hidden my-4 border border-neutral-100 shadow-sm">
            <Image
              src="/image/blogProfile.png"
              alt="Quiet treatment room"
              fill
              className="object-cover"
            />
          </div>

          <p>
            And Alissa tells us that when it came to choosing the software, she was eager to do the research beforehand to make sure she was getting the right one for her. A software that would be easy to use, a great experience for her clients, and would match the sleek and clean aesthetic of her clinic.
          </p>

          {/* Callout quote text */}
          <div className="py-6 my-6 border-y-2 border-neutral-200 text-center">
            <p className="font-semibold text-xl sm:text-2xl text-[#141414] italic max-w-2xl mx-auto leading-relaxed">
              “Coming from a software background, I wanted to compare different systems to work with, and Bookly was definitely the best system for me”
            </p>
          </div>

          <p>
            I looked at all the features of the booking softwares and did a whole cost analysis. I chose Bookly because of how easy it is to use, and it’s really user friendly. And because it’s free to sign up, I only started paying for what I use as I go.
          </p>

          <p className="font-bold">
            “Without Bookly, we wouldn’t have a business”
          </p>
          <p>
            “Bookly has contributed to the growth of our business in a lot of ways” Alissa goes on. “Because it’s a combination of our customer management system, our marketing, and our reporting, we use it for everything we need to do. We have a marketing plan which incorporates how we market through Bookly, and we do our reporting and our goals and our budgeting all through Bookly as well.”
          </p>

          <p className="font-bold">
            “We ask all the relevant questions we need, then it’s right there at our fingertips”
          </p>
          <p>
            “We use consent forms that we send out to all of our clients when they first book. This has been a great system because it stays in our customer database on Bookly. They get to do it on their phone as soon as they book and it comes straight through to us”
          </p>

          <p className="font-bold">
            “Bookly is a beautiful platform that aligns with our business”
          </p>
          <p>
            “Bookly came and took the photos on our marketplace for us. They’re gorgeous photos and they represent our brand really well. And then there’s an ease of use of actually booking in through the marketplace.”
          </p>

        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
