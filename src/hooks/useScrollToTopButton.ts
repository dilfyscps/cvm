import { useEffect, useState } from "react";

export function useScrollToTopButton(threshold = 300) {
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        setShowTopButton(window.scrollY > threshold);
        ticking = false;
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  return showTopButton;
}
