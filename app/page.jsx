import ProjectCard from "@/components/ProjectCard";
import ThemeToggle from "@/components/ThemeToggle";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile, visibleProjects, visibleTimeline } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-24">
        <header className="space-y-6">
          <div className="flex items-start justify-between gap-4">
            {/* <p className="font-mono text-sm text-faint">{profile.status}</p> */}
            <ThemeToggle />
          </div>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-primary sm:text-5xl">{profile.name}</h1>
            <p className="max-w-2xl text-lg leading-8 text-secondary">{profile.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass-panel focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-muted transition-colors hover:text-primary"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-panel focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-muted transition-colors hover:text-primary"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </header>

        <section className="space-y-8" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="text-xl font-medium text-primary">
            Experience & Education
          </h2>
          <div className="border-theme-line relative ml-3 space-y-10 border-l pb-4">
            {visibleTimeline.map((item) => (
              <article key={`${item.title}-${item.date}`} className="group relative pl-8">
                <div className="theme-node absolute -left-[5px] top-2.5 h-2.5 w-2.5 rounded-full ring-4 transition-colors group-hover:bg-indigo-400 dark:group-hover:bg-blue-300" />
                <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-medium text-primary">{item.title}</h3>
                  <span className="font-mono text-sm text-faint">{item.date}</span>
                </div>
                <div className="text-sm text-secondary">{item.organization}</div>
                <p className="mt-3 text-sm leading-6 text-muted">{item.description}</p>
                <p className="mt-2 font-mono text-xs text-faint">{item.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8" aria-labelledby="projects-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="projects-heading" className="text-xl font-medium text-primary">
              Selected Projects
            </h2>
            <p className="hidden text-sm text-muted sm:block">Full-stack, frontend, and AI systems work</p>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {visibleProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
