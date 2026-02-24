import { useState } from "react";
import { cn } from "@/lib/utils";
import skillsData from "@/data/skills.json";

const categories = ["all", "frontend", "backend", "frameworks", "tools"];

export const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const skills = skillsData;

  const filteredSkills = skills.filter(
    (skill) => activeCategory === "all" || skill.category === activeCategory
  );
  return (
    <section id="skills" className="py-24 px-4 relative bg-secondary/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
          My <span className="text-primary"> Skills</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category, key) => (
            <button
              key={key}
              onClick={() => setActiveCategory(category)}
              className={cn(
                "px-5 py-2 rounded-full border-2 cursor-pointer transition-colors duration-300 capitalize",
                activeCategory === category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-secondary/70 text-forefround border-transparent hover:border-primary"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill, key) => (
            <div
              key={key}
              className="bg-card p-6 rounded-lg shadow-xs card-hover flex items-center gap-4"
            >
              <img src={skill.img} alt={skill.name + ' icon'} className="h-8 w-8 flex-shrink-0" />
              <span className="font-semibold text-lg">{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

