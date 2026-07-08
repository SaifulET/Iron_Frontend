"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";


import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Plus as PlusIcon,
  Clock01Icon,
  UserGroup03Icon as UsersIcon,
  Car04Icon,
  PuzzleIcon,
  AlertCircleIcon,
  ArrowLeft02Icon,
  InformationCircleIcon,
  CheckListIcon as ListChecksIcon
} from "@hugeicons/core-free-icons";

// Simple edit dots icon
const EditDotsIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

interface Service {
  id: number;
  title: string;
  category: string;
  price: string;
  priceSuffix?: string;
  duration: string;
  staff: string;
  minMax?: string;
  travelTo: string;
  travelSuffix?: string;
  addons?: string;
  noShow: string;
  isFeatured?: boolean;
  discount?: string;
  isActive: boolean;
  isDraft?: boolean;
}

export default function DashboardServicesList() {
  // Toggle states
  const [gapElimination, setGapElimination] = useState(true);
  const [allowDoubleBooking, setAllowDoubleBooking] = useState(false);
  
  // Create Service Form States
  const [isCreating, setIsCreating] = useState(false);
  const [serviceActive, setServiceActive] = useState(true);
  const [featuredService, setFeaturedService] = useState(true);
  const [packageDeal, setPackageDeal] = useState(true);
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [customSchedule, setCustomSchedule] = useState(true);
  
  const [packageName, setPackageName] = useState("");
  const [packageServicesName, setPackageServicesName] = useState("");
  const [packageDesc, setPackageDesc] = useState("");
  
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [expiryTime, setExpiryTime] = useState("");
  
  const [durationVal, setDurationVal] = useState("");
  const [bookingInterval, setBookingInterval] = useState("");
  const [bufferTime, setBufferTime] = useState("");
  const [processingTime, setProcessingTime] = useState("");
  const [sessionsInPackage, setSessionsInPackage] = useState("");
  const [bundlePrice, setBundlePrice] = useState("");
  const [discountVal, setDiscountVal] = useState("");

  const [cities, setCities] = useState(["Larnaca"]);
  const [staffList, setStaffList] = useState(["Andreas M."]);

  // Fixed time slots state for custom schedule across all days
  const [daySlots, setDaySlots] = useState<{
    [key: string]: { isOpen: boolean; slots: string[]; newTime: string; amPm: "AM" | "PM" }
  }>({
    Monday: { isOpen: true, slots: ["10:00 AM", "12:00 PM"], newTime: "10:00", amPm: "AM" },
    Tuesday: { isOpen: true, slots: ["10:00 AM", "12:00 PM"], newTime: "10:00", amPm: "AM" },
    Wednesday: { isOpen: true, slots: ["10:00 AM", "12:00 PM"], newTime: "10:00", amPm: "AM" },
    Thursday: { isOpen: true, slots: ["10:00 AM", "12:00 PM"], newTime: "10:00", amPm: "AM" },
    Friday: { isOpen: true, slots: ["10:00 AM", "12:00 PM"], newTime: "10:00", amPm: "AM" },
    Saturday: { isOpen: false, slots: [], newTime: "10:00", amPm: "AM" },
    Sunday: { isOpen: false, slots: [], newTime: "10:00", amPm: "AM" }
  });

  // Initial mock services matching the screenshot
  const [services, setServices] = useState<Service[]>([
    {
      id: 1,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      duration: "90 min",
      staff: "Elena, Vivi",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 2,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      priceSuffix: "/per person",
      duration: "90 min",
      staff: "Elena, Vivi",
      minMax: "2-4 person",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 3,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      duration: "90 min",
      staff: "Elena, Vivi",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 4,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      priceSuffix: "/per hour",
      duration: "90 min",
      staff: "Elena, Vivi",
      minMax: "2-8 hours",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 5,
      title: "Bridal Make-up",
      category: "Bridal Make-up",
      price: "€120",
      priceSuffix: "/per hour",
      duration: "90 min",
      staff: "Elena, Vivi",
      minMax: "2-8 hours",
      travelTo: "Larnaca",
      travelSuffix: "+1",
      addons: "3 add-ons",
      noShow: "100%",
      isFeatured: true,
      discount: "10% Discount",
      isActive: true
    },
    {
      id: 6,
      title: "Eyebrow shaping",
      category: "Service Category",
      price: "€120",
      duration: "30 min",
      staff: "Not assigned",
      travelTo: "Larnaca",
      noShow: "100%",
      isActive: false,
      isDraft: true
    }
  ]);

  const toggleServiceActive = (id: number) => {
    setServices(services.map(s => s.id === id ? { ...s, isActive: !s.isActive } : s));
  };

  const activeCount = services.filter(s => !s.isDraft).length;
  const draftCount = services.filter(s => s.isDraft).length;

  if (isCreating) {
    return (
      <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] md: select-none font-poppins relative">
        {/* Header Row */}
        <DashboardHeader title="Services" subtitle="Manage your service catalogue" />
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">

        {/* Breadcrumbs */}
        <div className="flex flex-row items-center gap-3 mb-[40px] select-none w-full">
          <button
            type="button"
            onClick={() => setIsCreating(false)}
            className="w-4 h-4 flex items-center justify-center text-[#888780] hover:text-black cursor-pointer"
          >
            <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4" />
          </button>

          <div className="flex flex-row items-center gap-2 text-[13px] font-medium text-[#888780]">
            <button type="button" onClick={() => setIsCreating(false)} className="hover:text-black cursor-pointer">
              <span>Services</span>
            </button>
            <span>&gt;</span>
            <span className="text-[#1C1C1A] font-semibold">Create Service</span>
          </div>
        </div>

        {/* Create Service Page Form Container */}
        <div className="md:ml-[110px] ml-0 w-full flex flex-col gap-[40px]">
          
          {/* Section 1: Visibility & Type */}
          <div className="flex flex-col gap-[16px] w-full">
            <span className="font-poppins font-medium text-[12px] leading-[18px] tracking-[0.55px] uppercase text-[#111111]">
              VISIBILITY & TYPE
            </span>

            {/* Service active Card */}
            <div className="box-sizing-border-box flex flex-row justify-between items-center p-[20px] bg-[#F5F4EE] border border-[#C6C19F] rounded-[12px] w-full h-[81px]">
              <div className="flex flex-col gap-[2px]">
                <span className="font-poppins font-medium text-sm text-[#111111]">Service active</span>
                <span className="font-poppins font-normal text-xs text-[#111111]/60">
                  Show on your public profile. Turn off to hide without deleting.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setServiceActive(!serviceActive)}
                className={`w-[38px] h-[21px] rounded-full p-[3px] transition-colors duration-200 focus:outline-none flex items-center ${
                  serviceActive ? "bg-[#0F6E56]" : "bg-neutral-300"
                } cursor-pointer`}
              >
                <div className={`w-[15px] h-[15px] bg-white rounded-full transition-transform duration-200 ${
                  serviceActive ? "translate-x-[17px]" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Featured service Card */}
            <div className="box-sizing-border-box flex flex-row justify-between items-center p-[20px] bg-[#F5F4EE] border border-[#C6C19F] rounded-[12px] w-full h-[81px]">
              <div className="flex flex-col gap-[2px]">
                <span className="font-poppins font-medium text-sm text-[#111111]">Featured service</span>
                <span className="font-poppins font-normal text-xs text-[#111111]/60">
                  Pin to the top of your profile page under a "Featured" section. Customers see it first.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setFeaturedService(!featuredService)}
                className={`w-[38px] h-[21px] rounded-full p-[3px] transition-colors duration-200 focus:outline-none flex items-center ${
                  featuredService ? "bg-[#0F6E56]" : "bg-neutral-300"
                } cursor-pointer`}
              >
                <div className={`w-[15px] h-[15px] bg-white rounded-full transition-transform duration-200 ${
                  featuredService ? "translate-x-[17px]" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Package deal Card */}
            <div className="box-sizing-border-box flex flex-row justify-between items-center p-[20px] bg-[#F5F4EE] border border-[#C6C19F] rounded-[12px] w-full h-[81px]">
              <div className="flex flex-col gap-[2px]">
                <span className="font-poppins font-medium text-sm text-[#111111]">Package deal</span>
                <span className="font-poppins font-normal text-xs text-[#111111]/60">
                  Sell multiple sessions at a bundled price (e.g. 5 sessions for €150).
                </span>
              </div>
              <button
                type="button"
                onClick={() => setPackageDeal(!packageDeal)}
                className={`w-[38px] h-[21px] rounded-full p-[3px] transition-colors duration-200 focus:outline-none flex items-center ${
                  packageDeal ? "bg-[#0F6E56]" : "bg-neutral-300"
                } cursor-pointer`}
              >
                <div className={`w-[15px] h-[15px] bg-white rounded-full transition-transform duration-200 ${
                  packageDeal ? "translate-x-[17px]" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Package deal details container (conditionally rendered and styled with left border) */}
            {packageDeal && (
              <div className="box-sizing-border-box flex flex-col items-start p-3 pl-6 gap-[16px] w-full border-l-2 border-[#2E9DA7] mt-2">
                <span className="font-poppins font-normal text-sm leading-[21px] text-[#111111]">
                  A package is its own service listing. Set the session count and bundle price. Customers book it like any other service.
                </span>

                <div className="flex flex-col sm:flex-row gap-5 w-full">
                  {/* Category */}
                  <div className="flex-1 flex flex-col gap-2 opacity-50">
                    <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                      Bookly category
                    </span>
                    <input
                      type="text"
                      disabled
                      value="Wellness & Beauty"
                      className="h-[40.8px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] focus:outline-none"
                    />
                  </div>
                  {/* Sub category */}
                  <div className="flex-1 flex flex-col gap-2">
                    <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                      Sub category <span className="text-[#D85A30]">*</span>
                    </span>
                    <div className="relative w-full">
                      <select
                        className="appearance-none h-[40.8px] w-full bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] focus:outline-none pr-10 cursor-pointer"
                        style={{
                          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'right 12px center',
                          backgroundSize: '16px'
                        }}
                      >
                        <option>— Select —</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Package name input */}
                <div className="flex flex-col gap-2 w-full">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                    Package name <span className="text-[#D85A30]">*</span>
                  </span>
                  <input
                    type="text"
                    value={packageName}
                    onChange={(e) => setPackageName(e.target.value)}
                    placeholder="e.g. 5-session starter pack, Monthly unlimited…"
                    className="h-[62px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                  />
                </div>

                {/* Services name input */}
                <div className="flex flex-col gap-2 w-full">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                    Services name <span className="text-[#D85A30]">*</span>
                  </span>
                  <input
                    type="text"
                    value={packageServicesName}
                    onChange={(e) => setPackageServicesName(e.target.value)}
                    placeholder="e.g. Haircut, Hairstyle"
                    className="h-[62px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                  />
                </div>

                {/* Description textarea */}
                <div className="flex flex-col gap-2 w-full">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                    Description (optional)
                  </span>
                  <textarea
                    value={packageDesc}
                    onChange={(e) => setPackageDesc(e.target.value)}
                    placeholder="What's included, what to expect, anything the customer should prepare…"
                    className="h-[71px] bg-white border border-[#D3D1C7] rounded-[12px] p-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full resize-none"
                  />
                </div>

              </div>
            )}
          </div>

          {/* Section 2: Service Details (when Package deal is OFF) */}
          {!packageDeal && (
            <div className="flex flex-col gap-[12px] w-full">
              <span className="font-poppins font-medium text-[12px] leading-[18px] tracking-[0.55px] uppercase text-[#111111]">
                SERVICE DETAILS
              </span>
              
              <div className="flex flex-col sm:flex-row gap-5 w-full">
                {/* Bookly category select */}
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                    Bookly category <span className="text-[#D85A30]">*</span>
                  </span>
                  <div className="relative w-full">
                    <select
                      className="appearance-none h-[40.8px] w-full bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] focus:outline-none pr-10 cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px'
                      }}
                    >
                      <option>— Select —</option>
                    </select>
                  </div>
                </div>

                {/* Sub category select */}
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                    Sub category <span className="text-[#D85A30]">*</span>
                  </span>
                  <div className="relative w-full">
                    <select
                      className="appearance-none h-[40.8px] w-full bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] focus:outline-none pr-10 cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px'
                      }}
                    >
                      <option>— Select —</option>
                    </select>
                  </div>
                </div>

                {/* Service category select */}
                <div className="flex-1 flex flex-col gap-2">
                  <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                    Service category (you created) <span className="text-[#D85A30]">*</span>
                  </span>
                  <div className="relative w-full">
                    <select
                      className="appearance-none h-[40.8px] w-full bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] focus:outline-none pr-10 cursor-pointer"
                      style={{
                        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'right 12px center',
                        backgroundSize: '16px'
                      }}
                    >
                      <option>— Select —</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Service name input */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Service name <span className="text-[#D85A30]">*</span>
                </span>
                <input
                  type="text"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  placeholder="e.g. Gel manicure, Deep tissue massage, Tennis lesson…"
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>

              {/* Description textarea */}
              <div className="flex flex-col gap-2 w-full mt-2">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Description (optional)
                </span>
                <textarea
                  value={serviceDesc}
                  onChange={(e) => setServiceDesc(e.target.value)}
                  placeholder="What's included, what to expect, anything the customer should prepare…"
                  className="h-[71px] bg-white border border-[#D3D1C7] rounded-[12px] p-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full resize-none"
                />
              </div>
            </div>
          )}

          {/* Section 3: Send Notification */}
          <div className="flex flex-col gap-[14px] w-full">
            <span className="font-inter font-semibold text-[11px] leading-[16px] tracking-[0.66px] uppercase text-[#888780]">
              SEND NOTIFICATION
            </span>

            {/* Session Expiry Card */}
            <div className="box-sizing-border-box flex flex-row justify-between items-center p-[20px] bg-[#F5F4EE] border border-[#C6C19F] rounded-[12px] w-full h-[83px]">
              <div className="flex flex-col gap-[4px] w-full max-w-[640px]">
                <span className="font-poppins font-medium text-sm text-[#111111]">Session Expiry Email Alerts</span>
                <span className="font-poppins font-normal text-xs text-[#111111]/60 leading-[18px]">
                  Turn on end-of-session email notifications and choose when they should be sent before the session ends.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setEmailAlerts(!emailAlerts)}
                className={`w-[38px] h-[21px] rounded-full p-[3px] transition-colors duration-200 focus:outline-none flex items-center ${
                  emailAlerts ? "bg-[#0F6E56]" : "bg-neutral-300"
                } cursor-pointer`}
              >
                <div className={`w-[15px] h-[15px] bg-white rounded-full transition-transform duration-200 ${
                  emailAlerts ? "translate-x-[17px]" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Set time input field */}
            {emailAlerts && (
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Set time (min) <span className="text-[#D85A30]">*</span>
                </span>
                <input
                  type="text"
                  value={expiryTime}
                  onChange={(e) => setExpiryTime(e.target.value)}
                  placeholder="e.g. 10"
                  className="h-[51px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>
            )}
          </div>

          {/* Section 4: Custom Schedule */}
          <div className="flex flex-col gap-[20px] w-full">
            
            {/* Custom schedule active toggle card */}
            <div className="box-sizing-border-box flex flex-row justify-between items-center p-[20px] bg-[#F5F4EE] border border-[#C6C19F] rounded-[12px] w-full h-[99px]">
              <div className="flex flex-col gap-[2px] w-full max-w-[640px]">
                <span className="font-poppins font-medium text-sm text-[#111111]">Custom schedule for this service</span>
                <span className="font-poppins font-normal text-xs text-[#111111]/60 leading-[18px]">
                  This service runs on specific days and times only. Set the days and opening windows below. Only these slots will appear to customers - your general business hours are ignored for this service.
                </span>
              </div>
              <button
                type="button"
                onClick={() => setCustomSchedule(!customSchedule)}
                className={`w-[38px] h-[21px] rounded-full p-[3px] transition-colors duration-200 focus:outline-none flex items-center ${
                  customSchedule ? "bg-[#0F6E56]" : "bg-neutral-300"
                } cursor-pointer`}
              >
                <div className={`w-[15px] h-[15px] bg-white rounded-full transition-transform duration-200 ${
                  customSchedule ? "translate-x-[17px]" : "translate-x-0"
                }`} />
              </button>
            </div>

            {/* Custom Schedule Details Container */}
            {customSchedule && (
              <div className="box-sizing-border-box flex flex-col items-start p-[24px] bg-white border border-[#10745B]/10 rounded-[18px] w-full shadow-[0px_0px_0px_3px_rgba(16,116,91,0.08)]">
                
                {/* Header row */}
                <div className="flex flex-row items-start gap-[16px] w-full">
                  <div className="w-[44px] h-[44px] bg-[#D1F3FA] rounded-full flex items-center justify-center shrink-0">
                    <HugeiconsIcon icon={ListChecksIcon} className="w-5 h-5 text-[#106374]" />
                  </div>
                  <div className="flex flex-col">
                    <span className="font-poppins font-medium text-[17px] leading-[26px] tracking-[-0.34px] text-[#1F201D]">
                      Fixed time slots
                    </span>
                    <span className="font-poppins font-normal text-[14px] leading-[20px] text-[#6D6D68]">
                      You define the exact booking times customers can book this service. Only these times will appear.
                    </span>
                  </div>
                </div>

                <div className="w-full border-b border-neutral-100 my-4" />

                <span className="font-poppins font-medium text-[13px] leading-[20px] text-[#3D3E39] mb-4">
                  Available times
                </span>

                {/* Days Schedule List */}
                <div className="flex flex-col gap-6 w-full">
                  {Object.keys(daySlots).map((day) => {
                    const dayData = daySlots[day];
                    return (
                      <div key={day} className="flex flex-col sm:flex-row gap-5 w-full items-start border-b border-neutral-100/50 pb-4">
                        <div className="flex flex-row items-center gap-3 w-[196px] pt-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setDaySlots({
                                ...daySlots,
                                [day]: { ...dayData, isOpen: !dayData.isOpen }
                              });
                            }}
                            className={`w-[27px] h-[27px] rounded-[5px] flex items-center justify-center cursor-pointer transition-colors ${
                              dayData.isOpen ? "bg-[#2E9DA7]" : "border border-[#C6C19F] bg-white"
                            }`}
                          >
                            {dayData.isOpen && <span className="text-white text-xs font-bold">✓</span>}
                          </button>
                          <div className="flex flex-col">
                            <span className="font-inter font-normal text-[17px] leading-[20px] tracking-[-0.255px] text-[#232326]">
                              {day}
                            </span>
                            {dayData.isOpen && (
                              <span className="font-inter font-normal text-[17px] leading-[18px] tracking-[-0.17px] text-[#478F2F]">
                                Open
                              </span>
                            )}
                          </div>
                        </div>

                        <div className={`flex-1 flex flex-col gap-3 w-full transition-opacity duration-200 ${
                          !dayData.isOpen ? "opacity-25 pointer-events-none" : ""
                        }`}>
                          {/* Time selector block */}
                          <div className="flex flex-row gap-3 items-center w-full">
                            <div className="box-sizing-border-box flex flex-row justify-between items-center p-[10px] bg-[#FBFAF8] border border-[#DEDBD3] rounded-[16px] w-[300px] h-[46px]">
                              <input
                                type="text"
                                disabled={!dayData.isOpen}
                                value={dayData.newTime}
                                onChange={(e) => {
                                  setDaySlots({
                                    ...daySlots,
                                    [day]: { ...dayData, newTime: e.target.value }
                                  });
                                }}
                                className="font-poppins font-medium text-[17px] leading-[26px] tracking-[-0.34px] text-black bg-transparent w-20 text-center focus:outline-none"
                              />
                              <div className="flex flex-row gap-1">
                                <button
                                  type="button"
                                  disabled={!dayData.isOpen}
                                  onClick={() => {
                                    setDaySlots({
                                      ...daySlots,
                                      [day]: { ...dayData, amPm: "AM" }
                                    });
                                  }}
                                  className={`px-2 py-0.5 rounded text-sm font-medium ${
                                    dayData.amPm === "AM" ? "bg-[#8EBAC5] text-[#111111]" : "text-neutral-500"
                                  }`}
                                >
                                  AM
                                </button>
                                <button
                                  type="button"
                                  disabled={!dayData.isOpen}
                                  onClick={() => {
                                    setDaySlots({
                                      ...daySlots,
                                      [day]: { ...dayData, amPm: "PM" }
                                    });
                                  }}
                                  className={`px-2 py-0.5 rounded text-sm font-medium ${
                                    dayData.amPm === "PM" ? "bg-[#8EBAC5] text-[#111111]" : "text-neutral-500"
                                  }`}
                                >
                                  PM
                                </button>
                              </div>
                            </div>

                            {/* Add button */}
                            <button
                              type="button"
                              disabled={!dayData.isOpen}
                              onClick={() => {
                                if (dayData.newTime) {
                                  setDaySlots({
                                    ...daySlots,
                                    [day]: {
                                      ...dayData,
                                      slots: [...dayData.slots, `${dayData.newTime} ${dayData.amPm}`]
                                    }
                                  });
                                }
                              }}
                              className="w-9 h-9 border border-[#C6C6CB] bg-white rounded-full flex items-center justify-center hover:bg-neutral-50 cursor-pointer shadow-sm"
                            >
                              <span className="text-xl font-medium text-[#141B34]">+</span>
                            </button>
                          </div>

                          {/* Active pills list */}
                          {dayData.isOpen && dayData.slots.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {dayData.slots.map((pill, idx) => (
                                <div
                                  key={idx}
                                  className="flex items-center gap-2 px-3 py-1 bg-[#D1F3FA] rounded-full text-xs font-poppins font-medium text-[#106374]"
                                >
                                  <span>{pill}</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setDaySlots({
                                        ...daySlots,
                                        [day]: {
                                          ...dayData,
                                          slots: dayData.slots.filter((_, i) => i !== idx)
                                        }
                                      });
                                    }}
                                    className="text-[#106374] font-bold hover:text-red-500"
                                  >
                                    ×
                                  </button>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

              </div>
            )}
          </div>

          {/* Section 5: Pricing & Duration */}
          <div className="flex flex-col gap-[20px] w-full">
            <span className="font-poppins font-semibold text-xs leading-[18px] tracking-[0.5px] uppercase text-[#111111]">
              PRICING & DURATION
            </span>

            {/* Inputs grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
              {/* Duration */}
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Duration (min) <span className="text-[#D85A30]">*</span>
                </span>
                <input
                  type="text"
                  value={durationVal}
                  onChange={(e) => setDurationVal(e.target.value)}
                  placeholder="Duration of whole service (min)"
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-xs text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>

              {/* Booking interval */}
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Booking interval (min)
                </span>
                <input
                  type="text"
                  value={bookingInterval}
                  onChange={(e) => setBookingInterval(e.target.value)}
                  placeholder="How often a new slot appears for this service."
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-xs text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>

              {/* Buffer time */}
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Buffer time after service (min)
                </span>
                <input
                  type="text"
                  value={bufferTime}
                  onChange={(e) => setBufferTime(e.target.value)}
                  placeholder="Hidden break after each appointment."
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-xs text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>

              {/* Processing time */}
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Processing time (min)
                </span>
                <input
                  type="text"
                  value={processingTime}
                  onChange={(e) => setProcessingTime(e.target.value)}
                  placeholder="Free time mid-appointment while treatment develops."
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-xs text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>

              {/* Sessions in package */}
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Sessions in package <span className="text-[#D85A30]">*</span>
                </span>
                <input
                  type="text"
                  value={sessionsInPackage}
                  onChange={(e) => setSessionsInPackage(e.target.value)}
                  placeholder="e.g. 5"
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-xs text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>

              {/* Bundle price */}
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Bundle price (€) <span className="text-[#D85A30]">*</span>
                </span>
                <input
                  type="text"
                  value={bundlePrice}
                  onChange={(e) => setBundlePrice(e.target.value)}
                  placeholder="e.g. 150.00"
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-xs text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>

              {/* Discount */}
              <div className="flex flex-col gap-2 w-full">
                <span className="font-poppins font-normal text-[12px] leading-[18px] text-[#111111]">
                  Discount
                </span>
                <input
                  type="text"
                  value={discountVal}
                  onChange={(e) => setDiscountVal(e.target.value)}
                  placeholder="e.g. 10%"
                  className="h-[41px] bg-white border border-[#D3D1C7] rounded-[12px] px-3 font-poppins text-xs text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
                />
              </div>
            </div>
          </div>

          {/* Section 6: Cities Served */}
          <div className="flex flex-col gap-[12px] w-full">
            <span className="font-poppins font-semibold text-xs leading-[18px] tracking-[0.5px] uppercase text-[#111111]">
              CITIES SERVED FOR THIS SERVICE
            </span>
            <span className="font-poppins font-normal text-sm leading-[21px] text-[#111111]">
              Select which cities you offer this service in. Travel fees per city are set in Settings → Travel fees and added automatically at checkout.
            </span>
            <div className="flex flex-wrap gap-2.5 mt-2">
              {["Larnaca", "Limassol", "Nicosia", "Paphos", "Ayia Napa", "Protaras"].map((city) => {
                const isSelected = cities.includes(city);
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setCities(cities.filter(c => c !== city));
                      } else {
                        setCities([...cities, city]);
                      }
                    }}
                    className={`h-[36px] px-4 rounded-full text-xs font-poppins font-medium transition-colors cursor-pointer flex items-center justify-center ${
                      isSelected ? "bg-[#2E9DA7] text-white" : "bg-neutral-100 text-[#111111] border border-neutral-200"
                    }`}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-neutral-500 font-normal mt-1">
              The customer enters their full address at booking. Only enabled cities will be selectable.
            </span>
          </div>

          {/* Section 7: Assign Staff */}
          <div className="flex flex-col gap-[12px] w-full">
            <span className="font-poppins font-semibold text-xs leading-[18px] tracking-[0.5px] uppercase text-[#111111]">
              ASSIGN STAFF
            </span>
            <span className="font-poppins font-normal text-sm leading-[21px] text-[#111111]">
              Which staff members can perform this service?
            </span>
            <div className="flex flex-wrap gap-4 mt-2">
              {[
                { name: "Andreas M.", avatar: "/img/dumyUser.jpeg" },
                { name: "Maria K.", avatar: "/img/dumyUser.jpeg" },
                { name: "Kostas P.", avatar: "/img/dumyUser.jpeg" },
                { name: "Elena L.", avatar: "/img/dumyUser.jpeg" }
              ].map((staff) => {
                const isSelected = staffList.includes(staff.name);
                return (
                  <button
                    key={staff.name}
                    type="button"
                    onClick={() => {
                      if (isSelected) {
                        setStaffList(staffList.filter(s => s !== staff.name));
                      } else {
                        setStaffList([...staffList, staff.name]);
                      }
                    }}
                    className={`h-[38px] pl-2 pr-4 rounded-full text-xs font-poppins font-medium transition-colors cursor-pointer flex items-center gap-2 border ${
                      isSelected ? "bg-[#2E9DA7] text-white border-[#2E9DA7]" : "bg-white text-[#111111] border-neutral-200"
                    }`}
                  >
                    <img src={staff.avatar} alt={staff.name} className="w-6 h-6 rounded-full object-cover" />
                    <span>{staff.name}</span>
                  </button>
                );
              })}
            </div>
            <span className="text-xs text-neutral-500 font-normal mt-1">
              Manage your team under Staff → Add / edit staff members.
            </span>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-row justify-end items-center gap-[12px] w-full h-[34px] mt-6">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="h-[34px] px-6 bg-[#EBEBEB] text-[#757575] font-poppins font-medium text-xs rounded-[8px] hover:bg-[#E2E2E2] transition-colors cursor-pointer flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                // mock adding new service
                const newSrv = {
                  id: Date.now(),
                  title: packageName || serviceName || "New Service",
                  category: "Wellness & Beauty",
                  price: `€${bundlePrice || "100"}`,
                  duration: `${durationVal || "60"} min`,
                  staff: staffList.join(", ") || "Andreas M.",
                  travelTo: cities[0] || "Larnaca",
                  noShow: "100%",
                  isActive: serviceActive,
                  isFeatured: featuredService
                };
                setServices([newSrv, ...services]);
                setIsCreating(false);
              }}
              className="h-[34px] px-6 bg-[#1C1B1C] hover:bg-black text-white font-poppins font-medium text-xs rounded-[8px] transition-colors cursor-pointer flex items-center justify-center"
            >
              Save
            </button>
          </div>

        </div>
      
      </div></main>
    );
  }

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] md: select-none font-poppins relative">
      
      {/* Header Row */}
      <DashboardHeader 
        title="Services" 
        subtitle="Manage your service catalogue" 
      />
      <div className="flex-1 overflow-y-auto p-6 md:p-8 flex flex-col gap-6">

      {/* Control row: Stats pill & Create Service button */}
      <div className="flex justify-between items-center w-full mb-5 gap-4">
        {/* Active / Draft Stats pill */}
        <div className="bg-white border border-[#F5F5F4] rounded-full py-2 px-4 shadow-sm flex items-center gap-4 text-sm font-medium">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#1D9E75] rounded-full" />
            <span className="text-[#1F8900]">{activeCount} Active</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 bg-[#BCB8B5] rounded-full" />
            <span className="text-[#79716B]">{draftCount} Draft</span>
          </div>
        </div>

        {/* Create Service button */}
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-[#111111] hover:bg-black text-white text-[13px] font-medium px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={PlusIcon} className="w-3.5 h-3.5" />
          <span>Create Service</span>
        </button>
      </div>

      {/* Gap Elimination Section */}
      <div className="bg-white rounded-xl p-[18px] px-5 w-full flex flex-col gap-4 shadow-sm border border-[#F5F5F4] mb-5">
        <div className="flex justify-between items-center w-full">
          <div className="flex flex-col gap-0.5">
            <span className="font-semibold text-sm text-[#111111]">Gap Elimination</span>
            <span className="text-xs text-neutral-500">Fill your day like Tetris. No useless gaps between appointments.</span>
          </div>
          {/* Toggle Switch */}
          <button
            onClick={() => setGapElimination(!gapElimination)}
            className={`w-[38px] h-[21px] rounded-full p-[3px] transition-colors duration-200 focus:outline-none flex items-center ${gapElimination ? "bg-[#0F6E56]" : "bg-neutral-300"}`}
          >
            <div className={`w-[15px] h-[15px] bg-white rounded-full transition-transform duration-200 ${gapElimination ? "translate-x-[17px]" : "translate-x-0"}`} />
          </button>
        </div>
      </div>

      {/* Grid of Service Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {services.map((service) => (
          <div
            key={service.id}
            className={`bg-white border border-[#F5F5F4] rounded-2xl p-6 flex flex-col justify-between shadow-sm min-h-[456px] ${service.isDraft ? "bg-opacity-95" : ""}`}
          >
            <div>
              {/* Card Header */}
              <div className="flex justify-between items-start border-b border-neutral-100 pb-3 mb-4">
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg text-[#1C1917] leading-7">{service.title}</h3>
                  <span className="text-xs font-light text-[#757575] mt-0.5">{service.category}</span>
                </div>
                <button className="w-8 h-8 rounded-full hover:bg-neutral-50 flex items-center justify-center text-neutral-400 cursor-pointer">
                  <EditDotsIcon />
                </button>
              </div>

              {/* Price row */}
              <div className="flex items-baseline gap-1 mb-6">
                <span className="text-2xl font-bold text-[#1C1917] tracking-tight">{service.price}</span>
                {service.priceSuffix && (
                  <span className="text-xs text-[#757575] font-normal">{service.priceSuffix}</span>
                )}
              </div>

              {/* Detail Rows */}
              <div className="flex flex-col gap-3">
                {/* Duration Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <HugeiconsIcon icon={Clock01Icon} className="w-4 h-4" />
                    <span>Duration</span>
                  </div>
                  <span className="font-medium text-[#111111]">{service.duration}</span>
                </div>

                {/* Staff Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <HugeiconsIcon icon={UsersIcon} className="w-4 h-4" />
                    <span>Staff</span>
                  </div>
                  <span className="font-medium text-[#111111]">{service.staff}</span>
                </div>

                {/* Min/Max (Optional) */}
                {service.minMax && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-neutral-500">
                      <HugeiconsIcon icon={UsersIcon} className="w-4 h-4" />
                      <span>Min/Max</span>
                    </div>
                    <span className="font-medium text-[#111111]">{service.minMax}</span>
                  </div>
                )}

                {/* Travel to Row */}
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-3 text-neutral-500">
                    <HugeiconsIcon icon={Car04Icon} className="w-4 h-4" />
                    <span>Travel to</span>
                  </div>
                  <div className="flex items-center gap-1 font-medium text-[#111111]">
                    <span>{service.travelTo}</span>
                    {service.travelSuffix && (
                      <>
                        <span className="w-1 h-1 bg-neutral-400 rounded-full" />
                        <span>{service.travelSuffix}</span>
                      </>
                    )}
                  </div>
                </div>

                {/* Add-ons Row (Optional) */}
                {service.addons && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-neutral-500">
                      <HugeiconsIcon icon={PuzzleIcon} className="w-4 h-4" />
                      <span>Add-ons</span>
                    </div>
                    <span className="bg-[#F9EAB9] text-[#824E1B] text-xs font-normal px-2.5 py-0.5 rounded-full">
                      {service.addons}
                    </span>
                  </div>
                )}

                {/* No-show Row */}
                {service.noShow && (
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-3 text-neutral-500">
                      <HugeiconsIcon icon={AlertCircleIcon} className="w-4 h-4" />
                      <span>No-show</span>
                    </div>
                    <span className="font-medium text-[#111111]">{service.noShow}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Badges block: rendered above the border divider */}
            <div className="flex gap-2 mt-5 mb-4 shrink-0">
              {service.isFeatured && (
                <span className="bg-[#E9F2FF] text-[#2D47C8] text-xs font-normal px-2.5 py-1 rounded-full">
                  Featured
                </span>
              )}
              {service.discount && (
                <span className="bg-[#DFFDDF] text-[#176117] text-xs font-normal px-2.5 py-1 rounded-full">
                  {service.discount}
                </span>
              )}
            </div>

            {/* Bottom Row: with border-t and Currently Active/Draft Mode toggle */}
            <div className="border-t border-[#F5F5F4] pt-4 shrink-0">
              <div className="flex justify-between items-center w-full">
                <span className="text-[13px] font-medium text-[#57534D]">
                  {service.isDraft ? "Draft Mode" : "Currently Active"}
                </span>
                <button
                  type="button"
                  onClick={() => !service.isDraft && toggleServiceActive(service.id)}
                  className={`w-[36px] h-[20px] rounded-full p-[2px] transition-colors duration-200 focus:outline-none flex items-center ${
                    (!service.isDraft && service.isActive) ? "bg-[#8EBAC5]" : "bg-neutral-300"
                  } ${service.isDraft ? "cursor-not-allowed opacity-80" : "cursor-pointer"}`}
                >
                  <div
                    className={`w-[16px] h-[16px] bg-white rounded-full transition-transform duration-200 ${
                      (!service.isDraft && service.isActive) ? "translate-x-[16px]" : "translate-x-0"
                    }`}
                  />
                </button>
              </div>
            </div>

          </div>
        ))}
      </div>
    
      </div></main>
  );
}
