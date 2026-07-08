"use client";

import React from "react";

interface SupportFormFieldsProps {
  name: string;
  setName: (val: string) => void;
  email: string;
  setEmail: (val: string) => void;
  subject: string;
  setSubject: (val: string) => void;
  description: string;
  setDescription: (val: string) => void;
}

export default function SupportFormFields({
  name,
  setName,
  email,
  setEmail,
  subject,
  setSubject,
  description,
  setDescription
}: SupportFormFieldsProps) {
  return (
    <div className="flex flex-col items-start w-full gap-5">
      {/* Row: Name and Email */}
      <div className="flex flex-col md:flex-row gap-5 w-full">
        {/* Name field */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full h-3.5">
            <label className="font-manrope font-medium text-xs md:text-sm tracking-[0.09em] uppercase text-[#16123E]">
              Name
            </label>
          </div>
          <div className="flex justify-between items-center px-4 bg-white border border-[#B3B3B3] rounded-xl h-[60px] w-full focus-within:border-neutral-800 transition-colors">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              className="w-full h-full font-manrope font-medium text-base text-neutral-800 placeholder-[#767676] bg-transparent focus:outline-none"
            />
          </div>
        </div>

        {/* Email field */}
        <div className="flex-1 flex flex-col gap-2">
          <div className="w-full h-3.5">
            <label className="font-manrope font-medium text-xs md:text-sm tracking-[0.09em] uppercase text-[#16123E]">
              Email
            </label>
          </div>
          <div className="flex justify-between items-center px-4 bg-white border border-[#B3B3B3] rounded-xl h-[60px] w-full focus-within:border-neutral-800 transition-colors">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="example@gmail.com"
              className="w-full h-full font-manrope font-medium text-base text-neutral-800 placeholder-[#767676] bg-transparent focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Subject field */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-3.5">
          <label className="font-manrope font-medium text-xs md:text-sm tracking-[0.09em] uppercase text-[#16123E]">
            Subject
          </label>
        </div>
        <div className="flex justify-between items-center px-4 bg-white border border-[#B3B3B3] rounded-xl h-[60px] w-full focus-within:border-neutral-800 transition-colors">
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="What is this regarding"
            className="w-full h-full font-manrope font-medium text-base text-neutral-800 placeholder-[#767676] bg-transparent focus:outline-none"
          />
        </div>
      </div>

      {/* Description field */}
      <div className="w-full flex flex-col gap-2">
        <div className="w-full h-3.5">
          <label className="font-manrope font-medium text-xs md:text-sm tracking-[0.09em] uppercase text-[#16123E]">
            Description
          </label>
        </div>
        <div className="flex flex-col bg-white border border-[#B3B3B3] rounded-xl p-4 w-full focus-within:border-neutral-800 transition-colors">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Please describe your inquiry to assist you best"
            className="w-full h-36 font-manrope font-medium text-base text-neutral-800 placeholder-[#767676] bg-transparent focus:outline-none resize-none"
          />
        </div>
      </div>
    </div>
  );
}
