import { useEffect, useRef, useState } from "react";
import anime from "animejs";

/**
 * Anime3DCard - Reusable 3D tilt card with anime.js
 * 
 * Features:
 * - 3D perspective tilt on mouse move
 * - Glow effect following cursor
 * - Smooth spring animations
 * - Shine effect on hover
 */
export const Anime3DCard = ({ 
  children, 
  className = "", 
  glowColor = "rgba(220, 38, 38, 0.4)",
  intensity = 15,
  ...props 
}) => {
  const cardRef = useRef(null);
  const glowRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = e.clientX - centerX;
      const mouseY = e.clientY - centerY;
      
      const rotateX = (mouseY / (rect.height / 2)) * -intensity;
      const rotateY = (mouseX / (rect.width / 2)) * intensity;

      anime({
        targets: card,
        rotateX: rotateX,
        rotateY: rotateY,
        duration: 400,
        easing: "easeOutQuad",
      });

      // Move glow to cursor position
      if (glowRef.current) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        glowRef.current.style.left = `${x}px`;
        glowRef.current.style.top = `${y}px`;
      }
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
      anime({
        targets: card,
        scale: 1.02,
        duration: 300,
        easing: "easeOutQuad",
      });
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      anime({
        targets: card,
        rotateX: 0,
        rotateY: 0,
        scale: 1,
        duration: 600,
        easing: "easeOutElastic(1, .5)",
      });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [intensity]);

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
      }}
      {...props}
    >
      {/* Cursor glow effect */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-40 h-40 rounded-full opacity-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          transform: "translate(-50%, -50%)",
          opacity: isHovered ? 1 : 0,
          filter: "blur(20px)",
        }}
      />
      
      {/* Shine effect */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300"
        style={{
          background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          backgroundPosition: isHovered ? "100% 0" : "-100% 0",
          transition: "background-position 0.6s ease, opacity 0.3s ease",
          opacity: isHovered ? 1 : 0,
        }}
      />
      
      {children}
    </div>
  );
};

/**
 * AnimatedText - Text with staggered reveal animation
 */
export const AnimatedText = ({ 
  text, 
  className = "", 
  delay = 0,
  staggerDelay = 30,
  animationType = "fadeUp" // fadeUp, slideIn, scale, rotate
}) => {
  const textRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (hasAnimated.current) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const animations = {
              fadeUp: {
                translateY: [30, 0],
                opacity: [0, 1],
              },
              slideIn: {
                translateX: [-50, 0],
                opacity: [0, 1],
              },
              scale: {
                scale: [0, 1],
                opacity: [0, 1],
              },
              rotate: {
                rotateX: [-90, 0],
                opacity: [0, 1],
              },
            };

            anime({
              targets: textRef.current?.querySelectorAll(".char"),
              ...animations[animationType],
              duration: 800,
              delay: anime.stagger(staggerDelay, { start: delay }),
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, [delay, staggerDelay, animationType]);

  return (
    <span ref={textRef} className={className} style={{ display: "inline-block" }}>
      {text.split("").map((char, i) => (
        <span
          key={i}
          className="char inline-block opacity-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </span>
  );
};

/**
 * MorphingShape - Animated morphing blob
 */
export const MorphingShape = ({ 
  size = 200, 
  color = "rgba(220, 38, 38, 0.3)",
  className = "" 
}) => {
  const shapeRef = useRef(null);

  useEffect(() => {
    const morphAnimation = () => {
      anime({
        targets: shapeRef.current,
        borderRadius: [
          "60% 40% 30% 70% / 60% 30% 70% 40%",
          "30% 60% 70% 40% / 50% 60% 30% 60%",
          "40% 60% 60% 40% / 70% 30% 50% 50%",
          "60% 40% 30% 70% / 60% 30% 70% 40%",
        ],
        rotate: [0, 360],
        duration: 8000,
        easing: "easeInOutSine",
        loop: true,
      });
    };

    morphAnimation();
  }, []);

  return (
    <div
      ref={shapeRef}
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: color,
        filter: "blur(40px)",
      }}
    />
  );
};

/**
 * ParallaxContainer - Container with scroll-based parallax
 */
export const ParallaxContainer = ({ children, speed = 0.5, className = "" }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const scrollY = window.scrollY;
      const rect = containerRef.current.getBoundingClientRect();
      const elementTop = rect.top + scrollY;
      const offset = (scrollY - elementTop) * speed;
      
      anime.set(containerRef.current, {
        translateY: offset,
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [speed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
};

/**
 * RevealOnScroll - Element that reveals on scroll with anime.js
 */
export const RevealOnScroll = ({ 
  children, 
  className = "",
  delay = 0,
  direction = "up", // up, down, left, right
  distance = 50,
}) => {
  const elementRef = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true;
            
            const directions = {
              up: { translateY: [distance, 0] },
              down: { translateY: [-distance, 0] },
              left: { translateX: [distance, 0] },
              right: { translateX: [-distance, 0] },
            };

            anime({
              targets: elementRef.current,
              ...directions[direction],
              opacity: [0, 1],
              duration: 1000,
              delay,
              easing: "easeOutExpo",
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, [delay, direction, distance]);

  return (
    <div ref={elementRef} className={`opacity-0 ${className}`}>
      {children}
    </div>
  );
};

/**
 * GlowingBorder - Card with animated glowing border
 */
export const GlowingBorder = ({ children, className = "" }) => {
  const borderRef = useRef(null);

  useEffect(() => {
    anime({
      targets: borderRef.current,
      background: [
        "linear-gradient(0deg, #dc2626, #f87171, #dc2626)",
        "linear-gradient(90deg, #dc2626, #f87171, #dc2626)",
        "linear-gradient(180deg, #dc2626, #f87171, #dc2626)",
        "linear-gradient(270deg, #dc2626, #f87171, #dc2626)",
        "linear-gradient(360deg, #dc2626, #f87171, #dc2626)",
      ],
      duration: 4000,
      easing: "linear",
      loop: true,
    });
  }, []);

  return (
    <div className={`relative p-[2px] rounded-xl overflow-hidden ${className}`}>
      <div 
        ref={borderRef}
        className="absolute inset-0"
        style={{ filter: "blur(2px)" }}
      />
      <div className="relative bg-card rounded-xl">
        {children}
      </div>
    </div>
  );
};
