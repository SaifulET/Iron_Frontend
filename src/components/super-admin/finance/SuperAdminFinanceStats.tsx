"use client";

import React from "react";

export default function SuperAdminFinanceStats() {
  const cards = [
    {
      title: "Activation fees Bookly revenue",
      value: "€18,420",
      subtitle: "62 new customers",
      valueColor: "text-[#6366F1]"
    },
    {
      title: "Collected for businesses",
      value: "€18,420",
      subtitle: "No-show €10 - Late cancel €34",
      valueColor: "text-[#6366F1]"
    },
    {
      title: "Sent to businesses via SEPA",
      value: "€1,240",
      subtitle: "11 SEPA payouts sent",
      valueColor: "text-[#8D1212]"
    },
    {
      title: "Pending payouts",
      value: "€1,240",
      subtitle: "7 businesses awaiting SEPA",
      valueColor: "text-[#D97706]"
    },
    {
      title: "Discounted money",
      value: "€4,120",
      subtitle: "124 times promo code applied",
      valueColor: "text-[#0CC0DF]"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 w-full">
      {cards.map((c, idx) => (
        <div
          key={idx}
          className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col gap-2 font-sans"
        >
          <span className="text-[13px] font-medium text-gray-500">{c.title}</span>
          <span className={`text-3xl font-bold ${c.valueColor}`}>{c.value}</span>
          <span className="text-[12px] font-normal text-gray-400">{c.subtitle}</span>
        </div>
      ))}
    </div>
  );
}
