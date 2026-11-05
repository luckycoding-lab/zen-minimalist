import { X, Sparkles } from 'lucide-react';
import { FONTS, FONT_SIZES, THEMES } from '../data/themes';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateSetting
}) {
  if (!isOpen) return null;

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      className="fixed bottom-24 right-8 z-50 w-80 max-h-[80vh] overflow-y-auto rounded-2xl border border-zinc-800/80 bg-zinc-950/95 p-5 text-zinc-200 shadow-2xl backdrop-blur-2xl space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-400" />
          <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-300">Settings</h3>
        </div>
        <button
          onClick={onClose}
          className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
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
              className={`py-1.5 text-xs rounded-lg border transition cursor-pointer ${
                settings.fontStyle === f.class
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
              className={`py-1.5 text-xs rounded-lg border transition cursor-pointer ${
                settings.fontSize === s.class
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
                className={`w-9 h-5 rounded-full transition-colors relative cursor-pointer ${
                  settings[key] ? 'bg-blue-600' : 'bg-zinc-800'
                }`}
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full bg-white transition-transform ${
                    settings[key] ? 'translate-x-4.5' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Centralized Themes */}
      <div className="space-y-1.5 border-t border-zinc-800/80 pt-3">
        <label className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider">Themes</label>
        <div className="grid grid-cols-2 gap-1.5">
          {THEMES.map((t) => (
            <button
              key={t.id}
              onClick={() => updateSetting('themeClass', t.class)}
              className={`py-2 px-3 text-xs rounded-lg border text-left transition cursor-pointer truncate ${
                settings.themeClass === t.class
                  ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                  : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}