import { useEffect, useState, useMemo } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/**
 * UltimateBackground - Classic particles.js style background
 * Based on vincentgarreau.com/particles.js
 */
export const UltimateBackground = () => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesOptions = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 30,
    particles: {
      number: {
        value: 40,
        density: {
          enable: true,
          area: 1000,
        },
      },
      color: {
        value: "#dc2626",
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.5,
        random: false,
        animation: {
          enable: false,
        },
      },
      size: {
        value: 2,
        random: true,
        animation: {
          enable: false,
        },
      },
      links: {
        enable: true,
        distance: 150,
        color: "#dc2626",
        opacity: 0.3,
        width: 1,
      },
      move: {
        enable: true,
        speed: 1,
        direction: "none",
        random: false,
        straight: false,
        outModes: {
          default: "out",
        },
        attract: {
          enable: false,
        },
      },
    },
    interactivity: {
      detectsOn: "window",
      events: {
        onHover: {
          enable: true,
          mode: "grab",
        },
        onClick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 200,
          links: {
            opacity: 0.8,
            color: "#dc2626",
          },
        },
        push: {
          quantity: 4,
        },
        repulse: {
          distance: 150,
          duration: 0.4,
        },
      },
    },
    detectRetina: true,
  }), []);

  if (!init) return null;

  return (
    <Particles
      id="tsparticles"
      className="fixed inset-0 -z-10"
      options={particlesOptions}
    />
  );
};

/**
 * FloatingOrbs - Animated gradient orbs
 */
export const FloatingOrbs = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-5">
      {/* Large primary orb */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, transparent 70%)",
          filter: "blur(80px)",
          top: "10%",
          left: "10%",
          animation: "float-orb-1 20s ease-in-out infinite",
        }}
      />
      
      {/* Secondary orb */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full opacity-25"
        style={{
          background: "radial-gradient(circle, rgba(185, 28, 28, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
          bottom: "20%",
          right: "10%",
          animation: "float-orb-2 25s ease-in-out infinite",
        }}
      />
      
      {/* Accent orb */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full opacity-20"
        style={{
          background: "radial-gradient(circle, rgba(239, 68, 68, 0.5) 0%, transparent 70%)",
          filter: "blur(50px)",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          animation: "pulse-orb 8s ease-in-out infinite",
        }}
      />

      {/* Small floating particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 10 + 5}px`,
            height: `${Math.random() * 10 + 5}px`,
            background: `rgba(220, 38, 38, ${Math.random() * 0.5 + 0.3})`,
            boxShadow: `0 0 ${Math.random() * 20 + 10}px rgba(220, 38, 38, 0.5)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-particle ${10 + Math.random() * 10}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        />
      ))}

      <style>{`
        @keyframes float-orb-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, 30px) scale(1.1); }
          50% { transform: translate(20px, -40px) scale(0.9); }
          75% { transform: translate(-30px, 20px) scale(1.05); }
        }
        @keyframes float-orb-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, -30px) scale(1.15); }
          66% { transform: translate(30px, 40px) scale(0.85); }
        }
        @keyframes pulse-orb {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.2; }
          50% { transform: translate(-50%, -50%) scale(1.3); opacity: 0.35; }
        }
        @keyframes float-particle {
          0%, 100% { transform: translateY(0) translateX(0); }
          25% { transform: translateY(-30px) translateX(15px); }
          50% { transform: translateY(-10px) translateX(-20px); }
          75% { transform: translateY(20px) translateX(10px); }
        }
      `}</style>
    </div>
  );
};
