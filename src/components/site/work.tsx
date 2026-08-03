import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Section } from "./section";
import { ProjectCard } from "./project-card";
import { Reveal } from "./reveal";
import { categories, projects } from "@/lib/portfolio-data";

export function FeaturedProjects() {
  const featured = projects.filter((p) => p.featured);
  return (
    <Section
      id="work"
      eyebrow="Selected work"
      title="Featured projects"
      description="Three products where I owned architecture, interface and delivery end to end."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.1}>
            <ProjectCard project={p} large />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function AllApplications() {
  const [active, setActive] = useState<string>("All");
  const filtered = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <Section
      id="applications"
      eyebrow="Archive"
      title="All applications"
      description="Everything shipped across platforms, commerce, AI and mobile."
    >
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            aria-pressed={active === c}
            className={`rounded-full px-4 py-2 text-sm transition-colors ${
              active === c
                ? "bg-primary text-primary-foreground"
                : "glass text-muted-foreground hover:text-foreground"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <motion.div layout className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectCard project={p} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </Section>
  );
}
