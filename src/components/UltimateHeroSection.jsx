import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import anime from "animejs";
import { ArrowDown, Sparkles, Zap, Star, Rocket } from "lucide-react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";

/**
 * UltimateHeroSection - The most epic hero section ever created
 * Now with particles.js for ultimate visual impact
 */
export const UltimateHeroSection = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const [particlesInit, setParticlesInit] = useState(false);

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  // Particles configuration - OPTIMIZED for performance
  const particlesOptions = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 30,
    particles: {
      number: {
        value: 35,
        density: {
          enable: false,
        },
      },
      color: {
        value: ["#dc2626", "#ef4444", "#ffffff"],
      },
      shape: {
        type: "circle",
      },
      opacity: {
        value: 0.4,
      },
      size: {
        value: { min: 1, max: 2.5 },
      },
      move: {
        enable: true,
        speed: 0.5,
        direction: "none",
        random: true,
        straight: false,
        outModes: {
          default: "out",
        },
      },
    },
    interactivity: {
      events: {
        onHover: {
          enable: false,
        },
        onClick: {
          enable: false,
        },
      },
    },
    detectRetina: false,
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Epic timeline animation
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      // Greeting animation
      tl.fromTo(
        ".greeting-text",
        { y: 100, opacity: 0, rotateX: -90 },
        { y: 0, opacity: 1, rotateX: 0, duration: 1.2, stagger: 0.05 }
      );

      // Subtitle reveal
      tl.fromTo(
        ".subtitle-item",
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
        "-=0.5"
      );

      // Description fade in
      tl.fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.3"
      );

      // CTA buttons
      tl.fromTo(
        ".hero-cta",
        { y: 50, opacity: 0, scale: 0.8 },
        { y: 0, opacity: 1, scale: 1, duration: 1, ease: "elastic.out(1, 0.5)" },
        "-=0.5"
      );

    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  // Split name into letters - ALWAYS VISIBLE
  const renderName = (name) => {
    return name.split("").map((char, i) => (
      <span
        key={i}
        className="name-letter inline-block"
        style={{
          display: char === " " ? "inline" : "inline-block",
          opacity: 1,
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
      style={{ perspective: "1500px" }}
    >
      {/* PARTICLES.JS BACKGROUND */}
      {particlesInit && (
        <Particles
          id="hero-particles"
          options={particlesOptions}
          className="absolute inset-0 z-0"
        />
      )}

      {/* Static grid background */}
      <div 
        className="absolute inset-0 opacity-[0.03] z-[1]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220,38,38,0.8) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.8) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating decorative elements - SIMPLIFIED */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[2]">
        <Sparkles 
          className="absolute text-primary/20 w-6 h-6" 
          style={{ top: "15%", left: "10%" }} 
        />
        <Star 
          className="absolute text-red-500/20 w-5 h-5" 
          style={{ top: "25%", right: "15%" }} 
        />
        <Zap 
          className="absolute text-yellow-500/20 w-7 h-7" 
          style={{ bottom: "30%", left: "8%" }} 
        />
        <Rocket 
          className="absolute text-primary/15 w-8 h-8" 
          style={{ bottom: "25%", right: "12%" }} 
        />
      </div>

      {/* Main content */}
      <div className="container max-w-6xl mx-auto text-center z-10">
        {/* Greeting */}
        <div className="mb-4 overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-medium text-muted-foreground">
            {"Hello, I'm".split("").map((char, i) => (
              <span key={i} className="greeting-text inline-block opacity-0">
                {char === " " ? "\u00A0" : char}
              </span>
            ))}
          </h2>
        </div>

        {/* Name - THE STAR OF THE SHOW */}
        <div 
          ref={nameRef}
          className="relative mb-8"
        >
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight">
            <span className="text-red-500">Marwin</span>{" "}
            <span className="text-white">John</span>
          </h1>
        </div>

        {/* Subtitle badges */}
        <div ref={subtitleRef} className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {["Full Stack Developer", "UI/UX Designer", "Problem Solver"].map((item, i) => (
            <span
              key={i}
              className="subtitle-item opacity-0 px-4 py-2 rounded-full text-sm font-medium
                         bg-gradient-to-r from-primary/10 to-red-500/10 
                         border border-primary/20 text-foreground/80
                         hover:border-primary/50 hover:bg-primary/20 
                         transition-all duration-300 cursor-default"
            >
              <Sparkles className="inline w-3 h-3 mr-2 text-primary" />
              {item}
            </span>
          ))}
        </div>

        {/* Description */}
        <p className="hero-description opacity-0 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-12">
          Crafting extraordinary digital experiences with cutting-edge technologies.
          I transform complex ideas into elegant, high-performance solutions that users love.
        </p>

        {/* CTA Buttons */}
        <div className="hero-cta opacity-0 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#projects"
            className="group relative px-8 py-4 rounded-full font-bold text-lg overflow-hidden
                       bg-gradient-to-r from-red-600 to-red-500 text-white
                       shadow-[0_0_30px_rgba(220,38,38,0.5)]
                       hover:shadow-[0_0_50px_rgba(220,38,38,0.7)]
                       hover:scale-105 active:scale-95
                       transition-all duration-300"
          >
            {/* Shine effect */}
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            <span className="relative flex items-center gap-2">
              <Rocket className="w-5 h-5" />
              Explore My Work
            </span>
          </a>
          
          <a
            href="#contact"
            className="px-8 py-4 rounded-full font-bold text-lg
                       border-2 border-primary/50 text-foreground
                       hover:bg-primary/10 hover:border-primary
                       hover:scale-105 active:scale-95
                       transition-all duration-300"
          >
            <span className="flex items-center gap-2">
              <Zap className="w-5 h-5 text-primary" />
              Let's Connect
            </span>
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <a href="#about" className="flex flex-col items-center gap-2 group cursor-pointer">
          <span className="text-sm text-muted-foreground uppercase tracking-widest group-hover:text-primary transition-colors">
            Scroll Down
          </span>
          <div className="relative w-6 h-10 border-2 border-primary/40 rounded-full group-hover:border-primary transition-colors">
            <div 
              className="absolute top-2 left-1/2 -translate-x-1/2 w-1.5 h-3 bg-primary rounded-full"
              style={{ animation: "scroll-bounce 1.5s ease-in-out infinite" }}
            />
          </div>
        </a>
      </div>

      <style>{`
        @keyframes gradient-flow {
          0% { background-position: 0% 50%; }
          100% { background-position: 200% 50%; }
        }
        @keyframes scroll-bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); opacity: 1; }
          50% { transform: translateX(-50%) translateY(12px); opacity: 0.5; }
        }
      `}</style>
    </section>
  );
};
