import { useState, useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Navbar } from "../components/Navbar";
import { UltimateBackground } from "../components/UltimateBackground";
import { UltimateHeroSection } from "../components/UltimateHeroSection";
import { EpicAboutSection } from "../components/EpicAboutSection";
import { EpicSkillsSection } from "../components/EpicSkillsSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { EpicContactSection } from "../components/EpicContactSection";
import { HackathonSection } from "../components/hackathon";
import { CustomCursor } from "../components/CustomCursor";
import { LoadingScreen } from "../components/LoadingScreen";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scrolling
  useEffect(() => {
    if (!isLoading && showContent) {
      // Create Lenis instance
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 2,
        infinite: false,
      });

      lenisRef.current = lenis;

      // Sync Lenis with GSAP ScrollTrigger
      lenis.on("scroll", ScrollTrigger.update);

      gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
      });

      gsap.ticker.lagSmoothing(0);

      // Handle anchor links with smooth scrolling
      const handleAnchorClick = (e) => {
        const target = e.target.closest('a[href^="#"]');
        if (target) {
          e.preventDefault();
          const href = target.getAttribute("href");
          const element = document.querySelector(href);
          if (element) {
            lenis.scrollTo(element, {
              offset: -80,
              duration: 1.5,
            });
          }
        }
      };

      document.addEventListener("click", handleAnchorClick);

      return () => {
        document.removeEventListener("click", handleAnchorClick);
        lenis.destroy();
        gsap.ticker.remove(lenis.raf);
      };
    }
  }, [isLoading, showContent]);

  useEffect(() => {
    if (!isLoading) {
      // Delayed content reveal for smoother transition
      setTimeout(() => setShowContent(true), 100);
    }
  }, [isLoading]);

  return (
    <>
      {/* Epic Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <div className={`min-h-screen bg-background text-foreground overflow-x-hidden grain ${showContent ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
        {/* Custom Cursor */}
        <CustomCursor />
        
        {/* Ultimate Particle Background */}
        <UltimateBackground />

        {/* Navbar */}
        <Navbar />
        
        {/* Main Content */}
        <main>
          <UltimateHeroSection />
          <EpicAboutSection />
          <EpicSkillsSection />
          <HackathonSection />
          <ProjectsSection />
          <EpicContactSection />
        </main>
      </div>
    </>
  );
};
