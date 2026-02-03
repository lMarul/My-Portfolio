import { query } from "./_generated/server";

// Get hero content
export const getHeroContent = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("heroContent").first();
    },
});

// Get about content
export const getAboutContent = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("aboutContent").first();
    },
});

// Get all active social links ordered by order field
export const getSocialLinks = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("socialLinks")
            .withIndex("by_order")
            .filter((q) => q.eq(q.field("isActive"), true))
            .collect();
    },
});

// Get all social links (including inactive)
export const getAllSocialLinks = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("socialLinks")
            .withIndex("by_order")
            .collect();
    },
});
