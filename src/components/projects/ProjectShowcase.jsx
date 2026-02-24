import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Github,
  ExternalLink,
  Calendar,
  FolderGit2,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";

export const ProjectShowcase = ({ project, className }) => {
  useEffect(() => {
    if (project) {
      console.log("ProjectShowcase - Rendering project:", project.title, "Thumbnail:", project.thumbnail);
    }
  }, [project]);

  if (!project) {
    return (
      <div
        className={cn(
          "w-full h-[400px] bg-gradient-to-br from-red-900/10 to-black/20 rounded-2xl flex items-center justify-center",
          "border border-red-500/20",
          className
        )}
      >
        <div className="text-center">
          <Sparkles className="w-8 h-8 text-red-500/50 mx-auto mb-2 animate-pulse" />
          <p className="text-muted-foreground">Select a project to view details</p>
        </div>
      </div>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={project._id}
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "w-full rounded-2xl overflow-hidden relative group",
          "shadow-2xl shadow-black/50",
          "border border-white/10",
          className
        )}
        style={{ aspectRatio: "16/9" }}
      >
        {/* Background Image with parallax-like effect */}
        <AnimatePresence mode="wait">
          {project.thumbnail && (
            <motion.div
              key={project.thumbnail}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0"
            >
              <img
                src={project.thumbnail}
                alt={project.title}
                className="w-full h-full object-cover"
                onLoad={() => console.log("Image loaded successfully:", project.thumbnail)}
                onError={(e) => console.error("Image failed to load:", project.thumbnail, e)}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Animated gradient overlay */}
        <div 
          className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent"
        />
        
        {/* Red accent glow */}
        <div 
          className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-30 group-hover:opacity-50 transition-opacity duration-500"
          style={{
            background: "radial-gradient(circle at bottom left, rgba(220, 38, 38, 0.4) 0%, transparent 70%)",
          }}
        />

        {/* Content */}
        <div className="absolute bottom-0 w-full p-4 sm:p-5 lg:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-8 items-start">
            {/* Left Section */}
            <div className="flex-shrink-0 w-full sm:w-[40%]">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="flex items-center gap-2 mb-3"
              >
                <div className="p-1.5 rounded-full bg-red-500/20 border border-red-500/30">
                  <FolderGit2 size={14} className="text-red-400" />
                </div>
                <span className="text-sm font-medium text-red-300">
                  {project.category}
                </span>
              </motion.div>

              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl lg:text-3xl font-black text-white mb-2 leading-tight drop-shadow-lg text-left"
              >
                {project.title}
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center gap-2 text-white/80"
              >
                <Calendar size={14} className="text-red-400" />
                <span className="text-sm">
                  {new Date(project.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </motion.div>
            </div>

            {/* Right Section */}
            <div className="hidden sm:flex flex-1 flex-col items-end">
              <motion.p
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.25 }}
                className="text-white/90 leading-relaxed mb-3 drop-shadow-md line-clamp-2 text-right max-w-2xl text-sm"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="flex flex-wrap gap-1.5 mb-3 justify-end"
              >
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 text-xs font-semibold bg-red-500/20 backdrop-blur-sm
                               text-white rounded-full border border-red-500/30 
                               hover:border-red-400/60 hover:bg-red-500/30 transition-all"
                  >
                    {tag}
                  </span>
                ))}
              </motion.div>

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
                    className="px-4 py-2 rounded-full bg-white text-black font-bold
                               hover:bg-red-50 hover:shadow-[0_0_20px_rgba(220,38,38,0.3)]
                               transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <Github size={16} />
                    Code
                  </a>
                )}
                {project.links?.demo && (
                  <a
                    href={project.links.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm text-white font-bold
                               border border-red-500/40 hover:bg-red-500/40 hover:border-red-400
                               hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]
                               transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                )}
                {project.links?.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-full bg-red-500/20 backdrop-blur-sm text-white font-bold
                               border border-red-500/40 hover:bg-red-500/40 hover:border-red-400
                               hover:shadow-[0_0_20px_rgba(220,38,38,0.4)]
                               transition-all duration-300 flex items-center gap-2 text-sm"
                  >
                    <ExternalLink size={16} />
                    Visit
                  </a>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
