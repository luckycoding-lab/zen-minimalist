import { useEffect, useState } from "react";

export function useBatteryStatus() {
  const [battery, setBattery] = useState({
    level: 100,
    charging: false,
    supported: false,
  });
  useEffect(() => {
    if ("getBattery" in navigator) {
      navigator.getBattery().then((bm) => {
        const update = () => {
          setBattery({
            level: Math.round(bm.level * 100),
            charging: bm.charging,
            supported: true,
          });
        };
        update();
        bm.addEventListener("levelchange", update);
        bm.addEventListener("chargingchange", update);
      });
    }
  }, []);
  return battery;
}
