import React from "react";

export interface TrustedBusiness {
  id: number;
  name: string;
  location: string;
  role: string;
  image: string;
}

interface TrustedBusinessCardProps {
  business: TrustedBusiness;
}

export default function TrustedBusinessCard({ business }: TrustedBusinessCardProps) {
  return (
    <div className="w-[129px] h-[220px] flex flex-col items-center gap-5 text-center select-none shrink-0 font-poppins">
      {/* Circle Image */}
      <img
        src={business.image}
        alt={business.name}
        className="w-[120px] h-[120px] rounded-full object-cover border border-[#E8E6FF]"
        draggable="false"
      />

      {/* Details Container */}
      <div className="flex flex-col items-center gap-1 w-full">
        {/* Name */}
        <h4 className="text-[18px] font-medium leading-[26px] text-[#111111] truncate w-full">
          {business.name}
        </h4>
        {/* Location */}
        <span className="text-[16px] font-normal leading-[22px] text-[#5E598B] font-manrope truncate w-full">
          {business.location}
        </span>
        {/* Role */}
        <span className="text-[14px] font-medium leading-[20px] text-[#111111] mt-1 truncate w-full">
          {business.role}
        </span>
      </div>
    </div>
  );
}
