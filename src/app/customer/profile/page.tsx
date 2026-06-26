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
  
  // Comprehensive country info list (ISO-2 code, Name, Dial Code)
  const countries = [
    { name: "Andorra", code: "+376", iso: "ad" },
    { name: "United Arab Emirates", code: "+971", iso: "ae" },
    { name: "Afghanistan", code: "+93", iso: "af" },
    { name: "Antigua and Barbuda", code: "+1-268", iso: "ag" },
    { name: "Anguilla", code: "+1-264", iso: "ai" },
    { name: "Albania", code: "+355", iso: "al" },
    { name: "Armenia", code: "+374", iso: "am" },
    { name: "Angola", code: "+244", iso: "ao" },
    { name: "Argentina", code: "+54", iso: "ar" },
    { name: "American Samoa", code: "+1-684", iso: "as" },
    { name: "Austria", code: "+43", iso: "at" },
    { name: "Australia", code: "+61", iso: "au" },
    { name: "Aruba", code: "+297", iso: "aw" },
    { name: "Åland Islands", code: "+358", iso: "ax" },
    { name: "Azerbaijan", code: "+994", iso: "az" },
    { name: "Bosnia and Herzegovina", code: "+387", iso: "ba" },
    { name: "Barbados", code: "+1-246", iso: "bb" },
    { name: "Bangladesh", code: "+880", iso: "bd" },
    { name: "Belgium", code: "+32", iso: "be" },
    { name: "Burkina Faso", code: "+226", iso: "bf" },
    { name: "Bulgaria", code: "+359", iso: "bg" },
    { name: "Bahrain", code: "+973", iso: "bh" },
    { name: "Burundi", code: "+257", iso: "bi" },
    { name: "Benin", code: "+229", iso: "bj" },
    { name: "Saint Barthélemy", code: "+590", iso: "bl" },
    { name: "Bermuda", code: "+1-441", iso: "bm" },
    { name: "Brunei", code: "+673", iso: "bn" },
    { name: "Bolivia", code: "+591", iso: "bo" },
    { name: "Bonaire, Sint Eustatius and Saba", code: "+599", iso: "bq" },
    { name: "Brazil", code: "+55", iso: "br" },
    { name: "Bahamas", code: "+1-242", iso: "bs" },
    { name: "Bhutan", code: "+975", iso: "bt" },
    { name: "Botswana", code: "+267", iso: "bw" },
    { name: "Belarus", code: "+375", iso: "by" },
    { name: "Belize", code: "+501", iso: "bz" },
    { name: "Canada", code: "+1", iso: "ca" },
    { name: "Cocos (Keeling) Islands", code: "+61", iso: "cc" },
    { name: "Democratic Republic of the Congo", code: "+243", iso: "cd" },
    { name: "Central African Republic", code: "+236", iso: "cf" },
    { name: "Republic of the Congo", code: "+242", iso: "cg" },
    { name: "Switzerland", code: "+41", iso: "ch" },
    { name: "Côte d'Ivoire", code: "+225", iso: "ci" },
    { name: "Cook Islands", code: "+682", iso: "ck" },
    { name: "Chile", code: "+56", iso: "cl" },
    { name: "Cameroon", code: "+237", iso: "cm" },
    { name: "China", code: "+86", iso: "cn" },
    { name: "Colombia", code: "+57", iso: "co" },
    { name: "Costa Rica", code: "+506", iso: "cr" },
    { name: "Cuba", code: "+53", iso: "cu" },
    { name: "Cape Verde", code: "+238", iso: "cv" },
    { name: "Curaçao", code: "+599", iso: "cw" },
    { name: "Christmas Island", code: "+61", iso: "cx" },
    { name: "Cyprus", code: "+357", iso: "cy" },
    { name: "Czech Republic", code: "+420", iso: "cz" },
    { name: "Germany", code: "+49", iso: "de" },
    { name: "Djibouti", code: "+253", iso: "dj" },
    { name: "Denmark", code: "+45", iso: "dk" },
    { name: "Dominica", code: "+1-767", iso: "dm" },
    { name: "Dominican Republic", code: "+1-809", iso: "do" },
    { name: "Algeria", code: "+213", iso: "dz" },
    { name: "Ecuador", code: "+593", iso: "ec" },
    { name: "Estonia", code: "+372", iso: "ee" },
    { name: "Egypt", code: "+20", iso: "eg" },
    { name: "Eritrea", code: "+291", iso: "er" },
    { name: "Spain", code: "+34", iso: "es" },
    { name: "Ethiopia", code: "+251", iso: "et" },
    { name: "Finland", code: "+358", iso: "fi" },
    { name: "Fiji", code: "+679", iso: "fj" },
    { name: "Falkland Islands", code: "+500", iso: "fk" },
    { name: "Micronesia", code: "+691", iso: "fm" },
    { name: "Faroe Islands", code: "+298", iso: "fo" },
    { name: "France", code: "+33", iso: "fr" },
    { name: "Gabon", code: "+241", iso: "ga" },
    { name: "United Kingdom", code: "+44", iso: "gb" },
    { name: "Grenada", code: "+1-473", iso: "gd" },
    { name: "Georgia", code: "+995", iso: "ge" },
    { name: "French Guiana", code: "+594", iso: "gf" },
    { name: "Guernsey", code: "+44-1481", iso: "gg" },
    { name: "Ghana", code: "+233", iso: "gh" },
    { name: "Gibraltar", code: "+350", iso: "gi" },
    { name: "Greenland", code: "+299", iso: "gl" },
    { name: "Gambia", code: "+220", iso: "gm" },
    { name: "Guinea", code: "+224", iso: "gn" },
    { name: "Guadeloupe", code: "+590", iso: "gp" },
    { name: "Equatorial Guinea", code: "+240", iso: "gq" },
    { name: "Greece", code: "+30", iso: "gr" },
    { name: "Guatemala", code: "+502", iso: "gt" },
    { name: "Guam", code: "+1-671", iso: "gu" },
    { name: "Guinea-Bissau", code: "+245", iso: "gw" },
    { name: "Guyana", code: "+592", iso: "gy" },
    { name: "Hong Kong", code: "+852", iso: "hk" },
    { name: "Honduras", code: "+504", iso: "hn" },
    { name: "Croatia", code: "+385", iso: "hr" },
    { name: "Haiti", code: "+509", iso: "ht" },
    { name: "Hungary", code: "+36", iso: "hu" },
    { name: "Indonesia", code: "+62", iso: "id" },
    { name: "Ireland", code: "+353", iso: "ie" },
    { name: "Israel", code: "+972", iso: "il" },
    { name: "Isle of Man", code: "+44-1624", iso: "im" },
    { name: "India", code: "+91", iso: "in" },
    { name: "Iraq", code: "+964", iso: "iq" },
    { name: "Iran", code: "+98", iso: "ir" },
    { name: "Iceland", code: "+354", iso: "is" },
    { name: "Italy", code: "+39", iso: "it" },
    { name: "Jersey", code: "+44-1534", iso: "je" },
    { name: "Jamaica", code: "+1-876", iso: "jm" },
    { name: "Jordan", code: "+962", iso: "jo" },
    { name: "Japan", code: "+81", iso: "jp" },
    { name: "Kenya", code: "+254", iso: "ke" },
    { name: "Kyrgyzstan", code: "+996", iso: "kg" },
    { name: "Cambodia", code: "+855", iso: "kh" },
    { name: "Kiribati", code: "+686", iso: "ki" },
    { name: "Comoros", code: "+269", iso: "km" },
    { name: "Saint Kitts and Nevis", code: "+1-869", iso: "kn" },
    { name: "North Korea", code: "+850", iso: "kp" },
    { name: "South Korea", code: "+82", iso: "kr" },
    { name: "Kuwait", code: "+965", iso: "kw" },
    { name: "Cayman Islands", code: "+1-345", iso: "ky" },
    { name: "Kazakhstan", code: "+7", iso: "kz" },
    { name: "Laos", code: "+856", iso: "la" },
    { name: "Lebanon", code: "+961", iso: "lb" },
    { name: "Saint Lucia", code: "+1-758", iso: "lc" },
    { name: "Liechtenstein", code: "+423", iso: "li" },
    { name: "Sri Lanka", code: "+94", iso: "lk" },
    { name: "Liberia", code: "+231", iso: "lr" },
    { name: "Lesotho", code: "+266", iso: "ls" },
    { name: "Lithuania", code: "+370", iso: "lt" },
    { name: "Luxembourg", code: "+352", iso: "lu" },
    { name: "Latvia", code: "+371", iso: "lv" },
    { name: "Libya", code: "+218", iso: "ly" },
    { name: "Morocco", code: "+212", iso: "ma" },
    { name: "Monaco", code: "+377", iso: "mc" },
    { name: "Moldova", code: "+373", iso: "md" },
    { name: "Montenegro", code: "+382", iso: "me" },
    { name: "Saint Martin", code: "+590", iso: "mf" },
    { name: "Madagascar", code: "+261", iso: "mg" },
    { name: "Marshall Islands", code: "+692", iso: "mh" },
    { name: "Macedonia", code: "+389", iso: "mk" },
    { name: "Mali", code: "+223", iso: "ml" },
    { name: "Myanmar", code: "+95", iso: "mm" },
    { name: "Mongolia", code: "+976", iso: "mn" },
    { name: "Macao", code: "+853", iso: "mo" },
    { name: "Martinique", code: "+596", iso: "mq" },
    { name: "Mauritania", code: "+222", iso: "mr" },
    { name: "Montserrat", code: "+1-664", iso: "ms" },
    { name: "Malta", code: "+356", iso: "mt" },
    { name: "Mauritius", code: "+230", iso: "mu" },
    { name: "Maldives", code: "+960", iso: "mv" },
    { name: "Malawi", code: "+265", iso: "mw" },
    { name: "Mexico", code: "+52", iso: "mx" },
    { name: "Malaysia", code: "+60", iso: "my" },
    { name: "Mozambique", code: "+258", iso: "mz" },
    { name: "Namibia", code: "+264", iso: "na" },
    { name: "New Caledonia", code: "+687", iso: "nc" },
    { name: "Niger", code: "+227", iso: "ne" },
    { name: "Nigeria", code: "+234", iso: "ng" },
    { name: "Nicaragua", code: "+505", iso: "ni" },
    { name: "Netherlands", code: "+31", iso: "nl" },
    { name: "Norway", code: "+47", iso: "no" },
    { name: "Nepal", code: "+977", iso: "np" },
    { name: "Nauru", code: "+674", iso: "nr" },
    { name: "Niue", code: "+683", iso: "nu" },
    { name: "New Zealand", code: "+64", iso: "nz" },
    { name: "Oman", code: "+968", iso: "om" },
    { name: "Panama", code: "+507", iso: "pa" },
    { name: "Peru", code: "+51", iso: "pe" },
    { name: "French Polynesia", code: "+689", iso: "pf" },
    { name: "Papua New Guinea", code: "+675", iso: "pg" },
    { name: "Philippines", code: "+63", iso: "ph" },
    { name: "Pakistan", code: "+92", iso: "pk" },
    { name: "Poland", code: "+48", iso: "pl" },
    { name: "Saint Pierre and Miquelon", code: "+508", iso: "pm" },
    { name: "Puerto Rico", code: "+1-787", iso: "pr" },
    { name: "Palestine", code: "+970", iso: "ps" },
    { name: "Portugal", code: "+351", iso: "pt" },
    { name: "Palau", code: "+680", iso: "pw" },
    { name: "Paraguay", code: "+595", iso: "py" },
    { name: "Qatar", code: "+974", iso: "qa" },
    { name: "Réunion", code: "+262", iso: "re" },
    { name: "Romania", code: "+40", iso: "ro" },
    { name: "Serbia", code: "+381", iso: "rs" },
    { name: "Russia", code: "+7", iso: "ru" },
    { name: "Rwanda", code: "+250", iso: "rw" },
    { name: "Saudi Arabia", code: "+966", iso: "sa" },
    { name: "Solomon Islands", code: "+677", iso: "sb" },
    { name: "Seychelles", code: "+248", iso: "sc" },
    { name: "Sudan", code: "+249", iso: "sd" },
    { name: "Sweden", code: "+46", iso: "se" },
    { name: "Singapore", code: "+65", iso: "sg" },
    { name: "Saint Helena", code: "+290", iso: "sh" },
    { name: "Slovenia", code: "+386", iso: "si" },
    { name: "Slovakia", code: "+421", iso: "sk" },
    { name: "Sierra Leone", code: "+232", iso: "sl" },
    { name: "San Marino", code: "+378", iso: "sm" },
    { name: "Senegal", code: "+221", iso: "sn" },
    { name: "Somalia", code: "+252", iso: "so" },
    { name: "Suriname", code: "+597", iso: "sr" },
    { name: "South Sudan", code: "+211", iso: "ss" },
    { name: "São Tomé and Príncipe", code: "+239", iso: "st" },
    { name: "El Salvador", code: "+503", iso: "sv" },
    { name: "Sint Maarten", code: "+1-721", iso: "sx" },
    { name: "Syria", code: "+963", iso: "sy" },
    { name: "Swaziland", code: "+268", iso: "sz" },
    { name: "Turks and Caicos Islands", code: "+1-649", iso: "tc" },
    { name: "Chad", code: "+235", iso: "td" },
    { name: "Togo", code: "+228", iso: "tg" },
    { name: "Thailand", code: "+66", iso: "th" },
    { name: "Tajikistan", code: "+992", iso: "tj" },
    { name: "Tokelau", code: "+690", iso: "tk" },
    { name: "Timor-Leste", code: "+670", iso: "tl" },
    { name: "Turkmenistan", code: "+993", iso: "tm" },
    { name: "Tunisia", code: "+216", iso: "tn" },
    { name: "Tonga", code: "+676", iso: "to" },
    { name: "Turkey", code: "+90", iso: "tr" },
    { name: "Trinidad and Tobago", code: "+1-868", iso: "tt" },
    { name: "Tuvalu", code: "+688", iso: "tv" },
    { name: "Taiwan", code: "+886", iso: "tw" },
    { name: "Tanzania", code: "+255", iso: "tz" },
    { name: "Ukraine", code: "+380", iso: "ua" },
    { name: "Uganda", code: "+256", iso: "ug" },
    { name: "United States", code: "+1", iso: "us" },
    { name: "Uruguay", code: "+598", iso: "uy" },
    { name: "Uzbekistan", code: "+998", iso: "uz" },
    { name: "Vatican City", code: "+39-06", iso: "va" },
    { name: "Saint Vincent and the Grenadines", code: "+1-784", iso: "vc" },
    { name: "Venezuela", code: "+58", iso: "ve" },
    { name: "British Virgin Islands", code: "+1-284", iso: "vg" },
    { name: "U.S. Virgin Islands", code: "+1-340", iso: "vi" },
    { name: "Vietnam", code: "+84", iso: "vn" },
    { name: "Vanuatu", code: "+678", iso: "vu" },
    { name: "Wallis and Futuna", code: "+681", iso: "wf" },
    { name: "Samoa", code: "+685", iso: "ws" },
    { name: "Yemen", code: "+967", iso: "ye" },
    { name: "Mayotte", code: "+262", iso: "yt" },
    { name: "South Africa", code: "+27", iso: "za" },
    { name: "Zambia", code: "+260", iso: "zm" },
    { name: "Zimbabwe", code: "+263", iso: "zw" }
  ];

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

          {/* Background+Border+Shadow Card */}
          <div className="w-full box-border flex flex-col md:flex-row items-start p-6 md:p-8 gap-8 bg-white border border-[#C6C6CB] rounded-xl shadow-[0px_2px_4px_rgba(0,0,0,0.05)]">
            
            {/* Left side: Avatar Container */}
            <div className="flex flex-col items-center p-0 gap-4 w-full md:w-[128px] shrink-0">
              
              {/* Overlay+Border+Shadow */}
              <div className="box-border flex flex-col justify-center items-center p-0 w-32 h-32 bg-[rgba(255,255,255,0.002)] border-4 border-[#EBE7E7] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] rounded-full overflow-hidden">
                <img 
                  src={isEditing ? formData.avatar : profileData.avatar} 
                  alt="Profile Avatar" 
                  className="w-[120px] h-[120px] rounded-full object-cover shrink-0" 
                />
              </div>

              {/* Hidden File Input */}
              <input 
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                accept="image/*"
                className="hidden"
              />

              {/* Change Photo Button */}
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex flex-row items-center justify-center p-0 gap-1 w-full hover:opacity-80 active:scale-95 transition-all cursor-pointer"
              >
                <HugeiconsIcon icon={Camera01Icon} size={14} className="text-[#111111]" />
                <span className="font-manrope font-medium text-sm leading-5 text-[#111111] whitespace-nowrap">
                  Change Photo
                </span>
              </button>

            </div>

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
