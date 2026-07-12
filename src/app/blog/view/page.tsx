"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Image from "next/image";

import { Suspense } from "react";
import BlogDetailBody from "@/components/BlogDetailBody";

function BlogDetailContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id") || "post-featured";

  // States for Navbar
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [selectedLanguage, setSelectedLanguage] = useState("ENG");

  return (
    <div className="min-h-screen bg-[#FCFAF9] flex flex-col relative overflow-x-hidden">
      {/* Navbar */}
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedLanguage={selectedLanguage}
        setSelectedLanguage={setSelectedLanguage}
      />

      {/* Blog Detail View */}
      <main className="flex-1 w-full max-w-[730px] mx-auto px-4 pt-[17px] pb-24">
        <BlogDetailBody
          id={id}
          onBack={() => router.push("/blog")}
        />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function BlogDetailPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BlogDetailContent />
    </Suspense>
  );
}
