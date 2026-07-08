"use client";
import DashboardHeader from "@/components/DashboardHeader";


import React, { useState, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  User02Icon,
  UserGroup03Icon,
  Appointment02Icon,
  CreditCardPosIcon,
  Notification01Icon,
  SecurityCheckIcon,
  Camera01Icon,
  InformationCircleIcon,
  Tick01Icon,
  ArrowDown01Icon,
  ArrowLeft01Icon,
  ArrowRight01Icon
} from "@hugeicons/core-free-icons";

import {
  initialMembers,
  initialCancellationRules,
  MemberItem,
  CancellationRule
} from "@/data/settingsMockData";

import { SettingsInput } from "./settings/SettingsInput";
import { SettingsToggle } from "./settings/SettingsToggle";
import { SettingsSubSidebar } from "./settings/SettingsSubSidebar";
import { Security2FAPanel } from "./settings/Security2FAPanel";

export default function DashboardSettings() {
  const [activeSubTab, setActiveSubTab] = useState<string>("Personal info");

  // Personal Info States
  const [personalName, setPersonalName] = useState("Hohb doe");
  const [personalEmail, setPersonalEmail] = useState("Eslsj@gam.com");
  const [personalRole, setPersonalRole] = useState("Supervisor");
  const [personalPhone, setPersonalPhone] = useState("1234556666");

  const [profileImage, setProfileImage] = useState<string>("/businessDashboard/downLogo.png");
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedImage = localStorage.getItem("settingsProfileImage");
      if (savedImage) {
        setProfileImage(savedImage);
      }
    }
  }, []);

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

  // Members List State (Role Tab)
  const [members, setMembers] = useState<MemberItem[]>(initialMembers);
  const [membersPage, setMembersPage] = useState(1);

  // Cancellation & No-show States
  const [rules, setRules] = useState<CancellationRule[]>(initialCancellationRules);
  const [noShowPercent, setNoShowPercent] = useState(20);

  // Payments State
  const [bankHolder, setBankHolder] = useState("Elena Georgiou");
  const [bankIban, setBankIban] = useState("CY17 0020 0195 0000 3570 0012 3456");
  const [bankName, setBankName] = useState("Bank of Cyprus");
  const [bankVat, setBankVat] = useState("");

  // Integrations Connected State
  const [isGoogleConnected, setIsGoogleConnected] = useState(true);

  // Notifications Toggles
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [notifPush, setNotifPush] = useState(true);

  // Security Toggles
  const [twoFactor, setTwoFactor] = useState(false);

  // Country Picker State
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+880",
    name: "Bangladesh",
    svg: (
      <svg className="w-5 h-3.5 shrink-0 rounded-[1px] shadow-[0px_0.5px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 20 12" xmlns="http://www.w3.org/2000/svg">
        <rect width="20" height="12" fill="#006a4e"/>
        <circle cx="9" cy="6" r="4" fill="#f42a41"/>
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

  const subTabs = [
    { name: "Personal info", icon: User02Icon },
    { name: "Role", icon: UserGroup03Icon },
    { name: "Cancellation & No-show", icon: Appointment02Icon },
    { name: "Payments", icon: CreditCardPosIcon },
    { name: "Integration", icon: UserGroup03Icon },
    { name: "Notifications", icon: Notification01Icon },
    { name: "Security & 2FA", icon: SecurityCheckIcon }
  ];

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] md: select-none font-poppins relative">
      
      {/* Header Row */}
      <DashboardHeader title="Settings" subtitle="Bank information, notifications, integration and more" />
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">

      {/* Settings Panel Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full mt-4">
        
        {/* Left Submenu Navigation Component */}
        <SettingsSubSidebar
          tabs={subTabs}
          activeSubTab={activeSubTab}
          setActiveSubTab={setActiveSubTab}
        />

        {/* Right Submenu Details Panel Container */}
        <div className="flex-1 w-full bg-transparent">
          
          {/* TAB 1: Personal Info */}
          {activeSubTab === "Personal info" && (
            <div className="flex flex-col gap-[14px] w-full">
              <div>
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
                  />

                  <div className="flex flex-col gap-1">
                    <span className="font-poppins font-semibold text-[10px] tracking-[0.8px] uppercase text-[#6B7280]">
                      ROLE
                    </span>
                    <select
                      value={personalRole}
                      onChange={(e) => setPersonalRole(e.target.value)}
                      className="h-10 border border-[#D3D1C7] bg-white rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none cursor-pointer"
                    >
                      <option value="Owner">Owner</option>
                      <option value="Supervisor">Supervisor</option>
                      <option value="Staff">Staff</option>
                    </select>
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

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-3 mt-4 border-t border-neutral-100 pt-4">
                  <button className="px-4 py-2 border border-[#DEDDE3] rounded-[8px] text-xs font-semibold text-[#5B5D58] hover:bg-neutral-50 transition-colors cursor-pointer">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#111111] hover:bg-black text-white rounded-[8px] text-xs font-semibold transition-colors cursor-pointer">
                    Save changes
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 2: Role */}
          {activeSubTab === "Role" && (
            <div className="flex flex-col gap-[14px] w-full">
              <div>
                <h2 className="font-poppins font-medium text-base text-[#1A1A1A]">Role</h2>
                <p className="font-poppins font-normal text-xs text-[#888780] mt-0.5">Assign role to members</p>
              </div>

              {/* Members Table Card */}
              <div className="bg-white border border-[#E2E8F0] rounded-[16px] overflow-hidden flex flex-col">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#F7F5F1] text-[10px] font-semibold text-[#6B7280] tracking-[0.7px] uppercase border-b border-[#E2E8F0] h-[48px]">
                      <th className="py-3 px-6">MEMBER</th>
                      <th className="py-3 px-6">ROLE</th>
                      <th className="py-3 px-6">STATUS</th>
                      <th className="py-3 px-6">ACTION</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E2E8F0]">
                    {members.map((m, idx) => (
                      <tr key={idx} className="hover:bg-neutral-50/50 h-[72px]">
                        <td className="py-2.5 px-6">
                          <div className="flex items-center gap-3">
                            <img src={m.avatar} alt={m.name} className="w-10 h-10 rounded-full object-cover border border-[#E2E8F0]" />
                            <div className="flex flex-col">
                              <span className="font-poppins font-medium text-[16px] leading-[28px] text-[#16123E]">
                                {m.name}
                              </span>
                              <span className="font-poppins font-normal text-xs text-[#808080]">
                                {m.email}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="py-2.5 px-6">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            m.role === "Owner" ? "bg-[#DFF3F5] text-[#2E9DA7]" :
                            m.role === "Supervisor" ? "bg-[#DDECFF] text-[#32649F]" :
                            "bg-[#F1F0EA] text-[#74756E]"
                          }`}>
                            {m.role}
                          </span>
                        </td>
                        <td className="py-2.5 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#DCFCE7] text-[#05895A] text-xs font-semibold rounded-full">
                            <span className="w-1.5 h-1.5 bg-[#02CC87] rounded-full" />
                            {m.status}
                          </span>
                        </td>
                        <td className="py-2.5 px-6">
                          <select
                            value={m.role}
                            onChange={(e) => {
                              const updated = [...members];
                              updated[idx].role = e.target.value as any;
                              setMembers(updated);
                            }}
                            className="border border-neutral-300 rounded-[12px] px-3 py-1.5 text-xs focus:outline-none cursor-pointer bg-white"
                          >
                            <option value="Owner">Owner</option>
                            <option value="Supervisor">Supervisor</option>
                            <option value="Staff">Staff</option>
                          </select>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 bg-[#F8FAFC] border-t border-[#E2E8F0]">
                  <span className="font-poppins font-medium text-xs text-[#767676]">
                    Showing 1-{members.length} of 24 members
                  </span>

                  <div className="flex items-center gap-2">
                    <button className="w-8 h-8 border border-[#DEDDE3] rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all cursor-pointer">
                      <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4 text-[#DEDDE3]" />
                    </button>
                    <button className="px-3.5 py-1.5 border border-[#A7A5B6] bg-white text-xs font-semibold rounded-lg text-[#4D4D4D] cursor-pointer">
                      1
                    </button>
                    <button className="px-3.5 py-1.5 border border-[#DEDDE3] bg-white text-xs font-semibold rounded-lg text-[#808080] hover:bg-neutral-50 cursor-pointer">
                      2
                    </button>
                    <button className="w-8 h-8 border border-[#DEDDE3] rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all cursor-pointer">
                      <HugeiconsIcon icon={ArrowRight01Icon} className="w-4 h-4 text-neutral-500" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* TAB 3: Cancellation & No-show */}
          {activeSubTab === "Cancellation & No-show" && (
            <div className="flex flex-col gap-[20px] w-full">
              <div>
                <h2 className="font-poppins font-semibold text-[14px] leading-[21px] text-[#111111]">
                  Booking Rules
                </h2>
                <p className="font-poppins font-normal text-xs text-[#666666] mt-0.5">
                  Slots, buffers, cancellations
                </p>
              </div>

              <div className="bg-white border border-neutral-100 rounded-[12px] p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h3 className="font-poppins font-normal text-[13px] text-[#1A1A1A]">
                    Cancellation window
                  </h3>
                  <p className="font-poppins font-normal text-[11px] text-[#757575] leading-[16px]">
                    Set cancellation policy based on the appointment time, but the percentage can not be less than 20% e.g., If the client wants to cancel the appointment more than 24 hours before then he can set the cancellation fee as free.
                  </p>
                </div>

                <div className="border border-neutral-200 rounded-[12px] p-5 flex flex-col gap-4">
                  {rules.map((rule, idx) => (
                    <div key={idx} className="flex flex-col gap-3 pb-3 border-b border-neutral-100 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between w-full">
                        <span className="font-inter font-normal text-xs text-black">
                          {rule.timeframe}
                        </span>
                        
                        <div className="flex items-center gap-2 cursor-pointer" onClick={() => {
                          const updated = [...rules];
                          updated[idx].freeOfCharge = !rule.freeOfCharge;
                          setRules(updated);
                        }}>
                          {rule.freeOfCharge ? (
                            <div className="w-5 h-5 bg-[#111111] rounded-[4px] flex items-center justify-center">
                              <HugeiconsIcon icon={Tick01Icon} className="w-3.5 h-3.5 text-white" />
                            </div>
                          ) : (
                            <div className="w-5 h-5 border-2 border-[#666666] rounded-[4px]" />
                          )}
                          <span className="font-inter font-normal text-xs text-black select-none">
                            Free of charge
                          </span>
                        </div>
                      </div>

                      {!rule.freeOfCharge && (
                        <div className="flex items-center border border-[#D3D1C7] rounded-[8px] overflow-hidden h-9 px-4">
                          <span className="font-poppins font-normal text-xs text-[#757575] mr-2">%</span>
                          <input
                            type="number"
                            value={rule.percentage}
                            onChange={(e) => {
                              const updated = [...rules];
                              updated[idx].percentage = Number(e.target.value);
                              setRules(updated);
                            }}
                            className="flex-1 text-[13px] text-[#1A1A1A] font-poppins focus:outline-none h-full bg-transparent"
                          />
                        </div>
                      )}

                      {rule.freeOfCharge && (
                        <div className="flex items-center border border-[#D3D1C7] bg-[#FCFAF9] rounded-[8px] overflow-hidden h-9 px-4">
                          <span className="font-poppins font-normal text-xs text-neutral-400">
                            Free cancellation
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-2 mt-2">
                  <h3 className="font-poppins font-semibold text-[13px] text-[#1A1A1A]">
                    No-show percentage
                  </h3>
                  <span className="font-poppins font-normal text-[11px] text-neutral-500">
                    Fixed amount charged on booking
                  </span>
                  <div className="flex items-center border border-[#D3D1C7] rounded-[8px] overflow-hidden h-10 px-4 w-full">
                    <span className="font-poppins font-normal text-xs text-[#757575] mr-2">%</span>
                    <input
                      type="number"
                      value={noShowPercent}
                      onChange={(e) => setNoShowPercent(Number(e.target.value))}
                      className="flex-1 text-[13px] text-[#1A1A1A] font-poppins focus:outline-none h-full bg-transparent"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 mt-4 pt-4 border-t border-neutral-100">
                  <button className="px-4 py-2 border border-[#DEDDE3] rounded-[8px] text-xs font-semibold text-[#5B5D58] hover:bg-neutral-50 cursor-pointer">
                    Cancel
                  </button>
                  <button className="px-4 py-2 bg-[#111111] hover:bg-black text-white rounded-[8px] text-xs font-semibold cursor-pointer">
                    Save changes
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 4: Payments */}
          {activeSubTab === "Payments" && (
            <div className="flex flex-col gap-[14px] w-full">
              <div>
                <h2 className="font-poppins font-medium text-base text-[#1A1A1A]">Payment info</h2>
                <p className="font-poppins font-normal text-xs text-[#888780] mt-0.5">Set your payment information</p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col gap-5">
                <span className="font-poppins font-semibold text-[13px] text-[#1A1A1A]">
                  Payout Bank Account Details (SEPA)
                </span>

                <div className="bg-[#FFF8E6] border border-[#FFEBAD] rounded-lg p-3 flex gap-2">
                  <HugeiconsIcon icon={InformationCircleIcon} className="w-5 h-5 text-[#B28A00] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#665200] font-medium leading-[18px]">
                    This information is used by Bookly admin to process your monthly SEPA transfer. It is stored securely and never shared.
                  </span>
                </div>

                <div className="flex flex-col gap-4">
                  <SettingsInput
                    label="Account holder name/Business name"
                    value={bankHolder}
                    onChange={setBankHolder}
                  />

                  <SettingsInput
                    label="IBAN"
                    value={bankIban}
                    onChange={setBankIban}
                  />

                  <SettingsInput
                    label="Bank name"
                    value={bankName}
                    onChange={setBankName}
                  />

                  <SettingsInput
                    label="VAT no. (optional)"
                    value={bankVat}
                    onChange={setBankVat}
                    placeholder="e.g. 123"
                  />
                </div>

                <button className="w-full bg-[#111111] hover:bg-black text-white py-2.5 rounded-[12px] font-semibold text-sm transition-colors mt-2 cursor-pointer">
                  Update bank details
                </button>

                <p className="text-[10px] text-neutral-400 text-center font-medium">
                  Changes take effect from the next payout cycle
                </p>

                <div className="bg-[#FCFAF8] border border-[#ECE6DE] rounded-[12px] p-4 mt-2">
                  <h4 className="text-xs font-semibold text-[#1A1A1A] mb-1">How your payout works</h4>
                  <p className="text-[11px] text-[#666666] leading-[18px]">
                    Bookly collects no-show and late cancellation fees from customers on your behalf via Stripe. At the end of each calendar month, 100% of these fees (minus processing fees) are transferred to your bank account via SEPA. Bookly takes zero commission on these fees.
                  </p>
                </div>

              </div>
            </div>
          )}

          {/* TAB 5: Integration */}
          {activeSubTab === "Integration" && (
            <div className="flex flex-col gap-[14px] w-full">
              <div>
                <h2 className="font-poppins font-medium text-base text-[#1A1A1A]">Integration</h2>
                <p className="font-poppins font-normal text-xs text-[#888780] mt-0.5">Connect your google calendar, and social media accounts</p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col gap-6">
                <span className="font-semibold text-sm text-[#1A1A1A]">Connected apps</span>
                <span className="text-[11px] text-neutral-400 -mt-4">Third-party tools that extend Bookly</span>

                {/* App 1: Google Calendar */}
                <div className="border border-neutral-100 rounded-[12px] p-4 flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3">
                    <img src="/Icons/Google.svg" alt="Google" className="w-8 h-8 object-contain" />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#111111]">Google Calendar</span>
                        {isGoogleConnected && (
                          <span className="bg-[#D1F2E5] text-[#2C8561] text-[10px] font-bold px-2 py-0.5 rounded">Connected</span>
                        )}
                      </div>
                      <span className="text-xs text-[#666666] mt-0.5">anna@saloncyprus.cy</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsGoogleConnected(!isGoogleConnected)}
                    className="px-4 py-1.5 border border-[#DEDDE3] rounded-lg text-xs font-semibold text-[#5B5D58] hover:bg-neutral-50 transition-all cursor-pointer"
                  >
                    {isGoogleConnected ? "Disconnect" : "Connect"}
                  </button>
                </div>

                {/* App 2: Instagram */}
                <div className="border border-neutral-100 rounded-[12px] p-4 flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3">
                    <img src="/Icons/instagram1.svg" alt="Instagram" className="w-8 h-8 object-contain" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#111111]">Instagram</span>
                      <span className="text-xs text-[#666666] mt-0.5">Add a "Connect" button directly to your Instagram profile.</span>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-[#111111] hover:bg-black text-white rounded-lg text-xs font-semibold transition-all cursor-pointer">
                    Connect
                  </button>
                </div>

                {/* App 3: Facebook */}
                <div className="border border-neutral-100 rounded-[12px] p-4 flex flex-col items-start gap-3">
                  <div className="flex items-center gap-3">
                    <img src="/Icons/Facebook.svg" alt="Facebook" className="w-8 h-8 object-contain" />
                    <div className="flex flex-col">
                      <span className="font-semibold text-sm text-[#111111]">Facebook</span>
                      <span className="text-xs text-[#666666] mt-0.5">Add a "Connect" button directly to your Facebook profile.</span>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-[#111111] hover:bg-black text-white rounded-lg text-xs font-semibold transition-all cursor-pointer">
                    Connect
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 6: Notifications */}
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

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 mt-4">
                <button className="h-[34px] px-4 bg-[#EBEBEB] text-[#757575] hover:bg-neutral-200 rounded-[8px] text-xs font-semibold cursor-pointer">
                  Cancel
                </button>
                <button className="h-[34px] px-4 bg-[#1C1B1C] hover:bg-black text-white rounded-[8px] text-xs font-semibold cursor-pointer">
                  Save changes
                </button>
              </div>
            </div>
          )}

          {/* TAB 7: Security & 2FA */}
          {activeSubTab === "Security & 2FA" && (
            <Security2FAPanel />
          )}

        </div>

      </div>
    
      </div></main>
  );
}
