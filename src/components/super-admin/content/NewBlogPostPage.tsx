"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ArrowLeft02Icon, 
  Tag01Icon, 
  TickDouble02Icon, 
  ImageAddIcon, 
  LinkIcon,
  StarIcon,
  Book02Icon,
  PencilEdit01Icon,
  Facebook02Icon,
  InstagramIcon
} from "@hugeicons/core-free-icons";
import { BlogPost } from "./types";

interface NewBlogPostPageProps {
  editingPost: BlogPost | null;
  onDiscard: () => void;
  onSave: (data: Omit<BlogPost, "id" | "date">) => void;
}

export default function NewBlogPostPage({ editingPost, onDiscard, onSave }: NewBlogPostPageProps) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<BlogPost["category"]>("Founding Partner");
  const [status, setStatus] = useState<BlogPost["status"]>("Published");
  const [fbLink, setFormFbLink] = useState("");
  const [igLink, setFormIgLink] = useState("");
  
  // Media state
  const [images, setImages] = useState<Array<{ id: string; url: string; type: "cover" | "img2" }>>([]);

  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [warningModal, setWarningModal] = useState<{ isOpen: boolean; message: string } | null>(null);

  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedSelectionRange = useRef<Range | null>(null);

  // File upload logic
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const hasCover = images.some((img) => img.type === "cover");
      const newFiles = Array.from(e.target.files).map((file, index) => ({
        id: String(Date.now() + index),
        url: URL.createObjectURL(file),
        type: (!hasCover && index === 0) ? ("cover" as const) : ("img2" as const),
      }));
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files) {
      const hasCover = images.some((img) => img.type === "cover");
      const newFiles = Array.from(e.dataTransfer.files).map((file, index) => ({
        id: String(Date.now() + index),
        url: URL.createObjectURL(file),
        type: (!hasCover && index === 0) ? ("cover" as const) : ("img2" as const),
      }));
      setImages((prev) => [...prev, ...newFiles]);
    }
  };

  // Load editing post data if editing
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setCategory(editingPost.category);
      setStatus(editingPost.status);
      setFormFbLink(editingPost.fbLink || "");
      setFormIgLink(editingPost.igLink || "");
      if (editorRef.current) {
        editorRef.current.innerHTML = editingPost.description;
      }
    } else {
      setTitle("");
      setCategory("Founding Partner");
      setStatus("Published");
      setFormFbLink("");
      setFormIgLink("");
      if (editorRef.current) {
        editorRef.current.innerHTML = "";
      }
    }
  }, [editingPost]);

  // Rich editor actions using document.execCommand
  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleLink = () => {
    // Capture selection before modal opens
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      savedSelectionRange.current = selection.getRangeAt(0);
    } else {
      savedSelectionRange.current = null;
    }
    setLinkUrl("");
    setShowLinkModal(true);
  };

  const handleSaveLink = (e: React.FormEvent) => {
    e.preventDefault();
    if (linkUrl) {
      if (editorRef.current) {
        editorRef.current.focus();
      }
      // Restore selection range
      if (savedSelectionRange.current) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(savedSelectionRange.current);
        }
      }
      execCommand("createLink", linkUrl);

      // Add target="_blank" to new links inside the editor
      if (editorRef.current) {
        const anchors = editorRef.current.getElementsByTagName("a");
        for (let i = 0; i < anchors.length; i++) {
          if (!anchors[i].getAttribute("target")) {
            anchors[i].setAttribute("target", "_blank");
            anchors[i].setAttribute("rel", "noopener noreferrer");
          }
        }
      }
    }
    setShowLinkModal(false);
  };

  const handleDivider = () => {
    execCommand("insertHorizontalRule");
  };

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    const contentText = editorRef.current ? editorRef.current.innerHTML : "";
    if (!title || !contentText) {
      setWarningModal({ isOpen: true, message: "Please enter a title and content." });
      return;
    }
    onSave({
      title,
      category,
      status,
      description: contentText.replace(/<[^>]*>/g, ""), // text preview
      fbLink,
      igLink,
    });
  };

  return (
    <div className="flex flex-col gap-6 font-sans w-full max-w-none h-full overflow-y-auto no-scrollbar pb-10">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .editor-content:empty:before {
          content: "Write your blog post content in English... Start with an engaging introduction, then build your story section by section.";
          color: #757575;
          font-style: normal;
        }
        .editor-content ul {
          list-style-type: disc !important;
          margin-left: 1.5rem !important;
          padding-left: 0.5rem !important;
        }
        .editor-content ol {
          list-style-type: decimal !important;
          margin-left: 1.5rem !important;
          padding-left: 0.5rem !important;
        }
        .editor-content a {
          color: #6366F1 !important;
          text-decoration: underline !important;
          font-weight: 500;
        }
      `}</style>

      {/* Top Header Actions Row */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 flex-shrink-0 w-full">
        {/* Breadcrumb & Title */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <button 
              onClick={onDiscard}
              className="flex items-center gap-1 hover:text-[#6366F1] bg-transparent border-none cursor-pointer"
            >
              <HugeiconsIcon icon={ArrowLeft02Icon} className="w-3.5 h-3.5" />
              <span>Content Manager</span>
            </button>
            <span className="text-[#6B7280]">›</span>
            <span className="text-[#6B7280]">New Post</span>
          </div>
          <h1 className="text-2xl font-bold text-[#111827] leading-9">
            {editingPost ? "Edit Blog Post" : "New Blog Post"}
          </h1>
        </div>

        {/* Buttons Row */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onDiscard}
            className="px-4 py-2 text-sm font-semibold text-[#6366F1] hover:underline bg-transparent border-none cursor-pointer"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={(e) => {
              setStatus("Draft");
              handlePublish(e);
            }}
            className="px-5 py-2.5 text-sm font-semibold text-[#6366F1] bg-white border border-[#6366F1] rounded-full hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            Save as Draft
          </button>
          <button
            type="button"
            onClick={(e) => {
              setStatus("Published");
              handlePublish(e);
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#6366F1] hover:bg-indigo-600 rounded-full transition-colors cursor-pointer border-none shadow-sm"
          >
            <HugeiconsIcon icon={TickDouble02Icon} className="w-[18px] h-[18px]" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Editor & Right Sidebar Panels */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Column: Input and Editor */}
        <div className="flex-grow flex flex-col gap-5 w-full lg:max-w-none">
          {/* Post Title Container */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-1.5 w-full">
            <label className="text-xs font-semibold text-[#374151] leading-4">
              Post Title — English (EN)
            </label>
            <input
              type="text"
              placeholder="Enter post title in English..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 h-11 text-base font-semibold text-gray-800 placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
            />
          </div>

          {/* Quill Text Editor Container */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-6 flex flex-col gap-3 w-full">
            {/* Editor Label */}
            <div className="flex items-center gap-2 h-5">
              <div className="flex items-center justify-center bg-[#F0F9FF] rounded px-1.5 py-0.5 shrink-0 select-none">
                <span className="text-[10px] font-bold text-[#0369A1] leading-3">EN</span>
              </div>
              <span className="text-xs font-semibold text-[#374151] leading-4">
                Content — English
              </span>
            </div>

            {/* Custom Quill Editor Frame */}
            <div className="w-full border border-[#E5E7EB] rounded-lg overflow-hidden flex flex-col min-h-[300px]">
              {/* Rich-text Editor Toolbar */}
              <div className="flex flex-wrap items-center gap-1 bg-[#F9FAFB] border-b border-[#E5E7EB] p-2 shrink-0">
                <button
                  type="button"
                  onClick={() => execCommand("bold")}
                  className="px-2.5 py-1 text-xs font-bold text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer"
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("italic")}
                  className="px-2.5 py-1 text-xs font-serif italic text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer"
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("underline")}
                  className="px-2.5 py-1 text-xs underline text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer"
                  title="Underline"
                >
                  U
                </button>
                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={() => execCommand("formatBlock", "H1")}
                  className="px-2.5 py-1 text-xs font-bold text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer"
                  title="H1"
                >
                  H1
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("formatBlock", "H2")}
                  className="px-2.5 py-1 text-xs font-bold text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer"
                  title="H2"
                >
                  H2
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("formatBlock", "H3")}
                  className="px-2.5 py-1 text-xs font-bold text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer"
                  title="H3"
                >
                  H3
                </button>
                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={() => execCommand("insertUnorderedList")}
                  className="px-2 py-1 text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer flex items-center gap-0.5"
                  title="Bullet List"
                >
                  • List
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("insertOrderedList")}
                  className="px-2 py-1 text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer flex items-center gap-0.5"
                  title="Numbered List"
                >
                  1. List
                </button>
                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={handleLink}
                  className="px-2.5 py-1 text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer flex items-center gap-0.5"
                  title="Link"
                >
                  🔗 Link
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("formatBlock", "blockquote")}
                  className="px-2.5 py-1 text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer flex items-center gap-0.5"
                  title="Quote"
                >
                  ❝ Quote
                </button>
                <button
                  type="button"
                  onClick={handleDivider}
                  className="px-2.5 py-1 text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50 rounded cursor-pointer flex items-center gap-0.5"
                  title="Divider"
                >
                  — Divider
                </button>
              </div>

              {/* Text Editor Area */}
              <div
                ref={editorRef}
                contentEditable
                onClick={(e) => {
                  const target = e.target as HTMLElement;
                  if (target.tagName === "A") {
                    e.preventDefault();
                    const href = target.getAttribute("href");
                    if (href) {
                      window.open(href, "_blank", "noopener,noreferrer");
                    }
                  }
                }}
                className="editor-content p-4 flex-grow text-[15px] font-normal leading-[26px] text-gray-800 focus:outline-none min-h-[220px]"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="flex flex-col gap-5 w-full lg:w-[320px] shrink-0">
          
          {/* Panel 1: Blog Type */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-3.5 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Tag01Icon} className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-semibold text-[#111827] leading-4">Blog Type</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {[
                { type: "Founding Partner", sub: "Business spotlight stories", bg: "rgba(245, 197, 24, 0.15)", text: "#92400E" },
                { type: "Bookly News", sub: "Platform updates & announcements", bg: "rgba(37, 99, 235, 0.1)", text: "#1D4ED8" },
                { type: "Customer Tips", sub: "Platform updates & announcements", bg: "rgba(37, 99, 235, 0.1)", text: "#1D4ED8" },
                { type: "For Business", sub: "Platform updates & announcements", bg: "rgba(37, 99, 235, 0.1)", text: "#1D4ED8" }
              ].map((item) => {
                const isSelected = category === item.type;
                return (
                  <button
                    key={item.type}
                    type="button"
                    onClick={() => setCategory(item.type as any)}
                    className={`flex items-center gap-3 p-2.5 rounded-lg border text-left cursor-pointer transition-colors w-full ${
                      isSelected ? "border-[#6366F1] bg-[#6366F1]/5" : "border-[#E5E7EB] bg-white hover:bg-gray-50"
                    }`}
                  >
                    <div 
                      className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center"
                      style={{ backgroundColor: item.bg }}
                    >
                      <HugeiconsIcon icon={StarIcon} className="w-4 h-4" style={{ color: item.text }} />
                    </div>
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-xs font-semibold text-[#111827] leading-4">{item.type}</span>
                      <span className="text-[11px] font-normal text-[#6B7280] leading-3 truncate">{item.sub}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel 2: Status */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-3.5 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={TickDouble02Icon} className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-semibold text-[#111827] leading-4">Status</span>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { val: "Draft", sub: "Saved but not visible on platform", color: "#6B7280" },
                { val: "Published", sub: "Visible to all users on platform", color: "#16A34A" }
              ].map((item) => {
                const isSelected = status === item.val;
                return (
                  <button
                    key={item.val}
                    type="button"
                    onClick={() => setStatus(item.val as any)}
                    className={`flex items-center gap-2.5 p-2.5 rounded-lg border text-left cursor-pointer transition-colors w-full ${
                      isSelected ? "border-[#6366F1] bg-[#6366F1]/5" : "border-[#E5E7EB] bg-white hover:bg-gray-55"
                    }`}
                  >
                    <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                    <div className="flex flex-col gap-0.5 min-w-0">
                      <span className="text-xs font-semibold text-[#111827] leading-4">{item.val}</span>
                      <span className="text-[11px] font-normal text-[#6B7280] leading-3 truncate">{item.sub}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Panel 3: Media */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-3.5 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={ImageAddIcon} className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-semibold text-[#111827] leading-4">Media</span>
            </div>

            {/* Upload Area */}
            <div 
              onClick={() => fileInputRef.current?.click()}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="w-full h-[109.13px] bg-[#F9FAFB] border border-dashed border-[#E5E7EB] rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-gray-50/50 transition-colors"
            >
              <input 
                type="file" 
                multiple 
                accept="image/*" 
                className="hidden" 
                ref={fileInputRef}
                onChange={handleFileChange}
              />
              <HugeiconsIcon icon={ImageAddIcon} className="w-6 h-6 text-gray-500" />
              <span className="text-xs font-semibold text-[#374151] leading-4">Upload images</span>
              <span className="text-[11px] text-[#6B7280] leading-3">Drop here or click · PNG, JPG, WebP</span>
            </div>

            {/* Thumbnail previews */}
            <div className="flex items-center gap-2 w-full flex-wrap">
              {images.map((img) => (
                <div key={img.id} className="relative w-[88px] h-[66px] rounded-lg overflow-hidden shrink-0 border border-gray-150">
                  <img src={img.url} className="w-full h-full object-cover" alt="Uploaded Thumbnail" />

                  {img.type === "cover" && (
                    <div className="absolute top-1 left-1 bg-black/60 text-white font-normal text-[9px] px-1.5 py-0.5 rounded">
                      Cover
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => setImages((prev) => prev.filter((i) => i.id !== img.id))}
                    className="absolute top-1 right-1 w-4.5 h-4.5 bg-black/55 hover:bg-black/80 rounded-full flex items-center justify-center text-white text-[9px] cursor-pointer border-none"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
            <span className="text-[11px] font-normal text-[#6B7280] leading-3 mt-1">
              First image = cover photo. Multiple allowed.
            </span>
          </div>

          {/* Panel 4: Social Links */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-3.5 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={LinkIcon} className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-semibold text-[#111827] leading-4">Social Links</span>
            </div>
            <div className="flex flex-col gap-3">
              {/* Facebook Link */}
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={Facebook02Icon} className="w-3.5 h-3.5 text-[#1877F2]" />
                  <label className="text-xs font-semibold text-[#374151] leading-4">Facebook Post URL</label>
                </div>
                <input
                  type="text"
                  value={fbLink}
                  onChange={(e) => setFormFbLink(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 h-11 text-xs font-medium text-gray-800 placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                />
              </div>

              {/* Instagram Link */}
              <div className="flex flex-col gap-1.5 w-full">
                <div className="flex items-center gap-1.5">
                  <HugeiconsIcon icon={InstagramIcon} className="w-3.5 h-3.5 text-[#E1306C]" />
                  <label className="text-xs font-semibold text-[#374151] leading-4">Instagram Post URL</label>
                </div>
                <input
                  type="text"
                  value={igLink}
                  onChange={(e) => setFormIgLink(e.target.value)}
                  className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 h-11 text-xs font-medium text-gray-800 placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                />
              </div>
            </div>
          </div>

        </div>
      </div>

      {showLinkModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-[400px] rounded-xl overflow-hidden shadow-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center shrink-0">
              <h3 className="font-bold text-base text-[#111827]">Insert Link</h3>
              <button
                type="button"
                onClick={() => setShowLinkModal(false)}
                className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <form onSubmit={handleSaveLink} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-gray-700">URL</label>
                <input
                  type="text"
                  placeholder="https://example.com"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
                  autoFocus
                />
              </div>
              <div className="flex justify-end gap-2 mt-2 pt-2 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setShowLinkModal(false)}
                  className="px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 text-xs font-semibold text-gray-600 border-none cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-full bg-[#6366F1] hover:bg-indigo-650 text-xs font-semibold text-white border-none cursor-pointer"
                >
                  Insert Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {warningModal?.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white w-[380px] rounded-xl overflow-hidden shadow-xl p-6 flex flex-col gap-4">
            <div className="flex justify-between items-center shrink-0">
              <h3 className="font-bold text-base text-[#111827]">Validation Error</h3>
              <button
                type="button"
                onClick={() => setWarningModal(null)}
                className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-sm text-gray-600 leading-5">
              {warningModal.message}
            </p>
            <div className="flex justify-end mt-2 pt-2 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setWarningModal(null)}
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
