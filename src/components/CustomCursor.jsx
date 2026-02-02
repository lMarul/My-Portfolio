import { useEffect, useRef, useState } from "react";

/**
 * CustomCursor - Simple Red Diamond Cursor (Optimized)
 * Minimal, performant cursor without heavy DOM manipulation
 */
export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    document.body.style.cursor = "none";
    
    const style = document.createElement("style");
    style.textContent = `*, *::before, *::after { cursor: none !important; }`;
    document.head.appendChild(style);

    const cursor = cursorRef.current;
    const glow = glowRef.current;

    const handleMouseMove = (e) => {
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
      if (glow) {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      }
    };

    const handleMouseEnter = (e) => {
      const target = e.target;
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") ||
        target.closest("button") ||
        target.classList.contains("cursor-hover")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);

    return () => {
      document.body.style.cursor = "auto";
      style.remove();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
    };
  }, []);

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{
          width: isHovering ? "18px" : "10px",
          height: isHovering ? "18px" : "10px",
          background: "#dc2626",
          transform: "translate(-50%, -50%) rotate(45deg)",
          boxShadow: "0 0 8px #dc2626",
          transition: "width 0.15s, height 0.15s",
        }}
      />
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9998] hidden md:block -translate-x-1/2 -translate-y-1/2"
        style={{
          width: isHovering ? "40px" : "25px",
          height: isHovering ? "40px" : "25px",
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          transition: "width 0.2s, height 0.2s",
        }}
      />
    </>
  );
};
