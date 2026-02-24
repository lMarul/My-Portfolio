import { useState, useEffect, useRef } from "react";
import hackathonsData from "@/data/hackathons.json";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronRight, Trophy, Sparkles, Zap } from "lucide-react";
import { gsap } from "gsap";
import { HackathonCarousel } from "./HackathonCarousel";
import { ProjectSpotlight } from "./ProjectSpotlight";

/**
 * HackathonSection Component - EPIC EDITION
 * 
 * Features:
 * - GSAP-powered entrance animations
 * - Floating particles background
 * - Glowing section header
 * - Smooth transitions
 */

export const HackathonSection = () => {
  const hackathons = hackathonsData || [];
  const [activeProject, setActiveProject] = useState(null);
  
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const spotlightRef = useRef(null);
  const carouselRef = useRef(null);
  const particlesRef = useRef(null);

  // Set initial active project when data loads
  useEffect(() => {
    if (hackathons.length > 0 && !activeProject) {
      setActiveProject(hackathons[0]);
    }
  }, [hackathons, activeProject]);

  // Update activeProject reference when data updates
  useEffect(() => {
    if (activeProject && hackathons.length > 0) {
      const updated = hackathons.find((h) => h._id === activeProject._id);
      if (updated) {
        setActiveProject(updated);
      }
    }
  }, [hackathons]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      if (particlesRef.current) {
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement("div");
          particle.className = "hackathon-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(220, 38, 38, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(220, 38, 38, 0.5);
          `;
          particlesRef.current.appendChild(particle);

          // Animate each particle
          gsap.to(particle, {
            x: `random(-100, 100)`,
            y: `random(-100, 100)`,
            opacity: `random(0.3, 1)`,
            scale: `random(0.5, 2)`,
            duration: `random(3, 8)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // Header animation timeline
      const headerTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      headerTl
        .from(headerRef.current, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          ease: "power3.out",
        })
        .from(".hackathon-subtitle", {
          y: 20,
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        }, "-=0.3");

      // Spotlight entrance
      gsap.from(spotlightRef.current, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
        scrollTrigger: {
          trigger: spotlightRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Carousel entrance
      gsap.from(carouselRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [hackathons.length]);

  // Handle card selection with animation
  const handleSelect = (project) => {
    if (spotlightRef.current) {
      gsap.to(spotlightRef.current, {
        scale: 0.98,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setActiveProject(project);
          gsap.to(spotlightRef.current, {
            scale: 1,
            duration: 0.3,
            ease: "elastic.out(1, 0.5)",
          });
        },
      });
    } else {
      setActiveProject(project);
    }
  };

  // Seed data if empty (development helper)
  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedHackathons();
    } catch (error) {
      console.error("Failed to seed hackathons:", error);
    }
    setIsSeeding(false);
  };

  // Loading state
  if (hackathons === undefined) {
    return (
      <section id="hackathons" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-center items-center h-64">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary"></div>
              <Zap className="absolute inset-0 m-auto w-6 h-6 text-primary animate-pulse" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Empty state
  if (hackathons.length === 0) {
    return (
      <section id="hackathons" className="py-20 px-4 bg-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Trophy className="w-16 h-16 text-primary/50 animate-bounce" />
            <p className="text-muted-foreground text-lg">No hackathon projects yet.</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={sectionRef}
      id="hackathons" 
      className="py-24 px-4 overflow-x-clip overflow-y-visible relative bg-background"
    >
      {/* Floating particles container */}
      <div 
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Background glow effects */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-red-600/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header - EPIC Edition */}
        <div ref={headerRef} className="text-center mb-16">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full 
                       bg-red-500/10 border border-red-500/20 mb-6"
          >
            <Trophy className="w-4 h-4 text-red-500" />
            <span className="text-sm font-medium text-red-500">Competition Projects</span>
          </motion.div>

          <h2 className="text-4xl md:text-6xl font-black mb-4">
            Hackathon{" "}
            <span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600"
              style={{
                textShadow: "0 0 60px rgba(220, 38, 38, 0.3)",
              }}
            >
              Showcase
            </span>
          </h2>

          <p className="hackathon-subtitle text-muted-foreground text-lg max-w-2xl mx-auto">
            Battle-tested projects built under pressure. Each one tells a story of innovation,
            teamwork, and pushing the limits of what's possible in 24-48 hours.
          </p>
        </div>

        {/* Spotlight (Detail View) */}
        <div ref={spotlightRef} className="mb-10">
          <AnimatePresence mode="wait">
            <ProjectSpotlight key={activeProject?._id} project={activeProject} />
          </AnimatePresence>
        </div>

        {/* Carousel (Navigation) */}
        <div ref={carouselRef} className="overflow-visible">
          <HackathonCarousel
            hackathons={hackathons}
            activeId={activeProject?._id}
            onSelect={handleSelect}
          />
        </div>

        {/* See All Button - Epic Edition */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/hackathons"
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full
                       bg-gradient-to-r from-red-500/10 to-transparent
                       border border-red-500/30 hover:border-red-500/60
                       text-red-500 font-medium
                       hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]
                       transition-all duration-300"
          >
            <span>See All Projects</span>
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
