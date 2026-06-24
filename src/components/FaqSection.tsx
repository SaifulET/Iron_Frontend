"use client";

import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { Add01Icon, MinusSignIcon as MinusIcon } from "@hugeicons/core-free-icons";

interface FaqItem {
  question: string;
  answer: string;
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const initialFaqs: FaqItem[] = [
    {
      question: "Does Vesioh support custom API integrations?",
      answer: "Yes, Vesioh supports custom API integrations. We provide comprehensive API documentation and webhooks to help you sync your data and connect with your existing tools seamlessly.",
    },
    {
      question: "Can I migrate my existing WhatsApp history?",
      answer: "Yes, you can migrate your existing WhatsApp history. Our platform offers easy-to-use migration tools that import your chat history and contact list without any data loss.",
    },
    {
      question: "How does the AI sorting actually work?",
      answer: "Our AI sorting scans incoming messages and automatically categorizes them based on intent, urgency, and customer preferences, routing them to the correct dashboard or response flow instantly.",
    },
  ];

  const additionalFaqs: FaqItem[] = [
    {
      question: "Is there a limit to the number of active chats?",
      answer: "No, there are no limits on active chats. Our system dynamically scales to handle your business volume, ensuring a smooth experience during peak hours.",
    },
    {
      question: "Can we set custom business hours for auto-responses?",
      answer: "Absolutely. You can configure custom business hours and set tailored automatic away messages to handle incoming queries outside your working hours.",
    },
  ];

  const faqs = showAll ? [...initialFaqs, ...additionalFaqs] : initialFaqs;

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mx-4 md:mx-[64px] flex flex-col items-center pt-[40px] px-4 md:px-[48px] pb-0 gap-[40px] bg-transparent font-poppins">
      {/* Container */}
      <div className="flex flex-col items-start p-0 gap-[48px] w-full max-w-[1280px] shrink-0 grow-0">
        {/* Header Container */}
        <div className="flex flex-col items-center p-0 gap-[24px] w-full max-w-[1280px] self-stretch shrink-0 grow-0">
          {/* Frame 2147228638 */}
          <div className="flex flex-col items-start p-0 gap-[16px] w-full max-w-[1280px] self-stretch shrink-0 grow-0">
            {/* FAQ Title */}
            <h2 className="w-full font-poppins font-medium text-[36px] sm:text-[52px] leading-[44px] sm:leading-[60px] flex items-center justify-center text-center tracking-[-0.05em] text-[#111111] self-stretch shrink-0 grow-0">
              FAQ
            </h2>
          </div>
          {/* Everything you need to know about Bookly */}
          <p className="max-w-[574px] font-poppins font-medium text-[16px] sm:text-[18px] leading-[22px] sm:leading-[26px] flex items-center justify-center text-center text-[#5E598B] shrink-0 grow-0">
            Everything you need to know about Bookly
          </p>
        </div>

        {/* FAQ Items List Container */}
        <div className="flex flex-col justify-center items-center p-0 gap-[16px] w-full max-w-[1280px] self-stretch shrink-0 grow-0">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="box-border flex flex-col items-start p-0 w-full max-w-[1280px] border-b border-[#DEDDE3] rounded-lg self-stretch shrink-0 grow-0 transition-all duration-300"
              >
                {/* Slot -> Summary */}
                <div
                  onClick={() => toggleFaq(index)}
                  className="flex flex-row justify-between items-center py-5 px-4 sm:p-[24px] w-full min-h-[80px] self-stretch shrink-0 grow-0 cursor-pointer select-none gap-4"
                >
                  <span className="font-poppins font-normal text-[18px] sm:text-[24px] leading-[26px] sm:leading-[32px] flex items-center text-[#0D0D0D] shrink grow-0 text-left">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 shrink-0 grow-0 flex items-center justify-center text-[#454070]">
                    {isOpen ? (
                      <HugeiconsIcon icon={MinusIcon} className="w-6 h-6" />
                    ) : (
                      <HugeiconsIcon icon={Add01Icon} className="w-6 h-6" />
                    )}
                  </div>
                </div>

                {/* FAQ Answer Container */}
                <div
                  className={`w-full overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? "max-h-[500px] opacity-100 pb-[24px] px-4 sm:px-[24px]" : "max-h-0 opacity-0 pointer-events-none"
                  }`}
                >
                  <p className="font-poppins font-normal text-[15px] sm:text-[17px] leading-[24px] sm:leading-[28px] text-[#555555] text-left">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Show more button */}
      <button
        onClick={() => {
          setShowAll(!showAll);
          setOpenIndex(null);
        }}
        className="box-border flex flex-row justify-center items-center py-[12px] px-[40px] gap-[10px] w-[216px] h-[56px] border border-[#1C1B1C] rounded-[12px] shrink-0 grow-0 cursor-pointer hover:bg-neutral-50 active:scale-[0.98] transition-all"
      >
        <span className="font-poppins font-medium text-[20px] sm:text-[24px] leading-[32px] flex items-center justify-center text-[#111111] shrink-0 grow-0">
          {showAll ? "Show less" : "Show more"}
        </span>
      </button>
    </section>
  );
}
