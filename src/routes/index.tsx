import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { Hero } from "@/components/site/hero";
import {
  About,
  Experience,
  Skills,
  Stats,
  TechStack,
  Testimonials,
} from "@/components/site/sections";
import { AllApplications, FeaturedProjects } from "@/components/site/work";
import { Contact } from "@/components/site/contact";

const title = "Aarav Mehta — Full Stack Developer & IT Graduate";
const description =
  "Portfolio of Aarav Mehta, a full stack developer and IT graduate building fast, accessible web platforms with React, TypeScript, Node.js and cloud infrastructure.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Aarav Mehta",
          jobTitle: "Full Stack Developer",
          email: "hello@aaravmehta.dev",
          alumniOf: "University of Technology",
          knowsAbout: ["React", "TypeScript", "Node.js", "PostgreSQL", "AWS"],
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen">
      <Nav />
      <main>
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <AllApplications />
        <TechStack />
        <Experience />
        <Stats />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
