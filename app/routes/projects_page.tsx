import type { Route } from "./+types/projects_page";
import { Section } from "../components/Section";
import { ProjectCard } from "../components/ProjectCard";
import projects from "../data/projects";
import { t } from "../components/theme";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Projects | Jorge R." },
    { name: "description", content: "A collection of projects and work samples." },
  ];
}

export default function Projects() {
  return (
    <main className={`space-y-8 ${t.pageTop}`}>
      <Section id="projects" title="All Projects & Technical Work">
        <p className={`mb-6 max-w-3xl text-base leading-7 ${t.sectionText}`}>
          Explore my complete collection of software engineering projects, system
          tools, and interactive applications. Click "Inspect" on any card to view
          deep-dive details and preview screenshots.
        </p>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard key={project.title} {...project} />
          ))}
        </div>
      </Section>
    </main>
  );
}