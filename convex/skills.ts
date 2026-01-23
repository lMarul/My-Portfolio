import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all skills
export const get = query({
  args: {},
  handler: async (ctx) => {
    const skills = await ctx.db.query("skills").collect();
    return skills;
  },
});

// Add a new skill
export const add = mutation({
  args: {
    name: v.string(),
    category: v.union(
      v.literal("frontend"),
      v.literal("backend"),
      v.literal("frameworks"),
      v.literal("tools")
    ),
    img: v.string(),
  },
  handler: async (ctx, args) => {
    const skillId = await ctx.db.insert("skills", args);
    return skillId;
  },
});

// Remove a skill
export const remove = mutation({
  args: { id: v.id("skills") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
