import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import anime from "animejs";
import { Sun, Moon, Stars, Sparkles } from "lucide-react";

/**
 * UltimateThemeToggle - The most epic theme toggle ever created
 * Inspired by day/night cycles with animated transitions
 */
export const UltimateThemeToggle = () => {
  const [isDark, setIsDark] = useState(true);
  const toggleRef = useRef(null);
  const sunRef = useRef(null);
  const moonRef = useRef(null);
  const starsRef = useRef(null);
  const cloudsRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    if (savedTheme === "light" || (!savedTheme && !prefersDark)) {
      setIsDark(false);
      document.documentElement.classList.remove("dark");
    } else {
      setIsDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const newIsDark = !isDark;
    setIsDark(newIsDark);

    // Create epic transition animation
    const tl = gsap.timeline({
      onComplete: () => setIsAnimating(false),
    });

    if (newIsDark) {
      // Transitioning to DARK mode (night)
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");

      // Sun goes down
      tl.to(sunRef.current, {
        y: 60,
        scale: 0,
        rotate: -180,
        duration: 0.6,
        ease: "power2.in",
      }, 0);

      // Moon rises
      tl.fromTo(moonRef.current, 
        { y: -60, scale: 0, rotate: 180 },
        { y: 0, scale: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" },
        0.3
      );

      // Stars appear
      tl.fromTo(starsRef.current.children,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, stagger: 0.05, ease: "back.out(2)" },
        0.4
      );

      // Create shooting stars
      createShootingStars();

    } else {
      // Transitioning to LIGHT mode (day)
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");

      // Stars disappear
      tl.to(starsRef.current.children, {
        scale: 0,
        opacity: 0,
        duration: 0.3,
        stagger: 0.02,
      }, 0);

      // Moon goes down
      tl.to(moonRef.current, {
        y: 60,
        scale: 0,
        rotate: 180,
        duration: 0.5,
        ease: "power2.in",
      }, 0.1);

      // Sun rises with GLORY
      tl.fromTo(sunRef.current,
        { y: -60, scale: 0, rotate: 180 },
        { y: 0, scale: 1, rotate: 0, duration: 0.7, ease: "elastic.out(1, 0.5)" },
        0.3
      );

      // Create sun rays explosion
      createSunRays();
    }

    // Ripple effect
    anime({
      targets: toggleRef.current,
      scale: [1, 0.9, 1.1, 1],
      duration: 600,
      easing: "easeOutElastic(1, .5)",
    });
  };

  const createShootingStars = () => {
    const container = toggleRef.current.parentElement;
    
    for (let i = 0; i < 5; i++) {
      setTimeout(() => {
        const star = document.createElement("div");
        star.className = "shooting-star";
        star.style.cssText = `
          position: absolute;
          width: 2px;
          height: 2px;
          background: white;
          border-radius: 50%;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.8);
          pointer-events: none;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 50}%;
        `;
        container.appendChild(star);

        anime({
          targets: star,
          translateX: [0, 100 + Math.random() * 100],
          translateY: [0, 50 + Math.random() * 50],
          opacity: [1, 0],
          width: [2, 20],
          duration: 600,
          easing: "easeOutQuad",
          complete: () => star.remove(),
        });
      }, i * 100);
    }
  };

  const createSunRays = () => {
    const container = toggleRef.current.parentElement;
    
    for (let i = 0; i < 12; i++) {
      const ray = document.createElement("div");
      const angle = (i / 12) * 360;
      ray.className = "sun-ray";
      ray.style.cssText = `
        position: absolute;
        left: 50%;
        top: 50%;
        width: 3px;
        height: 20px;
        background: linear-gradient(to bottom, rgba(251, 191, 36, 0.8), transparent);
        transform-origin: center top;
        transform: rotate(${angle}deg) translateY(-20px);
        pointer-events: none;
      `;
      container.appendChild(ray);

      anime({
        targets: ray,
        scaleY: [0, 1.5, 0],
        opacity: [0, 1, 0],
        duration: 800,
        easing: "easeOutQuad",
        complete: () => ray.remove(),
      });
    }
  };

  return (
    <div className="relative">
      <button
        ref={toggleRef}
        onClick={toggleTheme}
        disabled={isAnimating}
        className={`
          relative w-20 h-10 rounded-full overflow-hidden
          transition-all duration-500 ease-in-out
          border-2 shadow-lg
          focus:outline-none focus:ring-2 focus:ring-offset-2
          ${isDark 
            ? "bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 border-indigo-500/50 focus:ring-indigo-500 shadow-indigo-500/30" 
            : "bg-gradient-to-r from-sky-400 via-blue-400 to-sky-400 border-amber-400/50 focus:ring-amber-400 shadow-amber-400/30"
          }
        `}
        aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      >
        {/* Sky gradient overlay */}
        <div 
          className={`
            absolute inset-0 transition-opacity duration-500
            ${isDark ? "opacity-100" : "opacity-0"}
          `}
          style={{
            background: "radial-gradient(circle at 70% 20%, rgba(79, 70, 229, 0.4), transparent 60%)",
          }}
        />

        {/* Stars container */}
        <div ref={starsRef} className="absolute inset-0">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-white rounded-full ${isDark ? "opacity-100" : "opacity-0"}`}
              style={{
                left: `${15 + (i * 12)}%`,
                top: `${20 + (i % 3) * 20}%`,
                boxShadow: "0 0 4px rgba(255, 255, 255, 0.8)",
                animation: isDark ? `twinkle ${1 + Math.random()}s ease-in-out infinite` : "none",
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Clouds (for light mode) */}
        <div ref={cloudsRef} className={`absolute inset-0 ${isDark ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}>
          <div 
            className="absolute w-6 h-3 bg-white/60 rounded-full"
            style={{ top: "20%", left: "10%", animation: "cloud-drift 8s linear infinite" }}
          />
          <div 
            className="absolute w-4 h-2 bg-white/40 rounded-full"
            style={{ top: "60%", left: "60%", animation: "cloud-drift 12s linear infinite" }}
          />
        </div>

        {/* Sun */}
        <div
          ref={sunRef}
          className={`
            absolute w-7 h-7 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${isDark ? "opacity-0 scale-0" : "opacity-100 scale-100"}
          `}
          style={{
            left: isDark ? "8px" : "calc(100% - 35px)",
            top: "50%",
            transform: `translateY(-50%) ${isDark ? "scale(0)" : "scale(1)"}`,
            background: "linear-gradient(135deg, #FCD34D, #F59E0B, #D97706)",
            boxShadow: `
              0 0 20px rgba(251, 191, 36, 0.8),
              0 0 40px rgba(251, 191, 36, 0.5),
              0 0 60px rgba(251, 191, 36, 0.3),
              inset 0 0 10px rgba(255, 255, 255, 0.5)
            `,
          }}
        >
          <Sun className="w-4 h-4 text-white" style={{ filter: "drop-shadow(0 0 4px rgba(255,255,255,0.8))" }} />
        </div>

        {/* Moon */}
        <div
          ref={moonRef}
          className={`
            absolute w-7 h-7 rounded-full
            flex items-center justify-center
            transition-all duration-300
            ${isDark ? "opacity-100 scale-100" : "opacity-0 scale-0"}
          `}
          style={{
            left: isDark ? "calc(100% - 35px)" : "8px",
            top: "50%",
            transform: `translateY(-50%) ${isDark ? "scale(1)" : "scale(0)"}`,
            background: "linear-gradient(135deg, #E0E7FF, #C7D2FE, #A5B4FC)",
            boxShadow: `
              0 0 20px rgba(165, 180, 252, 0.6),
              0 0 40px rgba(165, 180, 252, 0.3),
              inset -4px -4px 8px rgba(0, 0, 0, 0.2),
              inset 2px 2px 8px rgba(255, 255, 255, 0.5)
            `,
          }}
        >
          <Moon className="w-4 h-4 text-indigo-900" style={{ filter: "drop-shadow(0 0 2px rgba(0,0,0,0.3))" }} />
          {/* Moon craters */}
          <div className="absolute w-1.5 h-1.5 rounded-full bg-indigo-200/50" style={{ top: "4px", right: "6px" }} />
          <div className="absolute w-1 h-1 rounded-full bg-indigo-200/40" style={{ bottom: "5px", left: "5px" }} />
        </div>

        {/* Track indicator dots */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
          <div className={`w-1 h-1 rounded-full transition-all duration-300 ${isDark ? "bg-indigo-400" : "bg-amber-200/50"}`} />
          <div className={`w-1 h-1 rounded-full transition-all duration-300 ${isDark ? "bg-indigo-400/50" : "bg-amber-200"}`} />
        </div>
      </button>

      {/* Floating sparkles around toggle */}
      <Sparkles 
        className={`
          absolute -top-1 -right-1 w-3 h-3 
          transition-all duration-500
          ${isDark ? "text-indigo-400 opacity-100" : "text-amber-400 opacity-100"}
        `}
        style={{ animation: "pulse 2s ease-in-out infinite" }}
      />

      <style>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.2); }
        }
        @keyframes cloud-drift {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(100px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default UltimateThemeToggle;
