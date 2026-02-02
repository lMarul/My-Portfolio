import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all projects sorted by createdAt (newest first)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const projects = await ctx.db
      .query("projects")
      .withIndex("by_createdAt")
      .order("desc")
      .collect();
    return projects;
  },
});

// Add a new project
export const add = mutation({
  args: {
    title: v.string(),
    category: v.string(),
    description: v.string(),
    thumbnail: v.string(),
    tags: v.array(v.string()),
    date: v.string(),
    links: v.object({
      github: v.optional(v.string()),
      demo: v.optional(v.string()),
      live: v.optional(v.string()),
    }),
  },
  handler: async (ctx, args) => {
    const projectId = await ctx.db.insert("projects", {
      ...args,
      createdAt: Date.now(),
    });
    return projectId;
  },
});

// Seed projects with sample data
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing projects
    const existing = await ctx.db.query("projects").collect();
    for (const project of existing) {
      await ctx.db.delete(project._id);
    }

    // Sample project data
    const sampleProjects = [
      {
        title: "E-Commerce Platform",
        category: "Full Stack Development",
        description: "A comprehensive e-commerce solution with real-time inventory management, payment processing, and admin dashboard. Built with modern web technologies for optimal performance and user experience.",
        thumbnail: "https://images.unsplash.com/photo-1557821552-17105176677c?w=800",
        tags: ["React", "Node.js", "MongoDB", "Stripe", "Redux"],
        date: "2025-12-15",
        links: {
          github: "https://github.com",
          demo: "https://example.com",
          live: "https://example.com",
        },
        createdAt: Date.now() - 1000000,
      },
      {
        title: "Social Media Dashboard",
        category: "Frontend Development",
        description: "Real-time analytics dashboard for social media management with interactive charts, post scheduling, and engagement metrics. Features dark mode and responsive design for all devices.",
        thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800",
        tags: ["Vue.js", "Chart.js", "Tailwind CSS", "Firebase"],
        date: "2025-11-20",
        links: {
          github: "https://github.com",
          demo: "https://example.com",
        },
        createdAt: Date.now() - 2000000,
      },
      {
        title: "Task Management App",
        category: "Full Stack Development",
        description: "Collaborative task management tool with drag-and-drop interface, real-time updates, team collaboration features, and project timeline visualization.",
        thumbnail: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800",
        tags: ["Next.js", "TypeScript", "PostgreSQL", "Prisma"],
        date: "2025-10-05",
        links: {
          github: "https://github.com",
          live: "https://example.com",
        },
        createdAt: Date.now() - 3000000,
      },
      {
        title: "Weather Forecast App",
        category: "Mobile Development",
        description: "Cross-platform weather application with detailed forecasts, interactive maps, weather alerts, and location-based notifications. Clean UI with smooth animations.",
        thumbnail: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800",
        tags: ["React Native", "Expo", "Weather API", "Maps"],
        date: "2025-09-12",
        links: {
          github: "https://github.com",
          demo: "https://example.com",
        },
        createdAt: Date.now() - 4000000,
      },
      {
        title: "Portfolio CMS",
        category: "Backend Development",
        description: "Headless CMS for portfolio websites with REST API, content management, media library, user authentication, and role-based access control.",
        thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800",
        tags: ["Express", "Node.js", "MySQL", "JWT", "REST API"],
        date: "2025-08-28",
        links: {
          github: "https://github.com",
        },
        createdAt: Date.now() - 5000000,
      },
      {
        title: "Fitness Tracker",
        category: "Mobile Development",
        description: "Personal fitness tracking app with workout logging, progress charts, meal planning, calorie counter, and social features to connect with friends.",
        thumbnail: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800",
        tags: ["Flutter", "Dart", "Firebase", "Health Kit"],
        date: "2025-07-15",
        links: {
          github: "https://github.com",
          demo: "https://example.com",
        },
        createdAt: Date.now() - 6000000,
      },
    ];

    for (const project of sampleProjects) {
      await ctx.db.insert("projects", project);
    }

    return { success: true, count: sampleProjects.length };
  },
});

// Update an existing project
export const update = mutation({
  args: {
    id: v.id("projects"),
    title: v.optional(v.string()),
    description: v.optional(v.string()),
    image: v.optional(v.string()),
    tags: v.optional(v.array(v.string())),
    url: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { id, ...updates } = args;
    // Filter out undefined values
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );
    await ctx.db.patch(id, filteredUpdates);
  },
});

// Remove a project
export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});
