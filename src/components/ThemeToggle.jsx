import { Moon, Sun, Flame } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

export const ThemeToggle = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleRef = useRef(null);
  const thumbRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    }
  }, []);

  useEffect(() => {
    // Animate glow pulse
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        opacity: 0.3,
        scale: 1.2,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }
  }, []);

  const toggleTheme = () => {
    const toggle = toggleRef.current;
    const thumb = thumbRef.current;

    // Create particle burst effect
    createParticleBurst();

    // Animate the toggle
    gsap.to(toggle, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    // Flash effect
    gsap.fromTo(toggle, 
      { boxShadow: "0 0 30px rgba(220, 38, 38, 0.8)" },
      { boxShadow: "0 0 10px rgba(220, 38, 38, 0.3)", duration: 0.5 }
    );

    if (isDarkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const createParticleBurst = () => {
    const toggle = toggleRef.current;
    if (!toggle) return;

    const rect = toggle.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");
      const angle = (i / 12) * Math.PI * 2;
      const distance = 40 + Math.random() * 30;

      particle.style.cssText = `
        position: fixed;
        width: 4px;
        height: 4px;
        background: ${isDarkMode ? "#fbbf24" : "#dc2626"};
        border-radius: 50%;
        pointer-events: none;
        left: ${centerX}px;
        top: ${centerY}px;
        z-index: 10000;
        box-shadow: 0 0 6px ${isDarkMode ? "#fbbf24" : "#dc2626"};
      `;
      document.body.appendChild(particle);

      gsap.to(particle, {
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        opacity: 0,
        scale: 0,
        duration: 0.6,
        ease: "power2.out",
        onComplete: () => particle.remove(),
      });
    }
  };

  return (
    <button
      ref={toggleRef}
      onClick={toggleTheme}
      aria-label={isDarkMode ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "relative flex items-center w-20 h-10 rounded-full transition-all duration-500",
        "focus:outline-none focus:ring-2 focus:ring-red-500/60",
        "border-2 overflow-hidden",
        isDarkMode
          ? "bg-gradient-to-r from-gray-900 via-red-950 to-black border-red-900/50"
          : "bg-gradient-to-r from-red-100 via-red-200 to-red-300 border-red-400/50"
      )}
      tabIndex={0}
    >
      {/* Animated background glow */}
      <div
        ref={glowRef}
        className={cn(
          "absolute inset-0 rounded-full transition-opacity duration-500",
          isDarkMode
            ? "bg-gradient-to-r from-red-600/20 via-red-500/10 to-red-600/20"
            : "bg-gradient-to-r from-red-400/30 via-red-300/20 to-red-400/30"
        )}
      />

      {/* Fire particles in dark mode */}
      {isDarkMode && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-red-500 rounded-full animate-pulse"
              style={{
                left: `${20 + i * 15}%`,
                bottom: "20%",
                animationDelay: `${i * 0.2}s`,
                opacity: 0.6,
              }}
            />
          ))}
        </div>
      )}

      {/* Sun rays in light mode */}
      {!isDarkMode && (
        <div className="absolute inset-0 overflow-hidden rounded-full">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-[1px] bg-gradient-to-r from-transparent via-red-500/40 to-transparent"
              style={{
                left: "50%",
                top: "50%",
                transform: `translate(-50%, -50%) rotate(${i * 30}deg)`,
              }}
            />
          ))}
        </div>
      )}

      {/* Animated thumb */}
      <span
        ref={thumbRef}
        className={cn(
          "absolute top-1 left-1 w-8 h-8 rounded-full shadow-lg flex items-center justify-center",
          "transition-all duration-500 ease-out",
          isDarkMode 
            ? "translate-x-10 bg-gradient-to-br from-red-600 to-red-800 shadow-red-500/50" 
            : "translate-x-0 bg-gradient-to-br from-white to-red-100 shadow-red-300/50"
        )}
        style={{
          boxShadow: isDarkMode 
            ? "0 0 15px rgba(220, 38, 38, 0.6), inset 0 0 10px rgba(0,0,0,0.3)" 
            : "0 0 15px rgba(220, 38, 38, 0.3), inset 0 0 10px rgba(255,255,255,0.5)",
        }}
      >
        {isDarkMode ? (
          <Moon className="h-5 w-5 text-white drop-shadow-lg" />
        ) : (
          <Sun className="h-5 w-5 text-red-600 drop-shadow-lg" />
        )}
      </span>
    </button>
  );
};
