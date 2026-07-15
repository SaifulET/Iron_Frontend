"use client";

import DashboardHeader from "@/components/dashboard/DashboardHeader";
import React, { useState, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  User02Icon,
  Notification01Icon,
  SecurityCheckIcon,
  Camera01Icon,
  ArrowDown01Icon
} from "@hugeicons/core-free-icons";

import { SettingsInput } from "../settings/SettingsInput";
import { SettingsToggle } from "../settings/SettingsToggle";
import { SettingsSubSidebar } from "../settings/SettingsSubSidebar";
import { Security2FAPanel } from "../settings/Security2FAPanel";

export default function SupervisorSettings() {
  const [activeSubTab, setActiveSubTab] = useState<string>("Personal info");

  // Personal Info States
  const [personalName, setPersonalName] = useState("Hohb doe");
  const [personalEmail, setPersonalEmail] = useState("supervisor@msplan.com");
  const [personalRole, setPersonalRole] = useState("Supervisor");
  const [personalPhone, setPersonalPhone] = useState("1234556666");

  // Initial Unsaved tracking states
  const [initialName, setInitialName] = useState("Hohb doe");
  const [initialEmail, setInitialEmail] = useState("supervisor@msplan.com");
  const [initialPhone, setInitialPhone] = useState("1234556666");

  const [profileImage, setProfileImage] = useState<string>("/businessDashboard/downLogo.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedImage = localStorage.getItem("settingsProfileImage");
      if (savedImage) {
        setProfileImage(savedImage);
      }
      const savedName = localStorage.getItem("supervisor_personalName");
      const savedEmail = localStorage.getItem("supervisor_personalEmail");
      const savedPhone = localStorage.getItem("supervisor_personalPhone");
      if (savedName) {
        setPersonalName(savedName);
        setInitialName(savedName);
      }
      if (savedEmail) {
        setPersonalEmail(savedEmail);
        setInitialEmail(savedEmail);
      }
      if (savedPhone) {
        setPersonalPhone(savedPhone);
        setInitialPhone(savedPhone);
      }
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("supervisor_personalName", personalName);
    localStorage.setItem("supervisor_personalEmail", personalEmail);
    localStorage.setItem("supervisor_personalPhone", personalPhone);
    setInitialName(personalName);
    setInitialEmail(personalEmail);
    setInitialPhone(personalPhone);
  };

  const handleCancel = () => {
    setPersonalName(initialName);
    setPersonalEmail(initialEmail);
    setPersonalPhone(initialPhone);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfileImage(base64String);
        localStorage.setItem("settingsProfileImage", base64String);
        window.dispatchEvent(new Event("settingsProfileUpdate"));
      };
      reader.readAsDataURL(file);
    }
  };

  // Country Picker State
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+357",
    name: "Cyprus",
    svg: (
      <svg className="w-5 h-3.5 shrink-0 rounded-[1px] shadow-[0px_0.5px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
        <rect width="900" height="600" fill="#fff"/>
        <path d="M418 135c3 1 12 1 18 3 7 3 20 6 30 11 11 6 22 13 32 20 15 11 31 24 41 38 7 11 14 26 15 39 1 14-3 30-10 42-10 17-27 28-44 36-16 8-36 12-54 13-18 1-38-3-54-10-18-8-32-23-40-41-4-9-6-20-6-30s1-19 5-28c9-21 27-37 46-49 13-8 27-14 42-17 11-3 20-5 27-5 2-8 3-15 4-22-2-6-5-12-8-17-7-14-19-25-33-33-14-9-31-13-48-12-17 0-35 5-49 15-13 9-23 23-28 38-5 13-6 29-2 43 4 15 12 28 22 39 12 13 27 23 44 29 18 7 38 9 57 7 19-2 38-9 54-19s28-25 35-43c7-17 9-37 4-55-4-19-14-36-28-49-14-13-32-21-50-25-18-4-37-3-55 2-17 5-33 14-46 26-12 12-21 28-24 45-3 15-2 32 4 47 6 15 16 27 28 37s27 16 43 19c15 3 32 2 47-3 15-5 28-15 37-28 9-12 13-28 12-43" fill="#D47000"/>
        <path d="M290 400s30 50 160 50 160-50 160-50-60 10-160 10-160-10-160-10z" fill="#006A3B"/>
      </svg>
    )
  });
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const countries = [
    {
      code: "+880",
      name: "Bangladesh",
      svg: (
        <svg className="w-5 h-3.5 shrink-0 rounded-[1px] shadow-[0px_0.5px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 20 12" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="12" fill="#006a4e"/>
          <circle cx="9" cy="6" r="4" fill="#f42a41"/>
        </svg>
      )
    },
    {
      code: "+1",
      name: "United States",
      svg: (
        <svg className="w-5 h-3.5 shrink-0 rounded-[1px] shadow-[0px_0.5px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg">
          <rect width="20" height="13" fill="#b22234"/>
          <path d="M0,1h20M0,3h20M0,5h20M0,7h20M0,9h20M0,11h20" stroke="#fff" strokeWidth={1}/>
          <rect width="8" height="7" fill="#3c3b6e"/>
          <circle cx="2" cy="2" r="0.4" fill="#fff"/>
          <circle cx="6" cy="2" r="0.4" fill="#fff"/>
          <circle cx="4" cy="3.5" r="0.4" fill="#fff"/>
          <circle cx="2" cy="5" r="0.4" fill="#fff"/>
          <circle cx="6" cy="5" r="0.4" fill="#fff"/>
        </svg>
      )
    },
    {
      code: "+44",
      name: "United Kingdom",
      svg: (
        <svg className="w-5 h-3.5 shrink-0 rounded-[1px] shadow-[0px_0.5px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 60 30" xmlns="http://www.w3.org/2000/svg">
          <rect width="60" height="30" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#012169" strokeWidth="4" />
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
        </svg>
      )
    },
    {
      code: "+357",
      name: "Cyprus",
      svg: (
        <svg className="w-5 h-3.5 shrink-0 rounded-[1px] shadow-[0px_0.5px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 900 600" xmlns="http://www.w3.org/2000/svg">
          <rect width="900" height="600" fill="#fff"/>
          <path d="M418 135c3 1 12 1 18 3 7 3 20 6 30 11 11 6 22 13 32 20 15 11 31 24 41 38 7 11 14 26 15 39 1 14-3 30-10 42-10 17-27 28-44 36-16 8-36 12-54 13-18 1-38-3-54-10-18-8-32-23-40-41-4-9-6-20-6-30s1-19 5-28c9-21 27-37 46-49 13-8 27-14 42-17 11-3 20-5 27-5 2-8 3-15 4-22-2-6-5-12-8-17-7-14-19-25-33-33-14-9-31-13-48-12-17 0-35 5-49 15-13 9-23 23-28 38-5 13-6 29-2 43 4 15 12 28 22 39 12 13 27 23 44 29 18 7 38 9 57 7 19-2 38-9 54-19s28-25 35-43c7-17 9-37 4-55-4-19-14-36-28-49-14-13-32-21-50-25-18-4-37-3-55 2-17 5-33 14-46 26-12 12-21 28-24 45-3 15-2 32 4 47 6 15 16 27 28 37s27 16 43 19c15 3 32 2 47-3 15-5 28-15 37-28 9-12 13-28 12-43" fill="#D47000"/>
          <path d="M290 400s30 50 160 50 160-50 160-50-60 10-160 10-160-10-160-10z" fill="#006A3B"/>
        </svg>
      )
    }
  ];

  // Notifications Toggles
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifPush, setNotifPush] = useState(true);

  // Security Toggles
  const [twoFactor, setTwoFactor] = useState(false);

  // Subtabs list - removed Role, Cancellation & No-show, Payments, Integrations
  const subTabs = [
    { name: "Personal info", icon: User02Icon },
    { name: "Notifications", icon: Notification01Icon },
    { name: "Security & Login", icon: SecurityCheckIcon }
  ];

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] select-none font-poppins">
      
      {/* Header Row */}
      <DashboardHeader 
        title="Settings" 
        subtitle="Manage settings of your supervisor profile" 
      />

      <div className="flex-1 flex overflow-hidden w-full">
        {/* Settings Left subsidebar */}
        <SettingsSubSidebar
          tabs={subTabs}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />

        {/* Settings Right panel content */}
        <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-8 bg-white border-l border-neutral-100 pb-20">
          
          {/* PERSONAL INFO TAB */}
          {activeSubTab === "Personal info" && (
            <div className="flex flex-col gap-6 w-full max-w-[640px]">
              <div className="flex flex-col gap-1">
                <h2 className="font-poppins font-medium text-base text-[#1A1A1A]">Personal info</h2>
                <p className="font-poppins font-normal text-xs text-[#888780] mt-0.5">Set your personal information</p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col gap-5">
                
                {/* Photo Upload Area */}
                <div>
                  <span className="font-poppins font-semibold text-[10px] tracking-[0.8px] uppercase text-[#6B7280]">
                    PHOTO
                  </span>
                  <div className="flex items-center gap-4 mt-2">
                    <div className="relative w-20 h-20 rounded-full border border-neutral-200 overflow-hidden bg-neutral-100">
                      <img src={profileImage} alt="Profile" className="w-full h-full object-cover" />
                      <button 
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="absolute bottom-1 right-1 w-6 h-6 bg-white border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-50 shadow-sm cursor-pointer"
                      >
                        <HugeiconsIcon icon={Camera01Icon} className="w-3.5 h-3.5 text-[#111111]" />
                      </button>
                      <input 
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Name */}
                <SettingsInput
                  label="Name"
                  value={personalName}
                  onChange={setPersonalName}
                />

                {/* Email and Role Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SettingsInput
                    label="Email"
                    type="email"
                    value={personalEmail}
                    onChange={setPersonalEmail}
                    disabled={true}
                  />

                  <div className="flex flex-col gap-1">
                    <span className="font-poppins font-semibold text-[10px] tracking-[0.8px] uppercase text-[#6B7280]">
                      ROLE
                    </span>
                    <div className="h-10 border border-[#D3D1C7] bg-neutral-50 rounded-[8px] px-3.5 text-[14px] text-neutral-500 font-poppins flex items-center select-none">
                      {personalRole}
                    </div>
                  </div>
                </div>

                {/* Mobile number */}
                <div className="flex flex-col gap-1">
                  <span className="font-poppins font-semibold text-[10px] tracking-[0.8px] uppercase text-[#6B7280]">
                    MOBILE NUMBER
                  </span>
                  <div className="flex items-center border border-[#D3D1C7] rounded-[8px] h-10 relative">
                    <div 
                      onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                      className="flex items-center gap-1.5 px-3 border-r border-[#D3D1C7] bg-neutral-50 h-full select-none cursor-pointer hover:bg-neutral-100 transition-colors"
                    >
                      {selectedCountry.svg}
                      <span className="text-xs font-semibold text-neutral-600">{selectedCountry.code}</span>
                      <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.5} />
                    </div>
                    <input
                      type="text"
                      value={personalPhone}
                      onChange={(e) => setPersonalPhone(e.target.value)}
                      className="flex-1 px-3 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none h-full bg-transparent"
                    />

                    {/* Country Code Dropdown */}
                    {isCountryDropdownOpen && (
                      <div className="absolute top-11 left-0 bg-white border border-[#D3D1C7] rounded-lg shadow-lg w-[200px] z-[999] py-1 max-h-[220px] overflow-y-auto">
                        {countries.map((c) => (
                          <div
                            key={c.code}
                            onClick={() => {
                              setSelectedCountry(c);
                              setIsCountryDropdownOpen(false);
                            }}
                            className="flex items-center gap-3 px-3 py-2 hover:bg-neutral-50 cursor-pointer transition-colors"
                          >
                            {c.svg}
                            <span className="text-xs font-semibold text-neutral-600 w-10 shrink-0">{c.code}</span>
                            <span className="text-xs text-neutral-700 truncate">{c.name}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Save and Cancel buttons */}
                {(personalName !== initialName ||
                  personalEmail !== initialEmail ||
                  personalPhone !== initialPhone) && (
                  <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#EFEFED]">
                    <button
                      type="button"
                      onClick={handleCancel}
                      className="px-4 py-2 border border-[#D5D2C9] rounded-lg text-xs font-semibold text-neutral-600 hover:bg-neutral-50 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={handleSave}
                      className="px-4 py-2 bg-[#2E9DA7] text-white rounded-lg text-xs font-semibold hover:opacity-90 transition-opacity cursor-pointer"
                    >
                      Save Changes
                    </button>
                  </div>
                )}

              </div>
            </div>
          )}

          {/* NOTIFICATIONS TAB */}
          {activeSubTab === "Notifications" && (
            <div className="flex flex-col gap-[20px] w-full">
              <div className="flex flex-col gap-1">
                <h2 className="font-poppins font-medium text-base text-[#111111]">Notifications</h2>
                <p className="font-poppins font-normal text-xs text-[#666666]">Control your notification</p>
              </div>

              {/* Notification triggers section */}
              <div className="bg-white border border-[#E8E8E6] rounded-[12px] p-0.5 shadow-none flex flex-col">
                {/* Header title */}
                <div className="p-5 border-b border-[#F0F0EE]">
                  <h3 className="font-poppins font-medium text-sm text-[#111111]">Notification triggers</h3>
                  <p className="font-poppins font-normal text-xs text-neutral-400 mt-0.5">Choose which events send messages</p>
                </div>

                {/* List items */}
                <div className="p-5 flex flex-col gap-5">
                  
                  {/* Row 1: New booking */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#111111]">New booking</span>
                      <span className="text-xs text-neutral-400">When a client makes a new booking</span>
                    </div>
                    <button
                      onClick={() => setNotifEmail(!notifEmail)}
                      className={`w-[38px] h-[21px] rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                        notifEmail ? "bg-[#0F6E56]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        notifEmail ? "translate-x-[15px]" : ""
                      }`} />
                    </button>
                  </div>

                  <div className="border-t border-[#666666]/20" />

                  {/* Row 2: Booking cancelled */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#111111]">Booking cancelled</span>
                      <span className="text-xs text-neutral-400">When a booking is cancelled by client or staff</span>
                    </div>
                    <button
                      onClick={() => setNotifSms(!notifSms)}
                      className={`w-[38px] h-[21px] rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                        notifSms ? "bg-[#0F6E56]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        notifSms ? "translate-x-[15px]" : ""
                      }`} />
                    </button>
                  </div>

                  <div className="border-t border-[#666666]/20" />

                  {/* Row 3: Reminder - 24h before */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#111111]">Reminder - 24h before</span>
                      <span className="text-xs text-neutral-400">Sent to client the day before their appointment</span>
                    </div>
                    <button
                      onClick={() => setNotifPush(!notifPush)}
                      className={`w-[38px] h-[21px] rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                        notifPush ? "bg-[#0F6E56]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        notifPush ? "translate-x-[15px]" : ""
                      }`} />
                    </button>
                  </div>

                  <div className="border-t border-[#666666]/20" />

                  {/* Row 4: Reminder - 1h before */}
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#111111]">Reminder - 1h before</span>
                      <span className="text-xs text-neutral-400">Last minute reminder to reduce no-shows</span>
                    </div>
                    <button
                      onClick={() => setTwoFactor(!twoFactor)}
                      className={`w-[38px] h-[21px] rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                        twoFactor ? "bg-[#0F6E56]" : "bg-neutral-300"
                      }`}
                    >
                      <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                        twoFactor ? "translate-x-[15px]" : ""
                      }`} />
                    </button>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* SECURITY & LOGIN TAB */}
          {activeSubTab === "Security & Login" && (
            <Security2FAPanel />
          )}

        </div>
      </div>
    </main>
  );
}
