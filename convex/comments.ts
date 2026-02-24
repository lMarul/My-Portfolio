import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all approved comments (newest first)
export const getAll = query({
  args: {},
  handler: async (ctx) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_isApproved", (q) => q.eq("isApproved", true))
      .collect();

    // Sort by createdAt timestamp (newest first)
    return comments.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get comment count
export const getCount = query({
  args: {},
  handler: async (ctx) => {
    const comments = await ctx.db
      .query("comments")
      .withIndex("by_isApproved", (q) => q.eq("isApproved", true))
      .collect();
    
    return comments.length;
  },
});

// Get a single comment by ID
export const getById = query({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

// Create a new comment
export const create = mutation({
  args: {
    name: v.string(),
    message: v.string(),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Validate input
    if (!args.name.trim() || args.name.length < 2) {
      throw new Error("Name must be at least 2 characters long");
    }

    if (!args.message.trim() || args.message.length < 5) {
      throw new Error("Message must be at least 5 characters long");
    }

    if (args.message.length > 500) {
      throw new Error("Message must be less than 500 characters");
    }

    // Optional email validation
    if (args.email && args.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(args.email)) {
        throw new Error("Invalid email format");
      }
    }

    const commentId = await ctx.db.insert("comments", {
      name: args.name.trim(),
      message: args.message.trim(),
      email: args.email?.trim() || undefined,
      website: args.website?.trim() || undefined,
      isApproved: true, // Auto-approve by default
      createdAt: Date.now(),
    });

    return commentId;
  },
});

// Update an existing comment
export const update = mutation({
  args: {
    id: v.id("comments"),
    name: v.optional(v.string()),
    message: v.optional(v.string()),
    email: v.optional(v.string()),
    website: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;

    // Get existing comment
    const existing = await ctx.db.get(id);
    if (!existing) {
      throw new Error("Comment not found");
    }

    // Validate updates
    if (updates.name !== undefined) {
      if (!updates.name.trim() || updates.name.length < 2) {
        throw new Error("Name must be at least 2 characters long");
      }
    }

    if (updates.message !== undefined) {
      if (!updates.message.trim() || updates.message.length < 5) {
        throw new Error("Message must be at least 5 characters long");
      }
      if (updates.message.length > 500) {
        throw new Error("Message must be less than 500 characters");
      }
    }

    // Build update object
    const updateData: any = {
      updatedAt: Date.now(),
    };

    if (updates.name !== undefined) updateData.name = updates.name.trim();
    if (updates.message !== undefined) updateData.message = updates.message.trim();
    if (updates.email !== undefined) updateData.email = updates.email.trim() || undefined;
    if (updates.website !== undefined) updateData.website = updates.website.trim() || undefined;

    await ctx.db.patch(id, updateData);

    return id;
  },
});

// Delete a comment
export const remove = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    const existing = await ctx.db.get(args.id);
    if (!existing) {
      throw new Error("Comment not found");
    }

    await ctx.db.delete(args.id);
    return { success: true };
  },
});

// Toggle comment approval (for moderation)
export const toggleApproval = mutation({
  args: { id: v.id("comments") },
  handler: async (ctx, args) => {
    const comment = await ctx.db.get(args.id);
    if (!comment) {
      throw new Error("Comment not found");
    }

    await ctx.db.patch(args.id, {
      isApproved: !comment.isApproved,
      updatedAt: Date.now(),
    });

    return { success: true, isApproved: !comment.isApproved };
  },
});

// Clear all comments (use with caution!)
export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const allComments = await ctx.db.query("comments").collect();
    for (const comment of allComments) {
      await ctx.db.delete(comment._id);
    }
    return { deleted: allComments.length };
  },
});
