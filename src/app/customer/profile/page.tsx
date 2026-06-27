"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Camera01Icon, Calendar02Icon, ArrowDown01Icon } from "@hugeicons/core-free-icons";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddToHomeScreenButton from "@/components/AddToHomeScreenButton";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";

import { countries } from "@/components/CountryData";
import ProfileAvatar from "@/components/ProfileAvatar";

export default function ProfilePage() {
  const router = useRouter();
  const dateInputRef = useRef<HTMLInputElement>(null);
  const countryDropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // App Install Banner State
  const [showBanner, setShowBanner] = useState(true);

  // Shared Navbar State
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  // Sync login status with localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("isLoggedIn");
      if (saved === "true") {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(true); // Default to true on profile page
      }
    }
  }, []);

  // Form State
  const [isEditing, setIsEditing] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [countrySearch, setCountrySearch] = useState("");


  // Default Profile Data
  const defaultProfile = {
    fullName: "Elena Papadopoulos",
    emailAddress: "elena.p@example.com",
    countryCode: "+357",
    countryIso: "cy",
    phoneNumber: "99 123 456",
    myAddress: "Limassol, Cyprus",
    gender: "Female",
    dateOfBirth: "2027-01-01", // stored in YYYY-MM-DD format
    avatar: "/img/authImg.png"
  };

  const [profileData, setProfileData] = useState(defaultProfile);

  // Load profile data from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("profileData");
      if (saved) {
        try {
          setProfileData(JSON.parse(saved));
        } catch (e) {
          console.error("Error parsing profileData", e);
        }
      }
    }
  }, []);

  // Edit Temp Form Data
  const [formData, setFormData] = useState({ ...profileData });

  // Update temp form data when entering edit mode
  useEffect(() => {
    if (isEditing) {
      setFormData({ ...profileData });
    }
  }, [isEditing, profileData]);

  // Click outside to close country dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (countryDropdownRef.current && !countryDropdownRef.current.contains(event.target as Node)) {
        setShowCountryDropdown(false);
        setCountrySearch(""); // Reset search query when closing
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileData({ ...formData });
    if (typeof window !== "undefined") {
      localStorage.setItem("profileData", JSON.stringify(formData));
      window.dispatchEvent(new Event("profileUpdate"));
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  // Trigger browser's native date picker on calendar icon or input click
  const triggerDatePicker = () => {
    if (dateInputRef.current) {
      try {
        dateInputRef.current.showPicker();
      } catch (e) {
        dateInputRef.current.focus();
      }
    }
  };

  // Format date for display view (e.g. "2027-01-01" -> "Jan 1, 2027")
  const formatDateDisplay = (dateString: string) => {
    if (!dateString) return "";
    const parts = dateString.split("-");
    if (parts.length !== 3) return dateString;
    const dateObj = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
    return dateObj.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  // Get current country flag image url
  const getFlagUrl = (code: string) => {
    const match = countries.find(c => c.code === code);
    return match ? `https://flagcdn.com/w20/${match.iso}.png` : "https://flagcdn.com/w20/cy.png";
  };

  // Handle Photo Upload & conversion to Base64
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        if (isEditing) {
          setFormData(prev => ({ ...prev, avatar: base64String }));
        } else {
          setProfileData(prev => {
            const updated = { ...prev, avatar: base64String };
            if (typeof window !== "undefined") {
              localStorage.setItem("profileData", JSON.stringify(updated));
              window.dispatchEvent(new Event("profileUpdate"));
            }
            return updated;
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col relative overflow-x-hidden font-poppins">
      {/* Background Soft Orbs */}
      <EdgeSoftOrbsTop
        size={380}
        duration={56}
        intensity={0.85}
        blend="screen"
        zIndex={-5}
      />

      <div className="absolute top-0 left-0 -z-10 w-full pointer-events-none opacity-40">
        <img src="/designImg/topEllipes.svg" alt="" className="absolute top-0 left-0 w-[500px] h-[500px]" />
      </div>

      {/* 1. App Install Banner */}
      {showBanner && (
        <div className="w-full bg-[#96C3CD] text-[#111111] px-3 sm:px-[16px] py-2.5 sm:py-[16px] flex items-center justify-between transition-all duration-300 relative z-50 text-[10px] sm:text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-[17px] h-[20px] flex items-center justify-center shrink-0">
              <img src="/img/smallBLogo.svg" alt="B" className="w-full h-full object-contain" />
            </div>
            <span className="truncate">Book local services in Cyprus — instantly, any time</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
            <AddToHomeScreenButton size="small" className="px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs" />
            <button
              onClick={() => setShowBanner(false)}
              className="text-[#1C1B1C] hover:opacity-75 transition-opacity cursor-pointer p-1"
              aria-label="Close Banner"
            >
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* 2. Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Breadcrumbs Container (Pushed to the left, matching left-padding/margins of navbar logo/links) */}
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-8 xl:px-[68px] mt-6 md:mt-[40px]">
        {/* Breadcrumbs Frame 2147240015 */}
        <nav className="flex flex-row items-center p-0 gap-3 h-6">
          {/* Home Link */}
          <button 
            onClick={() => router.push("/")} 
            className="font-poppins font-normal text-sm leading-5 tracking-[0.075em] uppercase text-black hover:opacity-70 transition-opacity cursor-pointer"
          >
            Home
          </button>
          
          {/* Arrow Separator */}
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 7L14.5 12L9.5 17" stroke="#0C0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>

          {/* Profile details Page Title */}
          <span className="font-poppins font-normal text-sm leading-5 tracking-[0.075em] uppercase text-black">
            {isEditing ? "Edit Profile" : "Profile details"}
          </span>
        </nav>
      </div>

      {/* Main Content Area (Centered Container - Heading & Card perfectly left-aligned in the middle of page) */}
      <main className="flex-1 w-full max-w-[908px] mx-auto px-4 md:px-8 xl:px-0 mt-6 flex flex-col items-start gap-8 z-10 relative">
        
        {/* Profile Card Container Frame 2147239599 */}
        <div className="flex flex-col items-start p-0 gap-8 w-full">
          
          {/* Heading 1 */}
          <div className="w-full flex flex-col items-start p-0 self-stretch">
            <h1 className="font-manrope font-bold text-[30px] leading-[36px] tracking-[-0.75px] text-[#1C1B1C] self-stretch">
              {isEditing ? "Edit Profile" : "Profile Details"}
            </h1>
          </div>

          <div className="w-full box-border flex flex-col md:flex-row items-start p-6 md:p-8 gap-8 bg-white border border-[#C6C6CB] rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
            <ProfileAvatar 
              avatarUrl={isEditing ? formData.avatar : profileData.avatar} 
              onAvatarChange={(newAvatar) => {
                if (isEditing) {
                  setFormData(prev => ({ ...prev, avatar: newAvatar }));
                } else {
                  setProfileData(prev => {
                    const updated = { ...prev, avatar: newAvatar };
                    if (typeof window !== "undefined") {
                      localStorage.setItem("profileData", JSON.stringify(updated));
                      window.dispatchEvent(new Event("profileUpdate"));
                    }
                    return updated;
                  });
                }
              }} 
            />

            {/* Right side fields & actions */}
            <div className="flex-1 flex flex-col gap-8 w-full">
              
              {!isEditing ? (
                /* Profile Details View Mode */
                <div className="w-full flex flex-col gap-8">
                  {/* Grid fields */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full max-w-[682px]">
                    
                    {/* Full Name */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Full name
                      </span>
                      <span className="font-manrope font-medium text-[18px] leading-7 text-[#1C1B1C] break-words">
                        {profileData.fullName}
                      </span>
                    </div>

                    {/* Email Address */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Email address
                      </span>
                      <span className="font-manrope font-medium text-[18px] leading-7 text-[#1C1B1C] break-words">
                        {profileData.emailAddress}
                      </span>
                    </div>

                    {/* Phone Number */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Phone number
                      </span>
                      <span className="font-manrope font-medium text-[18px] leading-7 text-[#1C1B1C] flex items-center gap-1.5">
                        <img 
                          src={`https://flagcdn.com/w20/${profileData.countryIso || "cy"}.png`} 
                          alt="Flag" 
                          className="w-4 h-3 object-cover shrink-0" 
                        />
                        <span>{profileData.countryCode} {profileData.phoneNumber}</span>
                      </span>
                    </div>

                    {/* My Address */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        My address
                      </span>
                      <span className="font-manrope font-medium text-[18px] leading-7 text-[#1C1B1C] break-words">
                        {profileData.myAddress}
                      </span>
                    </div>

                    {/* Gender */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Gender
                      </span>
                      <span className="font-manrope font-medium text-[18px] leading-7 text-[#1C1B1C]">
                        {profileData.gender}
                      </span>
                    </div>

                    {/* Date of Birth */}
                    <div className="flex flex-col items-start gap-1">
                      <span className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Date of birth
                      </span>
                      <span className="font-manrope font-medium text-[18px] leading-7 text-[#1C1B1C]">
                        {formatDateDisplay(profileData.dateOfBirth)}
                      </span>
                    </div>

                  </div>

                  {/* Action buttons */}
                  <div className="flex flex-row justify-end items-center gap-4 w-full pt-4 border-t border-neutral-100 max-w-[682px]">
                    
                    {/* Edit Profile Button */}
                    <button 
                      onClick={() => setIsEditing(true)}
                      style={{
                        background: "linear-gradient(0deg, rgba(12, 192, 223, 0.2), rgba(12, 192, 223, 0.2)), #8EBAC5"
                      }}
                      className="w-[132px] h-[46px] flex justify-center items-center rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="font-manrope font-semibold text-base leading-6 text-[#111111]">
                        Edit Profile
                      </span>
                    </button>

                    {/* Reset Password Button */}
                    <button 
                      onClick={() => alert("Password reset link sent to your email.")}
                      className="w-[171.59px] h-[46px] box-border border border-[#C6C6CB] flex justify-center items-center rounded-lg hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer"
                    >
                      <span className="font-manrope font-semibold text-base leading-6 text-[#1C1B1C]">
                        Reset Password
                      </span>
                    </button>

                  </div>

                </div>
              ) : (
                /* Profile Edit Mode Form */
                <form onSubmit={handleSave} className="w-full flex flex-col gap-8">
                  
                  {/* Grid Fields Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 w-full max-w-[682px]">
                    
                    {/* Full Name Input */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Name
                      </label>
                      <input 
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                        className="w-full h-11 px-4 border border-[#C6C6CB] rounded-lg text-sm focus:outline-none focus:border-[#8EBAC5] font-manrope font-medium text-[#1C1B1C]"
                      />
                    </div>

                    {/* Email Address Input */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Email
                      </label>
                      <input 
                        type="email"
                        value={formData.emailAddress}
                        onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}
                        required
                        className="w-full h-11 px-4 border border-[#C6C6CB] rounded-lg text-sm focus:outline-none focus:border-[#8EBAC5] font-manrope font-medium text-[#1C1B1C]"
                      />
                    </div>

                    {/* Phone Number Input */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Phone number
                      </label>
                      <div className="flex w-full h-11 border border-[#C6C6CB] rounded-lg">
                        
                        {/* Custom Country flag selector (Logo / flag + code - No country shortform, Custom React Dropdown Menu) */}
                        <div 
                          className="relative shrink-0 flex items-center border-r border-[#C6C6CB] bg-[#FCFCFD] select-none rounded-l-lg" 
                          ref={countryDropdownRef}
                        >
                          <div 
                            className="flex items-center gap-1.5 px-3 h-full cursor-pointer hover:bg-neutral-50/50 transition-colors rounded-l-lg"
                            onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                          >
                            <img 
                              src={`https://flagcdn.com/w20/${formData.countryIso || "cy"}.png`} 
                              alt="Flag" 
                              className="w-4 h-3 object-cover shrink-0" 
                            />
                            <span className="font-manrope font-medium text-[#1C1B1C] text-sm">{formData.countryCode}</span>
                            <HugeiconsIcon icon={ArrowDown01Icon} size={14} className="text-[#45474B]" />
                          </div>
                          
                          {/* Custom Dropdown (Absolute positioned flag logo lists for Windows) */}
                          {showCountryDropdown && (
                            <div className="absolute left-0 top-full mt-1.5 w-[250px] bg-white border border-[#C6C6CB] rounded-lg shadow-lg z-50 py-2 flex flex-col max-h-[280px]">
                              {/* Search Input */}
                              <div className="px-2 pb-2 border-b border-neutral-100 sticky top-0 bg-white z-10">
                                <input
                                  type="text"
                                  placeholder="Search country..."
                                  value={countrySearch}
                                  onChange={(e) => setCountrySearch(e.target.value)}
                                  className="w-full h-8 px-2 border border-neutral-200 rounded text-xs focus:outline-none focus:border-[#8EBAC5] font-manrope"
                                  onClick={(e) => e.stopPropagation()} // Prevent closing dropdown
                                />
                              </div>
                              
                              {/* List */}
                              <div className="overflow-y-auto flex-1">
                                {countries
                                  .filter(c => 
                                    c.name.toLowerCase().includes(countrySearch.toLowerCase()) || 
                                    c.code.includes(countrySearch) ||
                                    c.iso.toLowerCase().includes(countrySearch.toLowerCase())
                                  )
                                  .map((c, i) => (
                                    <button
                                      key={i}
                                      type="button"
                                      onClick={() => {
                                        setFormData({ 
                                          ...formData, 
                                          countryCode: c.code,
                                          countryIso: c.iso
                                        });
                                        setShowCountryDropdown(false);
                                        setCountrySearch(""); // Reset search
                                      }}
                                      className="flex items-center justify-between px-3 py-2 hover:bg-neutral-50 text-left w-full transition-colors cursor-pointer"
                                    >
                                      <div className="flex items-center gap-2 min-w-0">
                                        <img 
                                          src={`https://flagcdn.com/w20/${c.iso}.png`} 
                                          alt={c.code} 
                                          className="w-4 h-3 object-cover shrink-0" 
                                        />
                                        <span className="font-manrope font-medium text-xs text-[#1C1B1C] truncate">{c.name}</span>
                                      </div>
                                      <span className="font-manrope font-semibold text-xs text-neutral-400 shrink-0 pl-2">{c.code}</span>
                                    </button>
                                  ))}
                              </div>
                            </div>
                          )}
                        </div>

                        {/* Phone digit input */}
                        <input 
                          type="tel"
                          value={formData.phoneNumber}
                          onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                          required
                          className="flex-1 px-4 text-sm focus:outline-none font-manrope font-medium text-[#1C1B1C] rounded-r-lg"
                        />

                      </div>
                    </div>

                    {/* Address Input */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        My Address
                      </label>
                      <input 
                        type="text"
                        value={formData.myAddress}
                        onChange={(e) => setFormData({ ...formData, myAddress: e.target.value })}
                        required
                        className="w-full h-11 px-4 border border-[#C6C6CB] rounded-lg text-sm focus:outline-none focus:border-[#8EBAC5] font-manrope font-medium text-[#1C1B1C]"
                      />
                    </div>

                    {/* Gender Select Dropdown */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Gender
                      </label>
                      <div className="relative w-full">
                        <select 
                          value={formData.gender}
                          onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                          className="w-full h-11 px-4 border border-[#C6C6CB] rounded-lg text-sm focus:outline-none focus:border-[#8EBAC5] appearance-none font-manrope font-medium text-[#1C1B1C] cursor-pointer"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
                          <HugeiconsIcon icon={ArrowDown01Icon} size={16} className="text-[#45474B]" />
                        </div>
                      </div>
                    </div>

                    {/* Date of Birth Input with HTML5 native Date Picker (Hiding native indicator to show only custom one) */}
                    <div className="flex flex-col gap-1 w-full">
                      <label className="font-manrope font-semibold text-[12px] leading-4 tracking-[0.6px] uppercase text-[#45474B]">
                        Date of birth
                      </label>
                      <div className="relative w-full">
                        <input 
                          type="date"
                          ref={dateInputRef}
                          value={formData.dateOfBirth}
                          onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                          onClick={triggerDatePicker}
                          required
                          className="w-full h-11 pl-4 pr-10 border border-[#C6C6CB] rounded-lg text-sm focus:outline-none focus:border-[#8EBAC5] font-manrope font-medium text-[#1C1B1C] cursor-pointer [&::-webkit-calendar-picker-indicator]:hidden"
                        />
                        <button
                          type="button"
                          onClick={triggerDatePicker}
                          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center text-[#45474B] hover:text-[#111111]"
                        >
                          <HugeiconsIcon icon={Calendar02Icon} size={18} />
                        </button>
                      </div>
                    </div>

                  </div>

                  {/* Form Action Buttons */}
                  <div className="flex flex-row justify-end items-center gap-4 w-full pt-4 border-t border-neutral-100 max-w-[682px]">
                    
                    {/* Cancel Button */}
                    <button 
                      type="button"
                      onClick={handleCancel}
                      className="h-[46px] px-6 border border-[#C6C6CB] flex justify-center items-center rounded-lg hover:bg-neutral-50 active:scale-95 transition-all cursor-pointer font-manrope font-semibold text-base text-[#1C1B1C]"
                    >
                      Cancel
                    </button>

                    {/* Save Button */}
                    <button 
                      type="submit"
                      style={{
                        background: "linear-gradient(0deg, rgba(12, 192, 223, 0.2), rgba(12, 192, 223, 0.2)), #8EBAC5"
                      }}
                      className="h-[46px] px-8 flex justify-center items-center rounded-lg hover:opacity-90 active:scale-95 transition-all cursor-pointer font-manrope font-semibold text-base text-[#111111]"
                    >
                      Save
                    </button>

                  </div>

                </form>
              )}

            </div>

          </div>

        </div>

      </main>

      {/* 3. 500px Spacing Gap */}
      <div className="h-[500px] w-full" />

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
