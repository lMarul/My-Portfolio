import { useState, useEffect, useRef } from "react";
import anime from "animejs";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Anime3DCard, RevealOnScroll } from "./AnimeComponents";
import { Sparkles, Cpu, Layers, Wrench, Code2 } from "lucide-react";

const categories = [
  { id: "all", label: "All", icon: Layers },
  { id: "frontend", label: "Frontend", icon: Code2 },
  { id: "backend", label: "Backend", icon: Cpu },
  { id: "frameworks", label: "Frameworks", icon: Sparkles },
  { id: "tools", label: "Tools", icon: Wrench },
];

/**
 * EpicSkillsSection - 3D animated skills showcase
 */
export const EpicSkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const skills = useQuery(api.skills.get) ?? [];
  const containerRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );

  // Animate skills when category changes
  useEffect(() => {
    if (isAnimating) return;
    setIsAnimating(true);

    // Exit animation
    anime({
      targets: ".skill-card",
      translateY: [0, 20],
      opacity: [1, 0],
      scale: [1, 0.9],
      duration: 200,
      easing: "easeInQuad",
      complete: () => {
        // Entrance animation
        setTimeout(() => {
          anime({
            targets: ".skill-card",
            translateY: [40, 0],
            translateZ: [0, 30],
            opacity: [0, 1],
            scale: [0.8, 1],
            rotateX: [-15, 0],
            duration: 600,
            delay: anime.stagger(50),
            easing: "easeOutExpo",
            complete: () => setIsAnimating(false),
          });
        }, 50);
      },
    });
  }, [activeCategory]);

  // Initial entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Animate category buttons
            anime({
              targets: ".category-btn",
              translateY: [30, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
              duration: 800,
              delay: anime.stagger(80),
              easing: "easeOutExpo",
            });

            // Animate skill cards
            anime({
              targets: ".skill-card",
              translateY: [60, 0],
              translateZ: [0, 30],
              opacity: [0, 1],
              scale: [0.7, 1],
              rotateX: [-20, 0],
              duration: 1000,
              delay: anime.stagger(60, { start: 400 }),
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Handle category click with ripple effect
  const handleCategoryClick = (categoryId, e) => {
    const button = e.currentTarget;
    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ripple.style.cssText = `
      position: absolute;
      width: 10px;
      height: 10px;
      background: rgba(255,255,255,0.6);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      transform: translate(-50%, -50%) scale(0);
      pointer-events: none;
    `;
    button.appendChild(ripple);

    anime({
      targets: ripple,
      scale: [0, 15],
      opacity: [1, 0],
      duration: 600,
      easing: "easeOutExpo",
      complete: () => ripple.remove(),
    });

    setActiveCategory(categoryId);
  };

  return (
    <section 
      id="skills" 
      ref={containerRef}
      className="py-32 px-4 relative overflow-hidden bg-gradient-to-b from-background via-secondary/20 to-background"
      style={{ perspective: "1500px" }}
    >
      {/* Animated background grid */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(220,38,38,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220,38,38,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      {/* Floating decorations */}
      <div className="absolute top-40 left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-40 right-20 w-80 h-80 bg-red-500/10 rounded-full blur-3xl animate-pulse" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <RevealOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
              My Arsenal
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Skills & <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Technologies</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The tools and technologies I use to bring ideas to life
          </p>
        </RevealOnScroll>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={(e) => handleCategoryClick(category.id, e)}
                className={cn(
                  "category-btn relative px-6 py-3 rounded-full font-medium transition-all duration-300 overflow-hidden opacity-0",
                  "flex items-center gap-2 border-2",
                  activeCategory === category.id
                    ? "bg-gradient-to-r from-red-600 to-red-500 text-white border-transparent shadow-lg shadow-red-500/30"
                    : "bg-card/50 backdrop-blur-sm text-foreground border-border/50 hover:border-primary/50 hover:bg-card"
                )}
              >
                <Icon className="w-4 h-4" />
                {category.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5"
          style={{ transformStyle: "preserve-3d" }}
        >
          {filteredSkills.map((skill, index) => (
            <Anime3DCard
              key={skill._id || index}
              className="skill-card opacity-0"
              intensity={12}
              glowColor="rgba(220, 38, 38, 0.3)"
            >
              <div 
                className="group relative p-6 rounded-2xl bg-gradient-to-br from-card/90 to-card/50 
                           backdrop-blur-xl border border-border/50 hover:border-primary/50
                           transition-all duration-300 cursor-pointer overflow-hidden"
              >
                {/* Hover glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon with 3D effect */}
                <div 
                  className="relative flex flex-col items-center gap-4"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div 
                    className="relative w-16 h-16 flex items-center justify-center"
                    style={{ transform: "translateZ(25px)" }}
                  >
                    {/* Glow behind icon */}
                    <div className="absolute inset-0 bg-primary/20 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <img 
                      src={skill.img} 
                      alt={skill.name + ' icon'} 
                      className="relative w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  
                  <span 
                    className="font-semibold text-lg text-center group-hover:text-primary transition-colors duration-300"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    {skill.name}
                  </span>

                  {/* Category tag */}
                  <span 
                    className="text-xs text-muted-foreground/60 uppercase tracking-wider"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {skill.category}
                  </span>
                </div>

                {/* Floating particles on hover */}
                <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-primary rounded-full animate-float"
                      style={{
                        left: `${20 + Math.random() * 60}%`,
                        top: `${20 + Math.random() * 60}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: `${2 + Math.random()}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </Anime3DCard>
          ))}
        </div>

        {/* Empty state */}
        {filteredSkills.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No skills found in this category</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.5; }
          50% { transform: translateY(-10px) scale(1.2); opacity: 1; }
        }
        .animate-float {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
