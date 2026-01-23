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
