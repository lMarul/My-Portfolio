import { mutation, query } from "./_generated/server";

// Get all hackathons sorted by date (newest first)
export const get = query({
  args: {},
  handler: async (ctx) => {
    const hackathons = await ctx.db
      .query("hackathons")
      .withIndex("by_date")
      .order("desc")
      .collect();
    return hackathons;
  },
});

// Clear all hackathons (use before reseeding)
export const clear = mutation({
  args: {},
  handler: async (ctx) => {
    const all = await ctx.db.query("hackathons").collect();
    for (const h of all) {
      await ctx.db.delete(h._id);
    }
    return { deleted: all.length };
  },
});

// Seed 6+ hackathon projects with distinct thumbnail vs gallery URLs
// Gallery arrays have 4+ images to test the spotlight thumbnail strip
export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    const hackathons = [
      {
        title: "Smart Recycle",
        organizer: "Google Solution Challenge 2024",
        date: "2024-03-15",
        description:
          "An AI-powered waste classification app that uses computer vision to identify recyclable materials and provides proper disposal instructions. Our team developed a mobile-first solution using TensorFlow Lite for on-device inference, ensuring privacy and offline functionality. The app achieved 94% accuracy across 15 waste categories and won the regional finals.",
        thumbnail: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&h=800&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1526951521990-620dc14c214b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800&h=600&fit=crop",
        ],
        tags: ["React Native", "TensorFlow", "Firebase", "Python"],
        links: {
          github: "https://github.com/example/smart-recycle",
          demo: "https://smart-recycle.app",
          social: "https://linkedin.com/posts/smart-recycle",
        },
      },
      {
        title: "EduConnect",
        organizer: "MLH HackMIT 2023",
        date: "2023-09-20",
        description:
          "A peer-to-peer learning platform connecting students with tutors in real-time. Features include HD video calls with WebRTC, collaborative whiteboard with real-time sync, AI-powered study recommendations, and comprehensive progress tracking. Won 2nd place among 200+ competing teams.",
        thumbnail: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=800&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=800&h=600&fit=crop",
        ],
        tags: ["React", "WebRTC", "Node.js", "MongoDB", "Socket.io"],
        links: {
          github: "https://github.com/example/educonnect",
          demo: "https://educonnect.vercel.app",
        },
      },
      {
        title: "HealthTrack IoT",
        organizer: "IEEE Hackathon 2023",
        date: "2023-05-10",
        description:
          "A wearable health monitoring system using Arduino sensors to track vital signs including heart rate, blood oxygen, and temperature. Data syncs to a React app for real-time monitoring, trend analysis, and emergency alerts to caregivers. Features predictive analytics for early health issue detection.",
        thumbnail: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=800&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop",
        ],
        tags: ["Arduino", "IoT", "React", "Flask", "MQTT"],
        links: {
          github: "https://github.com/example/healthtrack",
          social: "https://facebook.com/healthtrack",
        },
      },
      {
        title: "Carbon Footprint Tracker",
        organizer: "Climate Hack Global 2024",
        date: "2024-01-25",
        description:
          "A comprehensive carbon footprint tracking app that helps users monitor their environmental impact through daily activities, transportation, and consumption habits. Features gamification, community challenges, and AI-powered suggestions for reducing emissions. Integrates with smart home devices.",
        thumbnail: "https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=600&h=800&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1518173946687-a4c036bc1413?w=800&h=600&fit=crop",
        ],
        tags: ["Vue.js", "Python", "PostgreSQL", "Chart.js", "OpenAI"],
        links: {
          github: "https://github.com/example/carbon-tracker",
          demo: "https://carbonfootprint.app",
        },
      },
      {
        title: "SafeRoute",
        organizer: "Women in Tech Hackathon 2023",
        date: "2023-11-08",
        description:
          "A personal safety navigation app that provides the safest walking routes based on crime data, street lighting, and crowd density. Features real-time location sharing with trusted contacts, SOS alerts, and community-reported hazards. Built for urban commuters, especially those traveling at night.",
        thumbnail: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=600&h=800&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop",
        ],
        tags: ["React Native", "Google Maps", "Node.js", "MongoDB"],
        links: {
          github: "https://github.com/example/saferoute",
          demo: "https://saferoute.app",
          social: "https://twitter.com/saferoute",
        },
      },
      {
        title: "FarmSense AI",
        organizer: "AgriTech Innovation Challenge 2024",
        date: "2024-02-20",
        description:
          "An intelligent crop monitoring system using drone imagery and machine learning to detect plant diseases, pest infestations, and irrigation needs. Provides actionable insights to farmers via a mobile app, helping optimize crop yields and reduce pesticide use by 40%.",
        thumbnail: "https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=600&h=800&fit=crop",
        gallery: [
          "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1560493676-04071c5f467b?w=800&h=600&fit=crop",
          "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=800&h=600&fit=crop",
        ],
        tags: ["Python", "TensorFlow", "React", "AWS", "Drones"],
        links: {
          github: "https://github.com/example/farmsense",
          demo: "https://farmsense.ai",
        },
      },
    ];

    for (const hackathon of hackathons) {
      await ctx.db.insert("hackathons", hackathon);
    }

    return { inserted: hackathons.length };
  },
});
