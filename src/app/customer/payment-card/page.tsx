"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowLeft02Icon,
  InformationCircleIcon,
  SquareLock01Icon,
  CreditCardPosIcon,
  CheckmarkCircle02Icon,
} from "@hugeicons/core-free-icons";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";

export default function PaymentCardPage() {
  const router = useRouter();

  // Shared Navbar State
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // App Install Banner State
  const [showBanner, setShowBanner] = useState(true);

  // States
  const [hasSavedCard, setHasSavedCard] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Input states prefilled to match design screenshot
  const [cardName, setCardName] = useState("John Doe");
  const [cardNumber, setCardNumber] = useState("4444 333 2222 1111");
  const [expDate, setExpDate] = useState("MM / YY");
  const [cvv, setCvv] = useState("CVV");

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setHasSavedCard(false);
    setShowDeleteModal(false);
    setToastMessage("Card deleted successfully.");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const handleCardFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSavedCard(true);
    setToastMessage(hasSavedCard ? "Card replaced successfully." : "Card added successfully.");
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col relative overflow-x-hidden font-poppins">
      {/* Background Soft Orbs */}
      <EdgeSoftOrbsTop size={380} duration={56} intensity={0.85} blend="screen" zIndex={-5} />

      <div className="absolute top-0 left-0 -z-10 w-full pointer-events-none opacity-40">
        <img src="/designImg/topEllipes.svg" alt="" className="absolute top-0 left-0 w-[500px] h-[500px]" />
      </div>

      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Main Content Area */}
      <main className="flex-grow w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[130px] pt-8 pb-24 z-10">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-semibold text-[#808080] uppercase tracking-wider mb-8">
          <span className="cursor-pointer hover:text-black transition-colors" onClick={() => router.push("/")}>Home</span>
          <span>&gt;</span>
          <span className="text-[#1C1B1C]">Payment Card</span>
        </div>

        {/* Two Column Layout on Desktop */}
        <div className="w-full flex flex-col lg:flex-row gap-[102px] items-start">
          
          {/* Left Column: Title and subtitle */}
          <div className="w-full lg:w-[259px] shrink-0 flex flex-col gap-2">
            <h1 className="font-manrope font-extrabold text-[30px] leading-[36px] tracking-[-0.75px] text-[#1C1B1C] whitespace-nowrap">
              Payment card
            </h1>
            <p className="font-manrope font-normal text-[16px] leading-6 text-[#45474B]">
              Manage your saved payment cards.
            </p>
          </div>

          {/* Right Column: Custom Auto layout wrapper: Frame 2147239829 */}
          <div className="flex-1 w-full max-w-[717px] flex flex-col items-start gap-5 min-h-[500px] lg:mt-[108px]">
            <h2 className="w-full md:w-[339px] h-9 font-manrope font-medium text-[24px] leading-[36px] flex items-center text-[#1C1B1C] flex-none order-0 flex-grow-0">
              Add payment card information
            </h2>

            {/* Securing booking alert banner */}
            {hasSavedCard && (
              <div className="w-full flex flex-row items-start gap-3 bg-[#FDF4E6] border border-[#F5E6D3]/60 rounded-xl p-4 text-sm text-[#111111]/80 select-none">
                <HugeiconsIcon icon={InformationCircleIcon} className="w-5 h-5 text-[#4F80E1] shrink-0 mt-0.5" />
                <span className="font-poppins font-normal text-xs sm:text-[13px] text-[#111111] leading-relaxed">
                  Your card is currently securing an upcoming booking. For your protection and the business's, saved cards cannot be removed while a booking is active. Once your appointment is complete, you're welcome to update or remove your payment details anytime.
                </span>
              </div>
            )}

          {/* Primary Saved Card Box (Frame 2147240162) */}
          {hasSavedCard && (
            <div className="w-full flex flex-col items-start gap-4">
              <span className="text-sm font-medium tracking-[1px] uppercase text-[#111111]">
                Primary card
              </span>

              {/* Card display box: Frame 2147240161 */}
              <div className="w-full h-[76px] bg-white border border-[#111111]/60 rounded-xl px-5 py-3 flex items-center justify-between shadow-sm">
                {/* Left: Frame 2147240160 */}
                <div className="flex items-center gap-3">
                  {/* Visa Logo: Frame 2147240159 */}
                  <div className="w-[51.62px] h-[36px] bg-[#F5F4EE] rounded flex items-center justify-center p-2 shrink-0 select-none">
                    <img
                      src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/logo/visa.svg"
                      alt="Visa"
                      className="w-[28.15px] h-[12.54px] object-contain"
                    />
                  </div>

                  {/* Card number dots and expiry: Frame 2147240158 */}
                  <div className="flex flex-col gap-1">
                    {/* Dot group + last 4 digits: Frame 2147240157 */}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      </div>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      </div>
                      <div className="flex items-center gap-0.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-[#111111]" />
                      </div>
                      <span className="text-base font-semibold text-[#000000] font-poppins leading-none">
                        4242
                      </span>
                    </div>

                    <span className="text-[12px] font-medium text-[#111111] font-poppins">
                      Expires 09/27
                    </span>
                  </div>
                </div>

                {/* Right Lock Icon */}
                <HugeiconsIcon icon={SquareLock01Icon} size={24} className="text-[#0C0C0C]" />
              </div>

              {/* Delete Button (Frame 2147240240) */}
              <div className="w-full flex justify-end mt-1">
                <button
                  type="button"
                  disabled={true}
                  className="w-[99px] h-11 flex items-center justify-center rounded-lg text-sm font-semibold bg-[#FAECEC] text-[#D8A7A7] cursor-not-allowed transition-all duration-200 select-none"
                >
                  Delete
                </button>
              </div>
            </div>
          )}

          {/* Form Container (Frame 2147239612) */}
          <div className="w-full flex flex-col gap-5 mt-4">
            <form onSubmit={handleCardFormSubmit} className="w-full bg-white border border-[#F1F5F9] rounded-2xl p-6 flex flex-col gap-6 shadow-sm">
              {/* Form helper note */}
              <p className="text-sm sm:text-base font-normal text-[#111111] font-poppins leading-relaxed">
                {hasSavedCard
                  ? "Want to use a different card? Enter your new card details below and click Replace card. Your new card will take over immediately."
                  : "To use a different card, enter your new details below. To remove your ccard without replacing it, click Delete."}
              </p>

              {/* Line Divider */}
              <hr className="border-[#111111]/20 w-full" />

              {/* Inputs Wrapper (Frame 2147240164) */}
              <div className="flex flex-col gap-5">
                {/* Name On Card */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[11px] font-semibold text-[#16123E] tracking-wider uppercase">
                    NAME
                  </label>
                  <div className="w-full h-[60px] border border-[#ECEBEF] rounded-xl px-4 flex items-center bg-white focus-within:border-[#2E9DA7] transition-all">
                    <input
                      type="text"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full text-base font-medium text-[#5E598B] placeholder-[#5E598B]/50 bg-transparent focus:outline-none"
                      required
                    />
                  </div>
                </div>

                {/* Card Number */}
                <div className="flex flex-col gap-2 w-full">
                  <label className="text-[11px] font-semibold text-[#16123E] tracking-wider uppercase">
                    card number
                  </label>
                  <div className="w-full h-[60px] border border-[#ECEBEF] rounded-xl px-4 flex items-center bg-white focus-within:border-[#2E9DA7] transition-all gap-4">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="4444 333 2222 1111"
                      className="flex-1 text-base font-medium text-[#5E598B] placeholder-[#5E598B]/50 bg-transparent focus:outline-none"
                      required
                    />
                    {/* Brand Logos on right */}
                    <div className="flex items-center gap-1.5 shrink-0 opacity-80 select-none">
                      <img
                        src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/logo/visa.svg"
                        alt="Visa"
                        className="h-4 w-auto object-contain"
                      />
                      <img
                        src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/logo/mastercard.svg"
                        alt="Mastercard"
                        className="h-4 w-auto object-contain"
                      />
                      <img
                        src="https://raw.githubusercontent.com/aaronfagan/svg-credit-card-payment-icons/master/logo/amex.svg"
                        alt="Amex"
                        className="h-4 w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>

                {/* Expiry & CVV side by side */}
                <div className="flex flex-col sm:flex-row gap-4 w-full">
                  {/* Expiry Date */}
                  <div className="flex-1 flex flex-col gap-2">
                    <label className="text-[11px] font-semibold text-[#16123E] tracking-wider uppercase">
                      Expiration date
                    </label>
                    <div className="w-full h-[60px] border border-[#ECEBEF] rounded-xl px-4 flex items-center bg-white focus-within:border-[#2E9DA7] transition-all">
                      <input
                        type="text"
                        value={expDate}
                        onChange={(e) => setExpDate(e.target.value)}
                        placeholder="MM / YY"
                        className="w-full text-base font-medium text-[#5E598B] placeholder-[#5E598B]/50 bg-transparent focus:outline-none"
                        required
                      />
                    </div>
                  </div>

                  {/* Security Code */}
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex items-center gap-1.5 relative group">
                      <label className="text-[11px] font-semibold text-[#16123E] tracking-wider uppercase">
                        Security code
                      </label>
                      <div className="relative flex items-center">
                        <HugeiconsIcon
                          icon={InformationCircleIcon}
                          size={14}
                          className="text-[#111111]/70 cursor-help"
                        />

                        {/* Hover Tooltip Card (Frame 2147239627) */}
                        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:flex w-[307px] h-[84px] bg-white border border-[#ECEBEF] rounded-xl p-3 gap-3 shadow-lg z-50 items-start text-left pointer-events-none transition-all duration-200">
                          {/* Info Circle Icon inside tooltip */}
                          <div className="w-6 h-6 border-[1.5px] border-[#485BD6] rounded-full flex items-center justify-center shrink-0">
                            <svg className="w-3.5 h-3.5 text-[#485BD6]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </div>
                          <p className="text-[12px] font-medium leading-[20px] text-black font-poppins tracking-[0.01em]">
                            The 3-digit code on the back of your card. Amex cards have a 4-digit code on the front.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="w-full h-[60px] border border-[#ECEBEF] rounded-xl px-4 flex items-center bg-white focus-within:border-[#2E9DA7] transition-all gap-3">
                      <input
                        type="text"
                        value={cvv}
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="CVV"
                        className="flex-1 text-base font-medium text-[#5E598B] placeholder-[#5E598B]/50 bg-transparent focus:outline-none"
                        maxLength={4}
                        required
                      />
                      <HugeiconsIcon icon={CreditCardPosIcon} size={20} className="text-[#454070]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Buttons */}
              <div className="flex justify-end gap-4 mt-2">
                <button
                  type="button"
                  onClick={() => router.push("/")}
                  className="w-[104px] h-[46px] border border-[#C6C6CB] hover:bg-[#F5F5F7] rounded-lg text-sm font-semibold text-[#1C1B1C] cursor-pointer transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 h-[46px] bg-[#8EBAC5] hover:bg-[#72A6B2] text-white font-semibold rounded-lg text-sm cursor-pointer shadow-sm transition-all"
                >
                  {hasSavedCard ? "Replace card" : "Add card"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>

      <Footer />

      {/* Delete Confirmation Modal Overlay */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-[#1C1B1C]/60 flex items-center justify-center p-4 z-[999] backdrop-blur-sm transition-all duration-300">
          <div className="bg-white border border-[#E8E6FF] w-full max-w-[420px] rounded-[24px] p-8 shadow-xl flex flex-col items-center text-center transform scale-100 transition-all">
            {/* Red Alert Icon */}
            <div className="w-14 h-14 bg-red-100 rounded-full flex items-center justify-center text-red-600 mb-5">
              <span className="text-3xl font-bold leading-none font-manrope">!</span>
            </div>

            <h3 className="text-xl sm:text-[22px] font-semibold text-[#1A1A1A] tracking-tight leading-tight mb-2">
              Are you sure you want to delete
            </h3>
            <p className="text-sm text-[#757575] leading-relaxed mb-6 max-w-[280px]">
              If you delete this card, it will delete permanently.
            </p>

            {/* Modal Buttons */}
            <div className="flex gap-4 w-full">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="flex-1 h-11 border border-[#C6C6CB] hover:bg-[#F5F5F7] text-sm font-semibold text-[#1C1B1C] rounded-lg cursor-pointer transition-colors"
              >
                No
              </button>
              <button
                type="button"
                onClick={confirmDelete}
                className="flex-1 h-11 bg-[#DC3545] hover:bg-[#BD2130] text-sm font-semibold text-white rounded-lg cursor-pointer transition-colors"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast Notification */}
      {showSuccessToast && (
        <div className="fixed bottom-6 right-6 bg-[#1A1A1A] text-white py-3.5 px-5 rounded-xl shadow-lg z-[1000] flex items-center gap-3 animate-fade-in border border-white/10">
          <HugeiconsIcon icon={CheckmarkCircle02Icon} size={20} className="text-[#2E9DA7]" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
