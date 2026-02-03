import { useState, useEffect, useRef, useMemo } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Briefcase,
  GraduationCap,
  Building2,
  Rocket,
  Heart,
  Code2,
  Calendar,
  MapPin,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Award,
  CheckCircle2,
  Users,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { RevealOnScroll } from "./AnimeComponents";

gsap.registerPlugin(ScrollTrigger);

// Check if experiences API is available
const hasExperiencesApi = api?.experiences?.get && api?.experiences?.seed;

// Type icons mapping
const typeIcons = {
  employment: Briefcase,
  internship: Rocket,
  ojt: Building2,
  "student-org": Users,
  freelance: Code2,
  volunteer: Heart,
};

// Type labels mapping
const typeLabels = {
  employment: "Employment",
  internship: "Internship",
  ojt: "On-the-Job Training",
  "student-org": "Student Organization",
  freelance: "Freelance",
  volunteer: "Volunteer",
};

// Format date range
const formatDateRange = (startDate, endDate, isCurrent) => {
  const formatDate = (dateStr) => {
    const date = new Date(dateStr + "-01");
    return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  };

  const start = formatDate(startDate);
  const end = isCurrent ? "Present" : endDate ? formatDate(endDate) : "Present";

  return `${start} — ${end}`;
};

// Calculate duration
const calculateDuration = (startDate, endDate, isCurrent) => {
  const start = new Date(startDate + "-01");
  const end = isCurrent || !endDate ? new Date() : new Date(endDate + "-01");

  const months = (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
  const years = Math.floor(months / 12);
  const remainingMonths = months % 12;

  if (years === 0) return `${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`;
  if (remainingMonths === 0) return `${years} yr${years !== 1 ? "s" : ""}`;
  return `${years} yr${years !== 1 ? "s" : ""} ${remainingMonths} mo${remainingMonths !== 1 ? "s" : ""}`;
};

/**
 * ExperienceCard - Individual experience card with 3D effects
 */
const ExperienceCard = ({ experience, index, isActive, onClick }) => {
  const cardRef = useRef(null);
  const Icon = typeIcons[experience.type] || Briefcase;

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        "experience-card relative cursor-pointer group",
        "transition-all duration-500 ease-out",
        isActive ? "scale-100" : "scale-95 opacity-80 hover:opacity-100"
      )}
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* Glow Effect */}
      <div
        className={cn(
          "absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm",
          isActive && "opacity-100"
        )}
        style={{
          background: `linear-gradient(135deg, ${experience.color || "#dc2626"}40, transparent 50%, ${experience.color || "#dc2626"}20)`,
        }}
      />

      {/* Card Content */}
      <div
        className={cn(
          "relative rounded-2xl p-6 backdrop-blur-xl border transition-all duration-300",
          "bg-gradient-to-br from-card/90 to-card/70",
          isActive
            ? "border-primary/50 shadow-[0_0_40px_rgba(220,38,38,0.2)]"
            : "border-border/50 hover:border-primary/30"
        )}
        style={{
          boxShadow: isActive
            ? `0 20px 60px -20px ${experience.color || "#dc2626"}40`
            : undefined,
        }}
      >
        {/* Timeline connector dot */}
        <div
          className={cn(
            "absolute top-8 -left-[42px] w-4 h-4 rounded-full border-2 transition-all duration-300",
            isActive
              ? "bg-primary border-primary scale-125 shadow-[0_0_20px_rgba(220,38,38,0.5)]"
              : "bg-background border-border group-hover:border-primary/50"
          )}
        >
          {isActive && (
            <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-50" />
          )}
        </div>

        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          {/* Logo/Icon */}
          <div
            className={cn(
              "w-14 h-14 rounded-xl flex items-center justify-center shrink-0",
              "bg-gradient-to-br from-primary/20 to-primary/5",
              "border border-primary/20 group-hover:border-primary/40 transition-all duration-300"
            )}
            style={{
              boxShadow: isActive
                ? `0 0 30px ${experience.color || "#dc2626"}30`
                : undefined,
            }}
          >
            {experience.logo ? (
              <img
                src={experience.logo}
                alt={experience.organization}
                className="w-8 h-8 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            ) : (
              <Icon
                className="w-6 h-6"
                style={{ color: experience.color || "#dc2626" }}
              />
            )}
          </div>

          {/* Title & Organization */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className="px-2 py-0.5 rounded-full text-xs font-medium"
                style={{
                  backgroundColor: `${experience.color || "#dc2626"}20`,
                  color: experience.color || "#dc2626",
                }}
              >
                {typeLabels[experience.type]}
              </span>
              {experience.isCurrent && (
                <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Current
                </span>
              )}
            </div>
            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors truncate">
              {experience.title}
            </h3>
            <p className="text-muted-foreground font-medium">
              {experience.organization}
            </p>
          </div>

          {/* Expand indicator */}
          <ChevronRight
            className={cn(
              "w-5 h-5 text-muted-foreground transition-all duration-300",
              isActive ? "rotate-90 text-primary" : "group-hover:translate-x-1"
            )}
          />
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-4">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4" />
            <span>{formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>{experience.location}</span>
          </div>
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {calculateDuration(experience.startDate, experience.endDate, experience.isCurrent)}
          </div>
        </div>

        {/* Description preview */}
        <p className="text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {experience.description}
        </p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {experience.technologies.slice(0, 5).map((tech, i) => (
            <span
              key={i}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-secondary/80 text-secondary-foreground border border-border/50"
            >
              {tech}
            </span>
          ))}
          {experience.technologies.length > 5 && (
            <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-primary/10 text-primary">
              +{experience.technologies.length - 5} more
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ExperienceDetails - Expanded view of selected experience
 */
const ExperienceDetails = ({ experience }) => {
  if (!experience) return null;

  const Icon = typeIcons[experience.type] || Briefcase;

  return (
    <motion.div
      key={experience._id}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="relative"
    >
      {/* Decorative background glow */}
      <div
        className="absolute -inset-4 rounded-3xl opacity-20 blur-3xl"
        style={{ backgroundColor: experience.color || "#dc2626" }}
      />

      {/* Content card */}
      <div className="relative rounded-2xl p-8 bg-gradient-to-br from-card/95 to-card/80 backdrop-blur-xl border border-primary/20 shadow-[0_0_60px_rgba(220,38,38,0.15)]">
        {/* Header */}
        <div className="flex items-start gap-6 mb-8 pb-6 border-b border-border/50">
          {/* Large logo */}
          <div
            className="w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30"
            style={{
              boxShadow: `0 0 40px ${experience.color || "#dc2626"}30`,
            }}
          >
            {experience.logo ? (
              <img
                src={experience.logo}
                alt={experience.organization}
                className="w-12 h-12 object-contain"
                style={{ filter: "brightness(0) invert(1)" }}
              />
            ) : (
              <Icon
                className="w-10 h-10"
                style={{ color: experience.color || "#dc2626" }}
              />
            )}
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span
                className="px-3 py-1 rounded-full text-sm font-semibold"
                style={{
                  backgroundColor: `${experience.color || "#dc2626"}25`,
                  color: experience.color || "#dc2626",
                }}
              >
                {typeLabels[experience.type]}
              </span>
              {experience.isCurrent && (
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-green-500/20 text-green-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  Currently Active
                </span>
              )}
            </div>
            <h3 className="text-3xl font-bold text-foreground mb-1">
              {experience.title}
            </h3>
            <p className="text-xl text-primary font-semibold">
              {experience.organization}
            </p>
          </div>
        </div>

        {/* Meta info */}
        <div className="flex flex-wrap gap-6 mb-8">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="w-5 h-5 text-primary" />
            <span className="font-medium">
              {formatDateRange(experience.startDate, experience.endDate, experience.isCurrent)}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
              {calculateDuration(experience.startDate, experience.endDate, experience.isCurrent)}
            </span>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MapPin className="w-5 h-5 text-primary" />
            <span className="font-medium">{experience.location}</span>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {experience.description}
          </p>
        </div>

        {/* Responsibilities */}
        {experience.responsibilities?.length > 0 && (
          <div className="mb-8">
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Briefcase className="w-5 h-5 text-primary" />
              Key Responsibilities
            </h4>
            <ul className="space-y-3">
              {experience.responsibilities.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-3 text-muted-foreground"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Achievements */}
        {experience.achievements?.length > 0 && (
          <div className="mb-8">
            <h4 className="flex items-center gap-2 text-lg font-semibold mb-4">
              <Award className="w-5 h-5 text-yellow-500" />
              Key Achievements
            </h4>
            <ul className="space-y-3">
              {experience.achievements.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 + 0.3 }}
                  className="flex items-start gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center shrink-0 mt-0.5">
                    <Zap className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-muted-foreground">{item}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Technologies */}
        <div>
          <h4 className="flex items-center gap-2 text-lg font-semibold mb-4">
            <Code2 className="w-5 h-5 text-primary" />
            Technologies & Skills
          </h4>
          <div className="flex flex-wrap gap-2">
            {experience.technologies.map((tech, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 + 0.5 }}
                className="px-4 py-2 rounded-xl text-sm font-medium bg-gradient-to-br from-secondary to-secondary/50 text-secondary-foreground border border-border/50 hover:border-primary/50 hover:bg-primary/10 transition-all cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/**
 * ExperienceSection - Epic Work Experience Timeline
 */
export const ExperienceSection = () => {
  // If the experiences API isn't available yet (Convex not regenerated), show placeholder
  if (!hasExperiencesApi) {
    return (
      <section id="experience" className="py-32 px-4 relative overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
              Journey So Far
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Run <code className="px-2 py-1 bg-secondary rounded text-sm">npx convex dev</code> to load experiences
          </p>
        </div>
      </section>
    );
  }

  return <ExperienceSectionContent />;
};

const ExperienceSectionContent = () => {
  const experiences = useQuery(api.experiences.get) || [];
  const seedExperiences = useMutation(api.experiences.seed);
  const [activeExperience, setActiveExperience] = useState(null);
  const [isSeeding, setIsSeeding] = useState(false);

  const sectionRef = useRef(null);
  const timelineRef = useRef(null);
  const particlesRef = useRef(null);

  // Set initial active experience
  useEffect(() => {
    if (experiences.length > 0 && !activeExperience) {
      setActiveExperience(experiences[0]);
    }
  }, [experiences, activeExperience]);

  // GSAP Timeline animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Animate timeline line
      if (timelineRef.current) {
        gsap.fromTo(
          timelineRef.current,
          { scaleY: 0 },
          {
            scaleY: 1,
            duration: 1.5,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 60%",
              toggleActions: "play none none reverse",
            },
          }
        );
      }

      // Create floating particles
      if (particlesRef.current) {
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div");
          particle.className = "exp-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 6 + 2}px;
            height: ${Math.random() * 6 + 2}px;
            background: rgba(220, 38, 38, ${Math.random() * 0.4 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            box-shadow: 0 0 ${Math.random() * 15 + 5}px rgba(220, 38, 38, 0.4);
          `;
          particlesRef.current.appendChild(particle);

          gsap.to(particle, {
            x: `random(-80, 80)`,
            y: `random(-80, 80)`,
            opacity: `random(0.2, 0.8)`,
            scale: `random(0.5, 1.5)`,
            duration: `random(4, 10)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [experiences.length]);

  // Handle seeding
  const handleSeed = async () => {
    setIsSeeding(true);
    try {
      await seedExperiences();
    } catch (error) {
      console.error("Error seeding experiences:", error);
    }
    setIsSeeding(false);
  };

  // Calculate total experience
  const totalYears = useMemo(() => {
    if (experiences.length === 0) return 0;
    let totalMonths = 0;
    experiences.forEach((exp) => {
      const start = new Date(exp.startDate + "-01");
      const end = exp.isCurrent || !exp.endDate ? new Date() : new Date(exp.endDate + "-01");
      totalMonths += (end.getFullYear() - start.getFullYear()) * 12 + (end.getMonth() - start.getMonth());
    });
    return Math.floor(totalMonths / 12);
  }, [experiences]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-32 px-4 relative overflow-hidden"
    >
      {/* Floating particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none" />

      {/* Background decorations */}
      <div className="absolute top-40 -left-60 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 -right-60 w-96 h-96 bg-red-500/5 rounded-full blur-3xl" />

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Section Header */}
        <RevealOnScroll className="text-center mb-16">
          <div className="inline-flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="text-sm uppercase tracking-[0.3em] text-primary font-medium">
              Journey So Far
            </span>
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-4xl md:text-6xl font-black mb-6 font-cinzel">
            Work{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-rose-400">
              Experience
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A timeline of roles, responsibilities, and growth across various organizations
          </p>

          {/* Stats */}
          <div className="flex justify-center gap-8 mt-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{experiences.length}</div>
              <div className="text-sm text-muted-foreground">Positions</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">{totalYears}+</div>
              <div className="text-sm text-muted-foreground">Years Experience</div>
            </div>
            <div className="w-px bg-border" />
            <div className="text-center">
              <div className="text-4xl font-bold text-primary">
                {experiences.filter((e) => e.isCurrent).length}
              </div>
              <div className="text-sm text-muted-foreground">Current Roles</div>
            </div>
          </div>
        </RevealOnScroll>

        {/* Empty state */}
        {experiences.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
              <Briefcase className="w-12 h-12 text-primary" />
            </div>
            <h3 className="text-2xl font-bold mb-4">No experiences yet</h3>
            <p className="text-muted-foreground mb-6">
              Click below to add sample work experience data
            </p>
            <motion.button
              onClick={handleSeed}
              disabled={isSeeding}
              className="px-8 py-4 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isSeeding ? "Adding Experiences..." : "Add Sample Experiences"}
            </motion.button>
          </div>
        )}

        {/* Main content - Timeline */}
        {experiences.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left side - Timeline cards */}
            <div className="relative">
              {/* Timeline line */}
              <div
                ref={timelineRef}
                className="absolute left-[18px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent origin-top"
              />

              {/* Experience cards */}
              <div className="space-y-6 pl-10">
                {experiences.slice(0, 3).map((exp, index) => (
                  <ExperienceCard
                    key={exp._id}
                    experience={exp}
                    index={index}
                    isActive={activeExperience?._id === exp._id}
                    onClick={() => setActiveExperience(exp)}
                  />
                ))}
              </div>
            </div>

            {/* Right side - Details panel */}
            <div className="lg:sticky lg:top-24 lg:self-start">
              <AnimatePresence mode="wait">
                <ExperienceDetails experience={activeExperience} />
              </AnimatePresence>
            </div>
          </div>
        )}

        {/* See All Button */}
        <div className="text-center mt-16">
          <a
            href="/experience"
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-full
                       bg-gradient-to-r from-primary/10 to-transparent
                       border border-primary/30 hover:border-primary/60
                       text-primary font-medium
                       hover:shadow-[0_0_20px_rgba(220,38,38,0.2)]
                       transition-all duration-300"
          >
            <span>View Full Career Timeline</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
