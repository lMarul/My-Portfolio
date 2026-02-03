import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { Briefcase, Code, User, Sparkles, Zap, Shield } from "lucide-react";
import { Anime3DCard, RevealOnScroll, MorphingShape } from "./AnimeComponents";

/**
 * EpicAboutSection - Over-the-top 3D animated about section
 */
export const EpicAboutSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    // Staggered card entrance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: ".about-card",
              translateY: [100, 0],
              translateZ: [0, 50],
              rotateX: [-15, 0],
              opacity: [0, 1],
              scale: [0.8, 1],
              duration: 1200,
              delay: anime.stagger(150),
              easing: "easeOutExpo",
            });

            anime({
              targets: ".about-icon",
              scale: [0, 1],
              rotate: [180, 0],
              duration: 800,
              delay: anime.stagger(150, { start: 300 }),
              easing: "easeOutElastic(1, .5)",
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const cards = [
    {
      icon: Code,
      title: "Web Development",
      description: "Creating responsive websites and web applications with cutting-edge frameworks and technologies.",
      gradient: "from-red-500 to-rose-500",
    },
    {
      icon: User,
      title: "UI/UX Design",
      description: "Designing intuitive user interfaces and seamless user experiences that delight users.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Briefcase,
      title: "Project Management",
      description: "Leading projects from conception to completion with agile methodologies and best practices.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: Shield,
      title: "Cybersecurity",
      description: "Implementing secure coding practices and understanding web vulnerabilities to build safer applications.",
      gradient: "from-green-500 to-emerald-500",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-32 px-4 relative overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Floating morphing shapes */}
      <MorphingShape size={400} className="top-20 -left-40 opacity-30" />
      <MorphingShape size={300} color="rgba(239, 68, 68, 0.2)" className="bottom-20 -right-20" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section Title */}
        <RevealOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
              Who I Am
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-cinzel">
            About <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">Me</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A passionate developer on a mission to create extraordinary digital experiences
          </p>
        </RevealOnScroll>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Bio */}
          <RevealOnScroll direction="left" delay={200}>
            <div
              className="relative p-8 rounded-3xl bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-xl border border-border/50"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Decorative elements */}
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl" />
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-500/20 rounded-full blur-2xl" />

              <div className="relative z-10 space-y-6">
                <h3 className="text-3xl font-bold font-cinzel text-foreground">
                  Passionate Web Developer & <span className="text-red-500">Cybersecurity Enthusiast</span>
                </h3>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  With rich experiences in web development from various projects,
                  I am still eager to learn more about other languages, frameworks,
                  and technologies that I can use to create more innovative solutions.
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm passionate about exploring new technologies, especially in web development
                  and cybersecurity, constantly pushing the boundaries of what's possible.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 pt-6">
                  {[
                    { value: "10+", label: "Projects" },
                    { value: "5+", label: "Technologies" },
                    { value: "∞", label: "Curiosity" },
                  ].map((stat, i) => (
                    <div key={i} className="text-center">
                      <div className="text-3xl font-bold text-primary">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <a
                    href="#contact"
                    className="group inline-flex items-center gap-2 px-8 py-4 rounded-full 
                               bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold
                               shadow-lg shadow-red-500/25 hover:shadow-red-500/40 
                               hover:scale-105 transition-all duration-300"
                  >
                    <Zap className="w-5 h-5" />
                    Let's Connect
                  </a>
                </div>
              </div>
            </div>
          </RevealOnScroll>

          {/* Right side - Skill cards */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            style={{ transformStyle: "preserve-3d" }}
          >
            {cards.map((card, index) => (
              <Anime3DCard
                key={index}
                className={`about-card opacity-0 rounded-2xl bg-gradient-to-br from-card/90 to-card/50 
                           backdrop-blur-xl border border-border/50 p-6 cursor-pointer
                           hover:border-primary/50 transition-colors duration-300`}
                intensity={10}
              >
                <div className="relative z-10">
                  <div
                    className={`about-icon w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} 
                                flex items-center justify-center mb-4 shadow-lg`}
                    style={{
                      transform: "translateZ(20px)",
                      boxShadow: `0 10px 40px -10px ${card.gradient.includes("red") ? "rgba(239,68,68,0.5)" : "rgba(99,102,241,0.5)"}`,
                    }}
                  >
                    <card.icon className="w-7 h-7 text-white" />
                  </div>

                  <h4
                    className="text-xl font-bold mb-2"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    {card.title}
                  </h4>

                  <p
                    className="text-muted-foreground text-sm leading-relaxed"
                    style={{ transform: "translateZ(10px)" }}
                  >
                    {card.description}
                  </p>
                </div>

                {/* Card glow effect */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${card.gradient} opacity-0 
                              group-hover:opacity-10 transition-opacity duration-300`}
                />
              </Anime3DCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
