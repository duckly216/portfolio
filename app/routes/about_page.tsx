import { useState, useMemo } from "react";
import type { Route } from "./+types/about_page";
import { Section } from "../components/Section";
import { CourseCard } from "../components/CourseCard";
import courses, { SORT_OPTIONS, DEFAULT_SORT_ID } from "../data/courses";
import { t } from "../components/theme";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "About | Jorge R." },
    { name: "description", content: "About section for Jorge Ramirez." },
  ];
}

export default function About() {
  const [sortId, setSortId] = useState(DEFAULT_SORT_ID);

  const sortedCourses = useMemo(() => {
    const option = SORT_OPTIONS.find((o) => o.id === sortId) ?? SORT_OPTIONS[0];
    return [...courses].sort(option.compare);
  }, [sortId]);

  return (
    <main className={`space-y-8 ${t.pageTop}`}>
      <Section id="overview" title="About Me">
        <div className={`max-w-3xl space-y-4 text-base leading-7 ${t.sectionText}`}>
          <p>
            Currently a Computer Science student at the University of Florida, I am
            pursuing a degree with a focus on Cybersecurity, Data Analytics and AI
            Fundamentals. While I have a deep-seated passion for organizing and
            extracting insights from complex data, I am increasingly drawn to the
            world of cybersecurity. I am particularly interested in the intersection
            of these fields: leveraging data analytics to identify anomalous patterns
            and utilizing AI to build more proactive, automated system defenses.
          </p>
          <p>
            To complement my academic studies, I am self-driven in my security
            education, regularly completing online coursework and competing in
            Capture-the-Flag (CTF) challenges to build hands-on skills in network
            security and threat analysis. I am looking to leverage my analytical
            background and my growing security mindset to contribute to a
            forward-thinking technical team.
          </p>
        </div>
      </Section>

      <Section id="courses" title="Relevant Courses" className={t.anchorOffset}>
        {/* Sort controls */}
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className={`mr-1 text-sm font-medium ${t.sectionText}`}>Sort by:</span>
          {SORT_OPTIONS.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setSortId(option.id)}
              aria-pressed={sortId === option.id}
              className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
                sortId === option.id ? t.btnPrimary : t.btnSecondary
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {sortedCourses.map((course) => (
            <CourseCard key={course.code} {...course} />
          ))}
        </div>
      </Section>
    </main>
  );
}