import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Reveal } from "@/components/site/reveal";
import { MagneticButton } from "@/components/site/magnetic-button";
import { getProject, projects, type Project } from "@/lib/portfolio-data";
import { useContent, useLanguage } from "@/lib/i18n";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = getProject(params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }],
      };
    }
    const { project } = loaderData;
    const title = `${project.title} — Case study by Mustafa Aldhaifi`;
    return {
      meta: [
        { title },
        { name: "description", content: project.overview.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: project.tagline },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ProjectPage,
  notFoundComponent: ProjectNotFound,
});

function ProjectNotFound() {
  const { t } = useLanguage();
  return (
    <div className="grid min-h-screen place-items-center px-4 text-center">
      <div>
        <h1 className="text-3xl font-bold">{t("project.notFound")}</h1>
        <p className="mt-3 text-muted-foreground">{t("project.notFoundDesc")}</p>
        <Link to="/" className="mt-6 inline-flex text-primary underline">
          {t("project.back")}
        </Link>
      </div>
    </div>
  );
}

function ProjectPage() {
  const { project: base } = Route.useLoaderData() as { project: Project };
  const { t } = useLanguage();
  const { localizeProject, categoryLabel } = useContent();
  const project = localizeProject(base);
  const others = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 3)
    .map(localizeProject);

  return (
    <div className="min-h-screen">
      <Nav />
      <main className="px-4 pt-32 pb-20">
        <article className="mx-auto max-w-5xl">
          <Reveal>
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 rtl:rotate-180" aria-hidden="true" />
              {t("project.back")}
            </Link>
            <p className="mt-8 font-mono text-xs uppercase tracking-[0.3em] text-accent">
              {categoryLabel(project.category)} · {project.year}
            </p>
            <h1 className="mt-4 text-balance text-4xl font-bold sm:text-6xl">{project.title}</h1>
            <p className="mt-4 max-w-2xl text-pretty text-lg text-muted-foreground">
              {project.tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <MagneticButton href={project.demo}>
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {t("project.demo")}
              </MagneticButton>
              <MagneticButton href={project.repo} variant="ghost">
                <Github className="h-4 w-4" aria-hidden="true" />
                {t("project.source")}
              </MagneticButton>
            </div>
          </Reveal>

          <Reveal delay={0.1} className="glass mt-14 overflow-hidden rounded-3xl">
            <img
              src={project.image}
              alt={`${project.title} main interface screenshot`}
              width={1280}
              height={800}
              className="w-full object-cover"
            />
          </Reveal>

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {project.metrics.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.08} className="glass rounded-3xl p-6">
                <p className="gradient-text font-display text-3xl font-bold">{m.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{m.label}</p>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
            <Reveal>
              <h2 className="text-2xl font-bold">{t("project.overview")}</h2>
              <p className="mt-4 text-pretty leading-relaxed text-muted-foreground">
                {project.overview}
              </p>
            </Reveal>
            <Reveal delay={0.1} className="glass h-fit rounded-3xl p-7">
              <dl className="grid gap-5 text-sm">
                <div>
                  <dt className="text-muted-foreground">{t("project.role")}</dt>
                  <dd className="mt-1 font-semibold">{project.role}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("project.duration")}</dt>
                  <dd className="mt-1 font-semibold">{project.duration}</dd>
                </div>
                <div>
                  <dt className="text-muted-foreground">{t("project.tech")}</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {project.stack.map((t) => (
                      <span
                        key={t}
                        className="rounded-full bg-secondary px-3 py-1 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </Reveal>
          </div>

          <section className="mt-16">
            <Reveal>
              <h2 className="text-2xl font-bold">{t("project.features")}</h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {project.features.map((f, i) => (
                <Reveal key={f.title} delay={i * 0.07} className="glass hover-lift rounded-3xl p-7">
                  <h3 className="text-lg font-semibold">{f.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{f.description}</p>
                </Reveal>
              ))}
            </div>
          </section>

          <section className="mt-20">
            <Reveal>
              <h2 className="text-2xl font-bold">{t("project.more")}</h2>
            </Reveal>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {others.map((p, i) => (
                <Reveal key={p.slug} delay={i * 0.07}>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="glass hover-lift block rounded-3xl p-6"
                  >
                    <p className="font-mono text-[11px] uppercase tracking-wider text-accent">
                      {categoryLabel(p.category)}
                    </p>
                    <p className="mt-2 font-semibold">{p.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
