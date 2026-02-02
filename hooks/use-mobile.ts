import { useEffect, useState } from "react";

/**
 * Custom hook to detect if the viewport is mobile-sized
 * @returns boolean indicating if viewport width is less than 768px
 */
export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    // Initial check
    checkMobile();

    // Listen for resize events
    window.addEventListener("resize", checkMobile);
    
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile;
}
