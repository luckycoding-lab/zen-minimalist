import { useEffect, useState } from "react";

export function useFullscreenShortcut() {
  const [isFullscreen, setIsFullscreen] = useState(
    Boolean(document.fullscreenElement)
  );

  useEffect(() => {
    const handleKeyDown = (event) => {
      // Ignore if typing in an input, textarea, or select
      const activeTag = document.activeElement?.tagName.toLowerCase();
      if (
        activeTag === "input" ||
        activeTag === "textarea" ||
        activeTag === "select" ||
        document.activeElement?.isContentEditable
      ) {
        return;
      }

      // Ignore Ctrl+F / Cmd+F (browser find)
      if (event.ctrlKey || event.metaKey || event.altKey) return;

      if (event.key === "f" || event.key === "F" || event.code === "KeyF") {
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