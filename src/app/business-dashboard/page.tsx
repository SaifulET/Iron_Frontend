"use client";

import React, { useState, useEffect, useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  BellIcon,
  ArrowLeft02Icon,
  User02Icon,
  PencilEdit02Icon,
  Search01Icon,
  Mail01Icon,
  Calendar03Icon,
  ScissorIcon,
  Calendar02Icon,
  Location05Icon
} from "@hugeicons/core-free-icons";

// Reused component
import { initialBookingsData, initialClientsData } from "@/utils/dashboardMockData";

// Modular Dashboard sub-components
import DashboardSidebar from "@/components/DashboardSidebar";
import DashboardOverview from "@/components/DashboardOverview";
import DashboardCalendar from "@/components/DashboardCalendar";
import DashboardBookingsList from "@/components/DashboardBookingsList";
import DashboardBookingForm from "@/components/DashboardBookingForm";
import DashboardClientsList from "@/components/DashboardClientsList";
import DashboardClientDetails from "@/components/DashboardClientDetails";
import ClientBookingHistoryCard from "@/components/ClientBookingHistoryCard";
import DashboardBusinessProfile from "@/components/DashboardBusinessProfile";
import DashboardCreateBusiness from "@/components/DashboardCreateBusiness";
import DashboardServicesList from "@/components/DashboardServicesList";
import DashboardAddonsList from "@/components/DashboardAddonsList";
import DashboardStaffList from "@/components/DashboardStaffList";
import DashboardReviewsList from "@/components/DashboardReviewsList";
import DashboardPayoutsList from "@/components/DashboardPayoutsList";
import DashboardAnalytics from "@/components/DashboardAnalytics";
import DashboardSettings from "@/components/DashboardSettings";

interface Booking {
  clientInitials: string;
  clientName: string;
  clientPhone: string;
  isManual?: boolean;
  isNew?: boolean;
  bookingId: string;
  date: string;
  time: string;
  staff: string;
  status: string;
  amount: string;
  paymentType: string;
}

