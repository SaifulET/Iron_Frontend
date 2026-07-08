"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BarCode01Icon,
  Location01Icon,
  Directions01Icon,
  Calendar03Icon,
  Clock01Icon,
  Car04Icon
} from "@hugeicons/core-free-icons";
import { BookingItem } from "./mockBookings";

interface BookingCardProps {
  booking: BookingItem;
  openPolicies: Record<string, boolean>;
  togglePolicy: (id: string) => void;
  submittedReviews: Record<string, { stars: number; text: string; date: string }>;
  ratingHover: Record<string, number>;
  setRatingHover: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  ratingInput: Record<string, number>;
  setRatingInput: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  reviewInput: Record<string, string>;
  setReviewInput: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  handleReviewSubmit: (id: string) => void;
  onReschedule: (id: string) => void;
  onCancel: (id: string) => void;
}

export default function BookingCard({
  booking,
  openPolicies,
  togglePolicy,
  submittedReviews,
  ratingHover,
  setRatingHover,
  ratingInput,
  setRatingInput,
  reviewInput,
  setReviewInput,
  handleReviewSubmit,
  onReschedule,
  onCancel
}: BookingCardProps) {
  const router = useRouter();
  const isPolicyOpen = !!openPolicies[booking.id];
  const submitted = submittedReviews[booking.id];
  const hasReviewLeft = booking.isReviewed || !!submitted;
  const activeStars = submitted ? submitted.stars : (booking.reviewStars || 0);
  const activeReviewText = submitted ? submitted.text : (booking.reviewText || "");
  const activeReviewDate = submitted ? submitted.date : (booking.reviewDate || "");

  // No-show / Canceled helper triggers
  const isWaived = booking.noshowType === "waived_refund" || booking.noshowType === "waived_returning";

  return (
    <div className="w-full bg-[#FFFFFF] border border-[#C6C6CB] rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.05)] flex flex-col p-6 gap-6">
      
      {/* Top Content Row */}
      <div className="flex flex-col md:flex-row gap-6 w-full items-start">
        
        {/* Image Block */}
        <div className="w-[80px] h-[80px] border border-[#C6C6CB] rounded-lg overflow-hidden flex-shrink-0 relative">
          <Image
            src={booking.imageUrl}
            alt={booking.businessName}
            fill
            className="object-cover"
            sizes="80px"
          />
        </div>

        {/* Main Booking Details */}
        <div className="flex-1 flex flex-col gap-3 min-w-0">
          
          {/* Title and Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="font-manrope font-bold text-lg leading-7 text-[#020305]">
              {booking.serviceTitle}
            </h2>
            <span className={`px-2.5 py-0.5 rounded-full font-manrope font-semibold text-xs leading-4 ${
              booking.paymentType === "completed"
                ? "bg-[#CFFED6] text-[#093213]"
                : booking.paymentType === "noshow" && isWaived
                ? "bg-[#EBFFEE] text-[#093213]"
                : booking.paymentType === "noshow" && !isWaived
                ? "bg-red-50 text-red-700"
                : booking.paymentType === "canceled" && booking.canceledType?.startsWith("by_business")
                ? "bg-[#CFDBFE] text-[#091032]"
                : booking.paymentType === "canceled"
                ? "bg-[#FEF8CF] text-[#322509]"
                : "bg-[#CFE1FE] text-[#091C32]"
            }`}>
              {booking.paymentType === "completed" 
                ? "Completed" 
                : booking.paymentType === "noshow" && isWaived
                ? "No-show - fee waived"
                : booking.paymentType === "noshow" && !isWaived
                ? "No-show"
                : booking.paymentType === "canceled" && booking.canceledType?.startsWith("by_business")
                ? "Canceled by business"
                : booking.paymentType === "canceled"
                ? "Canceled by you"
                : "Confirmed"}
            </span>
          </div>

          {/* Barcode / Reference number using Hugeicons */}
          <div className="flex items-center gap-1.5 text-sm text-[#111111] font-manrope">
            <HugeiconsIcon icon={BarCode01Icon} className="w-4 h-4 text-[#141B34]" />
            <span>{booking.bookingCode}</span>
          </div>

          {/* Business Name and Phone */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope">
            <div className="flex items-center gap-1">
              <img src="/Icons/salonNameIcon.svg" className="w-[13.4px] h-[12px] object-contain" alt="salon" />
              <span className="font-normal">{booking.businessName}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1.5">
              <img src="/Icons/phone.svg" className="w-3 h-3 object-contain" alt="phone" />
              <span className="font-normal">{booking.phone}</span>
            </div>
          </div>

          {/* Location and Directions */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope">
            <div className="flex items-center gap-1.5">
              {booking.address.includes("Archangelou") ? (
                <>
                  <HugeiconsIcon icon={Car04Icon} className="w-4 h-4 text-[#111111]" />
                  <span className="font-normal">Traveling to you</span>
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={Location01Icon} className="w-4 h-4 text-[#111111]" />
                  <span className="font-normal">{booking.address}</span>
                </>
              )}
            </div>
            {booking.address.includes("Archangelou") && (
              <>
                <span className="text-gray-400">•</span>
                <span className="font-normal text-gray-600">{booking.address}</span>
              </>
            )}
            {!booking.address.includes("Archangelou") && (
              <>
                <span className="text-gray-400">•</span>
                <a href="#" className="text-[#2E9DA7] font-normal hover:underline flex items-center gap-1">
                  <HugeiconsIcon icon={Directions01Icon} className="w-4 h-4 text-[#2E9DA7]" />
                  <span className="text-[#2E9DA7]">Get Directions</span>
                </a>
              </>
            )}
          </div>

          {/* Date and Time Details */}
          <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope font-medium">
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={Calendar03Icon} className="w-4 h-4 text-[#111111]" />
              <span>{booking.date} at 10:30 AM</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-[#111111]" />
              <span>{booking.time}</span>
            </div>
            <span className="text-gray-400">•</span>
            <div className="flex items-center gap-1">
              <span>{booking.duration}</span>
            </div>
          </div>

          {/* Extra bookedOn and No-show logs */}
          {booking.bookedOnText && (
            <div className="flex flex-wrap items-center gap-2 text-sm text-[#111111] font-manrope font-medium mt-1">
              <div className="flex items-center gap-1">
                <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-[#111111]" />
                <span>{booking.bookedOnText}</span>
              </div>
              {(booking.noshowDateText || booking.canceledDateText) && (
                <>
                  <span className="text-gray-400">•</span>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-semibold">✕</span>
                    <span>{booking.noshowDateText || booking.canceledDateText}</span>
                  </div>
                </>
              )}
            </div>
          )}

        </div>

        {/* Right Side Buttons Layout */}
        <div className="w-full md:w-[209px] flex flex-col gap-3 flex-shrink-0">
          <button 
            onClick={() => router.push(`/customer/bookings/view?id=${booking.id}`)}
            className="w-full py-2 bg-[#FCF8F8] border border-[#C6C6CB] rounded-lg text-sm font-medium text-[#020305] hover:bg-neutral-100 transition-colors"
          >
            View
          </button>
          
          {["completed", "noshow", "canceled"].includes(booking.paymentType) ? (
            <button 
              onClick={() => onReschedule(booking.id)}
              className="w-full py-2 border rounded-lg text-sm font-medium transition-colors bg-[#8EBAC5] bg-opacity-40 border-[#C6C6CB] text-[#020305] hover:bg-opacity-60"
            >
              Rebook
            </button>
          ) : (
            <>
              <button
                onClick={() => onReschedule(booking.id)}
                disabled={["passed_fee", "passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)}
                className={`w-full py-2 border rounded-lg text-sm font-medium transition-colors ${
                  ["passed_fee", "passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)
                    ? "bg-neutral-50 border-neutral-200 text-neutral-300 cursor-not-allowed"
                    : "bg-[#FCF8F8] border-[#C6C6CB] text-[#020305] hover:bg-neutral-100"
                }`}
              >
                Reschedule (2 left)
              </button>

              <button
                onClick={() => onCancel(booking.id)}
                disabled={["passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)}
                className={`w-full py-2 border rounded-lg text-sm font-medium transition-colors ${
                  ["passed_not_possible", "completed", "noshow", "canceled"].includes(booking.paymentType)
                    ? "bg-red-50/30 border-red-100/50 text-red-300 cursor-not-allowed"
                    : "bg-[#FCF8F8] border-[rgba(186,26,26,0.2)] text-[#BA1A1A] hover:bg-red-50"
                }`}
              >
                Cancel
              </button>
            </>
          )}
        </div>

      </div>

      {/* Payment Summary (Completed state only) */}
      {booking.paymentType === "completed" && booking.paymentSummary && (
        <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-[#FCFAF9] hover:bg-neutral-50 transition-colors"
            onClick={() => togglePolicy(booking.id)}
          >
            <span className="font-poppins font-medium text-base text-[#1C1B1C]">
              Payment summary
            </span>
            <span className={`text-xs transform transition-transform duration-200 ${isPolicyOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </div>

          {isPolicyOpen && (
            <div className="p-4 flex flex-col gap-3 bg-[#FCFAF9] border-t border-[#EBEBEB] text-sm font-poppins">
              <div className="flex justify-between items-center text-[#4E5F78]">
                <span>Service total</span>
                <span className="font-manrope font-normal text-[#4E5F78]">{booking.paymentSummary.total}</span>
              </div>
              <div className="flex justify-between items-center text-[#4E5F78]">
                <span>{booking.paymentSummary.noDepositVariant ? "Returning customer - no deposit" : "Deposit paid online"}</span>
                <span className="font-manrope font-normal text-[#4E5F78]">{booking.paymentSummary.depositPaid}</span>
              </div>
              <div className="flex justify-between items-center text-[#4E5F78]">
                <span>Balance paid at venue</span>
                <span className="font-manrope font-normal text-[#4E5F78]">{booking.paymentSummary.balancePaid}</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* No-show details expander (Waived / Charged summaries) */}
      {booking.paymentType === "noshow" && booking.noshowSummary && (
        <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
          
          {/* Header banner */}
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors ${
              isWaived ? "bg-[#EBFFEE] hover:bg-[#D6FEDD]" : "bg-red-50 hover:bg-red-100/70"
            }`}
            onClick={() => togglePolicy(booking.id)}
          >
            <div className="flex items-center gap-2">
              {isWaived ? (
                <span className="font-poppins font-semibold text-base text-[#1F8900]">
                  No-show fee waived
                </span>
              ) : (
                <span className="font-poppins font-semibold text-base text-red-800">
                  No-show fee charged • {booking.noshowSummary.totalCharged} total
                </span>
              )}
            </div>
            <span className={`text-xs transform transition-transform duration-200 ${isPolicyOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </div>

          {/* Collapsible panel body */}
          {isPolicyOpen && (
            <div className={`p-5 flex flex-col gap-4 border-t text-sm font-poppins ${isWaived ? "bg-[#EBFFEE] border-[#D6FEDD]" : "bg-red-50 border-red-100"}`}>
              
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center text-[#4E5F78]">
                  <span>Service price</span>
                  <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.servicePrice}</span>
                </div>

                {booking.noshowSummary.depositPaidText && (
                  <div className="flex justify-between items-center text-[#4E5F78]">
                    <span>{booking.noshowSummary.depositPaidText.includes("returning") ? "Deposit not needed - returning customer" : "Deposit paid"}</span>
                    <span className="font-manrope text-[#4E5F78]">
                      {booking.noshowSummary.depositPaidText.includes("returning") ? "-" : booking.noshowSummary.depositPaidText}
                    </span>
                  </div>
                )}

                <div className="flex justify-between items-center text-[#4E5F78]">
                  <span>{isWaived ? "No-show fee waived by Business name" : "No-show fee"}</span>
                  <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.noShowFee}</span>
                </div>

                {booking.noshowSummary.depositRetainedText && (
                  <div className="flex justify-between items-center text-[#4E5F78]">
                    <span>Deposit retained as no show fee</span>
                    <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.depositRetainedText}</span>
                  </div>
                )}

                {booking.noshowSummary.additionalChargeText && (
                  <div className="flex justify-between items-center text-[#4E5F78]">
                    <span>Additional charge to your card</span>
                    <span className="font-manrope text-[#4E5F78]">{booking.noshowSummary.additionalChargeText}</span>
                  </div>
                )}

                {booking.noshowSummary.chargeInitiatedText && (
                  <div className="flex justify-between items-center text-xs text-gray-500 italic pt-1 border-t border-dashed border-gray-200">
                    <span>{booking.noshowSummary.chargeInitiatedText}</span>
                    <span>-</span>
                  </div>
                )}
              </div>

              {booking.noshowSummary.footerNote && (
                <>
                  <div className="border-t border-gray-200/60 my-1 w-full" />
                  <p className="font-poppins font-normal text-sm text-[#4E5F78] leading-5 text-left">
                    {booking.noshowSummary.footerNote}
                  </p>
                </>
              )}

              {!isWaived && (
                <>
                  <div className="border-t border-gray-300 my-1 w-full" />
                  <div className="flex justify-between items-center font-bold text-red-800 text-base">
                    <span>Total no-show fee charged</span>
                    <span className="font-manrope">{booking.noshowSummary.totalCharged}</span>
                  </div>
                </>
              )}

            </div>
          )}

        </div>
      )}

      {/* Canceled details expander (Waived / Retained / Charged summaries) */}
      {booking.paymentType === "canceled" && booking.canceledSummary && (
        <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
          
          {/* Header banner */}
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors ${
              booking.canceledType === "by_you_free" || booking.canceledType?.startsWith("by_business")
                ? "bg-[#EBFFEE] hover:bg-[#D6FEDD]"
                : "bg-red-50 hover:bg-red-100/70"
            }`}
            onClick={() => togglePolicy(booking.id)}
          >
            <div className="flex items-center gap-2">
              {booking.canceledType === "by_you_free" ? (
                <span className="font-poppins font-semibold text-base text-[#1C1B1C]">
                  Canceled within free window • Deposit refunded {booking.canceledSummary.refundedToCard}
                </span>
              ) : booking.canceledType === "by_business_no_deposit" ? (
                <span className="font-poppins font-semibold text-base text-[#1C1B1C]">
                  Business name canceled this booking
                </span>
              ) : booking.canceledType === "by_business_deposit_refunded" ? (
                <span className="font-poppins font-semibold text-base text-[#1C1B1C]">
                  Business name canceled this booking • Deposit refunded {booking.canceledSummary.refundedToCard}
                </span>
              ) : booking.canceledType === "by_you_retained_13" ? (
                <span className="font-poppins font-semibold text-base text-red-800">
                  Canceled outside free window • Deposit retained {booking.canceledSummary.depositRetainedText}
                </span>
              ) : booking.canceledType === "by_you_retained_50" ? (
                <span className="font-poppins font-semibold text-base text-red-800">
                  Canceled outside free window • Deposit retained {booking.canceledSummary.totalFee}
                </span>
              ) : (
                <span className="font-poppins font-semibold text-base text-red-800">
                  Canceled outside free window • Cancellation fee {booking.canceledSummary.totalFee}
                </span>
              )}
            </div>
            <span className={`text-xs transform transition-transform duration-200 ${isPolicyOpen ? "rotate-180" : ""}`}>
              ▼
            </span>
          </div>

          {/* Collapsible panel body */}
          {isPolicyOpen && (
            <div className={`p-5 flex flex-col gap-4 border-t text-sm font-poppins ${
              booking.canceledType === "by_you_free" || booking.canceledType?.startsWith("by_business")
                ? "bg-[#EBFFEE] border-[#D6FEDD]"
                : "bg-red-50 border-red-100"
            }`}>
              
              <div className="flex flex-col gap-3 w-full">
                <div className="flex justify-between items-center text-[#4E5F78]">
                  <span>Service price</span>
                  <span className="font-manrope text-[#4E5F78]">{booking.canceledSummary.servicePrice}</span>
                </div>

                <div className="flex justify-between items-center text-[#4E5F78]">
                  <span>{booking.canceledSummary.returningCustomerNoDeposit ? "Returning customer - no deposit held" : "Deposit paid"}</span>
                  <span className="font-manrope text-[#4E5F78]">{booking.canceledSummary.depositPaid}</span>
                </div>

                {booking.canceledSummary.cancellationFee && (
                  <div className="flex justify-between items-center text-[#4E5F78]">
                    <span>Cancellation fee</span>
                    <span className="font-manrope text-[#4E5F78]">{booking.canceledSummary.cancellationFee}</span>
                  </div>
                )}

                {booking.canceledSummary.refundedToCard && (
                  <div className="flex justify-between items-center text-[#4E5F78]">
                    <span>{booking.canceledType?.startsWith("by_business") && booking.canceledSummary.depositPaid !== "€0.00" ? "Full refund to your card" : "Refunded to your card"}</span>
                    <span className="font-manrope text-[#4E5F78]">{booking.canceledSummary.refundedToCard}</span>
                  </div>
                )}

                {booking.canceledSummary.depositRetainedText && (
                  <div className="flex justify-between items-center text-[#4E5F78]">
                    <span>Deposit retained as cancelation fee</span>
                    <span className="font-manrope text-[#4E5F78]">{booking.canceledSummary.depositRetainedText}</span>
                  </div>
                )}

                {booking.canceledSummary.additionalChargeText && (
                  <div className="flex justify-between items-center text-[#4E5F78]">
                    <span>Additional charge to your card</span>
                    <span className="font-manrope text-[#4E5F78]">{booking.canceledSummary.additionalChargeText}</span>
                  </div>
                )}

                {booking.canceledSummary.refundCompletedText && (
                  <div className="flex justify-between items-center text-[#1C1B1C] font-semibold pt-1 border-t border-dashed border-[#D6FEDD]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold">✓</span>
                      <span>{booking.canceledSummary.refundCompletedText}</span>
                    </div>
                    <span>-</span>
                  </div>
                )}
              </div>

              {booking.canceledSummary.footerNote && (
                <>
                  <div className={`border-t my-1 w-full ${booking.canceledType === "by_you_free" || booking.canceledType?.startsWith("by_business") ? "border-gray-200/60" : "border-red-200/60"}`} />
                  <p className="font-poppins font-normal text-sm text-[#4E5F78] leading-5 text-left">
                    {booking.canceledSummary.footerNote}
                  </p>
                </>
              )}

              {!(booking.canceledType === "by_you_free" || booking.canceledType?.startsWith("by_business")) && (
                <>
                  <div className="border-t border-gray-300 my-1 w-full" />
                  <div className="flex justify-between items-center font-bold text-red-800 text-base">
                    <span>{booking.canceledSummary.returningCustomerNoDeposit ? "Total charged to your saved card" : "Total cancellation fee"}</span>
                    <span className="font-manrope">{booking.canceledSummary.totalFee}</span>
                  </div>
                </>
              )}

            </div>
          )}

        </div>
      )}

      {/* Cancellation & No-Show Policy Accordion */}
      {["completed", "noshow", "canceled"].includes(booking.paymentType) && booking.policyRules && booking.policyRules.length > 0 && (
        <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
          
          <div
            className="flex items-center justify-between px-4 py-3 cursor-pointer select-none bg-white hover:bg-neutral-50 transition-colors"
            onClick={() => togglePolicy(booking.id + "-policy-collapse")}
          >
            <span className="font-poppins font-medium text-sm text-[#4E5F78]">
              View Cancellation & no-show policy
            </span>
            <div className="flex items-center gap-1 text-[#4E5F78]">
              <span className="font-poppins font-medium text-sm leading-5">Cancellation policy</span>
              <span className={`text-xs transform transition-transform duration-200 ${openPolicies[booking.id + "-policy-collapse"] ? "rotate-180" : ""}`}>
                ▼
              </span>
            </div>
          </div>

          {openPolicies[booking.id + "-policy-collapse"] && (
            <div className="p-5 flex flex-col gap-4 bg-white border-t border-[#EBEBEB] text-xs font-poppins">
              <h4 className="font-normal text-[#4E5F78]">
                {booking.serviceTitle} - cancellation & no show policy
              </h4>
              <div className="flex flex-col gap-3 w-full">
                {booking.policyRules.map((rule, index) => (
                  <div key={index} className="flex justify-between items-center text-xs font-poppins">
                    <span className={`font-normal ${rule.isHighlighted ? "text-[#BA1A1A] font-medium" : "text-[#4E5F78]"}`}>
                      {rule.label}
                    </span>
                    <span className={`font-semibold ${
                      rule.isGreen 
                        ? "text-[#30AE5A]" 
                        : rule.isHighlighted
                        ? "text-[#BA1A1A] font-bold"
                        : "text-[#4E5F78]"
                    }`}>
                      {rule.value}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-[#B3B3B3] my-1 w-full" />
              <p className="font-normal text-[#4E5F78]">
                Fees set by {booking.businessName}, not by Bookly. Based on full service price.
              </p>
            </div>
          )}

        </div>
      )}

      {/* Review Section (Completed tab only) */}
      {booking.paymentType === "completed" && (
        <div className="w-full">
          {hasReviewLeft ? (
            <div className="w-full p-4 border border-black rounded-xl flex flex-col gap-3 bg-white font-poppins">
              <div className="flex items-center justify-between">
                <span className="font-poppins font-medium text-base text-[#4E5F78]">Your review</span>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1">
                    {Array.from({ length: 5 }).map((_, idx) => (
                      <img
                        key={idx}
                        src={idx < activeStars ? "/Icons/rattingfull.svg" : "/Icons/ratting.svg"}
                        className="w-4 h-4 object-contain"
                        alt="star"
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-[#4E5F78]">{activeStars} out of 5</span>
                </div>
                <p className="text-base font-semibold italic text-[#4E5F78] mt-1">
                  {activeReviewText}
                </p>
                <p className="text-sm text-[#4E5F78] font-medium mt-1">
                  {activeReviewDate}
                </p>
              </div>
            </div>
          ) : (
            <div className="w-full p-4 border border-[#C6C6CB] rounded-xl flex flex-col gap-4 bg-white font-poppins">
              <h4 className="font-poppins font-medium text-sm text-[#4E5F78]">
                How was your experience? Leave a review for Uncle Sam Gents Salon
              </h4>
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, idx) => {
                  const starValue = idx + 1;
                  const isFilled = starValue <= (ratingHover[booking.id] || ratingInput[booking.id] || 0);
                  return (
                    <button
                      key={idx}
                      type="button"
                      onMouseEnter={() => setRatingHover((prev) => ({ ...prev, [booking.id]: starValue }))}
                      onMouseLeave={() => setRatingHover((prev) => ({ ...prev, [booking.id]: 0 }))}
                      onClick={() => setRatingInput((prev) => ({ ...prev, [booking.id]: starValue }))}
                      className="cursor-pointer transition-transform hover:scale-110"
                    >
                      <img
                        src={isFilled ? "/Icons/rattingfull.svg" : "/Icons/ratting.svg"}
                        className="w-4 h-4 object-contain"
                        alt="star"
                      />
                    </button>
                  );
                })}
              </div>
              <textarea
                placeholder="share your experience (optional)"
                value={reviewInput[booking.id] || ""}
                onChange={(e) => setReviewInput((prev) => ({ ...prev, [booking.id]: e.target.value }))}
                className="w-full p-3 border border-[#C6C6CB] rounded-lg text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:border-gray-600 resize-none h-20"
              />
              <div className="flex justify-start">
                <button
                  onClick={() => handleReviewSubmit(booking.id)}
                  disabled={!(ratingInput[booking.id] > 0)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    ratingInput[booking.id] > 0
                      ? "bg-[#8EBAC5] bg-opacity-80 text-[#020305] hover:bg-opacity-100 cursor-pointer"
                      : "bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200"
                  }`}
                >
                  Submit review
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Cancellation Policy Banner Section (For active/upcoming reservations) */}
      {booking.policyRules && booking.policyRules.length > 0 && booking.paymentType !== "completed" && booking.paymentType !== "noshow" && booking.paymentType !== "canceled" && (
        <div className="w-full flex flex-col rounded-lg overflow-hidden border border-[#EBEBEB]">
          
          {/* Banner header row */}
          <div
            className={`flex items-center justify-between px-4 py-3 cursor-pointer select-none transition-colors ${
              booking.paymentType === "passed_fee" || booking.paymentType === "passed_not_possible"
                ? "bg-[#FDF2E2] hover:bg-[#FBE9D4]"
                : "bg-[#FCFAF9] hover:bg-neutral-50"
            }`}
            onClick={() => togglePolicy(booking.id)}
          >
            
            {/* Alert info text */}
            <div className="flex items-center gap-2">
              {booking.paymentType === "passed_fee" || booking.paymentType === "passed_not_possible" ? (
                <>
                  <img src="/Icons/danger-outilne.svg" className="w-4 h-4 object-contain" alt="warning" />
                  <span className="font-poppins font-medium text-sm text-[#8A4B08] leading-5">
                    {booking.paymentType === "passed_fee" 
                      ? "Free cancellation window has passed - a fee applies if you cancel now"
                      : "Free cancellation window has passed - cancellation is not possible at this time"
                    }
                  </span>
                </>
              ) : (
                <>
                  <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4 text-[#2B8739]" />
                  <span className="font-poppins font-medium text-sm text-[#2B8739] leading-5">
                    Free cancellation until Wed 28 May at 10:30 AM
                  </span>
                </>
              )}
            </div>

            {/* Cancellation toggle trigger */}
            <div className="flex items-center gap-1.5 text-[#4E5F78]">
              <span className="font-poppins font-medium text-sm leading-5">Cancellation policy</span>
              <span className={`text-xs transform transition-transform duration-200 ${isPolicyOpen ? "rotate-180" : ""}`}>
                ▼
              </span>
            </div>

          </div>

          {/* Collapsible body */}
          {isPolicyOpen && (
            <div className="p-5 flex flex-col gap-4 bg-white border-t border-[#EBEBEB]">
              
              <h4 className="font-poppins font-normal text-xs text-[#4E5F78] leading-5">
                {booking.serviceTitle} - cancellation & no show policy
              </h4>

              <div className="flex flex-col gap-3 w-full">
                {booking.policyRules.map((rule, index) => (
                  <div key={index} className="flex justify-between items-center text-xs font-poppins">
                    <span className={`font-normal ${rule.isHighlighted ? "text-[#BA1A1A] font-medium" : "text-[#4E5F78]"}`}>
                      {rule.label}
                    </span>
                    <span className={`font-semibold ${
                      rule.isGreen 
                        ? "text-[#30AE5A]" 
                        : rule.isHighlighted
                        ? "text-[#BA1A1A] font-bold"
                        : "text-[#4E5F78]"
                    }`}>
                      {rule.value}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t border-[#B3B3B3] my-1 w-full" />
              <p className="font-poppins font-normal text-xs text-[#4E5F78] leading-5">
                Fees set by {booking.businessName}, not by Bookly. Based on full service price.
              </p>

            </div>
          )}

        </div>
      )}

    </div>
  );
}
