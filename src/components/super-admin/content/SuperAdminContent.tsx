"use client";

import React, { useState } from "react";
import { BlogPost, StaticPage, FaqItem } from "./types";
import BlogTab from "./BlogTab";
import StaticPagesTab from "./StaticPagesTab";
import FaqTab from "./FaqTab";
import BlogFormModal from "./BlogFormModal";
import FaqFormModal from "./FaqFormModal";
import PageFormModal from "./PageFormModal";

export default function SuperAdminContent() {
  const [activeTab, setActiveTab] = useState<"Blog" | "Static Pages" | "FAQ — Customers" | "FAQ — Businesses">("Blog");
  
  // Blog Filters state
  const [blogFilter, setBlogFilter] = useState<"All" | "Founding Partner" | "Bookly News" | "For Business" | "Customer Tips">("All");
  const [statusFilter, setStatusFilter] = useState<"All" | "Published" | "Draft">("All");

  // --- Mock Data States ---
  const [posts, setPosts] = useState<BlogPost[]>([
    {
      id: "1",
      category: "Founding Partner",
      status: "Published",
      date: "22 May 2026",
      title: "Meet Our Founding Partners: Building Cyprus's First Booking Platform",
      description: "We're proud to introduce the visionary businesses that believed in Bookly from day one. These founding partners helped shape the platform you see today...",
      fbLink: "facebook.com/bookly.cy",
      igLink: "@bookly.cy",
    },
    {
      id: "2",
      category: "Bookly News",
      status: "Published",
      date: "22 May 2026",
      title: "Bookly.cy Launches Mobile Application for Staff Members",
      description: "Staff members can now manage bookings, view schedules, and interact with customers on the go. Read more about our release notes...",
      fbLink: "facebook.com/bookly.cy",
      igLink: "@bookly.cy",
    },
    {
      id: "3",
      category: "Bookly News",
      status: "Draft",
      date: "22 May 2026",
      title: "Upcoming Features: SMS Reminders & Multi-location Support",
      description: "We are testing automated SMS alerts to drastically reduce client no-shows. Learn how to configure this for your branch...",
      fbLink: "facebook.com/bookly.cy",
      igLink: "@bookly.cy",
    },
  ]);

  const [staticPages, setStaticPages] = useState<StaticPage[]>([
    { id: "1", title: "Terms & Conditions", slug: "/terms-of-service", status: "Published", lastUpdated: "15 Jan 2026" },
    { id: "2", title: "Privacy Policy (GDPR)", slug: "/privacy", status: "Published", lastUpdated: "15 Jan 2026" },
    { id: "3", title: "Cookie Policy", slug: "/cookies", status: "Published", lastUpdated: "15 Jan 2026" },
  ]);

  const [customerFaqs, setCustomerFaqs] = useState<FaqItem[]>([
    { id: "1", question: "What is the deposit for?", answer: "A small deposit (up to €35) is charged on your first booking to verify your card details.", status: "Published" },
    { id: "2", question: "How do I book an appointment?", answer: "Search for a business, choose a service and time, and confirm your booking.", status: "Published" },
    { id: "3", question: "Can I cancel a booking?", answer: "Yes, within the business's cancellation window. If cancelled in time, your deposit will be refunded.", status: "Published" },
  ]);

  const [businessFaqs, setBusinessFaqs] = useState<FaqItem[]>([
    { id: "1", question: "How do I set my staff working hours?", answer: "Go to staff section inside your business portal dashboard to configure custom shifts.", status: "Published" },
  ]);

  // --- Modals Toggle & Editing Item state ---
  const [showBlogModal, setShowBlogModal] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  const [showFaqModal, setShowFaqModal] = useState(false);
  const [editingFaq, setEditingFaq] = useState<FaqItem | null>(null);

  const [showPageModal, setShowPageModal] = useState(false);
  const [editingPage, setEditingPage] = useState<StaticPage | null>(null);

  // --- Blog Handlers ---
  const handleSavePost = (e: React.FormEvent, data: Omit<BlogPost, "id" | "date">) => {
    e.preventDefault();
    if (editingPost) {
      setPosts((prev) =>
        prev.map((p) => (p.id === editingPost.id ? { ...p, ...data } : p))
      );
    } else {
      const newPost: BlogPost = {
        id: String(posts.length + 1),
        date: "22 May 2026",
        ...data,
      };
      setPosts([newPost, ...posts]);
    }
    setShowBlogModal(false);
  };

  const handleDeletePost = (id: string) => {
    if (confirm("Are you sure you want to delete this post?")) {
      setPosts((prev) => prev.filter((p) => p.id !== id));
    }
  };

  // --- FAQ Handlers ---
  const handleSaveFaq = (e: React.FormEvent, data: { question: string; answer: string }) => {
    e.preventDefault();
    const isCustomer = activeTab === "FAQ — Customers";
    const faqSetter = isCustomer ? setCustomerFaqs : setBusinessFaqs;

    if (editingFaq) {
      faqSetter((prev) =>
        prev.map((f) => (f.id === editingFaq.id ? { ...f, ...data } : f))
      );
    } else {
      const newFaq: FaqItem = {
        id: String(Date.now()),
        status: "Published",
        ...data,
      };
      faqSetter((prev) => [...prev, newFaq]);
    }
    setShowFaqModal(false);
  };

  const handleDeleteFaq = (id: string) => {
    if (confirm("Are you sure you want to delete this FAQ?")) {
      const isCustomer = activeTab === "FAQ — Customers";
      const faqSetter = isCustomer ? setCustomerFaqs : setBusinessFaqs;
      faqSetter((prev) => prev.filter((f) => f.id !== id));
    }
  };

  // --- Static Page Handlers ---
  const handleSavePage = (e: React.FormEvent, data: Omit<StaticPage, "id" | "lastUpdated">) => {
    e.preventDefault();
    if (editingPage) {
      setStaticPages((prev) =>
        prev.map((sp) => (sp.id === editingPage.id ? { ...sp, ...data, lastUpdated: "15 Jan 2026" } : sp))
      );
    } else {
      const newPage: StaticPage = {
        id: String(Date.now()),
        lastUpdated: "15 Jan 2026",
        ...data,
      };
      setStaticPages((prev) => [...prev, newPage]);
    }
    setShowPageModal(false);
  };

  const handleDeletePage = (id: string) => {
    if (confirm("Are you sure you want to delete this Static Page?")) {
      setStaticPages((prev) => prev.filter((sp) => sp.id !== id));
    }
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

      {/* Heading Title Container */}
      <div className="flex flex-col gap-1 flex-shrink-0">
        <h1 className="text-[32px] font-bold text-[#111827] leading-[38px] tracking-tight">
          Content Manager
        </h1>
        <p className="text-sm font-normal text-[#6B7280] leading-[17px]">
          Manage category wording, static pages, and FAQs.
        </p>
      </div>

      {/* Main Navigation Sub-tabs Container */}
      <div className="flex flex-row items-center border-b border-[#E5E7EB] h-[38px] gap-1 flex-shrink-0 w-full overflow-x-auto no-scrollbar">
        {(["Blog", "Static Pages", "FAQ — Customers", "FAQ — Businesses"] as const).map((tab) => {
          const isActive = activeTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`h-[38px] px-4 py-2 text-sm font-medium whitespace-nowrap transition-all border-b border-t-0 border-x-0 cursor-pointer bg-transparent flex items-center justify-center gap-1.5 ${
                isActive
                  ? "border-b-[1.06667px] border-b-[#6366F1] text-[#6366F1]"
                  : "border-b-transparent text-[#6B7280] hover:text-gray-900"
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Dynamic Tab Render */}
      <div className="flex-grow">
        {activeTab === "Blog" && (
          <BlogTab
            posts={posts}
            blogFilter={blogFilter}
            setBlogFilter={setBlogFilter}
            statusFilter={statusFilter}
            setStatusFilter={setStatusFilter}
            onEdit={(post) => {
              setEditingPost(post);
              setShowBlogModal(true);
            }}
            onDelete={handleDeletePost}
            onNewPost={() => {
              setEditingPost(null);
              setShowBlogModal(true);
            }}
          />
        )}

        {activeTab === "Static Pages" && (
          <StaticPagesTab
            staticPages={staticPages}
            onEdit={(page) => {
              setEditingPage(page);
              setShowPageModal(true);
            }}
          />
        )}

        {(activeTab === "FAQ — Customers" || activeTab === "FAQ — Businesses") && (
          <FaqTab
            faqs={activeTab === "FAQ — Customers" ? customerFaqs : businessFaqs}
            onEdit={(faq) => {
              setEditingFaq(faq);
              setShowFaqModal(true);
            }}
            onDelete={handleDeleteFaq}
            onNewFaq={() => {
              setEditingFaq(null);
              setShowFaqModal(true);
            }}
          />
        )}
      </div>

      {/* Modals Mounting */}
      <BlogFormModal
        show={showBlogModal}
        onClose={() => setShowBlogModal(false)}
        onSave={handleSavePost}
        editingPost={editingPost}
      />

      <FaqFormModal
        show={showFaqModal}
        onClose={() => setShowFaqModal(false)}
        onSave={handleSaveFaq}
        editingFaq={editingFaq}
      />

      <PageFormModal
        show={showPageModal}
        onClose={() => setShowPageModal(false)}
        onSave={handleSavePage}
        editingPage={editingPage}
      />
    </div>
  );
}
