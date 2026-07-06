"use client";

import React from "react";
import Carousel from "@/components/Carousel";
import TrustedBusinessCard, { TrustedBusiness } from "@/components/TrustedBusinessCard";

interface ListYourBusinessTrustedProps {
  trustedBusinesses: TrustedBusiness[];
}

export default function ListYourBusinessTrusted({
  trustedBusinesses
}: ListYourBusinessTrustedProps) {
  return (
    <section className="w-full bg-[#FCFCFD] py-12 md:py-[72px] border-y border-neutral-100 mt-24">
      <div className="w-full px-4 md:px-8 xl:px-[68px] flex flex-col items-center justify-center gap-10 md:gap-[80px]">
        <div className="flex flex-col items-center gap-4 text-center max-w-[1312px] w-full">
          <h2 className="text-3xl md:text-[36px] font-medium leading-[36px] md:leading-[48px] text-[#1F2937] tracking-tight font-poppins">
            Trusted by local businesses across Cyprus
          </h2>
          <p className="text-lg md:text-[24px] font-normal leading-[24px] text-[#757575] font-poppins">
            Join the businesses already growing with Bookly.
          </p>
        </div>

        <div className="w-full">
          {trustedBusinesses.length > 5 ? (
            <Carousel gapClass="gap-[40px] md:gap-[80px]">
              {trustedBusinesses.map((biz, idx) => (
                <TrustedBusinessCard key={`${biz.id}-${idx}`} business={biz} />
              ))}
            </Carousel>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 justify-items-center">
              {trustedBusinesses.map((biz, idx) => (
                <TrustedBusinessCard key={`${biz.id}-${idx}`} business={biz} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
