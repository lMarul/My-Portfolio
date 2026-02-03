import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Award, ExternalLink, Calendar, Cloud, Code, Smartphone, Shield, Database, Sparkles, ChevronRight } from "lucide-react";
import { Anime3DCard, RevealOnScroll, MorphingShape } from "./AnimeComponents";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

// Icon mapping helper
const getIcon = (type) => {
    const map = {
        cloud: Cloud,
        code: Code,
        smartphone: Smartphone,
        database: Database,
        shield: Shield,
        default: Award
    };
    return map[type] || map.default;
};

export const CertificationsSection = () => {
    const certifications = useQuery(api.certifications.get) || [];
    const seedCertifications = useMutation(api.certifications.seed);
    const [isSeeding, setIsSeeding] = useState(false);

    const handleSeed = async () => {
        setIsSeeding(true);
        try {
            await seedCertifications();
        } catch (error) {
            console.error("Failed to seed certifications:", error);
        }
        setIsSeeding(false);
    };

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

                    <h2 className="text-4xl md:text-6xl font-black mb-6 font-cinzel">
                        Certified <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-purple-500 to-blue-600">Expertise</span>
                    </h2>

                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                        Verified technical proficiency and professional milestones in modern software engineering.
                    </p>
                </RevealOnScroll>

                {/* Empty State / Seed Button */}
                {certifications.length === 0 && (
                    <div className="text-center mb-12">
                        <button
                            onClick={handleSeed}
                            disabled={isSeeding}
                            className="group px-8 py-4 rounded-full bg-gradient-to-r from-red-600 to-red-500 
                                       text-white font-bold text-lg shadow-[0_0_30px_rgba(220,38,38,0.4)]
                                       hover:shadow-[0_0_50px_rgba(220,38,38,0.6)] hover:scale-105
                                       transition-all duration-300 disabled:opacity-50"
                        >
                            {isSeeding ? (
                                <span className="flex items-center gap-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/20 border-t-white" />
                                    Loading...
                                </span>
                            ) : (
                                <span className="flex items-center gap-2">
                                    <Sparkles className="w-5 h-5" />
                                    Load Certifications
                                </span>
                            )}
                        </button>
                    </div>
                )}

                {/* Certifications Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                    {certifications.slice(0, 4).map((cert, index) => {
                        const Icon = getIcon(cert.iconType);
                        return (
                            <RevealOnScroll key={cert._id} delay={index * 150} direction={index % 2 === 0 ? "left" : "right"}>
                                <Anime3DCard
                                    intensity={10}
                                    glowColor={cert.glowColor}
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
                                            {cert.url && (
                                                <a
                                                    href={cert.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="absolute top-8 right-8 p-3 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </Anime3DCard>
                            </RevealOnScroll>
                        );
                    })}
                </div>

                {/* See All Button */}
                <div className="text-center mt-16">
                    <Link
                        to="/certifications"
                        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full
                                   bg-gradient-to-r from-primary/10 to-transparent
                                   border border-primary/30 hover:border-primary/60
                                   text-primary font-medium
                                   hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]
                                   transition-all duration-300"
                    >
                        <span>View All Certifications</span>
                        <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
};
