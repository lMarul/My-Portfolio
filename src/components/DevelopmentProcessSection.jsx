import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
    Lightbulb,
    PenTool,
    Code2,
    Rocket,
    Search,
    Sparkles,
    Zap,
    CheckCircle2,
    Cpu,
    Globe
} from "lucide-react";
import { Anime3DCard, RevealOnScroll, MorphingShape } from "./AnimeComponents";

// Register GSAP Plugin
gsap.registerPlugin(ScrollTrigger);

const processSteps = [
    {
        id: 1,
        title: "Discovery & Strategy",
        description: "Understanding the core problem, defining objectives, and planning the strategic approach to ensure success from day one.",
        icon: Search,
        color: "#3b82f6", // Blue
        skills: ["Requirements Analysis", "Competitor Research", "Feasibility Study"]
    },
    {
        id: 2,
        title: "Design & Prototyping",
        description: "Crafting intuitive user interfaces and seamless experiences. Transforming abstract ideas into visual reality.",
        icon: PenTool,
        color: "#a855f7", // Purple
        skills: ["UI/UX Design", "Wireframing", "Interactive Prototypes"]
    },
    {
        id: 3,
        title: "Development",
        description: "Writing clean, scalable, and efficient code. Building the robust architecture that powers the application.",
        icon: Code2,
        color: "#ef4444", // Red (Primary)
        skills: ["Frontend", "Backend", "Database Architecture"]
    },
    {
        id: 4,
        title: "Testing & Optimization",
        description: " rigorous testing and performance tuning to ensure a bug-free, lightning-fast experience for every user.",
        icon: Cpu,
        color: "#f59e0b", // Amber
        skills: ["Unit Testing", "Performance Optimization", "Security Audits"]
    },
    {
        id: 5,
        title: "Deployment & Launch",
        description: "Seamless deployment pipelines and post-launch support. Bringing your digital product to the world.",
        icon: Rocket,
        color: "#10b981", // Emerald
        skills: ["CI/CD", "Cloud Hosting", "Analytics Integration"]
    }
];

export const DevelopmentProcessSection = () => {
    const sectionRef = useRef(null);
    const lineRef = useRef(null);
    const cardsRef = useRef([]);

    useEffect(() => {
        // Animate the connecting line
        const ctx = gsap.context(() => {
            // Line fills up as you scroll
            gsap.fromTo(lineRef.current,
                { height: "0%" },
                {
                    height: "100%",
                    ease: "none",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 60%",
                        end: "bottom 80%",
                        scrub: 1,
                    }
                }
            );

            // Animate cards entering
            cardsRef.current.forEach((card, index) => {
                gsap.fromTo(card,
                    {
                        opacity: 0,
                        x: index % 2 === 0 ? -50 : 50,
                        rotateY: index % 2 === 0 ? -15 : 15
                    },
                    {
                        opacity: 1,
                        x: 0,
                        rotateY: 0,
                        duration: 1,
                        ease: "power3.out",
                        scrollTrigger: {
                            trigger: card,
                            start: "top 85%",
                            toggleActions: "play none none reverse"
                        }
                    }
                );
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="process"
            className="py-32 px-4 relative overflow-hidden bg-background"
        >
            {/* Background Ambience */}
            <MorphingShape
                className="top-0 right-0 opacity-20"
                color="rgba(239, 68, 68, 0.1)"
                size={600}
            />

            <div className="container mx-auto max-w-6xl relative z-10">

                {/* Section Header */}
                <RevealOnScroll className="text-center mb-24">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <Zap className="w-4 h-4 text-primary animate-pulse" />
                        <span className="text-sm font-semibold text-primary tracking-widest uppercase">
                            Workflow & Methodology
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-7xl font-black mb-6 font-cinzel tracking-tight">
                        My <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-orange-500 to-red-600">Process</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        From chaos to clarity. A systematic approach to building exceptional digital products.
                    </p>
                </RevealOnScroll>

                {/* Timeline Container */}
                <div className="relative">
                    {/* Central Line (Desktop) */}
                    <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-border/30 -translate-x-1/2 hidden md:block">
                        <div
                            ref={lineRef}
                            className="w-full bg-gradient-to-b from-red-500 via-purple-500 to-blue-500 origin-top shadow-[0_0_20px_rgba(220,38,38,0.5)]"
                        />
                    </div>

                    {/* Steps */}
                    <div className="space-y-12 md:space-y-0">
                        {processSteps.map((step, index) => (
                            <div
                                key={step.id}
                                ref={el => cardsRef.current[index] = el}
                                className={`flex flex-col md:flex-row gap-8 items-center ${index % 2 === 0 ? "md:flex-row-reverse" : ""
                                    }`}
                            >
                                {/* Content Side */}
                                <div className="flex-1 w-full md:w-1/2">
                                    <Anime3DCard
                                        intensity={10}
                                        className="h-full"
                                        glowColor={step.color}
                                    >
                                        <div className="relative p-8 rounded-3xl bg-card/40 backdrop-blur-xl border border-white/10 overflow-hidden group hover:border-white/20 transition-colors duration-500 will-change-transform">
                                            {/* Hover Gradient */}
                                            <div
                                                className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                                                style={{ background: `linear-gradient(135deg, ${step.color}, transparent)` }}
                                            />

                                            <div className="relative z-10">
                                                {/* Step Number */}
                                                <div
                                                    className="text-8xl font-black absolute -top-6 -right-6 opacity-80 select-none transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 drop-shadow-md"
                                                    style={{ color: step.color }}
                                                >
                                                    {step.id}
                                                </div>

                                                {/* Icon & Title */}
                                                <div className="flex items-center gap-4 mb-6">
                                                    <div
                                                        className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:rotate-12 transition-transform duration-500"
                                                        style={{
                                                            background: `linear-gradient(135deg, ${step.color}20, ${step.color}10)`,
                                                            border: `1px solid ${step.color}40`,
                                                            boxShadow: `0 0 20px ${step.color}20`
                                                        }}
                                                    >
                                                        <step.icon
                                                            className="w-7 h-7"
                                                            style={{ color: step.color }}
                                                        />
                                                    </div>
                                                    <h3 className="text-2xl font-bold">{step.title}</h3>
                                                </div>

                                                {/* Description */}
                                                <p className="text-muted-foreground text-lg mb-6 leading-relaxed border-l-2 pl-4 border-white/10 group-hover:border-white/30 transition-colors">
                                                    {step.description}
                                                </p>

                                                {/* Skills/Tags */}
                                                <div className="flex flex-wrap gap-2">
                                                    {step.skills.map((skill, i) => (
                                                        <span
                                                            key={i}
                                                            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-foreground/80 group-hover:bg-white/10 transition-colors"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </Anime3DCard>
                                </div>

                                {/* Center Node (Desktop) */}
                                <div className="relative flex justify-center items-center w-12 hidden md:flex">
                                    <div
                                        className="w-12 h-12 rounded-full border-4 border-background z-20 flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                                        style={{ background: step.color }}
                                    >
                                        <div className="w-4 h-4 bg-white rounded-full animate-pulse" />
                                    </div>
                                </div>

                                {/* Empty Side (For Layout Balance) */}
                                <div className="flex-1 hidden md:block" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Call To Action */}
                <div className="mt-32 text-center">
                    <RevealOnScroll delay={200}>
                        <div className="inline-block p-[2px] rounded-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500">
                            <div className="bg-background rounded-full px-8 py-4">
                                <p className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-blue-500 animate-pulse">
                                    Ready to start your project?
                                </p>
                            </div>
                        </div>
                    </RevealOnScroll>
                </div>

            </div>
        </section>
    );
};
