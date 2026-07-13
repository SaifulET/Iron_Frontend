import { usePWAInstall } from "@/hooks/usePWAInstall";

interface AddToHomeScreenButtonProps {
  className?: string;
  onClick?: () => void;
  showTextOnMobile?: boolean;
  size?: "small" | "large";
}

export default function AddToHomeScreenButton({
  className = "",
  onClick,
  showTextOnMobile = false,
  size = "large",
}: AddToHomeScreenButtonProps) {
  const { installPWA } = usePWAInstall();

  const handleInstallClick = () => {
    if (onClick) {
      onClick();
    } else {
      installPWA();
    }
  };

  if (size === "small") {
    return (
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
    );
  }

  return (
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
  );
}
