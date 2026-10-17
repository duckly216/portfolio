import type { Route } from "./+types/home_page";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router";
import { ProjectCard } from "../components/ProjectCard";
import { featuredProjects } from "../data/projects";
import { CourseCard } from "../components/CourseCard";
import { featuredCourses } from "../data/courses";
import { Personal_Pics } from "../data/image_paths";
import { Section } from "../components/Section";
import { t } from "../components/theme";


function getInitialScrollProgress() {
  if (typeof window === "undefined") return 0;
  const scrollTop = window.scrollY;
  const buffer = 150;
  const fadeDistance = window.innerHeight * 0.75;
  return Math.min(1, Math.max(0, (scrollTop - buffer) / fadeDistance));
}

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Portfolio | Jorge R." },
    { name: "description", content: "A clean portfolio site for a computer science student." },
  ];
}

export default function Home() {
  // 1. Initialize state with current scroll position so initial render isn't 0 when scrolled down
  const [scrollProgress, setScrollProgress] = useState(getInitialScrollProgress);

  // 2. Synchronously adjust state before browser paint if restored to a scrolled position
  useLayoutEffect(() => {
    setScrollProgress(getInitialScrollProgress());
  }, []);

  useEffect(() => {
  
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const buffer = 150; // Buffer before starting fade-out
      const fadeDistance = window.innerHeight * 0.65; // Fades out over 75% of viewport height
      const progress = Math.min(1, Math.max(0, (scrollTop - buffer) / fadeDistance));
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const introOpacity = 1 - scrollProgress;

  return (
    <div className={`relative ${t.heroText}`}>
      {/* --- FULL SCREEN FIXED INTRO SECTION --- */}
      {introOpacity > 0 && (
        <section
          style={{
            opacity: introOpacity,
            pointerEvents: introOpacity <= 0.1 ? "none" : "auto",
          }}
          className="fixed inset-0 z-10 flex h-screen w-screen items-center justify-center overflow-hidden px-6 transition-opacity duration-75 sm:px-12"
        >
          <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-8 lg:grid-cols-12">
            
            {/* Left Text Column */}
            <div className="z-10 flex flex-col justify-center space-y-4 lg:col-span-6">
              <p className={`text-xs font-bold uppercase tracking-[0.25em] ${t.textAccent} sm:text-sm`}>
                Hello, My Name Is
              </p>
              
              <h1 className={`text-5xl font-black tracking-tight ${t.heroText} sm:text-7xl lg:text-8xl leading-none`}>
                Jorge <br /> Ramirez
              </h1>
               {/* Website routes buttons */}
              <div className="flex flex-wrap gap-3 pt-4">
                <Link
                  to="/projects"
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${t.btnOnDark}`}
                >
                  Projects
                </Link>
                <Link
                  to="/about"
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${t.btnOnDark}`}
                >
                  About
                </Link>
                <Link
                  to="/contact"
                  className={`rounded-full px-6 py-2.5 text-sm font-semibold transition ${t.btnOnDark}`}
                >
                  Contact
                </Link>
              </div>

              <div className={`pt-6 flex items-center space-x-3 ${t.heroText}`}>
                <span className={`text-xs uppercase tracking-widest ${t.heroText}`}>
                  Scroll down to enter portfolio
                </span>
                <span className={`animate-bounce ${t.textAccent}`}>↓</span>
              </div>
            </div>

            {/* Right Portrait Image Column */}
            <div className="relative h-full w-full lg:col-span-6 flex items-end justify-center lg:justify-end z-10 bg-transparent">
              <div className="relative h-[75vh] w-full max-w-md lg:max-w-none bg-transparent">
                <img
                  src={Personal_Pics.PREFERRED_PROFILE_PIC}
                  alt="Jorge Ramirez"
                  className="h-full w-full object-cover object-top rounded-2xl opacity-90 contrast-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-t ${t.heroFade} via-transparent to-transparent rounded-2xl pointer-events-none`} />
              </div>
            </div>

          </div>
        </section>
      )}

      {/* --- MAIN WEBSITE CONTENT --- */}
      <div className="pointer-events-none relative z-50 min-h-screen pt-[100vh]">
        {/* Inner container applies the white background only where main content lives */}
        <div className={`pointer-events-auto ${t.surface} ${t.text} shadow-2xl rounded-t-[2.5rem]`}>
          <main className="mx-auto max-w-7xl space-y-12 px-6 py-16 sm:px-12 lg:px-16">
    

            {/* <Section id="about" title="About">
              <p className="max-w-2xl text-base leading-7 text-slate-600">
                Currently a Computer Science student at the University of Florida, I am pursuing a degree with a focus on Cybersecurity,  Data Analytics and AI Fundamentals. While I have a deep-seated passion for organizing and extracting insights from complex data, I am increasingly drawn to the world of cybersecurity. I am particularly interested in the intersection of these fields: leveraging data analytics to identify anomalous patterns and utilizing AI to build more proactive, automated system defenses.
                To complement my academic studies, I am self-driven in my security education, regularly completing online coursework and competing in Capture-the-Flag (CTF) challenges to build hands-on skills in network security and threat analysis. I am looking to leverage my analytical background and my growing security mindset to contribute to a forward-thinking technical team.              </p>
            </Section> */}
            {featuredProjects.length > 0 ? (
              <Section id="projects" title="Featured Projects">
                <div className="grid gap-5 md:grid-cols-2">
                  {featuredProjects.map((project) => (
                    <ProjectCard
                      key={project.title}
                      title={project.title}
                      shortDescription={project.shortDescription}
                      longDescription={project.longDescription}
                      tags={project.tags}
                      link={project.link}
                      thumbnail={project.thumbnail}
                      exampleImages={project.exampleImages}
                    />
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/projects" className={`text-sm font-medium ${t.textBrand} underline-offset-4 hover:underline`}
                  >
                    See all projects →
                  </Link>
                </div>
              </Section>
            ) : null}

            {featuredCourses.length > 0 ? (
              <Section id="coursework" title="Recent Coursework">
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {featuredCourses.map((course) => (
                    <CourseCard key={course.code} {...course} />
                  ))}
                </div>
                <div className="mt-6">
                  <Link to="/about#courses" className={`text-sm font-medium ${t.textBrand} underline-offset-4 hover:underline`}
                   >
                    See all coursework →
                  </Link>
                </div>
              </Section>
            ) : null}

           

          </main>
        </div>
      </div>
    </div>
  );
}