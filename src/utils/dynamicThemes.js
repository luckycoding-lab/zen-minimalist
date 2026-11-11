// 1. Day-Shift (Dawn, Noon Sun, Sunset Dusk, Night Moon)
export function getDayShiftTheme(date = new Date()) {
  const hour = date.getHours();

  if (hour >= 5 && hour < 8) {
    // Dawn / Sunrise (Soft peach & warm gold)
    return {
      bg: 'bg-gradient-to-tr from-amber-700 via-rose-900 to-indigo-950',
      text: 'text-amber-100',
      label: 'Dawn Rise 🌅',
    };
  } else if (hour >= 8 && hour < 17) {
    // Day / Bright Sun (Clean, high clarity minimal azure)
    return {
      bg: 'bg-gradient-to-b from-sky-900 via-slate-900 to-zinc-950',
      text: 'text-sky-50',
      label: 'Bright Sun ☀️',
    };
  } else if (hour >= 17 && hour < 20) {
    // Sunset / Dusk (Deep purple, burnt orange)
    return {
      bg: 'bg-gradient-to-tr from-orange-950 via-purple-950 to-zinc-950',
      text: 'text-orange-100',
      label: 'Golden Sunset 🌇',
    };
  } else {
    // Night / Moon (Deep Obsidian & Starry midnight)
    return {
      bg: 'bg-gradient-to-b from-zinc-950 via-black to-slate-950',
      text: 'text-zinc-200',
      label: 'Midnight Moon 🌙',
    };
  }
}

// 2. Battery Reactive Theme
export function getBatteryReactiveTheme(battery) {
  if (battery.charging) {
    // Charging mode (Neon electric glow)
    return {
      bg: 'bg-gradient-to-tr from-emerald-950 via-teal-950 to-zinc-950',
      text: 'text-emerald-300',
      label: 'Charging ⚡',
    };
  }

  if (battery.level <= 20) {
    // Low Battery (Dim crimson warning)
    return {
      bg: 'bg-gradient-to-tr from-red-950 via-stone-950 to-black',
      text: 'text-red-200',
      label: 'Low Power (<20%)',
    };
  } else if (battery.level <= 60) {
    // Medium Battery (Amber/Ember)
    return {
      bg: 'bg-gradient-to-tr from-amber-950 via-zinc-950 to-black',
      text: 'text-amber-200',
      label: 'Balanced Energy',
    };
  } else {
    // Full / High Battery (Deep Sapphire Ocean)
    return {
      bg: 'bg-gradient-to-tr from-blue-950 via-slate-950 to-black',
      text: 'text-blue-100',
      label: 'Full Battery (>60%)',
    };
  }
}