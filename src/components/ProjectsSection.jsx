import { ArrowRight, Github } from "lucide-react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export const ProjectsSection = () => {
  const projects = useQuery(api.projects.get) ?? [];

  return (
    <section id="projects" className="py-24 px-4 relative">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
          {" "}
          Featured <span className="text-primary"> Projects </span>
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Here are some of my recent projects. Each project was carefully
          crafted with attention to detail, performance, and user experience.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, key) => (
            <a
              key={key}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className={
                "group bg-card rounded-lg overflow-hidden shadow-xs card-hover block transition-transform duration-300 hover:scale-[1.02] relative" +
                (project.url ? " hover:ring-4 hover:ring-purple-500/40" : "")
              }
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6 min-h-[260px]">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag) => (
                    <span className="px-2 py-1 text-xs font-medium border rounded-full bg-secondary text-secondary-foreground" key={tag}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mb-1"> {project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                {project.githubUrl && (
                  <div className="absolute bottom-4 left-4">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                      onClick={e => e.stopPropagation()}
                    >
                      <Github size={30} />
                    </a>
                  </div>
                )}
              </div>
            </a>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-4">
            <a
              className="cosmic-button w-fit flex items-center gap-2 bg-gradient-to-r from-purple-500 to-blue-500 text-white"
              target="_blank"
              href="https://github.com/lMarul/Portfolio.git"
            >
              This Portfolio
            </a>
            <a
              className="cosmic-button w-fit flex items-center gap-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white"
              target="_blank"
              href="https://github.com/lMarul"
            >
              Check My Github
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
