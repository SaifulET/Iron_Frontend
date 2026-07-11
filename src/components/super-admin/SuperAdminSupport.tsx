"use client";

import React, { useState, useRef, useEffect } from "react";

interface Ticket {
  id: string;
  subject: string;
  preview: string;
  fromName: string;
  fromRole: "Customer" | "Business";
  fromInitials: string;
  status: "Open" | "Pending" | "Resolved" | "Closed";
  lastMessage: string;
  created: string;
}

interface Message {
  sender: "customer" | "admin";
  senderName: string;
  senderInitials: string;
  avatarBg: string;
  time: string;
  dateGroup: string;
  body: string;
  subject?: string;
}

export default function SuperAdminSupport() {
  const [activeSubTab, setActiveSubTab] = useState<"All" | "Open" | "Pending" | "Resolved" | "Closed">("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<"All" | "Customer" | "Business">("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [currentPage, setCurrentPage] = useState(1);

  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyText, setReplyText] = useState("");

  // Mock Ticket Data
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: "1",
      subject: "Deposit not refunded after cancellation",
      preview: "I cancelled my appointment with Nails by Sofia 3 days ago...",
      fromName: "Maria Christodoulou",
      fromRole: "Customer",
      fromInitials: "MC",
      status: "Pending",
      lastMessage: "2 min ago",
      created: "31 May 2026",
    },
    {
      id: "2",
      subject: "Payout failed for last week bookings",
      preview: "Our studio did not receive the automatic payout scheduled for Friday...",
      fromName: "Glam Studio",
      fromRole: "Business",
      fromInitials: "GS",
      status: "Open",
      lastMessage: "15 min ago",
      created: "30 May 2026",
    },
    {
      id: "3",
      subject: "Cannot update staff working hours",
      preview: "Every time I try to save the updated Saturday shifts, it throws a network error...",
      fromName: "Chic Salon",
      fromRole: "Business",
      fromInitials: "CS",
      status: "Resolved",
      lastMessage: "2 hours ago",
      created: "29 May 2026",
    },
    {
      id: "4",
      subject: "Duplicate booking charges on credit card",
      preview: "I was charged twice for my haircut appointment at Hair Craft...",
      fromName: "Andreas Georgiou",
      fromRole: "Customer",
      fromInitials: "AG",
      status: "Closed",
      lastMessage: "1 day ago",
      created: "28 May 2026",
    },
    {
      id: "5",
      subject: "App crash during slot reservation",
      preview: "The screen freezes on the checkout screen after entering my card details...",
      fromName: "Eleni Petridou",
      fromRole: "Customer",
      fromInitials: "EP",
      status: "Open",
      lastMessage: "4 hours ago",
      created: "30 May 2026",
    },
    {
      id: "6",
      subject: "VAT invoice request for invoice #20342",
      preview: "We need the official VAT invoice with our updated tax registration number...",
      fromName: "Luxury Spa",
      fromRole: "Business",
      fromInitials: "LS",
      status: "Pending",
      lastMessage: "5 hours ago",
      created: "31 May 2026",
    },
  ]);

  // Chat conversation messages dictionary
  const [ticketMessages, setTicketMessages] = useState<{ [ticketId: string]: Message[] }>({
    "1": [
      {
        sender: "customer",
        senderName: "Maria C.",
        senderInitials: "MC",
        avatarBg: "bg-[#F9FAFB] border border-[#E5E7EB]",
        time: "09:14",
        dateGroup: "31 May 2026",
        subject: "Subject of the message",
        body: "Hello, I cancelled my appointment with Nails by Sofia 3 days ago and still haven't received my deposit refund. The booking was BK-3421. Can you please check what's happening?",
      },
      {
        sender: "admin",
        senderName: "Georgino M. (Admin)",
        senderInitials: "GM",
        avatarBg: "bg-[#EEF2FF]",
        time: "09:25",
        dateGroup: "31 May 2026",
        body: "Hi Maria, thank you for reaching out. I can see that a refund was initiated on 28 May for booking BK-3421. It appears there was a technical issue on our end with the processing. I'm resubmitting it now and you should see the funds within 3-5 business days. I'll follow up once confirmed.",
      },
      {
        sender: "customer",
        senderName: "Maria C.",
        senderInitials: "MC",
        avatarBg: "bg-[#F9FAFB] border border-[#E5E7EB]",
        time: "09:31",
        dateGroup: "31 May 2026",
        body: "Thank you for the quick response. I appreciate it! I'll wait for the confirmation.",
      },
      {
        sender: "customer",
        senderName: "Maria C.",
        senderInitials: "MC",
        avatarBg: "bg-[#F9FAFB] border border-[#E5E7EB]",
        time: "2 min ago",
        dateGroup: "Just now",
        body: "Hi again — it's been 3 days since your last message. I still haven't received the refund. Can you provide an update?",
      },
    ],
  });

  // Auto-scrolling Ref & Effect
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedTicket, ticketMessages]);

  // Get or dynamically initialize message history
  const getMessagesForTicket = (ticketId: string): Message[] => {
    if (ticketMessages[ticketId]) {
      return ticketMessages[ticketId];
    }
    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket) return [];
    return [
      {
        sender: "customer",
        senderName: ticket.fromName,
        senderInitials: ticket.fromInitials,
        avatarBg: "bg-[#F9FAFB] border border-[#E5E7EB]",
        time: "09:14",
        dateGroup: ticket.created,
        subject: ticket.subject,
        body: ticket.preview,
      },
    ];
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendReply();
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedTicket) return;

    const newMessage: Message = {
      sender: "admin",
      senderName: "Georgino M. (Admin)",
      senderInitials: "GM",
      avatarBg: "bg-[#EEF2FF]",
      time: "Just now",
      dateGroup: "Just now",
      body: replyText,
    };

    setTicketMessages((prev) => ({
      ...prev,
      [selectedTicket.id]: [...getMessagesForTicket(selectedTicket.id), newMessage],
    }));

    // Update tickets array with last reply time
    setTickets((prevTickets) =>
      prevTickets.map((t) =>
        t.id === selectedTicket.id ? { ...t, lastMessage: "Just now" } : t
      )
    );

    setReplyText("");
  };

  const updateTicketStatus = (status: Ticket["status"]) => {
    if (!selectedTicket) return;
    setTickets((prevTickets) =>
      prevTickets.map((t) => (t.id === selectedTicket.id ? { ...t, status } : t))
    );
    setSelectedTicket((prev) => (prev ? { ...prev, status } : null));
  };

  // Filtering tickets
  const filteredTickets = tickets.filter((ticket) => {
    // Sub-tab filter
    if (activeSubTab !== "All" && ticket.status !== activeSubTab) return false;

    // Role filter dropdown
    if (roleFilter !== "All" && ticket.fromRole !== roleFilter) return false;

    // Search query
    const matchSearch =
      ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.preview.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ticket.fromName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchSearch;
  });

  // Sort logic
  const sortedTickets = [...filteredTickets].sort((a, b) => {
    if (sortOrder === "newest") {
      return b.id.localeCompare(a.id);
    } else {
      return a.id.localeCompare(b.id);
    }
  });

  // Dynamic aggregates
  const totalCount = tickets.length;
  const openCount = tickets.filter((t) => t.status === "Open").length;
  const pendingCount = tickets.filter((t) => t.status === "Pending").length;
  const resolvedCount = tickets.filter((t) => t.status === "Resolved").length;
  const closedCount = tickets.filter((t) => t.status === "Closed").length;

  if (selectedTicket) {
    const messages = getMessagesForTicket(selectedTicket.id);

    return (
      <div className="flex flex-col bg-white h-full w-full border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Chat top header container */}
        <div className="flex flex-row justify-between items-center px-3 md:px-6 py-2.5 md:h-16 bg-white border-b border-[#E5E7EB] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] w-full gap-2 flex-shrink-0">
          <div className="flex items-center gap-2 md:gap-4 min-w-0">
            {/* Back Button */}
            <button
              onClick={() => setSelectedTicket(null)}
              className="flex flex-row items-center gap-1 px-1.5 py-1 hover:bg-gray-55 rounded-lg transition-colors border-none text-[#6B7280] shrink-0"
            >
              <svg
                className="w-4 h-4 stroke-[#6B7280]"
                fill="none"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="font-sans font-medium text-xs leading-4 hidden sm:inline">Back</span>
            </button>

            {/* Divider line */}
            <div className="h-5 w-[1px] bg-gray-200" />

            {/* Sender / Ticket Identity */}
            <div className="flex items-center gap-1.5 md:gap-3 min-w-0">
              <div className="flex justify-center items-center w-8 h-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full shrink-0 font-sans font-bold text-xs text-[#374151] select-none">
                {selectedTicket.fromInitials}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="font-sans font-semibold text-xs md:text-sm text-[#111827] leading-[15px] truncate">
                  {selectedTicket.fromName}
                </span>
                <span className="font-sans font-normal text-[10px] md:text-xs text-[#6B7280] leading-[12px] mt-0.5">
                  T-10{selectedTicket.id}
                </span>
              </div>

              {/* Status Badge */}
              <div className="flex items-center h-4.5 bg-blue-55/10 rounded-full px-2 gap-1 relative shrink-0">
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    selectedTicket.status === "Open"
                      ? "bg-[#2563EB]"
                      : selectedTicket.status === "Pending"
                      ? "bg-[#D97706]"
                      : selectedTicket.status === "Resolved"
                      ? "bg-[#16A34A]"
                      : "bg-[#DC2626]"
                  }`}
                />
                <span
                  className={`font-sans font-semibold text-[10px] leading-[12px] ${
                    selectedTicket.status === "Open"
                      ? "text-[#2563EB]"
                      : selectedTicket.status === "Pending"
                      ? "text-[#D97706]"
                      : selectedTicket.status === "Resolved"
                      ? "text-[#16A34A]"
                      : "text-[#DC2626]"
                  }`}
                >
                  {selectedTicket.status}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons on the right */}
          <div className="flex flex-row items-center gap-1.5 shrink-0">
            {/* Status Dropdown */}
            <div className="relative">
              <select
                value={selectedTicket.status}
                onChange={(e) => updateTicketStatus(e.target.value as any)}
                className="appearance-none bg-white border border-[#111111]/30 rounded-xl px-2.5 py-1 pr-7 text-xs font-medium text-[#111111]/60 focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] shadow-[0px_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
              >
                <option value="Open">Open</option>
                <option value="Pending">Pending</option>
                <option value="Resolved">Resolved</option>
                <option value="Closed">Closed</option>
              </select>
              <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-[#111111]/60">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Mark Resolved */}
            <button
              onClick={() => updateTicketStatus("Resolved")}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-[#16A34A] text-white text-xs font-medium rounded-full hover:bg-[#15803D] transition-colors border-none shrink-0"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
              <span className="hidden sm:inline">Mark Resolved</span>
            </button>

            {/* Close Ticket */}
            <button
              onClick={() => updateTicketStatus("Closed")}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-white border border-[#E5E7EB] text-[#DC2626] hover:bg-red-50 text-xs font-medium rounded-full transition-colors shrink-0"
            >
              <svg className="w-3.5 h-3.5 text-[#DC2626]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
              <span className="hidden sm:inline">Close</span>
            </button>
          </div>
        </div>

        {/* Workspace Split (Left sidebar detail panel, Right chat conversation) */}
        <div className="flex flex-row flex-grow w-full min-h-0">
          {/* Left Details Panel (300px) */}
          <div className="hidden lg:flex lg:w-[300px] lg:border-r border-[#E5E7EB] bg-white flex-col shrink-0 lg:overflow-y-auto">
            {/* Ticket details container */}
            <div className="p-5 border-b border-[#E5E7EB] flex flex-col gap-4">
              <span className="font-sans font-semibold text-[11px] leading-[13px] tracking-[0.66px] uppercase text-[#6B7280]">
                Ticket
              </span>
              <div className="flex flex-col gap-3 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Ticket ID</span>
                  <span className="font-semibold text-[#111827]">T-10{selectedTicket.id}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Created</span>
                  <span className="font-semibold text-[#111827]">{selectedTicket.created}, 09:14</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Last reply</span>
                  <span className="font-semibold text-[#111827]">{selectedTicket.lastMessage}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Messages</span>
                  <span className="font-semibold text-[#111827]">{messages.length} messages</span>
                </div>
              </div>
            </div>

            {/* Sender details container */}
            <div className="p-5 border-b border-[#E5E7EB] flex flex-col gap-4">
              <span className="font-sans font-semibold text-[11px] leading-[13px] tracking-[0.66px] uppercase text-[#6B7280]">
                Sender
              </span>
              <div className="flex items-center gap-3">
                <div className="flex justify-center items-center w-10 h-10 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full shrink-0 font-sans font-bold text-sm text-[#374151] select-none">
                  {selectedTicket.fromInitials}
                </div>
                <div className="flex flex-col">
                  <span className="font-sans font-semibold text-sm text-[#111827] leading-[17px] truncate">
                    {selectedTicket.fromName}
                  </span>
                  <span className="font-sans font-normal text-xs text-[#6B7280] leading-[15px] mt-0.5">
                    {selectedTicket.fromRole}
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 text-xs pt-1">
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Phone</span>
                  <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer">
                    +357 99 123456
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Email</span>
                  <span className="font-semibold text-[#2563EB] hover:underline cursor-pointer truncate max-w-[170px]" title="m.christodoulou@gmail.com">
                    m.christodoulou@...
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[#6B7280]">Profile</span>
                  <span className="font-semibold text-[#6366F1] hover:underline cursor-pointer flex items-center gap-0.5">
                    View Profile →
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Conversation & Reply box */}
          <div className="flex flex-col flex-grow bg-[#F9FAFB] min-h-0">
            {/* Scrollable messages area */}
            <div className="flex-grow p-6 flex flex-col gap-6 overflow-y-auto">
              {messages.map((msg, idx) => {
                const isCustomer = msg.sender === "customer";
                const showDateLabel = idx === 0 || messages[idx - 1].dateGroup !== msg.dateGroup;

                return (
                  <React.Fragment key={idx}>
                    {/* Date separator line */}
                    {showDateLabel && (
                      <div className="relative w-full flex items-center justify-center my-2 select-none">
                        <div className="absolute inset-0 flex items-center">
                          <div className="w-full border-t border-[#E5E7EB]" />
                        </div>
                        <span className="relative px-3 bg-[#F9FAFB] font-sans font-medium text-xs text-[#6B7280]">
                          {msg.dateGroup}
                        </span>
                      </div>
                    )}

                    {/* Message Row */}
                    <div className={`flex items-end gap-3 w-full ${isCustomer ? "justify-start" : "justify-end"}`}>
                      {isCustomer && (
                        <div className="flex justify-center items-center w-8 h-8 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full font-bold text-xs text-[#374151] select-none shrink-0">
                          {msg.senderInitials}
                        </div>
                      )}

                      {/* Content block */}
                      <div className={`flex flex-col gap-1.5 max-w-[85%] ${isCustomer ? "items-start" : "items-end"}`}>
                        {/* Name and identity */}
                        <span className="font-sans font-semibold text-[11px] text-[#6B7280]">
                          {msg.senderName}
                        </span>

                        {/* Speech Bubble */}
                        <div
                          className={`p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] border border-[#E5E7EB] ${isCustomer
                            ? "bg-white text-[#111827] rounded-tr-[16px] rounded-br-[16px] rounded-bl-[16px] rounded-tl-[4px]"
                            : "bg-[#6366F1] text-white border-transparent rounded-tl-[16px] rounded-bl-[16px] rounded-br-[16px] rounded-tr-[4px]"
                            }`}
                        >
                          {msg.subject && (
                            <div className="font-sans font-semibold text-sm mb-2 text-[#111827]">
                              {msg.subject}
                            </div>
                          )}
                          <p className="font-sans font-normal text-sm leading-[22px] whitespace-pre-line">
                            {msg.body}
                          </p>
                        </div>

                        {/* Timestamp */}
                        <span className="font-sans font-normal text-[11px] text-[#6B7280]">
                          {msg.time}
                        </span>
                      </div>

                      {!isCustomer && (
                        <div className="flex justify-center items-center w-8 h-8 bg-[#EEF2FF] rounded-full font-bold text-xs text-[#4338CA] select-none shrink-0">
                          {msg.senderInitials}
                        </div>
                      )}
                    </div>
                  </React.Fragment>
                );
              })}
              {/* Auto Scroll Anchor */}
              <div ref={messagesEndRef} />
            </div>

            {/* Bottom Text Area container */}
            <div className="p-4 px-8 border-t border-[#E5E7EB] bg-white flex flex-col gap-3 shrink-0">
              <div className="flex flex-col bg-[#F9FAFB] border border-[#E5E7EB] rounded-xl overflow-hidden w-full">
                {/* Text area */}
                <textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value.slice(0, 1000))}
                  onKeyDown={handleKeyDown}
                  placeholder="Write a reply…"
                  className="w-full h-[72px] px-4 py-3 bg-transparent text-sm text-[#111827] placeholder-[#6B7280] border-none resize-none focus:outline-none focus:ring-0 font-sans"
                />

                {/* Toolbar inside text box */}
                <div className="flex justify-between items-center px-3.5 pb-2.5">
                  <div className="flex items-center gap-1">
                    {/* Attachment icon */}
                    <button className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-gray-900 border-none transition-colors">
                      <svg
                        className="w-4 h-4 stroke-[#6B7280] fill-none"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.75}
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.414a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        />
                      </svg>
                    </button>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="font-sans font-normal text-xs text-[#6B7280]">
                      {replyText.length} / 1000
                    </span>
                    <button
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className={`flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold text-white border-none transition-all ${replyText.trim() ? "bg-[#6366F1] cursor-pointer hover:bg-[#5053D4]" : "bg-gray-300 cursor-not-allowed"
                        }`}
                    >
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
                      </svg>
                      <span>Send Reply</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Upper header section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h1 className="font-sans font-semibold text-2xl text-[#111827] tracking-tight">Support</h1>
          <p className="font-sans text-sm text-[#4E5F78]">
            Manage incoming messages from customers and businesses.
          </p>
        </div>
        <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-gray-200 text-sm font-semibold rounded-xl text-gray-700 hover:bg-gray-50 transition-colors shadow-[0px_4px_12px_rgba(0,0,0,0.08)]">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          <span>Export CSV</span>
        </button>
      </div>

      {/* 4 Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Tickets */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col justify-between min-h-[108px] transition-all hover:shadow-md">
          <span className="text-[13px] font-medium text-gray-500">Total Tickets</span>
          <span className="text-3xl font-bold text-[#111827] mt-2 mb-1">142</span>
          <span className="text-xs text-gray-400 font-normal">All time</span>
        </div>

        {/* Open Tickets */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 border-l-[2.4px] border-l-[#2563EB] flex flex-col justify-between min-h-[108px] transition-all hover:shadow-md">
          <span className="text-[13px] font-medium text-gray-500">Open</span>
          <span className="text-3xl font-bold text-[#2563EB] mt-2 mb-1">23</span>
          <span className="text-xs text-gray-400 font-normal">Awaiting reply</span>
        </div>

        {/* Pending Tickets */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 border-l-[2.4px] border-l-[#D97706] flex flex-col justify-between min-h-[108px] transition-all hover:shadow-md">
          <span className="text-[13px] font-medium text-gray-500">Pending</span>
          <span className="text-3xl font-bold text-[#D97706] mt-2 mb-1">7</span>
          <span className="text-xs text-gray-400 font-normal">Waiting on user</span>
        </div>

        {/* Resolved Today */}
        <div className="bg-white p-5 rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-100 border-l-[2.4px] border-l-[#16A34A] flex flex-col justify-between min-h-[108px] transition-all hover:shadow-md">
          <span className="text-[13px] font-medium text-gray-500">Resolved Today</span>
          <span className="text-3xl font-bold text-[#16A34A] mt-2 mb-1">11</span>
          <span className="text-xs text-gray-400 font-normal">31 May 2026</span>
        </div>
      </div>

      {/* Subtabs and Search filters row */}
      <div className="flex flex-col gap-4 mt-2">
        {/* Navigation sub-tabs */}
        <div className="flex items-center gap-4 border-b border-gray-200 pb-px overflow-x-auto">
          {(["All", "Open", "Pending", "Resolved", "Closed"] as const).map((tab) => {
            const isActive = activeSubTab === tab;
            const countMap = {
              All: 142,
              Open: 23,
              Pending: 7,
              Resolved: 11,
              Closed: 101,
            };

            // Badge color mapping
            let badgeBg = "bg-[#6B7280]";
            if (tab === "Open") badgeBg = "bg-[#2563EB]";
            else if (tab === "Pending") badgeBg = "bg-[#D97706]";
            else if (tab === "Resolved") badgeBg = "bg-[#16A34A]";
            else if (tab === "Closed") badgeBg = "bg-[#DC2626]";

            return (
              <button
                key={tab}
                onClick={() => setActiveSubTab(tab)}
                className={`pb-2.5 px-4 text-sm font-medium whitespace-nowrap transition-all border-b-2 flex items-center gap-2 ${isActive
                  ? "border-[#6366F1] text-[#4338CA] font-semibold"
                  : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
              >
                <span>{tab}</span>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-full font-bold text-white transition-colors ${badgeBg}`}
                >
                  {countMap[tab]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Filter Toolbar Controls */}
        <div className="flex flex-col md:flex-row md:items-center gap-4 w-full">
          {/* Search Input */}
          <div className="relative flex-grow max-w-md">
            <input
              type="text"
              placeholder="Search by email or name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl pl-10 pr-4 py-2 text-sm text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] focus:border-[#2E9DA7] shadow-[0px_1px_2px_rgba(0,0,0,0.02)]"
            />
            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Selector Dropdowns */}
          <div className="flex flex-wrap items-center gap-3.5">
            {/* User role filter */}
            <div className="relative">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-9 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] shadow-[0px_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
              >
                <option value="All">All User Roles</option>
                <option value="Customer">Customer</option>
                <option value="Business">Business</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Sorting */}
            <div className="relative">
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="appearance-none bg-white border border-gray-300 rounded-xl px-4 py-2 pr-9 text-sm font-semibold text-gray-800 focus:outline-none focus:ring-1 focus:ring-[#2E9DA7] shadow-[0px_1px_2px_rgba(0,0,0,0.02)] cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets Table Panel */}
      <div className="bg-white rounded-xl shadow-[0px_4px_12px_rgba(0,0,0,0.08)] border border-gray-200 overflow-hidden flex flex-col w-full">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-200 text-xs font-semibold text-gray-500 bg-gray-50/50">
                <th className="py-3 px-6 text-left">
                  <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 select-none">
                    Subject & Preview
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </th>
                <th className="py-3 px-6 text-left">
                  <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 select-none">
                    From
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </th>
                <th className="py-3 px-6 text-left">
                  <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 select-none">
                    Status
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </th>
                <th className="py-3 px-6 text-left">
                  <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 select-none">
                    Last Message
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </th>
                <th className="py-3 px-6 text-left">
                  <span className="flex items-center gap-1.5 cursor-pointer hover:text-gray-900 select-none">
                    Created
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </th>
                <th className="py-3 px-6 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {sortedTickets.length > 0 ? (
                sortedTickets.map((ticket) => (
                  <tr
                    key={ticket.id}
                    onClick={() => setSelectedTicket(ticket)}
                    className="hover:bg-gray-50/80 transition-colors cursor-pointer"
                  >
                    {/* Subject & Preview */}
                    <td className="py-4 px-6 max-w-[340px]">
                      <div className="font-semibold text-gray-900 truncate">
                        {ticket.subject}
                      </div>
                      <div className="text-xs text-gray-500 truncate mt-1">
                        {ticket.preview}
                      </div>
                    </td>

                    {/* From Avatar and Detail */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-bold text-xs text-gray-700 shrink-0 select-none">
                          {ticket.fromInitials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="font-medium text-gray-900 truncate">{ticket.fromName}</span>
                          <span className="text-xs text-gray-400 font-normal">{ticket.fromRole}</span>
                        </div>
                      </div>
                    </td>

                    {/* Status Badge */}
                    <td className="py-4 px-6">
                      {ticket.status === "Open" && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#EFF6FF] text-[#2563EB]">
                          Open
                        </span>
                      )}
                      {ticket.status === "Pending" && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FDF2E9] text-[#D97706]">
                          Pending
                        </span>
                      )}
                      {ticket.status === "Resolved" && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#ECFDF5] text-[#16A34A]">
                          Resolved
                        </span>
                      )}
                      {ticket.status === "Closed" && (
                        <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-[#FEF2F2] text-[#DC2626]">
                          Closed
                        </span>
                      )}
                    </td>

                    {/* Last Message */}
                    <td className="py-4 px-6 text-gray-600 font-normal">
                      {ticket.lastMessage}
                    </td>

                    {/* Created */}
                    <td className="py-4 px-6 text-gray-600 font-normal">
                      {ticket.created}
                    </td>

                    {/* Actions Dropdown Button */}
                    <td className="py-4 px-6 text-right">
                      <div className="inline-flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                        <button className="inline-flex items-center gap-1.5 px-4 py-1.5 border border-[#111827] text-sm font-medium rounded-full hover:bg-gray-50 transition-colors text-gray-900">
                          <span>Action</span>
                          <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-gray-500 font-normal">
                    No tickets match the search query and filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex items-center justify-between border-t border-gray-200 py-4 px-6">
          <span className="text-xs text-gray-500">
            Showing 1-{sortedTickets.length} of {sortedTickets.length}
          </span>
          <div className="flex gap-2">
            <button
              disabled
              className="px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-semibold text-gray-400 bg-gray-50 cursor-not-allowed"
            >
              ← Previous
            </button>
            <button
              disabled={sortedTickets.length < 5}
              onClick={() => setCurrentPage((p) => p + 1)}
              className={`px-3 py-1.5 border rounded-lg text-xs font-semibold transition-colors ${sortedTickets.length < 5
                ? "border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed"
                : "border-[#111111] text-[#111111] hover:bg-gray-50"
                }`}
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
