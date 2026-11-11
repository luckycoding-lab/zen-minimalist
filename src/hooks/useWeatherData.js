import { useEffect, useState } from "react";

export function useWeatherData(enabled = true) {
  const [weather, setWeather] = useState({
    temp: "--",
    condition: "Clear",
    loading: true,
  });

  useEffect(() => {
    if (!enabled) return;

    // 1. Agar geolocation available nahi hai, loading false karke default set karein
    if (!("geolocation" in navigator)) {
      setWeather((prev) => ({ ...prev, temp: "24°C", condition: "Sunny", loading: false }));
      return;
    }

    let isMounted = true;

    // 2. Browser geolocation call
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          const res = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,weather_code`
          );
          const data = await res.json();
          const temp = Math.round(data.current?.temperature_2m ?? 24);

          if (isMounted) {
            setWeather({ temp: `${temp}°C`, condition: "Live", loading: false });
          }
        } catch {
          if (isMounted) {
            setWeather({ temp: "24°C", condition: "Sunny", loading: false });
          }
        }
      },
      () => {
        // User permission deny ya location error handling
        if (isMounted) {
          setWeather({ temp: "24°C", condition: "Default", loading: false });
        }
      }
    );

    return () => {
      isMounted = false;
    };
  }, [enabled]);

  return weather;
}