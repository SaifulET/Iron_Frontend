"use client";

import React from "react";
import Image from "next/image";

// Shared blog posts database for viewing details
export const blogPostsData: Record<string, {
  title: string;
  category: string;
  date: string;
  author: string;
  paragraphs: string[];
  image: string;
}> = {
  "post-featured": {
    title: "Meet the Partners: Why The Whitening Clinic chose Bookly as the software to run their business",
    category: "Meet the partners",
    date: "June 26, 2024",
    author: "Bookly",
    paragraphs: [
      "In the suburbs of Waverley in New South Wales, Australia, sits The Whitening Clinic. Owned by Alissa Brandtman, it’s been around for three years and has quickly become the go-to place for a brighter and healthier smile.",
      "The Whitening Clinic does more than just aesthetic teeth whitening. They make sure they always talk to their clients about maintaining oral health, microbiome and how to whiten teeth “from the inside”.",
      "We sat down with Alissa to find out more about her clinic, and learn more about how she has used Bookly to build her business from the ground up, and grow it into what it is today. On why Alissa started The Whitening Clinic, she said “I really felt the dental industry needed something that was a little more in the beauty space. So I developed a business that looks at wellness, and not just teeth whitening, and we really tried to create a space that feels like a salon.”",
      "“Teeth whitening is our core service, but we also have an oral health therapist who comes and does dental cleans. We offer oral microbiome testing, as well as a range of oral care products that we recommend to our clients.”",
      "“When the client first comes in, we do a whole education session about how the whitening works, how the actual process works, how teeth work, and so give people a full understanding of what to expect, what their expectations will be, not just guarantee them 14 shades lighter.”",
      "While many clients might think of sterile chairs, bright lights and pain when they think about the dental industry, The Whitening Clinic could not be any more different. “It’s not like the dentist. There’s a lot of anxiety around what’s going to happen at the dentist, but here that doesn’t happen. Clients come in and comment on how calm it feels.”"
    ],
    image: "/image/blogProfile.png"
  },
  "post-1": {
    title: "Meet Our Founding Partners: Building Cyprus's First Booking Platform",
    category: "Founding Partner",
    date: "May 22, 2026",
    author: "Bookly Team",
    paragraphs: [
      "We're proud to introduce the visionary businesses that believed in Bookly from day one. These founding partners helped shape the platform you see today.",
      "Building a platform tailored to the unique landscape of Cyprus required local insight, dedication, and strong collaboration with early adopters. Our founding partners represent the very best of Cyprus's local services, from premium beauty salons to top-tier wellness centers.",
      "Through their feedback, we've refined our scheduling tools, deposit systems, and customer management flows to create a seamless experience for both businesses and clients. We thank them for their ongoing partnership and vision."
    ],
    image: "/image/blogProfile.png"
  },
  "post-2": {
    title: "Bookly.cy Launches Mobile Application for Staff Members",
    category: "Bookly News",
    date: "May 22, 2026",
    author: "Bookly News",
    paragraphs: [
      "Staff members can now manage bookings, view schedules, and interact with customers on the go. Read more about our release notes...",
      "Our new mobile app is built natively for both iOS and Android platforms, ensuring optimal performance and intuitive user experience. Staff members can view real-time shifts, update appointment statuses, and communicate with clients seamlessly.",
      "Additionally, push notifications will alert staff about any last-minute cancellations or booking updates, ensuring your operations run smoothly even when you're away from the front desk."
    ],
    image: "/image/blogProfile.png"
  },
  "post-3": {
    title: "Upcoming Features: SMS Reminders & Multi-location Support",
    category: "Bookly News",
    date: "May 22, 2026",
    author: "Bookly Product Team",
    paragraphs: [
      "We are testing automated SMS alerts to drastically reduce client no-shows. Learn how to configure this for your branch...",
      "No-shows are one of the biggest revenue leaks for service-based businesses. Our upcoming SMS Reminders feature will send automatic text confirmations 24 hours before appointments, prompting clients to confirm or reschedule in a single tap.",
      "We are also rolling out multi-location support, allowing owners to manage staff schedules, clients, and bookings across multiple branches from a single unified dashboard."
    ],
    image: "/image/blogProfile.png"
  }
};

interface BlogDetailBodyProps {
  id: string;
  onBack?: () => void;
  showBackButton?: boolean;
}

export default function BlogDetailBody({
  id,
  onBack,
  showBackButton = true,
}: BlogDetailBodyProps) {
  const post = blogPostsData[id] || {
    title: "Why Self-Care Is No Longer a Luxury",
    category: "Bookly News",
    date: "April 9, 2026",
    author: "Bookly Team",
    paragraphs: [
      "In today’s fast-moving world, people are constantly balancing work, relationships, health, and personal goals. Taking care of your mind and body is vital...",
      "This is a preview of the content for blog post with ID: " + id + "."
    ],
    image: "/image/blogProfile.png"
  };

  return (
    <div className="w-full flex flex-col gap-8 font-poppins">
      {/* Back button */}
      {showBackButton && onBack && (
        <button
          onClick={onBack}
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
            Back
          </span>
        </button>
      )}

      {/* Heading */}
      <h1 className="w-full text-[#141414] font-medium text-[32px] sm:text-[44.6px] leading-[42px] sm:leading-[58px]">
        {post.title}
      </h1>

      {/* socialSharing widget */}
      <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-y border-neutral-100 gap-4">
        {/* Author Profile */}
        <div className="flex items-center gap-3">
          <div className="w-[64px] h-[64px] rounded-full bg-gradient-to-tr from-[#985FF9] to-[#0CC0DF] flex-shrink-0 relative overflow-hidden" />
          <div className="flex flex-col gap-[1px]">
            <span className="font-inter font-normal text-[14.8px] leading-[24px] text-[#0CC0DF]">
              {post.author}
            </span>
            <span className="font-inter font-normal text-[13.9px] leading-[20px] text-[#878C93]">
              Published {post.date}
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
        {post.paragraphs.map((p, idx) => (
          <p key={idx}>{p}</p>
        ))}

        {/* Image */}
        <div className="w-full h-[380px] sm:h-[480px] relative rounded-xl overflow-hidden my-4 border border-neutral-100 shadow-sm">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
