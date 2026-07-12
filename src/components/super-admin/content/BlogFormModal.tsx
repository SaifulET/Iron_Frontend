"use client";

import React, { useState, useEffect } from "react";
import { BlogPost } from "./types";

interface BlogFormModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (e: React.FormEvent, data: {
    category: BlogPost["category"];
    status: BlogPost["status"];
    title: string;
    description: string;
    fbLink: string;
    igLink: string;
  }) => void;
  editingPost: BlogPost | null;
}

export default function BlogFormModal({ show, onClose, onSave, editingPost }: BlogFormModalProps) {
  const [formCategory, setFormCategory] = useState<BlogPost["category"]>("Founding Partner");
  const [formStatus, setFormStatus] = useState<BlogPost["status"]>("Published");
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formFbLink, setFormFbLink] = useState("facebook.com/bookly.cy");
  const [formIgLink, setFormIgLink] = useState("@bookly.cy");

  useEffect(() => {
    if (editingPost) {
      setFormCategory(editingPost.category);
      setFormStatus(editingPost.status);
      setFormTitle(editingPost.title);
      setFormDescription(editingPost.description);
      setFormFbLink(editingPost.fbLink);
      setFormIgLink(editingPost.igLink);
    } else {
      setFormCategory("Founding Partner");
      setFormStatus("Published");
      setFormTitle("");
      setFormDescription("");
      setFormFbLink("facebook.com/bookly.cy");
      setFormIgLink("@bookly.cy");
    }
  }, [editingPost, show]);

  if (!show) return null;

  const handleSubmit = (e: React.FormEvent) => {
    onSave(e, {
      category: formCategory,
      status: formStatus,
      title: formTitle,
      description: formDescription,
      fbLink: formFbLink,
      igLink: formIgLink,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white w-full max-w-lg rounded-xl overflow-hidden shadow-xl flex flex-col max-h-[90vh]">
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center shrink-0">
          <h3 className="font-bold text-base text-[#111827]">
            {editingPost ? "Edit Post" : "Create New Post"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-5 flex-grow overflow-y-auto flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Category</label>
            <select
              value={formCategory}
              onChange={(e) => setFormCategory(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
            >
              <option value="Founding Partner">Founding Partner</option>
              <option value="Bookly News">Bookly News</option>
              <option value="For Business">For Business</option>
              <option value="Customer Tips">Customer Tips</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Status</label>
            <select
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value as any)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
            >
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Title</label>
            <input
              type="text"
              placeholder="Enter post title"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs font-bold text-gray-500 uppercase">Description Preview</label>
            <textarea
              placeholder="Enter short preview description..."
              value={formDescription}
              onChange={(e) => setFormDescription(e.target.value)}
              rows={4}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1] resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Facebook Handle</label>
              <input
                type="text"
                value={formFbLink}
                onChange={(e) => setFormFbLink(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs font-bold text-gray-500 uppercase">Instagram Handle</label>
              <input
                type="text"
                value={formIgLink}
                onChange={(e) => setFormIgLink(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2 mt-4 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="text-xs font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-4 py-2.5 rounded-full transition-colors cursor-pointer border-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs font-semibold text-white bg-[#6366F1] hover:bg-indigo-650 px-4 py-2.5 rounded-full transition-colors cursor-pointer border-none"
            >
              Save Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
