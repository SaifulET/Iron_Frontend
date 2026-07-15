"use client";

import React from "react";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import { Calendar03Icon, Clock01Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";

interface CheckoutSummaryAsideProps {
  bookingStep: any;
  selectedDayNum: number;
  selectedTimeSlot: string;
  selectedList: any[];
  totalDurationText: string;
  totalPriceText: string;
  selectedAddons: number[];
  selectedProfessional: string | null;
  totalPrice: number;
  isReturningCustomer: boolean;
  showPolicy: boolean;
  setShowPolicy: (val: boolean) => void;
  setBookingStep: (step: any) => void;
}

export default function CheckoutSummaryAside({
  bookingStep,
  selectedDayNum,
  selectedTimeSlot,
  selectedList,
  totalDurationText,
  totalPriceText,
  selectedAddons,
  selectedProfessional,
  totalPrice,
  isReturningCustomer,
  showPolicy,
  setShowPolicy,
  setBookingStep,
}: CheckoutSummaryAsideProps) {
  return (
    <aside className="w-full lg:w-[537px] bg-white border border-neutral-200 rounded-xl p-4 sm:p-8 flex flex-col gap-5 lg:sticky lg:top-28">
      {/* Business Overview Header */}
      <div className="flex items-center gap-4 border-b border-[#E5E5E5] pb-5">
        <div className="w-16 h-16 bg-neutral-200 rounded overflow-hidden relative shrink-0">
          <Image src="/image/imgOfService.png" alt="Yard Barber" fill className="object-cover" />
        </div>
        <div className="flex flex-col gap-1 min-w-0">
          <h3 className="font-semibold text-base text-black truncate">Yard Barber and Shop</h3>
          <div className="flex items-center gap-1.5 text-sm text-black">
            <span className="font-bold">5.0</span>
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map(star => (
                <img key={star} src="/Icons/rattingfull.svg" alt="star" className="w-3.5 h-3.5 object-contain" />
              ))}
            </div>
            <span className="text-neutral-400 font-medium">(589)</span>
          </div>
          <span className="text-xs text-[#4E5F78] truncate">Marasi Drive, Marquise Square Tower, Ground</span>
        </div>
      </div>

      {/* Selected Schedule row inside summary details */}
      {(bookingStep === "time" || bookingStep === "payment") && (
        <div className="flex flex-col gap-3 border-b border-[#E5E5E5] pb-5 font-inter">
          <div className="flex items-center gap-3">
            <HugeiconsIcon icon={Calendar03Icon} size={20} className="text-[#4E5F78]" />
            <span className="text-sm font-semibold text-[#1C1B1C]">Mon, Aug {selectedDayNum}</span>
          </div>
          <div className="flex items-center gap-3">
            <HugeiconsIcon icon={Clock01Icon} size={20} className="text-[#4E5F78]" />
            <span className="text-sm font-semibold text-[#1C1B1C]">{selectedTimeSlot} (1hr, 20 min duration)</span>
          </div>
        </div>
      )}

      {/* Booking Item Summary Details */}
      <div className="flex flex-col gap-4">
        {/* Main Selected Services */}
        <div className="flex justify-between items-start gap-4">
          <div className="flex flex-col gap-1 min-w-0">
            <h4 className="font-semibold text-sm text-[#1C1B1C] truncate">
              {selectedList.length > 0 ? selectedList.map(s => s.name).join(", ") : "Wedding Pic"}
            </h4>
            <span className="text-xs text-[#4E5F78]">{totalDurationText}</span>
          </div>
          <span className="font-semibold text-sm text-[#1C1B1C] shrink-0">{totalPriceText}</span>
        </div>

        {/* Add-ons List Summary */}
        {selectedAddons.length > 0 && (
          <div className="flex justify-between items-start gap-4 border-t border-[#E5E5E5] pt-4">
            <div className="flex flex-col gap-1 min-w-0">
              <h4 className="font-semibold text-sm text-[#1C1B1C]">Add-ons</h4>
              <p className="text-xs text-[#4E5F78] leading-relaxed">
                {selectedAddons.map(id => {
                  if (id === 1) return "Wedding Pic (€90)";
                  return "Wedding Pic (€90)";
                }).join(" • ")}
              </p>
            </div>
            <span className="font-semibold text-sm text-[#1C1B1C] shrink-0">€{selectedAddons.length * 90}</span>
          </div>
        )}

        {/* Selected Professional Status */}
        {selectedProfessional && (
          <div className="flex justify-between items-center border-t border-[#E5E5E5] pt-4">
            <span className="text-xs font-semibold text-[#1C1B1C]">Selected Professional</span>
            <span className="text-xs font-bold text-[#2BB54F]">
              {selectedProfessional === "no-preference" ? "No Preference" : "Loay"}
            </span>
          </div>
        )}
      </div>

      {/* Price Calculation breakdown */}
      <div className="border-t border-[#E5E5E5] pt-4 flex flex-col w-full text-sm font-medium text-[#1C1B1C]">
        {/* Subtotal */}
        <div className="flex justify-between items-center py-2.5">
          <span>Subtotal</span>
          <span>€{totalPrice + (selectedAddons.length * 90)}</span>
        </div>

        {/* Divider Line 563 */}
        <div className="border-t border-[#E5E5E5] w-full" />

        {/* Deposit due now */}
        <div className="flex justify-between items-center py-2.5 relative">
          {isReturningCustomer ? (
            <div className="flex items-center gap-1.5 text-neutral-500 font-normal">
              <span>✓ Returning customer - no deposit required</span>
            </div>
          ) : (
            <div className="flex items-center gap-1.5">
              <span>Deposit due now</span>
              <div className="relative group">
                <button className="text-neutral-400 hover:text-neutral-600 cursor-pointer flex items-center">
                  <HugeiconsIcon icon={InformationCircleIcon} size={16} />
                </button>
                
                {/* Tooltip Card */}
                <div className="absolute bottom-full right-[-80px] sm:right-[-40px] mb-3 hidden group-hover:flex w-[290px] sm:w-[420px] md:w-[480px] bg-white border border-neutral-200 shadow-2xl rounded-xl p-5 gap-2.5 z-50 text-left font-inter text-[14.5px] leading-[22px] text-[#666666] items-start transition-opacity duration-200">
                  <HugeiconsIcon icon={InformationCircleIcon} size={22} className="text-black shrink-0 mt-0.5" />
                  <span>
                    Your deposit secures your slot instantly — 20% of the service price, minimum €5, maximum €35. Deducted from your total at the venue
                  </span>
                </div>
              </div>
            </div>
          )}
          <span>{isReturningCustomer ? "-" : `€${Math.round((totalPrice + (selectedAddons.length * 90)) * 0.2)}`}</span>
        </div>

        {/* Divider Line 564 */}
        <div className="border-t border-[#E5E5E5] w-full" />

        {/* Balance due at venue */}
        <div className="flex justify-between items-center text-base font-semibold py-2.5">
          <span>Balance due at venue</span>
          <span>€{isReturningCustomer ? (totalPrice + (selectedAddons.length * 90)) : Math.round((totalPrice + (selectedAddons.length * 90)) * 0.8)}</span>
        </div>
      </div>

      {/* Payment policy dropdown */}
      <div className="flex flex-col w-full">
        <div
          onClick={() => setShowPolicy(!showPolicy)}
          className="border-t border-b border-neutral-200 py-4 flex justify-between items-center text-xs font-semibold text-[#4E5F78] hover:bg-neutral-50 transition-colors cursor-pointer px-1 w-full"
        >
          <span>Payment & Cancellation Policy</span>
          <span className="text-xs transition-transform duration-200">{showPolicy ? "▲" : "▼"}</span>
        </div>
        
        {showPolicy && (
          <div className="bg-[#FFFFFF] border border-neutral-200 rounded-xl p-5 mt-3 flex flex-col gap-3 font-inter text-[#757575] text-[13.9px] leading-relaxed w-full">
            {isReturningCustomer ? (
              <>
                <p>
                  No deposit is required for this booking. You will pay the full service amount at the venue by cash or card.
                </p>
                <p>
                  🔒 Your card is securely stored through Stripe as a booking guarantee and will only be charged if a cancellation or no-show fee applies under the business's policy.
                </p>
                <div className="flex flex-col gap-2 pt-2 border-t border-neutral-100">
                  <span className="font-semibold text-neutral-800">Cancellation Policy Set by Yard Barber and Shop</span>
                  <ul className="flex flex-col gap-1.5 list-none pl-0">
                    <li className="flex items-start gap-2">
                      <span>✅</span>
                      <span>More than 24 hours before your appointment — Free cancellation with no charge.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>12–24 hours before your appointment — Cancellation fee of 50% of the full service price applies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>2–12 hours before your appointment — Late cancellation fee of 50% of the full service price applies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Less than 2 hours before your appointment — Late cancellation fee of 50% of the full service price applies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>❌</span>
                      <span>No-show — No-show fee of 100% of the full service price applies.</span>
                    </li>
                  </ul>
                </div>
                <p className="pt-2 border-t border-neutral-100 text-[12px] leading-normal italic">
                  Important: Cancellation and no-show fees are set solely by Yard Barber and Shop, not by Bookly. Fees are calculated based on the full service price. If you cancel within the free cancellation window, your card will not be charged.
                </p>
              </>
            ) : (
              <>
                <p>
                  Your booking deposit of €{Math.round((totalPrice + (selectedAddons.length * 90)) * 0.2)} is charged now to secure your appointment and will be deducted from your total service cost.
                </p>
                <p>
                  You will pay the remaining €{Math.round((totalPrice + (selectedAddons.length * 90)) * 0.8)} at the venue by cash or card.
                </p>
                <p>
                  Payment is processed securely via Stripe.
                </p>
                <div className="flex flex-col gap-2 pt-2 border-t border-[#E5E5E5]">
                  <span className="font-semibold text-neutral-800">Cancellation Policy Set by Yard Barber and Shop</span>
                  <ul className="flex flex-col gap-1.5 list-none pl-0">
                    <li className="flex items-start gap-2">
                      <span>✅</span>
                      <span>More than 24 hours before your appointment — Free cancellation and full deposit refund.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>12–24 hours before your appointment — Cancellation fee of 50% of the full service price applies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>2–12 hours before your appointment — Late cancellation fee of 50% of the full service price applies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>⚠️</span>
                      <span>Less than 2 hours before your appointment — Late cancellation fee of 50% of the full service price applies.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span>❌</span>
                      <span>No-show — No-show fee of 100% of the full service price applies.</span>
                    </li>
                  </ul>
                </div>
                <p className="pt-2 border-t border-neutral-100 text-[12px] leading-normal italic">
                  Important: Cancellation and no-show fees are set solely by Yard Barber and Shop, not by Bookly. Fees are calculated based on the full service price, not the deposit amount. Your card will only be charged according to the policy shown above.
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* Continue button */}
      <button
        onClick={() => {
          if (bookingStep === "addons") {
            setBookingStep("professionals");
          } else if (bookingStep === "professionals") {
            setBookingStep("time");
          } else if (bookingStep === "time") {
            setBookingStep("payment");
          } else if (bookingStep === "payment") {
            setBookingStep("confirmed");
          }
        }}
        className="w-full h-12 bg-[#2E9DA7] text-white font-poppins font-semibold text-base rounded-[12px] hover:opacity-95 transition-opacity cursor-pointer flex items-center justify-center gap-2 shadow-sm"
      >
        <span>{bookingStep === "payment" ? "Confirm" : "Continue →"}</span>
      </button>
    </aside>
  );
}
