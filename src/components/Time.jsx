import { useEffect, useState } from 'react';

export default function Time({ fontStyle = 'font-mono' }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  });

  const formattedDate = time.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className={`flex flex-col items-center select-none ${fontStyle}`}>
      <span className="text-xs uppercase tracking-widest text-zinc-400 mb-2 font-mono">
        {formattedDate}
      </span>
      <h1 className="text-9xl md:text-[200px] font-light tracking-tight text-white drop-shadow-md">
        {formattedTime}
      </h1>
    </div>
  );
}