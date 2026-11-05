import { useState, useEffect, useRef } from 'react';
import Time from './components/Time';
import SettingsModal from './components/SettingsModal';
import { Settings2 } from 'lucide-react';

const DEFAULT_SETTINGS = {
  fontStyle: 'font-mono',
  fontSize: 'text-7xl md:text-9xl',
  showSeconds: true,
  showBattery: true,
  showWeather: false,
  themeClass: 'bg-zinc-950 text-white',
};

export default function App() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('zen_settings');
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSettingsBtn, setShowSettingsBtn] = useState(false);
  const hideTimeoutRef = useRef(null);

  // Auto-save changes to localStorage
  useEffect(() => {
    localStorage.setItem('zen_settings', JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Feature 4: Double Click / Double Tap Fullscreen Toggle
  const handleDoubleClick = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Reveal floating settings button on single tap
  const handleCanvasClick = () => {
    if (isModalOpen) return;
    setShowSettingsBtn(true);
    if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    hideTimeoutRef.current = setTimeout(() => setShowSettingsBtn(false), 4000);
  };

  return (
    <div
      onClick={handleCanvasClick}
      onDoubleClick={handleDoubleClick}
      className={`h-screen w-screen relative flex items-center justify-center transition-all duration-700 select-none ${settings.themeClass}`}
    >
      <Time
        fontStyle={settings.fontStyle}
        fontSizeClass={settings.fontSize}
        showSeconds={settings.showSeconds}
        showBattery={settings.showBattery}
        showWeather={settings.showWeather}
      />

      {/* Floating Settings Button (Bottom Right) */}
      <div
        className={`fixed bottom-8 right-8 z-40 transition-all duration-300 ${
          showSettingsBtn || isModalOpen
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsModalOpen((prev) => !prev);
          }}
          className="p-3 rounded-full border border-zinc-800 bg-zinc-900/90 text-zinc-400 shadow-xl backdrop-blur-md transition hover:text-white hover:bg-zinc-800 cursor-pointer"
          title="Settings"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Right Aligned Settings Drawer */}
      <SettingsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        settings={settings}
        updateSetting={updateSetting}
      />
    </div>
  );
}