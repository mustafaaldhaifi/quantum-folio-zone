import { GraduationCap, MapPin, Quote } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";
import { Section } from "./section";
import { Reveal } from "./reveal";
import { Counter } from "./counter";
import {
  experience,
  profile,
  skills,
  stats,
  techStack,
  testimonials,
} from "@/lib/portfolio-data";

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About me"
      title="Engineering rigour, product craft."
      description={profile.bio[0]}
    >
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <Reveal className="glass rounded-3xl p-8">
          <p className="text-pretty text-muted-foreground">{profile.bio[1]}</p>
          <div className="divider-glow my-7" />
          <dl className="grid gap-6 sm:grid-cols-2">
            <div className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-sm font-semibold">{profile.degree}</dt>
                <dd className="text-sm text-muted-foreground">Graduated with distinction</dd>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              <div className="min-w-0">
                <dt className="text-sm font-semibold">{profile.location}</dt>
                <dd className="text-sm text-muted-foreground">Open to hybrid and remote</dd>
              </div>
            </div>
          </dl>
        </Reveal>

        <Reveal delay={0.12} className="glass rounded-3xl p-8">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Currently
          </p>
          <ul className="mt-6 space-y-5">
            {[
              ["Building", "A streaming analytics platform at Northlight Labs"],
              ["Learning", "Distributed systems and Rust for edge workloads"],
              ["Writing", "Notes on Core Web Vitals and edge rendering"],
            ].map(([k, v]) => (
              <li key={k}>
                <p className="text-sm font-semibold text-accent">{k}</p>
                <p className="text-sm text-muted-foreground">{v}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Capabilities"
      title="What I work with daily"
      description="A full-stack toolkit built around type safety, performance budgets and maintainable systems."
    >
      <div className="grid gap-6 sm:grid-cols-2">
        {skills.map((s, i) => (
          <Reveal key={s.group} delay={i * 0.08} className="glass hover-lift rounded-3xl p-7">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
              <h3 className="truncate text-lg font-semibold">{s.group}</h3>
              <span className="shrink-0 font-mono text-sm text-accent">{s.level}%</span>
            </div>
            <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
              <SkillBar level={s.level} />
            </div>
            <ul className="mt-5 flex flex-wrap gap-2">
              {s.items.map((it) => (
                <li key={it} className="rounded-full bg-secondary px-3 py-1 text-xs">
                  {it}
                </li>
              ))}
            </ul>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

function SkillBar({ level }: { level: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ width: 0 }}
      animate={{ width: inView ? `${level}%` : 0 }}
      transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      style={{ backgroundImage: "var(--gradient-line)" }}
      className="h-full rounded-full"
    />
  );
}

export function TechStack() {
  return (
    <Section
      eyebrow="Stack"
      title="Technology stack"
      description="The tools I reach for when shipping production software."
    >
      <div className="flex flex-wrap gap-3">
        {techStack.map((t, i) => (
          <Reveal key={t} delay={i * 0.03}>
            <span className="glass hover-lift inline-flex rounded-2xl px-5 py-3 font-mono text-sm">
              {t}
            </span>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Journey"
      title="Experience timeline"
      description="From coursework to production systems used by tens of thousands of people."
    >
      <ol className="relative ml-3 border-l border-border pl-8">
        {experience.map((e, i) => (
          <li key={e.role} className="pb-10 last:pb-0">
            <Reveal delay={i * 0.08}>
              <span
                aria-hidden="true"
                className="absolute -left-[7px] mt-2 grid h-3.5 w-3.5 place-items-center rounded-full bg-primary glow-ring"
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">{e.period}</p>
              <h3 className="mt-2 text-xl font-semibold">{e.role}</h3>
              <p className="text-sm text-muted-foreground">{e.company}</p>
              <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">{e.description}</p>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}

export function Stats() {
  return (
    <section className="px-4 py-16">
      <div className="mx-auto grid max-w-6xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08} className="glass hover-lift rounded-3xl p-7">
            <p className="gradient-text font-display text-4xl font-bold">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted-foreground">{s.label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <Section
      eyebrow="Feedback"
      title="What people say"
      description="Notes from the teams I've built with."
    >
      <div className="grid gap-6 lg:grid-cols-3">
        {testimonials.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1} className="glass hover-lift rounded-3xl p-7">
            <Quote className="h-6 w-6 text-accent" aria-hidden="true" />
            <blockquote className="mt-4 text-pretty text-sm leading-relaxed">{t.quote}</blockquote>
            <figcaption className="mt-6">
              <p className="text-sm font-semibold">{t.name}</p>
              <p className="text-sm text-muted-foreground">{t.title}</p>
            </figcaption>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