interface Client {
  name: string;
  joined: string;
  phone: string;
  visitText: string;
  visitSub: string;
  isNext?: boolean;
  visits: number;
  spent: string;
  tag: string | null;
  tagBg: string;
  tagColor: string;
  avatarBg: string;
  avatarText: string;
  avatar?: string;
}

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState("Business Profile");
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showFooterMenu, setShowFooterMenu] = useState(true);
  const footerMenuRef = useRef<HTMLDivElement>(null);

  // Bookings Data & Filters
  const [bookingsData, setBookingsData] = useState<Booking[]>(initialBookingsData as Booking[]);
  const [bookingSearch, setBookingSearch] = useState("");
  const [bookingStatusFilter, setBookingStatusFilter] = useState("All");
  const [bookingStaffFilter, setBookingStaffFilter] = useState("All Staff");
  const [openBookingActionIdx, setOpenBookingActionIdx] = useState<number | null>(null);

  // Manual Booking states
  const [isCreatingBooking, setIsCreatingBooking] = useState(false);
  const [isEditingBooking, setIsEditingBooking] = useState(false);
  const [editingBookingIndex, setEditingBookingIndex] = useState<number | null>(null);

  const [newBookingName, setNewBookingName] = useState("John Doe");
  const [newBookingDob, setNewBookingDob] = useState("1/6/2026");
  const [newBookingGender, setNewBookingGender] = useState("Male");
  const [newBookingEmail, setNewBookingEmail] = useState("example@email.com");
  const [newBookingPhoneCode, setNewBookingPhoneCode] = useState("+357");
  const [newBookingPhone, setNewBookingPhone] = useState("1111111111");
  const [newBookingCity, setNewBookingCity] = useState("Limasol");
  const [newBookingPropertyType, setNewBookingPropertyType] = useState("");
  const [newBookingArea, setNewBookingArea] = useState("");
  const [newBookingStreetName, setNewBookingStreetName] = useState("");
  const [newBookingStreetNumber, setNewBookingStreetNumber] = useState("");
  const [newBookingFloor, setNewBookingFloor] = useState("");
  const [newBookingApt, setNewBookingApt] = useState("");
  const [newBookingDirections, setNewBookingDirections] = useState("");
  const [newBookingServices, setNewBookingServices] = useState<Array<{ name: string, duration: string, price: number }>>([
    { name: "Haircut", duration: "30 min", price: 90 }
  ]);
  const [newBookingAddons, setNewBookingAddons] = useState<Array<{ name: string, duration: string, price: number }>>([
    { name: "Haircut", duration: "30 min", price: 90 }
  ]);
  const [newBookingStaff, setNewBookingStaff] = useState("Basel");
  const [newBookingDate, setNewBookingDate] = useState("Apr 3, 2026");
  const [newBookingTime, setNewBookingTime] = useState("10:00 AM");
  const [newBookingServiceCity, setNewBookingServiceCity] = useState("Larnaca");
  const [newBookingTags, setNewBookingTags] = useState<string[]>(["VIP"]);
  const [newBookingNotes, setNewBookingNotes] = useState("");

  // Viewing booking details states
  const [viewingBookingIndex, setViewingBookingIndex] = useState<number | null>(null);
  const [isViewingBookingDetails, setIsViewingBookingDetails] = useState(false);
  const [isCreatingBusiness, setIsCreatingBusiness] = useState(true);

  // Clients Data states
  const [clientsData, setClientsData] = useState<Client[]>(initialClientsData as Client[]);
  const [isAddingClient, setIsAddingClient] = useState(false);
  const [isViewingClient, setIsViewingClient] = useState(false);
  const [editingClientIndex, setEditingClientIndex] = useState<number | null>(null);
  const [openActionIdx, setOpenActionIdx] = useState<number | null>(null);

  // Add Client Form states
  const [clientFirstName, setClientFirstName] = useState("");
  const [clientLastName, setClientLastName] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientDob, setClientDob] = useState("1/6/2026");
  const [clientGender, setClientGender] = useState("Male");
  const [clientCity, setClientCity] = useState("Limasol");
  const [clientPropertyType, setClientPropertyType] = useState("");
  const [clientArea, setClientArea] = useState("");
  const [clientStreetName, setClientStreetName] = useState("");
  const [clientStreetNumber, setClientStreetNumber] = useState("");
  const [clientFloor, setClientFloor] = useState("");
  const [clientAptNo, setClientAptNo] = useState("");
  const [clientDirections, setClientDirections] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [clientTag, setClientTagState] = useState("VIP");

  // Avatar and Phone Country Code states
  const [clientAvatar, setClientAvatar] = useState("");
  const clientAvatarInputRef = useRef<HTMLInputElement>(null);
  const [clientPhoneCode, setClientPhoneCode] = useState("+357");
  const [clientPhoneFlag, setClientPhoneFlag] = useState("cy");
  const [isClientPhoneDropdownOpen, setIsClientPhoneDropdownOpen] = useState(false);

  const phoneCountries = [
    { name: "Cyprus", code: "+357", flag: "cy" },
    { name: "Bangladesh", code: "+880", flag: "bd" },
    { name: "Greece", code: "+30", flag: "gr" },
    { name: "United Kingdom", code: "+44", flag: "gb" },
    { name: "United States", code: "+1", flag: "us" }
  ];

  const handleClientAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setClientAvatar(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddClient = () => {
    if (!clientFirstName || !clientPhone) return;
    const newClient: Client = {
      name: `${clientFirstName} ${clientLastName}`.trim(),
      joined: `Since ${new Date().toLocaleString("en-US", { month: "short", year: "numeric" })}`,
      phone: `${clientPhoneCode} ${clientPhone}`.trim(),
      visitText: "—",
      visitSub: "No visits yet",
      isNext: false,
      visits: 0,
      spent: "€0",
      tag: clientTag || null,
      tagBg: clientTag === "VIP" ? "bg-[#FAEEDA]" : clientTag === "No-show" ? "bg-[#FCE4E4]" : clientTag === "New" ? "bg-[#E6F1FB]" : "bg-neutral-100",
      tagColor: clientTag === "VIP" ? "text-[#633806]" : clientTag === "No-show" ? "text-[#E42424]" : clientTag === "New" ? "text-[#0C447C]" : "text-neutral-600",
      avatarBg: "bg-[#E1F5EE]",
      avatarText: `${clientFirstName.charAt(0)}${clientLastName ? clientLastName.charAt(0) : ""}`.toUpperCase(),
      avatar: clientAvatar || undefined
    };
    setClientsData([newClient, ...clientsData]);
    // Reset Form
    setClientFirstName("");
    setClientLastName("");
    setClientPhone("");
    setClientEmail("");
    setClientDob("1/6/2026");
    setClientGender("Male");
    setClientCity("Limasol");
    setClientPropertyType("");
    setClientArea("");
    setClientStreetName("");
    setClientStreetNumber("");
    setClientFloor("");
    setClientAptNo("");
    setClientDirections("");
    setClientNotes("");
    setClientTagState("VIP");
    setClientAvatar("");
    setClientPhoneCode("+357");
    setClientPhoneFlag("cy");
    setIsAddingClient(false);
  };

  const handleSaveClient = () => {
    if (editingClientIndex === null || !clientFirstName || !clientPhone) return;
    const updated = [...clientsData];
    updated[editingClientIndex] = {
      ...updated[editingClientIndex],
      name: `${clientFirstName} ${clientLastName}`.trim(),
      phone: `${clientPhoneCode} ${clientPhone}`.trim(),
      tag: clientTag || null,
      tagBg: clientTag === "VIP" ? "bg-[#FAEEDA]" : clientTag === "No-show" ? "bg-[#FCE4E4]" : clientTag === "New" ? "bg-[#E6F1FB]" : "bg-neutral-100",
      tagColor: clientTag === "VIP" ? "text-[#633806]" : clientTag === "No-show" ? "text-[#E42424]" : clientTag === "New" ? "text-[#0C447C]" : "text-neutral-600",
      avatarText: `${clientFirstName.charAt(0)}${clientLastName ? clientLastName.charAt(0) : ""}`.toUpperCase(),
      avatar: clientAvatar || undefined
    };
    setClientsData(updated);
    // Reset Form
    setClientFirstName("");
    setClientLastName("");
    setClientPhone("");
    setClientEmail("");
    setClientDob("1/6/2026");
    setClientGender("Male");
    setClientCity("Limasol");
    setClientPropertyType("");
    setClientArea("");
    setClientStreetName("");
    setClientStreetNumber("");
    setClientFloor("");
    setClientAptNo("");
    setClientDirections("");
    setClientNotes("");
    setClientTagState("VIP");
    setClientAvatar("");
    setClientPhoneCode("+357");
    setClientPhoneFlag("cy");
    setEditingClientIndex(null);
  };

  // Commented out to prevent page shifting and cutting off the top header on mount
  // useEffect(() => {
  //   if (showFooterMenu && footerMenuRef.current) {
  //     footerMenuRef.current.scrollIntoView({ behavior: "smooth", block: "nearest" });
  //   }
  // }, [showFooterMenu]);

  // Main UI router switch helper
  const renderMainContent = () => {
    if (activeTab === "Dashboard") {
      return <DashboardOverview />;
    }

    if (activeTab === "Calendar") {
      return (
        <DashboardCalendar
          onNewBookingClick={() => setIsCreatingBooking(true)}
        />
      );
    }

    if (activeTab === "Clients") {
      if (isViewingClient) {
        return (
          <DashboardClientDetails
            clientFirstName={clientFirstName}
            clientLastName={clientLastName}
            clientEmail={clientEmail}
            clientGender={clientGender}
            clientDob={clientDob}
            clientPhone={clientPhone}
            clientCity={clientCity}
            clientPropertyType={clientPropertyType}
            clientArea={clientArea}
            clientStreetName={clientStreetName}
            clientStreetNumber={clientStreetNumber}
            clientFloor={clientFloor}
            clientAptNo={clientAptNo}
            setIsViewingClient={setIsViewingClient}
            setEditingClientIndex={setEditingClientIndex}
          />
        );
      }

      if (isAddingClient || editingClientIndex !== null) {
        return (
          <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] relative">
            {/* Client Add/Edit Header */}
            <div className="h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 flex items-center justify-between shrink-0 select-none">
              <div>
                <h1 className="text-xl font-bold text-[#1A1A1A] font-poppins">
                  {editingClientIndex !== null ? "Edit Client" : "Add Client"}
                </h1>
                <p className="text-[11px] text-neutral-500 font-poppins mt-0.5">
                  {editingClientIndex !== null ? "Update client info in your system" : "Create new client info in your system"}
                </p>
              </div>
              {/* Notification bell */}
              <div className="relative">
                <button className="w-9 h-9 border border-[#E8E8E6] bg-white rounded-lg flex items-center justify-center hover:bg-neutral-50 transition-all shadow-sm">
                  <HugeiconsIcon icon={BellIcon} className="w-[18px] h-[18px] text-[#5F5E5A]" />
                </button>
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#E24B4A] text-white text-[9px] font-medium flex items-center justify-center rounded-full border-2 border-white">
                  5
                </span>
              </div>
            </div>

            {/* Client Form Wrapper */}
            <div className="flex-1 p-6 md:p-8 xl:p-10 flex flex-col lg:flex-row gap-8 items-start w-full">
              <div className="flex-1 flex flex-col gap-6 w-full">
                {/* Back / Breadcrumbs */}
                <div
                  onClick={() => {
                    setIsAddingClient(false);
                    setEditingClientIndex(null);
                    setIsViewingClient(false);
                  }}
                  className="flex items-center gap-2 cursor-pointer text-xs font-medium text-neutral-500 hover:text-neutral-900 font-poppins select-none"
                >
                  <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4 text-neutral-600" />
                  <span>Clients</span>
                  <span className="text-neutral-300 font-normal">&gt;</span>
                  <span className="text-[#0F1E35] font-semibold">
                    {isViewingClient ? "View client" : editingClientIndex !== null ? "Edit client" : "Add client"}
                  </span>
                </div>

                <fieldset disabled={isViewingClient} className="space-y-6">
                  {/* Personal Information Header                   <div>
                    <h3 className="font-poppins text-[11px] font-medium tracking-[0.66px] uppercase text-[#888780]">Personal information</h3>
                  </div>

                  {/* Avatar Picker */}
                  <div 
                    onClick={() => clientAvatarInputRef.current?.click()}
                    className="relative w-14 h-14 bg-[#E1F5EE] rounded-full flex items-center justify-center select-none cursor-pointer hover:opacity-95 transition-opacity"
                  >
                    {clientAvatar ? (
                      <img src={clientAvatar} className="w-full h-full rounded-full object-cover" alt="client avatar" />
                    ) : (
                      <HugeiconsIcon icon={User02Icon} className="w-[22px] h-[22px] text-[#ABAAA6]" />
                    )}
                    <div className="absolute right-0 bottom-0 w-6 h-6 bg-white border border-[#E8E8E6] rounded-full flex items-center justify-center shadow-sm">
                      <HugeiconsIcon icon={PencilEdit02Icon} className="w-3 h-3 text-[#757575]" />
                    </div>
                  </div>
                  <input 
                    type="file"
                    ref={clientAvatarInputRef}
                    onChange={handleClientAvatarChange}
                    accept="image/*"
                    className="hidden"
                  />

                  {/* First and Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                        <span>First name</span>
                        <span className="text-[#E24B4A]">*</span>
                      </label>
                      <input
                        type="text"
                        value={clientFirstName}
                        onChange={(e) => setClientFirstName(e.target.value)}
                        placeholder="e.g. Maria"
                        className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Last name</label>
                      <input
                        type="text"
                        value={clientLastName}
                        onChange={(e) => setClientLastName(e.target.value)}
                        placeholder="e.g. Papadopoulou"
                        className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                      <span>Phone</span>
                      <span className="text-[#E24B4A]">*</span>
                    </label>
                    <div className="flex w-full h-[38px] relative">
                      <div 
                        onClick={() => setIsClientPhoneDropdownOpen(!isClientPhoneDropdownOpen)}
                        className="bg-white border border-[#E8E8E4] border-r-0 rounded-l-lg px-3 flex items-center gap-1.5 text-xs text-neutral-500 shrink-0 cursor-pointer select-none hover:bg-neutral-50/50"
                      >
                        <img 
                          src={`https://flagcdn.com/w20/${clientPhoneFlag}.png`} 
                          alt="flag" 
                          className="w-[18px] h-[12px] object-cover rounded-sm border border-neutral-100 shrink-0" 
                        />
                        <span>{clientPhoneCode}</span>
                        <svg className="w-3 h-3 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>

                      {/* Dropdown menu */}
                      {isClientPhoneDropdownOpen && (
                        <>
                          <div 
                            className="fixed inset-0 z-40 bg-transparent"
                            onClick={() => setIsClientPhoneDropdownOpen(false)}
                          />
                          <div className="absolute top-[40px] left-0 bg-white border border-neutral-200 rounded-lg shadow-lg z-50 w-[180px] p-1 flex flex-col gap-0.5 text-xs">
                            {phoneCountries.map((c) => (
                              <button
                                key={c.code}
                                type="button"
                                onClick={() => {
                                  setClientPhoneCode(c.code);
                                  setClientPhoneFlag(c.flag);
                                  setIsClientPhoneDropdownOpen(false);
                                }}
                                className="flex items-center gap-2 w-full px-3 py-2 hover:bg-neutral-50 rounded text-left font-poppins"
                              >
                                <img src={`https://flagcdn.com/w40/${c.flag}.png`} className="w-[20px] h-[12px] object-cover rounded-sm shrink-0 border border-neutral-100" alt="flag" />
                                <span className="font-semibold text-neutral-800">{c.code}</span>
                                <span className="text-neutral-500 text-[10px] ml-auto">{c.name}</span>
                              </button>
                            ))}
                          </div>
                        </>
                      )}

                      <input
                        type="text"
                        value={clientPhone}
                        onChange={(e) => setClientPhone(e.target.value)}
                        placeholder="1111111111"
                        className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-r-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                      />
                    </div>
                    <span className="text-[11px] text-[#ABAAA6] font-poppins">Used for SMS reminders and booking confirmations</span>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                      <span>Email</span>
                      <span className="text-[#E24B4A]">*</span>
                    </label>
                    <div className="flex items-center gap-3 border border-[#E8E8E4] rounded-lg px-3 bg-white h-[38px]">
                      <HugeiconsIcon icon={Mail01Icon} className="w-5 h-5 text-neutral-400" />
                      <input
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        placeholder="client@email.com"
                        className="w-full h-full text-xs placeholder-neutral-400 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Date of Birth & Gender */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Date of birth</label>
                      <div className="flex items-center gap-3 border border-[#E8E8E4] rounded-lg px-3 bg-white h-[38px]">
                        <HugeiconsIcon icon={Calendar03Icon} className="w-5 h-5 text-neutral-400" />
                        <input
                          type="text"
                          value={clientDob}
                          onChange={(e) => setClientDob(e.target.value)}
                          placeholder="1/6/2026"
                          className="w-full h-full text-xs placeholder-neutral-400 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Gender</label>
                      <div className="relative">
                        <select
                          value={clientGender}
                          onChange={(e) => setClientGender(e.target.value)}
                          className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs text-neutral-700 appearance-none focus:outline-none focus:border-neutral-800"
                        >
                          <option value="Male">Male</option>
                          <option value="Female">Female</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-3 top-3.5 pointer-events-none">
                          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Address Section */}
                  <div className="border border-[#E8E8E6] rounded-xl p-5 bg-white flex flex-col gap-4">
                    <h4 className="font-poppins text-xs font-semibold text-[#5F5E5A] tracking-wider uppercase">Address</h4>

                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                        <span>City</span>
                        <span className="text-[#E24B4A]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={clientCity}
                          onChange={(e) => setClientCity(e.target.value)}
                          className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs text-neutral-700 appearance-none focus:outline-none focus:border-neutral-800"
                        >
                          <option value="Limasol">Limasol</option>
                          <option value="Nicosia">Nicosia</option>
                          <option value="Larnaca">Larnaca</option>
                        </select>
                        <div className="absolute right-3 top-3.5 pointer-events-none">
                          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                        <span>Property type</span>
                        <span className="text-[#E24B4A]">*</span>
                      </label>
                      <div className="relative">
                        <select
                          value={clientPropertyType}
                          onChange={(e) => setClientPropertyType(e.target.value)}
                          className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs text-neutral-700 appearance-none focus:outline-none focus:border-neutral-800"
                        >
                          <option value="">Select property type</option>
                          <option value="Apartment">Apartment</option>
                          <option value="Villa">Villa</option>
                          <option value="House">House</option>
                          <option value="Hotel">Hotel</option>
                          <option value="Office">Office</option>
                          <option value="Other">Other</option>
                        </select>
                        <div className="absolute right-3 top-3.5 pointer-events-none">
                          <svg className="w-3.5 h-3.5 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                        <span>Area/neighborhood</span>
                        <span className="text-[#E24B4A]">*</span>
                      </label>
                      <input
                        type="text"
                        value={clientArea}
                        onChange={(e) => setClientArea(e.target.value)}
                        placeholder="e.g. Mackenzie, finikoudes"
                        className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                          <span>Street name</span>
                          <span className="text-[#E24B4A]">*</span>
                        </label>
                        <input
                          type="text"
                          value={clientStreetName}
                          onChange={(e) => setClientStreetName(e.target.value)}
                          placeholder="e.g. Emrou"
                          className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-xs font-medium text-[#5F5E5A] flex items-center gap-0.5">
                          <span>Street number</span>
                          <span className="text-[#E24B4A]">*</span>
                        </label>
                        <input
                          type="text"
                          value={clientStreetNumber}
                          onChange={(e) => setClientStreetNumber(e.target.value)}
                          placeholder="e.g. 14"
                          className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Floor /unit</label>
                        <input
                          type="text"
                          value={clientFloor}
                          onChange={(e) => setClientFloor(e.target.value)}
                          placeholder="e.g. 3rd floor"
                          className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Apt/room no.</label>
                        <input
                          type="text"
                          value={clientAptNo}
                          onChange={(e) => setClientAptNo(e.target.value)}
                          placeholder="e.g. 5"
                          className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg px-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Additional directions</label>
                      <textarea
                        value={clientDirections}
                        onChange={(e) => setClientDirections(e.target.value)}
                        placeholder="e.g. Blue gate on the left, ring twice. Hotel name if applicable. Parking availale in front."
                        className="w-full h-24 bg-white border border-[#E8E8E4] rounded-lg p-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800 resize-none"
                      />
                    </div>
                  </div>

                  {/* Notes Section */}
                  <div className="flex flex-col gap-2">
                    <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Notes</label>
                    <textarea
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      placeholder="e.g. Prefers ammonia-free colour. Sensitive scalp."
                      className="w-full h-24 bg-white border border-[#E8E8E4] rounded-lg p-3 text-xs placeholder-neutral-400 focus:outline-none focus:border-neutral-800 resize-none"
                    />
                    <span className="text-[11px] text-[#ABAAA6] font-poppins">Visible to staff only — allergy info, preferences,</span>
                  </div>

                  {/* Tags Section */}
                  <div className="flex flex-col gap-3">
                    <label className="font-poppins text-xs font-medium text-[#5F5E5A]">Client tags</label>
                    <div className="flex flex-wrap items-center gap-2 select-none">
                      {["VIP", "Regular", "New", "No-show"].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => setClientTagState(tag)}
                          className={`h-8 px-4 rounded-full text-xs font-medium border transition-all ${clientTag === tag
                              ? "bg-[#E8E8E4] border-white text-[#5F5E5A] font-semibold"
                              : "bg-white border-[#E8E8E4] text-[#5F5E5A]"
                            }`}
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                    <span className="text-[11px] text-[#ABAAA6] font-poppins">Tags help you filter and identify clients quickly</span>
                  </div>
                </fieldset>
              </div>

              {/* Right Column: Preview (280px width) */}
              <div className="w-full lg:w-[280px] bg-white border border-[#EEECEA] rounded-xl p-5 flex flex-col gap-6 shrink-0 shadow-sm relative lg:sticky lg:top-6">
                <span className="font-poppins font-medium text-[13px] text-[#1C1C1A]">Client preview</span>

                {/* Avatar & Name */}
                <div className="flex flex-col items-center gap-3">
                  <div className="w-16 h-16 bg-[#E1F5EE] rounded-full flex items-center justify-center overflow-hidden">
                    {clientAvatar ? (
                      <img src={clientAvatar} className="w-full h-full object-cover" alt="client avatar preview" />
                    ) : (
                      <HugeiconsIcon icon={User02Icon} className="w-[26px] h-[26px] text-[#ABAAA6]" />
                    )}
                  </div>
                  <span className={`font-poppins font-semibold text-sm leading-[21px] text-center ${clientFirstName || clientLastName ? "text-[#1C1C1A]" : "text-[#D3D1C7]"}`}>
                    {clientFirstName || clientLastName ? `${clientFirstName} ${clientLastName}`.trim() : "Full name"}
                  </span>
                </div>

                <div className="border-t border-[#F0F0EE] w-full" />

                {/* Details List */}
                <div className="flex flex-col gap-4">
                  {/* Phone Row */}
                  <div className="flex items-start gap-3">
                    <div className="w-[15px] h-[15px] flex items-center justify-center shrink-0 mt-0.5">
                      <img src="/Icons/phone.svg" alt="Phone" className="w-[15px] h-[15px] object-contain opacity-60" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-poppins text-[10px] text-[#ABAAA6] leading-none">Phone</span>
                      <span className={`font-poppins text-xs mt-1 ${clientPhone ? "text-neutral-800" : "text-[#D3D1C7]"}`}>
                        {clientPhone || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Email Row */}
                  <div className="flex items-start gap-3">
                    <div className="w-[15px] h-[15px] flex items-center justify-center shrink-0 mt-0.5">
                      <HugeiconsIcon icon={Mail01Icon} className="w-[15px] h-[15px] text-[#888780]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-poppins text-[10px] text-[#ABAAA6] leading-none">Email</span>
                      <span className={`font-poppins text-xs mt-1 ${clientEmail ? "text-neutral-800" : "text-[#D3D1C7]"} break-all`}>
                        {clientEmail || "—"}
                      </span>
                    </div>
                  </div>

                  {/* Staff Row */}
                  <div className="flex items-start gap-3">
                    <div className="w-[15px] h-[15px] flex items-center justify-center shrink-0 mt-0.5">
                      <HugeiconsIcon icon={ScissorIcon} className="w-[15px] h-[15px] text-[#888780]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-poppins text-[10px] text-[#ABAAA6] leading-none">Staff</span>
                      <span className="font-poppins text-xs mt-1 text-[#D3D1C7]">—</span>
                    </div>
                  </div>

                  {/* Birthday Row */}
                  <div className="flex items-start gap-3">
                    <div className="w-[15px] h-[15px] flex items-center justify-center shrink-0 mt-0.5">
                      <HugeiconsIcon icon={Calendar02Icon} className="w-[15px] h-[15px] text-[#888780]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-poppins text-[10px] text-[#ABAAA6] leading-none">Birthday</span>
                      <span className={`font-poppins text-xs mt-1 ${clientDob ? "text-neutral-800" : "text-[#D3D1C7]"}`}>
                        {clientDob || "—"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-[#F0F0EE] w-full" />

                {/* Validation Warnings */}
                {(!clientFirstName || !clientPhone) && (
                  <div className="bg-[#FAFAF8] border border-[#E8E8E4] rounded-lg p-3 flex gap-2 items-start text-[11px] text-[#ABAAA6] leading-[16px]">
                    <svg className="w-4 h-4 text-[#ABAAA6] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <span>First name and phone number are required to continue.</span>
                  </div>
                )}

                {/* Form Action buttons block */}
                <div className="flex flex-col gap-2 mt-4">
                  <button
                    onClick={editingClientIndex !== null ? handleSaveClient : handleAddClient}
                    disabled={!clientFirstName || !clientPhone}
                    className={`w-full h-10 rounded-lg text-xs font-semibold text-white font-poppins transition-all select-none ${clientFirstName && clientPhone
                        ? "bg-[#0F1E35] hover:bg-[#1C3252] cursor-pointer"
                        : "bg-[#D3D1C7] cursor-not-allowed"
                      }`}
                  >
                    {editingClientIndex !== null ? "Save changes" : "Add client"}
                  </button>
                  <button
                    onClick={() => {
                      setIsAddingClient(false);
                      setEditingClientIndex(null);
                      setIsViewingClient(false);
                    }}
                    className="w-full h-[38px] bg-white border border-[#E8E8E4] rounded-lg text-xs font-semibold text-[#5F5E5A] font-poppins hover:bg-neutral-50 transition-all select-none"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </main>
        );
      }

      return (
        <DashboardClientsList
          clientsData={clientsData}
          setClientsData={setClientsData}
          setIsAddingClient={setIsAddingClient}
          setIsViewingClient={setIsViewingClient}
          setEditingClientIndex={setEditingClientIndex}
          openActionIdx={openActionIdx}
          setOpenActionIdx={setOpenActionIdx}
          setClientFirstName={setClientFirstName}
          setClientLastName={setClientLastName}
          setClientPhone={setClientPhone}
          setClientTagState={setClientTagState}
          setClientPhoneCode={setClientPhoneCode}
          setClientPhoneFlag={setClientPhoneFlag}
          setClientAvatar={setClientAvatar}
        />
      );
    }

    if (["All Bookings", "Upcoming", "Canceled"].includes(activeTab)) {
      if (isCreatingBooking) {
        return (
          <DashboardBookingForm
            isEditingBooking={isEditingBooking}
            editingBookingIndex={editingBookingIndex}
            bookingsData={bookingsData}
            setBookingsData={setBookingsData}
            setIsCreatingBooking={setIsCreatingBooking}
            setIsEditingBooking={setIsEditingBooking}
            setEditingBookingIndex={setEditingBookingIndex}
            newBookingName={newBookingName}
            setNewBookingName={setNewBookingName}
            newBookingDob={newBookingDob}
            setNewBookingDob={setNewBookingDob}
            newBookingGender={newBookingGender}
            setNewBookingGender={setNewBookingGender}
            newBookingEmail={newBookingEmail}
            setNewBookingEmail={setNewBookingEmail}
            newBookingPhoneCode={newBookingPhoneCode}
            setNewBookingPhoneCode={setNewBookingPhoneCode}
            newBookingPhone={newBookingPhone}
            setNewBookingPhone={setNewBookingPhone}
            newBookingCity={newBookingCity}
            setNewBookingCity={setNewBookingCity}
            newBookingPropertyType={newBookingPropertyType}
            setNewBookingPropertyType={setNewBookingPropertyType}
            newBookingArea={newBookingArea}
            setNewBookingArea={setNewBookingArea}
            newBookingStreetName={newBookingStreetName}
            setNewBookingStreetName={setNewBookingStreetName}
            newBookingStreetNumber={newBookingStreetNumber}
            setNewBookingStreetNumber={setNewBookingStreetNumber}
            newBookingFloor={newBookingFloor}
            setNewBookingFloor={setNewBookingFloor}
            newBookingApt={newBookingApt}
            setNewBookingApt={setNewBookingApt}
            newBookingDirections={newBookingDirections}
            setNewBookingDirections={setNewBookingDirections}
            newBookingServices={newBookingServices}
            setNewBookingServices={setNewBookingServices}
            newBookingAddons={newBookingAddons}
            setNewBookingAddons={setNewBookingAddons}
            newBookingStaff={newBookingStaff}
            setNewBookingStaff={setNewBookingStaff}
            newBookingDate={newBookingDate}
            setNewBookingDate={setNewBookingDate}
            newBookingTime={newBookingTime}
            setNewBookingTime={setNewBookingTime}
            newBookingServiceCity={newBookingServiceCity}
            setNewBookingServiceCity={setNewBookingServiceCity}
            newBookingTags={newBookingTags}
            setNewBookingTags={setNewBookingTags}
            newBookingNotes={newBookingNotes}
            setNewBookingNotes={setNewBookingNotes}
          />
        );
      }

      if (isViewingBookingDetails && viewingBookingIndex !== null) {
        const b = bookingsData[viewingBookingIndex];

        let statusType: "upcoming" | "noshow" | "completed" | "cancelled" | "late" | "pending" = "upcoming";
        if (b.status === "Pending") {
          statusType = "pending";
        } else if (b.status === "No-show · Charged" || b.status.toLowerCase().includes("no-show") || b.status.toLowerCase().includes("noshow")) {
          statusType = "noshow";
        } else if (b.status === "Completed") {
          statusType = "completed";
        } else if (b.status === "Canceled" || b.status === "Cancelled") {
          statusType = "cancelled";
        } else if (b.status.toLowerCase().includes("late cancellation")) {
          statusType = "late";
        }

        return (
          <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] p-6 md:p-8 select-none">
            {/* Breadcrumbs */}
            <div
              onClick={() => {
                setIsViewingBookingDetails(false);
                setViewingBookingIndex(null);
              }}
              className="flex items-center gap-2 text-xs font-medium text-neutral-500 uppercase tracking-wider mb-6 cursor-pointer hover:text-neutral-900 font-poppins select-none"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} className="w-4 h-4 text-neutral-600" />
              <span>All Bookings</span>
              <span className="text-neutral-300 font-normal">&gt;</span>
              <span className="text-[#0F1E35] font-semibold">View Booking</span>
            </div>

            {/* Title section */}
            <div className="mb-6 select-none">
              <h1 className="text-2xl font-semibold text-[#0F1E35] font-poppins">View booking</h1>
              <p className="text-xs text-neutral-500 font-poppins mt-0.5">See full details of the booking</p>
            </div>

            {/* Details Card */}
            <div className="w-full flex justify-start">
              <ClientBookingHistoryCard
                bookingId={b.bookingId}
                status={b.status}
                statusType={statusType}
                clientName={b.clientName}
                clientPhone={b.clientPhone}
                isNewClient={b.isNew}
                dateText={b.date}
                timeText={b.time}
                staffName={b.staff}
                servicePrice={(b.bookingId === "#BK-0036" || b.bookingId === "#BK-0035" || b.bookingId === "#BK-0034" || b.bookingId === "#BK-0033" || b.bookingId === "#BK-0032" || b.bookingId === "#BK-0031") ? "€20" : b.amount}
                depositedAmount={(b.bookingId === "#BK-0036" || b.bookingId === "#BK-0035" || b.bookingId === "#BK-0034") ? "€8" : "-"}
                remainingBalance={(b.bookingId === "#BK-0036" || b.bookingId === "#BK-0035" || b.bookingId === "#BK-0034" || b.bookingId === "#BK-0033" || b.bookingId === "#BK-0032" || b.bookingId === "#BK-0031") ? "€32" : (b.paymentType === "Pay at venue" ? b.amount : "€32")}
                showFooterActions={true}
                addressText={(b.bookingId === "#BK-0023") ? "Please use organic products only, allergic to strong fragrances" : undefined}
                clientNotesText={(b.bookingId === "#BK-0036" || b.bookingId === "#BK-0035" || b.bookingId === "#BK-0034" || b.bookingId === "#BK-0033" || b.bookingId === "#BK-0032" || b.bookingId === "#BK-0031") ? "Please use organic products only, allergic to strong fragrances" : undefined}
                isManual={b.bookingId === "#BK-0031"}
                businessNotesText={
                  b.status === "Completed"
                    ? `Yes - customer paid ${b.paymentType === "Pay at venue" ? b.amount.replace("€", "") : "32"}.00 at venue`
                    : b.status.toLowerCase().includes("by business")
                      ? "Service is not available"
                      : undefined
                }
                onCompleteBooking={() => {
                  const updated = [...bookingsData];
                  updated[viewingBookingIndex] = {
                    ...updated[viewingBookingIndex],
                    status: "Completed"
                  };
                  setBookingsData(updated);
                }}
                onReschedule={(newDate, newTime) => {
                  const updated = [...bookingsData];
                  updated[viewingBookingIndex] = {
                    ...updated[viewingBookingIndex],
                    date: newDate,
                    time: newTime
                  };
                  setBookingsData(updated);
                }}
              />
            </div>
          </main>
        );
      }

      return (
        <DashboardBookingsList
          activeTab={activeTab}
          bookingsData={bookingsData}
          setBookingsData={setBookingsData}
          bookingSearch={bookingSearch}
          setBookingSearch={setBookingSearch}
          bookingStatusFilter={bookingStatusFilter}
          setBookingStatusFilter={setBookingStatusFilter}
          bookingStaffFilter={bookingStaffFilter}
          setBookingStaffFilter={setBookingStaffFilter}
          openBookingActionIdx={openBookingActionIdx}
          setOpenBookingActionIdx={setOpenBookingActionIdx}
          setIsCreatingBooking={setIsCreatingBooking}
          setIsEditingBooking={setIsEditingBooking}
          setEditingBookingIndex={setEditingBookingIndex}
          setNewBookingName={setNewBookingName}
          setNewBookingPhone={setNewBookingPhone}
          setNewBookingPhoneCode={setNewBookingPhoneCode}
          setNewBookingDate={setNewBookingDate}
          setNewBookingTime={setNewBookingTime}
          setNewBookingStaff={setNewBookingStaff}
          onViewBookingDetails={(idx) => {
            setViewingBookingIndex(idx);
            setIsViewingBookingDetails(true);
          }}
        />
      );
    }

    if (activeTab === "Business Profile") {
      if (isCreatingBusiness) {
        return <DashboardCreateBusiness onBack={() => setIsCreatingBusiness(false)} />;
      }
      return <DashboardBusinessProfile onAddBusiness={() => setIsCreatingBusiness(true)} />;
    }

    if (activeTab === "Services") {
      return <DashboardServicesList />;
    }

    if (activeTab === "Add-ons") {
      return <DashboardAddonsList />;
    }

    if (activeTab === "Staff") {
      return <DashboardStaffList />;
    }

    if (activeTab === "Reviews") {
      return <DashboardReviewsList />;
    }

    if (activeTab === "Payouts & Finance") {
      return <DashboardPayoutsList />;
    }

    if (activeTab === "Analytics") {
      return <DashboardAnalytics />;
    }

    if (activeTab === "Settings") {
      return <DashboardSettings />;
    }

    // Default mock fallback container for other business profile tabs
    return (
      <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] p-8 items-center justify-center font-poppins select-none text-neutral-400">
        <span className="text-lg font-semibold">{activeTab} tab content coming soon</span>
      </main>
    );
  };

  return (
    <div className="flex bg-[#FCFAF9] h-screen overflow-hidden font-poppins text-[#111111]">
      <DashboardSidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        showFooterMenu={showFooterMenu}
        setShowFooterMenu={setShowFooterMenu}
        footerMenuRef={footerMenuRef}
      />
      {renderMainContent()}
    </div>
  );
}
