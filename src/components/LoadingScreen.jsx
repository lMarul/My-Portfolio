import { useEffect, useState, useRef, useMemo } from "react";

/**
 * LoadingScreen - Optimized Portal Effect
 * Smooth performance with impressive visuals
 */
export const LoadingScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState("awakening");
  const [isExiting, setIsExiting] = useState(false);
  const containerRef = useRef(null);
  const hasCompletedRef = useRef(false);

  // Reduced particle count for performance
  const spiralParticles = useMemo(() => {
    return [...Array(20)].map((_, i) => ({
      id: i,
      angle: (i / 20) * 360,
      radius: 30 + Math.random() * 100,
      size: Math.random() * 3 + 1,
      speed: 3 + Math.random() * 2,
      delay: Math.random() * 1.5,
    }));
  }, []);

  useEffect(() => {
    if (hasCompletedRef.current) return;

    const duration = 2500;
    const startTime = Date.now();

    const progressInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(newProgress);

      if (newProgress < 30) {
        setPhase("awakening");
      } else if (newProgress < 60) {
        setPhase("opening");
      } else if (newProgress < 90) {
        setPhase("entering");
      } else {
        setPhase("transcending");
      }

      if (newProgress >= 100) {
        clearInterval(progressInterval);
        hasCompletedRef.current = true;
        
        setTimeout(() => {
          setIsExiting(true);
          setTimeout(() => {
            if (onComplete) onComplete();
          }, 600);
        }, 200);
      }
    }, 50);

    return () => clearInterval(progressInterval);
  }, [onComplete]);

  const phaseMessages = {
    awakening: "Initializing...",
    opening: "Loading assets...",
    entering: "Almost there...",
    transcending: "Welcome!",
  };

  const intensity = progress / 100;

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden transition-opacity duration-500 ${
        isExiting ? "opacity-0" : "opacity-100"
      }`}
      style={{
        background: "radial-gradient(ellipse at center, #1a0505 0%, #0a0000 40%, #000000 100%)",
      }}
    >
      {/* Simple stars - reduced count */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width: `${1 + Math.random()}px`,
              height: `${1 + Math.random()}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.4,
            }}
          />
        ))}
      </div>

      {/* Portal Container */}
      <div
        className="relative flex items-center justify-center"
        style={{ 
          width: "300px", 
          height: "300px",
          transform: isExiting ? 'scale(2)' : `scale(${0.9 + intensity * 0.2})`,
          transition: 'transform 0.5s ease-out',
        }}
      >
        {/* Outer glow */}
        <div
          className="absolute rounded-full"
          style={{
            width: "280px",
            height: "280px",
            background: `radial-gradient(circle, rgba(220, 38, 38, ${0.2 + intensity * 0.2}) 0%, transparent 70%)`,
            filter: `blur(${30 + intensity * 20}px)`,
          }}
        />

        {/* Rotating rings */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${220 - i * 40}px`,
              height: `${220 - i * 40}px`,
              border: `2px solid rgba(220, 38, 38, ${0.6 - i * 0.15})`,
              animation: `spin ${4 + i}s linear infinite ${i % 2 === 0 ? '' : 'reverse'}`,
            }}
          />
        ))}

        {/* Spiral arms - simplified */}
        <div
          className="absolute"
          style={{
            width: "200px",
            height: "200px",
            animation: 'spin 3s linear infinite',
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-left"
              style={{
                width: "100px",
                height: "2px",
                transform: `rotate(${i * 60}deg)`,
                background: `linear-gradient(90deg, rgba(255, 200, 100, ${intensity}) 0%, rgba(220, 38, 38, ${0.5 * intensity}) 50%, transparent 100%)`,
              }}
            />
          ))}
        </div>

        {/* Spiral particles - reduced */}
        {spiralParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute top-1/2 left-1/2 rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              background: particle.id % 2 === 0 ? '#fff' : '#ff6b35',
              boxShadow: '0 0 4px currentColor',
              animation: `spiral-in ${particle.speed}s linear infinite`,
              animationDelay: `${particle.delay}s`,
              opacity: intensity,
              '--start-angle': `${particle.angle}deg`,
              '--start-radius': `${particle.radius}px`,
            }}
          />
        ))}

        {/* Portal core */}
        <div
          className="absolute rounded-full"
          style={{
            width: `${50 + intensity * 20}px`,
            height: `${50 + intensity * 20}px`,
            background: `radial-gradient(circle, #fffef0 0%, #ffcc00 30%, #ff6600 60%, #dc2626 80%, transparent 100%)`,
            boxShadow: `
              0 0 ${20 + intensity * 30}px rgba(255, 200, 50, 0.8),
              0 0 ${40 + intensity * 40}px rgba(255, 100, 0, 0.5)
            `,
            animation: 'pulse 1.5s ease-in-out infinite',
          }}
        />
      </div>

      {/* Text and Progress */}
      <div
        className={`absolute bottom-20 text-center transition-all duration-500 ${
          isExiting ? "opacity-0 translate-y-5" : "opacity-100"
        }`}
      >
        <h1 
          className="text-4xl font-black text-white mb-2"
          style={{ textShadow: '0 0 20px rgba(220, 38, 38, 0.5)' }}
        >
          <span className="text-red-500">MARWIN</span>
        </h1>
        
        <p className="text-white/60 text-sm uppercase tracking-[0.3em] mb-6">
          Full Stack Developer
        </p>

        {/* Progress bar */}
        <div className="w-64 mx-auto">
          <div className="h-1 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-red-700 via-red-500 to-orange-400"
              style={{ 
                width: `${progress}%`,
                transition: 'width 0.1s linear',
              }}
            />
          </div>
          <div className="flex justify-between mt-3 text-xs">
            <span className="text-white/50">{phaseMessages[phase]}</span>
            <span className="text-red-400 font-mono font-bold">{progress}%</span>
          </div>
        </div>
      </div>

      {/* Vignette */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.8) 100%)',
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
        @keyframes spiral-in {
          0% {
            transform: translate(-50%, -50%) 
                       rotate(var(--start-angle)) 
                       translateX(var(--start-radius));
            opacity: 0;
          }
          20% { opacity: 1; }
          80% { opacity: 0.8; }
          100% {
            transform: translate(-50%, -50%) 
                       rotate(calc(var(--start-angle) + 540deg)) 
                       translateX(0px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
