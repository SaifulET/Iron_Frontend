"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Tick02Icon } from "@hugeicons/core-free-icons";

// Modular sub-components inside same folder
import SupportHeader from "./SupportHeader";
import SupportBreadcrumbs from "./SupportBreadcrumbs";
import SupportFormFields from "./SupportFormFields";
import SupportFormActions from "./SupportFormActions";

interface ContactSupportProps {
  setActiveTab: (tab: string) => void;
}

export default function ContactSupport({
  setActiveTab
}: ContactSupportProps) {
  const [name, setName] = useState("John Doe");
  const [email, setEmail] = useState("example@gmail.com");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !subject.trim() || !description.trim()) {
      setErrorMsg("Please fill in all the required fields.");
      return;
    }
    setErrorMsg("");
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setSubject("");
      setDescription("");
    }, 3000);
  };

  const handleCancel = () => {
    setName("John Doe");
    setEmail("example@gmail.com");
    setSubject("");
    setDescription("");
    setErrorMsg("");
  };

  return (
    <main className="flex-1 min-w-0 flex flex-col h-full overflow-y-auto bg-[#FCF8F8] relative">
      {/* 1. Header with Title & Date/Greeting */}
      <SupportHeader />

      <div className="flex-1 pl-12 pr-6 md:pr-8 py-6 flex flex-col gap-[30px] w-full max-w-[864px]">
        {/* 2. Breadcrumbs */}
        <SupportBreadcrumbs setActiveTab={setActiveTab} />

        {/* 3. Main Support Card Frame */}
        <form onSubmit={handleSubmit} className="flex flex-col w-full bg-white border border-[#F1F5F9] rounded-2xl shadow-sm overflow-hidden ml-0 md:ml-[118px]">
          {/* HorizontalBorder Header */}
          <div className="flex flex-row items-center p-6 gap-1 bg-[#F8FAFC] border-b border-[#F1F5F9] shrink-0">
            <div className="flex flex-row items-center gap-1 w-full h-[26px]">
              <h2 className="font-manrope font-semibold text-2xl leading-[26px] text-[#16123E]">
                Contact Support
              </h2>
            </div>
          </div>

          {/* Form Body */}
          <div className="flex flex-col items-start p-6 md:p-8 gap-5 bg-white">
            {errorMsg && (
              <div className="w-full p-3 rounded-lg bg-red-50 border border-red-200 text-red-600 text-xs font-poppins">
                {errorMsg}
              </div>
            )}

            {isSubmitted && (
              <div className="w-full p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold font-poppins flex items-center gap-2 animate-fadeIn">
                <HugeiconsIcon icon={Tick02Icon} className="w-4 h-4 text-emerald-600" />
                <span>Thank you! Your ticket has been submitted. Support will contact you shortly.</span>
              </div>
            )}

            <SupportFormFields
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              subject={subject}
              setSubject={setSubject}
              description={description}
              setDescription={setDescription}
            />
          </div>

          {/* Action buttons block */}
          <SupportFormActions onCancel={handleCancel} />
        </form>
      </div>
    </main>
  );
}
