"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon } from "@hugeicons/core-free-icons";

// Components
import AuthLayout from "@/components/auth/AuthLayout";
import AuthCard from "@/components/auth/AuthCard";
import { InputField } from "@/components/auth/InputField";
import SocialButton from "@/components/auth/SocialButton";

export default function CustomerAuthPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setEmailError("Please enter your email");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }
    setEmailError("");
    // Navigate to OTP verification page
    router.push(`/customer/verify?email=${encodeURIComponent(email)}`);
  };

  return (
    <div className="w-full">
      <AuthLayout onBack={() => router.push("/")} imageSrc="/img/authImg.png">
        <AuthCard
          title="Bookly for customers"
          subtitle="Create an account or log in to book and manage your appointments"
        >
          <form onSubmit={handleEmailSubmit} className="flex flex-col gap-6 w-full">
            <InputField
              label="Email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={emailError}
              helperText="We’ll send you a verification code at your email"
              icon={<HugeiconsIcon icon={Mail01Icon} size={20} />}
              required
            />

            <button
              type="submit"
              className="w-full max-w-[520px] h-12 bg-[#1A1A1A] hover:bg-black text-white font-semibold rounded-xl text-sm transition-all duration-200 cursor-pointer"
            >
              Continue
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center my-6 w-full max-w-[520px]">
            <div className="flex-1 border-t border-[#E8E6FF]" />
            <span className="px-3 text-xs font-semibold text-[#9E9E9E] tracking-wider">OR</span>
            <div className="flex-1 border-t border-[#E8E6FF]" />
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3 w-full">
            <SocialButton
              provider="google"
              label="Continue With Google"
              onClick={() => console.log("Google Login clicked")}
            />
            <SocialButton
              provider="apple"
              label="Continue With Apple"
              onClick={() => console.log("Apple Login clicked")}
            />
            <SocialButton
              provider="facebook"
              label="Continue With Facebook"
              onClick={() => console.log("Facebook Login clicked")}
            />
          </div>

          {/* Footer option link */}
          <div className="text-center mt-8 w-full max-w-[520px]">
            <p className="text-sm font-semibold text-[#1A1A1A] mb-1">
              Have a business account?
            </p>
            <button
              type="button"
              onClick={() => router.push("/")}
              className="text-sm font-semibold text-[#240183] hover:underline cursor-pointer"
            >
              Go to Bookly for professionals
            </button>
          </div>
        </AuthCard>
      </AuthLayout>
    </div>
  );
}
