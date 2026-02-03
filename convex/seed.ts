import { mutation } from "./_generated/server";

// Clear all skills (use before reseeding)
export const clearSkills = mutation({
  args: {},
  handler: async (ctx) => {
    const allSkills = await ctx.db.query("skills").collect();
    for (const skill of allSkills) {
      await ctx.db.delete(skill._id);
    }
    return { deleted: allSkills.length };
  },
});

// One-time seed mutation for skills with CDN URLs
export const seedSkills = mutation({
  args: {},
  handler: async (ctx) => {
    const skills = [
      // Frontend
      { name: "HTML", category: "frontend" as const, img: "https://cdn.simpleicons.org/html5" },
      { name: "CSS", category: "frontend" as const, img: "https://cdn.simpleicons.org/css3" },
      { name: "JavaScript", category: "frontend" as const, img: "https://cdn.simpleicons.org/javascript" },

      // Frameworks
      { name: "Flask", category: "frameworks" as const, img: "https://cdn.simpleicons.org/flask" },
      { name: "React", category: "frameworks" as const, img: "https://cdn.simpleicons.org/react" },
      { name: "Tailwind CSS", category: "frameworks" as const, img: "https://cdn.simpleicons.org/tailwindcss" },

      // Backend
      { name: "Python", category: "backend" as const, img: "https://cdn.simpleicons.org/python" },
      { name: "Java", category: "backend" as const, img: "https://cdn.simpleicons.org/openjdk" },
      { name: "SQL", category: "backend" as const, img: "https://cdn.simpleicons.org/mysql" },
      { name: "SQLite", category: "backend" as const, img: "https://cdn.simpleicons.org/sqlite" },

      // Tools
      { name: "Git", category: "tools" as const, img: "https://cdn.simpleicons.org/git" },
      { name: "Github", category: "tools" as const, img: "https://cdn.simpleicons.org/github" },
      { name: "Figma", category: "tools" as const, img: "https://cdn.simpleicons.org/figma" },
      { name: "VS Code", category: "tools" as const, img: "https://cdn.simpleicons.org/visualstudiocode" },
    ];

    for (const skill of skills) {
      await ctx.db.insert("skills", skill);
    }

    return { inserted: skills.length };
  },
});

// Clear site content
export const clearSiteContent = mutation({
  args: {},
  handler: async (ctx) => {
    const heroContent = await ctx.db.query("heroContent").collect();
    const aboutContent = await ctx.db.query("aboutContent").collect();
    const socialLinks = await ctx.db.query("socialLinks").collect();

    for (const item of heroContent) await ctx.db.delete(item._id);
    for (const item of aboutContent) await ctx.db.delete(item._id);
    for (const item of socialLinks) await ctx.db.delete(item._id);

    return {
      deleted: heroContent.length + aboutContent.length + socialLinks.length
    };
  },
});

// Seed site content
export const seedSiteContent = mutation({
  args: {},
  handler: async (ctx) => {
    const now = Date.now();

    // Hero Section Content
    await ctx.db.insert("heroContent", {
      title: "MARWIN",
      subtitle: "System Online • Welcome User",
      description: "Forging immersive digital realities where code meets chaos. Pushing the boundaries of web interaction.",
      roles: ["Full Stack Developer", "UI/UX Designer", "Creative Technologist"],
      lastUpdated: now,
    });

    // About Section Content
    await ctx.db.insert("aboutContent", {
      title: "Passionate Web Developer & Cybersecurity Enthusiast",
      subtitle: "A passionate developer on a mission to create extraordinary digital experiences",
      bio: [
        "With rich experiences in web development from various projects, I am still eager to learn more about other languages, frameworks, and technologies that I can use to create more innovative solutions.",
        "I'm passionate about exploring new technologies, especially in web development and cybersecurity, constantly pushing the boundaries of what's possible."
      ],
      stats: {
        projects: "10+",
        technologies: "5+",
        curiosity: "∞"
      },
      lastUpdated: now,
    });

    // Social Links (separate rows)
    const socialLinksData = [
      {
        platform: "linkedin",
        url: "https://www.linkedin.com/in/marwin-john-gonzales-a38509322/",
        label: "LinkedIn",
        color: "#0077b5",
        order: 1,
        isActive: true,
      },
      {
        platform: "github",
        url: "https://github.com",
        label: "GitHub",
        color: "#333",
        order: 2,
        isActive: true,
      },
      {
        platform: "facebook",
        url: "https://www.facebook.com/marwin.john.gonzales.2024/",
        label: "Facebook",
        color: "#1877f2",
        order: 3,
        isActive: true,
      },
      {
        platform: "instagram",
        url: "https://www.instagram.com/maruwinu/",
        label: "Instagram",
        color: "#e4405f",
        order: 4,
        isActive: true,
      },
      {
        platform: "email",
        url: "mailto:marwinjohngonzales@gmail.com",
        label: "Email",
        color: "#ea4335",
        order: 5,
        isActive: true,
      }
    ];

    for (const link of socialLinksData) {
      await ctx.db.insert("socialLinks", link);
    }

    return { success: true, message: "Site content seeded successfully" };
  },
});


