import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Comments/Guestbook Schema - The only data stored in Convex
  comments: defineTable({
    name: v.string(), // Visitor's name
    message: v.string(), // Comment message
    email: v.optional(v.string()), // Optional email
    website: v.optional(v.string()), // Optional website/social link
    isApproved: v.boolean(), // Moderation flag (default: true for auto-approve)
    createdAt: v.number(), // Timestamp for sorting
    updatedAt: v.optional(v.number()), // Last updated timestamp
  })
    .index("by_createdAt", ["createdAt"])
    .index("by_isApproved", ["isApproved"]),
});

