import { useState, useRef } from "react";
import Time from "./components/Time";
import SettingsModal from "./components/SettingsModal";
import { Settings2, Maximize2, Minimize2 } from "lucide-react";
import { useFullscreenShortcut } from "./hooks/useFullscreenShortcut";

export default function App() {
  const [fontStyle, setFontStyle] = useState("font-mono");
  const [bgTheme, setBgTheme] = useState("bg-zinc-950");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSettingsBtn, setShowSettingsBtn] = useState(false);
  const hideTimeoutRef = useRef(null);

  // Fullscreen keyboard shortcut active
  const isFullscreen = useFullscreenShortcut();

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