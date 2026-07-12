"use client";

import React from "react";
import { StaticPage } from "./types";

interface StaticPagesTabProps {
  staticPages: StaticPage[];
  onEdit: (page: StaticPage) => void;
}

export default function StaticPagesTab({
  staticPages,
  onEdit,
}: StaticPagesTabProps) {
  return (
    <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-x-auto no-scrollbar">
      <table className="w-full text-left border-collapse text-sm min-w-[700px]">
        <thead>
          <tr className="bg-[#F9FAFB] border-b-[1.06667px] border-b-[#E5E7EB] text-xs font-semibold text-[#374151] h-[36.53px]">
            <th className="px-4 py-2.5 pl-6 font-semibold w-1/2">Page</th>
            <th className="px-4 py-2.5 font-semibold w-1/4">Last Edited</th>
            <th className="px-4 py-2.5 font-semibold text-center pr-6 w-1/4">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E5E7EB] text-gray-700">
          {staticPages.map((page) => (
            <tr key={page.id} className="hover:bg-gray-50/50 h-[63.07px]">
              <td className="px-4 py-3 pl-6 font-medium text-sm text-[#111827]">{page.title}</td>
              <td className="px-4 py-3 text-xs text-[#6B7280]">{page.lastUpdated}</td>
              <td className="px-4 py-3 text-right pr-6">
                <div className="flex items-center justify-end pr-2">
                  <button
                    onClick={() => onEdit(page)}
                    className="h-[36px] w-[57.7px] flex items-center justify-center text-[13px] font-medium text-[#6366F1] bg-white border border-[#6366F1] rounded-full hover:bg-indigo-50 transition-colors cursor-pointer"
                  >
                    Edit
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
