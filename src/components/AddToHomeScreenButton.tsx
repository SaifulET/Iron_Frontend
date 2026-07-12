"use client";

import React, { useState, useEffect } from "react";

interface AddToHomeScreenButtonProps {
  className?: string;
  onClick?: (e: React.MouseEvent) => void;
  showTextOnMobile?: boolean;
  size?: "small" | "large";
}

export default function AddToHomeScreenButton({
  className = "",
  onClick,
  showTextOnMobile = false,
  size = "large",
}: AddToHomeScreenButtonProps) {
  const [showModal, setShowModal] = useState(false);
  const [device, setDevice] = useState<"ios" | "android" | "desktop">("desktop");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Detect device
      const ua = navigator.userAgent.toLowerCase();
      if (/iphone|ipad|ipod/.test(ua)) {
        setDevice("ios");
      } else if (/android/.test(ua)) {
        setDevice("android");
      } else {
        setDevice("desktop");
      }

      // Listen for PWA installation prompt
      const handleBeforeInstallPrompt = (e: any) => {
        e.preventDefault();
        setDeferredPrompt(e);
        (window as any).deferredPrompt = e;
      };

      window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      return () => {
        window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      };
    }
  }, []);

  const handleInstallClick = async (e: React.MouseEvent) => {
    e.preventDefault();
    if (onClick) {
      onClick(e);
      return;
    }

    // Try native installation prompt if available (Android/Chrome/Edge Desktop)
    const promptEvent = deferredPrompt || (typeof window !== "undefined" && (window as any).deferredPrompt);
    if (promptEvent) {
      promptEvent.prompt();
      const { outcome } = await promptEvent.userChoice;
      if (outcome === "accepted") {
        console.log("User accepted the install prompt");
        localStorage.setItem("addedToHomeScreen", "true");
        localStorage.setItem("homeScreenRedirectUrl", window.location.pathname + window.location.search);
        window.dispatchEvent(new Event("addedToHomeScreenUpdated"));
        window.close();
        return;
      }
    }

    // If native prompt is not available, open the customized instruction modal
    setShowModal(true);
  };

  const handleCloseAndBookmark = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("addedToHomeScreen", "true");
      localStorage.setItem("homeScreenRedirectUrl", window.location.pathname + window.location.search);
      window.dispatchEvent(new Event("addedToHomeScreenUpdated"));
      alert("Bookly shortcut created successfully! Closing browser window...");
      
      // Close window
      window.close();
      
      // Fallback
      setTimeout(() => {
        window.location.href = "/explore";
      }, 500);
    }
    setShowModal(false);
  };

  return (
    <>
      {size === "small" ? (
        <button
          onClick={handleInstallClick}
          className={`bg-white hover:bg-neutral-100 text-[#1C1B1C] rounded-full font-semibold shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center gap-1 sm:gap-1.5 whitespace-nowrap ${className}`}
        >
          <span className={showTextOnMobile ? "inline" : "hidden sm:inline"}>
            Add to Home Screen
          </span>
          {!showTextOnMobile && <span className="inline sm:hidden">Install</span>}
          <img src="/Icons/appleSmall.svg" alt="Apple" className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0 object-contain" />
          <img src="/Icons/android.svg" alt="Android" className="w-3.5 h-3.5 shrink-0 object-contain" />
        </button>
      ) : (
        <button
          onClick={handleInstallClick}
          className={`bg-white hover:bg-neutral-100 text-[#1C1B1C] border-[0.41px] border-[#4E5F78] rounded-[1651.73px] py-2 px-4 xs:py-2.5 xs:px-6 sm:py-3 sm:px-8 md:py-[13.2px] md:px-[33px] gap-1.5 xs:gap-2 md:gap-[19.8px] font-poppins font-normal text-xs xs:text-sm sm:text-lg md:text-[26.45px] leading-normal md:leading-[40px] shadow-sm transition-all active:scale-95 cursor-pointer flex items-center justify-center whitespace-nowrap ${className}`}
        >
          <span className={showTextOnMobile ? "inline" : "hidden sm:inline"}>
            Add to Home screen
          </span>
          {!showTextOnMobile && <span className="inline sm:hidden text-[14px] leading-normal py-1 px-2">Install</span>}
          <img src="/Icons/appleSmall.svg" alt="Apple" className="w-4 h-4 xs:w-5 xs:h-5 md:w-[26.45px] md:h-[26.45px] shrink-0 object-contain" />
          <img src="/Icons/android.svg" alt="Android" className="w-4 h-4 xs:w-5 xs:h-5 md:w-[26.45px] md:h-[26.45px] shrink-0 object-contain" />
        </button>
      )}

      {/* Instruction Guide Modal for All Platforms */}
      {showModal && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 font-sans">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-150 p-6 flex flex-col gap-5 text-[#1C1B1C]">
            <div className="flex justify-between items-center pb-2 border-b border-gray-100">
              <h3 className="font-bold text-lg text-gray-900 flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#2E9DA7] animate-pulse"></span>
                Add Bookly to Home Screen
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 bg-transparent border-none cursor-pointer text-lg p-1"
              >
                ✕
              </button>
            </div>

            {/* Device selector tabs */}
            <div className="grid grid-cols-3 gap-1 bg-gray-100 p-1 rounded-xl">
              <button
                onClick={() => setDevice("ios")}
                className={`py-2 text-xs font-semibold rounded-lg border-none cursor-pointer transition-all ${
                  device === "ios" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                 Apple iOS
              </button>
              <button
                onClick={() => setDevice("android")}
                className={`py-2 text-xs font-semibold rounded-lg border-none cursor-pointer transition-all ${
                  device === "android" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                🤖 Android
              </button>
              <button
                onClick={() => setDevice("desktop")}
                className={`py-2 text-xs font-semibold rounded-lg border-none cursor-pointer transition-all ${
                  device === "desktop" ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                💻 Desktop
              </button>
            </div>

            {/* Instruction body based on selection */}
            <div className="py-2 text-sm text-gray-600 flex flex-col gap-3.5 leading-relaxed">
              {device === "ios" && (
                <>
                  <p className="font-medium text-gray-800">For Safari browser on iPhone / iPad:</p>
                  <ol className="list-decimal pl-5 flex flex-col gap-2">
                    <li>
                      Tap the <strong className="text-[#2E9DA7]">Share button</strong> in the bottom toolbar (looks like an arrow pointing up out of a square).
                    </li>
                    <li>
                      Scroll down the share sheet menu list and tap <strong className="text-[#2E9DA7]">Add to Home Screen</strong>.
                    </li>
                    <li>
                      Name the shortcut (e.g., "Bookly") and tap <strong className="text-[#2E9DA7]">Add</strong> in the top-right corner.
                    </li>
                  </ol>
                </>
              )}

              {device === "android" && (
                <>
                  <p className="font-medium text-gray-800">For Google Chrome on Android:</p>
                  <ol className="list-decimal pl-5 flex flex-col gap-2">
                    <li>
                      Tap the menu button <strong className="text-gray-800">⫶</strong> (three vertical dots) in the top-right corner of Chrome.
                    </li>
                    <li>
                      Select <strong className="text-[#2E9DA7]">Add to Home screen</strong> or <strong className="text-[#2E9DA7]">Install app</strong>.
                    </li>
                    <li>
                      Confirm by tapping <strong className="text-[#2E9DA7]">Add</strong> in the pop-up prompt.
                    </li>
                  </ol>
                </>
              )}

              {device === "desktop" && (
                <>
                  <p className="font-medium text-gray-800">For Chrome / Edge / Safari on Desktop:</p>
                  <ol className="list-decimal pl-5 flex flex-col gap-2">
                    <li>
                      Look at the right side of your address bar at the top of the browser.
                    </li>
                    <li>
                      Click the <strong className="text-[#2E9DA7]">Install icon ⊕</strong> or click menu <strong className="text-gray-800">⫶</strong> and choose <strong className="text-[#2E9DA7]">Save and Share &gt; Install App</strong>.
                    </li>
                    <li>
                      Confirm the desktop application shortcut installation.
                    </li>
                  </ol>
                </>
              )}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-gray-100">
              <button
                onClick={handleCloseAndBookmark}
                className="w-full py-3 rounded-xl bg-[#2E9DA7] hover:bg-[#258189] text-sm font-semibold text-white border-none cursor-pointer shadow-md transition-all active:scale-[0.98]"
              >
                Create Simulated Shortcut & Close Tab
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="w-full py-2.5 rounded-xl bg-gray-150 hover:bg-gray-200 text-xs font-semibold text-gray-700 border-none cursor-pointer transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
