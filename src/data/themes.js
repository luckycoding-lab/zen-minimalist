export const FONTS = [
  // --- Core Defaults ---
  { id: 'font-mono', label: 'Mono', class: 'font-mono' },
  { id: 'font-sans', label: 'Sans', class: 'font-sans' },
  { id: 'font-serif', label: 'Serif', class: 'font-serif' },

  // --- Developer & Tech Monospaced ---
  { id: 'font-jetbrains', label: 'JetBrains', class: "font-['JetBrains_Mono']" },
  { id: 'font-fira', label: 'Fira Code', class: "font-['Fira_Code']" },
  { id: 'font-roboto-mono', label: 'Roboto Mono', class: "font-['Roboto_Mono']" },

  // --- Sharp & Neo-Brutalist Geometric ---
  { id: 'font-space', label: 'Space Grotesk', class: "font-['Space_Grotesk']" },
  { id: 'font-syne', label: 'Syne', class: "font-['Syne']" },
  { id: 'font-orbitron', label: 'Orbitron', class: "font-['Orbitron']" },

  // --- Modern Clean SaaS & Display ---
  { id: 'font-inter', label: 'Inter', class: "font-['Inter']" },
  { id: 'font-dm', label: 'DM Sans', class: "font-['DM_Sans']" },
  { id: 'font-jakarta', label: 'Plus Jakarta', class: "font-['Plus_Jakarta_Sans']" },
  { id: 'font-poppins', label: 'Poppins', class: "font-['Poppins']" },

  // --- Bold Retro Flip-Clock / Poster ---
  { id: 'font-bebas', label: 'Bebas Neue', class: "font-['Bebas_Neue'] tracking-wider" },
  { id: 'font-oswald', label: 'Oswald', class: "font-['Oswald']" },

  // --- High-End Editorial Serif ---
  { id: 'font-playfair', label: 'Playfair', class: "font-['Playfair_Display'] italic" },
  { id: 'font-cinzel', label: 'Cinzel', class: "font-['Cinzel']" },
];

export const FONT_SIZES = [
  { id: 'normal', label: 'M', class: 'text-6xl md:text-[5rem]' },
  { id: 'large', label: 'L', class: 'text-7xl md:text-[10em]' },
  { id: 'xlarge', label: 'XL', class: 'text-8xl md:text-[15rem]' },
  { id: 'xlarge', label: 'XXL', class: 'text-8xl md:text-[20rem]' },
  { id: 'xlarge', label: 'XXL', class: 'text-8xl md:text-[25rem]' },
];

export const THEMES = [
  // --- Original Minimal Palettes ---
  { id: 'zinc', label: 'Obsidian', class: 'bg-zinc-950 text-white' },
  { id: 'amber', label: 'Ember', class: 'bg-gradient-to-tr from-amber-950 via-zinc-950 to-black text-amber-100' },
  { id: 'midnight', label: 'Midnight', class: 'bg-gradient-to-tr from-blue-950 via-zinc-950 to-black text-blue-100' },
  { id: 'emerald', label: 'Forest', class: 'bg-gradient-to-tr from-emerald-950 via-zinc-950 to-black text-emerald-100' },
  { id: 'rose', label: 'Velvet', class: 'bg-gradient-to-tr from-rose-950 via-zinc-950 to-black text-rose-100' },

  // --- Aesthetic Zen & Ambient Palettes ---
  { id: 'nordic', label: 'Nordic Frost', class: 'bg-gradient-to-tr from-cyan-950 via-slate-950 to-black text-cyan-100' },
  { id: 'amethyst', label: 'Amethyst', class: 'bg-gradient-to-tr from-purple-950 via-neutral-950 to-black text-purple-100' },
  { id: 'terracotta', label: 'Clay Hearth', class: 'bg-gradient-to-tr from-orange-950 via-stone-950 to-black text-orange-100' },
  { id: 'sage', label: 'Kyoto Sage', class: 'bg-gradient-to-tr from-teal-950 via-zinc-950 to-stone-950 text-teal-100' },

  // --- Cyber / Neo-Brutalist High Contrast ---
  { id: 'matrix', label: 'Terminal Mono', class: 'bg-black text-emerald-400' },
  { id: 'cyberpunk', label: 'Neon Tokyo', class: 'bg-gradient-to-tr from-fuchsia-950 via-zinc-950 to-black text-fuchsia-300' },
  { id: 'solar', label: 'Solar Flare', class: 'bg-gradient-to-tr from-yellow-950 via-zinc-950 to-black text-yellow-200' },

  // --- Pure Monochromes & Off-Blacks ---
  { id: 'pure-black', label: 'OLED Void', class: 'bg-black text-neutral-200' },
  { id: 'slate', label: 'Deep Slate', class: 'bg-slate-950 text-slate-100' },
  { id: 'paper-dark', label: 'Dark Parchment', class: 'bg-[#121110] text-[#e8e4dc]' },
];