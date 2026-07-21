"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { SquareLock01Icon, InformationCircleIcon, CreditCardPosIcon } from "@hugeicons/core-free-icons";

interface PaymentStepProps {
  hasSavedCard: boolean;
  setHasSavedCard: (val: boolean) => void;
  isReplacingCard: boolean;
  setIsReplacingCard: (val: boolean) => void;
  setBookingStep: (step: any) => void;
  setPromoDiscountPercent: (val: number) => void;
  setPromoDeductedAmount: (val: number) => void;
  promoCode: string;
  setPromoCode: (val: string) => void;
}

export default function PaymentStep({
  hasSavedCard,
  setHasSavedCard,
  isReplacingCard,
  setIsReplacingCard,
  setBookingStep,
  setPromoDiscountPercent,
  setPromoDeductedAmount,
  promoCode,
  setPromoCode,
}: PaymentStepProps) {
  return (
    <div className="flex flex-col w-full lg:w-[714px] font-manrope">
      <h1 className="font-semibold text-3xl md:text-4xl text-[#1C1B1C] mb-8 font-poppins">Payment</h1>

      {hasSavedCard && (
        <div className="flex flex-col w-full mb-6">
          <span className="text-xs font-bold text-[#16123E] tracking-widest uppercase mb-3">Primary Card</span>
          <div className="border border-[#ECEBEF] rounded-xl p-5 flex items-center justify-between bg-white shadow-sm w-full">
            <div className="flex items-center gap-4">
              <div className="w-12 h-8 bg-[#1A1F71] text-white text-xs font-extrabold flex items-center justify-center rounded uppercase tracking-wider">
                Visa
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-base font-bold text-[#16123E]">•••• •••• •••• 4242</span>
                <span className="text-xs text-[#5E598B]">Expires 09/27</span>
              </div>
            </div>
            <HugeiconsIcon icon={SquareLock01Icon} size={20} className="text-[#5E598B]" />
          </div>
          
          {!isReplacingCard && (
            <div className="flex items-center justify-end gap-3 mt-4 w-full">
              <button
                onClick={() => setBookingStep("time")}
                className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-semibold hover:bg-neutral-50 cursor-pointer text-[#1C1B1C]"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsReplacingCard(true)}
                className="px-5 py-2.5 bg-[#2E9DA7] text-white rounded-lg text-sm font-semibold hover:opacity-90 cursor-pointer transition-opacity"
              >
                Replace card
              </button>
            </div>
          )}
        </div>
      )}

      {(!hasSavedCard || isReplacingCard) && (
        <div className="flex flex-col w-full">
          <h2 className="text-[#1E293B] font-semibold text-xl font-inter mb-4">Payment method</h2>
          
          {/* Payment Card Form wrapper */}
          <div className="bg-white border border-[#F1F5F9] rounded-2xl p-6 shadow-sm flex flex-col gap-5 w-full relative">
            {/* Name Input */}
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[11px] font-bold text-[#16123E] tracking-widest uppercase">Name</span>
              <div className="border border-[#ECEBEF] rounded-xl px-4 py-3.5 flex items-center bg-white">
                <input
                  type="text"
                  placeholder="Name on card"
                  className="w-full text-base font-medium text-[#16123E] placeholder-[#5E598B] border-none outline-none bg-transparent"
                />
              </div>
            </div>

            {/* Card Number Input */}
            <div className="flex flex-col gap-2 w-full">
              <span className="text-[11px] font-bold text-[#16123E] tracking-widest uppercase">Card Number</span>
              <div className="border border-[#ECEBEF] rounded-xl px-4 py-3.5 flex items-center justify-between bg-white">
                <input
                  type="text"
                  placeholder="4444 *********"
                  className="w-full text-base font-medium text-[#16123E] placeholder-[#5E598B] border-none outline-none bg-transparent"
                />
                <div className="flex items-center gap-1.5 shrink-0">
                  <div className="px-1.5 py-0.5 bg-[#1A1F71] text-white text-[9px] font-bold rounded">VISA</div>
                  <div className="px-1.5 py-0.5 bg-red-600 text-white text-[9px] font-bold rounded">MC</div>
                  <div className="px-1.5 py-0.5 bg-amber-500 text-white text-[9px] font-bold rounded">AMEX</div>
                </div>
              </div>
            </div>

            {/* Expiration Date and CVV Row */}
            <div className="flex gap-4 w-full">
              <div className="flex flex-col gap-2 flex-1">
                <span className="text-[11px] font-bold text-[#16123E] tracking-widest uppercase">Expiration Date</span>
                <div className="border border-[#ECEBEF] rounded-xl px-4 py-3.5 flex items-center bg-white">
                  <input
                    type="text"
                    placeholder="MM / YY"
                    className="w-full text-base font-medium text-[#16123E] placeholder-[#5E598B] border-none outline-none bg-transparent"
                  />
                </div>
              </div>
              
              <div className="flex flex-col gap-2 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#16123E] tracking-widest uppercase">Security Code</span>
                  <HugeiconsIcon icon={InformationCircleIcon} size={14} className="text-[#16123E]" />
                </div>
                <div className="border border-[#ECEBEF] rounded-xl px-4 py-3.5 flex items-center justify-between bg-white">
                  <input
                    type="text"
                    placeholder="CVV"
                    className="w-full text-base font-medium text-[#16123E] placeholder-[#5E598B] border-none outline-none bg-transparent"
                  />
                  <HugeiconsIcon icon={CreditCardPosIcon} size={20} className="text-[#5E598B] shrink-0" />
                </div>
              </div>
            </div>

            {/* Save card checkbox */}
            <div className="flex items-center gap-2.5 mt-2">
              <input type="checkbox" id="save-card-check" className="w-4 h-4 border border-neutral-300 rounded cursor-pointer accent-[#2E9DA7]" />
              <label htmlFor="save-card-check" className="text-xs font-semibold text-[#5F5E5A] cursor-pointer">Save information</label>
            </div>
          </div>

          {isReplacingCard && (
            <div className="flex items-center justify-end gap-3 mt-4 w-full">
              <button
                onClick={() => setIsReplacingCard(false)}
                className="px-5 py-2.5 border border-neutral-300 rounded-lg text-sm font-semibold hover:bg-neutral-50 cursor-pointer text-[#1C1B1C]"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsReplacingCard(false)}
                className="px-5 py-2.5 bg-[#2E9DA7] text-white rounded-lg text-sm font-semibold hover:opacity-90 cursor-pointer transition-opacity"
              >
                Save card
              </button>
            </div>
          )}
        </div>
      )}

      {/* Promo Code Application Section */}
      <div className="flex flex-col gap-2.5 w-full mt-6 bg-white border border-[#ECEBEF] rounded-xl p-5 shadow-sm font-sans">
        <span className="text-[11px] font-bold text-[#16123E] tracking-widest uppercase">Promo Code</span>
        <div className="flex gap-2">
          <input
            type="text"
            id="promo-code-input"
            defaultValue={promoCode}
            placeholder="Enter promo code"
            className="flex-grow border border-[#ECEBEF] rounded-lg px-4 py-2 text-sm font-medium text-[#16123E] placeholder-[#5E598B] bg-white outline-none focus:border-[#2E9DA7]"
          />
          <button
            onClick={() => {
              const inputEl = document.getElementById("promo-code-input") as HTMLInputElement;
              const feedbackEl = document.getElementById("promo-feedback");
              if (inputEl && inputEl.value.trim().toUpperCase() === "BOOKLY20") {
                setPromoDiscountPercent(20);
                setPromoDeductedAmount(18);
                setPromoCode("BOOKLY20");
                if (feedbackEl) {
                  feedbackEl.classList.add("hidden");
                  feedbackEl.innerHTML = "";
                }
              } else {
                setPromoDiscountPercent(0);
                setPromoDeductedAmount(0);
                setPromoCode("");
                if (feedbackEl) {
                  feedbackEl.classList.remove("hidden");
                  feedbackEl.innerHTML = `<span class="text-xs text-red-600 font-medium">✗ Invalid promo code</span>`;
                }
              }
            }}
            className="bg-[#2E9DA7] text-white px-5 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity cursor-pointer"
          >
            Apply
          </button>
        </div>
        {/* Dynamic Promo Code Feedback container */}
        <div id="promo-feedback" className="hidden mt-2"></div>
      </div>

      {/* Special requests textarea */}
      <div className="flex flex-col gap-2 w-full mt-6">
        <div className="border border-[#E8E8E4] rounded-lg p-4 bg-white shadow-sm w-full">
          <textarea
            rows={3}
            placeholder="Got a special request? Leave a note here."
            className="w-full text-sm text-[#1C1C1A] placeholder-neutral-400 outline-none border-none resize-none bg-transparent"
          />
        </div>
      </div>
    </div>
  );
}
