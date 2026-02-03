import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Link } from "react-router-dom";
import { FolderGit2, Sparkles, Code2, Zap, ChevronRight } from "lucide-react";
import { ProjectCarousel } from "./projects/ProjectCarousel";
import { ProjectShowcase } from "./projects/ProjectShowcase";

export const ProjectsSection = () => {
  const projects = useQuery(api.projects.get) || [];
  const seedProjects = useMutation(api.projects.seed);
  const [activeProject, setActiveProject] = useState(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const showcaseRef = useRef(null);
  const carouselRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    if (projects.length > 0 && !activeProject) {
      setActiveProject(projects[0]);
    }
  }, [projects, activeProject]);

  useEffect(() => {
    if (activeProject && projects.length > 0) {
      const updated = projects.find((p) => p._id === activeProject._id);
      if (updated) {
        setActiveProject(updated);
      }
    }
  }, [projects]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create code-like floating particles
      if (particlesRef.current) {
        const codeSymbols = ["</>", "{}", "[]", "()", "=>", "//", "&&", "||"];

        for (let i = 0; i < 15; i++) {
          const particle = document.createElement("div");
          const isSymbol = Math.random() > 0.5;

          if (isSymbol) {
            particle.textContent = codeSymbols[Math.floor(Math.random() * codeSymbols.length)];
            particle.style.cssText = `
              position: absolute;
              font-family: monospace;
              font-size: ${Math.random() * 12 + 10}px;
              color: rgba(220, 38, 38, ${Math.random() * 0.3 + 0.1});
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              pointer-events: none;
              text-shadow: 0 0 10px rgba(220, 38, 38, 0.3);
            `;
          } else {
            particle.style.cssText = `
              position: absolute;
              width: ${Math.random() * 4 + 2}px;
              height: ${Math.random() * 4 + 2}px;
              background: rgba(220, 38, 38, ${Math.random() * 0.4 + 0.2});
              border-radius: 50%;
              left: ${Math.random() * 100}%;
              top: ${Math.random() * 100}%;
              pointer-events: none;
              box-shadow: 0 0 ${Math.random() * 10 + 5}px rgba(220, 38, 38, 0.5);
            `;
          }

          particlesRef.current.appendChild(particle);

          gsap.to(particle, {
            x: `random(-80, 80)`,
            y: `random(-80, 80)`,
            opacity: `random(0.2, 0.8)`,
            rotation: isSymbol ? `random(-20, 20)` : 0,
            duration: `random(4, 10)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }

      // Header entrance animation
      gsap.from(headerRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      });

      // Showcase entrance
      gsap.from(showcaseRef.current, {
        y: 80,
        opacity: 0,
        scale: 0.95,
        duration: 1.2,
        delay: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: showcaseRef.current,
          start: "top 85%",
          toggleActions: "play none none reverse",
        },
      });

      // Carousel entrance
      gsap.from(carouselRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        delay: 0.4,
        ease: "power3.out",
        scrollTrigger: {
          trigger: carouselRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [projects.length]);

  const handleSelect = (project) => {
    if (showcaseRef.current) {
      gsap.to(showcaseRef.current, {
        scale: 0.98,
        duration: 0.15,
        ease: "power2.in",
        onComplete: () => {
          setActiveProject(project);
          gsap.to(showcaseRef.current, {
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

  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedProjects();
    } finally {
      setIsSeeding(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="py-28 px-4 relative overflow-hidden"
    >
      {/* Floating particles */}
      <div
        ref={particlesRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Background glow effects */}
      <div className="absolute top-20 right-1/4 w-[500px] h-[500px] bg-red-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-1/4 w-[400px] h-[400px] bg-red-600/5 rounded-full blur-3xl" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
              Featured Work
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>

          <h2 className="text-4xl md:text-6xl font-black mb-4 font-cinzel">
            Featured{" "}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600"
              style={{
                textShadow: "0 0 60px rgba(220, 38, 38, 0.3)",
              }}
            >
              Projects
            </span>
          </h2>

          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Explore my portfolio of projects showcasing modern web development,
            creative solutions, and technical expertise that push boundaries.
          </p>
        </div>

        {/* Seed Button (Development) */}
        {projects.length === 0 && (
          <div className="text-center mb-12">
            <button
              onClick={handleSeed}
              disabled={isSeeding}
              className="group px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-500 
                         text-white font-bold text-lg shadow-[0_0_30px_rgba(220,38,38,0.4)]
                         hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105
                         transition-all duration-300 disabled:opacity-50"
            >
              {isSeeding ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                  Loading...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <FolderGit2 className="w-5 h-5" />
                  Load Sample Project
                </span>
              )}
            </button>
          </div>
        )}

        {/* Main Showcase */}
        {projects.length > 0 && (
          <>
            <div ref={showcaseRef} className="mb-10">
              <AnimatePresence mode="wait">
                <ProjectShowcase key={activeProject?._id} project={activeProject} />
              </AnimatePresence>
            </div>

            {/* Carousel */}
            <div ref={carouselRef}>
              <ProjectCarousel
                projects={projects.slice(0, 5)}
                activeId={activeProject?._id}
                onSelect={handleSelect}
              />
            </div>

            {/* See All Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-center mt-12"
            >
              <Link
                to="/projects"
                className="group inline-flex items-center gap-3 px-6 py-3 rounded-full
                           bg-gradient-to-r from-red-500/10 to-transparent
                           border border-red-500/30 hover:border-red-500/60
                           text-red-500 font-medium
                           hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]
                           transition-all duration-300"
              >
                <span>View All Projects</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};
