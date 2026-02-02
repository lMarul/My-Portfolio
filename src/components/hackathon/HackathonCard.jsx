import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * HackathonCard Component - ULTIMATE EDITION
 *
 * Features:
 * - Stunning glass morphism effect
 * - Animated gradient borders
 * - DISTINCT hover vs selected states
 * - Red highlight when selected (clean, no icons)
 */

export const HackathonCard = ({
  project,
  isExpanded = false,
  isActive = false, // Hover state
  isSelected = false, // NEW: Click/selected state
  onClick,
  onHoverStart,
  onHoverEnd,
  className,
}) => {
  return (
    <motion.div
      onClick={onClick}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      initial={false}
      animate={{
        scale: isSelected ? 1.03 : isActive && !isExpanded ? 1.01 : 1,
        y: isSelected ? -8 : 0,
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 25,
      }}
      className={cn(
        "relative cursor-pointer rounded-2xl overflow-hidden group",
        "h-[280px]",
        "transition-all duration-500",
        // Hover state - subtle glow
        !isSelected && "hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]",
        // Selected state - INTENSE red glow + ring
        isSelected && [
          "ring-2 ring-red-500",
          "shadow-[0_0_50px_rgba(220,38,38,0.5),0_0_100px_rgba(220,38,38,0.3)]",
        ],
        className
      )}
      style={{
        backgroundImage: `url(${project.thumbnail})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Fallback gradient if image fails */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900/30 to-black -z-10" />

      {/* Animated gradient border - shows on hover OR selected */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl transition-opacity duration-300",
          isSelected ? "opacity-100" : "opacity-0 group-hover:opacity-60",
        )}
        style={{
          background: isSelected 
            ? "linear-gradient(135deg, rgba(220, 38, 38, 0.8), rgba(255, 100, 100, 0.4), rgba(220, 38, 38, 0.8))"
            : "linear-gradient(135deg, rgba(220, 38, 38, 0.5), transparent, rgba(220, 38, 38, 0.5))",
          padding: isSelected ? "3px" : "2px",
          WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Pulsing red overlay when selected */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isSelected ? 1 : 0 }}
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at center, rgba(220, 38, 38, 0.15) 0%, transparent 70%)",
          animation: isSelected ? "selected-pulse 2s ease-in-out infinite" : "none",
        }}
      />

      {/* Corner accent lines when selected */}
      {isSelected && (
        <>
          <div className="absolute top-0 left-0 w-12 h-[3px] bg-gradient-to-r from-red-500 to-transparent" />
          <div className="absolute top-0 left-0 w-[3px] h-12 bg-gradient-to-b from-red-500 to-transparent" />
          <div className="absolute bottom-0 right-0 w-12 h-[3px] bg-gradient-to-l from-red-500 to-transparent" />
          <div className="absolute bottom-0 right-0 w-[3px] h-12 bg-gradient-to-t from-red-500 to-transparent" />
        </>
      )}

      {/* Gradient Overlay - More dramatic */}
      <div 
        className={cn(
          "absolute inset-0 transition-all duration-500",
          isExpanded 
            ? "bg-gradient-to-t from-black via-black/80 to-black/40" 
            : isSelected
              ? "bg-gradient-to-t from-black/90 via-black/40 to-transparent"
              : "bg-gradient-to-t from-black/95 via-black/50 to-transparent group-hover:via-black/60"
        )} 
      />

      {/* Default State Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        initial={false}
        animate={{ 
          opacity: isExpanded ? 0 : 1,
          y: isExpanded ? 10 : 0,
        }}
        transition={{ duration: 0.25 }}
      >
        <h3 className={cn(
          "text-xl font-bold line-clamp-2 drop-shadow-lg text-center transition-colors",
          isSelected ? "text-red-100" : "text-white group-hover:text-red-50"
        )}>
          {project.title}
        </h3>
        <p className={cn(
          "text-sm font-medium drop-shadow-md text-center mt-2 transition-colors",
          isSelected ? "text-red-300" : "text-gray-300 group-hover:text-white/90"
        )}>
          {project.organizer}
        </p>
        
      </motion.div>

      {/* Expanded State Content */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-6"
        initial={false}
        animate={{ 
          opacity: isExpanded ? 1 : 0,
          y: isExpanded ? 0 : 10,
        }}
        transition={{ duration: 0.25, delay: isExpanded ? 0.1 : 0 }}
        style={{ pointerEvents: isExpanded ? "auto" : "none" }}
      >
        <div className="flex gap-4">
          {/* Left Column */}
          <div className="flex-shrink-0 w-[40%] flex flex-col justify-end">
            <h3 className="text-2xl font-bold text-white leading-tight line-clamp-2 drop-shadow-lg">
              {project.title}
            </h3>
            <p className="text-sm text-red-200 mt-2 font-medium drop-shadow-md">
              {project.organizer}
            </p>
            <p className="text-xs text-gray-300 mt-1 drop-shadow">
              {new Date(project.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
              })}
            </p>
          </div>

          {/* Right Column */}
          <div className="flex-1 flex flex-col justify-end">
            <p className="text-xs text-gray-200 leading-relaxed line-clamp-4 mb-3 drop-shadow">
              {project.description}
            </p>

            {/* Links */}
            <div className="flex justify-end gap-3">
              {project.links?.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 text-xs text-white bg-white/10 hover:bg-red-500/30
                             rounded-full backdrop-blur-sm border border-white/20 hover:border-red-400/50
                             transition-all flex items-center gap-1.5 drop-shadow"
                >
                  <Github size={12} />
                  Code
                </a>
              )}
              {project.links?.social && (
                <a
                  href={project.links.social}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 text-xs text-white bg-white/10 hover:bg-red-500/30
                             rounded-full backdrop-blur-sm border border-white/20 hover:border-red-400/50
                             transition-all flex items-center gap-1.5 drop-shadow"
                >
                  <ExternalLink size={12} />
                  Social
                </a>
              )}
              {project.links?.demo && !project.links?.social && (
                <a
                  href={project.links.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="px-3 py-1.5 text-xs text-white bg-white/10 hover:bg-red-500/30
                             rounded-full backdrop-blur-sm border border-white/20 hover:border-red-400/50
                             transition-all flex items-center gap-1.5 drop-shadow"
                >
                  <ExternalLink size={12} />
                  Demo
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Inline keyframes for selected pulse animation */}
      <style>{`
        @keyframes selected-pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
      `}</style>
    </motion.div>
  );
};
