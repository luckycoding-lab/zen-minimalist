import { X, SunMoon, Upload, Trash2, Zap } from 'lucide-react';
import { FONTS, FONT_SIZES, THEMES } from '../data/themes';

export default function SettingsModal({
  isOpen,
  onClose,
  settings,
  updateSetting,
  customBgUrl,
  onUploadBg,
  onRemoveBg,
}) {
  if (!isOpen) return null;

  return (
    <aside
      onClick={(e) => e.stopPropagation()}
      onDoubleClick={(e) => e.stopPropagation()}
      className="fixed liquid-scrollbar bottom-24 right-8 z-50 w-96 max-w-[calc(100vw-2rem)] max-h-[80vh] overflow-y-auto rounded-3xl  bg-zinc-950/75 p-5 text-zinc-100 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.9),inset_0_1px_0_0_rgba(255,255,255,0.15)] backdrop-blur-3xl backdrop-saturate-150 space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-200"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
        <div className="flex items-center gap-2.5">
          {/* <div className="p-1.5 rounded-xl bg-white/10 border border-white/15 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.2)]">
            <Sparkles className="w-4 h-4 text-zinc-200" />
          </div> */}
          <h3 className="text-xs font-semibold uppercase tracking-widest text-zinc-200">
            Settings
          </h3>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-xs rounded-xl border border-white/10 bg-white/5 text-zinc-400 hover:border-white/25 hover:bg-white/15 hover:text-white active:scale-95 transition-all duration-150 cursor-pointer"
          title="Close Settings"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Font Family Selection */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono font-medium text-zinc-400/90 uppercase tracking-widest">
          Typography
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {FONTS.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => {
                updateSetting('fontStyle', f.class);
                if (f.family) updateSetting('fontFamily', f.family);
              }}
              className={`py-2 px-1.5 text-xs rounded-xl border transition-all duration-150 cursor-pointer truncate active:scale-[0.98] ${
                settings.fontStyle === f.class
                  ? 'border-white/45 bg-white/15 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.12),inset_0_1px_0_0_rgba(255,255,255,0.2)]'
                  : 'border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:border-white/15 hover:bg-white/[0.07] hover:text-zinc-100'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Font Size Selection */}
      <div className="space-y-2">
        <label className="block text-[10px] font-mono font-medium text-zinc-400/90 uppercase tracking-widest">
          Clock Size
        </label>
        <div className="grid grid-cols-3 gap-1.5">
          {FONT_SIZES.map((s) => (
            <button
              key={s.id}
              type="button"
              onClick={() => updateSetting('fontSize', s.class)}
              className={`py-2 text-xs rounded-xl border transition-all duration-150 cursor-pointer active:scale-[0.98] ${
                settings.fontSize === s.class
                  ? 'border-white/45 bg-white/15 text-white font-medium shadow-[0_0_15px_rgba(255,255,255,0.12),inset_0_1px_0_0_rgba(255,255,255,0.2)]'
                  : 'border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:border-white/15 hover:bg-white/[0.07] hover:text-zinc-100'
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
      </div>

      {/* Functional Toggles (12/24H, Seconds, Battery, Weather) */}
      <div className="space-y-2.5 border-t border-white/10 pt-3.5">
        <label className="block text-[10px] font-mono font-medium text-zinc-400/90 uppercase tracking-widest">
          Display Elements
        </label>

        {/* 12H / 24H Format Row */}
        <div className="flex items-center justify-between text-xs pb-1">
          <span className="text-zinc-300 font-medium">Time Format</span>
          <div className="flex rounded-xl border border-white/10 bg-black/40 p-0.5 shadow-inner">
            <button
              type="button"
              onClick={() => updateSetting('is24Hour', false)}
              className={`px-3 py-1 text-[11px] rounded-lg transition-all duration-150 cursor-pointer ${
                !settings.is24Hour
                  ? 'bg-white text-zinc-950 font-semibold shadow-[0_2px_8px_rgba(255,255,255,0.25)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              12H
            </button>
            <button
              type="button"
              onClick={() => updateSetting('is24Hour', true)}
              className={`px-3 py-1 text-[11px] rounded-lg transition-all duration-150 cursor-pointer ${
                settings.is24Hour
                  ? 'bg-white text-zinc-950 font-semibold shadow-[0_2px_8px_rgba(255,255,255,0.25)]'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              24H
            </button>
          </div>
        </div>

        {/* Toggle Switches */}
        <div className="space-y-2.5">
          {[
            { key: 'showSeconds', label: 'Seconds Counter' },
            { key: 'showBattery', label: 'Battery Status' },
            { key: 'showWeather', label: 'Weather Indicator' },
          ].map(({ key, label }) => (
            <div key={key} className="flex items-center justify-between text-xs">
              <span className="text-zinc-300">{label}</span>
              <button
                type="button"
                onClick={() => updateSetting(key, !settings[key])}
                className={`w-9 h-5 rounded-full transition-all duration-200 relative cursor-pointer border ${
                  settings[key]
                    ? 'bg-white border-white shadow-[0_0_10px_rgba(255,255,255,0.3)]'
                    : 'bg-white/10 border-white/10'
                }`}
              >
                <span
                  className={`block w-3.5 h-3.5 rounded-full shadow-sm transition-transform duration-200 ${
                    settings[key] ? 'translate-x-4.5 bg-zinc-950' : 'translate-x-0.5 bg-white'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Custom Wallpaper Upload (Device Storage) */}
      <div className="space-y-2 border-t border-white/10 pt-3.5">
        <label className="block text-[10px] font-mono font-medium text-zinc-400/90 uppercase tracking-widest">
          Custom Wallpaper
        </label>
        <div className="flex items-center gap-2">
          <label className="flex-1 cursor-pointer py-2 px-3 rounded-xl border border-dashed border-white/15 bg-white/[0.03] text-xs text-zinc-300 hover:border-white/40 hover:bg-white/[0.08] hover:text-white transition-all duration-150 flex items-center justify-center gap-2">
            <Upload className="w-3.5 h-3.5 text-zinc-200" />
            <span className="font-medium">{customBgUrl ? 'Change Image' : 'Upload from Device'}</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (onUploadBg) onUploadBg(e.target.files?.[0]);
                e.target.value = '';
              }}
            />
          </label>

          {customBgUrl && (
            <>
              <button
                type="button"
                onClick={() => {
                  updateSetting('themeType', 'image');
                  updateSetting('bgBlur', !settings.bgBlur);
                }}
                className={`py-2 px-3 rounded-xl text-xs border transition-all duration-150 cursor-pointer active:scale-95 ${
                  settings.bgBlur
                    ? 'border-white/45 bg-white/15 text-white font-semibold shadow-[0_0_12px_rgba(255,255,255,0.15)]'
                    : 'border-white/10 bg-white/[0.04] text-zinc-400 hover:border-white/20 hover:text-white'
                }`}
              >
                Blur
              </button>
              <button
                type="button"
                onClick={onRemoveBg}
                className="p-2 rounded-xl text-xs border border-red-500/25 bg-red-500/10 text-red-400 hover:border-red-500/40 hover:bg-red-500/20 hover:text-red-300 transition-all duration-150 cursor-pointer active:scale-95"
                title="Remove Wallpaper"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Theme Selection Panel */}
      <div className="space-y-2 border-t border-white/10 pt-3.5">
        <label className="block text-[10px] font-mono font-medium text-zinc-400/90 uppercase tracking-widest">
          Themes
        </label>

        {/* 1. Dynamic Circadian (Day & Night) Button */}
        <button
          type="button"
          onClick={() => updateSetting('themeType', 'circadian')}
          className={`w-full py-2.5 px-3 text-xs rounded-xl border flex items-center justify-between transition-all duration-150 cursor-pointer active:scale-[0.99] ${
            settings?.themeType === 'circadian'
              ? 'border-amber-400/50 bg-amber-500/15 text-amber-200 font-semibold shadow-[0_0_16px_rgba(245,158,11,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
              : 'border-white/[0.06] bg-white/[0.03] text-zinc-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <SunMoon className="w-4 h-4 text-amber-400" />
            <span>Circadian (Day & Night)</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md border border-white/10 bg-black/30 text-zinc-400">
            Time
          </span>
        </button>

        {/* 2. Dynamic Battery Reactive Button */}
        <button
          type="button"
          onClick={() => updateSetting('themeType', 'battery')}
          className={`w-full py-2.5 px-3 text-xs rounded-xl border flex items-center justify-between transition-all duration-150 cursor-pointer active:scale-[0.99] ${
            settings?.themeType === 'battery'
              ? 'border-emerald-400/50 bg-emerald-500/15 text-emerald-300 font-semibold shadow-[0_0_16px_rgba(16,185,129,0.15),inset_0_1px_0_0_rgba(255,255,255,0.1)]'
              : 'border-white/[0.06] bg-white/[0.03] text-zinc-300 hover:border-white/15 hover:bg-white/[0.07] hover:text-white'
          }`}
        >
          <div className="flex items-center gap-2.5">
            <Zap className="w-4 h-4 text-emerald-400" />
            <span>Battery Reactive Mode</span>
          </div>
          <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-md border border-white/10 bg-black/30 text-zinc-400">
            Auto
          </span>
        </button>

        {/* 3. Static / Custom Color Themes */}
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          {THEMES.map((t) => {
            const isSelected =
              settings?.themeClass === t.class && settings?.themeType === 'custom';
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => {
                  updateSetting('themeClass', t.class);
                  updateSetting('themeType', 'custom');
                }}
                className={`py-2 px-3 text-xs rounded-xl border text-left transition-all duration-150 cursor-pointer truncate active:scale-[0.98] ${
                  isSelected
                    ? 'border-white/45 bg-white/15 text-white font-semibold shadow-[0_0_14px_rgba(255,255,255,0.12),inset_0_1px_0_0_rgba(255,255,255,0.15)]'
                    : 'border-white/[0.06] bg-white/[0.03] text-zinc-400 hover:border-white/15 hover:bg-white/[0.07] hover:text-zinc-100'
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