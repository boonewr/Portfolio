import ProjectCard from "@/components/ProjectCard";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { profile, visibleProjects, visibleTimeline } from "@/lib/data";

export default function HomePage() {
  return (
    <main className="min-h-screen px-6 py-16 sm:py-20">
      <div className="mx-auto max-w-3xl space-y-24">
        <header className="space-y-6">
          <p className="font-mono text-sm text-zinc-500">{profile.status}</p>
          <div className="space-y-4">
            <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">{profile.name}</h1>
            <p className="max-w-2xl text-lg leading-8 text-zinc-400">{profile.summary}</p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm font-medium">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass-panel focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-zinc-400 transition-colors hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass-panel focus-ring inline-flex items-center gap-2 rounded-full px-4 py-2 text-zinc-400 transition-colors hover:text-white"
            >
              <LinkedinIcon className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </header>

        <section className="space-y-8" aria-labelledby="timeline-heading">
          <h2 id="timeline-heading" className="text-xl font-medium text-white">
            Experience & Education
          </h2>
          <div className="relative ml-3 space-y-10 border-l border-zinc-800 pb-4">
            {visibleTimeline.map((item) => (
              <article key={`${item.title}-${item.date}`} className="group relative pl-8">
                <div className="absolute -left-[5px] top-2.5 h-2.5 w-2.5 rounded-full bg-zinc-700 ring-4 ring-zinc-950 transition-colors group-hover:bg-blue-300" />
                <div className="mb-2 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                  <h3 className="font-medium text-white">{item.title}</h3>
                  <span className="font-mono text-sm text-zinc-500">{item.date}</span>
                </div>
                <div className="text-sm text-zinc-400">{item.organization}</div>
                <p className="mt-3 text-sm leading-6 text-zinc-500">{item.description}</p>
                <p className="mt-2 font-mono text-xs text-zinc-600">{item.meta}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="space-y-8" aria-labelledby="projects-heading">
          <div className="flex items-end justify-between gap-4">
            <h2 id="projects-heading" className="text-xl font-medium text-white">
              Selected Projects
            </h2>
            <p className="hidden text-sm text-zinc-500 sm:block">Full-stack, frontend, and AI systems work</p>
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
