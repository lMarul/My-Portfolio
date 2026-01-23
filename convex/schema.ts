import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    description: v.string(),
    image: v.string(),
    tags: v.array(v.string()),
    url: v.optional(v.string()),
    githubUrl: v.string(),
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
});
