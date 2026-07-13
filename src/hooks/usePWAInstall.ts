"use client";

import { useEffect, useState } from "react";

// Extend window interface to recognize beforeinstallprompt event
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt(): Promise<void>;
}

let deferredPrompt: BeforeInstallPromptEvent | null = null;
let listeners = new Set<() => void>();

const notifyListeners = () => {
  listeners.forEach((listener) => listener());
};

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e) => {
    // Prevent Chrome 67 and earlier from automatically showing the prompt
    e.preventDefault();
    // Stash the event so it can be triggered later.
    deferredPrompt = e as BeforeInstallPromptEvent;
    notifyListeners();
  });
}

export function usePWAInstall() {
  const [isInstallable, setIsInstallable] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Register service worker if supported
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          console.log("Service Worker registered successfully:", reg.scope);
        })
        .catch((err) => {
          console.error("Service Worker registration failed:", err);
        });
    }

    setIsInstallable(!!deferredPrompt);

    const handleUpdate = () => {
      setIsInstallable(!!deferredPrompt);
    };

    listeners.add(handleUpdate);
    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const installPWA = async () => {
    if (!deferredPrompt) {
      // Check if it is iOS Safari which does not support beforeinstallprompt
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;
      if (isIOS) {
        alert(
          "To install Bookly on your iOS device:\n\n1. Tap the Share button in Safari (at the bottom/top of the screen)\n2. Scroll down and tap 'Add to Home Screen' (+ icon)\n3. Tap 'Add' to confirm."
        );
      } else {
        alert(
          "Bookly installation is not fully supported or already installed. You can also install it via your browser's menu (e.g. 'Install App' or 'Add to Home screen')."
        );
      }
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response to the install prompt: ${outcome}`);

    // We've used the prompt, and can't use it again, discard it
    deferredPrompt = null;
    setIsInstallable(false);
    notifyListeners();
  };

  return { isInstallable, installPWA };
}
