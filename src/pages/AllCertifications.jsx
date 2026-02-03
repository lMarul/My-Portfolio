import { useState, useMemo } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Search,
    X,
    Award,
    Shield,
    Calendar,
    ExternalLink,
    Cloud,
    Code,
    Smartphone,
    Database
} from "lucide-react";

// Icon helper (reused from section for consistency)
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

/**
 * AllCertifications Page
 */
export const AllCertifications = () => {
    const certifications = useQuery(api.certifications.get) || [];
    const [searchQuery, setSearchQuery] = useState("");

    const filteredCerts = useMemo(() => {
        return certifications.filter((c) => {
            return (
                searchQuery === "" ||
                c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.issuer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                c.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))
            );
        });
    }, [certifications, searchQuery]);

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-full h-96 bg-gradient-to-b from-blue-900/10 to-transparent" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center relative"
                >
                    <Link
                        to="/"
                        className="absolute left-0 top-2 md:top-0 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 hover:shadow-[0_0_15px_rgba(220,38,38,0.4)] transition-all group overflow-hidden"
                    >
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform relative z-10" />
                        <span className="font-medium relative z-10">Back</span>
                    </Link>

                    <div className="pt-12 md:pt-0">
                        <div className="inline-flex items-center gap-2 mb-4">
                            <Award className="w-5 h-5 text-red-500" />
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500 font-medium">
                                Credentials Archive
                            </span>
                            <Award className="w-5 h-5 text-red-500" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-foreground font-cinzel mb-4">
                            All <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">Certifications</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            A complete record of professional certifications, licenses, and verified skills.
                        </p>
                    </div>
                </motion.div>

                {/* Search */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10"
                >
                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search certifications by name, issuer, or skill..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl 
                            text-foreground placeholder:text-muted-foreground 
                            focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50
                            transition-all shadow-lg shadow-black/5"
                        />
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <AnimatePresence>
                        {filteredCerts.map((cert, index) => {
                            const Icon = getIcon(cert.iconType);
                            return (
                                <motion.div
                                    key={cert._id}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="bg-card border border-border/50 rounded-2xl p-6 hover:border-primary/50 transition-all hover:shadow-lg group relative overflow-hidden"
                                >
                                    {/* Glow */}
                                    <div
                                        className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/5 to-transparent rounded-bl-full -mr-10 -mt-10 transition-transform group-hover:scale-150 duration-500"
                                        style={{ background: `radial-gradient(circle at top right, ${cert.glowColor || 'rgba(255,255,255,0.1)'}, transparent)` }}
                                    />

                                    <div className="flex items-start gap-4 mb-4 relative z-10">
                                        <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br ${cert.color || "from-gray-700 to-gray-900"} shadow-lg`}>
                                            <Icon className="w-7 h-7 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg leading-tight mb-1 group-hover:text-primary transition-colors">
                                                {cert.title}
                                            </h3>
                                            <p className="text-muted-foreground text-sm font-medium">
                                                {cert.issuer}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="space-y-3 relative z-10">
                                        <div className="flex items-center justify-between text-xs text-muted-foreground bg-secondary/50 p-2 rounded-lg">
                                            <div className="flex items-center gap-1.5">
                                                <Calendar className="w-3.5 h-3.5" />
                                                <span>Issued: {cert.date}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5">
                                                <Shield className="w-3.5 h-3.5" />
                                                <span className="font-mono">{cert.credentialId}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {cert.skills?.map(skill => (
                                                <span key={skill} className="px-2 py-0.5 rounded-md bg-background border border-border text-xs text-muted-foreground">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {cert.url && (
                                        <a
                                            href={cert.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="absolute bottom-4 right-4 p-2 text-muted-foreground hover:text-primary transition-colors opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 duration-300"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    )}
                                </motion.div>
                            );
                        })}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
