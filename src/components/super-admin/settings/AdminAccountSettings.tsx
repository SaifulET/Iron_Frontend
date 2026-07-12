"use client";

import React from "react";

interface AdminAccountSettingsProps {
  fullName: string;
  isEditingName: boolean;
  tempName: string;
  setTempName: (val: string) => void;
  setIsEditingName: (val: boolean) => void;
  email: string;
  isEditingEmail: boolean;
  tempEmail: string;
  setTempEmail: (val: string) => void;
  setIsEditingEmail: (val: boolean) => void;
  isEditingPassword: boolean;
  setIsEditingPassword: (val: boolean) => void;
  currentPassword: string;
  setCurrentPassword: (val: string) => void;
  newPassword: string;
  setNewPassword: (val: string) => void;
  confirmPassword: string;
  setConfirmPassword: (val: string) => void;
  language: "EN" | "GR";
  setLanguage: (val: "EN" | "GR") => void;
  handleSaveName: () => void;
  handleCancelName: () => void;
  handleSaveEmail: () => void;
  handleCancelEmail: () => void;
  handleSavePassword: () => void;
  handleCancelPassword: () => void;
}

export default function AdminAccountSettings({
  fullName,
  isEditingName,
  tempName,
  setTempName,
  setIsEditingName,
  email,
  isEditingEmail,
  tempEmail,
  setTempEmail,
  setIsEditingEmail,
  isEditingPassword,
  setIsEditingPassword,
  currentPassword,
  setCurrentPassword,
  newPassword,
  setNewPassword,
  confirmPassword,
  setConfirmPassword,
  language,
  setLanguage,
  handleSaveName,
  handleCancelName,
  handleSaveEmail,
  handleCancelEmail,
  handleSavePassword,
  handleCancelPassword,
}: AdminAccountSettingsProps) {
  return (
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
    </div>
  );
}
