import { useState } from "react";
import experiencesData from "@/data/experiences.json";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Briefcase,
    Calendar,
    MapPin,
    Building2,
    Users,
    Code2,
    Rocket,
    Heart,
    Search,
    X
} from "lucide-react";

const typeIcons = {
    employment: Briefcase,
    internship: Rocket,
    ojt: Building2,
    "student-org": Users,
    freelance: Code2,
    volunteer: Heart,
};

const formatDateRange = (startDate, endDate, isCurrent) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr + "-01");
        return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
    };

    const start = formatDate(startDate);
    const end = isCurrent ? "Present" : endDate ? formatDate(endDate) : "Present";

    return `${start} — ${end}`;
};

const calculateDuration = (startDate, endDate, isCurrent) => {
    const start = new Date(startDate + "-01");
    const end = isCurrent || !endDate ? new Date() : new Date(endDate + "-01");

    const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    if (years === 0) return `${remainingMonths} mos`;
    if (remainingMonths === 0) return `${years} yrs`;
    return `${years} yrs ${remainingMonths} mos`;
};

/**
 * AllExperiences Page
 */
export const AllExperiences = () => {
    const experiences = experiencesData || [];
    const [searchQuery, setSearchQuery] = useState("");

    const filteredExp = experiences.filter(exp =>
        searchQuery === "" ||
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.organization.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 center w-full h-96 bg-gradient-to-b from-red-900/5 to-transparent" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
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
                            <Briefcase className="w-5 h-5 text-red-500" />
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500 font-medium">
                                Professional Timeline
                            </span>
                            <Briefcase className="w-5 h-5 text-red-500" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-foreground font-cinzel mb-4">
                            Experience <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">Archive</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            A detailed chronology of my professional journey.
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
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search roles or organizations..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-12 py-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl 
                            text-foreground placeholder:text-muted-foreground 
                            focus:outline-none focus:ring-2 focus:ring-red-500/50 focus:border-red-500/50
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

                {/* Timeline List */}
                <div className="space-y-8 relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-4 bottom-4 w-px bg-border/50" />

                    {filteredExp.map((exp, index) => {
                        const Icon = typeIcons[exp.type] || Briefcase;
                        return (
                            <motion.div
                                key={exp._id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="relative pl-20 group"
                            >
                                {/* Timeline Dot */}
                                <div className="absolute left-6 top-6 w-4 h-4 -translate-x-1/2 rounded-full border-2 border-border bg-background group-hover:border-red-500 group-hover:scale-125 transition-all z-10">
                                    {exp.isCurrent && <div className="absolute inset-0 bg-red-500 rounded-full animate-ping opacity-20" />}
                                </div>

                                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-6 hover:border-red-500/30 hover:bg-card/80 transition-all shadow-sm hover:shadow-lg">
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        {/* Logo */}
                                        <div className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0 bg-gradient-to-br from-red-500/10 to-transparent border border-red-500/20">
                                            {exp.logo ? (
                                                <img src={exp.logo} alt={exp.organization} className="w-8 h-8 object-contain brightness-0 invert" />
                                            ) : (
                                                <Icon className="w-8 h-8 text-red-500" />
                                            )}
                                        </div>

                                        <div className="flex-1 space-y-4">
                                            <div>
                                                <div className="flex flex-wrap items-center gap-3 mb-1">
                                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-red-500 transition-colors">
                                                        {exp.title}
                                                    </h3>
                                                    {exp.isCurrent && (
                                                        <span className="px-2 py-0.5 rounded text-xs font-bold bg-green-500/20 text-green-400 border border-green-500/30">
                                                            Current
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="text-lg font-medium text-muted-foreground flex items-center gap-2">
                                                    {exp.organization}
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground/80">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="w-4 h-4 text-red-500/70" />
                                                    {formatDateRange(exp.startDate, exp.endDate, exp.isCurrent)}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin className="w-4 h-4 text-red-500/70" />
                                                    {exp.location}
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <span className="font-mono text-xs px-2 py-0.5 rounded bg-secondary">
                                                        {calculateDuration(exp.startDate, exp.endDate, exp.isCurrent)}
                                                    </span>
                                                </div>
                                            </div>

                                            <p className="text-foreground/80 leading-relaxed">
                                                {exp.description}
                                            </p>

                                            {exp.responsibilities && (
                                                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground ml-2 marker:text-red-500">
                                                    {exp.responsibilities.map((r, i) => (
                                                        <li key={i}>{r}</li>
                                                    ))}
                                                </ul>
                                            )}

                                            <div className="flex flex-wrap gap-2 pt-2">
                                                {exp.technologies.map(tech => (
                                                    <span key={tech} className="px-2 py-1 rounded-md bg-secondary/50 text-xs font-medium text-secondary-foreground border border-border/50">
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
