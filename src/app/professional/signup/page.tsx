"use client";

import React, { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { HugeiconsIcon } from "@hugeicons/react";
import { Mail01Icon, SquareLock01Icon } from "@hugeicons/core-free-icons";

// Components
import AuthLayout from "@/components/AuthLayout";
import AuthCard from "@/components/AuthCard";
import { InputField, SelectField, PhoneInputField } from "@/components/InputField";
import SuccessModal from "@/components/SuccessModal";

function ProfessionalSignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const emailParam = searchParams.get("email") || "";
  const visitType = searchParams.get("type") || "travel";

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("male");
  const [countryCode, setCountryCode] = useState("+880");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleFinishSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }
    setPasswordError("");
    setIsSuccessOpen(true);
  };

  return (
    <div className="w-full">
      <AuthLayout onBack={() => router.push(`/professional/verify?email=${encodeURIComponent(emailParam)}&type=${visitType}`)} imageSrc="/img/authImg2.png">
        <AuthCard
          title="Finish signing up"
          subtitle="Fill the information to complete the setup"
        >
          <form onSubmit={handleFinishSignupSubmit} className="flex flex-col gap-5 w-full">
            {/* Names side by side */}
            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-[520px]">
              <InputField
                label="First name"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <InputField
                label="Last name"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>

            {/* Gender */}
            <SelectField
              label="Gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              options={[
                { value: "male", label: "Male" },
                { value: "female", label: "Female" },
                { value: "other", label: "Other" },
              ]}
            />

            {/* Phone number */}
            <PhoneInputField
              label="Mobile number"
              countryCode={countryCode}
              onCountryCodeChange={setCountryCode}
              placeholder="123456666"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />

            {/* Email (disabled) */}
            <InputField
              label="Email"
              type="email"
              value={emailParam || "example@gmail.com"}
              disabled
              icon={<HugeiconsIcon icon={Mail01Icon} size={20} />}
            />

            {/* Password */}
            <InputField
              label="Password"
              placeholder="Password"
              isPassword
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={passwordError}
              icon={<HugeiconsIcon icon={SquareLock01Icon} size={20} />}
              required
            />

            {/* Terms checkbox */}
            <div className="flex items-start gap-2 mt-2">
              <input
                type="checkbox"
                id="agree-terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4.5 h-4.5 rounded border-[#DAD6FF] text-[#240183] focus:ring-[#240183] cursor-pointer mt-0.5"
                required
              />
              <label
                htmlFor="agree-terms"
                className="text-xs font-semibold text-[#1A1A1A] cursor-pointer select-none leading-relaxed"
              >
                I agree to the Bookly Terms & Conditions, including the Business Partner Terms
              </label>
            </div>

            <button
              type="submit"
              disabled={!agreeTerms}
              className="w-full max-w-[520px] h-12 bg-[#1A1A1A] hover:bg-black text-white font-semibold rounded-xl text-sm transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-4"
            >
              Agree & create account
            </button>
          </form>
        </AuthCard>
      </AuthLayout>

      {/* Successfully Created Modal */}
      <SuccessModal
        isOpen={isSuccessOpen}
        onClose={() => setIsSuccessOpen(false)}
        onContinue={() => {
          setIsSuccessOpen(false);
          router.push("/");
        }}
      />
    </div>
  );
}

export default function ProfessionalSignupPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-white font-poppins">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-[#240183] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm text-[#707070] font-medium">Loading form...</p>
        </div>
      </div>
    }>
      <ProfessionalSignupContent />
    </Suspense>
  );
}
