import { useRef } from "react";
import { Award, ExternalLink, Calendar, Cloud, Code, Smartphone, Shield, Database } from "lucide-react";
import { Anime3DCard, RevealOnScroll, MorphingShape } from "./AnimeComponents";

// Sample Certifications Data
const certifications = [
    {
        id: 1,
        title: "AWS Certified Solutions Architect",
        issuer: "Amazon Web Services",
        date: "2024",
        credentialId: "AWS-SCA-2024",
        icon: Cloud,
        color: "from-orange-500 to-yellow-500",
        glow: "rgba(249, 115, 22, 0.4)",
        skills: ["Cloud Architecture", "Security", "Scalability"]
    },
    {
        id: 2,
        title: "Professional Cloud Developer",
        issuer: "Google Cloud",
        date: "2023",
        credentialId: "GCP-PCD-2023",
        icon: Code,
        color: "from-blue-500 to-cyan-400",
        glow: "rgba(59, 130, 246, 0.4)",
        skills: ["GCP", "Kubernetes", "DevOps"]
    },
    {
        id: 3,
        title: "Meta Front-End Professional",
        issuer: "Meta",
        date: "2023",
        credentialId: "META-FE-2023",
        icon: Smartphone,
        color: "from-blue-600 to-indigo-600",
        glow: "rgba(37, 99, 235, 0.4)",
        skills: ["React", "JavaScript", "UX/UI"]
    },
    {
        id: 4,
        title: "Certified Kubernetes Administrator",
        issuer: "CNCF",
        date: "2023",
        credentialId: "CKA-2023",
        icon: Database,
        color: "from-blue-400 to-blue-300",
        glow: "rgba(96, 165, 250, 0.4)",
        skills: ["Kubernetes", "Container Orchestration", "Linux"]
    }
];

export const CertificationsSection = () => {
    return (
        <section id="certifications" className="py-32 px-4 relative overflow-hidden bg-background">
            {/* Background Elements */}
            <MorphingShape
                className="top-20 -left-20 opacity-30"
                size={500}
                color="rgba(59, 130, 246, 0.15)"
            />
            <MorphingShape
                className="bottom-20 -right-20 opacity-30"
                size={400}
                color="rgba(249, 115, 22, 0.15)"
            />

            {/* Grid Background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
                    backgroundSize: "40px 40px",
                }}
            />

            <div className="container mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <RevealOnScroll className="text-center mb-20">
                    <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 backdrop-blur-sm">
                        <Award className="w-5 h-5 text-primary" />
                        <span className="text-sm font-semibold text-primary tracking-wide uppercase">
                            Professional Credentials
                        </span>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600">Expertise</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Verified technical proficiency and professional milestones in modern software engineering.
                    </p>
                </RevealOnScroll>

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {certifications.map((cert, index) => {
                        const Icon = cert.icon;
                        return (
                            <RevealOnScroll key={cert.id} delay={index * 150} direction={index % 2 === 0 ? "left" : "right"}>
                                <Anime3DCard
                                    intensity={10}
                                    glowColor={cert.glow}
                                    className="h-full"
                                >
                                    <div className="relative h-full p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-white/10 overflow-hidden group">
                                        {/* Gradient Background on Hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${cert.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                                        <div className="flex flex-col md:flex-row gap-6 items-start md:items-center relative z-10">
                                            {/* Icon Container */}
                                            <div className={`
                        w-20 h-20 rounded-2xl flex items-center justify-center shrink-0
                        bg-gradient-to-br ${cert.color} shadow-lg shadow-black/20
                        group-hover:scale-110 transition-transform duration-500 ease-out
                      `}>
                                                <Icon className="w-10 h-10 text-white" />
                                            </div>

                                            <div className="flex-1 space-y-3">
                                                {/* Title & Issuer */}
                                                <div>
                                                    <h3 className="text-2xl font-bold group-hover:text-primary transition-colors duration-300">
                                                        {cert.title}
                                                    </h3>
                                                    <p className="text-lg text-muted-foreground font-medium flex items-center gap-2">
                                                        {cert.issuer}
                                                        <span className="w-1.5 h-1.5 rounded-full bg-primary/50" />
                                                        <Calendar className="w-4 h-4 text-primary/70" />
                                                        <span className="text-sm opacity-80">{cert.date}</span>
                                                    </p>
                                                </div>

                                                {/* Credential ID */}
                                                <div className="flex items-center gap-2 text-sm text-muted-foreground/80 font-mono bg-black/20 px-3 py-1.5 rounded-lg w-fit">
                                                    <Shield className="w-3 h-3" />
                                                    ID: {cert.credentialId}
                                                </div>

                                                {/* Skills Tags */}
                                                <div className="flex flex-wrap gap-2 pt-2">
                                                    {cert.skills.map(skill => (
                                                        <span
                                                            key={skill}
                                                            className="px-3 py-1 rounded-full text-xs font-semibold bg-white/5 border border-white/10 text-foreground/80"
                                                        >
                                                            {skill}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* External Link Button */}
                                            <button className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0">
                                                <ExternalLink className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </Anime3DCard>
                            </RevealOnScroll>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};
