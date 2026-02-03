import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all experiences sorted by start date (most recent first)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const experiences = await ctx.db
      .query("experiences")
      .withIndex("by_startDate")
      .collect();

    // Sort in reverse chronological order (newest first)
    return experiences.sort((a, b) => b.startDate.localeCompare(a.startDate));
  },
});

// Seed experiences with sample data
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // Clear existing experiences first
    const existing = await ctx.db.query("experiences").collect();
    for (const exp of existing) {
      await ctx.db.delete(exp._id);
    }

    const experiences = [
      {
        title: "President",
        organization: "Google Developer Student Club",
        type: "student-org" as const,
        location: "University Campus",
        startDate: "2024-08",
        endDate: undefined,
        isCurrent: true,
        description: "Leading the university's premier technology community, organizing workshops, hackathons, and tech talks to empower students with cutting-edge development skills.",
        responsibilities: [
          "Lead a team of 15+ core members in organizing technical events",
          "Coordinate with Google Developer Relations for official GDSC programs",
          "Host weekly study jams covering Android, Web, and Cloud technologies",
          "Mentor students on their journey to becoming skilled developers",
        ],
        achievements: [
          "Grew community from 50 to 300+ active members",
          "Organized 3 successful hackathons with 500+ participants",
          "Launched campus-wide coding bootcamp reaching 200 students",
        ],
        logo: "https://cdn.simpleicons.org/google",
        color: "#4285F4",
        technologies: ["React", "Firebase", "Flutter", "TensorFlow", "Google Cloud"],
      },
      {
        title: "Software Engineer Intern",
        organization: "Tech Startup Inc.",
        type: "internship" as const,
        location: "Remote",
        startDate: "2024-06",
        endDate: "2024-08",
        isCurrent: false,
        description: "Contributed to the development of a customer-facing web application serving 10,000+ daily users, focusing on frontend optimization and new feature development.",
        responsibilities: [
          "Developed responsive React components following design specifications",
          "Implemented REST API integrations for real-time data synchronization",
          "Conducted code reviews and participated in agile sprint ceremonies",
          "Wrote unit tests achieving 85% code coverage",
        ],
        achievements: [
          "Reduced page load time by 40% through performance optimizations",
          "Shipped 5 major features to production ahead of schedule",
          "Received return offer for full-time position",
        ],
        logo: "https://cdn.simpleicons.org/react",
        color: "#61DAFB",
        technologies: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
      },
      {
        title: "Web Developer (OJT)",
        organization: "Government Agency",
        type: "ojt" as const,
        location: "City Hall",
        startDate: "2024-01",
        endDate: "2024-05",
        isCurrent: false,
        description: "Completed On-the-Job Training developing internal web systems and automating administrative processes for improved government service delivery.",
        responsibilities: [
          "Built internal dashboard for tracking citizen requests and complaints",
          "Automated report generation reducing manual work by 70%",
          "Created documentation and training materials for staff",
          "Maintained and updated legacy PHP systems",
        ],
        achievements: [
          "Streamlined document processing workflow saving 20 hours weekly",
          "Developed automated backup system for critical databases",
          "Received commendation letter from department head",
        ],
        logo: "https://cdn.simpleicons.org/laravel",
        color: "#FF2D20",
        technologies: ["Laravel", "PHP", "MySQL", "Bootstrap", "jQuery"],
      },
      {
        title: "Technical Lead",
        organization: "University ACM Chapter",
        type: "student-org" as const,
        location: "University Campus",
        startDate: "2023-09",
        endDate: "2024-06",
        isCurrent: false,
        description: "Led the technical team in organizing programming competitions, coding workshops, and algorithm training sessions for computer science students.",
        responsibilities: [
          "Designed and prepared problems for monthly programming contests",
          "Conducted algorithm and data structure training sessions",
          "Managed the organization's technical infrastructure and websites",
          "Coordinated with ACM-ICPC regional for competition participation",
        ],
        achievements: [
          "Trained team that placed Top 10 in Regional Programming Contest",
          "Increased workshop attendance by 150%",
          "Established mentorship program pairing seniors with freshmen",
        ],
        logo: "https://cdn.simpleicons.org/acm",
        color: "#0085CA",
        technologies: ["C++", "Python", "Java", "Competitive Programming"],
      },
      {
        title: "Freelance Developer",
        organization: "Self-Employed",
        type: "freelance" as const,
        location: "Remote",
        startDate: "2023-01",
        endDate: undefined,
        isCurrent: true,
        description: "Providing web development and design services to small businesses and startups, delivering custom solutions that drive growth and engagement.",
        responsibilities: [
          "Consult with clients to understand requirements and propose solutions",
          "Design and develop responsive websites and web applications",
          "Implement SEO best practices and analytics integration",
          "Provide ongoing maintenance and support for deployed projects",
        ],
        achievements: [
          "Completed 10+ projects with 100% client satisfaction",
          "Built e-commerce platform generating $50K+ monthly revenue for client",
          "Maintained 5-star rating across freelance platforms",
        ],
        logo: "https://cdn.simpleicons.org/upwork",
        color: "#6FDA44",
        technologies: ["React", "Next.js", "Tailwind CSS", "Supabase", "Vercel"],
      },
    ];

    for (const exp of experiences) {
      await ctx.db.insert("experiences", exp);
    }

    return { inserted: experiences.length };
  },
});

// Clear all experiences
export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("experiences").collect();
    for (const exp of all) {
      await ctx.db.delete(exp._id);
    }
    return { deleted: all.length };
  },
});
