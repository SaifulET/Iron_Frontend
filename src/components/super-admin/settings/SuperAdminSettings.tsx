"use client";

import React, { useState } from "react";

interface NoShowWindow {
  category: string;
  opens: number; // mins
  closes: number; // mins
  reversal: number; // mins
}

export default function SuperAdminSettings() {
  // --- Admin Account State ---
  const [fullName, setFullName] = useState("Georgino Mansour");
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(fullName);

  const [email, setEmail] = useState("georgino@chaincraft.cy");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);

  const [isEditingPassword, setIsEditingPassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [language, setLanguage] = useState<"EN" | "GR">("EN");
  const [alertModal, setAlertModal] = useState<{ isOpen: boolean; message: string } | null>(null);

  // --- Platform Configuration State ---
  const [maxServices, setMaxServices] = useState(5);
  const [isEditingMaxServices, setIsEditingMaxServices] = useState(false);
  const [tempMaxServices, setTempMaxServices] = useState(maxServices);

  // No-show charge window list
  const [noShowWindows, setNoShowWindows] = useState<NoShowWindow[]>([
    { category: "Beauty & Wellness", opens: 15, closes: 120, reversal: 90 },
    { category: "Health & Fitness", opens: 15, closes: 120, reversal: 90 },
    { category: "Sports & Activities", opens: 15, closes: 120, reversal: 90 },
    { category: "Automotive", opens: 15, closes: 180, reversal: 90 },
    { category: "Pets & Home", opens: 15, closes: 45, reversal: 90 },
    { category: "Experiences & Tours", opens: 15, closes: 360, reversal: 90 },
    { category: "Entertainment & Events", opens: 15, closes: 1440, reversal: 90 },
    { category: "Creative & Education", opens: 15, closes: 120, reversal: 90 },
  ]);

  // Track which row index is being edited (-1 means none)
  const [editingRowIndex, setEditingRowIndex] = useState<number>(-1);
  const [tempOpens, setTempOpens] = useState(15);
  const [tempCloses, setTempCloses] = useState(120);
  const [tempReversal, setTempReversal] = useState(90);

  // --- Admin Account Actions ---
  const handleSaveName = () => {
    setFullName(tempName);
    setIsEditingName(false);
  };

  const handleCancelName = () => {
    setTempName(fullName);
    setIsEditingName(false);
  };

  const handleSaveEmail = () => {
    setEmail(tempEmail);
    setIsEditingEmail(false);
  };

  const handleCancelEmail = () => {
    setTempEmail(email);
    setIsEditingEmail(false);
  };

  const handleSavePassword = () => {
    if (newPassword && newPassword === confirmPassword) {
      setAlertModal({ isOpen: true, message: "Password updated successfully!" });
      setIsEditingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } else {
      setAlertModal({ isOpen: true, message: "Passwords do not match or are empty." });
    }
  };

  const handleCancelPassword = () => {
    setIsEditingPassword(false);
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  // --- Platform Configuration Actions ---
  const handleSaveMaxServices = () => {
    setMaxServices(tempMaxServices);
    setIsEditingMaxServices(false);
  };

  const handleCancelMaxServices = () => {
    setTempMaxServices(maxServices);
    setIsEditingMaxServices(false);
  };

  const startEditingRow = (index: number, row: NoShowWindow) => {
    setEditingRowIndex(index);
    setTempOpens(row.opens);
    setTempCloses(row.closes);
    setTempReversal(row.reversal);
  };

  const handleSaveRow = (index: number) => {
    setNoShowWindows((prev) =>
      prev.map((row, idx) =>
        idx === index
          ? { ...row, opens: tempOpens, closes: tempCloses, reversal: tempReversal }
          : row
      )
    );
    setEditingRowIndex(-1);
  };

  const handleCancelRow = () => {
    setEditingRowIndex(-1);
  };

  return (
    <div 
      className="h-full overflow-y-auto overflow-x-hidden no-scrollbar pr-2 pb-8 flex flex-col gap-6 font-sans"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      {/* Title section */}
      <div className="flex flex-col gap-1 flex-shrink-0">
        <h1 className="text-2xl font-semibold text-[#111827] leading-8">Settings</h1>
        <p className="text-sm text-[#4E5F78]">
          Manage and configure system platform preferences.
        </p>
      </div>

      {/* Admin Account Section */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-4">
        <div className="border-b border-[#E5E7EB] pb-3">
          <h2 className="text-lg font-semibold text-[#111827] leading-[22px]">Admin Account</h2>
        </div>

        <div className="flex flex-col">
          {/* Full Name Row */}
          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-[#E5E7EB] gap-2 min-h-[64px]">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">Full name</div>
            <div className="w-full sm:w-1/3 text-sm text-[#111827]">
              {isEditingName ? (
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                />
              ) : (
                fullName
              )}
            </div>
            <div className="w-full sm:w-1/3 flex sm:justify-start">
              {isEditingName ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveName}
                    className="text-xs font-semibold text-[#6366F1] bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelName}
                    className="text-xs font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingName(true)}
                  className="text-xs font-medium text-[#6366F1] hover:underline cursor-pointer border-none bg-transparent"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Email Row */}
          <div className="flex flex-col sm:flex-row sm:items-center py-4 border-b border-[#E5E7EB] gap-2 min-h-[64px]">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">Email</div>
            <div className="w-full sm:w-1/3 text-sm text-[#111827] truncate">
              {isEditingEmail ? (
                <input
                  type="email"
                  value={tempEmail}
                  onChange={(e) => setTempEmail(e.target.value)}
                  className="w-full max-w-xs border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                />
              ) : (
                email
              )}
            </div>
            <div className="w-full sm:w-1/3 flex sm:justify-start">
              {isEditingEmail ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveEmail}
                    className="text-xs font-semibold text-[#6366F1] bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelEmail}
                    className="text-xs font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingEmail(true)}
                  className="text-xs font-medium text-[#6366F1] hover:underline cursor-pointer border-none bg-transparent"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* Password Row */}
          <div className="flex flex-col sm:flex-row sm:items-start py-4 border-b border-[#E5E7EB] gap-2 min-h-[64px]">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280] pt-1">Password</div>
            <div className="w-full sm:w-1/3 text-sm text-[#111827] flex flex-col gap-2">
              {isEditingPassword ? (
                <div className="flex flex-col gap-2 w-full max-w-xs">
                  <input
                    type="password"
                    placeholder="Current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                  />
                  <input
                    type="password"
                    placeholder="New password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                  />
                  <input
                    type="password"
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                  />
                </div>
              ) : (
                "•••••••••••"
              )}
            </div>
            <div className="w-full sm:w-1/3 flex sm:justify-start">
              {isEditingPassword ? (
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={handleSavePassword}
                    className="text-xs font-semibold text-[#6366F1] bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelPassword}
                    className="text-xs font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingPassword(true)}
                  className="text-xs font-medium text-[#6366F1] hover:underline cursor-pointer border-none bg-transparent"
                >
                  Change Password
                </button>
              )}
            </div>
          </div>

          {/* Language Row */}
          <div className="flex flex-col sm:flex-row sm:items-center py-4 gap-2 min-h-[58px]">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">Default language</div>
            <div className="w-full sm:w-1/3 text-sm text-[#111827]">
              {language === "EN" ? "English (EN)" : "Greek (GR)"}
            </div>
            <div className="w-full sm:w-1/3 flex sm:justify-start">
              <div className="inline-flex bg-[#F9FAFB] border border-[#E5E7EB] rounded-full p-0.5">
                <button
                  onClick={() => setLanguage("EN")}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border-none cursor-pointer transition-all ${
                    language === "EN"
                      ? "bg-[#6366F1] text-white"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  EN
                </button>
                <button
                  onClick={() => setLanguage("GR")}
                  className={`px-3 py-1 text-xs font-semibold rounded-full border-none cursor-pointer transition-all ${
                    language === "GR"
                      ? "bg-[#6366F1] text-white"
                      : "text-[#6B7280] hover:text-[#111827]"
                  }`}
                >
                  GR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Platform Configuration Section */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-6">
        <div className="border-b border-[#E5E7EB] pb-3">
          <h2 className="text-lg font-semibold text-[#111827] leading-[22px]">Platform Configuration</h2>
        </div>

        <div className="flex flex-col divide-y divide-[#E5E7EB]">
          {/* Commission Rate */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">Commission rate</div>
            <div className="w-full sm:w-1/3 text-sm font-bold text-[#111827]">
              20%{" "}
              <span className="font-normal text-xs text-gray-500">
                (first booking only per customer per business)
              </span>
            </div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>

          {/* Minimum Deposit */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">Minimum deposit</div>
            <div className="w-full sm:w-1/3 text-sm font-bold text-[#111827]">€5</div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>

          {/* Maximum Deposit */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">Maximum deposit</div>
            <div className="w-full sm:w-1/3 text-sm font-bold text-[#111827]">€35</div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>

          {/* Max Services Per Booking */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">
              Max services per booking
            </div>
            <div className="w-full sm:w-1/3 text-sm font-bold text-[#111827]">
              {isEditingMaxServices ? (
                <input
                  type="number"
                  value={tempMaxServices}
                  onChange={(e) => setTempMaxServices(Number(e.target.value))}
                  className="w-20 border border-gray-300 rounded-lg px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                />
              ) : (
                maxServices
              )}
            </div>
            <div className="w-full sm:w-1/3 flex sm:justify-start">
              {isEditingMaxServices ? (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSaveMaxServices}
                    className="text-xs font-semibold text-[#6366F1] bg-indigo-50 hover:bg-indigo-100 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Save
                  </button>
                  <button
                    onClick={handleCancelMaxServices}
                    className="text-xs font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 px-3 py-1.5 rounded-full transition-colors cursor-pointer border-none"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditingMaxServices(true)}
                  className="text-xs font-medium text-[#6366F1] hover:underline cursor-pointer border-none bg-transparent"
                >
                  Edit
                </button>
              )}
            </div>
          </div>

          {/* No-show Charge Window */}
          <div className="flex flex-col py-6 gap-4">
            <div className="text-sm font-semibold text-[#111827]">No-show charge window</div>
            <div className="overflow-x-auto border border-gray-200 rounded-xl">
              <table className="w-full min-w-[700px] border-collapse text-left text-sm text-[#111827]">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500">
                    <th className="p-3 pl-4">Category</th>
                    <th className="p-3 text-center border-l border-gray-200">Window Opens after start</th>
                    <th className="p-3 text-center border-l border-gray-200">Window Closes after start</th>
                    <th className="p-3 text-center border-l border-gray-200">Reversal timer after start</th>
                    <th className="p-3 text-center border-l border-gray-200">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {noShowWindows.map((row, index) => {
                    const isEditing = editingRowIndex === index;
                    return (
                      <tr key={row.category} className="hover:bg-gray-50/50">
                        <td className="p-3 pl-4 font-semibold text-xs sm:text-sm text-gray-700">{row.category}</td>
                        <td className="p-3 text-center border-l border-gray-200">
                          {isEditing ? (
                            <div className="inline-flex items-center gap-1.5">
                              <input
                                type="number"
                                value={tempOpens}
                                onChange={(e) => setTempOpens(Number(e.target.value))}
                                className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-center text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                              />
                              <span className="text-xs text-gray-500">mins</span>
                            </div>
                          ) : (
                            <span className="font-semibold text-xs sm:text-sm">{row.opens} mins</span>
                          )}
                        </td>
                        <td className="p-3 text-center border-l border-gray-200">
                          {isEditing ? (
                            <div className="inline-flex items-center gap-1.5">
                              <input
                                type="number"
                                value={tempCloses}
                                onChange={(e) => setTempCloses(Number(e.target.value))}
                                className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-center text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                              />
                              <span className="text-xs text-gray-500">mins</span>
                            </div>
                          ) : (
                            <span className="font-semibold text-xs sm:text-sm">{row.closes} mins</span>
                          )}
                        </td>
                        <td className="p-3 text-center border-l border-gray-200">
                          {isEditing ? (
                            <div className="inline-flex items-center gap-1.5">
                              <input
                                type="number"
                                value={tempReversal}
                                onChange={(e) => setTempReversal(Number(e.target.value))}
                                className="w-16 border border-gray-300 rounded px-1.5 py-0.5 text-center text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                              />
                              <span className="text-xs text-gray-500">mins</span>
                            </div>
                          ) : (
                            <span className="font-semibold text-xs sm:text-sm">{row.reversal} mins</span>
                          )}
                        </td>
                        <td className="p-3 text-center border-l border-gray-200">
                          {isEditing ? (
                            <div className="flex flex-col gap-1 items-center justify-center">
                              <button
                                onClick={() => handleSaveRow(index)}
                                className="text-[11px] font-semibold text-[#6366F1] bg-indigo-50 hover:bg-indigo-100 px-2 py-0.5 rounded transition-colors cursor-pointer border-none"
                              >
                                Save
                              </button>
                              <button
                                onClick={handleCancelRow}
                                className="text-[11px] font-semibold text-[#111111] bg-gray-100 hover:bg-gray-200 px-2 py-0.5 rounded transition-colors cursor-pointer border-none"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => startEditingRow(index, row)}
                              className="text-xs font-semibold text-[#6366F1] hover:underline cursor-pointer border-none bg-transparent"
                            >
                              Edit
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* No-show fee */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">No-show fee</div>
            <div className="w-full sm:w-1/3 text-sm text-[#111827] flex flex-col gap-1">
              <div>
                <span className="font-bold">20%</span> <span className="text-xs text-gray-500">(cannot be set lower by businesses)</span>
              </div>
              <div>
                <span className="font-bold">100%</span> <span className="text-xs text-gray-500">(cannot be set higher by businesses)</span>
              </div>
            </div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>

          {/* Late cancellation fee */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">Late cancellation fee</div>
            <div className="w-full sm:w-1/3 text-sm text-[#111827] flex flex-col gap-1">
              <div>
                <span className="font-bold">20%</span> <span className="text-xs text-gray-500">(cannot be set lower by businesses)</span>
              </div>
              <div>
                <span className="font-bold">100%</span> <span className="text-xs text-gray-500">(cannot be set higher by businesses)</span>
              </div>
            </div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>

          {/* Late cancellation fee bands */}
          <div className="flex flex-col sm:flex-row sm:items-start py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280] pt-0.5">
              Late cancellation fee bands
            </div>
            <div className="w-full sm:w-1/3 text-sm font-bold text-[#111827] flex flex-col gap-1">
              <div>More than 72 hours</div>
              <div>24-72 hours</div>
              <div>12-24 hours</div>
              <div>2-12 hours</div>
              <div>Under 2 hours</div>
            </div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5 pt-0.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>

          {/* Business session token */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">
              Business session token
            </div>
            <div className="w-full sm:w-1/3 text-sm font-bold text-[#111827]">
              90 days <span className="font-normal text-xs text-gray-500">(no inactivity timeout)</span>
            </div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>

          {/* Customer session token */}
          <div className="flex flex-col sm:flex-row sm:items-center py-5 gap-2">
            <div className="w-full sm:w-1/3 text-sm font-medium text-[#6B7280]">
              Customer session token
            </div>
            <div className="w-full sm:w-1/3 text-sm font-bold text-[#111827]">
              180 days <span className="font-normal text-xs text-gray-500">(no inactivity timeout)</span>
            </div>
            <div className="w-full sm:w-1/3 text-xs text-[#6B7280] flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span>Non-configurable</span>
            </div>
          </div>
        </div>
      </div>

      {alertModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-[380px] rounded-xl overflow-hidden shadow-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center shrink-0">
              <h3 className="font-bold text-base text-[#111827]">Notification</h3>
              <button
                type="button"
                onClick={() => setAlertModal(null)}
                className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 leading-5">
              {alertModal.message}
            </p>
            <div className="flex justify-end mt-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setAlertModal(null)}
                className="px-5 py-2 rounded-full bg-[#6366F1] hover:bg-indigo-650 text-xs font-semibold text-white border-none cursor-pointer"
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
