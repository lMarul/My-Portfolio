import { useState, useEffect, useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { HackathonCard } from "./HackathonCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

/**
 * HackathonCarousel Component - ULTIMATE EDITION
 *
 * ACCORDION FLEX LAYOUT:
 * - Uses flexbox with flex-grow transitions for horizontal expansion
 * - Hovered card expands by increasing flex-grow, pushing neighbors
 * - No z-index overlay - pure layout-based accordion effect
 *
 * CARD STATES:
 * - Hover state: Subtle glow, slight scale
 * - Selected state: Red highlights, checkmark, strong glow
 * - Expanded state: Shows full details
 *
 * CLICK INTERACTION:
 * - Clicking a card SELECTS it (red highlights)
 * - Selected card stays highlighted until another is selected
 * - Updates the main spotlight view
 */

export const HackathonCarousel = ({
  hackathons,
  activeId,
  onSelect,
}) => {
  const [hoveredId, setHoveredId] = useState(null);
  const [focusedId, setFocusedId] = useState(null);
  const [selectedId, setSelectedId] = useState(null); // NEW: Track selected card
  const containerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  
  // Calculate visible cards per page (6-7 cards)
  const visibleCount = 6;
  const totalPages = Math.ceil(hackathons.length / visibleCount);
  
  // Get current page of hackathons
  const visibleHackathons = hackathons.slice(
    currentPage * visibleCount,
    (currentPage + 1) * visibleCount
  );

  // Navigation handlers
  const navigateLeft = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const navigateRight = useCallback(() => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  }, [totalPages]);

  // Handle card click - SELECT card (not just focus) and update spotlight
  const handleCardClick = useCallback((hackathon) => {
    setSelectedId(hackathon._id); // Set as selected
    setFocusedId(hackathon._id);
    onSelect(hackathon);
  }, [onSelect]);

  // Handle hover state
  const handleHover = useCallback((id) => {
    setHoveredId(id);
    setFocusedId(id);
  }, []);

  const handleHoverEnd = useCallback(() => {
    setHoveredId(null);
    // Don't clear focusedId here - keep selected card focused
  }, []);

  // Determine if a card should be expanded (hover ONLY - not selected)
  const isExpanded = useCallback((id) => {
    return hoveredId === id;
  }, [hoveredId]);

  // Clear selection when clicking outside (optional - you might want to keep selection)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setFocusedId(null);
        // Note: We keep selectedId to maintain selection even when clicking outside
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
      {/* Navigation Arrows */}
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

      {/* Card Container - Flexbox Accordion */}
      <div
        className="flex gap-2 px-1 py-2 pr-6 overflow-visible"
      >
        {visibleHackathons.map((hackathon, index) => {
          const expanded = isExpanded(hackathon._id);
          const isActive = hoveredId === hackathon._id;
          const isSelected = selectedId === hackathon._id;
          
          return (
            <motion.div
              key={hackathon._id}
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
                minWidth: expanded ? "300px" : "120px",
                transition: "all 0.4s ease-in-out",
              }}
            >
              <HackathonCard
                project={hackathon}
                isExpanded={expanded}
                isActive={isActive}
                isSelected={isSelected}
                onClick={() => handleCardClick(hackathon)}
                onHoverStart={() => handleHover(hackathon._id)}
                onHoverEnd={handleHoverEnd}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Page Indicators */}
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
