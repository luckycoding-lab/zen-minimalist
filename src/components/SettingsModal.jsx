import { X, Sparkles, BatteryCharging } from 'lucide-react';
import { FONTS, FONT_SIZES, THEMES } from '../data/themes';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateSetting,
}) {
  if (!isOpen) return null;

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className="fixed liquid-scrollbar bottom-24 right-8 z-50 w-100 max-h-[80vh] overflow-y-auto rounded-3xl border border-white/10 bg-zinc-950/40 p-5 text-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.8),inset_0_1px_1px_rgba(255,255,255,0.2)] backdrop-blur-2xl backdrop-saturate-150 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Settings</h3>
        </div>
        <button
          onClick={onClose}
          className="py-2 px-3 text-xs rounded-xl border border-blue-400/50 bg-blue-500/20 text-blue-200 font-semibold shadow-[0_0_15px_rgba(59,130,246,0.3),inset_0_1px_1px_rgba(255,255,255,0.2)] transition-all cursor-pointer truncate"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Font Family Selection */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Typography</label>
        <div className="grid grid-cols-3 gap-1.5">
          {FONTS.map((f) => (
            <button
              key={f.id}
              onClick={() => updateSetting('fontStyle', f.class)}
              className={`py-1.5 text-xs rounded-lg border transition cursor-pointer ${settings.fontStyle === f.class
                ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Selection */}
      <div className="space-y-1.5">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Clock Size</label>
        <div className="grid grid-cols-3 gap-1.5">
          {FONT_SIZES.map((s) => (
            <button
              key={s.id}
              onClick={() => updateSetting('fontSize', s.class)}
              className={`py-1.5 text-xs rounded-lg border transition cursor-pointer ${settings.fontSize === s.class
                ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Functional Toggles (Seconds, Battery, Weather) */}
      <div className="space-y-2 border-t border-zinc-800/80 pt-3">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Display Elements</label>
        <div className="space-y-2">
          {[
            { key: 'showSeconds', label: 'Seconds Counter' },
            { key: 'showBattery', label: 'Battery Status' },
            { key: 'showWeather', label: 'Weather Indicator' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-zinc-300">{label}</span>
              <button
                onClick={() => updateSetting(key, !settings[key])}
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${settings[key] ? 'bg-blue-600' : 'bg-zinc-800'
                  }`}
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${settings[key] ? 'translate-x-4.5' : 'translate-x-1'
                    }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Theme Selection Panel */}
      <div className="space-y-2 border-t border-zinc-800/80 pt-3">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Themes</label>

        {/* 1. Dynamic Battery Reactive Button */}
        <button
          type="button"
          onClick={() => {
            updateSetting('themeType', 'battery');
          }}
          className={`w-full py-2.5 px-3 text-xs rounded-xl border flex items-center justify-between transition cursor-pointer ${settings?.themeType === 'battery'
              ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400 font-semibold shadow-sm'
              : 'border-zinc-800 bg-zinc-900 text-zinc-300 hover:text-white'
            }`}
        >
          <div className="flex items-center gap-2">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span>Battery Reactive Mode</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-400">
            Auto
          </span>
        </button>

        {/* 2. Static / Custom Color Themes */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {THEMES.map((t) => {
            const isSelected = settings?.themeClass === t.class && settings?.themeType === 'custom';
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  updateSetting('themeClass', t.class);
                  updateSetting('themeType', 'custom');
                }}
                className={`py-2 px-3 text-xs rounded-lg border text-left transition cursor-pointer truncate ${isSelected
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                  }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      </div>
    </aside>
  );
}