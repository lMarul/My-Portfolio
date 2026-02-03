import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    category: v.string(), // e.g. "Web Development", "Mobile App"
    description: v.string(),
    thumbnail: v.string(), // Main image for cards
    gallery: v.optional(v.array(v.string())), // Screenshots for expanded view
    tags: v.array(v.string()),
    date: v.string(), // ISO date format
    links: v.object({
      github: v.optional(v.string()),
      demo: v.optional(v.string()),
      live: v.optional(v.string()),
    }),
    createdAt: v.number(), // timestamp for sorting (newest first)
  }).index("by_createdAt", ["createdAt"]),

  skills: defineTable({
    name: v.string(),
    category: v.union(
      v.literal("frontend"),
      v.literal("backend"),
      v.literal("frameworks"),
      v.literal("tools")
    ),
    img: v.string(),
  }),

  // Hackathon Showcase Schema
  hackathons: defineTable({
    title: v.string(),
    organizer: v.string(), // e.g. "Google Solution Challenge"
    description: v.string(), // Full text description
    date: v.string(), // ISO "2024-03-15"

    // MEDIA ASSETS
    thumbnail: v.string(), // Cover image for the Card
    gallery: v.array(v.string()), // Screenshots for the Spotlight view

    // META
    tags: v.array(v.string()), // e.g. ["React", "IoT", "TensorFlow"]
    links: v.object({
      github: v.optional(v.string()),
      demo: v.optional(v.string()),
      social: v.optional(v.string()),
    }),
  }).index("by_date", ["date"]),

  // Work Experience Schema - Includes jobs, internships, orgs, OJT, etc.
  experiences: defineTable({
    // Core Information
    title: v.string(), // e.g. "Software Developer Intern"
    organization: v.string(), // e.g. "Google", "ACM Student Chapter"
    type: v.union(
      v.literal("employment"),
      v.literal("internship"),
      v.literal("ojt"),
      v.literal("student-org"),
      v.literal("freelance"),
      v.literal("volunteer")
    ),
    location: v.string(), // e.g. "San Francisco, CA" or "Remote"

    // Duration
    startDate: v.string(), // ISO date "2024-01"
    endDate: v.optional(v.string()), // null/undefined = Present
    isCurrent: v.boolean(),

    // Details
    description: v.string(), // Main description
    responsibilities: v.array(v.string()), // Bullet points
    achievements: v.array(v.string()), // Key accomplishments

    // Visual & Meta
    logo: v.optional(v.string()), // Organization logo URL
    color: v.optional(v.string()), // Accent color for the card
    technologies: v.array(v.string()), // Tech stack used
  })
    .index("by_startDate", ["startDate"])
    .index("by_type", ["type"]),

  // Certifications Schema
  certifications: defineTable({
    title: v.string(),
    issuer: v.string(),
    date: v.string(),
    credentialId: v.string(),
    url: v.optional(v.string()),

    // Visuals
    iconType: v.string(), // "cloud", "code", "smartphone", "database", etc.
    color: v.string(), // Tailwind gradient classes
    glowColor: v.string(), // CSS RGBA color

    skills: v.array(v.string()),
  }).index("by_date", ["date"]),

  // Hero Content - Single row for hero section
  heroContent: defineTable({
    title: v.string(),
    subtitle: v.string(),
    description: v.string(),
    roles: v.array(v.string()),
    lastUpdated: v.number(),
  }),

  // About Content - Single row for about section
  aboutContent: defineTable({
    title: v.string(),
    subtitle: v.string(),
    bio: v.array(v.string()), // Array of paragraphs
    stats: v.object({
      projects: v.string(),
      technologies: v.string(),
      curiosity: v.string(),
    }),
    lastUpdated: v.number(),
  }),

  // Social Links - Multiple rows, one per platform
  socialLinks: defineTable({
    platform: v.string(), // "linkedin", "github", "facebook", "instagram", "email"
    url: v.string(),
    label: v.string(),
    color: v.string(), // Hex color for the icon
    order: v.number(), // Display order
    isActive: v.boolean(), // Can hide/show links
  }).index("by_order", ["order"]),
});

