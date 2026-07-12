"use client";

import React from "react";
import { FaqItem } from "./types";

interface FaqTabProps {
  faqs: FaqItem[];
  onEdit: (faq: FaqItem) => void;
  onDelete: (id: string) => void;
  onNewFaq: () => void;
}

export default function FaqTab({ faqs, onEdit, onDelete, onNewFaq }: FaqTabProps) {
  return (
    <div className="flex flex-col gap-3">
      {/* Header toolbar with Add FAQ button */}
      <div className="flex justify-end w-full">
        <button
          onClick={onNewFaq}
          className="flex items-center gap-1.5 h-9 px-4 bg-[#6366F1] text-white text-[13px] font-medium rounded-full hover:bg-indigo-650 transition-colors border-none cursor-pointer"
        >
          + Add FAQ
        </button>
      </div>

      {/* List items block */}
      <div className="flex flex-col gap-2">
        {faqs.map((faq) => (
          <div
            key={faq.id}
            className="bg-white hover:bg-gray-55 border border-[#E5E7EB] rounded-lg p-3.5 px-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] flex flex-row items-center gap-3 w-full"
          >
            {/* Drag Handle block */}
            <div className="text-[#6B7280] font-normal text-lg select-none cursor-grab flex-shrink-0 flex items-center justify-center w-[13px] h-[22px]">
              ⠿
            </div>

            {/* FAQ Details column */}
            <div className="flex-grow flex flex-col gap-0.5 min-w-0">
              <h3 className="font-semibold text-[#111827] text-sm leading-[17px] truncate" title={faq.question}>
                {faq.question}
              </h3>
              <p className="text-[13px] font-normal text-[#6B7280] leading-[16px] truncate" title={faq.answer}>
                {faq.answer}
              </p>
            </div>

            {/* Edit & Delete Action row */}
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={() => onEdit(faq)}
                className="text-[13px] font-medium text-[#6366F1] hover:underline bg-transparent border-none cursor-pointer px-2.5 py-1"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(faq.id)}
                className="text-[13px] font-medium text-[#DC2626] hover:underline bg-transparent border-none cursor-pointer px-2.5 py-1"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
