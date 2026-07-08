import React, { useState } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowLeft01Icon } from "@hugeicons/core-free-icons";

export const Security2FAPanel: React.FC = () => {
  // States: "off" | "input_email" | "input_code" | "verified"
  const [twoFactorState, setTwoFactorState] = useState<"off" | "input_email" | "input_code" | "verified">("off");
  const [emailAddress, setEmailAddress] = useState("");
  const [otpCode, setOtpCode] = useState(["", "", "", "", "", ""]);
  const [verifiedEmail, setVerifiedEmail] = useState("hello@example.com");

  const handleSendCode = () => {
    if (emailAddress.trim()) {
      setVerifiedEmail(emailAddress);
      setTwoFactorState("input_code");
    }
  };

  const handleVerify = () => {
    setTwoFactorState("verified");
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length <= 1) {
      const updated = [...otpCode];
      updated[index] = val;
      setOtpCode(updated);
      
      // Auto focus next input
      if (val && index < 5) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const isToggledOn = twoFactorState !== "off";

  const handleToggleSwitch = () => {
    if (isToggledOn) {
      setTwoFactorState("off");
    } else {
      setTwoFactorState("input_email");
    }
  };

  return (
    <div className="flex flex-col gap-[20px] w-full font-poppins">
      <div className="flex flex-col gap-1">
        <h2 className="font-poppins font-medium text-base text-[#111111]">Security & 2FA</h2>
        <p className="font-poppins font-normal text-xs text-[#666666]">Change your password, set 2FA of your account</p>
      </div>

      {/* Main card */}
      <div className="bg-white border border-[#DEDDE3] rounded-[16px] overflow-hidden shadow-none flex flex-col w-full">
        
        {/* Secure your account header */}
        <div className="p-6 border-b border-[#F1F5F9] bg-white flex flex-col gap-1">
          <h3 className="font-poppins font-medium text-sm text-[#111111]">Secure your account</h3>
          <p className="font-poppins font-normal text-xs text-neutral-400 leading-normal">
            Protect your account by requiring an extra verification step when signing in from an unrecognized device
          </p>
        </div>

        {/* Password details Row */}
        <div className="p-6 bg-white flex items-center justify-between border-b border-[#F1F5F9]">
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#111111]">Password</span>
            <span className="text-xs text-neutral-400 mt-0.5">Last changed 4 months ago</span>
          </div>
          <button className="px-3.5 py-1.5 border border-[#5A576B] rounded-lg text-xs font-semibold text-[#666666] hover:bg-neutral-50 cursor-pointer">
            Update Password
          </button>
        </div>

        {/* Set 2FA Verification Area */}
        <div className="p-6 bg-white flex flex-col gap-4">
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#111111]">Set 2FA Verification</span>
            <span className="text-xs text-neutral-400 mt-0.5">Last changed 4 months ago</span>
          </div>

          {/* Auth Card Box */}
          <div className="border border-[#E2E8F0] rounded-[16px] p-6 bg-white shadow-[0px_2px_10px_-4px_rgba(0,0,0,0.05)] w-full">
            <div className="flex items-start justify-between gap-4">
              
              <div className="flex gap-4">
                {/* Custom Gradient Icon Container */}
                <div className="w-12 h-12 rounded-[16px] bg-gradient-to-b from-[#0CC0DF]/20 to-[#0CC0DF]/20 bg-[#8EBAC5] flex items-center justify-center shrink-0">
                  <img src="/Icons/Email.svg" alt="Email" className="w-6 h-6 object-contain" />
                </div>

                <div className="flex flex-col">
                  <span className="font-medium text-[15px] leading-snug text-[#182133]">Email Authentication</span>
                  <span className="text-xs text-[#62748E] leading-relaxed mt-1 max-w-[380px]">
                    Receive a secure 6-digit verification code at your registered email address.
                  </span>
                </div>
              </div>

              {/* 2FA Toggle switch */}
              <button
                onClick={handleToggleSwitch}
                className={`w-[44px] h-[24px] rounded-full transition-colors flex items-center p-0.5 cursor-pointer shrink-0 ${
                  isToggledOn ? "bg-[#0F6E56]" : "bg-[#E2E8F0]"
                }`}
              >
                <div className={`w-4 h-4 bg-white rounded-full transition-transform shadow-sm ${
                  isToggledOn ? "translate-x-5" : ""
                }`} />
              </button>

            </div>

            {/* Dynamic Inner Workflow Panels */}
            {twoFactorState === "input_email" && (
              <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-col gap-3">
                <span className="text-[11px] font-semibold text-[#314158] uppercase tracking-[0.3px]">
                  Email Address
                </span>
                
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="email"
                    placeholder="hello@example.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="flex-1 w-full h-[43px] px-4 border border-[#E2E8F0] rounded-[10px] bg-[#F8FAFC] text-[14px] text-[#111111] focus:outline-none placeholder:text-[#90A1B9]"
                  />
                  <button
                    onClick={handleSendCode}
                    disabled={!emailAddress.trim()}
                    className="w-full sm:w-[103px] h-[43px] bg-[#111111] hover:bg-black text-white font-medium text-sm rounded-[10px] transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
                  >
                    Send Code
                  </button>
                </div>
              </div>
            )}

            {twoFactorState === "input_code" && (
              <div className="mt-5 pt-5 border-t border-neutral-100 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <button onClick={() => setTwoFactorState("input_email")} className="text-neutral-500 hover:text-neutral-700">
                    <HugeiconsIcon icon={ArrowLeft01Icon} className="w-4 h-4" />
                  </button>
                  <span className="text-xs text-[#62748E]">
                    Enter the 6-digit code sent to <strong className="text-neutral-700">{verifiedEmail}</strong>
                  </span>
                </div>

                {/* 6 Digit Inputs */}
                <div className="flex flex-wrap items-center gap-2.5">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      id={`otp-${idx}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(idx, e.target.value)}
                      className="w-10 h-10 border border-[#E2E8F0] rounded-lg text-center text-[15px] font-semibold text-[#111111] bg-[#F8FAFC] focus:border-[#0CC0DF] focus:outline-none"
                    />
                  ))}

                  <button
                    onClick={handleVerify}
                    className="ml-auto px-5 h-[36px] bg-[#111111] hover:bg-black text-white font-medium text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    Verify
                  </button>
                </div>
              </div>
            )}

            {twoFactorState === "verified" && (
              <div className="mt-5 pt-5 border-t border-neutral-100 flex items-center justify-between gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#EAFDF5] border border-[#A7F3D0] rounded-lg text-[#0F6E56] text-xs font-semibold">
                  <span className="w-1.5 h-1.5 bg-[#10B981] rounded-full" />
                  Verified: {verifiedEmail}
                </div>

                <button
                  onClick={() => setTwoFactorState("input_email")}
                  className="text-xs text-neutral-500 hover:text-neutral-700 font-medium underline cursor-pointer"
                >
                  Change email
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
