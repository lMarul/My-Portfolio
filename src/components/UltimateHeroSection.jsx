import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import siteContentData from "@/data/siteContent.json";
import { Github, Linkedin, Mail, Facebook } from "lucide-react";
import "./HeroSection.css";

/**
 * UltimateHeroSection - Professional Portfolio Hero
 */
export const UltimateHeroSection = () => {
  const heroRef = useRef(null);
  const imageRef = useRef(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Use hero content from JSON
  const heroContent = siteContentData.hero;

  // Default/Fallback content
  const defaultContent = {
    title: "Marwin John Gonzales",
    subtitle: "Full Stack Developer & Tech Enthusiast",
    description: "Building exceptional digital experiences with modern technologies. Passionate about creating innovative solutions that make a difference.",
    roles: ["Full Stack Developer", "Web Developer", "Mobile Developer"]
  };

  // Use fetched content or fallback
  const content = heroContent || defaultContent;

  // Check theme
  useEffect(() => {
    const checkTheme = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };
    
    checkTheme();
    
    // Listen for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
    
    return () => observer.disconnect();
  }, []);

  // Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      // Stagger animation for content
      tl.fromTo(
        ".hero-name",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 }
      )
      .fromTo(
        ".hero-role",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1 },
        "-=0.2"
      )
      .fromTo(
        ".hero-description",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.4"
      )
      .fromTo(
        ".hero-social",
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.1 },
        "-=0.4"
      )
      .fromTo(
        ".hero-cta",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15 },
        "-=0.3"
      );

      // Image animation
      gsap.fromTo(
        imageRef.current,
        { scale: 0.8, opacity: 0, rotate: -5 },
        { scale: 1, opacity: 1, rotate: 0, duration: 1.2, ease: "back.out(1.4)", delay: 0.3 }
      );

    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center px-6 py-20 overflow-hidden"
    >
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 via-transparent to-red-500/5 pointer-events-none" />

      {/* Main Content - Two Column Layout */}
      <div className="container max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Text Content */}
          <div className="space-y-8 z-10">

            {/* Name */}
            <div>
              <h1 className="hero-name text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight whitespace-nowrap">
                <span className="text-red-500 relative inline-block">
                  {content.title}
                  <svg 
                    className="absolute -bottom-2 left-0 w-full" 
                    height="12" 
                    viewBox="0 0 200 12" 
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path 
                      d="M0 8 Q50 0, 100 8 T200 8" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="3"
                      className="text-red-500/50"
                    />
                  </svg>
                </span>
              </h1>
            </div>

            {/* Roles */}
            <div className="flex flex-wrap gap-3">
              {content.roles.map((role, i) => (
                <span
                  key={i}
                  className="hero-role px-4 py-2 rounded-lg bg-card border border-border text-sm font-medium hover:border-red-500/50 hover:bg-red-500/5 transition-all duration-300 cursor-default"
                >
                  {role}
                </span>
              ))}
            </div>

            {/* Description */}
            <p className="hero-description text-lg text-muted-foreground leading-relaxed max-w-xl">
              {content.description}
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              {siteContentData.socialLinks
                ?.filter(link => link.isActive)
                .sort((a, b) => a.order - b.order)
                .map((link, index) => {
                  // Icon mapping
                  const IconComponent = {
                    github: Github,
                    linkedin: Linkedin,
                    email: Mail,
                    facebook: Facebook
                  }[link.platform.toLowerCase()] || Mail;

                  return (
                    <a
                      key={index}
                      href={link.url}
                      target={link.platform !== 'email' ? "_blank" : undefined}
                      rel={link.platform !== 'email' ? "noopener noreferrer" : undefined}
                      className="hero-social w-12 h-12 rounded-full bg-card border border-border flex items-center justify-center hover:border-red-500 hover:bg-red-500/10 transition-all duration-300 hover:scale-110"
                      aria-label={link.label}
                    >
                      <IconComponent className="w-5 h-5" />
                    </a>
                  );
                })}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="hero-cta group inline-flex items-center justify-center px-8 py-4 text-base font-semibold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-red-500/25"
              >
                View My Work
                <svg 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </a>
              <a
                href="#contact"
                className="hero-cta inline-flex items-center justify-center px-8 py-4 text-base font-semibold border-2 border-border rounded-lg hover:border-red-500 hover:bg-red-500/5 transition-all duration-300 hover:scale-105"
              >
                Get In Touch
              </a>
            </div>

          </div>

          {/* Right Column - Profile Image */}
          <div className="relative flex items-center justify-center lg:justify-end">
            <div ref={imageRef} className="relative">
              {/* Decorative elements */}
              <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-red-600/20 rounded-2xl blur-2xl opacity-50 animate-pulse" />
              
              {/* Image container */}
              <div className="relative w-[320px] h-[400px] sm:w-[400px] sm:h-[500px] rounded-2xl overflow-hidden border-4 border-border bg-card shadow-2xl">
                <img
                  src={isDarkMode ? "/profile-dark.png" : "/profile-light.png"}
                  alt={content.title}
                  className="w-full h-full object-cover object-center transition-opacity duration-500"
                  loading="eager"
                />
                
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

