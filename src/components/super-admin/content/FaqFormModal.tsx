"use client";

import React, { useState, useEffect } from "react";
import { FaqItem } from "./types";

interface FaqFormModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent, data: { question: string; answer: string }) => void;
  editingFaq: FaqItem | null;
}

export default function FaqFormModal({ show, onClose, onSave, editingFaq }: FaqFormModalProps) {
  const [faqQuestion, setFaqQuestion] = useState("");
  const [faqAnswer, setFaqAnswer] = useState("");

  useEffect(() => {
    if (editingFaq) {
      setFaqQuestion(editingFaq.question);
      setFaqAnswer(editingFaq.answer);
    } else {
      setFaqQuestion("");
      setFaqAnswer("");
    }
  }, [editingFaq, show]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    onSave(e, { question: faqQuestion, answer: faqAnswer });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-[596px] rounded-xl overflow-hidden shadow-xl p-6 flex flex-col gap-5">
        {/* Modal header */}
        <div className="flex flex-row justify-between items-center shrink-0">
          <h3 className="font-bold text-xl text-[#111827] leading-6">
            {editingFaq ? "Edit FAQ" : "Add FAQ"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:bg-gray-55 rounded-lg text-gray-400 hover:text-gray-600 bg-transparent cursor-pointer transition-colors"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal fields */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-4">
            {/* Question Area */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-medium text-[#374151] leading-4">
                Question (EN)
              </label>
              <textarea
                placeholder="English question..."
                value={faqQuestion}
                onChange={(e) => setFaqQuestion(e.target.value)}
                rows={2}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-2.5 text-[15px] font-normal leading-[18px] text-gray-800 placeholder-[#757575] focus:outline-none focus:ring-1 focus:ring-[#6366F1] resize-none h-[80px]"
              />
            </div>

            {/* Answer Area */}
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-xs font-medium text-[#374151] leading-4">
                Answer (EN)
              </label>
              <textarea
                placeholder="English answer..."
                value={faqAnswer}
                onChange={(e) => setFaqAnswer(e.target.value)}
                rows={2}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg p-2.5 text-[15px] font-normal leading-[18px] text-gray-800 placeholder-[#757575] focus:outline-none focus:ring-1 focus:ring-[#6366F1] resize-none h-[80px]"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex justify-end items-center gap-[10.33px] pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 h-9 flex items-center justify-center text-sm font-medium text-[#6366F1] bg-transparent border-none hover:underline cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="w-[108px] h-11 flex items-center justify-center text-[15px] font-medium text-white bg-[#6366F1] hover:bg-indigo-600 border-none rounded-full transition-colors cursor-pointer"
            >
              Save FAQ
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
