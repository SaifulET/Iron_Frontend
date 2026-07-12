"use client";

import React, { useState, useRef, useEffect } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { 
  ArrowLeft02Icon, 
  InformationCircleIcon, 
  LinkIcon, 
  Clock01Icon, 
  AlertCircleIcon,
  TickDouble02Icon
} from "@hugeicons/core-free-icons";
import { StaticPage } from "./types";

interface StaticPageEditorPageProps {
  editingPage: StaticPage;
  onDiscard: () => void;
  onSave: (data: Omit<StaticPage, "id" | "lastUpdated">) => void;
}

export default function StaticPageEditorPage({ editingPage, onDiscard, onSave }: StaticPageEditorPageProps) {
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState<StaticPage["status"]>("Published");
  const [langTab, setLangTab] = useState<"EN" | "GR">("EN");

  // Content states for EN and GR
  const [contentEn, setContentEn] = useState(
    `<h2>Terms & Conditions</h2><p>Last updated: 15 January 2026 · Effective date: 1 February 2026</p><h3>1. Introduction</h3><p>Welcome to Bookly.cy ("Bookly", "we", "our", "us"). These Terms & Conditions govern your use of the Bookly platform, including our website and mobile application, as a customer or business owner operating in Cyprus.</p><p>By accessing or using the platform, you agree to be bound by these Terms. If you do not agree, please discontinue use immediately.</p><h3>2. Definitions</h3><ul><li><strong>"Platform"</strong> means the Bookly.cy website and PWA application.</li><li><strong>"Customer"</strong> means any individual who registers to book services through the Platform.</li><li><strong>"Business"</strong> means any service provider registered and approved on the Platform.</li><li><strong>"Booking"</strong> means a confirmed appointment between a Customer and a Business.</li><li><strong>"Deposit"</strong> means the amount charged to a Customer on their first booking with each Business (20% of service price, minimum €5, maximum €35).</li></ul><h3>3. Commission & Deposits</h3><p>Bookly charges a commission on each Customer's first booking with a Business. This commission is collected as a deposit of 20% of the service price, subject to a minimum of <strong>€5</strong> and a maximum of <strong>€35</strong>.</p><p>This deposit is Bookly's commission and is <strong>not</strong> transferred to the Business. Subsequent bookings by the same Customer at the same Business do not incur a deposit charge, provided the customer-business relationship remains active.</p>`
  );
  
  const [contentGr, setContentGr] = useState(
    `<h2>Όροι & Προϋποθέσεις</h2><p>Τελευταία ενημέρωση: 15 Ιανουαρίου 2026 · Ημερομηνία έναρξης ισχύος: 1 Φεβρουαρίου 2026</p><h3>1. Εισαγωγή</h3><p>Καλώς ορίσατε στο Bookly.cy ("Bookly", "εμείς", "μας"). Αυτοί οι Όροι & Προϋποθέσεις διέπουν τη χρήση της πλατφόρμας Bookly, συμπεριλαμβανομένου του ιστότοπου και της εφαρμογής μας για κινητά τηλέφωνα.</p>`
  );

  const [wordCount, setWordCount] = useState(420);
  const [showLinkModal, setShowLinkModal] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [warningModal, setWarningModal] = useState<{ isOpen: boolean; message: string } | null>(null);

  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  const [isStrike, setIsStrike] = useState(false);
  const [alignment, setAlignment] = useState<"left" | "center" | "right">("left");
  const [listType, setListType] = useState<"bullet" | "ordered" | "none">("none");

  const editorRef = useRef<HTMLDivElement>(null);
  const savedSelectionRange = useRef<Range | null>(null);

  const checkActiveStates = () => {
    if (typeof document === "undefined") return;
    setIsBold(document.queryCommandState("bold"));
    setIsItalic(document.queryCommandState("italic"));
    setIsUnderline(document.queryCommandState("underline"));
    setIsStrike(document.queryCommandState("strikeThrough"));

    if (document.queryCommandState("justifyCenter")) {
      setAlignment("center");
    } else if (document.queryCommandState("justifyRight")) {
      setAlignment("right");
    } else {
      setAlignment("left");
    }

    if (document.queryCommandState("insertUnorderedList")) {
      setListType("bullet");
    } else if (document.queryCommandState("insertOrderedList")) {
      setListType("ordered");
    } else {
      setListType("none");
    }
  };

  // Initialize
  useEffect(() => {
    if (editingPage) {
      setTitle(editingPage.title);
      setSlug(editingPage.slug.replace(/^\//, ""));
      setStatus(editingPage.status);
    }
  }, [editingPage]);

  // Handle switching tabs
  const handleTabChange = (newLang: "EN" | "GR") => {
    // Save current editor contents
    if (editorRef.current) {
      if (langTab === "EN") {
        setContentEn(editorRef.current.innerHTML);
      } else {
        setContentGr(editorRef.current.innerHTML);
      }
    }
    setLangTab(newLang);
  };

  // Sync editor content when tab changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = langTab === "EN" ? contentEn : contentGr;
      updateWordCount();
    }
  }, [langTab]);

  const updateWordCount = () => {
    if (editorRef.current) {
      const text = editorRef.current.innerText || "";
      const words = text.trim().split(/\s+/).filter(Boolean);
      setWordCount(words.length);
    }
  };

  const execCommand = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    updateWordCount();
    checkActiveStates();
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleLink = () => {
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
      if (savedSelectionRange.current) {
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(savedSelectionRange.current);
        }
      }
      execCommand("createLink", linkUrl);
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

  const handlePublish = () => {
    if (editorRef.current) {
      if (langTab === "EN") {
        setContentEn(editorRef.current.innerHTML);
      } else {
        setContentGr(editorRef.current.innerHTML);
      }
    }
    onSave({
      title,
      slug: `/${slug}`,
      status,
    });
  };

  return (
    <div className="flex flex-col gap-6 font-sans w-full max-w-none h-full overflow-y-auto no-scrollbar pb-10">
      <style>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .editor-content ul {
          list-style-type: disc !important;
          margin-left: 1.5rem !important;
          padding-left: 0.5rem !important;
          margin-bottom: 1rem !important;
        }
        .editor-content ol {
          list-style-type: decimal !important;
          margin-left: 1.5rem !important;
          padding-left: 0.5rem !important;
          margin-bottom: 1rem !important;
        }
        .editor-content h1, .editor-content h1 * {
          font-size: 28px !important;
          font-weight: 700 !important;
          margin-top: 1.5rem !important;
          margin-bottom: 1rem !important;
          color: #111827 !important;
        }
        .editor-content h2, .editor-content h2 * {
          font-size: 24px !important;
          font-weight: 700 !important;
          margin-top: 1.5rem !important;
          margin-bottom: 1rem !important;
          color: #111827 !important;
        }
        .editor-content h3, .editor-content h3 * {
          font-size: 18px !important;
          font-weight: 700 !important;
          margin-top: 1.25rem !important;
          margin-bottom: 0.75rem !important;
          color: #111827 !important;
        }
        .editor-content p, .editor-content p * {
          font-size: 15px !important;
          line-height: 1.75 !important;
          color: #374151 !important;
        }
        .editor-content a {
          color: #6366F1 !important;
          text-decoration: underline !important;
        }
      `}</style>

      {/* Top Breadcrumb & Actions Row */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 flex-shrink-0 w-full">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-xs text-[#6B7280]">
            <button 
              onClick={onDiscard}
              className="flex items-center gap-1 hover:text-[#6366F1] bg-transparent border-none cursor-pointer"
            >
              <span>Content Manager</span>
            </button>
            <span className="text-[#E5E7EB]">›</span>
            <span className="text-[#6B7280]">Static Pages</span>
            <span className="text-[#E5E7EB]">›</span>
            <span className="text-[#6B7280]">{title}</span>
          </div>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <h1 className="text-[32px] font-bold text-[#111827] leading-[38px] tracking-tight">
              {title}
            </h1>
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
              status === "Published" ? "bg-green-100/60 text-[#16A34A]" : "bg-gray-100 text-gray-500"
            }`}>
              {status}
            </span>
          </div>
          <span className="text-xs text-[#6B7280] mt-0.5">
            Last edited by Georgino Mansour · 15 Jan 2026 at 14:32
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onDiscard}
            className="px-4 py-2 text-sm font-semibold text-[#6366F1] hover:underline bg-transparent border-none cursor-pointer"
          >
            Discard
          </button>
          <button
            onClick={() => {
              setStatus("Draft");
              handlePublish();
            }}
            className="px-5 py-2.5 text-sm font-semibold text-[#6366F1] bg-white border border-[#6366F1] rounded-full hover:bg-indigo-50 transition-colors cursor-pointer"
          >
            Save Draft
          </button>
          <button
            onClick={() => {
              setStatus("Published");
              handlePublish();
            }}
            className="flex items-center justify-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-[#6366F1] hover:bg-indigo-600 rounded-full transition-colors cursor-pointer border-none shadow-sm"
          >
            <HugeiconsIcon icon={TickDouble02Icon} className="w-[18px] h-[18px]" />
            <span>Publish</span>
          </button>
        </div>
      </div>

      {/* Editor & Sidebar panels container */}
      <div className="flex flex-col lg:flex-row gap-6 items-start w-full">
        {/* Left Column: Editor Tab switcher and Main Box */}
        <div className="flex-grow flex flex-col w-full lg:max-w-none bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 overflow-hidden h-[660px]">
          
          {/* Language selection tabs */}
          <div className="flex flex-row items-center border-b border-[#E5E7EB] px-4 shrink-0">
            <button
              onClick={() => handleTabChange("EN")}
              className={`h-[38px] px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-[1.5px] border-t-0 border-x-0 cursor-pointer bg-transparent flex items-center justify-center gap-2 ${
                langTab === "EN"
                  ? "border-b-[#6366F1] text-[#6366F1]"
                  : "border-b-transparent text-[#6B7280] hover:text-gray-900"
              }`}
            >
              <span className="bg-[#F0F9FF] text-[#0369A1] font-bold text-[9px] px-1 rounded">EN</span>
              English
            </button>
            <button
              onClick={() => handleTabChange("GR")}
              className={`h-[38px] px-4 py-2 text-xs font-semibold whitespace-nowrap transition-all border-b-[1.5px] border-t-0 border-x-0 cursor-pointer bg-transparent flex items-center justify-center gap-2 ${
                langTab === "GR"
                  ? "border-b-[#6366F1] text-[#6366F1]"
                  : "border-b-transparent text-[#6B7280] hover:text-gray-900"
              }`}
            >
              <span className="bg-[#FEF9C3] text-[#854D0E] font-bold text-[9px] px-1 rounded">GR</span>
              Greek
            </button>
          </div>

          {/* Editor Body */}
          <div className="flex flex-col w-full flex-grow overflow-hidden">
            {/* Toolbar block */}
            <div className="flex flex-wrap items-center justify-between gap-1 bg-[#F9FAFB] border-b border-[#E5E7EB] p-2.5 shrink-0">
              <div className="flex flex-wrap items-center gap-1">
                {/* Font selector placeholder */}
                <select
                  onChange={(e) => execCommand("formatBlock", e.target.value)}
                  className="appearance-none bg-white border border-[#E5E7EB] rounded-md px-2 py-1 text-xs font-medium text-gray-700 cursor-pointer focus:outline-none pr-6 relative"
                  defaultValue="p"
                >
                  <option value="p">Paragraph</option>
                  <option value="H2">Heading 1</option>
                  <option value="H3">Heading 2</option>
                </select>

                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={() => execCommand("bold")}
                  className={`w-7 h-7 flex items-center justify-center text-xs font-bold rounded-md cursor-pointer transition-colors ${
                    isBold
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50"
                  }`}
                  title="Bold"
                >
                  B
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("italic")}
                  className={`w-7 h-7 flex items-center justify-center text-xs font-serif italic rounded-md cursor-pointer transition-colors ${
                    isItalic
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55"
                  }`}
                  title="Italic"
                >
                  I
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("underline")}
                  className={`w-7 h-7 flex items-center justify-center text-xs underline rounded-md cursor-pointer transition-colors ${
                    isUnderline
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55"
                  }`}
                  title="Underline"
                >
                  U
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("strikeThrough")}
                  className={`w-7 h-7 flex items-center justify-center text-xs line-through rounded-md cursor-pointer transition-colors ${
                    isStrike
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55"
                  }`}
                  title="Strikethrough"
                >
                  S
                </button>

                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={() => execCommand("justifyLeft")}
                  className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                    alignment === "left"
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50"
                  }`}
                  title="Align Left"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="17" y1="10" x2="3" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="17" y1="18" x2="3" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("justifyCenter")}
                  className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                    alignment === "center"
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50"
                  }`}
                  title="Align Center"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="10" x2="6" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="18" y1="18" x2="6" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("justifyRight")}
                  className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                    alignment === "right"
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-50"
                  }`}
                  title="Align Right"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="21" y1="10" x2="7" y2="10"></line>
                    <line x1="21" y1="6" x2="3" y2="6"></line>
                    <line x1="21" y1="14" x2="3" y2="14"></line>
                    <line x1="21" y1="18" x2="7" y2="18"></line>
                  </svg>
                </button>

                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={() => execCommand("insertUnorderedList")}
                  className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                    listType === "bullet"
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55"
                  }`}
                  title="Unordered List"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="8" y1="6" x2="21" y2="6"></line>
                    <line x1="8" y1="12" x2="21" y2="12"></line>
                    <line x1="8" y1="18" x2="21" y2="18"></line>
                    <line x1="3" y1="6" x2="3.01" y2="6"></line>
                    <line x1="3" y1="12" x2="3.01" y2="12"></line>
                    <line x1="3" y1="18" x2="3.01" y2="18"></line>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("insertOrderedList")}
                  className={`w-7 h-7 flex items-center justify-center rounded-md cursor-pointer transition-colors ${
                    listType === "ordered"
                      ? "bg-[#6366F1]/10 border border-[#6366F1]/30 text-[#6366F1]"
                      : "text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55"
                  }`}
                  title="Ordered List"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="10" y1="6" x2="21" y2="6"></line>
                    <line x1="10" y1="12" x2="21" y2="12"></line>
                    <line x1="10" y1="18" x2="21" y2="18"></line>
                    <path d="M4 6H2v4h2"></path>
                    <path d="M4 10h-2"></path>
                    <path d="M6 18H2v-2h4"></path>
                  </svg>
                </button>

                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={handleLink}
                  className="w-7 h-7 flex items-center justify-center text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55 rounded cursor-pointer"
                  title="Link"
                >
                  🔗
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("formatBlock", "blockquote")}
                  className="w-7 h-7 flex items-center justify-center text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55 rounded cursor-pointer"
                  title="Quote"
                >
                  ❝
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("insertHorizontalRule")}
                  className="w-7 h-7 flex items-center justify-center text-xs text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55 rounded cursor-pointer"
                  title="Horizontal Rule"
                >
                  ―
                </button>

                <div className="w-[1px] h-5 bg-[#E5E7EB] mx-1 shrink-0" />
                <button
                  type="button"
                  onClick={() => execCommand("undo")}
                  className="w-7 h-7 flex items-center justify-center text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55 rounded cursor-pointer"
                  title="Undo"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 7v6h6"></path>
                    <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"></path>
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={() => execCommand("redo")}
                  className="w-7 h-7 flex items-center justify-center text-[#374151] bg-white border border-[#E5E7EB] hover:bg-gray-55 rounded cursor-pointer"
                  title="Redo"
                >
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 7v6h-6"></path>
                    <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"></path>
                  </svg>
                </button>
              </div>

              {/* Word counter */}
              <span className="text-xs text-[#6B7280] font-normal font-sans pr-2">
                ~{wordCount} words
              </span>
            </div>

            {/* Editable Area */}
            <div
              ref={editorRef}
              contentEditable
              onInput={updateWordCount}
              onKeyUp={checkActiveStates}
              onMouseUp={checkActiveStates}
              onFocus={checkActiveStates}
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
              className="editor-content p-8 flex-grow h-[550px] overflow-y-auto text-gray-800 focus:outline-none"
            />
          </div>
        </div>

        {/* Right Column: Sidebar Panels */}
        <div className="flex flex-col gap-4 w-full lg:w-[280px] shrink-0">
          
          {/* Panel 1: Page Info */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-3.5 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={InformationCircleIcon} className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-semibold text-[#111827] leading-4">Page Info</span>
            </div>
            <div className="flex flex-col gap-2.5 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Page</span>
                <span className="font-semibold text-[#111827]">{title}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Status</span>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-[#16A34A] font-semibold text-[10px]">
                  {status}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Languages</span>
                <span className="font-semibold text-[#111827]">EN + GR</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Last edited</span>
                <span className="text-gray-700">15 Jan 2026</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[#6B7280]">Author</span>
                <span className="text-gray-700">Georgino M.</span>
              </div>
            </div>
          </div>

          {/* Panel 2: Page URL */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={LinkIcon} className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-semibold text-[#111827] leading-4">Page URL</span>
            </div>
            <div className="flex flex-col gap-1.5 mt-0.5">
              <span className="text-xs text-[#6B7280]">bookly.cy/</span>
              <input
                type="text"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full bg-[#F9FAFB] border border-[#E5E7EB] rounded-lg px-3 h-10 text-xs font-medium text-gray-800 placeholder-[#6B7280] focus:outline-none focus:ring-1 focus:ring-[#6366F1]"
              />
              <span className="text-[10px] text-[#6B7280] leading-3 mt-0.5">
                Changing the slug will break existing links.
              </span>
            </div>
          </div>

          {/* Panel 3: Version History */}
          <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 p-5 flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={Clock01Icon} className="w-3.5 h-3.5 text-gray-700" />
              <span className="text-xs font-semibold text-[#111827] leading-4">Version History</span>
            </div>
            <div className="flex flex-col gap-3.5 mt-1 text-xs">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0.5">
                  <span className="font-semibold text-gray-800">Current version</span>
                  <span className="text-[10px] text-gray-400">15 Jan 2026 · Georgino M.</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-green-100 text-[#16A34A] font-semibold text-[9px]">
                  Live
                </span>
              </div>
              <div className="flex justify-between items-center border-t border-gray-100 pt-2.5">
                <div className="flex flex-col gap-0.5">
                  <span className="text-gray-700">v1 — Initial draft</span>
                  <span className="text-[10px] text-gray-400">10 Jan 2026 · Georgino M.</span>
                </div>
                <button
                  type="button"
                  className="text-[11px] font-semibold text-[#6366F1] bg-transparent border-none hover:underline cursor-pointer"
                >
                  Restore
                </button>
              </div>
            </div>
          </div>

          {/* Panel 4: Danger Zone */}
          <div className="bg-white rounded-xl border border-red-200 shadow-[0px_4px_12px_rgba(0,0,0,0.08)] p-5 flex flex-col gap-3 w-full">
            <div className="flex items-center gap-2">
              <HugeiconsIcon icon={AlertCircleIcon} className="w-3.5 h-3.5 text-red-600" />
              <span className="text-xs font-semibold text-red-600 leading-4">Danger Zone</span>
            </div>
            <div className="flex flex-col gap-3">
              <span className="text-[11px] text-[#6B7280] leading-4">
                Unpublishing will hide this page from all users immediately.
              </span>
              <button
                type="button"
                onClick={() => setStatus("Draft")}
                className="w-full h-9 flex items-center justify-center text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-full border-none transition-colors cursor-pointer"
              >
                Unpublish Page
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* Warning Alert Modal */}
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

      {/* Link Insertion Modal */}
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

    </div>
  );
}
