"use client";
import DashboardHeader from "@/components/dashboard/DashboardHeader";


import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  Plus as PlusIcon,
  ArrowLeft02Icon
} from "@hugeicons/core-free-icons";
import { Addon, initialAddons } from "@/data/addonsMockData";
import AddonCard from "../addons/AddonCard";

export default function DashboardAddonsList() {
  const [isCreating, setIsCreating] = useState(false);
  const [activeMenuIdx, setActiveMenuIdx] = useState<number | null>(null);

  // Form states for creating new add-on
  const [addonName, setAddonName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("0.00");
  const [category, setCategory] = useState("Lashes");
  const [addonActive, setAddonActive] = useState(true);
  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Bridal Make-up-1", "Bridal Make-up-2"
  ]);

  // Initial mock add-ons
  const [addons, setAddons] = useState<Addon[]>(initialAddons);

  const toggleAddonActive = (id: number) => {
    setAddons(addons.map(a => a.id === id ? { ...a, isActive: !a.isActive } : a));
  };

  const handleCreateAddon = () => {
    if (!addonName) return;
    const newAddon: Addon = {
      id: Date.now(),
      title: addonName,
      price: `€${price}`,
      attachedTo: "Bridal make-up",
      category: category || "Lashes",
      isActive: addonActive,
      isDraft: false
    };
    setAddons([...addons, newAddon]);
    // Reset form
    setAddonName("");
    setDescription("");
    setPrice("0.00");
    setAddonActive(true);
    setIsCreating(false);
  };

  const activeCount = addons.filter(a => !a.isDraft).length;
  const draftCount = addons.filter(a => a.isDraft).length;

  if (isCreating) {
    return (
      <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] md: select-none font-poppins relative">
        {/* Header Row */}
        <DashboardHeader title="Add-ons" subtitle="Create add-ons" />
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
              <span>Add-ons</span>
            </button>
            <span>&gt;</span>
            <span className="text-[#1C1C1A] font-semibold">Create Add-ons</span>
          </div>
        </div>

        {/* Active Status Card */}
        <div className="pl-0 md:pl-[110px] flex justify-between items-center bg-[#F5F4EE] border border-[#C6C19F] rounded-[12px] p-5 w-full max-w-full gap-6 mb-8">
          <div className="flex flex-col gap-0.5">
            <span className="font-medium text-sm text-[#111111] font-poppins leading-[21px]">Add-on active</span>
            <span className="text-xs text-[#111111]/60 font-poppins leading-[18px]">Show on your public profile. Turn off to hide without deleting.</span>
          </div>
          <button
            onClick={() => setAddonActive(!addonActive)}
            className={`w-[38px] h-[21px] rounded-[11px] p-0.5 transition-colors duration-200 focus:outline-none flex items-center ${addonActive ? "bg-[#0F6E56]" : "bg-neutral-300"} cursor-pointer`}
          >
            <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm ${addonActive ? "translate-x-[15px]" : "translate-x-0"}`} />
          </button>
        </div>

        {/* Form Fields container (no wrapper box) */}
        <div className="pl-0 md:pl-[110px] flex flex-col gap-[32px] w-full max-w-full">
          {/* Add-on Name */}
          <div className="flex flex-col gap-2 w-full">
            <div className="flex items-center gap-0.5">
              <span className="text-xs font-normal text-[#111111] font-poppins leading-[18px]">Add-on name</span>
              <span className="text-xs font-normal text-[#D85A30] font-poppins leading-[18px]">*</span>
            </div>
            <input
              type="text"
              value={addonName}
              onChange={(e) => setAddonName(e.target.value)}
              placeholder="e.g. False lashes, Extra Bridesmaid, Nail art design"
              className="h-[41px] bg-white border border-[#111111]/20 rounded-[12px] px-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2 w-full">
            <span className="text-xs font-normal text-[#111111] font-poppins leading-[18px]">Description (optional)</span>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. Includes travel-size product, adds 15 minutes to your session"
              className="h-[41px] bg-white border border-[#111111]/20 rounded-[12px] px-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
            />
          </div>

          {/* Price and Category Row */}
          <div className="flex flex-col md:flex-row gap-5 w-full">
            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-[#111111] font-poppins leading-[18px]">Price (€)</span>
                <span className="text-xs font-normal text-[#D85A30] font-poppins leading-[18px]">*</span>
              </div>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="h-[41px] bg-white border border-[#111111]/20 rounded-[12px] px-3 font-poppins text-sm text-[#111111] placeholder:text-[#757575] focus:outline-none w-full"
              />
              <span className="text-[11px] text-[#111111] font-poppins leading-[15px]">
                Flat fee only. Added to the service total at checkout
              </span>
            </div>

            <div className="flex-1 flex flex-col gap-2">
              <div className="flex items-center gap-0.5">
                <span className="text-xs font-normal text-[#111111] font-poppins leading-[18px]">Service category (you created)</span>
                <span className="text-xs font-normal text-[#D85A30] font-poppins leading-[18px]">*</span>
              </div>
              <div className="relative w-full">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="appearance-none h-[41px] bg-white border border-[#111111]/20 rounded-[12px] px-3 font-poppins text-sm text-[#111111] focus:outline-none w-full pr-[40px] cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='19' height='19' viewBox='0 0 24 24' fill='none' stroke='%23111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 12px center',
                    backgroundSize: '14px'
                  }}
                >
                  <option value="" disabled>Choose service category</option>
                  <option value="Lashes">Lashes</option>
                  <option value="Hair">Hair</option>
                  <option value="Nails">Nails</option>
                </select>
              </div>
            </div>
          </div>

          {/* Checkboxes List */}
          <div className="flex flex-col gap-4 w-full">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-0.5">
                <span className="text-sm font-semibold text-[#111111] font-poppins leading-[18px]">Assign to services</span>
                <span className="text-sm font-semibold text-[#D85A30] font-poppins leading-[18px]">*</span>
              </div>
              <span className="text-[11px] text-[#111111] font-poppins leading-[15px]">
                Select which services this add-on will be available for
              </span>
            </div>

            <div className="flex flex-col gap-3">
              {[
                { id: "Bridal Make-up-1", label: "Bridal Make-up", price: "€120" },
                { id: "Bridal Make-up-2", label: "Bridal Make-up", price: "€120" },
                { id: "Bridal Make-up-3", label: "Bridal Make-up", price: "€120" }
              ].map((serv) => {
                const isSelected = selectedServices.includes(serv.id);
                return (
                  <div
                    key={serv.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedServices(selectedServices.filter(s => s !== serv.id));
                      } else {
                        setSelectedServices([...selectedServices, serv.id]);
                      }
                    }}
                    className={`box-sizing-border-box flex items-center justify-between p-3 h-[45px] cursor-pointer transition-all rounded-[12px] ${
                      isSelected
                        ? "bg-[#E5F5EF] border border-[#91D5BB]"
                        : "bg-white border border-[#111111]/20"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {isSelected ? (
                        <div className="w-5 h-5 bg-gradient-to-b from-[rgba(12,192,223,0.2)] to-[rgba(12,192,223,0.2)] bg-[#8EBAC5] rounded flex items-center justify-center shrink-0">
                          <svg className="w-3.5 h-3.5 text-[#141B34]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      ) : (
                        <div className="w-5 h-5 border border-[#757575] rounded shrink-0" />
                      )}
                      <span className="text-sm font-normal text-[#111111] font-poppins leading-[21px]">{serv.label}</span>
                    </div>
                    <span className="text-sm font-normal text-[#111111] font-poppins leading-[21px]">{serv.price}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex flex-row justify-end items-center gap-5 w-full h-[36px] pt-6 mt-4">
            <button
              type="button"
              onClick={() => setIsCreating(false)}
              className="h-[36px] px-4 bg-[#EBEBEB] text-[#757575] font-manrope font-semibold text-sm rounded-[8px] hover:bg-[#E2E2E2] transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer flex items-center justify-center"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateAddon}
              className="h-[36px] px-[16px] bg-[#111111] hover:bg-black text-white font-manrope font-semibold text-sm rounded-[8px] hover:bg-black transition-colors shadow-[0px_1px_2px_rgba(0,0,0,0.05)] cursor-pointer flex items-center justify-center"
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
      <DashboardHeader 
        title="Add-ons" 
        subtitle="Manage extra services clients can add to bookings" 
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

        {/* Create Add-on button */}
        <button 
          onClick={() => setIsCreating(true)}
          className="bg-[#111111] hover:bg-black text-white text-[13px] font-medium px-3.5 py-2 rounded-lg flex items-center gap-1.5 shadow transition-all cursor-pointer"
        >
          <HugeiconsIcon icon={PlusIcon} className="w-3.5 h-3.5" />
          <span>Create Add-on</span>
        </button>
      </div>

      {/* Grid of Add-on Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
        {addons.map((addon) => (
          <AddonCard
            key={addon.id}
            addon={addon}
            onToggleActive={toggleAddonActive}
            isMenuOpen={activeMenuIdx === addon.id}
            onMenuClick={(id) => setActiveMenuIdx(id)}
            onViewClick={(a) => {
              setAddonName(a.title);
              setPrice(a.price.replace("€", ""));
              setCategory(a.category);
              setAddonActive(a.isActive);
              setIsCreating(true);
            }}
            onEditClick={(a) => {
              setAddonName(a.title);
              setPrice(a.price.replace("€", ""));
              setCategory(a.category);
              setAddonActive(a.isActive);
              setIsCreating(true);
            }}
          />
        ))}
      </div>
    
      </div></main>
  );
}
