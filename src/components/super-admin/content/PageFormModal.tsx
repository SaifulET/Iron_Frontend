"use client";

import React, { useState, useEffect } from "react";
import { StaticPage } from "./types";

interface PageFormModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent, data: { title: string; slug: string; status: StaticPage["status"] }) => void;
  editingPage: StaticPage | null;
}

export default function PageFormModal({ show, onClose, onSave, editingPage }: PageFormModalProps) {
  const [pageTitle, setPageTitle] = useState("");
  const [pageSlug, setPageSlug] = useState("");
  const [pageStatus, setPageStatus] = useState<StaticPage["status"]>("Published");

  useEffect(() => {
    if (editingPage) {
      setPageTitle(editingPage.title);
      setPageSlug(editingPage.slug);
      setPageStatus(editingPage.status);
    } else {
      setPageTitle("");
      setPageSlug("");
      setPageStatus("Published");
    }
  }, [editingPage, show]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    onSave(e, { title: pageTitle, slug: pageSlug, status: pageStatus });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-[500px] rounded-xl overflow-hidden shadow-xl p-6 flex flex-col gap-5">
        <div className="flex justify-between items-center shrink-0">
          <h3 className="font-bold text-lg text-[#111827]">
            {editingPage ? "Edit Static Page" : "Add Static Page"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center border border-gray-200 hover:bg-gray-55 rounded-lg text-gray-400 hover:text-gray-600 bg-transparent cursor-pointer"
          >
            <svg className="w-[18px] h-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">Page Title</label>
            <input
              type="text"
              placeholder="e.g. Terms & Conditions"
              value={pageTitle}
              onChange={(e) => setPageTitle(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">Page Slug</label>
            <input
              type="text"
              placeholder="e.g. /terms-of-service"
              value={pageSlug}
              onChange={(e) => setPageSlug(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-700">Status</label>
            <select
              value={pageStatus}
              onChange={(e) => setPageStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-full bg-gray-105 hover:bg-gray-200 text-xs font-semibold text-gray-605 border-none cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2.5 rounded-full bg-[#6366F1] hover:bg-indigo-600 text-xs font-semibold text-white border-none cursor-pointer"
            >
              Save Page
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
