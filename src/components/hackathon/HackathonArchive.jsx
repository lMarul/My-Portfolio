import { useState, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Search,
  X,
  Github,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Calendar,
  Building2,
  Code2,
} from "lucide-react";
import { HackathonCard } from "./HackathonCard";

/**
 * HackathonArchive Page
 *
 * Full archive of all hackathon projects
 * Features:
 * - Search by title/description
 * - Filter by tags
 * - Grid layout (cards always use variant="center")
 * - Click opens modal with full details
 */

export const HackathonArchive = () => {
  const hackathons = useQuery(api.hackathons.get) || [];
  const seedHackathons = useMutation(api.hackathons.seed);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isSeeding, setIsSeeding] = useState(false);

  // Extract all unique tags
  const allTags = useMemo(() => {
    const tags = new Set();
    hackathons.forEach((h) => h.tags?.forEach((t) => tags.add(t)));
    return Array.from(tags).sort();
  }, [hackathons]);

  // Filter hackathons based on search and tags
  const filteredHackathons = useMemo(() => {
    return hackathons.filter((h) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        h.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        h.organizer?.toLowerCase().includes(searchQuery.toLowerCase());

      // Tag filter
      const matchesTags =
        selectedTags.length === 0 ||
        selectedTags.some((tag) => h.tags?.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [hackathons, searchQuery, selectedTags]);

  // Toggle tag selection
  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery("");
    setSelectedTags([]);
  };

  // Open modal
  const openModal = (project) => {
    setSelectedProject(project);
    setGalleryIndex(0);
  };

  // Close modal
  const closeModal = () => {
    setSelectedProject(null);
    setGalleryIndex(0);
  };

  // Gallery navigation
  const navigateGallery = (direction) => {
    if (!selectedProject?.gallery) return;
    const length = selectedProject.gallery.length;
    setGalleryIndex((prev) =>
      direction === "next"
        ? (prev + 1) % length
        : (prev - 1 + length) % length
    );
  };

  // Handle seed
  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedHackathons();
    } catch (error) {
      console.error("Failed to seed:", error);
    }
    setIsSeeding(false);
  };

  return (
    <div className="min-h-screen pt-20 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
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
              <Code2 className="w-5 h-5 text-red-500" />
              <span className="text-sm uppercase tracking-[0.3em] text-red-500 font-medium">
                Innovation Lab
              </span>
              <Code2 className="w-5 h-5 text-red-500" />
            </div>

            <h1 className="text-4xl md:text-6xl font-black text-foreground font-cinzel mb-4">
              Hackathon <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-rose-400 to-red-600">Archive</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse all {hackathons.length} hackathon projects and innovative solutions.
            </p>
          </div>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-8 space-y-4"
        >
          {/* Search Bar */}
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Tag Filters */}
          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1.5 text-sm rounded-full transition-all ${selectedTags.includes(tag)
                  ? "bg-primary text-primary-foreground"
                  : "bg-card text-foreground border border-border hover:border-primary/50"
                  }`}
              >
                {tag}
              </button>
            ))}
            {(searchQuery || selectedTags.length > 0) && (
              <button
                onClick={clearFilters}
                className="px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Clear all
              </button>
            )}
          </div>
        </motion.div>

        {/* Results Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-sm text-muted-foreground mb-6"
        >
          Showing {filteredHackathons.length} of {hackathons.length} projects
        </motion.p>

        {/* Project Grid */}
        {hackathons.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
            <p className="text-muted-foreground">No hackathon projects yet.</p>
            <button
              onClick={handleSeed}
              disabled={isSeeding}
              className="px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors disabled:opacity-50"
            >
              {isSeeding ? "Seeding..." : "Load Sample Projects"}
            </button>
          </div>
        ) : filteredHackathons.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No projects match your filters.</p>
            <button
              onClick={clearFilters}
              className="mt-4 text-primary hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredHackathons.map((project, index) => (
              <motion.div
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
              >
                <HackathonCard
                  project={project}
                  variant="center"
                  onClick={() => openModal(project)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="bg-card rounded-2xl overflow-hidden max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Gallery */}
              <div className="relative aspect-video bg-muted">
                <img
                  src={selectedProject.gallery?.[galleryIndex] || selectedProject.thumbnail}
                  alt={`${selectedProject.title} screenshot ${galleryIndex + 1}`}
                  className="w-full h-full object-cover"
                />

                {/* Gallery Navigation */}
                {selectedProject.gallery?.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateGallery("prev")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => navigateGallery("next")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>

                    {/* Dots */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedProject.gallery.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setGalleryIndex(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${idx === galleryIndex
                            ? "bg-white w-4"
                            : "bg-white/50 hover:bg-white/80"
                            }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Close Button */}
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Title & Organizer */}
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">
                    {selectedProject.title}
                  </h2>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    {selectedProject.organizer && (
                      <span className="flex items-center gap-1">
                        <Building2 className="w-4 h-4" />
                        {selectedProject.organizer}
                      </span>
                    )}
                    {selectedProject.date && (
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {selectedProject.date}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                <p className="text-foreground/80 leading-relaxed">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                {selectedProject.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {selectedProject.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Links */}
                <div className="flex gap-4 pt-4 border-t border-border">
                  {selectedProject.links?.github && (
                    <a
                      href={selectedProject.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-foreground text-background rounded-lg hover:opacity-90 transition-opacity"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-sm font-medium">View Code</span>
                    </a>
                  )}
                  {selectedProject.links?.demo && (
                    <a
                      href={selectedProject.links.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Live Demo</span>
                    </a>
                  )}
                  {selectedProject.links?.devpost && (
                    <a
                      href={selectedProject.links.devpost}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Devpost</span>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
