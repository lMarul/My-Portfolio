import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Share2,
  Calendar,
  Trophy,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * ProjectSpotlight Component
 *
 * GALLERY RESET LOGIC (CRITICAL):
 * - Internal state `activeImage` tracks which image is shown in main stage
 * - useEffect with `project?._id` dependency resets `activeImage` to `project.thumbnail`
 * - This ensures the main image always resets when switching projects
 *
 * THUMBNAIL STRIP:
 * - Horizontal row below main image with scroll navigation
 * - ChevronLeft/Right buttons to scroll through thumbnails
 * - Clicking a thumbnail updates the main stage image
 */

export const ProjectSpotlight = ({ project, className }) => {
  // CRITICAL: Internal state for gallery image
  const [activeImage, setActiveImage] = useState(null);
  const [galleryStartIndex, setGalleryStartIndex] = useState(0);

  // CRITICAL: Reset effect - resets to thumbnail when project changes
  useEffect(() => {
    if (project?.thumbnail) {
      setActiveImage(project.thumbnail);
      setGalleryStartIndex(0);
    }
  }, [project?._id, project?.thumbnail]);

  // Alarm Clock Gallery Logic
  const getVisibleGalleryWindow = () => {
    if (!project) return [];
    const allImages = [project.thumbnail, ...(project.gallery || [])];
    const totalImages = allImages.length;
    if (totalImages === 0) return [];

    const visibleCount = 5;
    const window = [];

    for (let i = 0; i < visibleCount; i++) {
      const index = (galleryStartIndex + i) % totalImages;
      window.push({
        image: allImages[index],
        originalIndex: index,
        position: i, // 0=top, 2=center, 4=bottom
      });
    }

    return window;
  };

  const handleGalleryClick = (position) => {
    const visibleWindow = getVisibleGalleryWindow();
    const totalImages = [project.thumbnail, ...(project.gallery || [])].length;
    const clickedImage = visibleWindow[position];

    // Only enable scroll/rotate if there are more than 5 images
    if (totalImages > 5) {
      if (position === 0) {
        // Clicked top-most: Rotate Down (show previous) AND set as active
        setGalleryStartIndex((prev) => (prev - 1 + totalImages) % totalImages);
        setActiveImage(clickedImage.image);
      } else if (position === 4) {
        // Clicked bottom-most: Rotate Up (show next) AND set as active
        setGalleryStartIndex((prev) => (prev + 1) % totalImages);
        setActiveImage(clickedImage.image);
      } else {
        // Clicked middle: Set as active
        setActiveImage(clickedImage.image);
      }
    } else {
      // 5 or fewer images: Just set as active, no scrolling
      setActiveImage(clickedImage.image);
    }
  };

  if (!project) {
    return (
      <div
        className={cn(
          "w-full h-[400px] bg-card/50 rounded-2xl flex items-center justify-center",
          "border border-border/50",
          className
        )}
      >
        <p className="text-muted-foreground">Select a project to view details</p>
      </div>
    );
  }

  const visibleGalleryImages = getVisibleGalleryWindow();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project._id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "w-full rounded-2xl overflow-hidden relative",
          "shadow-xl",
          className
        )}
        style={{ aspectRatio: "16/9" }}
      >
        {/* Background Image */}
        <AnimatePresence mode="wait">
          {(activeImage || project.thumbnail) && (
            <motion.div
              key={activeImage || project.thumbnail}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <img
                src={activeImage || project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                onLoad={() => console.log("Hackathon image loaded:", activeImage || project.thumbnail)}
                onError={(e) => console.error("Hackathon image failed:", activeImage || project.thumbnail, e)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Heavy Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />

        {/* Bottom Content Area - Strict Left/Right Split - TOP ALIGNED */}
        <div className="absolute bottom-0 w-full p-8 lg:p-10 pr-32">
          <div className="flex gap-12 items-start">
            {/* LEFT SECTION: Title, Organizer, Date - LEFT ALIGNED */}
            <div className="flex-shrink-0 w-[40%]">
              {/* Organizer Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-3"
              >
                <Trophy size={16} className="text-white drop-shadow-lg" />
                <span className="text-sm font-medium text-white drop-shadow-lg">
                  {project.organizer}
                </span>
              </motion.div>

              {/* H2 Title - Large and Bold - LEFT ALIGNED */}
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="text-4xl lg:text-5xl font-bold text-white mb-3 leading-tight drop-shadow-lg text-left"
              >
                {project.title}
              </motion.h2>

              {/* Date - LEFT ALIGNED */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-white/90 drop-shadow-md"
              >
                <Calendar size={14} />
                <span className="text-sm">
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </motion.div>
            </div>

            {/* RIGHT SECTION: Description, Tags, Links - RIGHT ALIGNED - TOP ALIGNED */}
            <div className="flex-1 flex flex-col items-end">
              {/* Description - RIGHT ALIGNED */}
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="text-white/90 leading-relaxed mb-4 drop-shadow-md line-clamp-3 text-right max-w-2xl"
              >
                {project.description}
              </motion.p>

              {/* Tech Stack Tags - RIGHT ALIGNED */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-2 mb-4 justify-end"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold bg-white/20 backdrop-blur-sm
                               text-white rounded-full border border-white/30 drop-shadow-md"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

              {/* Action Links - RIGHT ALIGNED */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="flex flex-wrap gap-3 justify-end"
              >
                {project.links?.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white text-black font-semibold
                               hover:bg-white/90 transition-colors flex items-center gap-2 drop-shadow-lg"
                  >
                    <Github size={16} />
                    Github
                  </a>
                )}
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold
                               border border-white/40 hover:bg-white/30 transition-colors flex items-center gap-2 drop-shadow-lg"
                  >
                    <ExternalLink size={16} />
                    Live Demo
                  </a>
                )}
                {project.links?.social && (
                  <a
                    href={project.links.social}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm text-white font-semibold
                               border border-white/40 hover:bg-white/30 transition-colors flex items-center gap-2 drop-shadow-lg"
                  >
                    <Share2 size={16} />
                    Facebook
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Alarm Clock Gallery - TOP-RIGHT CORNER (Infinite Vertical Carousel) */}
        <div className="absolute top-6 right-6 flex flex-col gap-2">
          {visibleGalleryImages.map((item, idx) => {
            const isCenter = item.position === 2;
            const isActive = activeImage === item.image;
            
            return (
              <button
                key={`${item.originalIndex}-${item.position}`}
                onClick={() => handleGalleryClick(item.position)}
                className={cn(
                  "relative w-20 h-14 rounded-lg overflow-hidden",
                  "border-2 transition-all duration-300 drop-shadow-lg",
                  "hover:scale-105 cursor-pointer",
                  isActive
                    ? "border-white shadow-lg shadow-white/40 opacity-100 scale-105"
                    : "border-white/30 opacity-70 hover:opacity-90"
                )}
                aria-label={
                  item.position === 0
                    ? "Previous image"
                    : item.position === 4
                    ? "Next image"
                    : `View image ${item.originalIndex + 1}`
                }
              >
                <img
                  src={item.image}
                  alt={`Gallery ${item.originalIndex + 1}`}
                  className="w-full h-full object-cover"
                />
                {isActive && (
                  <div className="absolute inset-0 bg-white/20 pointer-events-none" />
                )}
              </button>
            );
          })}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
