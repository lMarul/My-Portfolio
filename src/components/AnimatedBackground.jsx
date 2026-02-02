import { useEffect, useRef, useState } from "react";
import anime from "animejs";

/**
 * AnimatedBackground - Epic 3D Particle System with Anime.js
 * 
 * Features:
 * - 3D floating orbs with depth parallax
 * - Mouse-reactive particles
 * - Glowing energy rings
 * - Shooting stars
 * - Morphing geometric shapes
 */
export const AnimatedBackground = () => {
  const containerRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const container = containerRef.current;
    if (!container) return;

    // Track mouse position for parallax
    const handleMouseMove = (e) => {
      mouseRef.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Create floating orbs
    const createOrbs = () => {
      const orbsContainer = document.createElement("div");
      orbsContainer.className = "orbs-container";
      container.appendChild(orbsContainer);

      for (let i = 0; i < 20; i++) {
        const orb = document.createElement("div");
        orb.className = "floating-orb";
        const size = Math.random() * 100 + 50;
        const depth = Math.random();
        
        orb.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, 
            rgba(220, 38, 38, ${0.15 + depth * 0.15}), 
            rgba(220, 38, 38, ${0.05 + depth * 0.05}) 50%, 
            transparent 70%);
          filter: blur(${(1 - depth) * 20}px);
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          transform: translateZ(${depth * 100}px);
          pointer-events: none;
        `;
        orb.dataset.depth = depth;
        orbsContainer.appendChild(orb);
      }

      // Animate orbs
      anime({
        targets: ".floating-orb",
        translateX: () => anime.random(-100, 100),
        translateY: () => anime.random(-100, 100),
        scale: () => [0.8, 1.2],
        opacity: () => [0.3, 0.8],
        duration: () => anime.random(8000, 15000),
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
        delay: anime.stagger(200),
      });
    };

    // Create energy rings
    const createEnergyRings = () => {
      const ringsContainer = document.createElement("div");
      ringsContainer.className = "rings-container";
      ringsContainer.style.cssText = `
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
      `;
      container.appendChild(ringsContainer);

      for (let i = 0; i < 5; i++) {
        const ring = document.createElement("div");
        ring.className = "energy-ring";
        const size = 200 + i * 150;
        ring.style.cssText = `
          position: absolute;
          width: ${size}px;
          height: ${size}px;
          border: 1px solid rgba(220, 38, 38, ${0.3 - i * 0.05});
          border-radius: 50%;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotateX(75deg);
          transform-style: preserve-3d;
        `;
        ringsContainer.appendChild(ring);
      }

      // Animate rings rotation
      anime({
        targets: ".energy-ring",
        rotateZ: 360,
        duration: (el, i) => 20000 + i * 5000,
        easing: "linear",
        loop: true,
      });

      // Pulse effect
      anime({
        targets: ".energy-ring",
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.6, 0.3],
        duration: 4000,
        easing: "easeInOutQuad",
        delay: anime.stagger(300),
        loop: true,
      });
    };

    // Create shooting stars
    const createShootingStars = () => {
      const starsContainer = document.createElement("div");
      starsContainer.className = "stars-container";
      container.appendChild(starsContainer);

      const shootStar = () => {
        const star = document.createElement("div");
        star.className = "shooting-star";
        const startX = Math.random() * window.innerWidth;
        const startY = -50;
        
        star.style.cssText = `
          position: absolute;
          width: 2px;
          height: 80px;
          background: linear-gradient(to bottom, transparent, rgba(220, 38, 38, 0.8), rgba(255, 255, 255, 1));
          left: ${startX}px;
          top: ${startY}px;
          transform: rotate(45deg);
          pointer-events: none;
          border-radius: 50%;
          box-shadow: 0 0 10px rgba(220, 38, 38, 0.8);
        `;
        starsContainer.appendChild(star);

        anime({
          targets: star,
          translateX: window.innerWidth * 0.7,
          translateY: window.innerHeight * 1.2,
          opacity: [1, 0],
          duration: 1500,
          easing: "easeInExpo",
          complete: () => star.remove(),
        });
      };

      // Random shooting stars
      const shootInterval = setInterval(() => {
        if (Math.random() > 0.7) shootStar();
      }, 2000);

      return () => clearInterval(shootInterval);
    };

    // Create geometric shapes
    const createGeometricShapes = () => {
      const shapesContainer = document.createElement("div");
      shapesContainer.className = "shapes-container";
      container.appendChild(shapesContainer);

      const shapes = ["▲", "◆", "●", "■", "⬡"];
      
      for (let i = 0; i < 15; i++) {
        const shape = document.createElement("div");
        shape.className = "geo-shape";
        shape.textContent = shapes[Math.floor(Math.random() * shapes.length)];
        const size = Math.random() * 30 + 10;
        
        shape.style.cssText = `
          position: absolute;
          font-size: ${size}px;
          color: rgba(220, 38, 38, ${Math.random() * 0.3 + 0.1});
          left: ${Math.random() * 100}%;
          top: ${Math.random() * 100}%;
          transform-style: preserve-3d;
          pointer-events: none;
          text-shadow: 0 0 10px rgba(220, 38, 38, 0.5);
        `;
        shapesContainer.appendChild(shape);
      }

      // 3D rotation animation
      anime({
        targets: ".geo-shape",
        rotateX: () => anime.random(0, 360),
        rotateY: () => anime.random(0, 360),
        rotateZ: () => anime.random(0, 360),
        translateX: () => anime.random(-50, 50),
        translateY: () => anime.random(-50, 50),
        scale: () => [0.5, 1.5],
        duration: () => anime.random(10000, 20000),
        easing: "easeInOutSine",
        direction: "alternate",
        loop: true,
        delay: anime.stagger(100),
      });
    };

    // Parallax effect on mouse move
    const parallaxAnimation = () => {
      anime({
        targets: ".floating-orb",
        translateX: (el) => {
          const depth = parseFloat(el.dataset.depth);
          return mouseRef.current.x * 50 * depth;
        },
        translateY: (el) => {
          const depth = parseFloat(el.dataset.depth);
          return mouseRef.current.y * 50 * depth;
        },
        duration: 1000,
        easing: "easeOutQuad",
      });
      requestAnimationFrame(parallaxAnimation);
    };

    createOrbs();
    createEnergyRings();
    const cleanupStars = createShootingStars();
    createGeometricShapes();
    parallaxAnimation();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (cleanupStars) cleanupStars();
      if (container) {
        container.innerHTML = "";
      }
    };
  }, []);

  if (!mounted) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full pointer-events-none overflow-hidden"
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
        zIndex: 0,
      }}
    />
  );
};
