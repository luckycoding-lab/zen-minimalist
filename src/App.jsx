import { useState, useEffect, useRef } from "react";
import Time from "./components/Time";
import SettingsModal from "./components/SettingsModal";
import { Settings2 } from "lucide-react";
import { useFullscreenShortcut } from "./hooks/useFullscreenShortcut";

export default function App() {
  // 1. Initial load: Check localStorage first, fallback to defaults if not found
  const [fontStyle, setFontStyle] = useState(() => {
    return localStorage.getItem("zen_fontStyle") || "font-sans";
  });

  const [bgTheme, setBgTheme] = useState(() => {
    return localStorage.getItem("zen_bgTheme") || "bg-zinc-950";
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSettingsBtn, setShowSettingsBtn] = useState(false);
  const hideTimeoutRef = useRef(null);

  // Fullscreen hook
  useFullscreenShortcut();

  // 2. Auto-save fontStyle jab bhi user update kare
  useEffect(() => {
    localStorage.setItem("zen_fontStyle", fontStyle);
  }, [fontStyle]);

  // 3. Auto-save bgTheme jab bhi user update kare
  useEffect(() => {
    localStorage.setItem("zen_bgTheme", bgTheme);
  }, [bgTheme]);

  // Screen tap to reveal settings button
  const handleCanvasClick = () => {
    if (isModalOpen) return;

    setShowSettingsBtn(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);

    hideTimeoutRef.current = setTimeout(() => {
      setShowSettingsBtn(false);
    }, 4000);
  };

  return (
    <div
      onClick={handleCanvasClick}
      className={`h-screen w-screen relative flex items-center justify-center transition-colors duration-700 ${bgTheme}`}
    >
      {/* Center Clock */}
      <Time fontStyle={fontStyle} />

      {/* Floating Action Controls */}
      <div
        className={`fixed bottom-8 right-8 z-40 flex items-center gap-2 transition-all duration-300 ${
          showSettingsBtn || isModalOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen(true);
          }}
          className="p-3 rounded-full border border-zinc-800 bg-zinc-900/80 text-zinc-400 shadow-xl backdrop-blur-md transition hover:text-white hover:bg-zinc-800 cursor-pointer"
          title="Settings"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fontStyle={fontStyle}
        setFontStyle={setFontStyle}
        bgTheme={bgTheme}
        setBgTheme={setBgTheme}
      />
    </div>
  );
}