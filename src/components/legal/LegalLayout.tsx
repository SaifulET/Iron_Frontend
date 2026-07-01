"use client";

import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export interface LegalSection {
  id: string;
  title: string;
  paragraphs: string[];
}

export interface LegalLayoutProps {
  pageTitle: string;
  pageSubtitle: string;
  lastUpdated: string;
  sections: LegalSection[];
}

export default function LegalLayout({
  pageTitle,
  pageSubtitle,
  lastUpdated,
  sections,
}: LegalLayoutProps) {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");
  const [activeSectionId, setActiveSectionId] = useState(sections[0]?.id || "");

  // Intersection Observer to update active section on scroll
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px", // triggers when section is in the upper half of the screen
      threshold: 0.1,
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSectionId(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    sections.forEach((sec) => {
      const element = document.getElementById(sec.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sec) => {
        const element = document.getElementById(sec.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [sections]);

  const handleLinkClick = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -100; // Offset for navbar
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
      setActiveSectionId(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFAF9] flex flex-col font-manrope text-[#1C1B1C]">
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      <main className="flex-1 w-full  px-4 md:px-16   flex flex-col lg:flex-row gap-6 items-start relative ">
        
        {/* LEFT SIDEBAR NAVIGATION */}
        <aside className="hidden lg:flex flex-col w-[256px] bg-white rounded-2xl p-6 gap-2 shrink-0 border border-neutral-100 shadow-sm sticky top-24">
          <div className="px-3 pb-2 flex flex-col gap-1 border-b border-neutral-100">
            <span className="font-semibold text-xs tracking-[0.6px] uppercase text-[#64748B]">
              Legal Documentation
            </span>
            <span className="text-[10px] text-[#94A3B8]">
              {lastUpdated}
            </span>
          </div>

          {/* Nav links */}
          <nav className="flex flex-row lg:flex-col overflow-x-auto lg:overflow-x-visible gap-1.5 py-3 lg:py-2 scrollbar-hide">
            {sections.map((sec) => {
              const isActive = activeSectionId === sec.id;
              return (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => handleLinkClick(e, sec.id)}
                  className={`flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all shrink-0 whitespace-nowrap ${
                    isActive
                      ? "bg-[#602E7A]/10 text-[#602E7A]"
                      : "text-[#475569] hover:bg-neutral-50 hover:text-black"
                  }`}
                >
                  {sec.title}
                </a>
              );
            })}
          </nav>
        </aside>

        {/* MAIN CONTENT AREA */}
        <article className="flex-1 w-full bg-white border border-[#E2E8F0] shadow-sm rounded-2xl p-6 md:p-12 flex flex-col gap-8">
          
          {/* Header */}
          <div className="flex flex-col gap-4 border-b border-neutral-100 pb-6">
            <h1 className="font-bold text-3xl md:text-[44px] md:leading-[52px] text-[#111827] tracking-tight">
              {pageTitle}
            </h1>
            <p className="text-base md:text-lg md:leading-[29px] text-[#475569] max-w-3xl">
              {pageSubtitle}
            </p>
          </div>

          {/* Sections list */}
          <div className="flex flex-col gap-10">
            {sections.map((sec) => (
              <section
                key={sec.id}
                id={sec.id}
                className="scroll-mt-28 flex flex-col gap-4"
              >
                <h2 className="font-bold text-xl md:text-2xl text-[#111827]">
                  {sec.title}
                </h2>
                <div className="flex flex-col gap-4">
                  {sec.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-sm md:text-base leading-relaxed text-[#475569]">
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </article>

      </main>

      <Footer />
    </div>
  );
}
