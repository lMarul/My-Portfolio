import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { ArrowDown, Sparkles } from "lucide-react";

/**
 * EpicHeroSection - Over-the-top 3D Animated Hero
 * 
 * Features:
 * - 3D text with depth and shadows
 * - Glitch effect on name
 * - Animated typing effect
 * - Floating particles around text
 * - Magnetic button effect
 * - Staggered reveal animations
 */
export const EpicHeroSection = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const buttonRef = useRef(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    // Epic entrance animation timeline
    const timeline = anime.timeline({
      easing: "easeOutExpo",
    });

    // Staggered letter animation for "Hi, I'm"
    timeline.add({
      targets: ".hero-greeting .letter",
      translateY: [100, 0],
      translateZ: [0, 50],
      opacity: [0, 1],
      rotateX: [-90, 0],
      duration: 1200,
      delay: anime.stagger(50),
    });

    // Name reveal with 3D effect
    timeline.add({
      targets: ".hero-name .letter",
      translateY: [150, 0],
      translateZ: [0, 100],
      opacity: [0, 1],
      rotateX: [-90, 0],
      scale: [0.5, 1],
      duration: 1500,
      delay: anime.stagger(40),
    }, "-=800");

    // Glitch effect on name
    timeline.add({
      targets: ".hero-name",
      translateX: [
        { value: -5, duration: 50 },
        { value: 5, duration: 50 },
        { value: -3, duration: 50 },
        { value: 3, duration: 50 },
        { value: 0, duration: 50 },
      ],
      textShadow: [
        { value: "-3px 0 #0ff, 3px 0 #f0f", duration: 50 },
        { value: "3px 0 #0ff, -3px 0 #f0f", duration: 50 },
        { value: "0 0 transparent", duration: 50 },
      ],
      easing: "steps(1)",
    }, "-=200");

    // Description reveal
    timeline.add({
      targets: ".hero-description",
      translateY: [50, 0],
      opacity: [0, 1],
      duration: 1000,
    }, "-=500");

    // Button reveal with bounce
    timeline.add({
      targets: ".hero-cta",
      translateY: [80, 0],
      opacity: [0, 1],
      scale: [0.5, 1],
      duration: 1200,
      elasticity: 500,
    }, "-=700");

    // Floating particles around text
    const createParticles = () => {
      const container = document.querySelector(".hero-particles");
      if (!container) return;

      for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.className = "hero-particle";
        particle.style.cssText = `
          position: absolute;
          width: ${Math.random() * 6 + 2}px;
          height: ${Math.random() * 6 + 2}px;
          background: ${Math.random() > 0.5 ? "rgba(220, 38, 38, 0.8)" : "rgba(255, 255, 255, 0.6)"};
          border-radius: 50%;
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          pointer-events: none;
          box-shadow: 0 0 ${Math.random() * 10 + 5}px currentColor;
        `;
        container.appendChild(particle);
      }

      anime({
        targets: ".hero-particle",
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        scale: () => [1, anime.random(0.5, 2)],
        opacity: () => [0.3, 1, 0.3],
        duration: () => anime.random(3000, 6000),
        delay: anime.stagger(100),
        direction: "alternate",
        loop: true,
        easing: "easeInOutSine",
      });
    };

    setTimeout(createParticles, 500);

    // Magnetic button effect
    const button = buttonRef.current;
    if (button) {
      const handleMouseMove = (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        anime({
          targets: button,
          translateX: x * 0.3,
          translateY: y * 0.3,
          duration: 300,
          easing: "easeOutQuad",
        });
      };

      const handleMouseLeave = () => {
        anime({
          targets: button,
          translateX: 0,
          translateY: 0,
          duration: 600,
          elasticity: 400,
        });
      };

      button.addEventListener("mousemove", handleMouseMove);
      button.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        button.removeEventListener("mousemove", handleMouseMove);
        button.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, []);

  // Split text into letters for animation
  const splitText = (text) => {
    return text.split("").map((char, i) => (
      <span
        key={i}
        className="letter inline-block"
        style={{ 
          display: char === " " ? "inline" : "inline-block",
          transformStyle: "preserve-3d",
        }}
      >
        {char === " " ? "\u00A0" : char}
      </span>
    ));
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
      style={{ perspective: "1000px" }}
    >
      {/* Floating particles container */}
      <div className="hero-particles absolute inset-0 pointer-events-none" />

      {/* Radial glow behind text */}
      <div 
        className="absolute w-[800px] h-[800px] rounded-full opacity-30"
        style={{
          background: "radial-gradient(circle, rgba(220, 38, 38, 0.4) 0%, transparent 70%)",
          filter: "blur(60px)",
          animation: "pulse-glow 4s ease-in-out infinite",
        }}
      />

      <div className="container max-w-5xl mx-auto text-center z-10" style={{ transformStyle: "preserve-3d" }}>
        <div className="space-y-8">
          {/* Greeting */}
          <h1 
            className="hero-greeting text-5xl md:text-7xl font-bold tracking-tight"
            style={{ transformStyle: "preserve-3d" }}
          >
            {splitText("Hi, I'm")}
          </h1>

          {/* Name with CRISP 3D effect - NO BLUR */}
          <div 
            ref={nameRef}
            className="hero-name relative"
            style={{ transformStyle: "preserve-3d" }}
          >
            <h1 
              className="text-6xl md:text-9xl font-black tracking-tight relative z-10"
              style={{
                background: "linear-gradient(135deg, #dc2626 0%, #ef4444 30%, #ffffff 50%, #ef4444 70%, #dc2626 100%)",
                backgroundSize: "300% 300%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                animation: "gradient-shift 4s ease infinite",
                filter: "drop-shadow(0 0 30px rgba(220, 38, 38, 0.6))",
              }}
            >
              {splitText("Marwin John")}
            </h1>
            
            {/* Crisp glow layer - NO BLUR */}
            <div 
              className="absolute inset-0 text-6xl md:text-9xl font-black tracking-tight pointer-events-none select-none"
              aria-hidden="true"
              style={{
                background: "linear-gradient(135deg, #dc2626, #ff0000)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                opacity: 0.3,
                transform: "translateZ(-10px)",
              }}
            >
              Marwin John
            </div>
          </div>

          {/* Sparkle accent */}
          <div className="flex items-center justify-center gap-3 opacity-80">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
            <span className="text-sm uppercase tracking-[0.3em] text-muted-foreground font-medium">
              Full Stack Developer
            </span>
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>

          {/* Description */}
          <p className="hero-description text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed opacity-0">
            Crafting immersive digital experiences with cutting-edge technologies.
            Passionate about transforming ideas into elegant, high-performance solutions.
          </p>

          {/* CTA Button */}
          <div className="hero-cta pt-6 opacity-0">
            <a
              ref={buttonRef}
              href="#projects"
              className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full 
                         bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold text-lg
                         shadow-[0_0_40px_rgba(220,38,38,0.4)] hover:shadow-[0_0_60px_rgba(220,38,38,0.6)]
                         transition-all duration-300 overflow-hidden"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Button glow effect */}
              <span 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                           translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"
              />
              <span className="relative z-10">Explore My Work</span>
              <ArrowDown className="w-5 h-5 relative z-10 group-hover:translate-y-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-sm text-muted-foreground uppercase tracking-widest">Scroll</span>
          <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-scroll-indicator" />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes pulse-glow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.5; }
        }
        @keyframes scroll-indicator {
          0%, 100% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(8px); opacity: 0.3; }
        }
        .animate-scroll-indicator {
          animation: scroll-indicator 1.5s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
