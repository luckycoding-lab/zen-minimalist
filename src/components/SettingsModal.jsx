import { X, Sparkles } from 'lucide-react';

export default function SettingsModal({
  isOpen,
  onClose,
  fontStyle,
  setFontStyle,
  bgTheme,
  setBgTheme,
}) {
  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-950/90 p-5 text-zinc-200 shadow-2xl backdrop-blur-xl space-y-5"
      >
        <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400" />
            <h3 className="text-sm font-medium">Zen Minimalist Settings</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-800 hover:text-white transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Font Style Switcher */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400">Typography</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'font-mono', label: 'Mono' },
              { id: 'font-sans', label: 'Sans' },
              { id: 'font-serif', label: 'Serif' },
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFontStyle(f.id)}
                className={`py-1.5 text-xs rounded-lg border transition cursor-pointer ${
                  fontStyle === f.id
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Preset Background Gradients */}
        <div className="space-y-2">
          <label className="text-xs font-mono text-zinc-400">Background Tone</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'bg-zinc-950', label: 'Obsidian' },
              { id: 'bg-gradient-to-tr from-amber-950 via-zinc-950 to-black', label: 'Amber' },
              { id: 'bg-gradient-to-tr from-blue-950 via-zinc-950 to-black', label: 'Midnight' },
            ].map((bg) => (
              <button
                key={bg.id}
                onClick={() => setBgTheme(bg.id)}
                className={`py-1.5 text-xs rounded-lg border transition cursor-pointer ${
                  bgTheme === bg.id
                    ? 'border-blue-500 bg-blue-500/10 text-blue-400 font-semibold'
                    : 'border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-white'
                }`}
              >
                {bg.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}