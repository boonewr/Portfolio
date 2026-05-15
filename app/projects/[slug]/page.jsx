import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import ImageSlot from "@/components/ImageSlot";
import Tag from "@/components/Tag";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowLeftIcon, ArrowUpRightIcon, LockIcon, PlayIcon } from "@/components/icons";
import { getProject, visibleProjects } from "@/lib/data";

export function generateStaticParams() {
  return visibleProjects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {
      title: "Project Not Found | Robbie Boone",
    };
  }

  return {
    title: `${project.title} | Robbie Boone`,
    description: project.summary,
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  const caseStudySections = project.caseStudySections ?? [
    { title: "System Architecture", body: project.sections.architecture },
    { title: "Development & Iteration Strategy", body: project.sections.iteration },
  ];
  const sidebarTitle = project.sidebarTitle ?? "Responsibilities";
  const sidebarItems = project.sidebarItems ?? project.responsibilities;
  const galleryTitle = project.projectType === "independent" ? "Interface Previews" : "Architecture & Interface Previews";
  const snippetHeading = project.projectType === "independent" ? "Core Logic" : "Implementation Snippet";
  const snippetDescription = project.snippetSummary ?? "Highlighted implementation detail from the project.";
  const headerRole = project.roleLabel ?? project.role;
  const showSnippet = project.hideSnippet !== true && project.snippet && project.snippetTitle;

  return (
    <main className="min-h-screen px-6 py-10 pb-20 sm:py-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <nav>
          <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-md text-sm text-muted transition-colors hover:text-primary">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Home
          </Link>
        </nav>

        <header className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-primary sm:text-5xl">{project.title}</h1>
            <p className="text-lg leading-8 text-secondary">
              {project.headerDescription ?? project.summary}
              <span className="text-faint"> / {headerRole}</span>
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
        </header>

        <section aria-label={`${project.title} hero visual`}>
          <div className="glass-panel rounded-lg p-2">
            <ImageSlot src={project.image.src} alt={project.image.alt} label={project.image.label} priority />
          </div>
        </section>

        <article className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          <div className="space-y-9 md:col-span-2">
            {caseStudySections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="text-xl font-medium text-primary">{section.title}</h2>
                {section.body.map((paragraph) => (
                  <p key={paragraph} className="leading-7 text-secondary">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}

            {showSnippet ? (
              <section className="space-y-4">
                <div>
                  <h2 className="text-xl font-medium text-primary">{snippetHeading}</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">{snippetDescription}</p>
                </div>
                <CodeBlock title={project.snippetTitle} code={project.snippet} />
              </section>
            ) : null}
          </div>

          <aside className="space-y-6">
            <section className="glass-panel rounded-lg p-5">
              <h2 className="text-sm font-medium uppercase tracking-wider text-primary">{sidebarTitle}</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
                {sidebarItems.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 dark:bg-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            {project.secondarySidebarItems?.length ? (
              <section className="glass-panel rounded-lg p-5">
                <h2 className="text-sm font-medium uppercase tracking-wider text-primary">{project.secondarySidebarTitle}</h2>
                <ul className="mt-4 space-y-3 text-sm leading-6 text-secondary">
                  {project.secondarySidebarItems.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-indigo-400 dark:bg-blue-400" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}

            <section className="glass-panel rounded-lg p-5">
              <h2 className="text-sm font-medium uppercase tracking-wider text-primary">Links</h2>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                {project.links.length ? (
                  project.links.map((link) =>
                    link.href ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center justify-between gap-3 rounded-md text-secondary transition-colors hover:text-primary"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <span
                        key={link.label}
                        title={link.disabledReason}
                        className="inline-flex cursor-not-allowed items-center justify-between gap-3 rounded-md text-disabled"
                        aria-disabled="true"
                      >
                        {link.label}
                        <LockIcon className="h-4 w-4" />
                      </span>
                    )
                  )
                ) : (
                  <p className="text-disabled">No public links available.</p>
                )}
              </div>
            </section>

          </aside>
        </article>

        {project.demoVideos?.length ? (
          <section className="space-y-4 pt-2" aria-labelledby="demo-videos-heading">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <h2 id="demo-videos-heading" className="text-xl font-medium text-primary">
                  Demo Videos
                </h2>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-muted">
                  Public walkthroughs are available in place of a public repository.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              {project.demoVideos.map((video) => (
                <a
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass-panel focus-ring group block overflow-hidden rounded-lg p-2 transition duration-300 hover:bg-white/70 dark:hover:border-white/15 dark:hover:bg-white/[0.055]"
                >
                  <div className="bg-theme-slot border-theme-slot relative aspect-video overflow-hidden rounded-md border">
                    <Image
                      src={video.thumbnail}
                      alt={video.alt}
                      fill
                      sizes="(min-width: 768px) 50vw, 100vw"
                      className="object-cover transition duration-300 group-hover:scale-[1.02]"
                      unoptimized
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
                    <span className="absolute left-1/2 top-1/2 inline-flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-blue-500 shadow-lg transition duration-300 group-hover:scale-105 group-hover:bg-white">
                      <PlayIcon className="h-5 w-5 translate-x-0.5" />
                    </span>
                    <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white">
                      Watch on YouTube
                      <ArrowUpRightIcon className="h-3.5 w-3.5" />
                    </span>
                  </div>
                  <div className="space-y-2 p-3">
                    <h3 className="text-base font-medium text-primary">{video.title}</h3>
                    <p className="text-sm leading-6 text-secondary">{video.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        ) : null}

        <section className="space-y-4 pt-2" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="text-xl font-medium text-primary">
            {galleryTitle}
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.gallery.map((item) => (
              <div key={item.src} className="glass-panel rounded-lg p-1.5">
                <ImageSlot src={item.src} alt={item.alt} label={item.label} />
              </div>
            ))}
          </div>
        </section>

        <footer className="flex justify-center pt-2">
          <ThemeToggle />
        </footer>
      </div>
    </main>
  );
}
