"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon } from "@hugeicons/core-free-icons";

// Components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import EdgeSoftOrbsTop from "@/components/EdgeSoftOrbsTop";
import SuccessModal from "@/components/auth/SuccessModal";
import { countries, Country } from "@/components/CountryData";

export default function SettingsPage() {
  const router = useRouter();
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const timezoneDropdownRef = useRef<HTMLDivElement>(null);

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
        setIsLoggedIn(true); // Default to logged in for settings view
      }
    }
  }, []);

  // Account linking states
  const [googleLinked, setGoogleLinked] = useState(true);
  const [facebookLinked, setFacebookLinked] = useState(true);
  const [appleLinked, setAppleLinked] = useState(true);

  // Notification states
  const [apptEmail, setApptEmail] = useState(true);
  const [apptText, setApptText] = useState(true);
  const [mktEmail, setMktEmail] = useState(false);

  // Language state
  const [showLangDropdown, setShowLangDropdown] = useState(false);
  const [selectedLang, setSelectedLang] = useState<Country>({
    name: "United States",
    code: "+1",
    iso: "us",
  });
  const [langSearch, setLangSearch] = useState("");

  // Timezone state
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);
  const [selectedTimezone, setSelectedTimezone] = useState("(UTC+02:00) Athens, Cyprus");
  const timezones = [
    "(UTC+02:00) Athens, Cyprus",
    "(UTC+00:00) London, United Kingdom",
    "(UTC+01:00) Berlin, Germany",
    "(UTC+05:30) New Delhi, India",
    "(UTC-05:00) New York, United States",
  ];

  // Modals
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Load preferences from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedGoogle = localStorage.getItem("settings_googleLinked");
      if (savedGoogle !== null) setGoogleLinked(savedGoogle === "true");

      const savedFb = localStorage.getItem("settings_facebookLinked");
      if (savedFb !== null) setFacebookLinked(savedFb === "true");

      const savedApple = localStorage.getItem("settings_appleLinked");
      if (savedApple !== null) setAppleLinked(savedApple === "true");

      const savedApptEmail = localStorage.getItem("settings_apptEmail");
      if (savedApptEmail !== null) setApptEmail(savedApptEmail === "true");

      const savedApptText = localStorage.getItem("settings_apptText");
      if (savedApptText !== null) setApptText(savedApptText === "true");

      const savedMktEmail = localStorage.getItem("settings_mktEmail");
      if (savedMktEmail !== null) setMktEmail(savedMktEmail === "true");

      const savedLangIso = localStorage.getItem("settings_langIso");
      if (savedLangIso !== null) {
        const found = countries.find(c => c.iso === savedLangIso);
        if (found) setSelectedLang(found);
      }

      const savedTimezone = localStorage.getItem("settings_timezone");
      if (savedTimezone !== null) setSelectedTimezone(savedTimezone);
    }
  }, []);

  // Sync state functions that update localstorage
  const toggleGoogle = () => {
    const next = !googleLinked;
    setGoogleLinked(next);
    localStorage.setItem("settings_googleLinked", String(next));
  };

  const toggleFacebook = () => {
    const next = !facebookLinked;
    setFacebookLinked(next);
    localStorage.setItem("settings_facebookLinked", String(next));
  };

  const toggleApple = () => {
    const next = !appleLinked;
    setAppleLinked(next);
    localStorage.setItem("settings_appleLinked", String(next));
  };

  const toggleApptEmail = () => {
    const next = !apptEmail;
    setApptEmail(next);
    localStorage.setItem("settings_apptEmail", String(next));
  };

  const toggleApptText = () => {
    const next = !apptText;
    setApptText(next);
    localStorage.setItem("settings_apptText", String(next));
  };

  const toggleMktEmail = () => {
    const next = !mktEmail;
    setMktEmail(next);
    localStorage.setItem("settings_mktEmail", String(next));
  };

  // Close dropdowns on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setShowLangDropdown(false);
      }
      if (timezoneDropdownRef.current && !timezoneDropdownRef.current.contains(event.target as Node)) {
        setShowTimezoneDropdown(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, []);

  const handlePasswordChangeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPasswordModalOpen(false);
    setSuccessMessage("Your password has been changed successfully.");
    setIsSuccessOpen(true);
  };

  const handleDeleteAccountSubmit = () => {
    setIsDeleteModalOpen(false);
    setSuccessMessage("Your account has been deleted permanently.");
    setIsSuccessOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#FDFBF9] flex flex-col relative overflow-x-hidden font-poppins">
      {/* Background Soft Orbs */}
      <EdgeSoftOrbsTop size={380} duration={56} intensity={0.85} blend="screen" zIndex={-5} />

      <div className="absolute top-0 left-0 -z-10 w-full pointer-events-none opacity-40">
        <img src="/designImg/topEllipes.svg" alt="" className="absolute top-0 left-0 w-[500px] h-[500px]" />
      </div>

      {/* App Install Banner */}
      {showBanner && (
        <div className="w-full bg-[#96C3CD] text-[#111111] px-3 sm:px-[16px] py-2.5 sm:py-[16px] flex items-center justify-between transition-all duration-300 relative z-50 text-[10px] sm:text-xs md:text-sm font-medium">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="w-[17px] h-[20px] flex items-center justify-center shrink-0">
              <img src="/img/smallBLogo.svg" alt="B" className="w-full h-full object-contain" />
            </div>
            <span className="truncate">Book local services in Cyprus — instantly, any time</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-4 shrink-0">
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

      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Breadcrumbs */}
      <div className="w-full max-w-[1024px] mx-auto px-4 md:px-8 xl:px-0 mt-6 md:mt-[40px]">
        <nav className="flex flex-row items-center p-0 gap-3 h-6">
          <button
            onClick={() => router.push("/")}
            className="font-poppins font-normal text-sm leading-5 tracking-[0.075em] uppercase text-black hover:opacity-70 transition-opacity cursor-pointer"
          >
            Home
          </button>
          <div className="w-6 h-6 flex items-center justify-center shrink-0">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 7L14.5 12L9.5 17" stroke="#0C0C0C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <span className="font-poppins font-normal text-sm leading-5 tracking-[0.075em] uppercase text-black">
            Settings
          </span>
        </nav>
      </div>

      {/* Main Settings Form Container */}
      <main className="flex-grow w-full max-w-[1024px] mx-auto px-4 md:px-8 xl:px-0 mt-[40px] flex flex-col gap-10">
        
        {/* Header */}
        <div className="w-full flex flex-col items-start p-0 gap-2">
          <h1 className="font-manrope font-bold text-[30px] leading-[36px] text-[#020305]">
            Settings
          </h1>
          <p className="font-manrope font-normal text-base leading-6 text-[#4E5F78]">
            Update your personal information, security, and preferences.
          </p>
        </div>

        {/* Sections Container */}
        <div className="w-full flex flex-col gap-8">
          
          {/* Linked Accounts Section */}
          <section className="bg-white border border-[#C6C6CB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex flex-col items-start overflow-hidden">
            <div className="w-full box-border border-b border-[#C6C6CB] px-6 py-4 flex flex-row items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <img src="/settingsIcons/link.svg" alt="Link" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-manrope font-bold text-lg leading-[28px] text-[#020305]">
                Linked Accounts
              </h2>
            </div>

            <div className="w-full p-6 flex flex-col gap-4 max-w-[910px]">
              
              {/* Google */}
              <div className="w-full box-border flex flex-row justify-between items-center p-4 border border-[#C6C6CB] rounded-lg">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-10 h-10 bg-[#EBE7E7] rounded-full flex items-center justify-center shrink-0">
                    <img src="/settingsIcons/google.svg" alt="Google" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-manrope font-bold text-base text-[#020305]">Google</span>
                      {googleLinked && (
                        <span className="bg-[#CFE1FE] text-[#53647D] px-2 py-0.5 rounded-full font-manrope font-bold text-[10px] uppercase tracking-wide">
                          Linked
                        </span>
                      )}
                    </div>
                    <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                      {googleLinked ? "Connected to elena.p@example.com" : "Not connected"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleGoogle}
                  className="font-manrope font-semibold text-sm text-[#BA1A1A] px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                >
                  {googleLinked ? "Unlink" : "Link"}
                </button>
              </div>

              {/* Facebook */}
              <div className="w-full box-border flex flex-row justify-between items-center p-4 border border-[#C6C6CB] rounded-lg">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-10 h-10 bg-[#EBE7E7] rounded-full flex items-center justify-center shrink-0">
                    <img src="/settingsIcons/facebook.svg" alt="Facebook" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-manrope font-bold text-base text-[#020305]">Facebook</span>
                      {facebookLinked && (
                        <span className="bg-[#CFE1FE] text-[#53647D] px-2 py-0.5 rounded-full font-manrope font-bold text-[10px] uppercase tracking-wide">
                          Linked
                        </span>
                      )}
                    </div>
                    <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                      {facebookLinked ? "Connected as Elena Papadopoulos" : "Not connected"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleFacebook}
                  className="font-manrope font-semibold text-sm text-[#BA1A1A] px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                >
                  {facebookLinked ? "Unlink" : "Link"}
                </button>
              </div>

              {/* Apple */}
              <div className="w-full box-border flex flex-row justify-between items-center p-4 border border-[#C6C6CB] rounded-lg">
                <div className="flex flex-row items-center gap-4">
                  <div className="w-10 h-10 bg-[#EBE7E7] rounded-full flex items-center justify-center shrink-0">
                    <img src="/settingsIcons/apple.svg" alt="Apple" className="w-6 h-6 object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className="font-manrope font-bold text-base text-[#020305]">Apple</span>
                      {appleLinked && (
                        <span className="bg-[#CFE1FE] text-[#53647D] px-2 py-0.5 rounded-full font-manrope font-bold text-[10px] uppercase tracking-wide">
                          Linked
                        </span>
                      )}
                    </div>
                    <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                      {appleLinked ? "Connected as Elena Papadopoulos" : "Not connected"}
                    </span>
                  </div>
                </div>
                <button
                  onClick={toggleApple}
                  className="font-manrope font-semibold text-sm text-[#BA1A1A] px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors"
                >
                  {appleLinked ? "Unlink" : "Link"}
                </button>
              </div>

            </div>
          </section>

          {/* Notification Preferences Section */}
          <section className="bg-white border border-[#C6C6CB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex flex-col items-start overflow-hidden">
            <div className="w-full box-border border-b border-[#C6C6CB] px-6 py-4 flex flex-row items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <img src="/settingsIcons/notification.svg" alt="Notification" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-manrope font-bold text-lg leading-[28px] text-[#020305]">
                Notification Preferences
              </h2>
            </div>

            <div className="w-full p-6 flex flex-col gap-6">
              <p className="font-manrope font-normal text-sm text-[#4E5F78]">
                We will send you updates about your appointments, news and offers.
              </p>

              {/* Appointment Notifications sub-area */}
              <div className="w-full flex flex-col gap-4">
                <div className="w-full border-b border-[#C6C6CB] pb-2">
                  <h3 className="font-manrope font-bold text-base text-[#020305]">
                    Appointment Notifications
                  </h3>
                </div>

                {/* Email toggle */}
                <div className="flex flex-row justify-between items-center py-4">
                  <div className="flex flex-col">
                    <span className="font-manrope font-bold text-base text-[#020305]">Email</span>
                    <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                      Receive booking confirmations and reminders via email.
                    </span>
                  </div>
                  <button
                    onClick={toggleApptEmail}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                      apptEmail ? "bg-[#1F8900]" : "bg-[#76777B]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                        apptEmail ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>

                {/* Text toggle */}
                <div className="flex flex-row justify-between items-center py-4 border-t border-[#C6C6CB]">
                  <div className="flex flex-col">
                    <span className="font-manrope font-bold text-base text-[#020305]">Text message</span>
                    <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                      Get real-time updates directly to your phone.
                    </span>
                  </div>
                  <button
                    onClick={toggleApptText}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                      apptText ? "bg-[#1F8900]" : "bg-[#76777B]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                        apptText ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

              {/* Marketing Notifications sub-area */}
              <div className="w-full flex flex-col gap-4 mt-4">
                <div className="w-full border-b border-[#C6C6CB] pb-2">
                  <h3 className="font-manrope font-bold text-base text-[#020305]">
                    Marketing Notifications
                  </h3>
                </div>

                {/* Marketing Email toggle */}
                <div className="flex flex-row justify-between items-center py-4">
                  <div className="flex flex-col">
                    <span className="font-manrope font-bold text-base text-[#020305]">Email</span>
                    <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                      Be the first to know about discounts and local events via email.
                    </span>
                  </div>
                  <button
                    onClick={toggleMktEmail}
                    className={`relative w-11 h-6 rounded-full transition-colors duration-200 cursor-pointer ${
                      mktEmail ? "bg-[#1F8900]" : "bg-[#76777B]"
                    }`}
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all duration-200 ${
                        mktEmail ? "left-[22px]" : "left-0.5"
                      }`}
                    />
                  </button>
                </div>
              </div>

            </div>
          </section>

          {/* General Preferences Section */}
          <section className="bg-white border border-[#C6C6CB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex flex-col items-start relative z-20">
            <div className="w-full box-border border-b border-[#C6C6CB] px-6 py-4 flex flex-row items-center gap-2">
              <div className="w-5 h-5 flex items-center justify-center">
                <img src="/settingsIcons/preferences.svg" alt="Preferences" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-manrope font-bold text-lg leading-[28px] text-[#020305]">
                General Preferences
              </h2>
            </div>

            <div className="w-full p-6 flex flex-col sm:flex-row gap-6">
              
              {/* Language Dropdown Container */}
              <div className="flex-1 flex flex-col gap-2 relative" ref={langDropdownRef}>
                <span className="font-manrope font-bold text-sm text-[#020305]">Language</span>
                <button
                  type="button"
                  onClick={() => setShowLangDropdown(!showLangDropdown)}
                  className="w-full box-border flex flex-row justify-between items-center p-3 bg-white border border-[#C6C6CB] rounded-lg text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={`https://flagcdn.com/w20/${selectedLang.iso}.png`}
                      alt={selectedLang.name}
                      className="w-5 h-3.5 object-cover shrink-0"
                    />
                    <span className="font-manrope font-normal text-base text-[#1C1B1C] truncate">
                      {selectedLang.name}
                    </span>
                  </div>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 text-neutral-500" />
                </button>

                {showLangDropdown && (
                  <div className="absolute top-[80px] left-0 w-full max-h-[220px] bg-white border border-[#C6C6CB] rounded-xl shadow-lg z-50 overflow-hidden flex flex-col">
                    <div className="p-2 border-b border-[#C6C6CB]">
                      <input
                        type="text"
                        placeholder="Search language..."
                        value={langSearch}
                        onChange={(e) => setLangSearch(e.target.value)}
                        className="w-full h-8 px-2 border border-neutral-200 rounded text-xs focus:outline-none font-manrope"
                      />
                    </div>
                    <div className="overflow-y-auto flex-1">
                      {countries
                        .filter(c => c.name.toLowerCase().includes(langSearch.toLowerCase()))
                        .map((c, i) => (
                          <button
                            key={i}
                            type="button"
                            onClick={() => {
                              setSelectedLang(c);
                              localStorage.setItem("settings_langIso", c.iso);
                              setShowLangDropdown(false);
                              setLangSearch("");
                            }}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-neutral-50 text-left w-full transition-colors cursor-pointer"
                          >
                            <img
                              src={`https://flagcdn.com/w20/${c.iso}.png`}
                              alt={c.name}
                              className="w-5 h-3.5 object-cover shrink-0"
                            />
                            <span className="font-manrope font-normal text-sm text-[#1C1B1C]">
                              {c.name}
                            </span>
                          </button>
                        ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Timezone Dropdown Container */}
              <div className="flex-1 flex flex-col gap-2 relative" ref={timezoneDropdownRef}>
                <span className="font-manrope font-bold text-sm text-[#020305]">Timezone</span>
                <button
                  type="button"
                  onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                  className="w-full box-border flex flex-row justify-between items-center p-3 bg-white border border-[#C6C6CB] rounded-lg text-left cursor-pointer"
                >
                  <span className="font-manrope font-normal text-base text-[#1C1B1C] truncate">
                    {selectedTimezone}
                  </span>
                  <HugeiconsIcon icon={ArrowDown01Icon} className="w-4 h-4 text-neutral-500" />
                </button>

                {showTimezoneDropdown && (
                  <div className="absolute top-[80px] left-0 w-full bg-white border border-[#C6C6CB] rounded-xl shadow-lg z-50 overflow-hidden py-1">
                    {timezones.map((tz, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => {
                          setSelectedTimezone(tz);
                          localStorage.setItem("settings_timezone", tz);
                          setShowTimezoneDropdown(false);
                        }}
                        className="px-4 py-2 hover:bg-neutral-50 text-left w-full transition-colors cursor-pointer font-manrope font-normal text-sm text-[#1C1B1C]"
                      >
                        {tz}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* Security & Data Section */}
          <section className="bg-white border border-[#C6C6CB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-xl flex flex-col items-start overflow-hidden">
            <div className="w-full box-border border-b border-[#C6C6CB] px-6 py-4 flex flex-row items-center gap-2">
              <div className="w-4 h-5 flex items-center justify-center">
                <img src="/settingsIcons/security.svg" alt="Security" className="w-full h-full object-contain" />
              </div>
              <h2 className="font-manrope font-bold text-lg leading-[28px] text-[#020305]">
                Security & Data
              </h2>
            </div>

            <div className="w-full p-6 flex flex-col gap-6">
              
              {/* Password */}
              <div className="flex flex-row justify-between items-center gap-4">
                <div className="flex-grow flex flex-col">
                  <span className="font-manrope font-bold text-sm text-[#020305]">Password</span>
                  <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                    Ensure your account is using a long, random password to stay secure.
                  </span>
                </div>
                <button
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="box-border flex flex-row justify-center items-center px-4 py-2 bg-white border border-[#C6C6CB] hover:bg-neutral-50 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-lg font-manrope font-semibold text-sm text-[#020305] whitespace-nowrap cursor-pointer"
                >
                  Change Password
                </button>
              </div>

              {/* Delete Account */}
              <div className="flex flex-row justify-between items-center gap-4 border-t border-[#C6C6CB] pt-6">
                <div className="flex-grow flex flex-col">
                  <span className="font-manrope font-bold text-sm text-[#BA1A1A]">Delete Account</span>
                  <span className="font-manrope font-normal text-sm text-[#4E5F78]">
                    Permanently delete your account and all of its associated data. This action cannot be undone.
                  </span>
                </div>
                <button
                  onClick={() => setIsDeleteModalOpen(true)}
                  className="flex flex-row justify-center items-center px-4 py-2 bg-[#BA1A1A] hover:bg-red-700 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-lg font-manrope font-semibold text-sm text-white whitespace-nowrap cursor-pointer"
                >
                  Delete account
                </button>
              </div>

            </div>
          </section>

        </div>
      </main>

      {/* Spacing Gap */}
      <div className="h-[200px]" />

      {/* Footer */}
      <Footer />

      {/* Change Password Dialog Modal */}
      {isPasswordModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[300] p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C6C6CB] p-6 w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-manrope font-bold text-xl text-[#020305] mb-4">
              Change Password
            </h3>
            <form onSubmit={handlePasswordChangeSubmit} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="font-manrope font-semibold text-xs text-[#4E5F78] uppercase">Current Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-11 px-3 border border-[#C6C6CB] rounded-lg focus:outline-none focus:border-[#0CC0DF] font-manrope text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-manrope font-semibold text-xs text-[#4E5F78] uppercase">New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-11 px-3 border border-[#C6C6CB] rounded-lg focus:outline-none focus:border-[#0CC0DF] font-manrope text-sm"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="font-manrope font-semibold text-xs text-[#4E5F78] uppercase">Confirm New Password</label>
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full h-11 px-3 border border-[#C6C6CB] rounded-lg focus:outline-none focus:border-[#0CC0DF] font-manrope text-sm"
                />
              </div>
              <div className="flex flex-row justify-end items-center gap-3 mt-4">
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(false)}
                  className="px-4 py-2 border border-[#C6C6CB] rounded-lg hover:bg-neutral-50 font-manrope font-semibold text-sm text-[#020305] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#1A1A1A] hover:bg-black text-white rounded-lg font-manrope font-semibold text-sm cursor-pointer"
                >
                  Change Password
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Account Confirmation Dialog Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-[300] p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-[#C6C6CB] p-6 w-full max-w-[480px] animate-in fade-in zoom-in-95 duration-200">
            <h3 className="font-manrope font-bold text-xl text-[#BA1A1A] mb-2">
              Delete Account
            </h3>
            <p className="font-manrope font-normal text-sm text-[#4E5F78] mb-6">
              Are you sure you want to delete your account? This action is permanent and cannot be undone. All of your appointments, profile data, and settings will be lost.
            </p>
            <div className="flex flex-row justify-end items-center gap-3">
              <button
                type="button"
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-[#C6C6CB] rounded-lg hover:bg-neutral-50 font-manrope font-semibold text-sm text-[#020305] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDeleteAccountSubmit}
                className="px-4 py-2 bg-[#BA1A1A] hover:bg-red-700 text-white rounded-lg font-manrope font-semibold text-sm cursor-pointer"
              >
                Yes, delete my account
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Notification Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onContinue={() => {
          setIsSuccessOpen(false);
          if (successMessage.includes("deleted")) {
            localStorage.setItem("isLoggedIn", "false");
            window.location.reload();
          }
        }}
      />
    </div>
  );
}
