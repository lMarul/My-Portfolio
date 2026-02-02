import { useEffect, useState, useRef } from "react";

/**
 * LoadingScreen - EPIC PORTAL TO A NEW WORLD
 * The user travels through a dimensional rift into your portfolio universe
 */
export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("opening");
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef(null);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    if (hasCompletedRef.current) return;

    const duration = 2500;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(newProgress);

      if (newProgress > 30 && newProgress < 70) {
        setPhase("traveling");
      } else if (newProgress >= 70 && newProgress < 100) {
        setPhase("arriving");
      }

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        hasCompletedRef.current = true;
        setPhase("entering");
        setIsExiting(true);

        // Exit after animation
        setTimeout(() => {
          if (onComplete) onComplete();
        }, 600);
      }
    }, 30);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  const phaseMessages = {
    opening: "Opening dimensional rift...",
    traveling: "Traveling through the void...",
    arriving: "Approaching destination...",
    entering: "Welcome to my universe!",
  };

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden transition-all duration-500 ${
        isExiting ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at center, #1a0a0a 0%, #000000 100%)",
      }}
    >
      {/* Animated stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.6 + 0.2,
              animation: `twinkle ${Math.random() * 3 + 2}s ease-in-out infinite`,
            }}
          />
        ))}
      </div>

      {/* The Portal */}
      <div
        className={`relative flex items-center justify-center transition-transform duration-500 ${
          isExiting ? "scale-150" : "scale-100"
        }`}
        style={{ width: "300px", height: "300px" }}
      >
        {/* Outer rings */}
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${240 - i * 35}px`,
              height: `${240 - i * 35}px`,
              border: `${2.5 - i * 0.3}px solid`,
              borderColor:
                i % 2 === 0
                  ? "rgba(220, 38, 38, 0.8)"
                  : "rgba(255, 255, 255, 0.3)",
              boxShadow:
                i === 0
                  ? "0 0 30px rgba(220, 38, 38, 0.5), inset 0 0 20px rgba(220, 38, 38, 0.3)"
                  : "none",
              animation: `spin ${6 + i * 2}s linear infinite ${
                i % 2 === 0 ? "" : "reverse"
              }`,
            }}
          />
        ))}

        {/* Portal core */}
        <div
          className="absolute rounded-full"
          style={{
            width: "100px",
            height: "100px",
            background:
              "radial-gradient(circle, #ffffff 0%, #dc2626 30%, #7f1d1d 60%, #000000 100%)",
            boxShadow: `
              0 0 40px rgba(220, 38, 38, 0.8),
              0 0 80px rgba(220, 38, 38, 0.5),
              inset 0 0 40px rgba(255, 255, 255, 0.3)
            `,
            animation: "pulse 1.5s ease-in-out infinite",
          }}
        >
          <div
            className="absolute inset-2 rounded-full"
            style={{
              background:
                "conic-gradient(from 0deg, transparent, rgba(255,255,255,0.5), transparent, rgba(220,38,38,0.5), transparent)",
              animation: "spin 2s linear infinite",
            }}
          />
        </div>

        {/* Energy arcs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={`arc-${i}`}
            className="absolute w-full h-full"
            style={{ transform: `rotate(${i * 45}deg)` }}
          >
            <div
              className="absolute top-0 left-1/2 w-1 h-16 -translate-x-1/2 rounded-full"
              style={{
                background:
                  "linear-gradient(to top, transparent, rgba(220, 38, 38, 0.8), transparent)",
                animation: `pulse-arc 1.5s ease-in-out ${i * 0.1}s infinite`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Text and Progress */}
      <div
        className={`absolute bottom-20 text-center transition-all duration-500 ${
          isExiting ? "opacity-0 translate-y-10" : "opacity-100 translate-y-0"
        }`}
      >
        <h1 className="text-3xl md:text-4xl font-black text-white mb-2 tracking-wider">
          <span className="text-red-500">MARWIN</span> JOHN
        </h1>
        <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-6">
          Full Stack Developer
        </p>

        {/* Progress bar */}
        <div className="w-64 md:w-72 mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-100"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg, #dc2626, #ffffff, #dc2626)",
                backgroundSize: "200% 100%",
                animation: "shimmer 1s linear infinite",
              }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs">
            <span className="text-white/50">{phaseMessages[phase]}</span>
            <span className="text-red-500 font-mono font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Vignette effect */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.7) 100%)",
        }}
      />

      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes pulse-arc {
          0%, 100% { opacity: 0.3; transform: translateX(-50%) scaleY(1); }
          50% { opacity: 1; transform: translateX(-50%) scaleY(1.3); }
        }
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
    </div>
  );
};
