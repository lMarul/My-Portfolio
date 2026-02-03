import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all certifications
export const get = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("certifications").order("desc").collect();
    },
});

// Seed certifications (Idempotent-ish: clears and re-adds to avoid duplicates during dev)
export const seed = mutation({
    args: {},
    handler: async (ctx) => {
        // Optional: Clear existing entries to prevent duplicates
        const existing = await ctx.db.query("certifications").collect();
        for (const cert of existing) {
            await ctx.db.delete(cert._id);
        }

        const certifications = [
            {
                title: "AWS Certified Solutions Architect",
                issuer: "Amazon Web Services",
                date: "2024",
                credentialId: "AWS-SCA-2024",
                iconType: "cloud",
                color: "from-orange-500 to-yellow-500",
                glowColor: "rgba(249, 115, 22, 0.4)",
                skills: ["Cloud Architecture", "Security", "Scalability"],
                url: "#"
            },
            {
                title: "Professional Cloud Developer",
                issuer: "Google Cloud",
                date: "2023",
                credentialId: "GCP-PCD-2023",
                iconType: "code",
                color: "from-blue-500 to-cyan-400",
                glowColor: "rgba(59, 130, 246, 0.4)",
                skills: ["GCP", "Kubernetes", "DevOps"],
                url: "#"
            },
            {
                title: "Meta Front-End Professional",
                issuer: "Meta",
                date: "2023",
                credentialId: "META-FE-2023",
                iconType: "smartphone",
                color: "from-blue-600 to-indigo-600",
                glowColor: "rgba(37, 99, 235, 0.4)",
                skills: ["React", "JavaScript", "UX/UI"],
                url: "#"
            },
            {
                title: "Certified Kubernetes Administrator",
                issuer: "CNCF",
                date: "2023",
                credentialId: "CKA-2023",
                iconType: "database",
                color: "from-blue-400 to-blue-300",
                glowColor: "rgba(96, 165, 250, 0.4)",
                skills: ["Kubernetes", "Container Orchestration", "Linux"],
                url: "#"
            }
        ];

        for (const cert of certifications) {
            await ctx.db.insert("certifications", cert);
        }

        return { seeded: certifications.length };
    },
});
