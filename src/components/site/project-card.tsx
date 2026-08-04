import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "@/lib/portfolio-data";
import { useContent } from "@/lib/i18n";

export function ProjectCard({ project, large = false }: { project: Project; large?: boolean }) {
  const { categoryLabel } = useContent();
  return (
    <Link
      to="/projects/$slug"
      params={{ slug: project.slug }}
      className="glass hover-lift group block overflow-hidden rounded-3xl"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={`${project.title} interface preview`}
          loading="lazy"
          width={1280}
          height={800}
          className={`w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110 ${
            large ? "aspect-[16/10]" : "aspect-[16/11]"
          }`}
        />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-card to-transparent opacity-80" />
        <span className="glass absolute start-4 top-4 rounded-full px-3 py-1 font-mono text-[11px] uppercase tracking-wider">
          {categoryLabel(project.category)}
        </span>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{project.tagline}</p>
          </div>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:border-primary group-hover:text-primary">
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </span>
        </div>

        <ul className="mt-5 flex flex-wrap gap-2">
          {project.stack.slice(0, 4).map((t) => (
            <li
              key={t}
              className="rounded-full bg-secondary px-3 py-1 font-mono text-[11px] text-secondary-foreground"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Link>
  );
}
