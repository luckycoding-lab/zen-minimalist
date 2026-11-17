// 1. Day-Shift (Dawn, Noon Sun, Sunset Dusk, Night Moon)
export function getCircadianTheme(date = new Date()) {
  const hour = date.getHours();

  // Dawn / Early Morning (5 AM - 8 AM)
  if (hour >= 5 && hour < 8) {
    return {
      label: "Dawn",
      bg: "bg-gradient-to-br from-slate-950 via-amber-950/60 to-orange-950/40 text-amber-50",
    };
  }
  // Morning / Daylight (8 AM - 4 PM)
  if (hour >= 8 && hour < 16) {
    return {
      label: "Daylight",
      bg: "bg-gradient-to-br from-slate-900 via-sky-950/70 to-zinc-950 text-sky-50",
    };
  }
  // Golden Hour / Sunset (4 PM - 7 PM)
  if (hour >= 16 && hour < 19) {
    return {
      label: "Sunset",
      bg: "bg-gradient-to-br from-zinc-950 via-rose-950/60 to-indigo-950/50 text-rose-50",
    };
  }
  // Evening / Dusk (7 PM - 10 PM)
  if (hour >= 19 && hour < 22) {
    return {
      label: "Dusk",
      bg: "bg-gradient-to-br from-zinc-950 via-indigo-950/60 to-slate-950 text-indigo-50",
    };
  }
  // Midnight / Deep Night (10 PM - 5 AM)
  return {
    label: "Midnight",
    bg: "bg-zinc-950 text-zinc-100",
  };
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