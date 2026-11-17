import { Battery, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Time({
  fontStyle = 'font-mono',
  fontFamily,
  fontSizeClass = 'text-7xl md:text-9xl',
  is24Hour = false,
  showSeconds = true,
  showBattery = true, 
  showWeather = true,
  batteryData,
  weatherData,
}) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const rawHours = time.getHours();
  const ampm = rawHours >= 12 ? 'PM' : 'AM';
  const displayHours = is24Hour
    ? String(rawHours).padStart(2, '0')
    : String(rawHours % 12 || 12).padStart(2, '0');
  const displayMinutes = String(time.getMinutes()).padStart(2, '0');
  const displaySeconds = String(time.getSeconds()).padStart(2, '0');

  const formattedTime = showSeconds
    ? `${displayHours}:${displayMinutes}:${displaySeconds}`
    : `${displayHours}:${displayMinutes}`;

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div
      style={fontFamily ? { fontFamily } : undefined}
      className={`flex flex-col items-center select-none ${fontStyle}`}
    >
      {/* Top Meta Bar: Date -> Battery -> Live Weather */}
      <div className="flex items-center gap-3 text-xs tracking-widest text-zinc-400 mb-3 font-mono">
        <span>{formattedDate}</span>

        {showBattery && batteryData && (
          <div className="flex items-center gap-1.5 border-l border-zinc-800/80 pl-3">
            {batteryData.charging ? (
              <Zap className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <Battery className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span>{batteryData.level}%</span>
          </div>
        )}

        {showWeather && weatherData && (
          <div className="flex items-center gap-1.5 border-l border-zinc-800/80 pl-3">
            <img
              src="https://img.icons8.com/glassmorphism/48/partly-cloudy-day.png  "
              alt="Zen Minimalist Logo"
              className="w-5.5 h-5.5 rounded-xl object-cover"
            />
            <span>{weatherData.temp}</span>
          </div>
        )}
      </div>

      {/* Main Tabular Clock + AM/PM Badge */}
      <div className="flex items-baseline justify-center">
        <h1
          className={`${fontSizeClass} font-light tracking-tight tabular-nums select-none leading-none drop-shadow-md`}
        >
          {formattedTime}
        </h1>

        {!is24Hour && (
          <span className="ml-2 sm:ml-3 text-lg sm:text-2xl font-medium opacity-60 tracking-widest">
            {ampm}
          </span>
        )}
      </div>
    </div>
  );
}