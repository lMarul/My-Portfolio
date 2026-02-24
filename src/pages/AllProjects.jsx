import { useState, useMemo } from "react";
import projectsData from "@/data/projects.json";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
    ArrowLeft,
    Search,
    X,
    Github,
    ExternalLink,
    FolderGit2,
    Code2,
} from "lucide-react";

/**
 * AllProjects Page
 * 
 * Full archive of all projects
 */
export const AllProjects = () => {
    const projects = projectsData || [];
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState([]);

    // Extract all unique tags
    const allTags = useMemo(() => {
        const tags = new Set();
        projects.forEach((p) => p.tags?.forEach((t) => tags.add(t)));
        return Array.from(tags).sort();
    }, [projects]);

    // Filter projects
    const filteredProjects = useMemo(() => {
        return projects.filter((p) => {
            const matchesSearch =
                searchQuery === "" ||
                p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                p.description?.toLowerCase().includes(searchQuery.toLowerCase());

            const matchesTags =
                selectedTags.length === 0 ||
                selectedTags.some((tag) => p.tags?.includes(tag));

            return matchesSearch && matchesTags;
        });
    }, [projects, searchQuery, selectedTags]);

    const toggleTag = (tag) => {
        setSelectedTags((prev) =>
            prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
        );
    };

    const clearFilters = () => {
        setSearchQuery("");
        setSelectedTags([]);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4 relative overflow-hidden">
            {/* Background Gradients */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-red-900/10 to-transparent" />
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
                            <FolderGit2 className="w-5 h-5 text-red-500" />
                            <span className="text-sm uppercase tracking-[0.3em] text-red-500 font-medium">
                                Full Portfolio
                            </span>
                            <FolderGit2 className="w-5 h-5 text-red-500" />
                        </div>

                        <h1 className="text-4xl md:text-6xl font-black text-foreground font-cinzel mb-4">
                            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">Archive</span>
                        </h1>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            A comprehensive collection of my development work, side projects, and experiments.
                            Currently showing {filteredProjects.length} projects.
                        </p>
                    </div>
                </motion.div>

                {/* Search & Filters */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="mb-10 space-y-6"
                >
                    {/* Search Bar */}
                    <div className="relative max-w-xl">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                        <input
                            type="text"
                            placeholder="Search by title, tech stack, or description..."
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

                    {/* Tag Filters */}
                    <div className="flex flex-wrap gap-2">
                        <span className="flex items-center gap-2 text-sm font-medium text-muted-foreground mr-2 py-1.5">
                            <Code2 className="w-4 h-4" /> Filter by:
                        </span>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => toggleTag(tag)}
                                className={`px-3 py-1.5 text-sm rounded-full transition-all border ${selectedTags.includes(tag)
                                    ? "bg-red-600 text-white border-red-600 shadow-md shadow-red-600/20"
                                    : "bg-card/50 text-muted-foreground border-border hover:border-red-500/50 hover:text-foreground"
                                    }`}
                            >
                                {tag}
                            </button>
                        ))}
                        {(searchQuery || selectedTags.length > 0) && (
                            <button
                                onClick={clearFilters}
                                className="px-3 py-1.5 text-sm text-red-400 hover:text-red-300 transition-colors ml-2"
                            >
                                Clear Filters
                            </button>
                        )}
                    </div>
                </motion.div>

                {/* Grid */}
                {filteredProjects.length === 0 ? (
                    <div className="text-center py-20 bg-card/30 rounded-3xl border border-dashed border-border">
                        <p className="text-muted-foreground text-lg">No projects match your search.</p>
                        <button
                            onClick={clearFilters}
                            className="mt-4 text-red-500 hover:underline"
                        >
                            Reset Filters
                        </button>
                    </div>
                ) : (
                    <motion.div
                        layout
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        <AnimatePresence>
                            {filteredProjects.map((project, index) => (
                                <motion.div
                                    key={project._id}
                                    layout
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: index * 0.05 }}
                                >
                                    {/* Reuse ProjectCard but maybe simplify or wrap it */}
                                    {/* Note: ProjectCard might need to be checked if it fits grid well. 
                      Assuming it's a card component. If not we might need a simpler Card. 
                      Let's assume ProjectCard is usable or we adapt. 
                      Actually, ProjectShowcase and Carousel were used in the section. 
                      I might need to create a simple archive card or reuse one if appropriate. 
                      Let's check ProjectCard usage in ProjectCarousel.
                  */}
                                    <div className="h-full bg-card rounded-xl overflow-hidden border border-border/50 hover:border-red-500/50 transition-all group hover:shadow-[0_0_30px_rgba(220,38,38,0.15)] flex flex-col">
                                        <div className="relative aspect-video overflow-hidden">
                                            <img
                                                src={project.thumbnail}
                                                alt={project.title}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                                            <div className="absolute bottom-4 left-4 right-4 translate-y-2 group-hover:translate-y-0 transition-transform">
                                                <span className="text-xs font-bold text-red-400 uppercase tracking-wider mb-1 block">
                                                    {project.category}
                                                </span>
                                                <h3 className="text-xl font-bold text-white group-hover:text-red-500 transition-colors">
                                                    {project.title}
                                                </h3>
                                            </div>
                                        </div>

                                        <div className="p-5 flex-1 flex flex-col">
                                            <p className="text-muted-foreground text-sm line-clamp-3 mb-4 flex-1">
                                                {project.description}
                                            </p>

                                            <div className="flex flex-wrap gap-2 mb-4">
                                                {project.tags?.slice(0, 3).map(tag => (
                                                    <span key={tag} className="text-xs px-2 py-1 bg-secondary rounded text-secondary-foreground">
                                                        {tag}
                                                    </span>
                                                ))}
                                                {project.tags?.length > 3 && (
                                                    <span className="text-xs px-2 py-1 bg-secondary/50 rounded text-muted-foreground">
                                                        +{project.tags.length - 3}
                                                    </span>
                                                )}
                                            </div>

                                            <div className="flex gap-3 pt-4 border-t border-border/50 mt-auto">
                                                {project.links?.github && (
                                                    <a href={project.links.github} target="_blank" className="text-muted-foreground hover:text-white transition-colors">
                                                        <Github className="w-5 h-5" />
                                                    </a>
                                                )}
                                                {project.links?.demo && (
                                                    <a href={project.links.demo} target="_blank" className="text-muted-foreground hover:text-red-500 transition-colors ml-auto flex items-center gap-1 text-sm font-medium">
                                                        Live Demo <ExternalLink className="w-4 h-4" />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>
        </div>
    );
};
