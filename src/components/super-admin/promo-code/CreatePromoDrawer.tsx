"use client";

import React, { useEffect, useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Cancel01Icon, InformationCircleIcon } from "@hugeicons/core-free-icons";

export interface PromoCodeItem {
  id: string;
  code: string;
  type: "%" | "Fixed €";
  value: number;
  used: number;
  limit: number;
  perUserLimit: number;
  startDate?: string;
  expires: string;
  scope: string;
  status: "Active" | "Expired" | "Deactivated";
}

interface CreatePromoDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (codeData: Omit<PromoCodeItem, "id" | "used"> & { id?: string }) => void;
  editingCode: PromoCodeItem | null;
}

export default function CreatePromoDrawer({
  isOpen,
  onClose,
  onSave,
  editingCode
}: CreatePromoDrawerProps) {
  const [codeText, setCodeText] = useState("");
  const [discountType, setDiscountType] = useState<"%" | "Fixed €">("%");
  const [discountValue, setDiscountValue] = useState<number>(5);
  const [startDate, setStartDate] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [totalLimit, setTotalLimit] = useState<number>(100);
  const [perUserLimit, setPerUserLimit] = useState<number>(1);
  const [scope, setScope] = useState("All first bookings");

  useEffect(() => {
    if (editingCode) {
      setCodeText(editingCode.code);
      setDiscountType(editingCode.type);
      setDiscountValue(editingCode.value);
      setStartDate(editingCode.startDate || "");
      setExpiryDate(editingCode.expires);
      setTotalLimit(editingCode.limit);
      setPerUserLimit(editingCode.perUserLimit || 1);
      setScope(editingCode.scope);
    } else {
      // Defaults
      setCodeText("");
      setDiscountType("%");
      setDiscountValue(5);
      setStartDate("");
      setExpiryDate("");
      setTotalLimit(100);
      setPerUserLimit(1);
      setScope("All first bookings");
    }
  }, [editingCode, isOpen]);

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Uppercase, remove spaces
    const val = e.target.value.toUpperCase().replace(/\s/g, "");
    setCodeText(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!codeText) return;

    onSave({
      id: editingCode?.id,
      code: codeText,
      type: discountType,
      value: discountValue,
      limit: totalLimit,
      perUserLimit: perUserLimit,
      startDate: startDate || undefined,
      expires: expiryDate || new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      scope: scope,
      status: editingCode?.status || "Active"
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop overlay */}
      <div
        className={`fixed inset-0 bg-black/30 z-[100] transition-opacity duration-300 ease-in-out ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Slide-out Drawer Panel */}
      <div
        className={`fixed right-0 top-0 h-screen w-full sm:w-[480px] bg-white shadow-[0px_10px_24px_rgba(0,0,0,0.12)] z-[101] flex flex-col font-sans transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Header */}
        <div className="flex items-center justify-between px-6 h-[70px] border-b border-gray-200 shrink-0">
          <h3 className="font-sans font-semibold text-lg text-[#111111]">
            {editingCode ? "Edit Promo Code" : "Create Promo Code"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <HugeiconsIcon icon={Cancel01Icon} className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content Form */}
        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-6 flex flex-col gap-5">
          {/* Code text */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700 font-sans">
              Code text (uppercase, no spaces)
            </label>
            <input
              type="text"
              value={codeText}
              onChange={handleCodeChange}
              placeholder="SUMMER25"
              required
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white transition-all text-[#111111]"
            />
          </div>

          {/* Discount type and value */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700 font-sans">
              Discount value 20% MAX $35
            </label>
            <div className="flex gap-2">
              <select
                value={discountType}
                onChange={(e) => setDiscountType(e.target.value as "%" | "Fixed €")}
                className="px-3 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white text-[#111111]"
              >
                <option value="%">%</option>
                <option value="Fixed €">Fixed €</option>
              </select>
              <input
                type="number"
                value={discountValue}
                onChange={(e) => setDiscountValue(Number(e.target.value))}
                min={1}
                required
                className="flex-grow px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white transition-all text-[#111111]"
              />
            </div>
          </div>

          {/* Start Date & Expiry Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 font-sans">Start date</label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white transition-all text-[#111111]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 font-sans">Expiry date</label>
              <input
                type="date"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white transition-all text-[#111111]"
              />
            </div>
          </div>

          {/* Total limit & Per-user limit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 font-sans">Total usage limit</label>
              <input
                type="number"
                value={totalLimit}
                onChange={(e) => setTotalLimit(Number(e.target.value))}
                min={1}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white transition-all text-[#111111]"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-medium text-gray-700 font-sans">Per-user limit</label>
              <input
                type="number"
                value={perUserLimit}
                onChange={(e) => setPerUserLimit(Number(e.target.value))}
                min={1}
                required
                className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white transition-all text-[#111111]"
              />
            </div>
          </div>

          {/* Applicable scope */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-gray-700 font-sans">Applicable scope</label>
            <select
              value={scope}
              onChange={(e) => setScope(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-sm font-sans focus:outline-none focus:border-[#2E9DA7] focus:bg-white text-[#111111]"
            >
              <option value="All first bookings">All first bookings</option>
              <option value="All bookings">All bookings</option>
              <option value="Select Businesses">Select Businesses</option>
            </select>
          </div>

          {/* Important Rules Block */}
          <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-xl p-4 flex gap-3 text-[#1E40AF]">
            <HugeiconsIcon icon={InformationCircleIcon} className="w-5 h-5 shrink-0 mt-0.5" />
            <div className="flex flex-col gap-1.5">
              <span className="text-sm font-semibold font-sans">Important rules:</span>
              <ul className="text-xs font-sans list-disc list-inside space-y-1 opacity-90 leading-normal">
                <li>Codes valid ONLY on first bookings (no relationship row exists)</li>
                <li>Discount applies to deposit amount only</li>
                <li>If code covers full deposit; €0 charged but card still saved via Stripe Setup Intent</li>
                <li>Codes are not stackable — one per booking</li>
              </ul>
            </div>
          </div>

          {/* Bottom Action buttons */}
          <div className="flex items-center justify-end gap-3 pt-6 mt-auto border-t border-gray-100 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-sm font-medium text-[#4F46E5] hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#2E9DA7] hover:bg-[#25828a] text-white text-sm font-medium rounded-lg transition-colors cursor-pointer"
            >
              {editingCode ? "Save Changes" : "Create Code"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
