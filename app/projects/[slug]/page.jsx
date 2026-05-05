import Link from "next/link";
import { notFound } from "next/navigation";
import CodeBlock from "@/components/CodeBlock";
import ImageSlot from "@/components/ImageSlot";
import Tag from "@/components/Tag";
import { ArrowLeftIcon, ArrowUpRightIcon, LockIcon } from "@/components/icons";
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

  return (
    <main className="min-h-screen px-6 py-10 pb-20 sm:py-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <nav>
          <Link href="/" className="focus-ring inline-flex items-center gap-2 rounded-md text-sm text-zinc-400 transition-colors hover:text-white">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to Home
          </Link>
        </nav>

        <header className="space-y-6">
          <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">{project.title}</h1>
            <p className="text-lg leading-8 text-zinc-400">
              {project.role}
              {project.organization ? <span className="text-zinc-600"> / {project.organization}</span> : null}
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
            <section className="space-y-4">
              <h2 className="text-xl font-medium text-white">System Architecture</h2>
              {project.sections.architecture.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-zinc-400">
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="space-y-4">
              <h2 className="text-xl font-medium text-white">Development & Iteration Strategy</h2>
              {project.sections.iteration.map((paragraph) => (
                <p key={paragraph} className="leading-7 text-zinc-400">
                  {paragraph}
                </p>
              ))}
            </section>

            <section className="space-y-4">
              <div>
                <h2 className="text-xl font-medium text-white">Implementation Snippet</h2>
                <p className="mt-2 text-sm leading-6 text-zinc-500">Selected implementation detail from the project work.</p>
              </div>
              <CodeBlock title={project.snippetTitle} code={project.snippet} />
            </section>
          </div>

          <aside className="space-y-6">
            <section className="glass-panel rounded-lg p-5">
              <h2 className="text-sm font-medium uppercase tracking-wider text-white">Responsibilities</h2>
              <ul className="mt-4 space-y-3 text-sm leading-6 text-zinc-400">
                {project.responsibilities.map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="glass-panel rounded-lg p-5">
              <h2 className="text-sm font-medium uppercase tracking-wider text-white">Links</h2>
              <div className="mt-4 flex flex-col gap-3 text-sm">
                {project.links.length ? (
                  project.links.map((link) =>
                    link.href ? (
                      <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="focus-ring inline-flex items-center justify-between gap-3 rounded-md text-zinc-400 transition-colors hover:text-white"
                      >
                        {link.label}
                        <ArrowUpRightIcon className="h-4 w-4" />
                      </a>
                    ) : (
                      <span
                        key={link.label}
                        title={link.disabledReason}
                        className="inline-flex cursor-not-allowed items-center justify-between gap-3 rounded-md text-zinc-600"
                        aria-disabled="true"
                      >
                        {link.label}
                        <LockIcon className="h-4 w-4" />
                      </span>
                    )
                  )
                ) : (
                  <p className="text-zinc-600">No public links available.</p>
                )}
              </div>
            </section>

            {project.assetNotes?.length ? (
              <section className="glass-panel rounded-lg p-5">
                <h2 className="text-sm font-medium uppercase tracking-wider text-white">Asset Placement</h2>
                <ul className="mt-4 space-y-3 font-mono text-xs leading-5 text-zinc-500">
                  {project.assetNotes.map((note) => (
                    <li key={note} className="break-words">
                      {note}
                    </li>
                  ))}
                </ul>
              </section>
            ) : null}
          </aside>
        </article>

        <section className="space-y-4 pt-2" aria-labelledby="gallery-heading">
          <h2 id="gallery-heading" className="text-xl font-medium text-white">
            Architecture & Interface Previews
          </h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {project.gallery.map((item) => (
              <div key={item.src} className="glass-panel rounded-lg p-1.5">
                <ImageSlot src={item.src} alt={item.alt} label={item.label} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
