import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { ProjectCard } from "./ProjectCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * ProjectCarousel Component - ULTIMATE EDITION
 * Matches HackathonCarousel with distinct hover vs selected states
 */

export const ProjectCarousel = ({
  projects,
  activeId,
  onSelect,
}) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [selectedId, setSelectedId] = useState(null); // NEW: Track selected card
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  const visibleCount = 6;
  const totalPages = Math.ceil(projects.length / visibleCount);
  
  const visibleProjects = projects.slice(
    currentPage * visibleCount,
    (currentPage + 1) * visibleCount
  );

  const navigateLeft = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const navigateRight = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  // Handle card click - SELECT card and update showcase
  const handleCardClick = useCallback((project) => {
    setSelectedId(project._id);
    setFocusedId(project._id);
    onSelect(project);
  }, [onSelect]);

  const handleHover = useCallback((id) => {
    setHoveredId(id);
    setFocusedId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredId(null);
  }, []);

  // Expand on hover ONLY (selected cards show mini version with red highlight)
  const isExpanded = useCallback((id) => {
    return hoveredId === id;
  }, [hoveredId]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocusedId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sync selectedId with activeId from parent
  useEffect(() => {
    if (activeId && activeId !== selectedId) {
      setSelectedId(activeId);
    }
  }, [activeId]);

  return (
    <div className="relative" ref={containerRef}>
      {currentPage > 0 && (
        <button
          onClick={navigateLeft}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-20 
                     w-10 h-10 rounded-full bg-black/80 border border-red-500/30
                     flex items-center justify-center text-white
                     hover:bg-red-500/20 hover:border-red-500 transition-all
                     shadow-lg shadow-red-500/20 -ml-5"
          aria-label="Previous projects"
        >
          <ChevronLeft size={20} />
        </button>
      )}
      
      {currentPage < totalPages - 1 && (
        <button
          onClick={navigateRight}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-20 
                     w-10 h-10 rounded-full bg-black/80 border border-red-500/30
                     flex items-center justify-center text-white
                     hover:bg-red-500/20 hover:border-red-500 transition-all
                     shadow-lg shadow-red-500/20 -mr-5"
          aria-label="Next projects"
        >
          <ChevronRight size={20} />
        </button>
      )}

      <div
        className="flex gap-3 px-2 py-4 overflow-hidden"
      >
        {visibleProjects.map((project, index) => {
          const expanded = isExpanded(project._id);
          const isActive = hoveredId === project._id;
          const isSelected = selectedId === project._id;
          
          return (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 30,
                delay: index * 0.03 
              }}
              style={{
                flex: expanded ? "3 0 0%" : "1 0 0%",
                minWidth: expanded ? "420px" : "180px",
                transition: "all 0.4s ease-in-out",
              }}
            >
              <ProjectCard
                project={project}
                isExpanded={expanded}
                isActive={isActive}
                isSelected={isSelected}
                onClick={() => handleCardClick(project)}
                onHoverStart={() => handleHover(project._id)}
                onHoverEnd={handleHoverEnd}
              />
            </motion.div>
          );
        })}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          {Array.from({ length: totalPages }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentPage(index)}
              aria-label={`Go to page ${index + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                index === currentPage
                  ? "bg-red-500 w-8"
                  : "bg-white/20 w-2 hover:bg-red-500/50"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};
