import { useEffect, useRef, useState, useCallback } from "react";

/**
 * CustomCursor - Red Diamond Cursor with Click Ripple Effect
 * Features expanding circle on click
 */
export const CustomCursor = () => {
  const cursorRef = useRef(null);
  const glowRef = useRef(null);
  const rippleContainerRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Create ripple effect on click
  const createRipple = useCallback((x, y) => {
    if (!rippleContainerRef.current) return;
    
    const ripple = document.createElement('div');
    ripple.className = 'cursor-ripple';
    ripple.style.cssText = `
      position: fixed;
      left: ${x}px;
      top: ${y}px;
      width: 0;
      height: 0;
      border-radius: 50%;
      border: 2px solid rgba(220, 38, 38, 0.8);
      background: radial-gradient(circle, rgba(220, 38, 38, 0.3) 0%, transparent 70%);
      transform: translate(-50%, -50%);
      pointer-events: none;
      z-index: 9997;
      animation: ripple-expand 0.6s ease-out forwards;
    `;
    
    rippleContainerRef.current.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  useEffect(() => {
    document.body.style.cursor = "none";
    
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after { cursor: none !important; }
      
      @keyframes ripple-expand {
        0% {
          width: 0;
          height: 0;
          opacity: 1;
          border-width: 3px;
        }
        100% {
          width: 150px;
          height: 150px;
          opacity: 0;
          border-width: 1px;
        }
      }
    `;
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

    const handleMouseDown = (e) => {
      setIsClicking(true);
      createRipple(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.body.style.cursor = "auto";
      style.remove();
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [createRipple]);

  if (typeof window !== "undefined" && "ontouchstart" in window) {
    return null;
  }

  return (
    <>
      {/* Ripple container */}
      <div ref={rippleContainerRef} className="fixed inset-0 pointer-events-none z-[9997]" />
      
      {/* Main cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          width: isClicking ? "8px" : isHovering ? "18px" : "10px",
          height: isClicking ? "8px" : isHovering ? "18px" : "10px",
          background: "#dc2626",
          transform: "translate(-50%, -50%) rotate(45deg)",
          boxShadow: isClicking 
            ? "0 0 20px #dc2626, 0 0 40px rgba(220, 38, 38, 0.5)" 
            : "0 0 8px #dc2626",
          transition: "width 0.1s, height 0.1s, box-shadow 0.1s",
        }}
      />
      
      {/* Glow effect */}
      <div
        ref={glowRef}
        className="fixed pointer-events-none z-[9998] hidden md:block"
        style={{
          width: isClicking ? "50px" : isHovering ? "40px" : "25px",
          height: isClicking ? "50px" : isHovering ? "40px" : "25px",
          background: isClicking
            ? "radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, transparent 70%)"
            : "radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%)",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          transition: "width 0.15s, height 0.15s, background 0.1s",
        }}
      />
    </>
  );
};
