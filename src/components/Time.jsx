import { Battery, CloudSun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Time({ 
  fontStyle = 'font-sans', 
  fontSizeClass = 'text-7xl md:text-9xl',
  showSeconds = true,
  showBattery = true,
  showWeather = false }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    ...(showSeconds && { second: '2-digit' }),
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`flex flex-col items-center select-none ${fontStyle}`}>
      {/* Top Meta Bar: Date, Battery, Weather */}
      <div className="flex items-center gap-4 text-xs uppercase tracking-widest text-zinc-400 mb-3 font-mono">
        <span>{formattedDate}</span>
        
        {showBattery && (
          <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-4">
            <Battery className="w-3.5 h-3.5 text-emerald-400" />
            <span>85%</span>
          </div>
        )}

        {showWeather && (
          <div className="flex items-center gap-1.5 border-l border-zinc-800 pl-4">
            <CloudSun className="w-3.5 h-3.5 text-amber-300" />
            <span>24°C</span>
          </div>
        )}
      </div>

      {/* Main Clock: tabular-nums eliminates character width jumps */}
      <h1 className={`${fontSizeClass} font-light tracking-tight tabular-nums select-none leading-none drop-shadow-sm`}>
        {formattedTime}
      </h1>
    </div>
  );
}