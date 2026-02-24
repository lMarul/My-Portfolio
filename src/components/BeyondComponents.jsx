import { useEffect, useRef, useState } from "react";
import anime from "animejs";

/**
 * ParticleExplosion - Triggers a particle explosion at the click coordinates
 */
export const ParticleExplosion = () => {
    useEffect(() => {
        const handleClick = (e) => {
            const particles = [];
            const colors = ["#dc2626", "#ef4444", "#f87171", "#ffffff"];

            const particleCount = 30;

            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement("div");
                document.body.appendChild(particle);

                const size = Math.random() * 4 + 2;

                particle.style.position = "fixed";
                particle.style.left = e.clientX + "px";
                particle.style.top = e.clientY + "px";
                particle.style.width = size + "px";
                particle.style.height = size + "px";
                particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
                particle.style.borderRadius = "50%";
                particle.style.pointerEvents = "none";
                particle.style.zIndex = "9999";

                particles.push(particle);
            }

            anime({
                targets: particles,
                translateX: () => anime.random(-100, 100),
                translateY: () => anime.random(-100, 100),
                scale: [1, 0],
                opacity: [1, 0],
                easing: "easeOutExpo",
                duration: 800,
                complete: () => {
                    particles.forEach(p => p.remove());
                }
            });
        };

        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, []);

    return null;
};

/**
 * MagneticButton - Button that magnetically attracts to cursor (Toned Down for Professional Feel)
 */
export const MagneticButton = ({ children, className = "", scale = 1.05, ...props }) => {
    const btnRef = useRef(null);

    useEffect(() => {
        const btn = btnRef.current;
        if (!btn) return;

        const handleMouseMove = (e) => {
            const rect = btn.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const distanceX = e.clientX - centerX;
            const distanceY = e.clientY - centerY;

            // Magnetic pull strength (Reduced for professional feel)
            const pull = 0.2;

            anime({
                targets: btn,
                translateX: distanceX * pull,
                translateY: distanceY * pull,
                scale: scale,
                duration: 100,
                easing: "easeOutQuad"
            });
        };

        const handleMouseLeave = () => {
            anime({
                targets: btn,
                translateX: 0,
                translateY: 0,
                scale: 1,
                duration: 600,
                easing: "easeOutElastic(1, .8)"
            });
        };

        btn.addEventListener("mousemove", handleMouseMove);
        btn.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            btn.removeEventListener("mousemove", handleMouseMove);
            btn.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, [scale]);

    return (
        <div ref={btnRef} className={`inline-block ${className}`} {...props}>
            {children}
        </div>
    );
};

/**
 * GlitchText - Cyberpunk style glitch text effect
 */
export const GlitchText = ({ text, className = "" }) => {
    const [display, setDisplay] = useState(text);
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

    const glitch = () => {
        const glitchDuration = 300;
        const glitchInterval = 50;

        let iterations = 0;
        const maxIterations = text.length;

        const interval = setInterval(() => {
            setDisplay(
                text
                    .split("")
                    .map((char, i) => {
                        if (i < iterations) return text[i];
                        return chars[Math.floor(Math.random() * chars.length)];
                    })
                    .join("")
            );

            iterations += 1 / 2; // Speed of decoding

            if (iterations >= maxIterations) {
                clearInterval(interval);
                setDisplay(text);
            }
        }, glitchInterval);
    };

    return (
        <span
            className={`relative inline-block cursor-default group ${className}`}
            onMouseEnter={glitch}
        >
            <span className="relative z-10">{display}</span>
            <span className="absolute top-0 left-0 -z-10 text-red-500 opacity-0 group-hover:opacity-70 group-hover:translate-x-[2px] transition-all duration-100 animate-pulse">
                {display}
            </span>
            <span className="absolute top-0 left-0 -z-10 text-blue-500 opacity-0 group-hover:opacity-70 group-hover:-translate-x-[2px] transition-all duration-100 animate-pulse delay-75">
                {display}
            </span>
        </span>
    );
};

/**
 * CyberGrid - 3D Perspective Grid Background
 */
export const CyberGrid = () => {
    const gridRef = useRef(null);

    useEffect(() => {
        const grid = gridRef.current;

        anime({
            targets: grid,
            backgroundPosition: ["0px 0px", "0px 100px"], // Move grid downwards
            duration: 2000,
            easing: "linear",
            loop: true
        });
    }, []);

    return (
        <div
            className="absolute inset-0 pointer-events-none opacity-20 z-[1]"
            style={{
                perspective: "500px",
                overflow: "hidden"
            }}
        >
            <div
                ref={gridRef}
                className="absolute inset-0 w-[200%] h-[200%] -left-[50%]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(220, 38, 38, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(220, 38, 38, 0.5) 1px, transparent 1px)
          `,
                    backgroundSize: "40px 40px",
                    transform: "rotateX(60deg) translateY(-100px) translateZ(-100px)",
                    transformOrigin: "center top",
                }}
            />

            {/* Horizon glow */}
            <div
                className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background to-transparent z-10"
            />
        </div>
    );
};

/**
 * LiquidBlob - Morphing circular blob
 */
export const LiquidBlob = ({ color = "#dc2626", size = 300, className = "" }) => {
    const blobRef = useRef(null);

    useEffect(() => {
        anime({
            targets: blobRef.current,
            borderRadius: [
                { value: "50%" },
                { value: "60% 40% 30% 70% / 60% 30% 70% 40%" },
                { value: "30% 60% 70% 40% / 50% 60% 30% 60%" },
                { value: "50%" }
            ],
            scale: [
                { value: 1 },
                { value: 1.1 },
                { value: 0.9 },
                { value: 1 }
            ],
            rotate: '1turn',
            duration: 10000,
            loop: true,
            easing: "easeInOutSine"
        });
    }, []);

    return (
        <div
            ref={blobRef}
            className={`absolute opacity-20 filter blur-3xl pointer-events-none z-[2] ${className}`}
            style={{
                width: size,
                height: size,
                backgroundColor: color,
                willChange: "transform, border-radius",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden"
            }}
        />
    );
};
