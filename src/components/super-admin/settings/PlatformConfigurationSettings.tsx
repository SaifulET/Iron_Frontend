"use client";

import React from "react";

interface NoShowWindow {
  category: string;
  opens: number;
  closes: number;
  reversal: number;
}

interface PlatformConfigurationSettingsProps {
  maxServices: number;
  isEditingMaxServices: boolean;
  tempMaxServices: number;
  setTempMaxServices: (val: number) => void;
  setIsEditingMaxServices: (val: boolean) => void;
  noShowWindows: NoShowWindow[];
  editingRowIndex: number;
  tempOpens: number;
  setTempOpens: (val: number) => void;
  tempCloses: number;
  setTempCloses: (val: number) => void;
  tempReversal: number;
  setTempReversal: (val: number) => void;
  handleSaveMaxServices: () => void;
  handleCancelMaxServices: () => void;
  startEditingRow: (index: number, row: NoShowWindow) => void;
  handleSaveRow: (index: number) => void;
  handleCancelRow: () => void;
}

export default function PlatformConfigurationSettings({
  maxServices,
  isEditingMaxServices,
  tempMaxServices,
  setTempMaxServices,
  setIsEditingMaxServices,
  noShowWindows,
  editingRowIndex,
  tempOpens,
  setTempOpens,
  tempCloses,
  setTempCloses,
  tempReversal,
  setTempReversal,
  handleSaveMaxServices,
  handleCancelMaxServices,
  startEditingRow,
  handleSaveRow,
  handleCancelRow,
}: PlatformConfigurationSettingsProps) {
  return (
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
  );
}
