import { Battery, BatteryCharging, CloudSun } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Time({
  fontStyle = 'font-mono',
  fontSizeClass = 'text-7xl md:text-9xl',
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
      {/* 2. Top Meta Bar: Date -> Battery -> Live Weather */}
      <div className="flex items-center gap-3 text-xs tracking-widest text-zinc-400 mb-3 font-mono">
        <span>{formattedDate}</span>

        {showBattery && (
          <div className="flex items-center gap-1.5 border-l border-zinc-800/80 pl-3">
            {batteryData.charging ? (
              <BatteryCharging className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            ) : (
              <Battery className="w-3.5 h-3.5 text-zinc-400" />
            )}
            <span>{batteryData.level}%</span>
          </div>
        )}

        {showWeather && (
          <div className="flex items-center gap-1.5 border-l border-zinc-800/80 pl-3">
            <CloudSun className="w-3.5 h-3.5 text-amber-300" />
            <span>{weatherData.temp}</span>
          </div>
        )}
      </div>


      {/* 3. Tabular Clock */}
      <h1 className={`${fontSizeClass} font-light tracking-tight tabular-nums select-none leading-none drop-shadow-md`}>
        {formattedTime}
      </h1>
    </div>
  );
}