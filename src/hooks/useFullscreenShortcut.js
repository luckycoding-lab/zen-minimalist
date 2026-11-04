import { useEffect, useState } from "react";

export function useFullscreenShortcut() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    // 1. Keyboard event listener for 'f' / 'F' key
    const handleKeyDown = (event) => {
      // Agar user kisi input field me type kar raha hai to fullscreen trigger na ho
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (activeTag === "input" || activeTag === "textarea") {
        return;
      }

      // 'f' ya 'F' press hone par toggle karein
      if (event.key === "f" || event.key === "F") {
        event.preventDefault();

        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch((err) => {
            console.error("Fullscreen request failed:", err);
          });
        } else {
          document.exitFullscreen().catch((err) => {
            console.error("Exit fullscreen failed:", err);
          });
        }
      }
    };

    // 2. Browser ke native fullscreen state change ko track karein (e.g. jab user Escape dabaye)
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };

    window.addEventListener("keydown", handleKeyDown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return isFullscreen;
}