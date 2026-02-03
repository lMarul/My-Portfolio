import { useEffect, useRef } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { UltimateHeroSection } from "../components/UltimateHeroSection";
import { EpicAboutSection } from "../components/EpicAboutSection";
import { EpicSkillsSection } from "../components/EpicSkillsSection";
import { ExperienceSection } from "../components/ExperienceSection";
import { ProjectsSection } from "../components/ProjectsSection";
import { EpicContactSection } from "../components/EpicContactSection";
import { HackathonSection } from "../components/hackathon";
import { CertificationsSection } from "../components/CertificationsSection";

import { DevelopmentProcessSection } from "../components/DevelopmentProcessSection";

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

export const Home = () => {
  const lenisRef = useRef(null);

  // Initialize Lenis smooth scrolling - optimized
  useEffect(() => {
    // Create Lenis instance with optimized settings
    const lenis = new Lenis({
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      lerp: 0.1,
    });

    lenisRef.current = lenis;

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    // Use requestAnimationFrame instead of gsap.ticker for better performance
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

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
    };
  }, []);

  return (
    <>
      <main>
        <UltimateHeroSection />
        <ProjectsSection />
        <HackathonSection />
        <CertificationsSection />
        <EpicSkillsSection />
        <DevelopmentProcessSection />
        <ExperienceSection />
        <EpicAboutSection />
        <EpicContactSection />
      </main>
    </>
  );
};
