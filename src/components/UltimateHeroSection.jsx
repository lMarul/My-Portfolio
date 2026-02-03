import { useEffect, useRef, useState, useMemo } from "react";
import { gsap } from "gsap";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  ParticleExplosion,
  MagneticButton,
  GlitchText,
  CyberGrid,
  LiquidBlob
} from "./BeyondComponents";
import { Anime3DCard } from "./AnimeComponents";

/**
 * UltimateHeroSection - BEYOND PLUS ULTRA EDITION
 */
export const UltimateHeroSection = () => {
  const heroRef = useRef(null);
  const nameRef = useRef(null);
  const subtitleRef = useRef(null);
  const [particlesInit, setParticlesInit] = useState(false);

  // Fetch hero content from Convex
  const heroContent = useQuery(api.siteContent.getHeroContent);

  // Default/Fallback content
  const defaultContent = {
    title: "MARWIN",
    subtitle: "System Online • Welcome User",
    description: "Forging immersive digital realities where code meets chaos. Pushing the boundaries of web interaction.",
    roles: ["Full Stack Developer", "UI/UX Designer", "Creative Technologist"]
  };

  // Use fetched content or fallback
  const content = heroContent || defaultContent;

  // Initialize particles engine
  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setParticlesInit(true);
    });
  }, []);

  // Particles configuration - Fast & Energetic
  const particlesOptions = useMemo(() => ({
    fullScreen: false,
    fpsLimit: 60,
    particles: {
      number: { value: 30, density: { enable: true, area: 800 } },
      color: { value: "#dc2626" },
      shape: { type: "triangle" },
      opacity: { value: 0.5 },
      size: { value: 3 },
      links: {
        enable: true,
        distance: 150,
        color: "#dc2626",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 3, // Faster movement
        direction: "none",
        random: false,
        straight: false,
        outModes: { default: "bounce" },
      },
    },
    interactivity: {
      events: {
        onHover: { enable: true, mode: "repulse" },
        onClick: { enable: true, mode: "push" },
      },
      modes: {
        repulse: { distance: 100, duration: 0.4 },
        push: { quantity: 4 },
      },
    },
    detectRetina: true,
  }), []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

      tl.fromTo(
        ".hero-content",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.5 }
      )
        .fromTo(
          ".subtitle-item",
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.8 },
          "-=1"
        );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 overflow-hidden bg-background/50"
      style={{ perspective: "1000px" }}
    >
      <ParticleExplosion />

      {/* 3D Cyber Grid Background */}
      <CyberGrid />

      {/* Dynamic Liquid Blobs */}
      <LiquidBlob color="#dc2626" size={500} className="top-1/4 -left-20" />
      <LiquidBlob color="#ef4444" size={400} className="bottom-1/4 -right-20" />

      {/* Particles Layer */}
      {particlesInit && (
        <Particles
          id="hero-particles"
          className="absolute inset-0 z-[1]"
          options={particlesOptions}
        />
      )}

      {/* Main Content */}
      <div className="hero-content container max-w-7xl mx-auto text-center z-10 relative">

        {/* Greeting with 3D Card Effect */}
        <Anime3DCard intensity={5} className="inline-block mb-6">
          <div className="px-6 py-2 rounded-full border border-red-500/30 bg-red-500/5 backdrop-blur-md">
            <span className="text-red-400 font-mono tracking-widest text-sm uppercase">
              {content.subtitle}
            </span>
          </div>
        </Anime3DCard>

        {/* Massive Glitch Name */}
        <div className="relative mb-6">
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter font-cinzel leading-none select-none">
            <GlitchText text={content.title} className="text-foreground drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]" />
          </h1>
          <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black tracking-tighter font-cinzel leading-none absolute top-0 left-0 w-full text-red-600/10 mix-blend-overlay blur-sm animate-pulse">
            {content.title}
          </h1>
        </div>

        {/* Animated Roles */}
        <div ref={subtitleRef} className="flex flex-wrap justify-center gap-4 mb-12">
          {content.roles.map((role, i) => (
            <MagneticButton key={i} scale={1.2}>
              <span className="subtitle-item px-5 py-2 rounded-lg bg-card/10 border border-white/10 backdrop-blur-sm text-sm font-semibold tracking-wide hover:bg-white/5 hover:border-red-500/50 transition-all cursor-crosshair">
                {role}
              </span>
            </MagneticButton>
          ))}
        </div>

        {/* Description */}
        <p className="subtitle-item text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-16 font-light">
          {content.description}
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap justify-center gap-6">
          <MagneticButton scale={1.1}>
            <a
              href="#projects"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-white transition-all duration-200 bg-red-600 font-lg rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
            >
              <div className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-black" />
              <span className="relative">Explore Projects</span>
              <div className="absolute inset-0 h-full w-full scale-0 rounded-2xl transition-all duration-300 group-hover:scale-100 group-hover:bg-red-700/50" />
            </a>
          </MagneticButton>

          <MagneticButton scale={1.1}>
            <a
              href="#contact"
              className="group relative inline-flex items-center justify-center px-10 py-5 font-bold text-foreground transition-all duration-200 bg-transparent border-2 border-white/10 font-lg rounded-xl focus:outline-none hover:bg-white/5 hover:border-red-500/30"
            >
              <span className="relative">Contact Me</span>
            </a>
          </MagneticButton>
        </div>

      </div>
    </section>
  );
};

