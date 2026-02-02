import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    category: v.string(), // e.g. "Web Development", "Mobile App"
    description: v.string(),
    thumbnail: v.string(), // Main image for cards
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
});
