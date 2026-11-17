import { useState, useEffect, useRef } from "react";
import Time from "./components/Time";
import SettingsModal from "./components/SettingsModal";
import { Settings2 } from "lucide-react";
import { useBatteryStatus } from "./hooks/useBatteryStatus";
import { useWeatherData } from "./hooks/useWeatherData";
import { useFullscreenShortcut } from "./hooks/useFullscreenShortcut";
import {
  getBatteryReactiveTheme,
  getCircadianTheme,
} from "./utils/dynamicThemes";
import {
  saveCustomBackground,
  loadCustomBackground,
  clearCustomBackground,
} from "./utils/bgStorage";

const DEFAULT_SETTINGS = {
  fontStyle: "font-mono",
  fontSize: "text-6xl sm:text-8xl md:text-9xl",
  is24Hour: false,
  showSeconds: true,
  showBattery: true,
  showWeather: true,
  themeType: "custom",
  themeClass: "bg-zinc-950 text-white",
  bgBlur: false,
};

export default function App() {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem("zen_settings");
      return saved
        ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) }
        : DEFAULT_SETTINGS;
    } catch {
      return DEFAULT_SETTINGS;
    }
  });

  const [customBgUrl, setCustomBgUrl] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSettingsBtn, setShowSettingsBtn] = useState(false);
  const hideTimeoutRef = useRef(null);

  // Activate 'F' keyboard fullscreen shortcut
  useFullscreenShortcut();

  const battery = useBatteryStatus();
  const weather = useWeatherData(settings.showWeather);

  // Load saved wallpaper from device IndexedDB on startup
  useEffect(() => {
    loadCustomBackground().then((url) => {
      if (url) setCustomBgUrl(url);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("zen_settings", JSON.stringify(settings));
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
  };

  // Handle user uploading an image from phone/PC storage
  const handleBackgroundUpload = async (file) => {
    if (!file) return;
    const objectUrl = await saveCustomBackground(file);
    setCustomBgUrl(objectUrl);
    updateSetting("themeType", "image");
  };

  const handleRemoveBackground = async () => {
    await clearCustomBackground();
    setCustomBgUrl(null);
    updateSetting("themeType", "custom");
  };

  const resolveTheme = () => {
    if (settings.themeType === "image" && customBgUrl) {
      return "bg-zinc-950 text-white";
    }
    if (settings.themeType === "circadian") {
      return getCircadianTheme().bg;
    }
    if (settings.themeType === "battery") {
      return getBatteryReactiveTheme(battery).bg;
    }
    return settings.themeClass;
  };

  // Double-click canvas only (blocked on Settings button & Modal)
  const handleDoubleClick = () => {
    if (isModalOpen) return;
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

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
      className={`h-dvh w-full overflow-hidden relative flex flex-col items-center justify-center p-4 transition-all duration-1000 select-none ${resolveTheme()}`}
    >
      {/* Custom Uploaded Wallpaper Layer */}
      {settings.themeType === "image" && customBgUrl && (
        <>
          <div
            style={{ backgroundImage: `url(${customBgUrl})` }}
            className={`absolute inset-0 bg-cover bg-center transition-all duration-700 ${
              settings.bgBlur ? "blur-md scale-105" : ""
            }`}
          />
          <div className="absolute inset-0 bg-black/45" />
        </>
      )}

      {/* Main Clock Display */}
      <div className="relative z-10">
        <Time
          fontStyle={settings.fontStyle}
          fontSizeClass={settings.fontSize}
          is24Hour={settings.is24Hour}
          showSeconds={settings.showSeconds}
          showBattery={settings.showBattery}
          batteryData={battery}
          showWeather={settings.showWeather}
          weatherData={weather}
        />
      </div>

      {/* Floating Settings Button (Double-click isolated) */}
      <div
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
        className={`fixed bottom-5 right-5 sm:bottom-8 sm:right-8 z-40 transition-all duration-300 ${
          showSettingsBtn || isModalOpen
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <button
          type="button"
          onClick={() => setIsModalOpen((prev) => !prev)}
          className="p-3 sm:p-3.5 rounded-full border border-white/10 bg-zinc-950/60 text-zinc-300 shadow-xl backdrop-blur-xl transition hover:text-white hover:bg-zinc-900 cursor-pointer"
          title="Settings"
        >
          <Settings2 className="w-5 h-5" />
        </button>
      </div>

      {/* Settings Modal (Double-click isolated) */}
      <div
        onClick={(e) => e.stopPropagation()}
        onDoubleClick={(e) => e.stopPropagation()}
      >
        <SettingsModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          settings={settings}
          updateSetting={updateSetting}
          customBgUrl={customBgUrl}
          onUploadBg={handleBackgroundUpload}
          onRemoveBg={handleRemoveBackground}
        />
      </div>
    </div>
  );
}