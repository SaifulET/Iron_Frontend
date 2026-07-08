"use client";

import React, { useState } from "react";
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
  ArrowRight01Icon,
  BellIcon
} from "@hugeicons/core-free-icons";

import {
  initialMembers,
  initialCancellationRules,
  MemberItem,
  CancellationRule
} from "@/data/settingsMockData";

export default function DashboardSettings() {
  const [activeSubTab, setActiveSubTab] = useState<string>("Personal info");

  // Personal Info States
  const [personalName, setPersonalName] = useState("Hohb doe");
  const [personalEmail, setPersonalEmail] = useState("Eslsj@gam.com");
  const [personalRole, setPersonalRole] = useState("Supervisor");
  const [personalPhone, setPersonalPhone] = useState("1234556666");

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

  const subTabs = [
    { name: "Personal info", icon: User02Icon },
    { name: "Role", icon: UserGroup03Icon },
    { name: "Cancellation & No-show", icon: Appointment02Icon },
    { name: "Payments", icon: CreditCardPosIcon },
    { name: "Integration", icon: UserGroup03Icon }, // use group as fallback
    { name: "Notifications", icon: Notification01Icon },
    { name: "Security & 2FA", icon: SecurityCheckIcon }
  ];

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] pl-[25px] pr-4 md:pr-[129px] pt-[37px] pb-24 select-none font-poppins relative">
      
      {/* Header Row */}
      <div className="flex items-center justify-between mb-[30px] select-none w-full">
        <div className="flex flex-col gap-[2px]">
          <h1 className="font-poppins font-semibold text-[28px] leading-[28px] tracking-[-0.84px] text-[#484946]">
            Settings
          </h1>
          <p className="font-poppins font-medium text-[14px] leading-[21px] text-[#686B64]">
            Bank information, notifications, integration and more
          </p>
        </div>

        {/* Notification bell */}
        <div className="relative shrink-0">
          <button className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm cursor-pointer">
            <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
          </button>
          <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white">
            6
          </span>
        </div>
      </div>

      {/* Settings Panel Grid */}
      <div className="flex flex-col lg:flex-row items-start gap-6 w-full mt-4">
        
        {/* Left Submenu Navigation */}
        <div className="w-full lg:w-[240px] shrink-0 bg-white rounded-[16px] p-4 flex flex-col gap-1 shadow-none">
          {subTabs.map((tab) => {
            const isActive = activeSubTab === tab.name;
            return (
              <button
                key={tab.name}
                onClick={() => setActiveSubTab(tab.name)}
                className={`w-full flex items-start text-left gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                  isActive ? "bg-[#B0C5C8]/40 text-[#111111]" : "text-[#666666] hover:bg-neutral-50"
                }`}
              >
                <HugeiconsIcon icon={tab.icon} className="w-5 h-5 shrink-0 mt-0.5" />
                <span className="leading-tight">{tab.name}</span>
              </button>
            );
          })}
        </div>

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
                      <img src="/businessDashboard/downLogo.png" alt="Profile" className="w-full h-full object-cover" />
                      <button className="absolute bottom-1 right-1 w-6 h-6 bg-white border border-neutral-300 rounded-full flex items-center justify-center hover:bg-neutral-50 shadow-sm cursor-pointer">
                        <HugeiconsIcon icon={Camera01Icon} className="w-3.5 h-3.5 text-[#111111]" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Name */}
                <div className="flex flex-col gap-1">
                  <span className="font-poppins font-semibold text-[10px] tracking-[0.8px] uppercase text-[#6B7280]">
                    NAME
                  </span>
                  <input
                    type="text"
                    value={personalName}
                    onChange={(e) => setPersonalName(e.target.value)}
                    className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                  />
                </div>

                {/* Email and Role Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-poppins font-semibold text-[10px] tracking-[0.8px] uppercase text-[#6B7280]">
                      EMAIL
                    </span>
                    <input
                      type="email"
                      value={personalEmail}
                      onChange={(e) => setPersonalEmail(e.target.value)}
                      className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                    />
                  </div>

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
                  <div className="flex items-center border border-[#D3D1C7] rounded-[8px] overflow-hidden h-10">
                    <div className="flex items-center gap-1.5 px-3 border-r border-[#D3D1C7] bg-neutral-50 h-full select-none cursor-pointer">
                      <svg className="w-5 h-3.5 shrink-0 rounded-[1px] shadow-[0px_0.5px_2px_rgba(0,0,0,0.25)]" viewBox="0 0 20 13" xmlns="http://www.w3.org/2000/svg">
                        <rect width="20" height="13" fill="#b22234"/>
                        <path d="M0,1h20M0,3h20M0,5h20M0,7h20M0,9h20M0,11h20" stroke="#fff" stroke-width="1"/>
                        <rect width="8" height="7" fill="#3c3b6e"/>
                        <circle cx="2" cy="2" r="0.4" fill="#fff"/>
                        <circle cx="6" cy="2" r="0.4" fill="#fff"/>
                        <circle cx="4" cy="3.5" r="0.4" fill="#fff"/>
                        <circle cx="2" cy="5" r="0.4" fill="#fff"/>
                        <circle cx="6" cy="5" r="0.4" fill="#fff"/>
                      </svg>
                      <span className="text-xs font-semibold text-neutral-600">+880</span>
                      <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5 text-neutral-500" strokeWidth={1.5} />
                    </div>
                    <input
                      type="text"
                      value={personalPhone}
                      onChange={(e) => setPersonalPhone(e.target.value)}
                      className="flex-1 px-3 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none h-full"
                    />
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
                        {/* Member Profile */}
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

                        {/* Role badge */}
                        <td className="py-2.5 px-6">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            m.role === "Owner" ? "bg-[#DFF3F5] text-[#2E9DA7]" :
                            m.role === "Supervisor" ? "bg-[#DDECFF] text-[#32649F]" :
                            "bg-[#F1F0EA] text-[#74756E]"
                          }`}>
                            {m.role}
                          </span>
                        </td>

                        {/* Status online/offline */}
                        <td className="py-2.5 px-6">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#DCFCE7] text-[#05895A] text-xs font-semibold rounded-full">
                            <span className="w-1.5 h-1.5 bg-[#02CC87] rounded-full" />
                            {m.status}
                          </span>
                        </td>

                        {/* Dropdown Action */}
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
                
                {/* Cancellation window header */}
                <div className="flex flex-col gap-1">
                  <h3 className="font-poppins font-normal text-[13px] text-[#1A1A1A]">
                    Cancellation window
                  </h3>
                  <p className="font-poppins font-normal text-[11px] text-[#757575] leading-[16px]">
                    Set cancellation policy based on the appointment time, but the percentage can not be less than 20% e.g., If the client wants to cancel the appointment more than 24 hours before then he can set the cancellation fee as free.
                  </p>
                </div>

                {/* Rules List Grid */}
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

                      {/* Number Input if not free */}
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

                {/* No-show percentage */}
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

                {/* Buttons */}
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

                {/* Banner Alert */}
                <div className="bg-[#FFF8E6] border border-[#FFEBAD] rounded-lg p-3 flex gap-2">
                  <HugeiconsIcon icon={InformationCircleIcon} className="w-5 h-5 text-[#B28A00] shrink-0 mt-0.5" />
                  <span className="text-xs text-[#665200] font-medium leading-[18px]">
                    This information is used by Bookly admin to process your monthly SEPA transfer. It is stored securely and never shared.
                  </span>
                </div>

                {/* Form Fields */}
                <div className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-neutral-500 uppercase">Account holder name/Business name</label>
                    <input
                      type="text"
                      value={bankHolder}
                      onChange={(e) => setBankHolder(e.target.value)}
                      className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-neutral-500 uppercase">IBAN</label>
                    <input
                      type="text"
                      value={bankIban}
                      onChange={(e) => setBankIban(e.target.value)}
                      className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-neutral-500 uppercase">Bank name</label>
                    <input
                      type="text"
                      value={bankName}
                      onChange={(e) => setBankName(e.target.value)}
                      className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                    />
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-[11px] font-semibold text-neutral-500 uppercase">VAT no. (optional)</label>
                    <input
                      type="text"
                      value={bankVat}
                      onChange={(e) => setBankVat(e.target.value)}
                      placeholder="e.g. 123"
                      className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                    />
                  </div>
                </div>

                <button className="w-full bg-[#111111] hover:bg-black text-white py-2.5 rounded-[12px] font-semibold text-sm transition-colors mt-2 cursor-pointer">
                  Update bank details
                </button>

                <p className="text-[10px] text-neutral-400 text-center font-medium">
                  Changes take effect from the next payout cycle
                </p>

                {/* Footer Guide Box */}
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
            <div className="flex flex-col gap-[14px] w-full">
              <div>
                <h2 className="font-poppins font-medium text-base text-[#1A1A1A]">Notifications</h2>
                <p className="font-poppins font-normal text-xs text-[#888780] mt-0.5">Configure your preference channels</p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col gap-4">
                
                {/* Toggle 1 */}
                <div className="flex items-center justify-between py-2.5 border-b border-neutral-100">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-[#111111]">Email Notifications</span>
                    <span className="text-xs text-neutral-400">Receive summaries and transactional details by email</span>
                  </div>
                  <button
                    onClick={() => setNotifEmail(!notifEmail)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                      notifEmail ? "bg-[#2E9DA7]" : "bg-neutral-300"
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                      notifEmail ? "translate-x-5" : ""
                    }`} />
                  </button>
                </div>

                {/* Toggle 2 */}
                <div className="flex items-center justify-between py-2.5 border-b border-neutral-100">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-[#111111]">SMS Alerts</span>
                    <span className="text-xs text-neutral-400">Send instant text updates for bookings and alerts</span>
                  </div>
                  <button
                    onClick={() => setNotifSms(!notifSms)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                      notifSms ? "bg-[#2E9DA7]" : "bg-neutral-300"
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                      notifSms ? "translate-x-5" : ""
                    }`} />
                  </button>
                </div>

                {/* Toggle 3 */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-[#111111]">Browser Push Notifications</span>
                    <span className="text-xs text-neutral-400">Display immediate alerts inside your active browser session</span>
                  </div>
                  <button
                    onClick={() => setNotifPush(!notifPush)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                      notifPush ? "bg-[#2E9DA7]" : "bg-neutral-300"
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                      notifPush ? "translate-x-5" : ""
                    }`} />
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* TAB 7: Security & 2FA */}
          {activeSubTab === "Security & 2FA" && (
            <div className="flex flex-col gap-[14px] w-full">
              <div>
                <h2 className="font-poppins font-medium text-base text-[#1A1A1A]">Security & 2FA</h2>
                <p className="font-poppins font-normal text-xs text-[#888780] mt-0.5">Manage authentication settings</p>
              </div>

              <div className="bg-white border border-[#E2E8F0] rounded-[16px] p-6 flex flex-col gap-5">
                
                {/* Two factor auth */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm text-[#111111]">Two-Factor Authentication (2FA)</span>
                    <span className="text-xs text-neutral-400">Add an extra layer of security using Google Authenticator or SMS</span>
                  </div>
                  <button
                    onClick={() => setTwoFactor(!twoFactor)}
                    className={`w-11 h-6 rounded-full transition-colors flex items-center p-0.5 cursor-pointer ${
                      twoFactor ? "bg-[#2E9DA7]" : "bg-neutral-300"
                    }`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full transition-transform shadow-sm ${
                      twoFactor ? "translate-x-5" : ""
                    }`} />
                  </button>
                </div>

                <div className="border-t border-neutral-100 pt-4 flex flex-col gap-3">
                  <span className="font-semibold text-sm text-[#111111]">Change Password</span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-neutral-500 uppercase">New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-[11px] font-semibold text-neutral-500 uppercase">Confirm New Password</label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="h-10 border border-[#D3D1C7] rounded-[8px] px-3.5 text-[14px] text-[#1A1A1A] font-poppins focus:outline-none"
                      />
                    </div>
                  </div>
                  <button className="px-4 py-2 bg-[#111111] hover:bg-black text-white text-xs font-semibold rounded-[8px] transition-colors mt-2 cursor-pointer w-fit">
                    Update password
                  </button>
                </div>

              </div>
            </div>
          )}

        </div>

      </div>
    </main>
  );
}
