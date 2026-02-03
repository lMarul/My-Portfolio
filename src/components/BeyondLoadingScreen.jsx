import { useEffect, useRef, useState } from "react";
import anime from "animejs";

/**
 * BeyondLoadingScreen - High-end Anime.js entrance
 */
export const BeyondLoadingScreen = ({ onComplete }) => {
    const containerRef = useRef(null);
    const textRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Disable scrolling during loading
        document.body.style.overflow = "hidden";

        // Intro Animation
        const tl = anime.timeline({
            easing: 'easeOutExpo',
        });

        // 1. Initial Reveal
        tl.add({
            targets: '.loading-char',
            opacity: [0, 1],
            translateY: [50, 0],
            rotateX: [-90, 0],
            delay: anime.stagger(100),
            duration: 1200,
        })

            // 2. Expand Circle
            .add({
                targets: '.loading-circle',
                scale: [0, 1],
                opacity: [0, 1],
                duration: 1000,
            }, '-=800')

            // 3. Orbiting Particles
            .add({
                targets: '.orbit-particle',
                translateX: () => anime.random(-100, 100),
                translateY: () => anime.random(-100, 100),
                scale: [0, 1],
                opacity: [0, 1],
                delay: anime.stagger(50),
                duration: 800,
            }, '-=800');

        // Simulated Progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    finishLoading();
                    return 100;
                }
                return prev + 1; // Fast load
            });
        }, 20); // 20ms * 100 = 2000ms approx (2s load time)

        return () => clearInterval(progressInterval);
    }, []);

    const finishLoading = () => {
        // Exit Animation
        const tl = anime.timeline({
            easing: 'easeInOutQuart',
            complete: () => {
                document.body.style.overflow = "auto";
                if (onComplete) onComplete();
            }
        });

        tl.add({
            targets: '.loading-content',
            opacity: 0,
            scale: 2,
            duration: 800,
            delay: 500
        })
            .add({
                targets: containerRef.current,
                scaleY: [1, 0], // Curtains close/open effect or just fade
                opacity: 0,
                duration: 600,
            }, '-=400');
    };

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black overflow-hidden"
        >
            {/* Background Grid */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `radial-gradient(circle at 50% 50%, #444 1px, transparent 1px)`,
                    backgroundSize: "30px 30px"
                }}
            />

            <div className="loading-content relative z-10 flex flex-col items-center">
                {/* Main Logo Text */}
                <h1 ref={textRef} className="text-6xl md:text-9xl font-black text-white tracking-widest mb-8 flex overflow-hidden">
                    {"MARWIN".split("").map((char, i) => (
                        <span key={i} className="loading-char inline-block transform-gpu text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">
                            {char}
                        </span>
                    ))}
                </h1>

                {/* Loading Bar */}
                <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden mt-4 relative">
                    <div
                        className="absolute top-0 left-0 h-full bg-red-600 shadow-[0_0_10px_#dc2626]"
                        style={{ width: `${progress}%`, transition: "width 0.1s linear" }}
                    />
                </div>

                <div className="mt-2 text-red-500 font-mono text-xs tracking-[0.5em] opacity-80">
                    INITIALIZING SYSTEM... {progress}%
                </div>

                {/* Decorative Circle */}
                <div className="loading-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-gray-800 rounded-full opacity-0 pointer-events-none" />
                <div className="loading-circle absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] border border-red-900/30 rounded-full opacity-0 pointer-events-none" />

                {/* Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="orbit-particle absolute top-1/2 left-1/2 w-1 h-1 bg-red-500 rounded-full opacity-0"
                        style={{
                            marginLeft: Math.random() * 400 - 200 + 'px',
                            marginTop: Math.random() * 400 - 200 + 'px',
                        }}
                    />
                ))}
            </div>
        </div>
    );
};
