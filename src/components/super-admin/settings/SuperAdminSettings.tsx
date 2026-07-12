"use client";

import React, { useState } from "react";
import AdminAccountSettings from "./AdminAccountSettings";
import PlatformConfigurationSettings from "./PlatformConfigurationSettings";
import { NoShowWindow, INITIAL_NO_SHOW_WINDOWS } from "./types";

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
  const [noShowWindows, setNoShowWindows] = useState<NoShowWindow[]>(INITIAL_NO_SHOW_WINDOWS);

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
      <AdminAccountSettings
        fullName={fullName}
        isEditingName={isEditingName}
        tempName={tempName}
        setTempName={setTempName}
        setIsEditingName={setIsEditingName}
        email={email}
        isEditingEmail={isEditingEmail}
        tempEmail={tempEmail}
        setTempEmail={setTempEmail}
        setIsEditingEmail={setIsEditingEmail}
        isEditingPassword={isEditingPassword}
        setIsEditingPassword={setIsEditingPassword}
        currentPassword={currentPassword}
        setCurrentPassword={setCurrentPassword}
        newPassword={newPassword}
        setNewPassword={setNewPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        language={language}
        setLanguage={setLanguage}
        handleSaveName={handleSaveName}
        handleCancelName={handleCancelName}
        handleSaveEmail={handleSaveEmail}
        handleCancelEmail={handleCancelEmail}
        handleSavePassword={handleSavePassword}
        handleCancelPassword={handleCancelPassword}
      />

      {/* Platform Configuration Section */}
      <PlatformConfigurationSettings
        maxServices={maxServices}
        isEditingMaxServices={isEditingMaxServices}
        tempMaxServices={tempMaxServices}
        setTempMaxServices={setTempMaxServices}
        setIsEditingMaxServices={setIsEditingMaxServices}
        noShowWindows={noShowWindows}
        editingRowIndex={editingRowIndex}
        tempOpens={tempOpens}
        setTempOpens={setTempOpens}
        tempCloses={tempCloses}
        setTempCloses={setTempCloses}
        tempReversal={tempReversal}
        setTempReversal={setTempReversal}
        handleSaveMaxServices={handleSaveMaxServices}
        handleCancelMaxServices={handleCancelMaxServices}
        startEditingRow={startEditingRow}
        handleSaveRow={handleSaveRow}
        handleCancelRow={handleCancelRow}
      />

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
