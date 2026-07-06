"use client";

import React from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowDown01Icon, BellIcon } from "@hugeicons/core-free-icons";

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
}

interface DashboardClientsListProps {
  clientsData: Client[];
  setClientsData: React.Dispatch<React.SetStateAction<Client[]>>;
  setIsAddingClient: (val: boolean) => void;
  setIsViewingClient: (val: boolean) => void;
  setEditingClientIndex: (idx: number | null) => void;
  openActionIdx: number | null;
  setOpenActionIdx: (idx: number | null) => void;
  
  setClientFirstName: (val: string) => void;
  setClientLastName: (val: string) => void;
  setClientPhone: (val: string) => void;
  setClientTagState: (val: string) => void;
}

export default function DashboardClientsList({
  clientsData,
  setClientsData,
  setIsAddingClient,
  setIsViewingClient,
  setEditingClientIndex,
  openActionIdx,
  setOpenActionIdx,
  setClientFirstName,
  setClientLastName,
  setClientPhone,
  setClientTagState
}: DashboardClientsListProps) {
  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-hidden bg-[#FCF8F8] relative">
      {/* Client management Header */}
      <div className="h-16 border-b border-[#C6C6CB] bg-[#FCF8F8] px-6 flex items-center justify-between shrink-0 select-none">
        <div>
          <h1 className="text-xl font-bold text-[#1A1A1A] font-poppins">Client management</h1>
          <p className="text-[11px] text-neutral-500 font-poppins mt-0.5">See all the details of your client</p>
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

      {/* Scrollable Container */}
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6">
        {/* Metrics cards container */}
        <div className="grid grid-cols-2 md:grid-cols-5 bg-white border border-[#E8E8E6] rounded-xl shrink-0 overflow-hidden">
          <div className="p-4 flex flex-col justify-center border-b border-r border-[#E8E8E6] md:border-0">
            <span className="text-lg font-semibold text-[#1A1A1A]">18</span>
            <span className="text-xs text-[#888780] font-light mt-0.5">Total clients</span>
          </div>
          <div className="p-4 flex flex-col justify-center border-b border-[#E8E8E6] md:border-l md:border-0">
            <span className="text-lg font-semibold text-[#1A1A1A]">12</span>
            <span className="text-xs text-[#888780] font-light mt-0.5">Active this month</span>
          </div>
          <div className="p-4 flex flex-col justify-center border-b border-r border-[#E8E8E6] md:border-l md:border-0">
            <span className="text-lg font-semibold text-[#1D9E75]">3</span>
            <span className="text-xs text-[#888780] font-light mt-0.5">New this month</span>
          </div>
          <div className="p-4 flex flex-col justify-center border-b border-[#E8E8E6] md:border-l md:border-0">
            <span className="text-lg font-semibold text-[#E24B4A]">2</span>
            <span className="text-xs text-[#888780] font-light mt-0.5">At-risk</span>
          </div>
          <div className="p-4 flex flex-col justify-center col-span-2 md:col-span-1 md:border-l border-[#E8E8E6]">
            <span className="text-lg font-semibold text-[#1A1A1A]">€504</span>
            <span className="text-xs text-[#888780] font-light mt-0.5">Avg. lifetime value</span>
          </div>
        </div>

        {/* Filter toolbar */}
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between shrink-0">
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
            {/* Search box */}
            <div className="relative w-full sm:w-[230px] h-9">
              <span className="absolute left-3 top-2.5 text-neutral-400">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search name, phone or email..."
                className="w-full h-full pl-9 pr-4 bg-white border border-[#D3D1C7] rounded-lg text-xs font-poppins placeholder-neutral-400 focus:outline-none focus:border-neutral-800"
              />
            </div>

            {/* Dropdown 1: Tags */}
            <button className="h-9 px-3 border border-[#111111] rounded-lg flex items-center justify-between bg-white text-xs font-semibold text-[#111111] gap-2">
              <span>Tags</span>
              <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown 2: All staff */}
            <button className="h-9 px-3 border border-[#111111] rounded-lg flex items-center justify-between bg-white text-xs font-semibold text-[#111111] gap-2">
              <span>All Staff</span>
              <HugeiconsIcon icon={ArrowDown01Icon} className="w-3.5 h-3.5" />
            </button>

            {/* Dropdown 3: Export */}
            <button className="h-9 px-3 border border-[#111111] rounded-lg flex items-center justify-between bg-white text-xs font-semibold text-[#111111] gap-2">
              <span>Export</span>
              <svg className="w-3.5 h-3.5 text-[#111111]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </button>
          </div>

          {/* Add Client Button */}
          <button onClick={() => setIsAddingClient(true)} className="h-9 px-4 bg-[#111111] text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 hover:bg-neutral-800 transition-colors w-full lg:w-auto">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            <span>Add client</span>
          </button>
        </div>

        {/* Clients Table Container */}
        <div className="bg-white border border-[#E8E8E6] rounded-xl flex-1 flex flex-col overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#FAFAF8] border-b border-[#E8E8E6] text-[11px] text-[#888780] font-normal font-poppins">
                  <th className="px-5 py-3.5 font-normal">Client</th>
                  <th className="px-5 py-3.5 font-normal">Phone</th>
                  <th className="px-5 py-3.5 font-normal">Last visit / Next</th>
                  <th className="px-5 py-3.5 font-normal">Visits</th>
                  <th className="px-5 py-3.5 font-normal">Spent</th>
                  <th className="px-5 py-3.5 font-normal">Tags</th>
                  <th className="px-5 py-3.5 font-normal text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8E6] font-poppins text-xs">
                {clientsData.map((client, idx) => (
                  <tr key={idx} className="hover:bg-neutral-50/50 transition-colors">
                    {/* Client details */}
                    <td className="px-5 py-3.5 flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full ${client.avatarBg} flex items-center justify-center text-[10px] font-semibold text-[#5F5E5A] shrink-0`}>
                        {client.avatarText}
                      </div>
                      <div className="flex flex-col">
                        <span className="font-semibold text-[#1A1A1A]">{client.name}</span>
                        <span className="text-[10px] text-[#888780] font-light mt-0.5">{client.joined}</span>
                      </div>
                    </td>
                    {/* Phone */}
                    <td className="px-5 py-3.5 text-[#5F5E5A]">
                      {client.phone}
                    </td>
                    {/* Last visit / Next Booking */}
                    <td className="px-5 py-3.5">
                      <div className="flex flex-col">
                        <span className={`font-medium ${client.isNext ? "text-[#1D9E75]" : "text-[#1A1A1A]"}`}>
                          {client.isNext ? `↑ ${client.visitText}` : client.visitText}
                        </span>
                        <span className="text-[10px] text-[#B4B2A9] mt-0.5">{client.visitSub}</span>
                      </div>
                    </td>
                    {/* Visits */}
                    <td className="px-5 py-3.5 text-[#1A1A1A] font-semibold">
                      {client.visits}
                    </td>
                    {/* Spent */}
                    <td className="px-5 py-3.5 text-[#1A1A1A] font-semibold">
                      {client.spent}
                    </td>
                    {/* Tags */}
                    <td className="px-5 py-3.5">
                      {client.tag && (
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold whitespace-nowrap ${client.tagBg} ${client.tagColor}`}>
                          {client.tag}
                        </span>
                      )}
                    </td>
                    {/* Action button */}
                    <td className="px-5 py-3.5 text-right relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setOpenActionIdx(openActionIdx === idx ? null : idx);
                        }}
                        className="border border-[#111827] rounded-full px-3 py-1 text-xs font-semibold text-[#111827] hover:bg-neutral-50 transition-colors inline-flex items-center gap-1.5 h-[30px]"
                      >
                        <span>Action</span>
                        <HugeiconsIcon icon={ArrowDown01Icon} className={`w-3.5 h-3.5 transition-transform duration-200 ${openActionIdx === idx ? "rotate-180" : ""}`} />
                      </button>

                      {/* Dropdown Options */}
                      {openActionIdx === idx && (
                        <>
                          <div
                            className="fixed inset-0 z-40 bg-transparent"
                            onClick={() => setOpenActionIdx(null)}
                          />
                          <div className="absolute right-5 mt-1 z-50 w-[160px] bg-white rounded-xl shadow-2xl border border-[#C6C6CB] flex flex-col py-1 text-left text-xs font-poppins font-medium select-none animate-fadeIn">
                            <button
                              className="px-4 py-2.5 hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 text-left transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionIdx(null);
                                // Populate view fields
                                const c = clientsData[idx];
                                const parts = c.name.split(" ");
                                setClientFirstName(parts[0] || "");
                                setClientLastName(parts.slice(1).join(" ") || "");
                                setClientPhone(c.phone || "");
                                setClientTagState(c.tag || "VIP");
                                // Enable View mode
                                setIsViewingClient(true);
                                setEditingClientIndex(idx);
                              }}
                            >
                              View client details
                            </button>
                            <button
                              className="px-4 py-2.5 hover:bg-neutral-50 text-neutral-700 hover:text-neutral-900 text-left transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionIdx(null);
                                // Populate fields for editing
                                const c = clientsData[idx];
                                const parts = c.name.split(" ");
                                setClientFirstName(parts[0] || "");
                                setClientLastName(parts.slice(1).join(" ") || "");
                                setClientPhone(c.phone || "");
                                setClientTagState(c.tag || "VIP");
                                // Go directly to Edit Form
                                setIsViewingClient(false);
                                setEditingClientIndex(idx);
                              }}
                            >
                              Edit client details
                            </button>
                            <button
                              className="px-4 py-2.5 hover:bg-neutral-50 text-[#BA1A1A] text-left transition-colors font-semibold"
                              onClick={(e) => {
                                e.stopPropagation();
                                setOpenActionIdx(null);
                                setClientsData(clientsData.filter((_, i) => i !== idx));
                              }}
                            >
                              Delete client
                            </button>
                          </div>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}
